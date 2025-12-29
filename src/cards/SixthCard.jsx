/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

function SixthCard({ bestWin, worstLoss }) {

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
      className="mx-auto mt-16 w-[95%] sm:w-4/5 md:w-3/4 lg:w-150
                 bg-linear-to-br from-green-500 via-zinc-900 to-red-950
                 p-8 rounded-2xl text-white shadow-2xl overflow-hidden"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        className="text-center text-3xl font-extrabold mb-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.7 } }}
      >
        Ups & Downs on the Board
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* /////////////////////Best win///////////////////////// */}
        <motion.div
          className="bg-green-700/50 p-6 rounded-xl"
          whileHover={{ scale: 1.03 }}
        >
          <p className="uppercase text-sm text-emerald-300 tracking-wide">
            Best Win
          </p>

          {bestWin ? (
            <>
              <h3 className="mt-2 text-2xl font-bold">{bestWin.opponent}</h3>
              <p className="text-green-400">Rating: {bestWin.opponentRating}</p>
              <p className="mt-1 text-sm text-emerald-200">
                {bestWin.timeClass.charAt(0).toUpperCase() +
                  bestWin.timeClass.slice(1)}
              </p>

              <p className="mt-4 italic text-emerald-200">
                {bestWin.opponentRating}
              </p>
            </>
          ) : (
            <p className="mt-4 italic text-gray-400">No wins recorded</p>
          )}
        </motion.div>

        {/* /////////////////////Worst loss///////////////////////// */}
        <motion.div
          className="bg-red-900/40 p-6 rounded-xl"
          whileHover={{ scale: 1.03 }}
        >
          <p className="uppercase text-sm text-red-300 tracking-wide">
            Worst Loss
          </p>

          {worstLoss ? (
            <>
              <h3 className="mt-2 text-2xl font-bold">{worstLoss.opponent}</h3>
              <p className="text-gray-300">
                Rating: {worstLoss.opponentRating}
              </p>
              <p className="mt-1 text-sm text-red-200">
                {worstLoss.timeClass.charAt(0).toUpperCase() +
                  worstLoss.timeClass.slice(1)}
              </p>
              <p className="mt-4 italic text-red-200">
                {worstLoss.opponentRating}
              </p>
            </>
          ) : (
            <p className="mt-4 italic text-gray-400">No losses recorded</p>
          )}
        </motion.div>
      </div>


      {/* /////////////////*/}
      <motion.p
        className="mt-10 text-center italic text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 1.2 } }}
      >
        Good days and bad days… that’s chess💕
      </motion.p>
    </motion.div>
  );
}

export default SixthCard;
