// ==============================
// PGN MOVE COUNT (SAFE)
// ==============================
function getMoveCountFromPGN(pgn) {
  if (!pgn) return 0;

  const cleaned = pgn
    .replace(/\{[^}]*\}/g, "") // remove comments
    .replace(/\([^)]*\)/g, "") // remove variations
    .replace(/\d+\.(\.\.)?/g, "") // remove move numbers
    .replace(/\$\d+/g, "") // remove NAGs
    .trim();

  if (!cleaned) return 0;

  return cleaned.split(/\s+/).filter(Boolean).length;
}

// ==============================
// OPENING NAME
// ==============================
function getOpeningName(game) {
  if (!game.eco) return "Unknown";
  const parts = game.eco.split("/");
  return parts[parts.length - 1].replace(/-/g, " ");
}

// ==============================
// TOP OPENINGS
// ==============================
function topOpenings(openings, topN = 3) {
  return Object.entries(openings)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([opening, count]) => ({ opening, count }));
}

// ==============================
// TIME ESTIMATION (SECONDS)
// ==============================
function estimateGameDuration(game) {
  switch (game.time_class) {
    case "bullet":
      return 60;
    case "blitz":
      return 4 * 60;
    case "rapid":
      return 8 * 60;
    case "daily":
      return 24 * 60 * 60;
    default:
      return 0;
  }
}

// ==============================
// MAIN CALCULATOR
// ==============================
export function calculateResults(gamesArray, username) {
  const USER = username.toLowerCase();

  const DRAW_RESULTS = new Set([
    "agreed",
    "stalemate",
    "repetition",
    "insufficient",
    "50move",
    "timevsinsufficient",
  ]);

  const stats = {
    wins: 0,
    losses: 0,
    draws: 0,

    whiteGames: 0,
    blackGames: 0,
    totalMoves: 0,

    timeControl: {
      bullet: 0,
      blitz: 0,
      rapid: 0,
      daily: 0,
    },

    opponentCount: {},
    mostPlayedOpponent: null,

    favoriteOpenings: {
      white: [],
      black: [],
    },

    totalTimePlayed: 0,
    bestWin: null,
    worstLoss: null,
  };

  const whiteOpenings = {};
  const blackOpenings = {};

  for (const game of gamesArray) {
    if (!game.white || !game.black) continue;

    const isWhite = game.white.username?.toLowerCase() === USER;
    const isBlack = game.black.username?.toLowerCase() === USER;

    if (!isWhite && !isBlack) continue;

    const player = isWhite ? game.white : game.black;
    const opponent = isWhite ? game.black : game.white;

    const opponentUsername = opponent.username || "Unknown";
    const opponentRating = opponent.rating ?? 0;

    // COLOR COUNT
    isWhite ? stats.whiteGames++ : stats.blackGames++;

    // ======================
    // RESULT CLASSIFICATION
    // ======================
    if (player.result === "win") {
      stats.wins++;

      // BEST WIN
      if (!stats.bestWin || opponentRating > stats.bestWin.opponentRating) {
        stats.bestWin = {
          opponent: opponentUsername,
          opponentRating,
          timeClass: game.time_class,
        };
      }
    } else if (DRAW_RESULTS.has(player.result)) {
      stats.draws++;
    } else {
      stats.losses++;

      // WORST LOSS
      if (!stats.worstLoss || opponentRating < stats.worstLoss.opponentRating) {
        stats.worstLoss = {
          opponent: opponentUsername,
          opponentRating,
          timeClass: game.time_class,
        };
      }
    }

    // ======================
    // TIME CONTROL COUNT
    // ======================
    if (stats.timeControl[game.time_class] !== undefined) {
      stats.timeControl[game.time_class]++;
    }

    // ======================
    // MOVES
    // ======================
    stats.totalMoves += getMoveCountFromPGN(game.pgn);

    // ======================
    // OPPONENT COUNT
    // ======================
    stats.opponentCount[opponentUsername] =
      (stats.opponentCount[opponentUsername] || 0) + 1;

    // ======================
    // OPENINGS
    // ======================
    const openingName = getOpeningName(game);
    if (isWhite) {
      whiteOpenings[openingName] = (whiteOpenings[openingName] || 0) + 1;
    } else {
      blackOpenings[openingName] = (blackOpenings[openingName] || 0) + 1;
    }

    // ======================
    // TIME PLAYED
    // ======================
    stats.totalTimePlayed += estimateGameDuration(game);
  }

  // ======================
  // MOST PLAYED OPPONENT
  // ======================
  let maxGames = 0;
  let mostPlayedOpponent = null;

  for (const [opponent, count] of Object.entries(stats.opponentCount)) {
    if (count > maxGames) {
      maxGames = count;
      mostPlayedOpponent = opponent;
    }
  }

  if (mostPlayedOpponent) {
    stats.mostPlayedOpponent = {
      username: mostPlayedOpponent,
      games: maxGames,
    };
  }

  // ======================
  // FAVORITE OPENINGS
  // ======================
  stats.favoriteOpenings.white = topOpenings(whiteOpenings, 3);
  stats.favoriteOpenings.black = topOpenings(blackOpenings, 3);

  return stats;
}
