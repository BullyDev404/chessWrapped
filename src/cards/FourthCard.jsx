/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

function FourthCard({ mostPlayed, opponent }) {
  if (!opponent) return null;

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: { scale: 1.05, rotate: 1.5, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className="mx-auto mt-10 w-[95%] sm:w-4/5 md:w-3/4 lg:w-150
                 bg-linear-to-br from-green-600 via-green-500 to-yellow-150
                 p-6 rounded-2xl text-gray-900 shadow-lg
                 text-sm sm:text-base lg:text-lg pb-12 overflow-hidden"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.h1
        className="text-center text-3xl font-extrabold mb-6 text-white"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          transition: { duration: 0.8, ease: "easeOut" },
        }}
      >
        Your Chess Adventures!
      </motion.h1>

      <motion.p
        className="text-center mb-8 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.5, duration: 0.8 } }}
      >
        This year you faced{" "}
        <span className="font-bold">{Object.entries(opponent).length}</span>{" "}
        worthy opponents, but your favorite sparring partner was
        <span className="font-bold text-black uppercase"> {mostPlayed.username}</span> <br />Could it be
        that amidst all the battles, you found your chess soulmate?💕
      </motion.p>

     
      <motion.div
        className="flex justify-between items-center 
                   bg-white/90 px-5 py-4 rounded-xl cursor-pointer 
                   shadow-lg hover:shadow-xl transition-all"
        variants={listItemVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
      >
        <motion.span
          className="font-bold text-xl text-green-600"
          animate={{ x: [0, 5, -5, 0], rotate: [0, 3, -3, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          {mostPlayed.username}
        </motion.span>
        <motion.span
          className="text-gray-800 font-medium"
          animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          {mostPlayed.games} games
        </motion.span>
      </motion.div>


      <motion.p
        className="mt-6 text-center italic text-yellow-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 1.5, duration: 1 } }}
      >
        Keep crushing pawns, dodging knights, and maybe one day teach{" "}
        {mostPlayed.username} how your heart moves 😉❤️
      </motion.p>
    </motion.div>
  );
}

export default FourthCard;
