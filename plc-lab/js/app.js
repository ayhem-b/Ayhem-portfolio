/* ---------- Workbench: field devices, scan loop, outputs, multimeter ---------- */
const App = (function () {
  const $ = id => document.getElementById(id);
  const t = k => I18N.t(k);

  const field = { start: false, stop: false, sensor: false, estop: false };  // physical device states
  const force = {};                 // addr -> true/false
  const img = {};                   // process image: I, M, Q bits
  let running = true;               // CPU RUN / STOP
  let fault = {};                   // hidden fault injected by a troubleshooting problem
  let problem = 0;                  // 0 = free mode, 1..10 = active problem
  let scans = 0;
  const T0 = performance.now();

  /* Physical wiring → input image. Stop and E-stop are wired NC, so their
     bits are TRUE while healthy and drop to FALSE when pressed. */
  // Voltage actually present on each input terminal (what the multimeter sees).
  const startTerm = () => field.start && !fault.startOpen;
  const stopTerm = () => !field.stop && !fault.stopWire;
  const sensorTerm = () => field.sensor || !!fault.sensorStuck;

  function readInputs() {
    img['I0.0'] = startTerm() && !fault.cardI0;
    img['I0.1'] = stopTerm();
    img['I0.2'] = sensorTerm();
    img['I0.3'] = !field.estop;
    img['M0.1'] = Math.floor((performance.now() - T0) / 500) % 2 === 1;   // 1 Hz system clock
  }

  // 1L+ (motor contactor) goes through the E-stop safety relay; 2L+ (lamps, buzzer) stays live.
  const supply1 = () => !field.estop && !fault.fuse1L;
  // 24 V present on the output terminal…
  const outV = q => !!img[q] && (q === 'Q0.0' ? supply1() && !fault.q0Dead : true);
  // …and whether the device on it actually works.
  const physical = q => outV(q) && !(q === 'Q0.0' && fault.coilOpen) && !(q === 'Q0.1' && fault.bulb);

  /* ---------- multimeter ---------- */
  const TPS = [
    ['TP1', 'tp.1', 'L+',    () => 24.0],
    ['TP2', 'tp.2', '1L+',   () => supply1() ? 23.9 : 0],
    ['TP3', 'tp.3', 'I0.0',  () => startTerm() ? 24.0 : 0],
    ['TP4', 'tp.4', 'I0.1',  () => stopTerm() ? 24.0 : 0],
    ['TP5', 'tp.5', 'I0.2',  () => sensorTerm() ? 23.2 : 0],
    ['TP6', 'tp.6', 'I0.3',  () => field.estop ? 0 : 24.0],
    ['TP7', 'tp.7', 'Q0.0',  () => outV('Q0.0') ? 23.6 : 0],
    ['TP8', 'tp.8', 'Q0.1',  () => outV('Q0.1') ? 23.7 : 0],
    ['TP9', 'tp.9', 'Q0.2',  () => outV('Q0.2') ? 23.7 : 0],
    ['TP10', 'tp.10', 'Q0.3', () => outV('Q0.3') ? 23.7 : 0]
  ];
  let tp = 0, dmmOn = true;

  function buildTestPoints() {
    const box = $('testPoints');
    box.innerHTML = '';
    TPS.forEach(([id, key, term], i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'tp';
      b.setAttribute('aria-pressed', i === tp ? 'true' : 'false');
      b.innerHTML = `<span class="tp-id mono">${id}</span><span class="tp-d"><span data-i18n="${key}">${t(key)}</span><small class="mono">${term}</small></span><span class="tp-v mono" dir="ltr"></span>`;
      b.addEventListener('click', () => {
        tp = i;
        box.querySelectorAll('.tp').forEach((x, j) => x.setAttribute('aria-pressed', j === i ? 'true' : 'false'));
        readMeter(true);
        log(`${t('log.meter')} ${id} (${term}) = ${fmtV(TPS[i][3]())} V`);
      });
      box.appendChild(b);
    });
  }

  const fmtV = v => (v === 0 ? 0.004 : v).toFixed(2);
  function readMeter() {
    const [id, , term, fn] = TPS[tp];
    $('dmmProbe').textContent = `${id} · ${term}`;
    if (!dmmOn) { $('dmmValue').textContent = ''; $('dmmUnit').textContent = ''; $('dmmMode').textContent = 'OFF'; $('miniDmm').textContent = 'DMM OFF'; return; }
    const v = fn();
    const noisy = v === 0 ? Math.random() * 0.012 : v + (Math.random() - 0.5) * 0.04;
    $('dmmValue').textContent = noisy.toFixed(2);
    $('miniDmm').textContent = `DMM ${id} (${term}) = ${noisy.toFixed(2)} V`;
    $('dmmUnit').textContent = 'V DC';
    $('dmmMode').textContent = 'V⎓';
    document.querySelectorAll('#testPoints .tp-v').forEach((s, i) => { s.textContent = TPS[i][3]().toFixed(1) + ' V'; });
    checkExercises();
  }

  /* ---------- event log ---------- */
  function log(msg, kind) {
    const ul = $('log');
    const li = document.createElement('li');
    if (kind) li.className = kind;
    const d = new Date();
    const ts = d.toTimeString().slice(0, 8) + '.' + String(d.getMilliseconds()).padStart(3, '0');
    li.innerHTML = `<time>${ts}</time><span></span>`;
    li.lastChild.textContent = msg;
    ul.prepend(li);
    while (ul.children.length > 60) ul.lastChild.remove();
  }

  /* ---------- exercises ---------- */
  const EX = ['seal', 'stop', 'latch', 'reset', 'measure'];
  let done = {};
  try { done = JSON.parse(localStorage.getItem('plclab.ex') || '{}') || {}; } catch (e) {}
  function complete(k) {
    if (done[k]) return;
    done[k] = true;
    try { localStorage.setItem('plclab.ex', JSON.stringify(done)); } catch (e) {}
    log(`${t('log.ex')} ${EX.indexOf(k) + 1}/5 ✓`, 'ok');
    paintExercises();
  }
  function paintExercises() {
    document.querySelectorAll('#exercises li').forEach(li => li.classList.toggle('done', !!done[li.dataset.ex]));
  }
  let prev = {};
  function checkExercises() {
    if (problem) { prev = {}; return; }   // exercises assume a healthy machine
    const q0 = img['Q0.0'], m0 = img['M0.0'];
    if (running && q0 && !field.start && !('Q0.0' in force)) complete('seal');
    if (prev.q0 && !q0 && field.stop && !m0 && !('Q0.0' in force)) complete('stop');
    if (!prev.m0 && m0 && field.sensor && prev.q0) complete('latch');
    if (prev.m0 && !m0 && !field.sensor && field.stop) complete('reset');
    if (dmmOn && TPS[tp][0] === 'TP7' && force['Q0.0'] === true && field.estop) complete('measure');
    prev = { q0, m0 };
  }

  /* ---------- outputs + status ---------- */
  const OUTS = ['Q0.0', 'Q0.1', 'Q0.2', 'Q0.3'];
  let last = '';
  let audio = null, osc = null, gain = null, sound = false;

  function paint() {
    const sig = JSON.stringify([img, field, force, running, dmmOn]);
    if (sig === last) return;
    const before = last ? JSON.parse(last)[0] : null;
    last = sig;

    // log edges on I / Q / M0.0 (not the clock)
    if (before) {
      for (const a of Object.keys(TAGS)) {
        if (a === 'M0.1') continue;
        if (!!before[a] !== !!img[a]) log(`${a} ${TAGS[a]}  ${before[a] ? 1 : 0} → ${img[a] ? 1 : 0}`, a[0] === 'Q' ? 'q' : a[0] === 'M' ? 'm' : '');
      }
    }

    Ladder.update();
    $('ladder').classList.toggle('stopped', !running);

    $('btnStart').classList.toggle('down', field.start);
    $('btnStop').classList.toggle('down', field.stop);
    $('btnStart').setAttribute('aria-pressed', field.start);
    $('btnStop').setAttribute('aria-pressed', field.stop);
    $('swSensor').setAttribute('aria-checked', field.sensor);
    $('btnEstop').setAttribute('aria-pressed', field.estop);

    OUTS.forEach(q => {
      const row = document.querySelector(`.out[data-out="${q}"]`);
      const on = physical(q);
      row.classList.toggle('on', on);
      row.classList.toggle('forced', q in force && running);
      const st = row.querySelector('[data-state]');
      st.textContent = on ? 'ON' : 'OFF';
    });
    $('conveyor').classList.toggle('running', physical('Q0.0'));

    $('ledRun').classList.toggle('on', running);
    $('ledStop').classList.toggle('on', !running);
    $('ledForce').classList.toggle('on', Object.keys(force).length > 0);
    document.querySelectorAll('#ioI .led').forEach((l, i) => l.classList.toggle('on', !!img['I0.' + i]));
    document.querySelectorAll('#ioQ .led').forEach((l, i) => l.classList.toggle('on', !!img['Q0.' + i]));

    if (gain) gain.gain.setTargetAtTime(sound && physical('Q0.3') ? 0.05 : 0, audio.currentTime, 0.01);
    checkExercises();
  }

  function scanLoop() {
    readInputs();
    Ladder.scan(img, force, running);
    scans++;
    paint();
  }

  /* ---------- troubleshooting problems ----------
     Each one injects a hidden fault (wiring, PLC hardware, field device or
     program). The learner measures, then picks the cause among 4 options. */
  const PROBLEMS = [
    { f: { startOpen: 1 },  opts: ['c1', 'c2', 'c3', 'c10'], ans: 'c1' },
    { f: { cardI0: 1 },     opts: ['c2', 'c1', 'c9', 'c3'],  ans: 'c2' },
    { f: { stopWire: 1 },   opts: ['c3', 'c10', 'c1', 'c4'], ans: 'c3' },
    { f: { sensorStuck: 1 },opts: ['c4', 'c3', 'c5', 'c2'],  ans: 'c4' },
    { f: { fuse1L: 1 },     opts: ['c5', 'c6', 'c7', 'c8'],  ans: 'c5' },
    { f: { q0Dead: 1 },     opts: ['c6', 'c5', 'c7', 'c3'],  ans: 'c6' },
    { f: { coilOpen: 1 },   opts: ['c7', 'c6', 'c5', 'c8'],  ans: 'c7' },
    { f: { bulb: 1 },       opts: ['c8', 'c6', 'c7', 'c9'],  ans: 'c8' },
    { prog: 'noseal',       opts: ['c9', 'c1', 'c2', 'c10'], ans: 'c9' },
    { prog: 'stopnc',       opts: ['c10', 'c3', 'c1', 'c2'], ans: 'c10' }
  ];
  let solved = {};
  try { solved = JSON.parse(localStorage.getItem('plclab.pb') || '{}') || {}; } catch (e) {}
  const pbState = { choice: null, result: null, revealed: false };

  // stable shuffle so the right answer is not always first
  const order = (opts, n) => opts.map((o, i) => [((i + 1) * (n + 1)) % 13, o]).sort((a, b) => a[0] - b[0]).map(x => x[1]);

  function resetBench() {
    field.start = field.stop = field.sensor = field.estop = false;
    for (const k of Object.keys(force)) delete force[k];
    document.querySelectorAll('.out [data-force]').forEach(b => b.setAttribute('aria-pressed', b.dataset.force === 'auto' ? 'true' : 'false'));
    running = true;
    document.querySelectorAll('[data-mode]').forEach(x => x.setAttribute('aria-pressed', x.dataset.mode === 'run' ? 'true' : 'false'));
    for (const k of Object.keys(img)) img[k] = false;
  }

  function loadProblem(n) {
    problem = n;
    const pb = PROBLEMS[n - 1];
    resetBench();
    fault = pb ? { ...pb.f } : {};
    Ladder.load(pb && pb.prog ? pb.prog : 'ok', $('ladder'));
    pbState.choice = null; pbState.result = null; pbState.revealed = false;
    log(n ? `${t('pb.log')} ${n}/10` : t('pb.free'), 'm');
    scanLoop();
    renderProblems();
  }

  function renderProblems() {
    const n = problem, pb = PROBLEMS[n - 1];
    const count = Object.keys(solved).length;
    $('pbScore').textContent = `${count}/10`;
    $('pbChips').innerHTML =
      `<button type="button" class="chip chip-free" data-pb="0" aria-pressed="${n === 0}">${t('pb.free')}</button>` +
      PROBLEMS.map((_, i) => `<button type="button" class="chip${solved[i + 1] ? ' solved' : ''}" data-pb="${i + 1}" aria-pressed="${n === i + 1}" aria-label="${t('pb.label')} ${i + 1}${solved[i + 1] ? ' ✓' : ''}">${i + 1}</button>`).join('');
    $('pbChips').querySelectorAll('[data-pb]').forEach(b => b.addEventListener('click', () => loadProblem(+b.dataset.pb)));

    const card = $('pbCard');
    if (!pb) {
      card.innerHTML = `<p class="pb-intro">${t('pb.intro')}</p>`;
      return;
    }
    const opts = order(pb.opts, n).map(c =>
      `<label class="opt"><input type="radio" name="pbopt" value="${c}"${pbState.choice === c ? ' checked' : ''}><span>${t('cause.' + c.slice(1))}</span></label>`).join('');
    let fb = '';
    if (pbState.result === 'ok' || pbState.revealed) {
      fb = `<div class="pb-fb ${pbState.result === 'ok' ? 'ok' : 'rev'}"><b>${t(pbState.result === 'ok' ? 'pb.ok' : 'pb.answer')}</b> ${pbState.revealed ? t('cause.' + pb.ans.slice(1)) + '. ' : ''}${t('pb.' + n + '.exp')}</div>`;
    } else if (pbState.result === 'no') {
      fb = `<div class="pb-fb no">${t('pb.no')}</div>`;
    }
    card.innerHTML = `
      <div class="pb-label mono">${t('pb.label')} ${n}/10</div>
      <blockquote class="pb-sym">${t('pb.' + n + '.sym')}</blockquote>
      <p class="pb-tip">${t('pb.tip')}</p>
      <fieldset class="opts"><legend>${t('pb.q')}</legend>${opts}</fieldset>
      <div class="pb-actions">
        <button type="button" class="btn-primary" id="pbCheck">${t('pb.check')}</button>
        <button type="button" class="btn-ghost" id="pbReveal">${t('pb.reveal')}</button>
        <button type="button" class="btn-ghost" id="pbRestart">${t('pb.restart')}</button>
        ${n < 10 ? `<button type="button" class="btn-ghost" id="pbNext">${t('pb.next')} →</button>` : ''}
      </div>
      <div aria-live="polite">${fb}</div>`;
    card.querySelectorAll('input[name="pbopt"]').forEach(r => r.addEventListener('change', () => { pbState.choice = r.value; }));
    $('pbCheck').addEventListener('click', () => {
      if (!pbState.choice) return;
      pbState.result = pbState.choice === pb.ans ? 'ok' : 'no';
      if (pbState.result === 'ok') {
        solved[n] = true;
        try { localStorage.setItem('plclab.pb', JSON.stringify(solved)); } catch (e) {}
        log(`${t('pb.label')} ${n}/10 ✓`, 'ok');
      }
      renderProblems();
    });
    $('pbReveal').addEventListener('click', () => { pbState.revealed = true; renderProblems(); });
    $('pbRestart').addEventListener('click', () => loadProblem(n));
    const next = $('pbNext');
    if (next) next.addEventListener('click', () => loadProblem(n + 1));
  }

  /* ---------- wiring up controls ---------- */
  const controls = {};              // field actions, shared with the 3D scene

  function momentary(btn, key) {
    const set = v => { if (field[key] !== v) { field[key] = v; scanLoop(); readMeter(); } };
    btn.addEventListener('pointerdown', e => { e.preventDefault(); btn.setPointerCapture(e.pointerId); set(true); });
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(ev => btn.addEventListener(ev, () => set(false)));
    btn.addEventListener('keydown', e => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); set(true); } });
    btn.addEventListener('keyup', e => { if (e.key === ' ' || e.key === 'Enter') set(false); });
    btn.addEventListener('blur', () => set(false));
    btn.addEventListener('contextmenu', e => e.preventDefault());
    return set;
  }

  function init() {
    // CPU I/O LEDs
    for (const [id, p] of [['ioI', 'I'], ['ioQ', 'Q']]) {
      $(id).innerHTML = [0, 1, 2, 3].map(i => `<span><i class="led"></i>.${i}</span>`).join('');
    }

    const setStart = momentary($('btnStart'), 'start');
    const setStop = momentary($('btnStop'), 'stop');
    const toggleSensor = () => { field.sensor = !field.sensor; scanLoop(); };
    const toggleEstop = () => { field.estop = !field.estop; scanLoop(); };
    Object.assign(controls, { start: setStart, stop: setStop, sensor: toggleSensor, estop: toggleEstop });
    $('swSensor').addEventListener('click', toggleSensor);
    $('btnEstop').addEventListener('click', toggleEstop);

    document.addEventListener('keydown', e => {
      if (e.repeat || e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === '1') setStart(true);
      else if (e.key === '2') setStop(true);
      else if (e.key === '3') toggleSensor();
      else if (e.key === '4') toggleEstop();
    });
    document.addEventListener('keyup', e => {
      if (e.key === '1') setStart(false);
      else if (e.key === '2') setStop(false);
    });

    // CPU mode
    document.querySelectorAll('[data-mode]').forEach(b => b.addEventListener('click', () => {
      const r = b.dataset.mode === 'run';
      if (r === running) return;
      running = r;
      document.querySelectorAll('[data-mode]').forEach(x => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
      log(t(r ? 'log.run' : 'log.stop'), 'm');
      scanLoop();
    }));

    // forcing
    document.querySelectorAll('.out').forEach(row => {
      const q = row.dataset.out;
      row.querySelectorAll('[data-force]').forEach(b => b.addEventListener('click', () => {
        const f = b.dataset.force;
        if (f === 'auto') delete force[q]; else force[q] = f === 'on';
        row.querySelectorAll('[data-force]').forEach(x => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
        log(`${t('log.force')} ${q} ${TAGS[q]} = ${f.toUpperCase()}`, 'f');
        scanLoop();
      }));
    });

    // multimeter
    document.querySelectorAll('[data-dmm]').forEach(b => b.addEventListener('click', () => {
      dmmOn = b.dataset.dmm === 'vdc';
      document.querySelectorAll('[data-dmm]').forEach(x => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
      $('testPoints').closest('.meter-wrap').classList.toggle('off', !dmmOn);
      readMeter();
    }));
    buildTestPoints();

    // sound (audio context needs a user gesture)
    $('soundToggle').addEventListener('click', () => {
      sound = !sound;
      $('soundToggle').setAttribute('aria-pressed', sound);
      if (sound && !audio) {
        try {
          audio = new (window.AudioContext || window.webkitAudioContext)();
          osc = audio.createOscillator(); gain = audio.createGain();
          osc.type = 'square'; osc.frequency.value = 2400; gain.gain.value = 0;
          osc.connect(gain).connect(audio.destination); osc.start();
        } catch (e) { audio = null; }
      }
      if (audio && audio.state === 'suspended') audio.resume();
      last = ''; paint();
    });

    // theme
    $('themeToggle').addEventListener('click', () => {
      const h = document.documentElement;
      const n = h.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      h.setAttribute('data-theme', n);
      try { localStorage.setItem('plclab.theme', n); } catch (e) {}
    });

    $('logClear').addEventListener('click', () => { $('log').innerHTML = ''; });
    $('exReset').addEventListener('click', () => {
      done = {};
      try { localStorage.removeItem('plclab.ex'); } catch (e) {}
      paintExercises();
    });

    document.addEventListener('langchange', () => { Ladder.render($('ladder')); readMeter(); renderProblems(); });
    $('pbResetAll').addEventListener('click', () => {
      solved = {};
      try { localStorage.removeItem('plclab.pb'); } catch (e) {}
      renderProblems();
    });
    renderProblems();

    Ladder.render($('ladder'));
    paintExercises();
    readInputs();
    log(t('log.ready'), 'm');
    log(t('log.run'), 'm');
    scanLoop();
    last = '';  // first paint without edge logging noise
    paint();

    setInterval(scanLoop, 10);
    setInterval(() => { $('scanInfo').textContent = `SCAN ${scans.toLocaleString('en-US')} · 10 ms`; }, 200);
    setInterval(readMeter, 300);
    readMeter();
  }

  /* Read-only view of the machine + the same actions as the operator panel,
     for the 3D scene. */
  const io = {
    field,
    physical,
    sensorBlocked: sensorTerm,
    press: (key, v) => controls[key] && controls[key](v),   // 'start' | 'stop' (momentary)
    toggle: key => controls[key] && controls[key]()          // 'sensor' | 'estop'
  };

  return { img, io, init };
})();

App.init();
