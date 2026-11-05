/* ---------- Translations ----------
   Keys map to data-i18n attributes. French is the default. Values may hold a
   little of our own markup (<b>), so they are set with innerHTML. */
const TRANSLATIONS = {
  fr: {
    'meta.title': "PLC Lab — Simulateur interactif d'automate",
    'meta.desc': "Établi virtuel en temps réel : boutons, capteur, arrêt d'urgence, multimètre, schéma à contacts (Ladder) animé et sorties d'un convoyeur.",
    'brand.sub': 'Simulateur interactif',
    'lang.label': 'Langue',
    'theme.toggle': 'Basculer le thème clair / sombre',
    'sound.toggle': 'Son du buzzer',

    'intro.title': "Établi virtuel d'automate",
    'intro.p': "Actionnez les boutons et le capteur, mesurez les tensions au multimètre et regardez le programme Ladder s'exécuter en direct, scan après scan.",

    'in.title': 'Pupitre opérateur — entrées',
    'in.start': 'Marche',
    'in.start.label': 'Bouton Marche (maintenir enfoncé)',
    'in.stop': 'Arrêt',
    'in.stop.label': 'Bouton Arrêt (maintenir enfoncé)',
    'in.sensor': 'Capteur bourrage',
    'in.sensor.label': 'Capteur de bourrage',
    'in.estop': "Arrêt d'urgence",
    'in.estop.label': "Arrêt d'urgence (verrouillé)",
    'in.hint': "Marche et Arrêt sont à impulsion : maintenez‑les enfoncés. Le capteur bascule. L'arrêt d'urgence reste verrouillé jusqu'au déverrouillage. Clavier : touches 1 à 4.",

    'lad.title': 'Programme Ladder — en direct',
    'lad.label': 'Schéma à contacts du programme, mis à jour à chaque scan',
    'lad.leg.power': 'Flux de courant',
    'lad.leg.true': 'Contact passant / bobine active',
    'lad.leg.force': 'Sortie forcée',
    'cpu.mode': 'Mode de la CPU',
    'rung.1': 'Moteur : marche avec auto‑maintien, arrêt, AU et défaut',
    'rung.2': 'Mémoire défaut : bourrage ou AU, acquittée par Arrêt',
    'rung.3': 'Voyant marche = moteur en marche',
    'rung.4': 'Voyant défaut = mémoire défaut',
    'rung.5': 'Buzzer pulsé à 1 Hz tant que le défaut est actif',

    'out.title': 'Sorties — terrain',
    'out.motor': 'Moteur convoyeur',
    'out.run': 'Voyant marche',
    'out.fault': 'Voyant défaut',
    'out.buzzer': "Buzzer d'alarme",
    'out.force': 'Forçage de la sortie',
    'out.hint': "Le forçage écrase le résultat du programme dans l'image des sorties — comme dans une console de programmation. Q0.0 est alimenté par 1L+, coupé par l'arrêt d'urgence ; les voyants et le buzzer par 2L+, toujours sous tension.",

    'dmm.title': 'Multimètre — points de test',
    'dmm.mode': 'Calibre du multimètre',
    'dmm.red': 'Rouge → point choisi',
    'dmm.black': 'Noir → M (0 V)',
    'dmm.tps': 'Points de test',
    'tp.1': 'Alimentation L+',
    'tp.2': '1L+ après relais AU',
    'tp.3': 'Borne entrée Marche',
    'tp.4': 'Borne entrée Arrêt',
    'tp.5': 'Sortie capteur PNP',
    'tp.6': 'Borne entrée AU',
    'tp.7': 'Bobine contacteur moteur',
    'tp.8': 'Voyant marche',
    'tp.9': 'Voyant défaut',
    'tp.10': 'Buzzer',

    'cpu.title': "CPU — voyants d'état",
    'ex.title': 'Exercices',
    'ex.seal': "Démarrez le convoyeur puis relâchez Marche : l'auto‑maintien (Q0.0 en parallèle) le garde en marche.",
    'ex.stop': 'Arrêtez‑le avec le bouton Arrêt (contact NO sur une entrée câblée NC).',
    'ex.latch': 'Pendant la marche, activez le capteur : le défaut M0.0 se verrouille, le buzzer pulse.',
    'ex.reset': 'Libérez le capteur, puis acquittez le défaut avec Arrêt.',
    'ex.measure': "Forcez Q0.0 à ON, appuyez sur l'arrêt d'urgence et mesurez TP7 : pourquoi 0 V ?",
    'ex.again': 'Recommencer',
    'ex.done': 'Exercice réussi',

    'log.title': 'Journal des événements',
    'log.clear': 'Effacer',
    'log.ready': 'CPU prête — programme chargé (5 réseaux)',
    'log.run': 'CPU → RUN',
    'log.stop': 'CPU → STOP : sorties à 0',
    'log.force': 'Forçage',
    'log.ex': 'Exercice réussi',
    'log.meter': 'Mesure',

    "pb.title": "Dépannage — 10 problèmes",
    "pb.resetall": "Réinitialiser",
    "pb.free": "Mode libre",
    "pb.label": "Problème",
    "pb.log": "Problème chargé",
    "pb.intro": "Choisissez un problème : une panne cachée est introduite dans le câblage, l'automate ou le programme. Faites tourner la machine, mesurez au multimètre, lisez les voyants E/S et le Ladder, puis choisissez la cause. Le mode libre remet la machine en bon état.",
    "pb.tip": "Astuce : choisissez d'abord un point de test, puis maintenez le bouton — la mesure en direct s'affiche sous le pupitre.",
    "pb.q": "Quelle est la cause ?",
    "pb.check": "Vérifier",
    "pb.reveal": "Voir la réponse",
    "pb.restart": "Recommencer",
    "pb.next": "Suivant",
    "pb.ok": "Exact !",
    "pb.no": "Ce n'est pas ça — refaites une mesure et comparez.",
    "pb.answer": "Réponse :",
    "pb.1.sym": "« L'opérateur appuie sur Marche : rien ne se passe. Aucun voyant défaut. »",
    "pb.2.sym": "« Depuis ce matin le convoyeur ne démarre plus. Le bouton Marche semble mort. »",
    "pb.3.sym": "« Le convoyeur ne démarre pas. Rien d'autre ne paraît anormal. »",
    "pb.4.sym": "« Le voyant défaut reste allumé et le buzzer ne s'arrête pas, même après Arrêt. Il n'y a aucun bourrage sur la bande. »",
    "pb.5.sym": "« Le voyant marche s'allume quand on appuie sur Marche, mais la bande ne bouge pas. »",
    "pb.6.sym": "« Voyant marche allumé, bande à l'arrêt. Le moteur a été remplacé le mois dernier. »",
    "pb.7.sym": "« Le voyant marche est allumé, mais la bande ne bouge pas et le moteur ne fait aucun bruit. »",
    "pb.8.sym": "« La bande tourne normalement, mais le voyant marche du pupitre reste éteint. »",
    "pb.9.sym": "« La bande ne tourne que tant que l'opérateur maintient Marche ; elle s'arrête dès qu'il relâche. »",
    "pb.10.sym": "« Après une modification du programme cette nuit, le convoyeur ne démarre plus. Aucun fil n'a été touché. »",
    "pb.1.exp": "Maintenez Marche avec TP3 sélectionné : il reste à 0 V et DI .0 reste éteint. Le 24 V n'arrive jamais à l'entrée : le contact du bouton ou son fil est ouvert.",
    "pb.2.exp": "TP3 affiche 24 V quand Marche est maintenu, mais le voyant DI .0 et le contact I0.0 restent éteints. La tension est sur la borne mais l'automate ne la voit pas : la voie d'entrée est en panne.",
    "pb.3.exp": "TP4 affiche 0 V sans toucher Arrêt, et I0.1 est ouvert dans le réseau 1. Un Arrêt câblé NC est à sécurité positive : un fil coupé équivaut à Arrêt enfoncé, la machine ne peut pas démarrer.",
    "pb.4.exp": "TP5 affiche environ 23 V capteur relâché et I0.2 est actif dans le réseau 2 : M0.0 se réarme dès qu'Arrêt est relâché. Nettoyez ou réalignez le capteur.",
    "pb.5.exp": "DQ .0 est allumé et le réseau 1 est passant, mais TP2 (1L+) est à 0 V AU relâché, donc TP7 aussi. Le groupe de sorties a perdu son alimentation : vérifiez le fusible et le relais de sécurité.",
    "pb.6.exp": "TP2 est à 24 V et le voyant DQ .0 est allumé, mais TP7 reste à 0 V. Alimentation et programme sont bons : c'est la voie de sortie Q0.0 elle‑même qui est morte.",
    "pb.7.exp": "TP7 affiche 23,6 V : l'automate fait son travail et la tension arrive à la bobine du contacteur. La panne est en aval : bobine coupée, contacteur ou moteur.",
    "pb.8.exp": "DQ .1 est allumé et TP8 affiche 23,7 V, pourtant le voyant reste éteint : automate et câblage sont bons, l'ampoule est grillée.",
    "pb.9.exp": "Le réseau 1 n'a plus de contact Q0.0 en parallèle de I0.0. Sans branche d'auto‑maintien, la bobine retombe dès que Marche est relâché.",
    "pb.10.exp": "TP4 affiche 24 V : le circuit d'Arrêt est sain et I0.1 = 1. Mais le réseau 1 utilise maintenant un contact NC sur I0.1, ouvert quand le bit vaut 1. Un Arrêt câblé NC se programme avec un contact NO.",
    "cause.1": "Contact du bouton Marche ou son fil ouvert",
    "cause.2": "Voie d'entrée I0.0 de l'automate en panne",
    "cause.3": "Fil du circuit d'Arrêt coupé",
    "cause.4": "Capteur de bourrage bloqué à 1 (sale / déréglé)",
    "cause.5": "Alimentation 1L+ perdue (fusible / relais AU)",
    "cause.6": "Voie de sortie Q0.0 de l'automate en panne",
    "cause.7": "Bobine du contacteur ou moteur en panne",
    "cause.8": "Ampoule du voyant marche grillée",
    "cause.9": "Programme : branche d'auto‑maintien manquante",
    "cause.10": "Programme : Arrêt programmé en contact NC",

    "scene.title": "Cellule convoyeur — vue 3D",
    "scene.reset": "Recentrer la vue",
    "scene.label": "Vue 3D de la cellule convoyeur, pilotée par la simulation",
    "scene.hint": "Faites glisser pour tourner, molette ou pincement pour zoomer. Cliquez sur Marche, Arrêt et l'arrêt d'urgence du boîtier jaune, et sur la cellule photoélectrique pour la masquer.",
    "scene.nogl": "La vue 3D a besoin de WebGL, indisponible dans ce navigateur. Le reste de l'établi fonctionne normalement.",

    'foot': 'Simulation pédagogique — câblage 24 V DC, adresses de type S7‑1200.'
  },

  en: {
    'meta.title': 'PLC Lab — Interactive PLC Simulator',
    'meta.desc': 'A real-time virtual workbench: push buttons, sensor, E-stop, multimeter, a live Ladder Logic diagram and conveyor outputs.',
    'brand.sub': 'Interactive simulator',
    'lang.label': 'Language',
    'theme.toggle': 'Toggle light / dark theme',
    'sound.toggle': 'Buzzer sound',

    'intro.title': 'Virtual PLC workbench',
    'intro.p': 'Operate the push buttons and sensor, probe voltages with the multimeter and watch the Ladder program execute live, scan after scan.',

    'in.title': 'Operator panel — inputs',
    'in.start': 'Start',
    'in.start.label': 'Start push button (hold)',
    'in.stop': 'Stop',
    'in.stop.label': 'Stop push button (hold)',
    'in.sensor': 'Jam sensor',
    'in.sensor.label': 'Jam sensor switch',
    'in.estop': 'E‑Stop',
    'in.estop.label': 'Emergency stop (latching)',
    'in.hint': 'Start and Stop are momentary: hold them down. The sensor toggles. The E‑Stop stays latched until you release it. Keyboard: keys 1 to 4.',

    'lad.title': 'Ladder program — live',
    'lad.label': 'Ladder diagram of the program, updated every scan',
    'lad.leg.power': 'Power flow',
    'lad.leg.true': 'Contact closed / coil energised',
    'lad.leg.force': 'Forced output',
    'cpu.mode': 'CPU mode',
    'rung.1': 'Motor: start with seal-in, stop, E-stop and fault interlock',
    'rung.2': 'Fault memory: jam or E-stop, reset with Stop',
    'rung.3': 'Run lamp = motor running',
    'rung.4': 'Fault lamp = fault memory',
    'rung.5': 'Buzzer pulsed at 1 Hz while the fault is active',

    'out.title': 'Outputs — field',
    'out.motor': 'Conveyor motor',
    'out.run': 'Running light',
    'out.fault': 'Fault pilot light',
    'out.buzzer': 'Buzzer alarm',
    'out.force': 'Output forcing',
    'out.hint': 'Forcing overrides the program result in the output image — just like a programming tool. Q0.0 is supplied from 1L+, which the E‑Stop cuts; the lamps and buzzer run from 2L+, which stays live.',

    'dmm.title': 'Multimeter — test points',
    'dmm.mode': 'Multimeter range',
    'dmm.red': 'Red → selected point',
    'dmm.black': 'Black → M (0 V)',
    'dmm.tps': 'Test points',
    'tp.1': 'Power supply L+',
    'tp.2': '1L+ after E‑stop relay',
    'tp.3': 'Start input terminal',
    'tp.4': 'Stop input terminal',
    'tp.5': 'PNP sensor output',
    'tp.6': 'E‑Stop input terminal',
    'tp.7': 'Motor contactor coil',
    'tp.8': 'Running light',
    'tp.9': 'Fault light',
    'tp.10': 'Buzzer',

    'cpu.title': 'CPU — status LEDs',
    'ex.title': 'Exercises',
    'ex.seal': 'Start the conveyor, then let go of Start: the seal-in contact (Q0.0 in parallel) keeps it running.',
    'ex.stop': 'Stop it with the Stop button (an NO contact on an input wired NC).',
    'ex.latch': 'While running, trip the sensor: fault M0.0 latches and the buzzer pulses.',
    'ex.reset': 'Clear the sensor, then reset the fault with Stop.',
    'ex.measure': 'Force Q0.0 ON, press the E‑Stop and measure TP7: why 0 V?',
    'ex.again': 'Start over',
    'ex.done': 'Exercise complete',

    'log.title': 'Event log',
    'log.clear': 'Clear',
    'log.ready': 'CPU ready — program loaded (5 networks)',
    'log.run': 'CPU → RUN',
    'log.stop': 'CPU → STOP: outputs off',
    'log.force': 'Force',
    'log.ex': 'Exercise complete',
    'log.meter': 'Measure',

    "pb.title": "Troubleshooting — 10 problems",
    "pb.resetall": "Reset progress",
    "pb.free": "Free mode",
    "pb.label": "Problem",
    "pb.log": "Problem loaded",
    "pb.intro": "Pick a problem: a hidden fault is put into the wiring, the PLC or the program. Run the machine, measure with the multimeter, read the I/O LEDs and the ladder, then choose the cause. Free mode puts the healthy machine back.",
    "pb.tip": "Tip: select a test point first, then hold the button — the live reading is shown under the operator panel.",
    "pb.q": "What is the cause?",
    "pb.check": "Check",
    "pb.reveal": "Show answer",
    "pb.restart": "Restart",
    "pb.next": "Next",
    "pb.ok": "Correct!",
    "pb.no": "Not this one — take another measurement and compare.",
    "pb.answer": "Answer:",
    "pb.1.sym": "“The operator presses Start: nothing happens. No fault light.”",
    "pb.2.sym": "“Since this morning the conveyor won’t start. The Start button seems dead.”",
    "pb.3.sym": "“The conveyor won’t start. Nothing else looks wrong.”",
    "pb.4.sym": "“The fault light stays on and the buzzer won’t stop, even after pressing Stop. There is no jam on the belt.”",
    "pb.5.sym": "“The running light comes on when Start is pressed, but the belt doesn’t move.”",
    "pb.6.sym": "“Running light on, belt stopped. The motor was replaced last month.”",
    "pb.7.sym": "“The running light is on, but the belt doesn’t move and the motor is silent.”",
    "pb.8.sym": "“The belt runs normally, but the running light on the panel stays dark.”",
    "pb.9.sym": "“The belt only runs while the operator holds Start; it stops as soon as Start is released.”",
    "pb.10.sym": "“After a program change last night, the conveyor won’t start. No wires were touched.”",
    "pb.1.exp": "Hold Start with TP3 selected: it stays at 0 V and DI .0 stays off. The 24 V never reaches the input, so the button contact or its wire is open.",
    "pb.2.exp": "TP3 reads 24 V while Start is held, yet the DI .0 LED and the I0.0 contact stay off. The voltage is on the terminal but the PLC does not see it: the input channel is faulty.",
    "pb.3.exp": "TP4 reads 0 V without touching Stop, and I0.1 is open in network 1. A Stop button wired NC is fail-safe: a broken wire looks exactly like Stop pressed, so the machine cannot start.",
    "pb.4.exp": "TP5 reads about 23 V with the sensor switch off and I0.2 is on in network 2, so M0.0 sets again as soon as Stop is released. Clean or realign the sensor.",
    "pb.5.exp": "DQ .0 is on and network 1 is energised, but TP2 (1L+) reads 0 V with the E‑Stop released, so TP7 is 0 V too. The output group has lost its supply: check the fuse and the E‑Stop safety relay.",
    "pb.6.exp": "TP2 has 24 V and the DQ .0 LED is on, but TP7 stays at 0 V. Supply and program are fine; the Q0.0 output channel itself is dead.",
    "pb.7.exp": "TP7 reads 23.6 V: the PLC is doing its job and the voltage reaches the contactor coil. The fault is downstream: open coil, contactor or motor.",
    "pb.8.exp": "DQ .1 is on and TP8 reads 23.7 V, yet the lamp stays dark: the PLC and wiring are fine, the bulb is burnt.",
    "pb.9.exp": "Network 1 has no Q0.0 contact in parallel with I0.0. Without the seal-in branch the coil drops out as soon as Start is released.",
    "pb.10.exp": "TP4 reads 24 V, so the Stop circuit is healthy and I0.1 = 1. But network 1 now uses an NC instruction on I0.1, which is open when the bit is 1. A Stop wired NC must be programmed with an NO instruction.",
    "cause.1": "Start button contact or its wire open",
    "cause.2": "PLC input channel I0.0 faulty",
    "cause.3": "Stop circuit wire broken",
    "cause.4": "Jam sensor stuck ON (dirty / misaligned)",
    "cause.5": "1L+ output supply lost (fuse / E‑Stop relay)",
    "cause.6": "PLC output channel Q0.0 faulty",
    "cause.7": "Motor contactor coil or motor faulty",
    "cause.8": "Running light bulb burnt",
    "cause.9": "Program: seal-in branch missing",
    "cause.10": "Program: Stop programmed as an NC instruction",

    "scene.title": "Conveyor cell — 3D view",
    "scene.reset": "Reset view",
    "scene.label": "3D view of the conveyor cell, driven by the simulation",
    "scene.hint": "Drag to orbit, scroll or pinch to zoom. Click Start, Stop and the E‑Stop on the yellow control box, and click the photo-eye to block it.",
    "scene.nogl": "The 3D view needs WebGL, which this browser does not provide. The rest of the workbench works normally.",

    'foot': 'Training simulation — 24 V DC wiring, S7‑1200‑style addresses.'
  },

  ar: {
    'meta.title': 'PLC Lab — محاكي تفاعلي للمتحكم المنطقي',
    'meta.desc': 'منضدة عمل افتراضية في الوقت الحقيقي: أزرار، حساس، توقف طوارئ، جهاز قياس متعدد، مخطط سلّمي حي ومخرجات حزام ناقل.',
    'brand.sub': 'محاكي تفاعلي',
    'lang.label': 'اللغة',
    'theme.toggle': 'تبديل الوضع الفاتح / الداكن',
    'sound.toggle': 'صوت الجرس',

    'intro.title': 'منضدة عمل افتراضية للمتحكم المنطقي',
    'intro.p': 'شغّل الأزرار والحساس، قِس الجهد بجهاز القياس المتعدد، وشاهد برنامج المخطط السلّمي يُنفَّذ مباشرةً دورةً بعد دورة.',

    'in.title': 'لوحة المشغّل — المداخل',
    'in.start': 'تشغيل',
    'in.start.label': 'زر التشغيل (اضغط مع الإبقاء)',
    'in.stop': 'إيقاف',
    'in.stop.label': 'زر الإيقاف (اضغط مع الإبقاء)',
    'in.sensor': 'حساس الانحشار',
    'in.sensor.label': 'مفتاح حساس الانحشار',
    'in.estop': 'توقف الطوارئ',
    'in.estop.label': 'زر توقف الطوارئ (مقفل)',
    'in.hint': 'زرّا التشغيل والإيقاف لحظيّان: أبقِهما مضغوطين. الحساس يتبدّل بنقرة. يبقى توقف الطوارئ مقفلاً حتى تحرّره. لوحة المفاتيح: الأزرار من 1 إلى 4.',

    'lad.title': 'برنامج المخطط السلّمي — مباشر',
    'lad.label': 'المخطط السلّمي للبرنامج، يُحدَّث في كل دورة',
    'lad.leg.power': 'سريان التيار',
    'lad.leg.true': 'تلامس مغلق / ملف مُفعَّل',
    'lad.leg.force': 'مخرج مفروض',
    'cpu.mode': 'وضع وحدة المعالجة',
    'rung.1': 'المحرك: تشغيل مع إمساك ذاتي، إيقاف، طوارئ وقفل العطل',
    'rung.2': 'ذاكرة العطل: انحشار أو طوارئ، تُصفَّر بزر الإيقاف',
    'rung.3': 'مصباح التشغيل = المحرك يعمل',
    'rung.4': 'مصباح العطل = ذاكرة العطل',
    'rung.5': 'الجرس نبضي بتردد 1 هرتز ما دام العطل قائماً',

    'out.title': 'المخارج — الميدان',
    'out.motor': 'محرك الحزام الناقل',
    'out.run': 'مصباح التشغيل',
    'out.fault': 'مصباح العطل',
    'out.buzzer': 'جرس الإنذار',
    'out.force': 'فرض المخرج',
    'out.hint': 'الفرض يتجاوز نتيجة البرنامج في صورة المخارج — تماماً كأداة البرمجة. يتغذى Q0.0 من 1L+ الذي يقطعه توقف الطوارئ، أما المصابيح والجرس فمن 2L+ الذي يبقى تحت الجهد.',

    'dmm.title': 'جهاز القياس المتعدد — نقاط الاختبار',
    'dmm.mode': 'عيار جهاز القياس',
    'dmm.red': 'الأحمر ← النقطة المختارة',
    'dmm.black': 'الأسود ← M (0 فولت)',
    'dmm.tps': 'نقاط الاختبار',
    'tp.1': 'مصدر التغذية L+',
    'tp.2': '1L+ بعد مرحّل الطوارئ',
    'tp.3': 'طرف مدخل التشغيل',
    'tp.4': 'طرف مدخل الإيقاف',
    'tp.5': 'مخرج حساس PNP',
    'tp.6': 'طرف مدخل الطوارئ',
    'tp.7': 'ملف قاطع المحرك',
    'tp.8': 'مصباح التشغيل',
    'tp.9': 'مصباح العطل',
    'tp.10': 'الجرس',

    'cpu.title': 'وحدة المعالجة — مؤشرات الحالة',
    'ex.title': 'تمارين',
    'ex.seal': 'شغّل الحزام ثم اترك زر التشغيل: تلامس الإمساك الذاتي (Q0.0 على التوازي) يبقيه يعمل.',
    'ex.stop': 'أوقفه بزر الإيقاف (تلامس مفتوح عادةً على مدخل موصول كمغلق عادةً).',
    'ex.latch': 'أثناء التشغيل فعّل الحساس: تُقفَل ذاكرة العطل M0.0 وينبض الجرس.',
    'ex.reset': 'حرّر الحساس، ثم صفّر العطل بزر الإيقاف.',
    'ex.measure': 'افرض Q0.0 على ON، اضغط توقف الطوارئ وقِس TP7: لماذا 0 فولت؟',
    'ex.again': 'إعادة',
    'ex.done': 'تمرين ناجح',

    'log.title': 'سجل الأحداث',
    'log.clear': 'مسح',
    'log.ready': 'وحدة المعالجة جاهزة — البرنامج محمّل (5 شبكات)',
    'log.run': 'وحدة المعالجة ← RUN',
    'log.stop': 'وحدة المعالجة ← STOP: المخارج مطفأة',
    'log.force': 'فرض',
    'log.ex': 'تمرين ناجح',
    'log.meter': 'قياس',

    "pb.title": "تشخيص الأعطال — 10 مسائل",
    "pb.resetall": "إعادة التقدّم",
    "pb.free": "الوضع الحر",
    "pb.label": "مسألة",
    "pb.log": "تم تحميل المسألة",
    "pb.intro": "اختر مسألة: يُدخَل عطل خفي في التوصيلات أو المتحكم أو البرنامج. شغّل الآلة، قِس بجهاز القياس، اقرأ مؤشرات المداخل والمخارج والمخطط السلّمي، ثم اختر السبب. الوضع الحر يعيد الآلة سليمة.",
    "pb.tip": "نصيحة: اختر نقطة الاختبار أولاً ثم اضغط مع الإبقاء على الزر — القراءة المباشرة تظهر تحت لوحة المشغّل.",
    "pb.q": "ما هو السبب؟",
    "pb.check": "تحقّق",
    "pb.reveal": "إظهار الجواب",
    "pb.restart": "إعادة",
    "pb.next": "التالي",
    "pb.ok": "صحيح!",
    "pb.no": "ليس هذا — خذ قياساً آخر وقارن.",
    "pb.answer": "الجواب:",
    "pb.1.sym": "«يضغط المشغّل على التشغيل: لا شيء يحدث. لا مصباح عطل.»",
    "pb.2.sym": "«منذ هذا الصباح لم يعد الحزام يشتغل. يبدو زر التشغيل ميتاً.»",
    "pb.3.sym": "«الحزام لا يشتغل. لا شيء آخر يبدو غير طبيعي.»",
    "pb.4.sym": "«يبقى مصباح العطل مضاءً والجرس لا يتوقف حتى بعد الضغط على الإيقاف. لا يوجد أي انحشار على الحزام.»",
    "pb.5.sym": "«يضيء مصباح التشغيل عند الضغط على التشغيل، لكن الحزام لا يتحرك.»",
    "pb.6.sym": "«مصباح التشغيل مضاء والحزام متوقف. تم تغيير المحرك الشهر الماضي.»",
    "pb.7.sym": "«مصباح التشغيل مضاء، لكن الحزام لا يتحرك والمحرك صامت.»",
    "pb.8.sym": "«الحزام يعمل بشكل عادي، لكن مصباح التشغيل في اللوحة يبقى مطفأً.»",
    "pb.9.sym": "«لا يعمل الحزام إلا ما دام المشغّل ضاغطاً على التشغيل، ويتوقف فور تركه.»",
    "pb.10.sym": "«بعد تعديل البرنامج الليلة الماضية لم يعد الحزام يشتغل. لم يُلمَس أي سلك.»",
    "pb.1.exp": "اضغط التشغيل مع اختيار TP3: يبقى عند 0 فولت ويبقى DI .0 مطفأً. لا يصل 24 فولت إلى المدخل أبداً، إذن تلامس الزر أو سلكه مفتوح.",
    "pb.2.exp": "يقرأ TP3 قيمة 24 فولت عند الضغط على التشغيل، لكن مؤشر DI .0 وتلامس I0.0 يبقيان مطفأين. الجهد موجود على الطرف لكن المتحكم لا يراه: قناة المدخل معطوبة.",
    "pb.3.exp": "يقرأ TP4 قيمة 0 فولت دون لمس الإيقاف، و I0.1 مفتوح في الشبكة 1. زر إيقاف موصول كمغلق عادةً آمنٌ عند العطل: السلك المقطوع يبدو تماماً كالضغط على الإيقاف، فلا يمكن تشغيل الآلة.",
    "pb.4.exp": "يقرأ TP5 نحو 23 فولت والحساس غير مفعَّل، و I0.2 فعّال في الشبكة 2، فتُضبط M0.0 من جديد بمجرد ترك الإيقاف. نظّف الحساس أو أعد ضبطه.",
    "pb.5.exp": "مؤشر DQ .0 مضاء والشبكة 1 موصلة، لكن TP2 (1L+) يقرأ 0 فولت وزر الطوارئ محرَّر، فيكون TP7 أيضاً 0 فولت. فقدت مجموعة المخارج تغذيتها: افحص المصهر ومرحّل أمان الطوارئ.",
    "pb.6.exp": "في TP2 يوجد 24 فولت ومؤشر DQ .0 مضاء، لكن TP7 يبقى عند 0 فولت. التغذية والبرنامج سليمان؛ قناة المخرج Q0.0 نفسها معطوبة.",
    "pb.7.exp": "يقرأ TP7 قيمة 23.6 فولت: المتحكم يؤدي عمله والجهد يصل إلى ملف القاطع. العطل بعده: ملف مقطوع أو قاطع أو محرك.",
    "pb.8.exp": "مؤشر DQ .1 مضاء و TP8 يقرأ 23.7 فولت، ومع ذلك يبقى المصباح مطفأً: المتحكم والتوصيلات سليمة، المصباح محروق.",
    "pb.9.exp": "لا يوجد في الشبكة 1 تلامس Q0.0 على التوازي مع I0.0. بدون فرع الإمساك الذاتي يسقط الملف فور ترك زر التشغيل.",
    "pb.10.exp": "يقرأ TP4 قيمة 24 فولت، إذن دائرة الإيقاف سليمة و I0.1 = 1. لكن الشبكة 1 تستعمل الآن تلامساً مغلقاً عادةً على I0.1، وهو مفتوح عندما تكون القيمة 1. زر الإيقاف الموصول كمغلق عادةً يُبرمَج بتلامس مفتوح عادةً.",
    "cause.1": "تلامس زر التشغيل أو سلكه مفتوح",
    "cause.2": "قناة المدخل I0.0 في المتحكم معطوبة",
    "cause.3": "سلك دائرة الإيقاف مقطوع",
    "cause.4": "حساس الانحشار عالق على 1 (متّسخ / غير مضبوط)",
    "cause.5": "فقدان تغذية المخارج 1L+ (مصهر / مرحّل الطوارئ)",
    "cause.6": "قناة المخرج Q0.0 في المتحكم معطوبة",
    "cause.7": "ملف قاطع المحرك أو المحرك معطوب",
    "cause.8": "مصباح التشغيل محروق",
    "cause.9": "البرنامج: فرع الإمساك الذاتي مفقود",
    "cause.10": "البرنامج: الإيقاف مبرمج كتلامس مغلق عادةً",

    "scene.title": "خلية الحزام الناقل — عرض ثلاثي الأبعاد",
    "scene.reset": "إعادة ضبط العرض",
    "scene.label": "عرض ثلاثي الأبعاد لخلية الحزام الناقل، تقوده المحاكاة",
    "scene.hint": "اسحب للتدوير، واستعمل العجلة أو القرص بإصبعين للتكبير. انقر على التشغيل والإيقاف وتوقف الطوارئ في العلبة الصفراء، وانقر على الخلية الكهروضوئية لحجبها.",
    "scene.nogl": "يحتاج العرض ثلاثي الأبعاد إلى WebGL غير المتوفر في هذا المتصفح. بقية منضدة العمل تعمل بشكل عادي.",

    'foot': 'محاكاة تعليمية — توصيل 24 فولت مستمر، عناوين بأسلوب S7‑1200.'
  }
};

const I18N = (function () {
  const LANGS = ['fr', 'en', 'ar'];
  const DEFAULT = 'fr';
  let current = DEFAULT;
  const valid = l => LANGS.indexOf(l) !== -1;

  function pick() {
    const q = new URLSearchParams(location.search).get('lang');
    if (valid(q)) return q;
    try { const s = localStorage.getItem('plclab.lang'); if (valid(s)) return s; } catch (e) {}
    return DEFAULT;
  }

  function t(key) {
    const d = TRANSLATIONS[current];
    return key in d ? d[key] : TRANSLATIONS[DEFAULT][key];
  }

  function apply(lang) {
    if (!valid(lang)) lang = DEFAULT;
    current = lang;
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = t('meta.title');
    const md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute('content', t('meta.desc'));

    const tmp = document.createElement('div');
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const v = t(el.dataset.i18n);
      if (v == null) return;
      if (el instanceof SVGElement) el.textContent = v; else el.innerHTML = v;
    });
    document.querySelectorAll('[data-i18n-label]').forEach(el => {
      const v = t(el.dataset.i18nLabel);
      if (v != null) { tmp.innerHTML = v; el.setAttribute('aria-label', tmp.textContent); }
    });
    document.querySelectorAll('.lang button[data-lang]').forEach(b => {
      b.setAttribute('aria-pressed', b.dataset.lang === lang ? 'true' : 'false');
    });
    try { localStorage.setItem('plclab.lang', lang); } catch (e) {}
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  }

  document.querySelectorAll('.lang button[data-lang]').forEach(b => {
    b.addEventListener('click', () => apply(b.dataset.lang));
  });
  apply(pick());

  return { t, apply, get lang() { return current; } };
})();
