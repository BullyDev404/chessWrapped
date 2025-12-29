function Loader({ username }) {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-black gap-8 px-4">
      <p
        className="text-green-500 font-bold text-xl tracking-tight sm:text-3xl text-center"
        style={{ fontFamily: "'Orbitron', sans-serif" }}
      >
        Hey {username}! your stats are loading...
      </p>

      {/* Loader line */}
      <div className="loader w-40 h-1 rounded-full bg-white relative overflow-hidden">
        <div className="loader-inner absolute top-0 left-[-50%] w-1/2 h-full bg-green-500 animate-loader"></div>
      </div>
    </div>
  );
}

export default Loader;
