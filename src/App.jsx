import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MovieCarousel from './components/MovieCarousel';
import AuthModal from './components/AuthModal';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans overflow-x-hidden relative">
      <Navbar 
        currentUser={currentUser} 
        onLogout={() => setCurrentUser(null)} 
        onLoginClick={() => setShowAuthModal(true)} 
      />
      <Hero />
      <MovieCarousel currentUser={currentUser} />

      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)} 
          onLoginSuccess={(user) => setCurrentUser(user)} 
        />
      )}
    </div>
  );
}

export default App;