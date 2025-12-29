import { motion } from "framer-motion";

const getSaltMessage = (hours) => {
  if (hours < 10)
    return "Still warming up… barely enough time to learn the rules 😅";

  if (hours < 12)
    return "Enough hours to know better... but you still be hanging pieces tho😭";

  if (hours < 13)
    return "You’ve invested real time... yet chess still humbles you daily 🤡";

  if (hours < 14)
    return "This isn’t a hobby anymore. Chess lives rent free in your head";

  return "At this point, if you still blunder... that’s a personality trait 💀";
};

function FifthCard({ totalMoves, totalTimePlayed }) {
  const hoursPlayed = Math.floor(totalTimePlayed / 3600);
  const minutesPlayed = Math.floor((totalTimePlayed % 3600) / 60);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="mx-auto mt-14 w-[95%] sm:w-4/5 md:w-3/4 lg:w-150
                 bg-gradient-to-br from-emerald-900 via-green-800 to-black
                 p-8 rounded-2xl text-white shadow-2xl
                 text-sm sm:text-base lg:text-lg overflow-hidden"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.h2
        className="text-center text-3xl font-extrabold mb-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: { duration: 0.7 },
        }}
      >
        The Grind Behind the Glory ♟️
      </motion.h2>

      {/* Stats */}
      <div className="flex flex-col sm:flex-row justify-center gap-6 mt-10">
        {/* Total Moves */}
        <motion.div
          className="flex-1 bg-white/10 backdrop-blur-md
                     rounded-xl p-6 text-center"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-sm uppercase tracking-wide text-gray-300">
            Total Moves Played
          </p>
          <p className="mt-3 text-4xl font-extrabold text-green-400">
            {totalMoves.toLocaleString()}
          </p>
        </motion.div>

        {/* Total Time */}
        <motion.div
          className="flex-1 bg-white/10 backdrop-blur-md
                     rounded-xl p-6 text-center"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-sm uppercase tracking-wide text-gray-300">
            Time Spent Playing
          </p>
          <p className="mt-3 text-4xl font-extrabold text-emerald-300">
            {hoursPlayed}h {minutesPlayed}m
          </p>
        </motion.div>
      </div>

      {/* Footer */}

      <motion.p
        className="mt-10 text-center italic text-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 1.2 } }}
      >
        {getSaltMessage(hoursPlayed)}
      </motion.p>
    </motion.div>
  );
}

export default FifthCard;
