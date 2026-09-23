import { useEffect, useState } from 'react';
import ReviewModal from './ReviewModal';

function MovieCarousel({ currentUser }) {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
        );
        const data = await response.json();
        
        // Safety check: only set movies if results actually exist
        if (data.results) {
          setMovies(data.results);
        } else {
          console.error('TMDB API returned an error instead of movies:', data);
          setMovies([]); // Fallback to an empty array so .map() doesn't crash
        }
      } catch (err) {
        console.error('Failed to fetch movies:', err);
        setMovies([]);
      }
    };

    fetchMovies();
  }, []);

  return (
    <section className="px-8 py-10 relative">
      <h2 className="text-2xl font-bold text-white mb-6 tracking-wide">Trending This Week</h2>
      
      <div className="flex overflow-x-auto gap-6 pb-8 custom-scrollbar snap-x">
        {movies?.map((movie) => (
          <div 
            key={movie.id} 
            onClick={() => setSelectedMovie(movie)}
            className="flex-none w-48 snap-start cursor-pointer group relative transition-transform hover:scale-105 duration-300"
          >
            <div className="rounded-xl overflow-hidden shadow-lg shadow-black/50 border border-white/5 group-hover:border-[#ff3b3b]/50 transition-colors">
              <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                alt={movie.title}
                className="w-full h-72 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white font-semibold text-sm line-clamp-2">{movie.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <ReviewModal 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
          currentUser={currentUser} 
        />
      )}
    </section>
  );
}

export default MovieCarousel;