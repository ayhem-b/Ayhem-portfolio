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
