import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MovieCarousel from './components/MovieCarousel';

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans overflow-x-hidden">
      <Navbar />
      <Hero />
      <MovieCarousel />
    </div>
  );
}

export default App;