// src/lib/data/phases.ts

/**
 * Objectif global :
 * Devenez le gardien de votre vie numérique — protégez vos données, votre identité et votre sérénité.
 */
export const programmeTagline =
  'Devenez le gardien de votre vie numérique — protégez vos données, votre identité et votre sérénité.';

/* ------------------------------------------------------------------ */
/* Modèle d’une phase d’apprentissage                                  */
/* ------------------------------------------------------------------ */
export type Phase = {
  id: string;
  title: string;
  duration: string;
  objectif: string;
  actions: { title: string; details: string }[]; // 👈 Structure modifiée
  outils: string[];
  exemples?: string[];
  resultat: string;
  modeEmploi: string;
};

/* ------------------------------------------------------------------ */
/* Parcours de sensibilisation à la sécurité numérique                */
/* ------------------------------------------------------------------ */
export const phases: Phase[] = [
  /* 1. Mots de passe & 2FA --------------------------------------- */
  {
    id: '1',
    title: 'Mots de passe robustes & Double Sécurité (2FA)',
    duration: 'Module de 45 minutes',
    objectif:
      'Créer des mots de passe impossibles à deviner et ajouter une couche de sécurité infaillible à vos comptes.',
    actions: [
      {
        title: 'Comprendre ce qui fait un mot de passe FORT',
        details: `
          Un mot de passe fort repose sur 3 piliers :
          <ul>
            <li><strong>Longueur :</strong> Visez au moins 12 caractères. Plus c'est long, plus c'est sûr.</li>
            <li><strong>Complexité :</strong> Mélangez majuscules, minuscules, chiffres et symboles (!, @, #, $, %).</li>
            <li><strong>Unicité :</strong> N'utilisez JAMAIS le même mot de passe pour plusieurs sites.</li>
          </ul>
          L'astuce est de créer une phrase de passe facile à retenir pour vous, mais difficile à deviner. Exemple : "MonChatAdoreLesCroquettes!2024"
        `,
      },
      {
        title: 'Installer et utiliser un gestionnaire de mots de passe',
        details: `
          Un gestionnaire de mots de passe est un coffre-fort numérique. Il retient tous vos mots de passe pour vous.
          <ol>
            <li><strong>Choisissez un gestionnaire :</strong> Bitwarden est une excellente option gratuite et open-source.</li>
            <li><strong>Installez-le :</strong> Ajoutez l'extension à votre navigateur et téléchargez l'application sur votre téléphone.</li>
            <li><strong>Créez un mot de passe maître TRÈS solide :</strong> C'est le seul que vous devrez retenir.</li>
            <li><strong>Commencez à l'utiliser :</strong> Enregistrez vos mots de passe existants et laissez-le en générer de nouveaux, longs et complexes, pour chaque nouveau compte.</li>
          </ol>
        `,
      },
      {
        title: 'Activer la vérification en 2 étapes (2FA)',
        details: `
          La 2FA ajoute une deuxième couche de sécurité. Même si quelqu'un vole votre mot de passe, il ne pourra pas se connecter sans votre téléphone.
          <ul>
            <li><strong>Comment ça marche ?</strong> Après avoir entré votre mot de passe, le site vous demande un code unique généré par une application sur votre téléphone (comme Google Authenticator ou Authy).</li>
            <li><strong>Où l'activer ?</strong> Allez dans les paramètres de sécurité de vos comptes les plus importants (Google, Apple, Facebook, banque...). Cherchez l'option "Validation en deux étapes", "Vérification en deux étapes" ou "2FA".</li>
            <li><strong>Suivez les instructions :</strong> Scannez le QR code avec votre application d'authentification et sauvegardez les codes de secours dans un endroit sûr.</li>
          </ul>
        `,
      },
      {
        title: 'Identifier les 5 erreurs les plus communes à éviter',
        details: `
          <ol>
            <li><strong>Réutiliser le même mot de passe :</strong> Si un site est piraté, tous vos comptes sont en danger.</li>
            <li><strong>Utiliser des informations personnelles :</strong> Dates de naissance, noms de proches, adresses... sont faciles à deviner.</li>
            <li><strong>Choisir des mots du dictionnaire :</strong> "chocolat123" est très faible.</li>
            <li><strong>Stocker les mots de passe en clair :</strong> Ne les écrivez pas dans un fichier texte ou sur un post-it.</li>
            <li><strong>Les partager :</strong> Ne donnez jamais votre mot de passe à qui que ce soit.</li>
          </ol>
        `,
      },
      {
        title: 'Vérifier si vos mots de passe ont déjà fuité',
        details: `
          Des sites web se font pirater tous les jours. Il est important de savoir si vos informations ont été compromises.
          <ol>
            <li><strong>Allez sur le site :</strong> <a href="https://haveibeenpwned.com/" target="_blank" rel="noopener noreferrer">Have I Been Pwned?</a></li>
            <li><strong>Entrez votre adresse e-mail :</strong> Le site vous dira si votre adresse e-mail a été trouvée dans une fuite de données connue.</li>
            <li><strong>Si vous êtes "pwned" (piraté) :</strong> Changez immédiatement le mot de passe du ou des comptes concernés. Utilisez votre gestionnaire pour créer un mot de passe unique et fort.</li>
          </ol>
        `,
      },
    ],
    outils: [
      'Bitwarden (Gestionnaire de mots de passe)',
      'Have I Been Pwned (Service de vérification)',
      'Paramètres de sécurité Google/Apple',
    ],
    exemples: [
      'Transformer "azerty123" en "Av!on-R@pide-5-Jup!ter"',
      'Utiliser Google Authenticator pour générer un code 2FA',
    ],
    resultat:
      'Vos comptes sont protégés par des mots de passe uniques et une double vérification. Le piratage devient quasi impossible.',
    modeEmploi:
      '🟡 Lisez → 🟢 Appliquez sur UN de vos comptes → ✅ Cochez. La sécurité est une habitude, pas une course.',
  },

  /* 2. Phishing & Arnaques ---------------------------------- */
  {
    id: '2',
    title: 'Détecter le Phishing et les Arnaques en Ligne',
    duration: 'Module de 60 minutes',
    objectif:
      'Devenir un véritable détecteur de fraudes pour ne plus jamais tomber dans les pièges des arnaqueurs.',
    actions: [
      {
        title: 'Analyser un e-mail de phishing (faux message de banque, colis, etc.)',
        details: `
          Examinez attentivement l'expéditeur, l'objet, le contenu et les liens. Les arnaqueurs imitent souvent des marques connues.
          <ul>
            <li><strong>Expéditeur :</strong> Vérifiez l'adresse e-mail complète, pas seulement le nom affiché.</li>
            <li><strong>Objet :</strong> Méfiez-vous des objets alarmistes ou trop alléchants.</li>
            <li><strong>Contenu :</strong> Fautes d'orthographe, grammaire approximative, ton menaçant ou trop beau pour être vrai.</li>
            <li><strong>Liens :</strong> Ne cliquez jamais directement. Survolez-les pour voir l'URL réelle.</li>
          </ul>
        `,
      },
      {
        title: 'Identifier les 7 indices qui trahissent une arnaque',
        details: `
          Les signes courants incluent : une demande d'informations personnelles urgentes, des menaces, des offres trop belles pour être vraies, des fautes de langue, des liens suspects, des pièces jointes inattendues, et un expéditeur inconnu ou générique.
        `,
      },
      {
        title: 'Apprendre la technique du survol de lien ("link hovering")',
        details: `
          Avant de cliquer sur un lien dans un e-mail ou sur une page web, passez votre souris dessus (sans cliquer). L'URL réelle s'affichera généralement en bas à gauche de votre navigateur. Si l'URL ne correspond pas à ce que vous attendez (ex: un lien PayPal qui mène à un site étrange), ne cliquez pas !
        `,
      },
      {
        title: 'Reconnaître le "smishing" (phishing par SMS) et le "vishing" (par téléphone)',
        details: `
          <ul>
            <li><strong>Smishing :</strong> Phishing par SMS. Messages vous demandant de cliquer sur un lien pour un colis, une amende, un remboursement, etc.</li>
            <li><strong>Vishing :</strong> Phishing par appel téléphonique. L'arnaqueur se fait passer pour une banque, un support technique, etc., pour vous soutirer des informations.</li>
          </ul>
          La règle d'or : ne jamais donner d'informations personnelles ou bancaires par SMS ou téléphone si vous n'êtes pas à l'origine de l'appel.
        `,
      },
      {
        title: 'Savoir quoi faire si vous avez cliqué sur un lien suspect',
        details: `
          <ul>
            <li><strong>Ne paniquez pas :</strong> La simple ouverture d'un lien est rarement dangereuse.</li>
            <li><strong>Ne saisissez aucune information :</strong> Si une page s'ouvre et vous demande des identifiants, ne les entrez pas.</li>
            <li><strong>Fermez la page :</strong> Fermez l'onglet ou la fenêtre immédiatement.</li>
            <li><strong>Changez vos mots de passe :</strong> Par précaution, changez les mots de passe des comptes potentiellement ciblés.</li>
            <li><strong>Analysez votre appareil :</strong> Lancez une analyse antivirus complète.</li>
            <li><strong>Signalez :</strong> Utilisez des plateformes comme Signal-Spam pour signaler l'arnaque.</li>
          </ul>
        `,
      },
    ],
    outils: [
      'Votre boîte mail (pour observer)',
      'Signal-Spam (plateforme de signalement)',
      'Cybermalveillance.gouv.fr',
    ],
    exemples: [
      'Repérer le faux message "Votre compte CPF arrive à expiration"',
      'Identifier un SMS frauduleux de livraison de colis',
    ],
    resultat:
      'Vous identifiez 99% des tentatives de phishing et savez exactement comment réagir. Votre sérénité est préservée.',
    modeEmploi:
      'Ouvrez votre boîte mail, analysez un ancien spam avec cette nouvelle grille de lecture, puis cochez.',
  },

  /* 3. Navigation Sécurisée ----------------------------------------- */
  {
    id: '3',
    title: 'Navigation Sécurisée sur le Web',
    duration: 'Module de 30 minutes',
    objectif:
      'Surfer sur Internet en toute confiance, en sachant où vous mettez les pieds numériques.',
    actions: [
      {
        title: 'Vérifier la présence du "https://" et du cadenas',
        details: `
          Lorsque vous visitez un site web, assurez-vous que l'adresse commence par <code>https://</code> et qu'un petit cadenas est visible dans la barre d'adresse de votre navigateur. Cela signifie que la connexion est sécurisée et chiffrée, protégeant ainsi vos données.
        `,
      },
      {
        title: 'Comprendre et gérer les cookies de votre navigateur',
        details: `
          Les cookies sont de petits fichiers que les sites web stockent sur votre ordinateur. Ils peuvent être utiles (garder votre session ouverte) ou servir au suivi publicitaire. Apprenez à les gérer dans les paramètres de votre navigateur : vous pouvez les bloquer, les supprimer régulièrement ou n'autoriser que les cookies essentiels.
        `,
      },
      {
        title: 'Utiliser le mode de navigation privée (et comprendre ses limites)',
        details: `
          Le mode de navigation privée (Incognito sur Chrome, Private Window sur Firefox) empêche le navigateur d'enregistrer votre historique, vos cookies et les données de formulaires. Utile pour les ordinateurs partagés, mais attention : il ne vous rend pas anonyme sur Internet et votre fournisseur d'accès peut toujours voir votre activité.
        `,
      },
      {
        title: 'Nettoyer régulièrement vos extensions de navigateur',
        details: `
          Les extensions peuvent être pratiques, mais certaines peuvent collecter vos données ou introduire des vulnérabilités. Vérifiez régulièrement la liste de vos extensions et supprimez celles que vous n'utilisez plus ou qui vous semblent suspectes.
        `,
      },
      {
        title: "Reconnaître les signes d'un site web non sécurisé",
        details: `
          Outre l'absence de HTTPS et de cadenas, méfiez-vous des sites avec une mise en page bâclée, des fautes d'orthographe, des pop-ups agressifs, ou des demandes d'informations excessives. Un site non sécurisé peut être un piège à phishing ou héberger des logiciels malveillants.
        `,
      },
    ],
    outils: [
      'Votre navigateur (Chrome, Firefox, Safari)',
      'Paramètres de confidentialité du navigateur',
    ],
    exemples: [
      "Effacer les cookies d'un site marchand après une visite",
      "Désinstaller une extension que vous n'utilisez plus",
    ],
    resultat:
      'Vous naviguez sur le web de manière plus sûre, en laissant moins de traces et en évitant les sites dangereux.',
    modeEmploi:
      'Ouvrez les paramètres de votre navigateur, suivez chaque étape et cochez.',
  },

  /* 4. Protection des Données Personnelles -------------------------- */
  {
    id: '4',
    title: 'Protéger ses Données Personnelles',
    duration: 'Module de 45 minutes',
    objectif:
      'Reprendre le contrôle sur les informations que vous partagez en ligne, consciemment ou non.',
    actions: [
      {
        title: 'Effectuer un "check-up" de confidentialité sur Facebook et Google',
        details: `
          Prenez le temps de parcourir les paramètres de confidentialité de vos comptes Google et Facebook. Ces plateformes offrent des outils pour contrôler qui voit vos informations, vos publications, et comment vos données sont utilisées pour la publicité. Ajustez-les selon votre niveau de confort.
        `,
      },
      {
        title: "Comprendre ce qu'est une donnée personnelle (RGPD)",
        details: `
          Une donnée personnelle est toute information qui permet d'identifier directement ou indirectement une personne physique (nom, adresse e-mail, numéro de téléphone, adresse IP, données de localisation, etc.). Le RGPD (Règlement Général sur la Protection des Données) est une loi européenne qui vous donne des droits sur vos données.
        `,
      },
      {
        title: 'Limiter le partage de localisation sur votre smartphone',
        details: `
          De nombreuses applications demandent l'accès à votre localisation. Vérifiez les paramètres de confidentialité de votre smartphone et désactivez le partage de localisation pour les applications qui n'en ont pas réellement besoin. Vous pouvez souvent choisir de partager votre localisation uniquement lorsque l'application est en cours d'utilisation.
        `,
      },
      {
        title: 'Utiliser un moteur de recherche respectueux de la vie privée (DuckDuckGo)',
        details: `
          Contrairement à Google, DuckDuckGo ne trace pas vos recherches et ne collecte pas vos données personnelles. L'utiliser est un moyen simple de réduire votre empreinte numérique et de protéger votre vie privée en ligne.
        `,
      },
      {
        title: "Savoir comment exercer votre droit à l'oubli",
        details: `
          Le droit à l'oubli (ou droit à l'effacement) vous permet de demander aux moteurs de recherche de supprimer des liens vers des informations vous concernant qui sont obsolètes, inexactes ou préjudiciables. Vous pouvez également demander aux entreprises de supprimer vos données personnelles qu'elles détiennent.
        `,
      },
    ],
    outils: [
      'Google Dashboard',
      'Paramètres de confidentialité Facebook',
      'DuckDuckGo (Moteur de recherche)',
    ],
    exemples: [
      'Rendre votre profil Facebook visible uniquement par vos amis',
      "Désactiver l'historique de localisation de votre compte Google",
    ],
    resultat:
      'Vous maîtrisez quelles informations sont partagées et avec qui. Votre vie privée est mieux gardée.',
    modeEmploi:
      'Choisissez un compte (Google ou Facebook), faites le check-up complet, puis cochez.',
  },

  /* 5. Sécurité des Appareils --------------------------------------- */
  {
    id: '5',
    title: 'Sécuriser son Ordinateur et son Smartphone',
    duration: 'Module de 30 minutes',
    objectif:
      'Transformer vos appareils en forteresses numériques contre les virus et les accès non autorisés.',
    actions: [
      {
        title: 'Activer et configurer le pare-feu de votre ordinateur',
        details: `
          Le pare-feu est votre première ligne de défense contre les menaces externes. Il contrôle le trafic réseau entrant et sortant. Assurez-vous qu'il est activé et configuré pour bloquer les connexions non autorisées. Sur Windows, c'est le "Pare-feu Windows Defender"; sur macOS, c'est le "Pare-feu" dans les réglages de sécurité.
        `,
      },
      {
        title: 'Planifier les mises à jour automatiques (OS et applications)',
        details: `
          Les mises à jour logicielles contiennent souvent des correctifs de sécurité importants. Activez les mises à jour automatiques pour votre système d'exploitation (Windows, macOS, Android, iOS) et vos applications. C'est le moyen le plus simple de rester protégé contre les vulnérabilités connues.
        `,
      },
      {
        title: 'Lancer une analyse antivirus complète (Microsoft Defender ou autre)',
        details: `
          Un bon antivirus (comme Microsoft Defender intégré à Windows, ou un tiers) est essentiel. Lancez régulièrement une analyse complète de votre système pour détecter et supprimer les logiciels malveillants. Ne vous fiez pas uniquement à la protection en temps réel.
        `,
      },
      {
        title: 'Configurer un code de verrouillage robuste sur votre smartphone',
        details: `
          Votre smartphone contient une mine d'informations personnelles. Utilisez un code PIN long (6 chiffres ou plus), un schéma complexe, ou mieux, un mot de passe alphanumérique. Activez le déverrouillage par empreinte digitale ou reconnaissance faciale pour plus de commodité, mais gardez un code robuste en secours.
        `,
      },
      {
        title: 'Chiffrer les données de votre disque dur (BitLocker/FileVault)',
        details: `
          Le chiffrement de disque protège vos données même si votre appareil est perdu ou volé. BitLocker pour Windows et FileVault pour macOS chiffrent l'intégralité de votre disque dur. Activez cette fonctionnalité pour une protection maximale de vos informations.
        `,
      },
    ],
    outils: ['Microsoft Defender / Antivirus tiers', 'Paramètres système (Windows/macOS/Android/iOS)'],
    exemples: [
      'Vérifier que votre ordinateur a bien fait sa dernière mise à jour',
      "Passer d'un code à 4 chiffres à un mot de passe sur votre téléphone",
    ],
    resultat:
      'Vos appareils sont à jour, protégés contre les menaces courantes et verrouillés contre les curieux.',
    modeEmploi:
      'Prenez un appareil (ordinateur ou smartphone), appliquez tous les points, puis cochez.',
  },

  /* 6. Quiz Final -------------------------------------------------- */
  {
    id: '6',
    title: 'Testez vos Réflexes de Cyber-Sentinelle',
    duration: 'Quiz de 15 minutes',
    objectif:
      'Valider vos nouvelles compétences avec une simulation ludique et obtenir votre badge de Sentinelle Numérique.',
    actions: [
      {
        title: 'Répondre à un quiz interactif sur tous les modules',
        details: `
          Ce quiz final est conçu pour tester votre compréhension globale des concepts de sécurité abordés dans les modules précédents. Il couvrira des questions sur les mots de passe, le phishing, la navigation sécurisée, la protection des données et la sécurité des appareils.
        `,
      },
      {
        title: "Analyser 5 exemples d'e-mails et décider s'ils sont légitimes ou des arnaques",
        details: `
          Vous serez confronté à des exemples concrets d'e-mails (simulés) et devrez identifier s'il s'agit de tentatives de phishing ou de messages légitimes. Cela mettra en pratique votre capacité à repérer les indices d'une arnaque.
        `,
      },
      {
        title: "Prendre une décision face à un scénario d'urgence simulé",
        details: `
          Un scénario interactif vous mettra en situation face à une menace de sécurité (ex: un message suspect, un compte piraté). Vous devrez choisir la meilleure action à entreprendre parmi plusieurs options, testant ainsi vos réflexes et votre capacité à réagir sous pression.
        `,
      },
      {
        title: "Obtenir votre score et les axes d'amélioration",
        details: `
          À la fin du quiz, vous recevrez un score détaillé et des retours personnalisés sur les domaines où vous excellez et ceux où vous pourriez encore vous améliorer. Cela vous aidera à consolider vos connaissances.
        `,
      },
      {
        title: 'Recevoir votre badge de "Sentinelle Numérique" à partager',
        details: `
          En réussissant ce quiz final, vous obtiendrez un badge numérique de "Sentinelle Numérique", attestant de vos compétences en cybersécurité. Vous pourrez le partager sur vos réseaux sociaux ou l'ajouter à votre CV pour valoriser vos nouvelles compétences.
        `,
      },
    ],
    outils: [
      'Quiz interactif (à développer)',
      'Générateur de badge (à développer)',
    ],
    exemples: [
      'Quiz: "Un cadenas vert signifie que le site est 100% sûr. Vrai ou Faux?"',
      'Simulation: "Vous recevez un appel de votre banque vous demandant votre mot de passe. Que faites-vous?"',
    ],
    resultat:
      'Vous avez la confiance et les compétences pour naviguer dans le monde numérique de manière autonome et sécurisée.',
    modeEmploi:
      "Faites le quiz pour tester vos connaissances. Ne vous inquiétez pas du score, l'important est d'apprendre !",
  },
];