/* ---------- Translations ----------
   Keys map to data-i18n attributes in index.html. French is the default.
   Values are HTML fragments (a few carry <b>, <br> or <span>), so they are
   set with innerHTML; keep them free of anything but our own markup. */
const TRANSLATIONS = {
  fr: {
    'meta.title': 'Ayhem Belkhamsa — Ingénieur en automatisation industrielle &amp; constructeur de machines',
    'meta.desc': "Ayhem Belkhamsa - ingénieur en automatisation industrielle et constructeur de machines à Bizerte et Menzel Bourguiba, Tunisie. Rétrofit d'automates et d'armoires électriques, machines spéciales, IHM et systèmes de données, intégration vision et robotique.",
    'lang.label': 'Langue',
    'theme.toggle': 'Basculer le thème clair / sombre',

    'nav.work': 'Réalisations',
    'nav.services': 'Services',
    'nav.log': 'Projets',
    'nav.process': 'Méthode',
    'nav.cta': 'Demander un devis',

    'hero.tag1': '● Système en ligne',
    'hero.tag2': 'Bizerte · Menzel Bourguiba · Tunisie',
    'hero.name': 'Ayhem<br>Belkhamsa',
    'hero.role': "<b>Ingénieur en automatisation industrielle &amp; auto‑entrepreneur</b> — je conçois, rétrofite et mets en service des machines spéciales dans les pôles industriels du nord de la Tunisie : des armoires d'automates recâblées de zéro aux robots guidés par vision qui tournent en production.",
    'hero.trust': "Indépendant — vous parlez directement à l'ingénieur qui diagnostique votre ligne, chiffre le travail et le réalise. Pas d'intermédiaire commercial.",
    'hero.cta1': 'Demander un devis ↗',
    'hero.cta2': 'Voir les réalisations ↓',

    'hmi.head': 'IHM — ÉTAT EN DIRECT',
    'hmi.init': 'INITIALISATION…',
    'hmi.k1': 'PLATEFORMES API',
    'hmi.k2': 'VARIATEURS',
    'hmi.k3': 'ROBOTIQUE',
    'hmi.k4': 'ACTIVITÉ E/S',

    'sec.work': 'Réalisations',
    'gallery.desc': "De vraies machines, de vraies armoires, de vrais chantiers — photographiés sur mes propres interventions. Cliquez sur une photo pour l'agrandir.",
    'gal.video': 'Travaux en cours — sur le terrain',
    'gal.video.label': 'Vidéo « travaux en cours » : atelier, cellule robot delta, câblage de machine et usinage CNC',
    'gal.1': 'Banc de traction — construit &amp; mis en service',
    'gal.1.alt': "Banc d'essai de traction terminé avec son coffret de commande",
    'gal.2': "Programmation d'une cellule pick &amp; place sur site",
    'gal.2.alt': "Programmation d'une cellule pick and place sur site",
    'gal.3': "Intérieur d'une armoire en cours de rétrofit",
    'gal.3.alt': "Intérieur d'une armoire de commande pendant un rétrofit",
    'gal.4': "Mise en place d'une caméra d'inspection vision",
    'gal.4.alt': "Installation d'une caméra d'inspection par vision industrielle",
    'gal.5': 'Implantation 3D en phase de conception',
    'gal.5.alt': "Implantation 3D d'une cellule automatisée en phase de conception",
    'gal.6': 'Machine ancienne, avant modernisation',
    'gal.6.alt': 'Machine ancienne en atelier avant une modernisation',
    'gal.7': 'Contrôleur &amp; armoire, mise en service',
    'gal.7.alt': 'Contrôleur de mouvement et armoire ouverte pendant la mise en service',
    'gal.8': 'Test vision sur banc',
    'gal.8.alt': "Caméra de vision industrielle et logiciel d'inspection sur le banc",
    'gal.9': 'Ligne ancienne avant automatisation',
    'gal.9.alt': "Machine de production ancienne dans un hall d'usine",
    'gal.10': "Schéma d'armoire, banc de traction",
    'gal.10.alt': "Schéma de l'armoire de commande du banc de traction",

    'sec.services': 'Services',
    'services.desc': "Ce que vous obtenez concrètement, et à quoi vous attendre pour chaque type d'intervention.",
    'svc.cta': 'Demander un devis →',
    'svc1.title': "Rétrofit d'automates &amp; d'armoires",
    'svc1.p1': "Ligne à l'arrêt à cause d'un câblage que personne n'a documenté, ou d'une logique laissée à moitié finie par un prestataire précédent ? Je relève l'armoire, la reconstruis proprement et reprogramme la logique à partir d'une base saine.",
    'svc1.p2': '<b style="color:var(--text)">Vous obtenez :</b> une ligne qui tourne, une armoire que n\'importe quel technicien peut reprendre, et la documentation de ce qui a changé.',
    'svc2.title': 'Machines spéciales sur mesure',
    'svc2.p1': "Bancs d'essai, machines spéciales et équipements uniques conçus autour de votre procédé, au lieu de forcer votre procédé dans du matériel standard.",
    'svc2.p2': '<b style="color:var(--text)">Vous obtenez :</b> une machine dimensionnée pour votre cadence réelle, avec une interface sur mesure que vos opérateurs maîtrisent dès le premier jour.',
    'svc3.title': 'IHM &amp; systèmes de données',
    'svc3.p1': "Interfaces C# sur mesure pour des machines qui ne donnent aujourd'hui aucune visibilité aux opérateurs — mesures en direct, historisation et rapports automatiques à la place du bloc-notes.",
    'svc3.p2': '<b style="color:var(--text)">Vous obtenez :</b> des données en temps réel sur votre procédé et une traçabilité à remettre à la qualité ou à la direction.',
    'svc4.title': 'Intégration vision &amp; robotique',
    'svc4.p1': "Ajout de pick &amp; place, de bras 6 axes ou de contrôles qualité par vision sur une ligne encore manuelle — dimensionnés pour votre implantation et votre temps de cycle.",
    'svc4.p2': '<b style="color:var(--text)">Vous obtenez :</b> moins d\'opérations manuelles et des défauts détectés avant de quitter la ligne.',

    'sec.caps': 'Compétences',
    'cap1.title': 'Automatisme &amp; électricité',
    'cap1.p': "Diagnostic d'armoires, recherche de câblages défectueux, recâblage puissance/commande, relais de sécurité &amp; verrouillages, étalonnage de capteurs et intégration de cellules de charge.",
    'cap2.title': 'Robotique &amp; contrôle de mouvement',
    'cap2.p': 'Unités pick &amp; place, bras articulés 6 axes et robots Delta — planification de trajectoires, calibration TCP, paramétrage servo/pas‑à‑pas, interfaçage PWM.',
    'cap3.title': 'Vision industrielle &amp; IA embarquée',
    'cap3.p': "Reconnaissance de motifs, validation d'échelle et de polarité, détection de défauts en temps réel et boucles VLA sur NVIDIA Jetson pour le tri automatique de pièces.",
    'cap4.title': 'Logiciel &amp; intégration',
    'cap4.p': 'IHM industrielles et acquisition de données sur mesure en C# (.NET/WinForms/WPF) avec rapports PDF automatiques, plus Python, Django et Modbus/série.',

    'chip.scaling': "Mise à l'échelle linéaire",
    'chip.arms': 'Bras 6 axes',
    'chip.deltas': 'Robots Delta',
    'chip.kin': 'Cinématique',
    'chip.vision': 'Inspection vision',
    'chip.mitsu': 'Automate Mitsubishi',
    'chip.pnp': 'Pick &amp; Place',
    'chip.visionqc': 'Contrôle qualité vision',
    'chip.loadcells': 'Cellules de charge',
    'chip.logging': 'Historisation',
    'chip.delta': 'Robot Delta',
    'chip.pwm': 'Commande PWM',
    'chip.dof': '6 axes',
    'chip.force': "Retour d'effort",
    'chip.safety': 'Réglage sécurité',

    'sec.log': 'Journal de projets',
    'f.scope': 'Périmètre',
    'f.systems': 'Systèmes ajoutés',
    'f.outcome': 'Résultat',
    'wo1.title': "Rétrofit d'une ligne d'assemblage de boutons tactiles",
    'wo1.status': 'Mis en service',
    'wo1.scope': "Remise à niveau d'une ligne d'assemblage dégradée par plusieurs interventions successives — recâblage et réorganisation de l'armoire de commande, logique reprogrammée de zéro.",
    'wo1.systems': "Intégration d'un robot pick &amp; place et d'un système d'inspection par vision pour la validation qualité en temps réel.",
    'wo2.title': "Banc d'essai de traction des matériaux",
    'wo2.status': 'Construit',
    'wo2.m1': 'Banc terminé &amp; coffret de commande',
    'wo2.m2': "Schéma d'armoire (logiciel CXG)",
    'wo2.m3': 'Assemblage du châssis en cours',
    'wo2.m3.alt': 'Assemblage du châssis du banc de traction en cours',
    'wo2.scope': "Construction d'une machine d'essai de traction avec une interface C# WinForms sur mesure pour les opérateurs et un enregistrement des contraintes en temps réel.",
    'wo2.systems': "Capteurs API avec mise à l'échelle linéaire alimentant l'application de bureau en mesures en direct.",
    'wo3.title': 'Système de tri par robot Delta piloté par VLA',
    'wo3.status': 'Déployé',
    'wo3.scope': "Conception d'une boucle de tri par IA embarquée sur NVIDIA Jetson exécutant le traitement de vision en temps réel.",
    'wo3.systems': 'Commande PWM pilotant un robot Delta pour la manipulation des pièces sur la ligne de tri.',
    'wo4.title': 'Calibration cinématique 6 axes &amp; interaction sûre',
    'wo4.status': 'Réglé',
    'wo4.scope': "Réglage fin des limites de retour d'effort, des vitesses de sécurité et des trajectoires sur des bras robotisés 6 axes.",
    'wo4.outcome': "Des échanges fluides et une cohabitation sûre entre le bras et les opérateurs sur le plancher de l'atelier.",

    'sec.process': 'Notre méthode',
    'step.n1': 'ÉTAPE 1', 'step.n2': 'ÉTAPE 2', 'step.n3': 'ÉTAPE 3', 'step.n4': 'ÉTAPE 4',
    'step1.title': 'Diagnostic',
    'step1.p': "Envoyez des photos ou une description de la ligne, ou organisons une visite sur site dans la zone de Bizerte / Menzel Bourguiba. J'identifie la cause réelle avant de proposer une solution.",
    'step2.title': 'Périmètre &amp; devis',
    'step2.p': "Vous recevez un cahier des charges écrit et un devis — ce qui est refait, le matériel utilisé et le délai. Aucun travail ne démarre sans votre accord.",
    'step3.title': 'Réalisation &amp; mise en service',
    'step3.p': "Armoire, programmation et intégration se font sur votre équipement ou en atelier, avec des points réguliers jusqu'à ce que la ligne tourne et soit validée.",
    'step4.title': 'Livraison',
    'step4.p': "Vous recevez la documentation de ce qui a changé et un accès direct à moi pour vos questions — pas une file d'attente de tickets.",

    'cta.eyebrow': 'Un problème similaire sur votre ligne ?',
    'cta.title': 'Étudions‑le ensemble.',
    'cta.btn': 'Demander un devis ↗',

    'sec.diag': 'Diagnostic &amp; réparation',
    'diag1.k': 'Électronique grand public',
    'diag1.p': 'Dépannage au niveau composant sur ordinateurs portables, dont les plateformes Lenovo G30/G50.',
    'diag2.k': 'Froid &amp; climatisation',
    'diag2.p': 'Réparation de lignes de compresseur sur systèmes de refroidissement.',
    'diag3.k': 'Pièces sur mesure',
    'diag3.p': 'Pièces de rechange et loquets conçus en 3D pour la réparation de matériel.',

    'sec.off': 'Hors du travail',
    'off1.title': 'Aquariophilie',
    'off1.p': "Aquariophile passionné, j'équilibre bacs et écosystèmes de plantes aquatiques — actuellement des Betta, des néons, un Pleco et un escargot Mystery.",
    'off2.title': 'Motos',
    'off2.p': "Je suis de près les motos d'entrée de gamme à gros châssis sur le marché tunisien.",

    'contact.title': 'Construisons<br>quelque chose de <span>fiable</span>.',
    'contact.sub': 'Décrivez‑moi la ligne, la machine ou le problème — je réponds directement, généralement sous 24 h.',
    'contact.area': 'Bizerte, Menzel Bourguiba &amp; pôles industriels environnants',
    'qf.head': 'Demande de devis',
    'qf.name': 'Nom',
    'qf.name.ph': 'Votre nom',
    'qf.contact': 'E‑mail ou téléphone',
    'qf.contact.ph': 'Comment vous joindre',
    'qf.type': 'Type de projet',
    'qf.opt1': 'Rétrofit automate / armoire',
    'qf.opt2': 'Machine spéciale sur mesure',
    'qf.opt3': 'IHM / système de données',
    'qf.opt4': 'Intégration vision / robotique',
    'qf.opt5': 'Autre',
    'qf.msg': 'Que se passe‑t‑il ?',
    'qf.msg.ph': 'Brève description de la machine ou du problème',
    'qf.submit': 'Envoyer la demande ↗',
    'qf.note': 'Ouvre votre messagerie avec ces informations pré‑remplies, à l\'adresse belkhamsaayhem09@gmail.com.',
    'foot.1': 'Ayhem Belkhamsa — Ingénieur en automatisation industrielle, constructeur de machines &amp; auto‑entrepreneur',
    'fab': 'Demander un devis ↗',
    'lb.label': 'Visionneuse de photos',
    'lb.close': 'Fermer la photo',

    'js.roles': ['Constructeur de machines', "Programmeur d'automates", 'Spécialiste rétrofit', 'Intégrateur vision & robotique'],
    'js.hmi': ['SYSTÈME PRÊT', 'LOGIQUE API : COMPILÉE', 'INSPECTION VISION : OK', 'AXES SERVO : RÉFÉRENCÉS', 'EN ATTENTE DU PROCHAIN ORDRE DE TRAVAIL'],
    'js.mail.subject': 'Demande de devis — ',
    'js.mail.name': 'Nom',
    'js.mail.contact': 'Contact',
    'js.mail.type': 'Type de projet',
    'js.mail.details': 'Détails'
  },

  en: {
    'meta.title': 'Ayhem Belkhamsa — Industrial Automation Engineer &amp; Machine Builder',
    'meta.desc': 'Ayhem Belkhamsa - industrial automation engineer and machine builder in Bizerte and Menzel Bourguiba, Tunisia. PLC and control panel retrofits, custom machines, HMI and data systems, vision and robotics integration.',
    'lang.label': 'Language',
    'theme.toggle': 'Toggle light / dark theme',

    'nav.work': 'The Work',
    'nav.services': 'Services',
    'nav.log': 'Project Log',
    'nav.process': 'How We Work',
    'nav.cta': 'Get a Quote',

    'hero.tag1': '● System Online',
    'hero.tag2': 'Bizerte · Menzel Bourguiba · Tunisia',
    'hero.name': 'Ayhem<br>Belkhamsa',
    'hero.role': "<b>Industrial automation engineer &amp; auto‑entrepreneur</b> building, retrofitting, and commissioning special machines across Tunisia's northern industrial hubs — from PLC cabinets rewired ground‑up to vision‑guided robots running in production.",
    'hero.trust': 'Independent operator — you talk directly with the engineer who diagnoses your line, quotes the job, and builds it. No account managers in between.',
    'hero.cta1': 'Request a Quote ↗',
    'hero.cta2': 'See the Work ↓',

    'hmi.head': 'HMI — LIVE STATUS',
    'hmi.init': 'INITIALIZING…',
    'hmi.k1': 'PLC PLATFORMS',
    'hmi.k2': 'DRIVES',
    'hmi.k3': 'ROBOTICS',
    'hmi.k4': 'I/O ACTIVITY',

    'sec.work': 'The Work',
    'gallery.desc': 'Real machines, real cabinets, real builds — photographed on my own jobs. Click any photo to enlarge.',
    'gal.video': 'Work in progress — on the shop floor',
    'gal.video.label': 'Work in progress reel: workshop floor, delta robot cell, machine wiring and CNC work',
    'gal.1': 'Tensile rig — built &amp; commissioned',
    'gal.1.alt': 'Finished tensile testing rig with its control box',
    'gal.2': 'Programming a pick &amp; place cell on‑site',
    'gal.2.alt': 'Programming a pick and place cell on site',
    'gal.3': 'Inside a control cabinet mid‑retrofit',
    'gal.3.alt': 'Inside a control cabinet during a retrofit',
    'gal.4': 'Setting up a vision inspection camera',
    'gal.4.alt': 'Setting up a machine vision inspection camera',
    'gal.5': '3D layout during the design phase',
    'gal.5.alt': '3D layout of an automated cell during the design phase',
    'gal.6': 'Legacy machine, ahead of an upgrade',
    'gal.6.alt': 'A legacy machine on the shop floor ahead of an automation upgrade',
    'gal.7': 'Controller &amp; cabinet, commissioning',
    'gal.7.alt': 'Motion controller and open cabinet during commissioning',
    'gal.8': 'Vision inspection bench test',
    'gal.8.alt': 'Machine vision camera and inspection software on the bench',
    'gal.9': 'Legacy line before automation work',
    'gal.9.alt': 'Legacy production machine in a factory hall',
    'gal.10': 'Panel schematic, tensile rig',
    'gal.10.alt': 'Control panel schematic for the tensile rig',

    'sec.services': 'Services',
    'services.desc': 'What you actually get, and what to expect from each type of job.',
    'svc.cta': 'Request a Quote →',
    'svc1.title': 'PLC &amp; Control Panel Retrofits',
    'svc1.p1': 'Line down because of wiring nobody documented, or logic left half‑finished by a previous contractor? I trace the cabinet, rebuild it clean, and reprogram the logic from a known‑good baseline.',
    'svc1.p2': '<b style="color:var(--text)">You get:</b> a working line, a cabinet you can hand to any technician, and documentation of what changed.',
    'svc2.title': 'Custom Machine Builds',
    'svc2.p1': 'Testing rigs, special‑purpose machines, and one‑off equipment built around your process instead of forcing your process around off‑the‑shelf gear.',
    'svc2.p2': '<b style="color:var(--text)">You get:</b> a machine sized to your actual throughput, with a custom interface your operators can run day one.',
    'svc3.title': 'HMI &amp; Data Systems',
    'svc3.p1': 'Custom C# interfaces for machines that currently give operators no visibility — live readings, logging, and automated reporting instead of a clipboard.',
    'svc3.p2': '<b style="color:var(--text)">You get:</b> real‑time data on your process and a paper trail you can hand to quality or management.',
    'svc4.title': 'Vision &amp; Robotics Integration',
    'svc4.p1': "Adding pick &amp; place, 6‑DOF arms, or vision‑based quality checks to a line that's currently manual — sized to fit your existing layout and tact time.",
    'svc4.p2': '<b style="color:var(--text)">You get:</b> fewer manual touchpoints and catches on defects before they leave the line.',

    'sec.caps': 'Capabilities',
    'cap1.title': 'Automation &amp; Electrical',
    'cap1.p': 'Control panel diagnostics, tracing corrupted wiring, rewiring power/command circuits, safety relays &amp; interlocks, sensor calibration and load‑cell integration.',
    'cap2.title': 'Robotics &amp; Motion Control',
    'cap2.p': 'Pick &amp; place units, 6‑DOF articulated arms, and Delta robots — trajectory planning, TCP calibration, servo/stepper setup, PWM interfacing.',
    'cap3.title': 'Machine Vision &amp; Edge AI',
    'cap3.p': 'Pattern matching, scale/polarity validation, real‑time defect detection, and VLA loops on NVIDIA Jetson for automated piece sorting.',
    'cap4.title': 'Software &amp; Integration',
    'cap4.p': 'Custom industrial HMIs and data acquisition in C# (.NET/WinForms/WPF) with automated PDF reporting, plus Python, Django, and Modbus/Serial.',

    'chip.scaling': 'Linear scaling',
    'chip.arms': '6‑DOF arms',
    'chip.deltas': 'Delta robots',
    'chip.kin': 'Kinematics',
    'chip.vision': 'Vision inspection',
    'chip.mitsu': 'Mitsubishi PLC',
    'chip.pnp': 'Pick &amp; Place',
    'chip.visionqc': 'Vision QC',
    'chip.loadcells': 'Load cells',
    'chip.logging': 'Data logging',
    'chip.delta': 'Delta robot',
    'chip.pwm': 'PWM control',
    'chip.dof': '6‑DOF',
    'chip.force': 'Force feedback',
    'chip.safety': 'Safety tuning',

    'sec.log': 'Project Log',
    'f.scope': 'Scope',
    'f.systems': 'Systems Added',
    'f.outcome': 'Outcome',
    'wo1.title': 'Switch Touch‑Button Assembly Line Retrofit',
    'wo1.status': 'Commissioned',
    'wo1.scope': 'Overhauled an assembly line corrupted by multiple prior interventions — rewired and reorganized the control cabinet and reprogrammed control logic from scratch.',
    'wo1.systems': 'Integrated a pick &amp; place robot and a machine vision inspection system for real‑time quality validation.',
    'wo2.title': 'Material Tensile Testing Rig',
    'wo2.status': 'Built',
    'wo2.m1': 'Finished rig &amp; control box',
    'wo2.m2': 'Panel schematic (CXG software)',
    'wo2.m3': 'Frame assembly in progress',
    'wo2.m3.alt': 'Tensile rig frame assembly in progress',
    'wo2.scope': 'Built a material traction testing machine with a custom C# WinForms interface for operators and real‑time stress logging.',
    'wo2.systems': 'PLC sensors with linear scaling feeding live measurement data into the desktop application.',
    'wo3.title': 'VLA Delta Robot Sorting System',
    'wo3.status': 'Deployed',
    'wo3.scope': 'Designed an edge‑AI sorting loop on an NVIDIA Jetson executing real‑time computer vision processing.',
    'wo3.systems': 'PWM control driving a Delta robot for piece manipulation on the sorting line.',
    'wo4.title': '6‑Axis Kinematic Calibration &amp; Safe Interaction',
    'wo4.status': 'Tuned',
    'wo4.scope': 'Fine‑tuned force feedback limits, velocity overrides, and motion trajectories on 6‑DOF robotic arms.',
    'wo4.outcome': 'Smooth operational handshakes and safe shop‑floor interaction between the arm and operators.',

    'sec.process': 'How We Work',
    'step.n1': 'STEP 1', 'step.n2': 'STEP 2', 'step.n3': 'STEP 3', 'step.n4': 'STEP 4',
    'step1.title': 'Diagnose',
    'step1.p': 'Send photos or a description of the line, or arrange an on‑site visit in the Bizerte / Menzel Bourguiba area. I identify the actual cause before proposing a fix.',
    'step2.title': 'Scope &amp; Quote',
    'step2.p': "You get a written scope of work and a quote — what's being rebuilt, what hardware is used, and the timeline. No work starts without your sign‑off.",
    'step3.title': 'Build &amp; Commission',
    'step3.p': 'Cabinet work, programming, and integration happen on your equipment or in‑shop, with regular updates until the line is running and validated.',
    'step4.title': 'Handover',
    'step4.p': 'You receive documentation of what changed, and direct access to me for follow‑up questions — not a support ticket queue.',

    'cta.eyebrow': 'Have a similar problem on your line?',
    'cta.title': "Let's scope it out.",
    'cta.btn': 'Request a Quote ↗',

    'sec.diag': 'Hands‑On Diagnostics',
    'diag1.k': 'Consumer Electronics',
    'diag1.p': 'Component‑level troubleshooting on laptops, including Lenovo G30/G50 platforms.',
    'diag2.k': 'HVAC',
    'diag2.p': 'Compressor line repairs on cooling systems.',
    'diag3.k': 'Custom Parts',
    'diag3.p': '3D‑designed replacement parts and latches for hardware repair.',

    'sec.off': 'Off‑Duty',
    'off1.title': 'Aquarium Keeping',
    'off1.p': 'Active home aquarist balancing tanks and aquatic plant ecosystems — currently keeping Betta, Neon Tetras, a Pleco, and a Mystery Snail.',
    'off2.title': 'Motorcycles',
    'off2.p': 'Tracking large‑chassis, heavy‑frame entry‑level motorcycles in the Tunisian market.',

    'contact.title': "Let's build<br>something <span>reliable</span>.",
    'contact.sub': 'Tell me about the line, the machine, or the problem — I reply directly, usually within a day.',
    'contact.area': 'Serving Bizerte, Menzel Bourguiba &amp; surrounding industrial hubs',
    'qf.head': 'Request a Quote',
    'qf.name': 'Name',
    'qf.name.ph': 'Your name',
    'qf.contact': 'Email or Phone',
    'qf.contact.ph': 'How to reach you',
    'qf.type': 'Project Type',
    'qf.opt1': 'PLC / Control Panel Retrofit',
    'qf.opt2': 'Custom Machine Build',
    'qf.opt3': 'HMI / Data System',
    'qf.opt4': 'Vision / Robotics Integration',
    'qf.opt5': 'Other',
    'qf.msg': "What's going on?",
    'qf.msg.ph': 'Brief description of the machine or problem',
    'qf.submit': 'Send Request ↗',
    'qf.note': 'Opens your email client with this filled in, addressed to belkhamsaayhem09@gmail.com.',
    'foot.1': 'Ayhem Belkhamsa — Industrial Automation Engineer, Machine Builder &amp; Auto‑Entrepreneur',
    'fab': 'Request a Quote ↗',
    'lb.label': 'Photo viewer',
    'lb.close': 'Close photo',

    'js.roles': ['Machine Builder', 'PLC Programmer', 'Retrofit Specialist', 'Vision & Robotics Integrator'],
    'js.hmi': ['SYSTEM READY', 'PLC LOGIC: COMPILED', 'VISION INSPECTION: PASS', 'SERVO AXES: HOMED', 'STANDING BY FOR NEXT WORK ORDER'],
    'js.mail.subject': 'Quote Request — ',
    'js.mail.name': 'Name',
    'js.mail.contact': 'Contact',
    'js.mail.type': 'Project Type',
    'js.mail.details': 'Details'
  },

  ar: {
    'meta.title': 'أيهم بلخمسة — مهندس أتمتة صناعية وصانع آلات',
    'meta.desc': 'أيهم بلخمسة - مهندس أتمتة صناعية وصانع آلات في بنزرت ومنزل بورقيبة، تونس. تجديد أجهزة التحكم المنطقي (PLC) واللوحات الكهربائية، آلات خاصة، واجهات تشغيل وأنظمة بيانات، دمج الرؤية الآلية والروبوتات.',
    'lang.label': 'اللغة',
    'theme.toggle': 'تبديل المظهر الفاتح / الداكن',

    'nav.work': 'الأعمال',
    'nav.services': 'الخدمات',
    'nav.log': 'سجل المشاريع',
    'nav.process': 'طريقة العمل',
    'nav.cta': 'اطلب عرض سعر',

    'hero.tag1': '● النظام يعمل',
    'hero.tag2': 'بنزرت · منزل بورقيبة · تونس',
    'hero.name': 'أيهم<br>بلخمسة',
    'hero.role': '<b>مهندس أتمتة صناعية ومقاول ذاتي</b> أصمّم الآلات الخاصة وأجدّدها وأشغّلها في الأقطاب الصناعية بشمال تونس — من لوحات PLC يُعاد تمديدها من الصفر إلى روبوتات موجَّهة بالرؤية تعمل في الإنتاج.',
    'hero.trust': 'مستقل — تتحدث مباشرة مع المهندس الذي يشخّص خطك ويسعّر العمل وينفّذه. لا وسطاء تجاريين.',
    'hero.cta1': 'اطلب عرض سعر ↗',
    'hero.cta2': 'شاهد الأعمال ↓',

    'hmi.head': 'واجهة التشغيل — الحالة المباشرة',
    'hmi.init': 'جارٍ التهيئة…',
    'hmi.k1': 'منصات PLC',
    'hmi.k2': 'المحركات',
    'hmi.k3': 'الروبوتات',
    'hmi.k4': 'نشاط الإدخال/الإخراج',

    'sec.work': 'الأعمال',
    'gallery.desc': 'آلات حقيقية ولوحات حقيقية وإنجازات حقيقية — صُوّرت في مهماتي الخاصة. انقر على أي صورة لتكبيرها.',
    'gal.video': 'عمل قيد الإنجاز — في الميدان',
    'gal.video.label': 'فيديو «عمل قيد الإنجاز»: الورشة، خلية روبوت دلتا، تمديد آلة وتشغيل CNC',
    'gal.1': 'جهاز اختبار الشد — بُني وشُغّل',
    'gal.1.alt': 'جهاز اختبار الشد المكتمل مع صندوق التحكم',
    'gal.2': 'برمجة خلية التقاط ووضع في الموقع',
    'gal.2.alt': 'برمجة خلية التقاط ووضع في الموقع',
    'gal.3': 'داخل لوحة تحكم أثناء التجديد',
    'gal.3.alt': 'داخل لوحة تحكم أثناء عملية تجديد',
    'gal.4': 'تركيب كاميرا فحص بالرؤية الآلية',
    'gal.4.alt': 'تركيب كاميرا فحص بالرؤية الآلية',
    'gal.5': 'تخطيط ثلاثي الأبعاد في مرحلة التصميم',
    'gal.5.alt': 'تخطيط ثلاثي الأبعاد لخلية مؤتمتة في مرحلة التصميم',
    'gal.6': 'آلة قديمة قبل التحديث',
    'gal.6.alt': 'آلة قديمة في الورشة قبل تحديث الأتمتة',
    'gal.7': 'وحدة التحكم واللوحة أثناء التشغيل',
    'gal.7.alt': 'وحدة تحكم بالحركة ولوحة مفتوحة أثناء التشغيل',
    'gal.8': 'اختبار الرؤية الآلية على الطاولة',
    'gal.8.alt': 'كاميرا رؤية آلية وبرنامج فحص على طاولة الاختبار',
    'gal.9': 'خط قديم قبل أعمال الأتمتة',
    'gal.9.alt': 'آلة إنتاج قديمة في قاعة مصنع',
    'gal.10': 'مخطط اللوحة، جهاز اختبار الشد',
    'gal.10.alt': 'مخطط لوحة التحكم لجهاز اختبار الشد',

    'sec.services': 'الخدمات',
    'services.desc': 'ما تحصل عليه فعليًا، وما تتوقعه من كل نوع من الأعمال.',
    'svc.cta': 'اطلب عرض سعر ←',
    'svc1.title': 'تجديد أجهزة PLC ولوحات التحكم',
    'svc1.p1': 'خطك متوقف بسبب تمديدات لم يوثّقها أحد، أو منطق تركه مقاول سابق نصف مكتمل؟ أتتبّع اللوحة وأعيد بناءها بشكل نظيف وأعيد برمجة المنطق من أساس سليم.',
    'svc1.p2': '<b style="color:var(--text)">تحصل على:</b> خط يعمل، ولوحة يمكن لأي فني تسلّمها، وتوثيق لما تغيّر.',
    'svc2.title': 'بناء آلات مخصصة',
    'svc2.p1': 'أجهزة اختبار وآلات خاصة ومعدات فريدة تُبنى حول عمليتك بدل إجبار عمليتك على التكيف مع معدات جاهزة.',
    'svc2.p2': '<b style="color:var(--text)">تحصل على:</b> آلة بحجم إنتاجك الفعلي، مع واجهة مخصصة يشغّلها عمالك من اليوم الأول.',
    'svc3.title': 'واجهات التشغيل وأنظمة البيانات',
    'svc3.p1': 'واجهات C# مخصصة لآلات لا تمنح المشغّلين أي رؤية حاليًا — قراءات مباشرة وتسجيل وتقارير آلية بدل الدفتر الورقي.',
    'svc3.p2': '<b style="color:var(--text)">تحصل على:</b> بيانات لحظية عن عمليتك وسجلًا يمكن تقديمه لقسم الجودة أو الإدارة.',
    'svc4.title': 'دمج الرؤية الآلية والروبوتات',
    'svc4.p1': 'إضافة الالتقاط والوضع أو الأذرع سداسية المحاور أو فحوص الجودة بالرؤية إلى خط يدوي حاليًا — بمقاس يلائم تخطيطك الحالي وزمن الدورة.',
    'svc4.p2': '<b style="color:var(--text)">تحصل على:</b> تدخلات يدوية أقل واكتشاف العيوب قبل مغادرة الخط.',

    'sec.caps': 'القدرات',
    'cap1.title': 'الأتمتة والكهرباء',
    'cap1.p': 'تشخيص لوحات التحكم، تتبّع التمديدات التالفة، إعادة تمديد دوائر القدرة والتحكم، مرحّلات الأمان والتعشيق، معايرة الحساسات ودمج خلايا التحميل.',
    'cap2.title': 'الروبوتات والتحكم في الحركة',
    'cap2.p': 'وحدات التقاط ووضع، أذرع مفصلية سداسية المحاور وروبوتات دلتا — تخطيط المسارات، معايرة TCP، إعداد السيرفو والمحركات الخطوية، ربط PWM.',
    'cap3.title': 'الرؤية الآلية والذكاء الاصطناعي الطرفي',
    'cap3.p': 'مطابقة الأنماط، التحقق من المقياس والقطبية، كشف العيوب لحظيًا، وحلقات VLA على NVIDIA Jetson لفرز القطع آليًا.',
    'cap4.title': 'البرمجيات والتكامل',
    'cap4.p': 'واجهات تشغيل صناعية واكتساب بيانات مخصصة بلغة C#‏ (.NET/WinForms/WPF) مع تقارير PDF آلية، إضافة إلى Python وDjango وModbus/التسلسلي.',

    'chip.scaling': 'تدريج خطي',
    'chip.arms': 'أذرع 6 محاور',
    'chip.deltas': 'روبوتات دلتا',
    'chip.kin': 'الحركيات',
    'chip.vision': 'فحص بالرؤية',
    'chip.mitsu': 'PLC Mitsubishi',
    'chip.pnp': 'التقاط ووضع',
    'chip.visionqc': 'جودة بالرؤية',
    'chip.loadcells': 'خلايا تحميل',
    'chip.logging': 'تسجيل البيانات',
    'chip.delta': 'روبوت دلتا',
    'chip.pwm': 'تحكم PWM',
    'chip.dof': '6 محاور',
    'chip.force': 'تغذية راجعة للقوة',
    'chip.safety': 'ضبط الأمان',

    'sec.log': 'سجل المشاريع',
    'f.scope': 'النطاق',
    'f.systems': 'الأنظمة المضافة',
    'f.outcome': 'النتيجة',
    'wo1.title': 'تجديد خط تجميع أزرار اللمس',
    'wo1.status': 'شُغّل',
    'wo1.scope': 'إصلاح شامل لخط تجميع أفسدته تدخلات سابقة متعددة — إعادة تمديد لوحة التحكم وتنظيمها وإعادة برمجة المنطق من الصفر.',
    'wo1.systems': 'دمج روبوت التقاط ووضع ونظام فحص بالرؤية الآلية للتحقق من الجودة لحظيًا.',
    'wo2.title': 'جهاز اختبار شد المواد',
    'wo2.status': 'بُني',
    'wo2.m1': 'الجهاز المكتمل وصندوق التحكم',
    'wo2.m2': 'مخطط اللوحة (برنامج CXG)',
    'wo2.m3': 'تجميع الهيكل قيد الإنجاز',
    'wo2.m3.alt': 'تجميع هيكل جهاز اختبار الشد قيد الإنجاز',
    'wo2.scope': 'بناء آلة اختبار شد المواد مع واجهة C# WinForms مخصصة للمشغّلين وتسجيل الإجهاد لحظيًا.',
    'wo2.systems': 'حساسات PLC بتدريج خطي تغذّي تطبيق سطح المكتب بقياسات مباشرة.',
    'wo3.title': 'نظام فرز بروبوت دلتا موجَّه بـ VLA',
    'wo3.status': 'نُشر',
    'wo3.scope': 'تصميم حلقة فرز بالذكاء الاصطناعي الطرفي على NVIDIA Jetson تنفّذ معالجة الرؤية الحاسوبية لحظيًا.',
    'wo3.systems': 'تحكم PWM يقود روبوت دلتا لمناولة القطع على خط الفرز.',
    'wo4.title': 'معايرة حركية لذراع 6 محاور وتفاعل آمن',
    'wo4.status': 'مضبوط',
    'wo4.scope': 'ضبط دقيق لحدود التغذية الراجعة للقوة، وتجاوزات السرعة، ومسارات الحركة على أذرع روبوتية سداسية المحاور.',
    'wo4.outcome': 'تسليم سلس وتعامل آمن بين الذراع والمشغّلين في أرض الورشة.',

    'sec.process': 'طريقة العمل',
    'step.n1': 'الخطوة 1', 'step.n2': 'الخطوة 2', 'step.n3': 'الخطوة 3', 'step.n4': 'الخطوة 4',
    'step1.title': 'التشخيص',
    'step1.p': 'أرسل صورًا أو وصفًا للخط، أو رتّب زيارة ميدانية في منطقة بنزرت / منزل بورقيبة. أحدد السبب الفعلي قبل اقتراح أي حل.',
    'step2.title': 'النطاق وعرض السعر',
    'step2.p': 'تحصل على نطاق عمل مكتوب وعرض سعر — ما سيُعاد بناؤه، والمعدات المستخدمة، والجدول الزمني. لا يبدأ أي عمل دون موافقتك.',
    'step3.title': 'البناء والتشغيل',
    'step3.p': 'أعمال اللوحة والبرمجة والدمج تتم على معداتك أو في الورشة، مع تحديثات منتظمة حتى يعمل الخط ويُعتمد.',
    'step4.title': 'التسليم',
    'step4.p': 'تتسلّم توثيقًا لما تغيّر، وتواصلًا مباشرًا معي لأي استفسار لاحق — لا طابور تذاكر دعم.',

    'cta.eyebrow': 'لديك مشكلة مشابهة في خطك؟',
    'cta.title': 'لنحدد نطاقها معًا.',
    'cta.btn': 'اطلب عرض سعر ↗',

    'sec.diag': 'تشخيص عملي',
    'diag1.k': 'الإلكترونيات الاستهلاكية',
    'diag1.p': 'استكشاف الأعطال على مستوى المكوّنات في الحواسيب المحمولة، بما فيها منصات Lenovo G30/G50.',
    'diag2.k': 'التبريد والتكييف',
    'diag2.p': 'إصلاح خطوط الضاغط في أنظمة التبريد.',
    'diag3.k': 'قطع مخصصة',
    'diag3.p': 'قطع غيار ومزاليج مصممة ثلاثي الأبعاد لإصلاح المعدات.',

    'sec.off': 'خارج العمل',
    'off1.title': 'تربية أسماك الزينة',
    'off1.p': 'هاوٍ نشط لأحواض الأسماك، أوازن بين الأحواض والنظم البيئية للنباتات المائية — أربّي حاليًا سمكة بيتا وأسماك النيون تترا وسمكة بليكو وحلزون ميستري.',
    'off2.title': 'الدراجات النارية',
    'off2.p': 'أتابع الدراجات النارية للمبتدئين ذات الهيكل الكبير والإطار الثقيل في السوق التونسية.',

    'contact.title': 'لنبنِ<br>شيئًا <span>موثوقًا</span>.',
    'contact.sub': 'حدّثني عن الخط أو الآلة أو المشكلة — أردّ مباشرة، عادةً خلال يوم.',
    'contact.area': 'أخدم بنزرت ومنزل بورقيبة والأقطاب الصناعية المجاورة',
    'qf.head': 'طلب عرض سعر',
    'qf.name': 'الاسم',
    'qf.name.ph': 'اسمك',
    'qf.contact': 'البريد الإلكتروني أو الهاتف',
    'qf.contact.ph': 'كيف نتواصل معك',
    'qf.type': 'نوع المشروع',
    'qf.opt1': 'تجديد PLC / لوحة تحكم',
    'qf.opt2': 'بناء آلة مخصصة',
    'qf.opt3': 'واجهة تشغيل / نظام بيانات',
    'qf.opt4': 'دمج رؤية / روبوتات',
    'qf.opt5': 'أخرى',
    'qf.msg': 'ما الذي يحدث؟',
    'qf.msg.ph': 'وصف موجز للآلة أو المشكلة',
    'qf.submit': 'أرسل الطلب ↗',
    'qf.note': 'يفتح برنامج البريد لديك مع هذه البيانات معبّأة، موجهةً إلى belkhamsaayhem09@gmail.com.',
    'foot.1': 'أيهم بلخمسة — مهندس أتمتة صناعية، صانع آلات ومقاول ذاتي',
    'fab': 'اطلب عرض سعر ↗',
    'lb.label': 'عارض الصور',
    'lb.close': 'إغلاق الصورة',

    'js.roles': ['صانع آلات', 'مبرمج PLC', 'متخصص تجديد', 'مدمج رؤية وروبوتات'],
    'js.hmi': ['النظام جاهز', 'منطق PLC: مُجمَّع', 'فحص الرؤية: ناجح', 'محاور السيرفو: مُصفّرة', 'في انتظار أمر العمل التالي'],
    'js.mail.subject': 'طلب عرض سعر — ',
    'js.mail.name': 'الاسم',
    'js.mail.contact': 'التواصل',
    'js.mail.type': 'نوع المشروع',
    'js.mail.details': 'التفاصيل'
  }
};

/* ---------- Language switching ---------- */
const I18N = (function () {
  const LANGS = ['fr', 'en', 'ar'];
  const DEFAULT = 'fr';
  let current = DEFAULT;

  function valid(l) { return LANGS.indexOf(l) !== -1; }

  // ?lang=xx wins, then the visitor's saved choice, then French.
  function pick() {
    const q = new URLSearchParams(location.search).get('lang');
    if (valid(q)) return q;
    try { const s = localStorage.getItem('lang'); if (valid(s)) return s; } catch (e) {}
    return DEFAULT;
  }

  function t(key) {
    const d = TRANSLATIONS[current];
    return key in d ? d[key] : TRANSLATIONS[DEFAULT][key];
  }

  function setMeta(sel, val) { const m = document.querySelector(sel); if (m) m.setAttribute('content', val); }

  function apply(lang) {
    if (!valid(lang)) lang = DEFAULT;
    current = lang;
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';

    const tmp = document.createElement('div');
    tmp.innerHTML = t('meta.title');
    document.title = tmp.textContent;
    setMeta('meta[name="description"]', t('meta.desc'));
    setMeta('meta[property="og:title"]', tmp.textContent);
    setMeta('meta[property="og:description"]', t('meta.desc'));

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const v = t(el.dataset.i18n);
      if (v != null) el.innerHTML = v;
    });
    [['data-i18n-alt', 'i18nAlt', 'alt'], ['data-i18n-placeholder', 'i18nPlaceholder', 'placeholder'], ['data-i18n-label', 'i18nLabel', 'aria-label']].forEach(([sel, ds, attr]) => {
      document.querySelectorAll('[' + sel + ']').forEach(el => {
        const v = t(el.dataset[ds]);
        if (v != null) { tmp.innerHTML = v; el.setAttribute(attr, tmp.textContent); }
      });
    });

    document.querySelectorAll('.lang button[data-lang]').forEach(b => {
      b.setAttribute('aria-pressed', b.dataset.lang === lang ? 'true' : 'false');
    });

    try { localStorage.setItem('lang', lang); } catch (e) {}
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  }

  document.querySelectorAll('.lang button[data-lang]').forEach(b => {
    b.addEventListener('click', () => apply(b.dataset.lang));
  });
  apply(pick());

  return { t, apply, get lang() { return current; }, langs: LANGS };
})();
