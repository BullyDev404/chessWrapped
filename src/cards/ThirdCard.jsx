/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

function ThirdCard({ favoriteOpenings }) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const listVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    hover: {
      scale: 1.05,
      backgroundColor: "#2ecc71", // bright green on hover
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      className="mx-auto mt-14 lg:mt-0
                 w-[95%] sm:w-4/5 md:w-3/4 lg:w-150
                 bg-green-700 p-6 rounded-xl text-white shadow-lg
                 text-xs sm:text-sm lg:text-base pb-10"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <h1 className="text-center text-2xl font-black mb-8 lg:mb-2 text-gray-100">
        Your Favorite Openings
      </h1>

      {/* WHITE OPENINGS */}
      <div className="mb-6">
        <h3 className="font-bold mb-2 flex items-center gap-2 text-sm sm:text-base lg:text-lg text-gray-100">
          <span className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-white"></span>
          White Openings
        </h3>

        <motion.ul
          className="space-y-1 lg:space-y-2"
          variants={listVariants}
          initial="hidden"
          animate="visible"
        >
          {favoriteOpenings.white.map((opening, index) => (
            <motion.li
              key={index}
              className="flex justify-between 
                         bg-gray-500/50 
                         px-3 py-1 lg:px-4 lg:py-2 
                         rounded-xl wrap-break-word cursor-pointer"
              variants={itemVariants}
              // whileHover="hover"
            >
              <span className="whitespace-normal">{opening.opening}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      {/* DIVIDER */}
      <div className="h-px bg-gray-500 mb-6"></div>

      {/* BLACK OPENINGS */}
      <div>
        <h3 className="font-bold mb-2 flex items-center gap-2 text-sm sm:text-base lg:text-lg text-gray-100">
          <span className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-black border border-gray-400"></span>
          Black Openings
        </h3>

        <motion.ul
          className="space-y-1 lg:space-y-2"
          variants={listVariants}
          initial="hidden"
          animate="visible"
        >
          {favoriteOpenings.black.map((opening, index) => (
            <motion.li
              key={index}
              className="flex justify-between 
                         bg-gray-600/70 
                         px-3 py-1 lg:px-4 lg:py-2 
                         rounded-md wrap-break-word cursor-pointer"
              variants={itemVariants}
              // whileHover="hover"
            >
              <span className="whitespace-normal">{opening.opening}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  );
}

export default ThirdCard;
