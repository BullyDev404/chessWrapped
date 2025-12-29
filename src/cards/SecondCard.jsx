import { motion } from "framer-motion";

function SecondCard({ userResults }) {
  const totalGames = userResults.wins + userResults.losses + userResults.draws;
  const winRate =
    totalGames > 0 ? Math.round((userResults.wins / totalGames) * 100) : 0;
  const hasMoreLosses = userResults.losses > userResults.wins;
  const headerText = hasMoreLosses
    ? "Your Year of Struggles"
    : "Your Year of Triumphs!";
  const bgGradient = hasMoreLosses
    ? "bg-gradient-to-b from-red-700 via-red-800 to-red-900"
    : "bg-gradient-to-b from-green-600 to-green-800 shadow-lg shadow-white/10";

  /* ===== Variants ===== */
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 70, damping: 18, mass: 0.9 },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1], // Pulse effect
      transition: { repeat: Infinity, duration: 1.2, ease: "easeInOut" },
    },
  };

  const floatVariants = {
    animate: {
      y: [0, -5, 0], // Slight up and down floating
      transition: { repeat: Infinity, duration: 2.5, ease: "easeInOut" },
    },
  };

  return (
    <div className="flex justify-center items-center w-full py-4">
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="show"
        className={`w-full max-w-md aspect-square ${bgGradient} rounded-3xl shadow-l p-6 flex flex-col items-center justify-between pt-10`}
      >
        {/* Header */}
        <motion.h2
          className="text-stone-100 text-4xl font-black tracking-tighter text-center mb-4"
          variants={pulseVariants}
          animate="animate"
        >
          {headerText}
        </motion.h2>

        {/* Win rate */}
        <motion.div className="flex-1 flex flex-col items-center justify-center text-white text-center">
          {totalGames === 0 ? (
            <p className="text-xl opacity-80">No games played</p>
          ) : (
            <>
              <motion.p
                className="text-6xl font-extrabold tracking-tight mb-2"
                variants={pulseVariants}
                animate="animate"
              >
                {winRate}%
              </motion.p>
              <motion.p
                className="text-sm uppercase tracking-widest opacity-80"
                variants={pulseVariants}
                animate="animate"
              >
                Win Rate
              </motion.p>
            </>
          )}
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4 w-full">
          {/* Wins */}
          <motion.div
            className="flex flex-col items-center justify-center bg-green-600 rounded-2xl p-4"
            style={{ boxShadow: "0 20px 40px rgba(34,197,94,0.45)" }}
            variants={floatVariants}
            animate="animate"
          >
            <span className="text-4xl mb-2">🏆</span>
            <p className="text-white text-3xl font-extrabold">
              {userResults.wins}
            </p>
            <p className="text-white text-xs font-semibold uppercase tracking-wide mt-1">
              Wins
            </p>
          </motion.div>

          {/* Draws */}
          <motion.div
            className="flex flex-col items-center justify-center bg-yellow-600 rounded-2xl p-4"
            style={{ boxShadow: "0 20px 40px rgba(234,179,8,0.45)" }}
            variants={floatVariants}
            animate="animate"
          >
            <span className="text-4xl mb-2">🤝</span>
            <p className="text-white text-3xl font-extrabold">
              {userResults.draws}
            </p>
            <p className="text-white text-xs font-semibold uppercase tracking-wide mt-1">
              Draws
            </p>
          </motion.div>

          {/* Losses */}
          <motion.div
            className="flex flex-col items-center justify-center bg-red-600 rounded-2xl p-4"
            style={{ boxShadow: "0 20px 40px rgba(220,38,38,0.45)" }}
            variants={floatVariants}
            animate="animate"
          >
            <span className="text-4xl mb-2">💀</span>
            <p className="text-white text-3xl font-extrabold">
              {userResults.losses}
            </p>
            <p className="text-white text-xs font-semibold uppercase tracking-wide mt-1">
              Losses
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default SecondCard;
