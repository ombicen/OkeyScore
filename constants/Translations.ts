export type Language = "ku" | "en";

export const translations = {
  ku: {
    // Navigation and general
    addPlayers: "Lêdanê lêzêdekirin",
    settings: "Mîheng",
    game: "Yarî",
    results: "Encam",
    back: "Vegere",
    next: "Pêşve",
    save: "Tomar bike",
    reset: "Vegere sererast",
    continue: "Berdewam bike",

    // Add Players Screen
    addPlayersTitle: "Lêdanê lêzêdekirin",
    addPlayersSubtitle: "Navên lêdanan binivîse da dest pê bikî",
    player: "Lêdan",
    addPlayer: "+ Lêdanê lêzêdekirin",
    currentPlayers: "Lêdanên heyî",
    currentPlayersSubtitle: "Tu {count} lêdan{plural} çêkirî ye",
    continueWithCurrentPlayers: "Berdewam bike bi lêdanên heyî",
    resetGame: "Yarî vegerîne sererast",
    resetGameAddNewPlayers: "Yarî vegerîne & lêdanên nû zêde bike",

    // Select Rounds Screen
    selectRounds: "Gerdûnê hilbijêre",
    selectRoundsTitle: "Hejmara gerdûnê hilbijêre",
    selectRoundsSubtitle: "Hejmara tevahiya gerdûnê binivîse",
    numberOfRounds: "Hejmara Gerdûnê",

    // Game Screen
    round: "Gerdûn",
    of: "ji",
    colorMultipliers: "Çendekarên reng",
    red: "Sor",
    blue: "Şîn",
    yellow: "Zer",
    black: "Reş",
    currentScore: "Xala niha",
    finalScore: "Xala dawî",
    enterScore: "Xalê binivîse",
    winType: "Cureyê biqetandina",
    regularWin: "Biqetandina Asayî",
    okeyWin: "Biqetandina Okey",
    gameWinner: "Bijîşk",
    wonThisRound: "li vir gerdûnê biqetand! 🎉",
    nextPlayer: "Lêdanê din",
    finishRound: "Gerdûnê qedîne",
    noPlayersAdded: "Lêdan tune ne",
    noPlayersSubtitle:
      "Ji kerema xwe lêdanan zêde bike berî destpêkirina yarîyê.",
    noRoundsSet: "Gerdûn tune ne",
    gameNoRoundsSubtitle:
      "Ji kerema xwe hejmara gerdûnê saz bike berî destpêkirina yarîyê.",
    resetRoundsOnly: "Tenê gerdûnê vegerîne",

    // Settings Screen
    settingsTitle: "Mîheng",
    language: "Ziman",
    kurdish: "Kurdî",
    english: "Îngilîzî",
    colorMultipliersTitle: "Çendekarên reng",
    redMultiplier: "Çendekara Sor",
    blueMultiplier: "Çendekara Şîn",
    yellowMultiplier: "Çendekara Zer",
    blackMultiplier: "Çendekara Reş",
    defaultRoundsTitle: "Gerdûnên bingehîn",
    numberOfRoundsLabel: "Hejmara Gerdûnê",
    saveChanges: "Guhertinan tomar bike",
    restoreDefaults: "Vegere bingehîn",

    // Results Screen
    finalResults: "Encamên dawî",
    rankings: "Rêzok",
    resultsWinner: "Bijîşk",
    totalPoints: "Komê Xalan",
    roundDetails: "Hûrguliyên gerdûnê",
    roundNumber: "Gerdûn",
    multiplier: "Çendekar",
    regularWinType: "Biqetandina Asayî",
    okeyWinType: "Biqetandina Okey",
    playerScores: "Xalên lêdanan",
    noRoundsPlayed: "Tu gerdûn nehat lîstin",
    resultsNoRoundsSubtitle: "Ji bo dîtina encam, bi yarîyê dest pê bike.",
    startNewGame: "Yarîya Nû Dest Pê Bike",

    // Win type explanations
    regularWinExplanation: "Bijîşk -{points} xal distîne",
    okeyWinExplanation: "Bijîşk -{points} + 2× hemû xal distîne",

    // Player placeholders
    player1: "Lêdan 1",
    player2: "Lêdan 2",
    player3: "Lêdan 3",
    player4: "Lêdan 4",
    player5: "Lêdan 5",
    player6: "Lêdan 6",
  },
  en: {
    // Navigation and general
    addPlayers: "Add Players",
    settings: "Settings",
    game: "Game",
    results: "Results",
    back: "Back",
    next: "Next",
    save: "Save",
    reset: "Reset",
    continue: "Continue",

    // Add Players Screen
    addPlayersTitle: "Add Players",
    addPlayersSubtitle: "Enter player names to get started",
    player: "Player",
    addPlayer: "+ Add Player",
    currentPlayers: "Current Players",
    currentPlayersSubtitle: "You have {count} player{plural} set up",
    continueWithCurrentPlayers: "Continue with Current Players",
    resetGame: "Reset Game",
    resetGameAddNewPlayers: "Reset Game & Add New Players",

    // Select Rounds Screen
    selectRounds: "Select Rounds",
    selectRoundsTitle: "Select Number of Rounds",
    selectRoundsSubtitle: "Enter the total number of rounds to play",
    numberOfRounds: "Number of Rounds",

    // Game Screen
    round: "Round",
    of: "of",
    colorMultipliers: "Color Multipliers",
    red: "Red",
    blue: "Blue",
    yellow: "Yellow",
    black: "Black",
    currentScore: "Current Score",
    finalScore: "Final Score",
    enterScore: "Enter Score",
    winType: "Win Type",
    regularWin: "Regular Win",
    okeyWin: "Okey Win",
    gameWinner: "Winner",
    wonThisRound: "won this round! 🎉",
    nextPlayer: "Next Player",
    finishRound: "Finish Round",
    noPlayersAdded: "No Players Added",
    noPlayersSubtitle: "Please add players before starting a game.",
    noRoundsSet: "No Rounds Set",
    gameNoRoundsSubtitle:
      "Please set the number of rounds before starting a game.",
    resetRoundsOnly: "Reset Rounds Only",

    // Settings Screen
    settingsTitle: "Settings",
    language: "Language",
    kurdish: "Kurdî",
    english: "English",
    colorMultipliersTitle: "Color Multipliers",
    redMultiplier: "Red Multiplier",
    blueMultiplier: "Blue Multiplier",
    yellowMultiplier: "Yellow Multiplier",
    blackMultiplier: "Black Multiplier",
    defaultRoundsTitle: "Default Rounds",
    numberOfRoundsLabel: "Number of Rounds",
    saveChanges: "Save Changes",
    restoreDefaults: "Restore Defaults",

    // Results Screen
    finalResults: "Final Results",
    rankings: "Rankings",
    resultsWinner: "Winner",
    totalPoints: "Total Points",
    roundDetails: "Round Details",
    roundNumber: "Round",
    multiplier: "Multiplier",
    regularWinType: "Regular Win",
    okeyWinType: "Okey Win",
    playerScores: "Player Scores",
    noRoundsPlayed: "No Rounds Played",
    resultsNoRoundsSubtitle: "Start a game to see results.",
    startNewGame: "Start New Game",

    // Win type explanations
    regularWinExplanation: "Winner gets -{points} points",
    okeyWinExplanation: "Winner gets -{points} + 2× total points",

    // Player placeholders
    player1: "Player 1",
    player2: "Player 2",
    player3: "Player 3",
    player4: "Player 4",
    player5: "Player 5",
    player6: "Player 6",
  },
};

export type TranslationKey = keyof typeof translations.ku;

// Language context
let currentLanguage: Language = "ku";

export const setLanguage = (lang: Language) => {
  currentLanguage = lang;
};

export const getLanguage = (): Language => {
  return currentLanguage;
};

export const t = (
  key: TranslationKey,
  params?: Record<string, string | number>
): string => {
  const text =
    translations[currentLanguage][key] || translations.ku[key] || key;

  if (params) {
    let result = text;
    Object.entries(params).forEach(([param, value]) => {
      result = result.replace(`{${param}}`, String(value));
    });
    return result;
  }

  return text;
};
