import { useEffect, useState } from 'react';

function MovieCarousel() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      // Configure the request with your environment variable
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}` 
        }
      };

      try {
        const response = await fetch('https://api.themoviedb.org/3/trending/movie/week', options);
        const data = await response.json();
        // TMDB returns 20 movies per page, let's grab the top 10 to keep the UI clean
        setMovies(data.results.slice(0, 10)); 
      } catch (err) {
        console.error('Failed to fetch movies:', err);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <section className="px-8 py-12 mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white tracking-wide">Trending Now</h2>
        <button className="text-sm text-gray-400 hover:text-[#ff3b3b] transition-colors">See All {'>'}</button>
      </div>
      
      {/* Horizontal Scroll Container */}
      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
        {movies.map((movie) => (
          <div key={movie.id} className="min-w-[220px] shrink-0 group cursor-pointer flex flex-col gap-3">
            <div className="overflow-hidden rounded-xl relative shadow-lg border border-white/5">
              {/* TMDB base image URL + dynamic poster path */}
              <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                alt={movie.title}
                className="w-full h-[330px] object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button className="bg-[#ff3b3b] text-white px-5 py-2 rounded-lg font-semibold scale-90 group-hover:scale-100 transition-transform">
                  Details
                </button>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-100 truncate text-base">{movie.title}</h3>
              <p className="text-sm text-gray-500">{movie.release_date?.split('-')[0]}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MovieCarousel;