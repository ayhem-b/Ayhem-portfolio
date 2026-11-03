/* ---------- Ladder engine ----------
   The program below IS the logic: the same tree is evaluated every scan
   (power flow, left rail to coil) and drawn as SVG, so what you see highlighted
   is exactly what decided the outputs.

   Node types:
     S  series   { t:'S', items:[...] }
     P  parallel { t:'P', branches:[S, S, ...] }
     NO / NC contact { t:'NO', addr:'I0.0' }
   A rung is { comment: i18n key, logic: S, coil: 'Q0.0' }. */

const TAGS = {
  'I0.0': 'START_PB',
  'I0.1': 'STOP_PB',
  'I0.2': 'JAM_SENSOR',
  'I0.3': 'ESTOP_OK',
  'M0.0': 'FAULT',
  'M0.1': 'CLOCK_1HZ',
  'Q0.0': 'CONV_MOTOR',
  'Q0.1': 'RUN_LAMP',
  'Q0.2': 'FAULT_LAMP',
  'Q0.3': 'BUZZER'
};

const S = (...items) => ({ t: 'S', items });
const P = (...branches) => ({ t: 'P', branches: branches.map(b => (b.t === 'S' ? b : S(b))) });
const NO = addr => ({ t: 'NO', addr });
const NC = addr => ({ t: 'NC', addr });

const PROGRAM = [
  { comment: 'rung.1', coil: 'Q0.0', logic: S(P(NO('I0.0'), NO('Q0.0')), NO('I0.1'), NO('I0.3'), NC('M0.0')) },
  { comment: 'rung.2', coil: 'M0.0', logic: S(P(NO('I0.2'), NC('I0.3'), S(NO('M0.0'), NO('I0.1')))) },
  { comment: 'rung.3', coil: 'Q0.1', logic: S(NO('Q0.0')) },
  { comment: 'rung.4', coil: 'Q0.2', logic: S(NO('M0.0')) },
  { comment: 'rung.5', coil: 'Q0.3', logic: S(NO('M0.0'), NO('M0.1')) }
];

const Ladder = (function () {
  const NS = 'http://www.w3.org/2000/svg';
  const CW = 118;          // cell width
  const RH = 66;           // branch row height
  const RAIL = 16;         // rail x offset
  const TOP = 26;          // space above each rung for its comment
  const GAP = 14;          // space between rungs

  /* ---- evaluation: returns power out; records _in/_out/_closed on nodes ---- */
  function evalNode(node, p, img) {
    if (node.t === 'S') {
      node._in = p;
      for (const it of node.items) p = evalNode(it, p, img);
      node._out = p;
      return p;
    }
    if (node.t === 'P') {
      node._in = p;
      let out = false;
      for (const b of node.branches) out = evalNode(b, p, img) || out;
      node._out = out;
      return out;
    }
    const bit = !!img[node.addr];
    node._closed = node.t === 'NO' ? bit : !bit;
    node._in = p;
    node._out = p && node._closed;
    return node._out;
  }

  /* One scan: rungs solved top to bottom, each coil written straight into the
     image so later rungs see it (like a real CPU). force: { addr: true|false } */
  function scan(img, force, running) {
    for (const r of PROGRAM) {
      const p = evalNode(r.logic, running, img);   // CPU in STOP: rails unpowered
      r._power = p;
      r._forced = running && r.coil in force;
      img[r.coil] = r._forced ? force[r.coil] : (running && p);
    }
  }

  /* ---- layout + drawing ---- */
  let width = 0;
  const bindings = [];     // { el, cls, test }

  function el(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function bind(e, cls, test) { bindings.push({ el: e, cls, test }); return e; }

  function measure(node) {
    if (node.t === 'S') {
      let w = 0, h = 1;
      for (const it of node.items) { const m = measure(it); w += m.w; h = Math.max(h, m.h); }
      return (node._m = { w, h });
    }
    if (node.t === 'P') {
      let w = 0, h = 0;
      for (const b of node.branches) { const m = measure(b); w = Math.max(w, m.w); h += m.h; }
      return (node._m = { w, h });
    }
    return (node._m = { w: 1, h: 1 });
  }

  const cx = col => RAIL + col * CW;          // left edge of a cell
  const cy = (top, row) => top + row * RH + RH / 2;

  function wire(g, x1, y1, x2, y2, test) {
    return bind(el('line', { x1, y1, x2, y2, class: 'w' }, g), 'pow', test);
  }

  function draw(node, g, col, row, top) {
    if (node.t === 'S') {
      let c = col;
      for (const it of node.items) { draw(it, g, c, row, top); c += it._m.w; }
      return;
    }
    if (node.t === 'P') {
      let r = row;
      const w = node._m.w;
      const rows = [];
      for (const b of node.branches) {
        draw(b, g, col, r, top);
        if (b._m.w < w) wire(g, cx(col + b._m.w), cy(top, r), cx(col + w), cy(top, r), () => b._out);
        rows.push(r);
        r += b._m.h;
      }
      const y0 = cy(top, rows[0]);
      node.branches.forEach((b, i) => {
        if (i === 0) return;
        const y = cy(top, rows[i]);
        wire(g, cx(col), y0, cx(col), y, () => node._in);
        wire(g, cx(col + w), y0, cx(col + w), y, () => b._out);
      });
      return;
    }
    // contact
    const x = cx(col), y = cy(top, row), m = x + CW / 2;
    const ge = el('g', { class: 'el' }, g);
    wire(ge, x, y, m - 9, y, () => node._in);
    wire(ge, m + 9, y, x + CW, y, () => node._out);
    bind(el('rect', { x: m - 9, y: y - 13, width: 18, height: 26, class: 'pad' }, ge), 'true', () => node._closed);
    const plates = el('path', { d: `M${m - 9} ${y - 13}v26M${m + 9} ${y - 13}v26`, class: 'sym' }, ge);
    bind(plates, 'true', () => node._closed);
    if (node.t === 'NC') bind(el('path', { d: `M${m - 12} ${y + 12}L${m + 12} ${y - 12}`, class: 'sym' }, ge), 'true', () => node._closed);
    el('text', { x: m, y: y - 20, class: 'addr' }, ge).textContent = node.addr;
    el('text', { x: m, y: y + 27, class: 'tag' }, ge).textContent = TAGS[node.addr];
  }

  function render(svg) {
    svg.innerHTML = '';
    bindings.length = 0;
    let maxW = 0;
    for (const r of PROGRAM) maxW = Math.max(maxW, measure(r.logic).w);
    const coilCol = maxW;                         // coil sits in the last cell
    width = RAIL * 2 + (coilCol + 1) * CW;
    let top = 8;

    const railL = el('line', { class: 'rail' }, svg);
    const railR = el('line', { class: 'rail' }, svg);

    PROGRAM.forEach((r, i) => {
      const g = el('g', { class: 'rung' }, svg);
      const t = el('text', { x: RAIL + 4, y: top + 14, class: 'cmt' }, g);
      el('tspan', { class: 'cmt-n' }, t).textContent = 'NETWORK ' + (i + 1) + '  ';
      el('tspan', { 'data-i18n': r.comment }, t).textContent = (window.I18N && I18N.t(r.comment)) || '';
      const rt = top + TOP;
      draw(r.logic, g, 0, 0, rt);
      const y = cy(rt, 0);
      wire(g, cx(r.logic._m.w), y, cx(coilCol), y, () => r._power);
      // coil
      const m = cx(coilCol) + CW / 2;
      wire(g, cx(coilCol), y, m - 14, y, () => r._power);
      wire(g, m + 14, y, RAIL + (coilCol + 1) * CW, y, () => r._power);
      const coil = el('path', { d: `M${m - 6} ${y - 14}a14 14 0 0 0 0 28M${m + 6} ${y - 14}a14 14 0 0 1 0 28`, class: 'sym coil' }, g);
      bind(coil, 'true', () => !!App.img[r.coil]);
      bind(coil, 'forced', () => r._forced);
      el('text', { x: m, y: y - 20, class: 'addr' }, g).textContent = r.coil;
      el('text', { x: m, y: y + 29, class: 'tag' }, g).textContent = TAGS[r.coil];
      const fb = bind(el('text', { x: m + 22, y: y + 4, class: 'fbadge' }, g), 'show', () => r._forced);
      fb.textContent = 'F';
      top = rt + r.logic._m.h * RH + GAP;
    });

    const h = top;
    for (const [rail, x] of [[railL, RAIL], [railR, width - RAIL]]) {
      rail.setAttribute('x1', x); rail.setAttribute('x2', x);
      rail.setAttribute('y1', 30); rail.setAttribute('y2', h - GAP);
    }
    svg.setAttribute('viewBox', `0 0 ${width} ${h}`);
    svg.style.minWidth = Math.round(width * 0.78) + 'px';
    update();
  }

  function update() {
    for (const b of bindings) b.el.classList.toggle(b.cls, !!b.test());
  }

  return { scan, render, update };
})();
