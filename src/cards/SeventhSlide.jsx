/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

function SeventhSlide({ stats }) {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Safe defaults
  const wins = stats?.wins || 0;
  const losses = stats?.losses || 0;
  const draws = stats?.draws || 0;
  const totalGames = wins + losses + draws;

  const topOpening =
    stats?.favoriteOpenings?.white?.[0]?.opening ||
    stats?.favoriteOpenings?.black?.[0]?.opening ||
    "Unknown";

  const mostPlayedOpponentName = stats?.mostPlayedOpponent?.username || "None";
  const mostPlayedOpponentGames = stats?.mostPlayedOpponent?.games || 0;

  const timeControls = stats?.timeControl || {
    bullet: 0,
    blitz: 0,
    rapid: 0,
    daily: 0,
  };

  return (
    <motion.div
      className="mx-auto mt-16 w-[95%] sm:w-4/5 md:w-3/4 lg:w-150
                 bg-linear-to-br from-[#2e9d2a] via-[#265327] to-[#1d3557]
                 p-6 rounded-2xl text-white shadow-2xl overflow-hidden"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.h2
        className="text-center text-2xl sm:text-3xl font-bold mb-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.7 } }}
      >
        Your Chess Snapshot ♟️
      </motion.h2>

      {/* Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center text-sm sm:text-base">
        <div className="bg-[#3aafa9]/30 p-3 rounded-lg">
          <p className="uppercase tracking-wide">Total Games</p>
          <h3 className="mt-1 font-semibold">{totalGames}</h3>
        </div>

        <div className="bg-[#3aafa9]/30 p-3 rounded-lg">
          <p className="uppercase tracking-wide">Wins / Losses / Draws</p>
          <h3 className="mt-1 font-semibold">
            🟢 {wins} / 🔴 {losses} / 🟡 {draws}
          </h3>
        </div>

        <div className="bg-[#3aafa9]/30 p-3 rounded-lg">
          <p className="uppercase tracking-wide">Favorite Opening</p>
          <h3 className="mt-1 font-semibold">{topOpening}</h3>
        </div>

        <div className="bg-[#3aafa9]/30 p-3 rounded-lg">
          <p className="uppercase tracking-wide">Most Played Opponent</p>
          <h3 className="mt-1 font-semibold">
            {mostPlayedOpponentName}{" "}
            {mostPlayedOpponentGames > 0 ? `(${mostPlayedOpponentGames})` : ""}
          </h3>
        </div>

        <div className="bg-[#3aafa9]/30 p-3 rounded-lg col-span-1 sm:col-span-2">
          <p className="uppercase tracking-wide">Time Controls Played</p>
          <h3 className="mt-1 font-semibold">
            Bullet: {timeControls.bullet} | Blitz: {timeControls.blitz} | Rapid:{" "}
            {timeControls.rapid} | Daily: {timeControls.daily}
          </h3>
        </div>
      </div>

      {/* Footer */}
      <motion.p
        className="mt-8 text-center italic text-white/90 text-sm sm:text-base"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 1.2 } }}
      >
        See you next year ♟️
      </motion.p>
    </motion.div>
  );
}

export default SeventhSlide;
