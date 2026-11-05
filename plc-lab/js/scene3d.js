/* ---------- 3D station ----------
   A conveyor cell drawn with three.js and driven by the same simulation as the
   rest of the page: it reads App.img / App.io every frame and sends clicks on
   the control box and the photo-eye back through App.io. It has no logic of
   its own, so it can never disagree with the ladder or the multimeter. */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/OrbitControls.js';

const host = document.getElementById('scene3d');
const io = App.io;

function fail() {
  host.classList.add('nogl');
  host.innerHTML = `<p data-i18n="scene.nogl">${I18N.t('scene.nogl')}</p>`;
}

let renderer;
try {
  renderer = new THREE.WebGLRenderer({ antialias: true });
} catch (e) { renderer = null; }
if (!renderer) fail(); else build();

function build() {
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  const HOME = { pos: new THREE.Vector3(3.3, 2.7, 4.9), target: new THREE.Vector3(-0.3, 0.75, 0.1) };
  camera.position.copy(HOME.pos);

  const orbit = new OrbitControls(camera, renderer.domElement);
  orbit.target.copy(HOME.target);
  orbit.enableDamping = true;
  orbit.minDistance = 2.5;
  orbit.maxDistance = 15;
  orbit.maxPolarAngle = Math.PI * 0.47;
  orbit.update();

  /* ---- lights ---- */
  scene.add(new THREE.HemisphereLight(0xffffff, 0x4a5258, 1.1));
  const sun = new THREE.DirectionalLight(0xffffff, 1.8);
  sun.position.set(4, 8, 5);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  Object.assign(sun.shadow.camera, { left: -6, right: 6, top: 6, bottom: -6, near: 1, far: 25 });
  scene.add(sun);

  /* ---- helpers ---- */
  const std = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.6, metalness: 0.1, ...o });
  const M = {
    floor: std(0x5b6266, { roughness: 0.95 }),
    frame: std(0x9aa4aa, { metalness: 0.6, roughness: 0.35 }),
    leg: std(0x4f585e, { metalness: 0.5, roughness: 0.4 }),
    belt: std(0x202427, { roughness: 0.9 }),
    drum: std(0xb8c0c4, { metalness: 0.8, roughness: 0.25 }),
    motor: std(0x2f5f8a, { metalness: 0.4, roughness: 0.4 }),
    yellow: std(0xf2c21b),
    dark: std(0x1c2125),
    box: std(0xc08a4a, { roughness: 0.85 }),
    tape: std(0x9c6b33, { roughness: 0.7 }),
    cabinet: std(0xd5d9dc, { roughness: 0.5 }),
    bin: std(0x3b6e4a, { roughness: 0.7 })
  };
  function mesh(geo, mat, x, y, z, parent = scene) {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z);
    m.castShadow = true;
    m.receiveShadow = true;
    parent.add(m);
    return m;
  }
  function label(text, w = 0.3, h = 0.08) {
    const c = document.createElement('canvas');
    c.width = 256; c.height = Math.round(256 * h / w);
    const g = c.getContext('2d');
    g.fillStyle = '#e9edef'; g.fillRect(0, 0, c.width, c.height);
    g.fillStyle = '#12171a'; g.font = `600 ${Math.round(c.height * 0.62)}px "IBM Plex Mono", monospace`;
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(text, c.width / 2, c.height / 2 + 2);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex }));
  }

  /* ---- floor with safety markings ---- */
  const floor = mesh(new THREE.PlaneGeometry(30, 30), M.floor, 0, 0, 0);
  floor.rotation.x = -Math.PI / 2;
  floor.castShadow = false;
  const grid = new THREE.GridHelper(30, 30, 0x3e4549, 0x3e4549);
  grid.position.y = 0.002;
  grid.material.transparent = true; grid.material.opacity = 0.35;
  scene.add(grid);
  const stripe = std(0xf2c21b, { roughness: 0.8 });
  for (const [w, d, x, z] of [[7.6, 0.08, 0, 1.75], [7.6, 0.08, 0, -1.05], [0.08, 2.8, -3.8, 0.35], [0.08, 2.8, 3.8 + 0.6, 0.35]]) {
    const s = mesh(new THREE.PlaneGeometry(w, d), stripe, x, 0.004, z);
    s.rotation.x = -Math.PI / 2; s.castShadow = false;
  }

  /* ---- conveyor: x from -3 to 3, belt top at y = 0.86 ---- */
  const L = 6, W = 0.7, TOPY = 0.86;
  mesh(new THREE.BoxGeometry(L, 0.14, 0.06), M.frame, 0, TOPY - 0.05, W / 2 + 0.04);
  mesh(new THREE.BoxGeometry(L, 0.14, 0.06), M.frame, 0, TOPY - 0.05, -W / 2 - 0.04);
  for (let x = -2.7; x <= 2.71; x += 1.35) {
    for (const z of [W / 2 + 0.04, -W / 2 - 0.04]) mesh(new THREE.BoxGeometry(0.07, TOPY - 0.1, 0.07), M.leg, x, (TOPY - 0.1) / 2, z);
    mesh(new THREE.BoxGeometry(0.05, 0.05, W + 0.1), M.leg, x, 0.25, 0);
  }
  // belt surface with a scrolling texture
  const bc = document.createElement('canvas'); bc.width = 64; bc.height = 64;
  const bg = bc.getContext('2d');
  bg.fillStyle = '#1e2225'; bg.fillRect(0, 0, 64, 64);
  bg.fillStyle = '#2c3236'; bg.fillRect(0, 0, 10, 64);
  const beltTex = new THREE.CanvasTexture(bc);
  beltTex.wrapS = beltTex.wrapT = THREE.RepeatWrapping;
  beltTex.repeat.set(30, 1);
  beltTex.colorSpace = THREE.SRGBColorSpace;
  const beltMat = std(0xffffff, { map: beltTex, roughness: 0.9 });
  mesh(new THREE.BoxGeometry(L, 0.04, W), beltMat, 0, TOPY - 0.02, 0);
  // end drums
  const drums = [];
  for (const x of [-L / 2, L / 2]) {
    const d = mesh(new THREE.CylinderGeometry(0.06, 0.06, W, 20), M.drum, x, TOPY - 0.06, 0);
    d.rotation.x = Math.PI / 2;
    drums.push(d);
  }

  /* ---- motor + gearbox at the discharge end ---- */
  const motor = new THREE.Group();
  motor.position.set(L / 2 - 0.05, TOPY - 0.1, W / 2 + 0.34);
  scene.add(motor);
  mesh(new THREE.BoxGeometry(0.26, 0.26, 0.2), M.motor, 0, 0, -0.18, motor);
  const mBody = mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.42, 24), M.motor, 0, 0, 0.12, motor);
  mBody.rotation.x = Math.PI / 2;
  const fan = mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.04, 6), M.dark, 0, 0, 0.35, motor);
  fan.rotation.x = Math.PI / 2;
  const fanMark = mesh(new THREE.BoxGeometry(0.2, 0.03, 0.02), M.yellow, 0, 0, 0.375, motor);
  mesh(new THREE.BoxGeometry(0.08, 0.12, 0.42), M.leg, 0, -0.35, 0.05, motor);

  /* ---- discharge bin ---- */
  const bin = new THREE.Group(); bin.position.set(L / 2 + 0.65, 0, 0); scene.add(bin);
  for (const [w, h, d, x, y, z] of [[0.9, 0.05, 0.9, 0, 0.025, 0], [0.05, 0.5, 0.9, -0.43, 0.25, 0], [0.05, 0.5, 0.9, 0.43, 0.25, 0], [0.9, 0.5, 0.05, 0, 0.25, 0.43], [0.9, 0.5, 0.05, 0, 0.25, -0.43]]) {
    mesh(new THREE.BoxGeometry(w, h, d), M.bin, x, y, z, bin);
  }

  /* ---- photo-eye (jam sensor, I0.2) at x = 1.2 ---- */
  const PEX = 1.2;
  const clickable = [];
  const peGroup = new THREE.Group(); scene.add(peGroup);
  mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.5, 10), M.leg, PEX, TOPY + 0.1, W / 2 + 0.12, peGroup);
  const peHead = mesh(new THREE.BoxGeometry(0.1, 0.12, 0.08), M.yellow, PEX, TOPY + 0.2, W / 2 + 0.12, peGroup);
  const peLed = mesh(new THREE.SphereGeometry(0.018, 12, 8), new THREE.MeshStandardMaterial({ color: 0x331111, emissive: 0x000000 }), PEX, TOPY + 0.25, W / 2 + 0.165, peGroup);
  mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.5, 10), M.leg, PEX, TOPY + 0.1, -W / 2 - 0.12, peGroup);
  mesh(new THREE.BoxGeometry(0.1, 0.12, 0.03), std(0xd23a2e, { roughness: 0.3 }), PEX, TOPY + 0.2, -W / 2 - 0.12, peGroup);
  const beamMat = new THREE.MeshBasicMaterial({ color: 0xff3b30, transparent: true, opacity: 0.18 });
  const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, W + 0.2, 8), beamMat);
  beam.rotation.x = Math.PI / 2; beam.position.set(PEX, TOPY + 0.2, 0);
  scene.add(beam);
  const peHit = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.4, W + 0.4), new THREE.MeshBasicMaterial({ visible: false }));
  peHit.position.set(PEX, TOPY + 0.15, 0); scene.add(peHit);
  peHit.userData = { action: 'sensor' }; peHead.userData = { action: 'sensor' };
  clickable.push(peHit, peHead);
  const peLabel = label('I0.2', 0.16, 0.06); peLabel.position.set(PEX, TOPY + 0.33, W / 2 + 0.12); scene.add(peLabel);

  /* ---- stack light (Q0.1 green, Q0.2 red, Q0.3 horn) ---- */
  const tower = new THREE.Group(); tower.position.set(-L / 2 + 0.2, 0, -W / 2 - 0.35); scene.add(tower);
  mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.05, 20), M.dark, 0, 0.025, 0, tower);
  mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.5, 12), M.frame, 0, 0.75, 0, tower);
  const lampMat = c => new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 0, transparent: true, opacity: 0.92, roughness: 0.25 });
  const green = mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.14, 20), lampMat(0x2ec266), 0, 1.57, 0, tower);
  const red = mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.14, 20), lampMat(0xe5352a), 0, 1.72, 0, tower);
  const horn = mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.1, 20), M.dark, 0, 1.84, 0, tower);
  const hornRing = mesh(new THREE.TorusGeometry(0.1, 0.008, 6, 24), new THREE.MeshBasicMaterial({ color: 0xff7a1a, transparent: true, opacity: 0 }), 0, 1.84, 0, tower);
  hornRing.rotation.x = Math.PI / 2;
  const gLight = new THREE.PointLight(0x2ec266, 0, 3); gLight.position.set(0, 1.57, 0.15); tower.add(gLight);
  const rLight = new THREE.PointLight(0xe5352a, 0, 3); rLight.position.set(0, 1.72, 0.15); tower.add(rLight);

  /* ---- operator control box (I0.0 Start, I0.1 Stop, I0.3 E-Stop) ---- */
  const box = new THREE.Group(); box.position.set(-1.6, 0, W / 2 + 0.75); scene.add(box);
  mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.0, 12), M.leg, 0, 0.5, -0.05, box);
  mesh(new THREE.BoxGeometry(0.3, 0.04, 0.3), M.dark, 0, 0.02, -0.05, box);
  mesh(new THREE.BoxGeometry(0.62, 0.28, 0.16), M.yellow, 0, 1.12, 0, box);
  const buttons = {};
  function pushButton(key, x, color, text) {
    mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.02, 24), M.dark, x, 1.15, 0.085, box).rotation.x = Math.PI / 2;
    const b = mesh(new THREE.CylinderGeometry(0.038, 0.038, 0.04, 24), std(color, { roughness: 0.3 }), x, 1.15, 0.1, box);
    b.rotation.x = Math.PI / 2;
    b.userData = { action: key, rest: 0.1 };
    clickable.push(b);
    const lb = label(text, 0.13, 0.04); lb.position.set(x, 1.04, 0.081); box.add(lb);
    buttons[key] = b;
  }
  pushButton('start', -0.2, 0x2ec266, 'START');
  pushButton('stop', 0, 0xe5352a, 'STOP');
  // E-stop: yellow collar + red mushroom
  mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.015, 28), M.yellow, 0.2, 1.15, 0.088, box).rotation.x = Math.PI / 2;
  mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.04, 16), M.dark, 0.2, 1.15, 0.1, box).rotation.x = Math.PI / 2;
  const mush = mesh(new THREE.SphereGeometry(0.06, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), std(0xd2231a, { roughness: 0.35 }), 0.2, 1.15, 0.12, box);
  mush.rotation.x = Math.PI / 2;
  mush.userData = { action: 'estop', rest: 0.12 };
  clickable.push(mush);
  buttons.estop = mush;
  const el = label('E-STOP', 0.13, 0.04); el.position.set(0.2, 1.04, 0.081); box.add(el);
  const boxLabel = label('PLC LAB · CELL 01', 0.5, 0.05); boxLabel.position.set(0, 1.22, 0.081); box.add(boxLabel);

  /* ---- electrical cabinet with the PLC's DQ LEDs ---- */
  const cab = new THREE.Group(); cab.position.set(-L / 2 - 0.9, 0, -0.2); cab.rotation.y = Math.PI / 2.6; scene.add(cab);
  mesh(new THREE.BoxGeometry(0.8, 1.8, 0.4), M.cabinet, 0, 0.9, 0, cab);
  mesh(new THREE.BoxGeometry(0.8, 0.1, 0.42), M.dark, 0, 0.05, 0, cab);
  mesh(new THREE.BoxGeometry(0.42, 0.22, 0.02), std(0x1b2024), 0, 1.35, 0.205, cab);
  const leds = [];
  for (let i = 0; i < 8; i++) {
    const m = mesh(new THREE.SphereGeometry(0.012, 8, 6), new THREE.MeshStandardMaterial({ color: 0x223322, emissive: 0x000000 }), -0.14 + (i % 4) * 0.06, 1.39 - Math.floor(i / 4) * 0.07, 0.218, cab);
    leds.push(m);
  }
  const cl = label('DI  ·  DQ', 0.3, 0.05); cl.position.set(0, 1.5, 0.206); cab.add(cl);
  const warn = mesh(new THREE.PlaneGeometry(0.16, 0.14), new THREE.MeshBasicMaterial({ color: 0xf2c21b }), 0, 0.9, 0.201, cab);
  warn.castShadow = false;

  /* ---- cartons ---- */
  const BOX = { w: 0.36, h: 0.28, d: 0.34 };
  const cartonGeo = new THREE.BoxGeometry(BOX.w, BOX.h, BOX.d);
  const tapeGeo = new THREE.BoxGeometry(BOX.w + 0.004, 0.01, 0.07);
  const cartons = [];
  function addCarton(x) {
    const g = new THREE.Group();
    mesh(cartonGeo, M.box, 0, 0, 0, g);
    mesh(tapeGeo, M.tape, 0, BOX.h / 2 + 0.002, 0, g);
    g.position.set(x, TOPY + BOX.h / 2, (Math.random() - 0.5) * 0.12);
    g.rotation.y = (Math.random() - 0.5) * 0.15;
    g.userData = { vy: 0 };
    scene.add(g);
    cartons.push(g);
  }
  [-2.6, -1.0, 0.5].forEach(addCarton);
  const SPACING = 1.5, SPEED = 0.55;
  let sinceSpawn = 0;

  /* ---- interaction ---- */
  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  let held = null;
  function pick(e) {
    const r = renderer.domElement.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects(clickable, false)[0];
    return hit ? hit.object.userData.action : null;
  }
  // Capture on the parent so a press on a device never starts an orbit drag.
  host.addEventListener('pointerdown', e => {
    if (e.target !== renderer.domElement) return;
    const a = pick(e);
    if (!a) return;
    e.stopPropagation();
    e.preventDefault();
    orbit.enabled = false;
    if (a === 'start' || a === 'stop') { held = a; io.press(a, true); }
    else io.toggle(a);
  }, true);
  const release = () => {
    if (held) { io.press(held, false); held = null; }
    orbit.enabled = true;
  };
  window.addEventListener('pointerup', release);
  window.addEventListener('pointercancel', release);
  renderer.domElement.addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse') return;
    renderer.domElement.style.cursor = pick(e) ? 'pointer' : '';
  });
  document.getElementById('sceneReset').addEventListener('click', () => {
    camera.position.copy(HOME.pos); orbit.target.copy(HOME.target); orbit.update();
  });

  /* ---- theme ---- */
  function applyTheme() {
    const bg = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() || '#12171A';
    scene.background = new THREE.Color(bg);
    scene.fog = new THREE.Fog(bg, 14, 28);
    const light = document.documentElement.getAttribute('data-theme') === 'light';
    M.floor.color.set(light ? 0xc9c4bb : 0x3a4146);
  }
  applyTheme();
  new MutationObserver(applyTheme).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  /* ---- size + visibility ---- */
  function resize() {
    const w = host.clientWidth, h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = camera.aspect < 1 ? 62 : camera.aspect < 1.6 ? 50 : 42;   // keep the whole cell in frame on phones
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(host);
  resize();
  let onScreen = true;
  new IntersectionObserver(es => { onScreen = es[0].isIntersecting; if (onScreen) loop(); }).observe(host);

  /* ---- frame loop ---- */
  const clock = new THREE.Clock();
  let running = false;
  function loop() {
    if (running) return;
    running = true;
    clock.getDelta();
    requestAnimationFrame(frame);
  }
  function frame() {
    if (!onScreen || document.hidden) { running = false; return; }
    requestAnimationFrame(frame);
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = performance.now() / 1000;

    const moving = io.physical('Q0.0');
    if (moving) {
      const dx = SPEED * dt;
      beltTex.offset.x -= dx * beltTex.repeat.x / L;
      drums.forEach(d => { d.rotation.y -= dx / 0.06; });
      fan.rotation.y += dt * 40; fanMark.rotation.z -= dt * 40;
      sinceSpawn += dx;
      if (sinceSpawn > SPACING) { sinceSpawn = 0; addCarton(-L / 2 + 0.25); }
    }
    for (let i = cartons.length - 1; i >= 0; i--) {
      const c = cartons[i];
      const onBelt = c.position.x < L / 2 + 0.05;
      if (onBelt) {
        if (moving) c.position.x += SPEED * dt;
      } else {                                   // past the drum: drop into the bin
        c.userData.vy -= 9.8 * dt;
        c.position.x += SPEED * dt;
        c.position.y += c.userData.vy * dt;
        c.rotation.z -= dt * 1.5;
        if (c.position.y < 0.3) { scene.remove(c); cartons.splice(i, 1); }
      }
    }

    // photo-eye: beam shows the voltage on the sensor output (TP5)
    const blocked = io.sensorBlocked();
    beamMat.opacity = blocked ? 0.85 : 0.18;
    peLed.material.emissive.setHex(blocked ? 0xff7a1a : 0x000000);

    // stack light + horn
    const g = io.physical('Q0.1'), r = io.physical('Q0.2'), hz = io.physical('Q0.3');
    green.material.emissiveIntensity = g ? 1.6 : 0; gLight.intensity = g ? 2.5 : 0;
    red.material.emissiveIntensity = r ? 1.6 : 0; rLight.intensity = r ? 2.5 : 0;
    hornRing.material.opacity = hz ? 0.9 : 0;
    hornRing.scale.setScalar(hz ? 1 + ((t * 3) % 1) * 0.8 : 1);

    // buttons follow the physical devices (also when pressed on the 2D panel or keyboard)
    buttons.start.position.z = buttons.start.userData.rest - (io.field.start ? 0.015 : 0);
    buttons.stop.position.z = buttons.stop.userData.rest - (io.field.stop ? 0.015 : 0);
    buttons.estop.position.z = buttons.estop.userData.rest - (io.field.estop ? 0.025 : 0);

    // cabinet LEDs mirror the CPU DI / DQ LEDs
    for (let i = 0; i < 4; i++) {
      leds[i].material.emissive.setHex(App.img['I0.' + i] ? 0x24c35e : 0x000000);
      leds[i + 4].material.emissive.setHex(App.img['Q0.' + i] ? 0x24c35e : 0x000000);
    }

    orbit.update();
    renderer.render(scene, camera);
  }
  loop();
  host.classList.add('ready');
}
