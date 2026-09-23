import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MovieCarousel from './components/MovieCarousel';
import CommunityPreview from './components/CommunityPreview';

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans overflow-x-hidden">
      <Navbar />
      <Hero />
      <MovieCarousel />
      <CommunityPreview />
    </div>
  );
}

export default App;