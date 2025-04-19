// lib/data/phases.ts

export type Phase = {
    id: string;
    title: string;
    duration: string;
    objectif: string;
    actions: string[];
    outils: string[];
    exemples?: string[];
    resultat: string;
  };
  
  export const phases: Phase[] = [
    {
      id: '1',
      title: 'Prendre le contrôle de son ordi',
      duration: 'Semaine 1–2',
      objectif: "Ne plus avoir peur de cliquer. Comprendre l’environnement.",
      actions: [
        'Organiser ses fichiers : créer/déplacer/supprimer des dossiers',
        'Installer un navigateur comme Google Chrome ou Firefox',
        'Créer une adresse Gmail et envoyer un e-mail',
        'Faire une recherche simple sur Google ou YouTube',
        'Installer un antivirus gratuit (Microsoft Defender ou Avast)'
      ],
      outils: [
        'Google Chrome', 'Gmail', 'YouTube',
        'Google Drive (15 Go gratuits)', 'VLC', 'PDF Viewer',
        'Microsoft Defender', 'Notion (gratuit en perso)'
      ],
      exemples: [
        'Chercher une recette de cuisine sur YouTube',
        'Créer un dossier "documents personnels"',
        'Envoyer un e-mail à un proche avec une pièce jointe'
      ],
      resultat:
        'L’utilisateur sait naviguer sur internet, envoyer un mail, organiser ses fichiers, installer un programme, et chercher des infos en ligne.'
    },
    {
      id: '2',
      title: 'Maîtrise des outils modernes',
      duration: 'Semaine 3–6',
      objectif: 'Utiliser des outils essentiels pour s’organiser, écrire et communiquer.',
      actions: [
        'Créer un document texte avec Google Docs',
        'Créer un tableau de calcul avec Google Sheets',
        'Prendre des notes organisées dans Notion',
        'Participer à une visio sur Google Meet ou Zoom (compte gratuit)',
        'Créer un CV ou une carte d’invitation simple avec Canva'
      ],
      outils: [
        'Google Docs', 'Google Sheets', 'Notion (perso gratuit)',
        'Zoom (gratuit jusqu’à 40 min)', 'Google Meet', 'Canva (free)'
      ],
      exemples: [
        'Faire une liste de courses dans Google Docs',
        'Créer un tableau de suivi de traitement médical ou de rendez-vous',
        'Faire une visio avec ses enfants ou petits-enfants'
      ],
      resultat:
        'L’utilisateur sait écrire, partager un document, organiser ses idées, faire une réunion vidéo et créer un petit design utile.'
    },
    {
      id: '3',
      title: 'Découvrir l’IA au quotidien',
      duration: 'Semaine 7–10',
      objectif: 'Apprendre à se servir de l’IA pour gagner du temps et générer des idées.',
      actions: [
        'Utiliser ChatGPT gratuit (chat.openai.com) pour poser une question',
        'Demander un résumé ou une relecture de texte à l’IA',
        'Créer une image ou un visuel simple avec Canva IA',
        'Tester l’écriture assistée dans Google Docs ou Notion AI (essai)',
        'Découvrir Gemini (assistant IA Google sur mobile ou web)'
      ],
      outils: [
        'ChatGPT (gratuit avec compte)', 'Canva IA (free tier)', 'Notion AI (essai)',
        'Gemini (Google AI)', 'Google Docs (aide contextuelle IA)'
      ],
      exemples: [
        'Demander à l’IA de rédiger un message ou une lettre simple',
        'Créer une invitation ou un visuel de fête de famille avec Canva AI',
        'Demander à l’IA : "Peux-tu m’expliquer simplement comment fonctionne un QR code ?"'
      ],
      resultat:
        'L’utilisateur sait dialoguer avec une IA, demander un coup de pouce, et utiliser l’IA comme assistant personnel dans ses outils habituels.'
    },
    {
      id: '4',
      title: 'Créer un mini projet personnel',
      duration: 'Semaine 11–12',
      objectif: 'Mettre en pratique tout ce qui a été appris dans un petit projet utile.',
      actions: [
        'Créer un tableau de budget simple avec Google Sheets',
        'Créer un CV visuel ou une présentation avec Canva',
        'Faire une lettre de motivation avec Google Docs + IA',
        'Partager un dossier ou un fichier avec Google Drive',
        'Créer une to-do list dans Notion ou Google Keep'
      ],
      outils: [
        'Google Sheets', 'Google Docs', 'Google Drive',
        'Canva', 'Notion', 'Google Keep'
      ],
      exemples: [
        'Créer un budget mensuel pour suivre ses dépenses',
        'Envoyer un CV et une lettre de motivation à une association ou entreprise',
        'Créer une présentation pour partager un projet ou une histoire de famille'
      ],
      resultat:
        'L’utilisateur est autonome pour créer, organiser et partager ses projets personnels ou professionnels en toute confiance.'
    },
    {
      id: '5',
      title: 'Sécurité numérique et bonnes pratiques',
      duration: 'En continu (module bonus)',
      objectif: 'Acquérir les bons réflexes pour utiliser internet sans crainte.',
      actions: [
        'Reconnaître un faux e-mail ou un lien douteux',
        'Créer un mot de passe fort et le mémoriser facilement',
        'Apprendre à ne jamais transmettre ses infos bancaires par mail',
        'Repérer une arnaque ou une fausse pub',
        'Jouer à un petit quiz sur la sécurité numérique'
      ],
      outils: [
        'Bitwarden (gestionnaire gratuit)', 'Google Passwords', 'Jeu/quiz de cybersécurité', 'Navigateur sécurisé (Chrome / Firefox)'
      ],
      exemples: [
        'Détecter un faux message de livraison',
        'Créer un mot de passe sécurisé pour sa boîte mail',
        'Activer la vérification en 2 étapes sur Gmail'
      ],
      resultat:
        'L’utilisateur sait naviguer en toute sécurité, repérer les pièges classiques, protéger ses comptes et agir en confiance sur internet.'
    }
  ];
  