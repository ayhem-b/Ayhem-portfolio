/* ---------- Workbench: field devices, scan loop, outputs, multimeter ---------- */
const App = (function () {
  const $ = id => document.getElementById(id);
  const t = k => I18N.t(k);

  const field = { start: false, stop: false, sensor: false, estop: false };  // physical device states
  const force = {};                 // addr -> true/false
  const img = {};                   // process image: I, M, Q bits
  let running = true;               // CPU RUN / STOP
  let scans = 0;
  const T0 = performance.now();

  /* Physical wiring → input image. Stop and E-stop are wired NC, so their
     bits are TRUE while healthy and drop to FALSE when pressed. */
  function readInputs() {
    img['I0.0'] = field.start;
    img['I0.1'] = !field.stop;
    img['I0.2'] = field.sensor;
    img['I0.3'] = !field.estop;
    img['M0.1'] = Math.floor((performance.now() - T0) / 500) % 2 === 1;   // 1 Hz system clock
  }

  // 1L+ (motor contactor) goes through the E-stop safety relay; 2L+ (lamps, buzzer) stays live.
  const supply1 = () => !field.estop;
  const physical = q => !!img[q] && (q === 'Q0.0' ? supply1() : true);

  /* ---------- multimeter ---------- */
  const TPS = [
    ['TP1', 'tp.1', 'L+',    () => 24.0],
    ['TP2', 'tp.2', '1L+',   () => supply1() ? 23.9 : 0],
    ['TP3', 'tp.3', 'I0.0',  () => field.start ? 24.0 : 0],
    ['TP4', 'tp.4', 'I0.1',  () => field.stop ? 0 : 24.0],
    ['TP5', 'tp.5', 'I0.2',  () => field.sensor ? 23.2 : 0],
    ['TP6', 'tp.6', 'I0.3',  () => field.estop ? 0 : 24.0],
    ['TP7', 'tp.7', 'Q0.0',  () => physical('Q0.0') ? 23.6 : 0],
    ['TP8', 'tp.8', 'Q0.1',  () => physical('Q0.1') ? 23.7 : 0],
    ['TP9', 'tp.9', 'Q0.2',  () => physical('Q0.2') ? 23.7 : 0],
    ['TP10', 'tp.10', 'Q0.3', () => physical('Q0.3') ? 23.7 : 0]
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
    if (!dmmOn) { $('dmmValue').textContent = ''; $('dmmUnit').textContent = ''; $('dmmMode').textContent = 'OFF'; return; }
    const v = fn();
    const noisy = v === 0 ? Math.random() * 0.012 : v + (Math.random() - 0.5) * 0.04;
    $('dmmValue').textContent = noisy.toFixed(2);
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
      st.textContent = img[q] && !on ? 'ON · 0 V' : on ? 'ON' : 'OFF';
      st.classList.toggle('dead', !!img[q] && !on);
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

  /* ---------- wiring up controls ---------- */
  function momentary(btn, key) {
    const set = v => { if (field[key] !== v) { field[key] = v; scanLoop(); } };
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

    document.addEventListener('langchange', () => { Ladder.render($('ladder')); readMeter(); });

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

  return { img, init };
})();

App.init();
