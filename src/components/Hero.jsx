function Hero() {
  return (
<main className="px-8 py-24 text-center">
        <p className="text-gray-400 text-sm font-semibold tracking-widest uppercase mb-4">
          Your Movie Universe
        </p>
        <h1 className="text-6xl md:text-8xl font-extrabold mb-6 tracking-tight">
          Discover.<br/>Discuss.<br/>Watch.
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-lg mx-auto">
          Your home for movies, TV shows and everything in between.
        </p>
        <div className="flex justify-center gap-4">
          <button className="px-8 py-3.5 bg-[#ff3b3b] hover:bg-red-600 font-semibold rounded-lg transition-colors shadow-[0_0_15px_rgba(255,59,59,0.3)]">
            Explore Now
          </button>
          <button className="px-8 py-3.5 bg-white/5 hover:bg-white/10 font-semibold rounded-lg transition-colors border border-white/10">
            Join Community
          </button>
        </div>
      </main>
  );
}

export default Hero;