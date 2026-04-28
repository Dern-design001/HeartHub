import React from 'react';
import { Heart, User } from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab, userRole, handleLogout, userData }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#010816]/90 backdrop-blur-2xl border-b border-emerald-500/10 px-8 h-24 flex items-center justify-between shadow-2xl">
      <div 
        className="flex items-center gap-5 cursor-pointer group"
        onClick={() => setActiveTab('home')}
      >
        <div className="bg-emerald-600 p-3 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.4)] group-hover:scale-110 transition-transform">
          <Heart className="text-white" size={28} />
        </div>
        <span className="font-serif font-bold text-3xl text-white tracking-tighter">HeartHub-Souls</span>
      </div>
      
      <div className="hidden lg:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-500/40">
        {[
          { id: 'home', label: 'Home' },
          { id: 'volunteers', label: userRole === 'people' ? 'Guardians' : 'Dashboard' },
          { id: 'orgs', label: 'Synergy' },
          { id: 'nearby', label: 'Signals' },
          { id: 'profile', label: 'Identity' }
        ].map(item => (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id)} 
            className={`transition-all relative py-2 ${activeTab === item.id ? 'text-emerald-400' : 'hover:text-emerald-400'}`}
          >
            {item.label}
            {activeTab === item.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full animate-in fade-in zoom-in duration-300"></span>
            )}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-8">
        <button 
          onClick={handleLogout} 
          className="text-emerald-500/30 hover:text-red-400 transition-all font-bold uppercase text-[10px] tracking-widest hidden md:block"
        >
          Disconnect
        </button>
        <div 
          onClick={() => setActiveTab('profile')} 
          className={`w-12 h-12 rounded-2xl bg-slate-800 border-2 ${activeTab === 'profile' ? 'border-emerald-400' : 'border-emerald-500/20'} overflow-hidden cursor-pointer hover:scale-110 transition-all flex items-center justify-center shadow-2xl`}
        >
          {userData.profilePic ? (
            <img src={userData.profilePic} className="w-full h-full object-cover" alt="Me" />
          ) : (
            <User size={24} className="text-emerald-500" />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
