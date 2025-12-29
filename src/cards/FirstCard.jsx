import { motion } from "framer-motion";
import {
  ChessBlitzIcon,
  ChessBulletIcon,
  ChessDailyIcon,
  ChessRapidIcon,
} from "../ui/timeControlIcons";

function FirstCard({ userResults }) {
  const totalGames = userResults.wins + userResults.losses + userResults.draws;
  const { timeControl } = userResults;

  // Infinite animation for cards
  const cardAnim = {
    animate: { scale: [1, 1.05, 1] },
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
    },
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="transform scale-90 w-full max-w-md">
        <div className="bg-gradient-to-b from-stone-700 via-green-700 to-green-900 rounded-3xl shadow-2xl p-6 flex flex-col items-center justify-center">
          {/* MAIN STAT TEXT */}
          <motion.h2
            initial={{ opacity: 0, scale: 1 }}
            animate={{
              scale: [1, 1.05, 1],
              opacity: [1, 0.9, 1],
              y: [0, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
            className="text-white text-xl lg:text-3xl font-black tracking-tight text-center"
          >
            You played <span className="text-green-300">{totalGames}</span>{" "}
            games this year!
          </motion.h2>

          {/* STATS GRID */}
          <div className="grid grid-cols-2 gap-6 mt-6 justify-items-center">
            {/* Blitz */}
            <motion.div
              {...cardAnim}
              whileHover={{
                scale: 1.12,
                boxShadow: "0 12px 30px rgba(0,0,0,0.3)",
              }}
              className="w-36 h-36 bg-yellow-700 rounded-2xl shadow-lg flex flex-col items-center justify-center cursor-pointer"
            >
              <ChessBlitzIcon className="w-14 h-14 text-[#facc15] mb-2 drop-shadow-lg" />
              <p className="text-white text-4xl font-extrabold">
                {timeControl.blitz}
              </p>
              <p className="text-yellow-200 text-xs font-bold uppercase tracking-wider mt-1">
                Blitz
              </p>
            </motion.div>

            {/* Rapid */}
            <motion.div
              {...cardAnim}
              whileHover={{
                scale: 1.12,
                boxShadow: "0 12px 30px rgba(0,0,0,0.3)",
              }}
              className="w-36 h-36 bg-green-700 rounded-2xl shadow-lg flex flex-col items-center justify-center cursor-pointer"
            >
              <ChessRapidIcon className="w-14 h-14 text-[#22c55e] mb-2 drop-shadow-lg" />
              <p className="text-white text-4xl font-extrabold">
                {timeControl.rapid}
              </p>
              <p className="text-green-200 text-xs font-bold uppercase tracking-wider mt-1">
                Rapid
              </p>
            </motion.div>

            {/* Bullet */}
            <motion.div
              {...cardAnim}
              whileHover={{
                scale: 1.12,
                boxShadow: "0 12px 30px rgba(0,0,0,0.3)",
              }}
              className="w-36 h-36 bg-orange-700 rounded-2xl shadow-lg flex flex-col items-center justify-center cursor-pointer"
            >
              <ChessBulletIcon className="w-14 h-14 text-[#fbbf24] mb-2 drop-shadow-lg" />
              <p className="text-white text-4xl font-extrabold">
                {timeControl.bullet}
              </p>
              <p className="text-orange-200 text-xs font-bold uppercase tracking-wider mt-1">
                Bullet
              </p>
            </motion.div>

            {/* Daily */}
            <motion.div
              {...cardAnim}
              whileHover={{
                scale: 1.12,
                boxShadow: "0 12px 30px rgba(0,0,0,0.3)",
              }}
              className="w-36 h-36 bg-blue-700 rounded-2xl shadow-lg flex flex-col items-center justify-center cursor-pointer"
            >
              <ChessDailyIcon className="w-14 h-14 text-[#efdb01] mb-2 drop-shadow-lg" />
              <p className="text-white text-4xl font-extrabold">
                {timeControl.daily}
              </p>
              <p className="text-blue-200 text-xs font-bold uppercase tracking-wider mt-1">
                Daily
              </p>
            </motion.div>
          </div>

          {/* Fun comment */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: [8, -2, 0] }}
            transition={{ duration: 0.35, delay: 1.1 }}
            className="text-yellow-200 text-center text-lg font-semibold px-4 mt-4"
          >
            {(() => {
              const { blitz, bullet, rapid, daily } = timeControl;
              const timeCounts = { blitz, bullet, rapid, daily };
              const maxTimeControl = Object.entries(timeCounts).reduce(
                (max, [key, count]) =>
                  count > max.count ? { key, count } : max,
                { key: null, count: 0 }
              ).key;

              switch (maxTimeControl) {
                case "blitz":
                  return "You move at lightning speed,yet somehow your brain is still catching up... typical blitz player.";
                case "bullet":
                  return "Clicks everywhere, thought nowhere. A true bullet enthusiast.";
                case "rapid":
                  return "Plenty of time to think… or at least that’s what you tell yourself.";
                case "daily":
                  return "Patience is great, but let's be honest you probably forgot about half your daily games.";
                default:
                  return "A year of chess logged… impressive dedication, questionable judgment.";
              }
            })()}
          </motion.p>
        </div>
      </div>
    </div>
  );
}

export default FirstCard;