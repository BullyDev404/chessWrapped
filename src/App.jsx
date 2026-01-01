import { useState, useRef, useEffect } from "react";
import { calculateResults } from "./Logic";
import Loader from "./ui/Loader";

import FirstCard from "./cards/FirstCard";
import SecondCard from "./cards/SecondCard";
import ThirdCard from "./cards/ThirdCard";
import FourthCard from "./cards/FourthCard";
import FifthCard from "./cards/FifthCard";
import SixthCard from "./cards/SixthCard";
import SeventhSlide from "./cards/SeventhSlide";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

function App() {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userResults, setUserResults] = useState(null);

  const swiperRef = useRef(null);

  
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("/public/sound.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.2;

    audioRef.current.play().catch(() => {
     
    });

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);


  function capitalizeFirstLetter(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  async function fetchYearlyGames(username, year = 2025) {
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    const fetches = months.map(async (month) => {
      const url = `https://api.chess.com/pub/player/${username}/games/${year}/${String(
        month
      ).padStart(2, "0")}`;

      try {
        const res = await fetch(url);
        if (!res.ok) return [];

        const data = await res.json();
        return data.games ?? [];
      } catch {
        return [];
      }
    });

    const results = await Promise.all(fetches);
    return results.flat();
  }

  async function handleClick() {
    if (!username) return;

    setIsLoading(true);

    try {
      const normalizedUsername = username.trim().toLowerCase();
      const allGames = await fetchYearlyGames(normalizedUsername, 2025);

      if (!allGames.length) {
        console.warn("No games found");
        return;
      }

      const results = calculateResults(allGames, normalizedUsername);
      setUserResults(results);
      setUsername(capitalizeFirstLetter(normalizedUsername));
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <Loader username={username} />;
  }

  if (!userResults) {
    return (
      <div className="flex flex-col items-center justify-center h-dvh overflow-hidden bg-[#121212] text-white p-6">
        <h1 className="text-[#00FF00] text-3xl lg:text-5xl font-extrabold text-center">
          Your Chess.com Wrapped♟️
        </h1>
        <p className="mt-2 text-lg text-center">
          Discover your chess journey of the year!
        </p>

        <input
          type="text"
          className="bg-[#1E1E1E] text-white p-3 rounded-full mt-6 text-center w-64 focus:outline-none focus:ring-2 focus:ring-[#00FF00]"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {username && (
          <button
            type="button"
            onClick={handleClick}
            className="bg-[#00FF00] hover:bg-[#00CC00] text-black px-6 py-3 rounded-full mt-5 font-semibold transition"
          >
            Get My Wrapped
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white p-6 flex flex-col items-center">
      <h1 className="text-[#00FF00] text-2xl lg:text-5xl font-extrabold text-center">
        {username}'s Chess.com Wrapped♟️
      </h1>
      <p className="mt-2 text-lg text-center">
        Discover your chess journey of the year!
      </p>

      <Swiper
        modules={[Autoplay]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        slidesPerView={1}
        spaceBetween={30}
        className="relative w-full max-w-4xl mt-6"
      >
        <div
          className="absolute left-0 top-0 w-1/2 h-full z-10"
          onClick={() => swiperRef.current?.slidePrev()}
        />
        <div
          className="absolute right-0 top-0 w-1/2 h-full z-10"
          onClick={() => swiperRef.current?.slideNext()}
        />

        <SwiperSlide>
          <FirstCard userResults={userResults} />
        </SwiperSlide>
        <SwiperSlide>
          <SecondCard userResults={userResults} />
        </SwiperSlide>
        <SwiperSlide>
          <ThirdCard favoriteOpenings={userResults.favoriteOpenings} />
        </SwiperSlide>
        <SwiperSlide>
          <FourthCard
            mostPlayed={userResults.mostPlayedOpponent}
            opponent={userResults.opponentCount}
          />
        </SwiperSlide>
        <SwiperSlide>
          <FifthCard
            totalMoves={userResults.totalMoves}
            totalTimePlayed={userResults.totalTimePlayed}
          />
        </SwiperSlide>
        <SwiperSlide>
          <SixthCard
            bestWin={userResults.bestWin}
            worstLoss={userResults.worstLoss}
          />
        </SwiperSlide>
        <SwiperSlide>
          <SeventhSlide stats={userResults} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default App;
