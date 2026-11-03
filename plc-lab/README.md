# PLC Lab — Interactive PLC Simulator

A real-time virtual PLC workbench that runs in the browser (FR / EN / AR, light and dark theme).

- **Field inputs**: Start PB (momentary, NO), Stop PB (momentary, wired NC), jam sensor (toggle, PNP), E-Stop (latching, wired NC). Keyboard: keys `1`–`4`.
- **Live Ladder diagram**: 5 networks drawn as SVG. Power flow, closed contacts and energised coils highlight on every scan (10 ms). The drawn program is the same tree the simulator evaluates, so the picture can never disagree with the logic.
- **Outputs**: conveyor motor (Q0.0), running light (Q0.1), fault pilot light (Q0.2), buzzer alarm (Q0.3, optional sound). Each output can be forced AUTO / ON / OFF.
- **Multimeter**: 10 test points (supply, safety-switched 1L+, every input and output terminal) with realistic readings.
- **CPU module**: RUN/STOP switch, status LEDs and DI/DQ LEDs.
- **Exercises** that tick themselves off, plus an event log of every bit change.

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

Static site, no build step and no dependencies: open `index.html`, or serve the folder (`python3 -m http.server`).

```
index.html     page
css/style.css  styles
js/i18n.js     FR / EN / AR strings + language switcher
js/ladder.js   program, ladder evaluator and SVG renderer
js/app.js      field devices, scan loop, outputs, multimeter, exercises, log
```

To change the logic, edit `PROGRAM` in `js/ladder.js`; the diagram redraws itself from it.
