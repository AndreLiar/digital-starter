// lib/data/phases.ts

/**
 * Objectif global :
 * Devenez à l’aise avec le numérique — sans stress ni jargon !
 */
export const programmeTagline =
  'Devenez à l’aise avec le numérique — sans stress ni jargon !';

/* ------------------------------------------------------------------ */
/* Modèle d’une phase d’apprentissage                                  */
/* ------------------------------------------------------------------ */
export type Phase = {
  id: string;
  title: string;
  duration: string;
  objectif: string;
  actions: string[];
  outils: string[];
  exemples?: string[];
  resultat: string;
  modeEmploi: string;
};

/* ------------------------------------------------------------------ */
/* Parcours progressif : débutant → autonomie avancée                  */
/* ------------------------------------------------------------------ */
export const phases: Phase[] = [
  /* 1. Démarrage ordinateur --------------------------------------- */
  {
    id: '1',
    title: 'Prendre le contrôle de son ordinateur',
    duration: 'Semaines 1 – 2',
    objectif:
      'Comprendre l’écran d’accueil, ranger ses fichiers et surfer sur Internet sans appréhension.',
    actions: [
      'Allumer / éteindre son ordinateur proprement',
      'Créer, renommer, déplacer et supprimer dossiers / fichiers',
      'Installer un navigateur (Chrome ou Firefox)',
      'Faire une recherche simple (Google / YouTube)',
      'Créer une adresse Gmail et envoyer un e‑mail avec pièce jointe',
      'Installer / vérifier un antivirus gratuit (Microsoft Defender ou Avast)',
    ],
    outils: [
      'Explorateur de fichiers',
      'Google Chrome ou Firefox',
      'Gmail, YouTube',
      'Microsoft Defender ou Avast',
      'Google Drive (15 Go gratuits)',
      'VLC, lecteur PDF',
    ],
    exemples: [
      'Rechercher une vidéo de gymnastique douce',
      'Créer un dossier “Documents administratifs”',
      'Envoyer une photo par e‑mail',
    ],
    resultat:
      'Vous manipulez vos dossiers, faites vos premières recherches et envoyez un e‑mail en autonomie.',
    modeEmploi:
      '🟡 Lisez → 🟢 Testez sur VOTRE ordinateur → ✅ Cochez quand c’est fait. Recommencez sans pression.',
  },

  /* 2. Smartphone & applis utiles ---------------------------------- */
  {
    id: '2',
    title: 'Maîtriser son smartphone et ses applis utiles',
    duration: 'Semaines 3 – 4',
    objectif:
      'Installer, organiser et mettre à jour les applications indispensables sans saturer son téléphone.',
    actions: [
      'Mettre à jour iOS ou Android',
      'Installer une appli depuis l’App Store / Play Store',
      'Organiser les icônes en dossiers (photo, santé, transport…)',
      'Sauvegarder automatiquement les photos (Google Photos / iCloud)',
      'Activer le mode économie de batterie et gérer les notifications',
    ],
    outils: [
      'App Store / Google Play',
      'Google Photos ou iCloud',
      'Réglages du téléphone',
      'Files / Gestionnaire de fichiers',
    ],
    exemples: [
      'Installer une appli de transport local',
      'Créer un dossier “Santé” pour TousAntiCovid, Doctolib…',
      'Sauvegarder automatiquement ses photos',
    ],
    resultat:
      'Téléphone à jour, rangé, sauvegardé et économe en batterie.',
    modeEmploi:
      'Prenez votre téléphone, ouvrez Réglages, suivez chaque étape et cochez.',
  },

  /* 3. Outils du quotidien ----------------------------------------- */
  {
    id: '3',
    title: 'Maîtriser les outils du quotidien',
    duration: 'Semaines 5 – 8',
    objectif:
      'Écrire, s’organiser et communiquer en ligne avec des outils gratuits.',
    actions: [
      'Créer un document dans Google Docs',
      'Créer un tableau simple dans Google Sheets',
      'Prendre des notes structurées dans Notion ou Google Keep',
      'Rejoindre une visioconférence (Google Meet ou Zoom)',
      'Réaliser un CV ou une invitation avec Canva',
    ],
    outils: [
      'Google Docs, Google Sheets',
      'Notion, Google Keep',
      'Google Meet ou Zoom',
      'Canva (offre Free)',
    ],
    exemples: [
      'Liste de courses partagée',
      'Suivi de budget mensuel',
      'Visio de l’association',
    ],
    resultat:
      'Vous rédigez, organisez vos idées et communiquez en ligne simplement.',
    modeEmploi:
      'Ouvrez les outils, faites un exercice réel (ex. votre liste de courses), puis cochez.',
  },

  /* 4. Sécurité numérique ----------------------------------------- */
  {
    id: '4',
    title: 'Sécurité numérique et bons réflexes',
    duration: 'En continu (module essentiel)',
    objectif:
      'Adopter les bonnes pratiques pour naviguer sereinement et protéger ses données.',
    actions: [
      'Reconnaître un e‑mail ou SMS suspect (phishing)',
      'Créer un mot de passe solide + l’enregistrer dans Bitwarden',
      'Activer la vérification en 2 étapes sur Gmail',
      'Comprendre pourquoi ne pas partager ses infos bancaires',
      'Jouer à un quiz ludique sur la cybersécurité',
    ],
    outils: [
      'Bitwarden',
      'Google Password Manager',
      'Quiz cybersécurité',
      'Navigateur sécurisé (Chrome / Firefox à jour)',
    ],
    exemples: [
      'Repérer un faux message “Colis en attente”',
      'Activer la 2FA sur Google',
    ],
    resultat:
      'Vous surfez en toute confiance : mots de passe solides et vigilance accrue.',
    modeEmploi:
      'Suivez ces actions dès maintenant puis validez vos connaissances avec le quiz.',
  },

  /* 5. Réseaux sociaux --------------------------------------------- */
  {
    id: '5',
    title: 'Communiquer sur les réseaux sociaux en confiance',
    duration: 'Semaines 9 – 10',
    objectif:
      'Créer un compte, publier et échanger en maîtrisant sa confidentialité.',
    actions: [
      'Créer un profil Facebook (ou groupe WhatsApp / Signal)',
      'Régler la confidentialité des publications',
      'Poster un premier message ou photo',
      'Répondre à un commentaire ou message privé',
      'Bloquer / signaler un contenu gênant',
    ],
    outils: ['Facebook', 'WhatsApp ou Signal', 'Messenger'],
    exemples: [
      'Publier une photo visible par vos amis uniquement',
      'Envoyer un message vocal familial',
    ],
    resultat:
      'Vous partagez et échangez tout en protégeant votre vie privée.',
    modeEmploi:
      'Créez un compte test si besoin, suivez chaque action et cochez.',
  },

  /* 6. Démarches administratives ----------------------------------- */
  {
    id: '6',
    title: 'Réaliser ses démarches administratives en ligne',
    duration: 'Semaines 11 – 12',
    objectif:
      'Utiliser les services publics numériques pour gagner du temps.',
    actions: [
      'Créer / se connecter avec FranceConnect',
      'Télécharger un document officiel (impôts, CPAM…)',
      'Déclarer un changement d’adresse',
      'Prendre un rendez‑vous médical via Doctolib',
      'Envoyer un formulaire PDF par e‑mail',
    ],
    outils: [
      'FranceConnect',
      'Impots.gouv, Ameli.fr',
      'Doctolib',
      'Adobe Reader',
      'Gmail',
    ],
    exemples: [
      'Télécharger une attestation CPAM',
      'Envoyer un justificatif de domicile scanné',
    ],
    resultat:
      'Vous accomplissez vos démarches courantes sans déplacement.',
    modeEmploi:
      'Choisissez une démarche réelle, suivez pas‑à‑pas, puis cochez.',
  },

  /* 7. Découverte IA ----------------------------------------------- */
  {
    id: '7',
    title: 'Découvrir l’IA au quotidien',
    duration: 'Semaines 13 – 14',
    objectif:
      'Utiliser l’IA comme assistant pour gagner du temps et trouver des idées.',
    actions: [
      'Poser une question à ChatGPT ou Gemini',
      'Demander un résumé ou correction de texte',
      'Créer une carte d’invitation avec Canva IA',
      'Tester l’écriture assistée dans Notion AI ou Google Docs',
      'Explorer l’appli mobile Gemini',
    ],
    outils: [
      'ChatGPT',
      'Gemini',
      'Canva IA',
      'Notion AI',
      'Google Docs (IA)',
    ],
    exemples: [
      '« Explique‑moi la fibre optique en mots simples »',
      'Corriger une lettre de réclamation',
    ],
    resultat:
      'Vous dialoguez avec une IA et créez textes / visuels rapidement.',
    modeEmploi:
      'Testez chaque outil avec un besoin réel, puis cochez.',
  },

  /* 8. Acheter & vendre en ligne ----------------------------------- */
  {
    id: '8',
    title: 'Acheter et vendre en ligne en toute sécurité',
    duration: 'Semaines 15 – 16',
    objectif:
      'Trouver une bonne affaire, payer sans risque et revendre simplement.',
    actions: [
      'Créer un compte (Le Bon Coin, Vinted ou Amazon)',
      'Comparer les annonces et vérifier les évaluations',
      'Ajouter un moyen de paiement sécurisé',
      'Passer une commande et suivre la livraison',
      'Déposer une évaluation',
      'Mettre en vente un objet (photo, prix, étiquette colis)',
      'Reconnaître et signaler une arnaque',
    ],
    outils: [
      'Le Bon Coin', 'Vinted', 'Amazon',
      'PayPal / carte virtuelle',
      'Colissimo / Mondial Relay',
    ],
    exemples: [
      'Acheter un livre d’occasion et suivre le colis',
      'Vendre un vêtement sur Vinted',
    ],
    resultat:
      'Vous achetez en confiance et revendez vos objets sans stress.',
    modeEmploi:
      'Faites d’abord UN petit achat, puis UNE petite vente, puis cochez.',
  },

  /* 9. Gérer son argent en ligne ----------------------------------- */
  {
    id: '9',
    title: 'Gérer son argent en ligne en toute sérénité',
    duration: 'Semaines 17 – 18',
    objectif:
      'Consulter ses comptes, payer sans contact et suivre son budget.',
    actions: [
      'Installer l’appli de votre banque + 2FA',
      'Consulter solde et opérations',
      'Ajouter carte à Google Pay / Apple Pay et faire un paiement NFC',
      'Activer notifications en temps réel',
      'Installer une appli budget (Bankin’, Linxo…) et la connecter',
      'Catégoriser les dépenses et fixer une alerte',
    ],
    outils: [
      'Appli banque mobile',
      'Google Pay / Apple Pay',
      'Bankin’, Linxo, Yolt',
    ],
    exemples: [
      'Payer le café en NFC',
      'Recevoir une alerte “Budget courses dépassé”',
    ],
    resultat:
      'Vous suivez vos finances en temps réel et payez sans stress.',
    modeEmploi:
      'Installez l’appli banque, testez, puis cochez chaque étape.',
  },

  /* 10. Mini‑projet personnel ------------------------------------- */
  {
    id: '10',
    title: 'Réaliser un mini‑projet personnel',
    duration: 'Semaines 19 – 20',
    objectif:
      'Mettre en pratique vos acquis dans un projet concret.',
    actions: [
      'Créer un budget familial dans Google Sheets',
      'Concevoir un CV ou une présentation dans Canva',
      'Rédiger une lettre de motivation (Docs + IA)',
      'Partager un dossier avec Google Drive',
      'Gérer une to‑do list dans Notion ou Google Keep',
    ],
    outils: [
      'Google Sheets', 'Canva', 'Google Docs',
      'Google Drive', 'Notion / Google Keep',
    ],
    exemples: [
      'Suivre dépenses et revenus du ménage',
      'Envoyer CV + lettre à une association',
    ],
    resultat:
      'Vous créez, organisez et partagez un projet numérique de A à Z.',
    modeEmploi:
      'Choisissez LE projet qui vous motive, avancez étape par étape, cochez.',
  },

  /* 11. Automatiser les tâches ------------------------------------ */
  {
    id: '11',
    title: 'Automatiser les petites tâches du quotidien',
    duration: 'Semaines 21 – 22',
    objectif:
      'Gagner du temps avec rappels, modèles de mails et petits raccords d’applications.',
    actions: [
      'Créer un rappel récurrent dans Google Calendar',
      'Programmer une alarme hebdo sur smartphone',
      'Créer un modèle de mail (Gmail / Outlook)',
      'Installer IFTTT et connecter deux services',
      'Automatiser la sauvegarde de photos vers Drive',
      'Créer un bloc‑note courses partagé auto‑mis à jour',
    ],
    outils: [
      'Google Calendar',
      'Gmail / Outlook',
      'IFTTT',
      'Google Drive',
      'Notion / Google Keep',
    ],
    exemples: [
      'SMS “Parapluie” si pluie annoncée',
      'Filtrer factures PDF vers Drive',
    ],
    resultat:
      'La technologie gère rappels et routines ; vous gagnez du temps.',
    modeEmploi:
      'Commencez par un rappel simple, puis testez une automatisation IFTTT, cochez.',
  },

  /* 12. Créativité numérique -------------------------------------- */
  {
    id: '12',
    title: 'Créativité numérique : photos, vidéos & designs',
    duration: 'Semaines 23 – 24',
    objectif:
      'Retoucher photos, monter une vidéo et créer des visuels attrayants.',
    actions: [
      'Retoucher 5 photos (Google Photos / Snapseed)',
      'Créer un diaporama 1 min (Canva / Clipchamp)',
      'Ajouter filtre + texte sur courte vidéo mobile',
      'Concevoir une invitation avec Canva avancé',
      'Exporter en MP4 / PDF et partager',
      'Compresser une vidéo trop lourde',
    ],
    outils: [
      'Canva', 'Clipchamp',
      'Google Photos', 'Snapseed',
      'Pixabay / Unsplash',
    ],
    exemples: [
      'Carte d’anniversaire animée',
      'Vidéo vacances + musique libre',
    ],
    resultat:
      'Vos souvenirs sont mis en valeur et faciles à partager.',
    modeEmploi:
      'Prenez un souvenir concret, suivez retouche → montage → partage, cochez.',
  },

  /* 13. Bien‑être digital ----------------------------------------- */
  {
    id: '13',
    title: 'Bien‑être digital : utiliser la tech sans fatigue',
    duration: 'Semaines 25 – 26 (ou en continu)',
    objectif:
      'Réduire la fatigue visuelle, gérer son temps d’écran et garder une posture saine.',
    actions: [
      'Activer les rapports “Temps d’écran” (iOS / Android)',
      'Définir une limite quotidienne pour une appli',
      'Programmer le filtre lumière bleue le soir',
      'Appliquer la règle 20‑20‑20 (pauses régulières)',
      'Ajuster la hauteur de l’écran + support nuque',
      'Utiliser un minuteur Pomodoro pour micro‑pauses',
    ],
    outils: [
      'Temps d’écran (iOS) / Digital Wellbeing (Android)',
      'Night Shift / Night Light',
      'Applis Pomodoro (Focus To‑Do, Forest…)'
    ],
    exemples: [
      'Alerte après 1 h sur Facebook',
      'Écran en teinte chaude après 20 h',
    ],
    resultat:
      'Usage équilibré : moins de fatigue oculaire, meilleure posture.',
    modeEmploi:
      'Mesurez votre temps d’écran, fixez UNE limite, activez le filtre nuit, cochez.',
  },
];
