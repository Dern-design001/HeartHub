import React from 'react';
import { Search, MapPin, MessageSquare, Mail, X, Send, User, Trash2 } from 'lucide-react';

const Directory = ({ 
  userRole, 
  searchQuery, 
  setSearchQuery, 
  filteredVolunteers, 
  setSelectedVolunteer, 
  selectedVolunteer, 
  messageText, 
  setMessageText, 
  notify,
  removeVolunteer,
  sendHelpRequest
}) => {
  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-10 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h2 className="text-4xl font-serif font-bold text-white tracking-tight">
            {userRole === 'people' ? "Souls Ready to Help" : userRole === 'admin' ? "Network Administration" : "Active Souls Directory"}
          </h2>
          <p className="text-emerald-500/40 text-sm mt-2 font-medium">
            {userRole === 'people' ? "Click on a guardian to send a help message" : userRole === 'admin' ? "Manage registered volunteer souls and clear invalid accounts" : "Connect with fellow verified guardians in your network"}
          </p>
        </div>
        <div className="relative w-full md:w-[450px]">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-500/40" size={20} />
          <input 
            type="text" 
            placeholder={userRole === 'people' ? "Search for specific help (e.g. Meds)..." : "Search name or skill..."}
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            className="w-full bg-slate-900 border border-emerald-500/10 rounded-[2rem] py-5 pl-16 pr-8 text-sm outline-none focus:ring-1 ring-emerald-500 shadow-2xl" 
          />
        </div>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-2 ${userRole === 'people' ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-8`}>
        {filteredVolunteers.map(v => (
          <div 
            key={v.id} 
            onClick={() => userRole === 'people' && setSelectedVolunteer(v)}
            className={`bg-slate-900/60 p-8 rounded-[2.5rem] border border-emerald-500/10 hover:border-emerald-400/30 transition-all group relative overflow-hidden shadow-xl ${userRole === 'people' ? 'cursor-pointer' : ''}`}
          >
            <div className="flex justify-between items-start mb-8">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover:scale-105 transition-transform text-emerald-400"><User size={32}/></div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">{v.distance} away</span>
            </div>
            <h3 className="font-bold text-2xl mb-1 text-white tracking-tight">{v.name}</h3>
            <div className="flex items-center gap-2 text-emerald-500/50 text-[10px] font-bold uppercase tracking-widest mb-4"><MapPin size={12}/> {v.location}</div>
            
            {userRole === 'people' && <p className="text-sm text-emerald-100/40 italic mb-6 leading-relaxed">"{v.about}"</p>}

            <div className="flex flex-wrap gap-2 mb-8">
              {(v.skills || []).map((s, i) => (
                <span key={i} className="bg-emerald-500/5 border border-emerald-500/10 px-3 py-1.5 rounded-xl text-[9px] font-bold text-emerald-400 uppercase tracking-wider">{s}</span>
              ))}
            </div>

            <div className="pt-6 border-t border-white/5 flex justify-between items-center text-[10px] font-bold text-emerald-400/40 uppercase tracking-widest">
              <span>{userRole === 'people' ? "Connect Soul" : userRole === 'admin' ? "Manage Access" : "Soul Score"}</span>
              {userRole === 'people' ? (
                <MessageSquare size={16} className="text-emerald-500" />
              ) : userRole === 'admin' ? (
                <button 
                  onClick={(e) => { e.stopPropagation(); removeVolunteer(v.id); }} 
                  className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl flex items-center gap-2 border border-red-500/20 transition-all z-10 relative cursor-pointer"
                >
                  <Trash2 size={14}/> REMOVE
                </button>
              ) : (
                <span className="text-xl font-bold text-emerald-400">{v.points}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedVolunteer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#010816]/90 backdrop-blur-md animate-in fade-in">
           <div className="max-w-lg w-full bg-slate-900 border border-emerald-500/20 rounded-[3rem] shadow-2xl overflow-hidden">
              <div className="p-8 bg-emerald-600 text-white flex justify-between items-center">
                 <div className="flex items-center gap-4">
                    <Mail size={24}/>
                    <h3 className="text-xl font-bold">Request Help: {selectedVolunteer.name}</h3>
                 </div>
                 <button onClick={() => setSelectedVolunteer(null)} className="hover:rotate-90 transition-all"><X size={24}/></button>
              </div>
              <div className="p-10 space-y-6 text-emerald-100">
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.3em]">Guardian Soul:</label>
                    <div className="bg-slate-950 p-4 rounded-2xl border border-emerald-500/10 font-bold">{selectedVolunteer.name}</div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.3em]">Help Message:</label>
                    <textarea 
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Explain what you need... (e.g., medicine delivery, help with grocery, or just some company)" 
                      className="w-full bg-slate-950 border border-emerald-500/10 rounded-3xl p-6 text-sm text-white outline-none focus:ring-1 ring-emerald-500 h-40 resize-none leading-relaxed shadow-inner"
                    />
                 </div>
                 <button 
                  onClick={() => {
                    if(sendHelpRequest) sendHelpRequest(selectedVolunteer.id, selectedVolunteer.name, messageText);
                    setSelectedVolunteer(null);
                    setMessageText("");
                  }}
                  className="w-full bg-emerald-600 text-white py-5 rounded-[1.5rem] font-bold shadow-xl hover:bg-emerald-500 transition-all flex items-center justify-center gap-3 active:scale-95"
                 >
                    Send Request Signal <Send size={20}/>
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Directory;
