import { Search, Bell, User } from 'lucide-react';

function Navbar() {
    return (
<nav className="flex items-center justify-between px-8 py-5 border-b border-white/10">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-[#ff3b3b] text-white font-bold w-8 h-8 flex items-center justify-center rounded">
            B
          </div>
          <span className="text-2xl font-bold tracking-tight">BlinQ</span>
        </div>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <a href="#" className="text-white hover:text-[#ff3b3b] transition-colors border-b-2 border-[#ff3b3b] pb-1">Home</a>
          <a href="#" className="hover:text-white transition-colors pb-1">Movies</a>
          <a href="#" className="hover:text-white transition-colors pb-1">Shows</a>
          <a href="#" className="hover:text-white transition-colors pb-1">Community</a>
          <a href="#" className="hover:text-white transition-colors pb-1">Watchlist</a>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-6 text-gray-300">
          <button className="hover:text-white transition-colors"><Search size={20} /></button>
          <button className="hover:text-white transition-colors"><Bell size={20} /></button>
          <button className="hover:text-white transition-colors">
            <div className="bg-gray-800 p-1.5 rounded-full border border-gray-600 hover:border-gray-400 transition-colors">
              <User size={18} />
            </div>
          </button>
        </div>
      </nav>
    );
}

export default Navbar;