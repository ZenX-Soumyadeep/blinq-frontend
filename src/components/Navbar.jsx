import { Search, Bell, User } from 'lucide-react';

function Navbar({ currentUser, onLogout, onLoginClick }) {
  return (
    <nav className="flex justify-between items-center px-8 py-5 bg-gradient-to-b from-black/80 to-transparent absolute w-full z-30">
      <div className="text-3xl font-black text-[#ff3b3b] tracking-tighter">BlinQ</div>
      
      <div className="hidden md:flex gap-8 font-semibold text-sm text-gray-300">
        <a href="#" className="hover:text-white transition-colors">Home</a>
        <a href="#" className="hover:text-white transition-colors">Movies</a>
        <a href="#" className="hover:text-white transition-colors">Discussions</a>
      </div>

      <div className="flex items-center gap-6 text-gray-300">
        <Search size={20} className="cursor-pointer hover:text-white transition-colors" />
        <Bell size={20} className="cursor-pointer hover:text-white transition-colors" />
        
        {/* Dynamic Auth Section */}
        {currentUser ? (
          <div className="flex items-center gap-4 border-l border-white/20 pl-6 ml-2">
            <div className="flex flex-col items-end">
              <span className="text-sm font-bold text-white leading-tight">{currentUser.username}</span>
              {currentUser.role === 'ROLE_ADMIN' && (
                <span className="text-[10px] text-[#ff3b3b] font-bold uppercase tracking-wider">Admin</span>
              )}
            </div>
            <button 
              onClick={onLogout} 
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4 border-l border-white/20 pl-6 ml-2">
            <button 
              onClick={onLoginClick}
              className="bg-[#ff3b3b] hover:bg-red-600 text-white px-5 py-2 rounded-full text-sm font-semibold transition-colors"
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;