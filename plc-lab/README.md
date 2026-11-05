# PLC Lab — Interactive PLC Simulator

A real-time virtual PLC workbench that runs in the browser (FR / EN / AR, light and dark theme).

- **Field inputs**: Start PB (momentary, NO), Stop PB (momentary, wired NC), jam sensor (toggle, PNP), E-Stop (latching, wired NC). Keyboard: keys `1`–`4`.
- **Live Ladder diagram**: 5 networks drawn as SVG. Power flow, closed contacts and energised coils highlight on every scan (10 ms). The drawn program is the same tree the simulator evaluates, so the picture can never disagree with the logic.
- **Outputs**: conveyor motor (Q0.0), running light (Q0.1), fault pilot light (Q0.2), buzzer alarm (Q0.3, optional sound). Each output can be forced AUTO / ON / OFF.
- **Multimeter**: 10 test points (supply, safety-switched 1L+, every input and output terminal) with realistic readings.
- **CPU module**: RUN/STOP switch, status LEDs and DI/DQ LEDs.
- **Exercises** that tick themselves off, plus an event log of every bit change.
- **3D conveyor cell** (three.js): belt, cartons dropping into a bin, motor, photo-eye, stack light with horn, operator control box and a cabinet with DI/DQ LEDs. It reads the live simulation every frame, and its Start / Stop / E-Stop buttons and photo-eye are clickable. Orbit, zoom and pan with mouse or touch.
- **10 troubleshooting problems**: each injects a hidden fault, then you diagnose it from the measurements and pick the cause (4 choices, with an explanation once solved). Progress is saved in the browser.

## Troubleshooting problems

| # | Hidden fault | Key evidence |
|---|---|---|
| 1 | Start button contact / wire open | TP3 stays 0 V while Start is held |
| 2 | PLC input channel I0.0 dead | TP3 = 24 V but DI .0 stays off |
| 3 | Stop circuit wire broken | TP4 = 0 V without pressing Stop |
| 4 | Jam sensor stuck ON | TP5 ≈ 23 V with the sensor off; fault won't reset |
| 5 | 1L+ supply lost (fuse / E-Stop relay) | TP2 = 0 V with E-Stop released |
| 6 | PLC output channel Q0.0 dead | DQ .0 on, TP2 = 24 V, TP7 = 0 V |
| 7 | Contactor coil / motor faulty | TP7 = 23.6 V but the belt doesn't move |
| 8 | Running-light bulb burnt | TP8 = 23.7 V, lamp dark |
| 9 | Program: seal-in branch deleted | Network 1 has no Q0.0 branch |
| 10 | Program: Stop programmed NC | TP4 = 24 V, I0.1 contact open in network 1 |

Faults live in `fault` in `js/app.js` (wiring, hardware and devices) and in `makeProgram()` in `js/ladder.js` (program bugs).

## Program

| Network | Logic |
|---|---|
| 1 | `Q0.0 = (I0.0 OR Q0.0) AND I0.1 AND I0.3 AND NOT M0.0` — motor with seal-in |
| 2 | `M0.0 = I0.2 OR NOT I0.3 OR (M0.0 AND I0.1)` — fault latch, reset with Stop |
| 3 | `Q0.1 = Q0.0` |
| 4 | `Q0.2 = M0.0` |
| 5 | `Q0.3 = M0.0 AND M0.1` (1 Hz clock) |

Q0.0 is powered from 1L+, which the E-Stop safety relay cuts; Q0.1–Q0.3 run from 2L+, which stays live.

## Run it

Static site, no build step: serve the folder (`python3 -m http.server`) and open it. three.js is bundled in `vendor/`, so nothing is fetched from a CDN.

```
index.html     page
css/style.css  styles
js/i18n.js     FR / EN / AR strings + language switcher
js/ladder.js   program, ladder evaluator and SVG renderer
js/app.js      field devices, scan loop, outputs, multimeter, exercises, problems, log
js/scene3d.js  3D conveyor cell (ES module, reads App.img / App.io)
vendor/three/  three.js r160 + OrbitControls (MIT), loaded through an import map
```

The 3D view needs WebGL; without it the panel shows a short notice and the rest of the workbench works as usual. Serve the folder over HTTP for the 3D view (ES modules don't load from `file://`).

To change the logic, edit `makeProgram()` in `js/ladder.js`; the diagram redraws itself from it.
