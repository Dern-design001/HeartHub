import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Building2, ArrowRight, X, Users, MapPin, CheckCircle, Calendar, Mail } from 'lucide-react';

const Synergy = ({ mockOrgs, joinOrganization }) => {
  const [selectedOrg, setSelectedOrg] = useState(null);

  const modalContent = selectedOrg ? (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-[#010816]/95 backdrop-blur-xl animate-in fade-in">
       <div className="max-w-2xl w-full bg-slate-900 border border-emerald-500/30 rounded-[3rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col mt-10">
          <div className="p-8 bg-emerald-600 text-white flex justify-between items-center shrink-0">
             <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center font-bold text-2xl backdrop-blur-sm shadow-inner">{selectedOrg.icon}</div>
                <div>
                  <h3 className="text-2xl font-bold">{selectedOrg.name}</h3>
                  <p className="text-xs font-bold text-emerald-100 uppercase tracking-widest">{selectedOrg.type}</p>
                </div>
             </div>
             <button onClick={() => setSelectedOrg(null)} className="hover:rotate-90 hover:bg-black/40 transition-all p-3 bg-black/20 rounded-full"><X size={24}/></button>
          </div>
          
          <div className="p-10 overflow-y-auto space-y-8">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-slate-950 p-6 rounded-3xl border border-emerald-500/10">
                  <span className="text-[10px] font-bold text-emerald-500/50 uppercase tracking-widest block mb-2 flex items-center gap-2"><MapPin size={12}/> Primary Location</span>
                  <span className="text-emerald-50 font-medium">{selectedOrg.location}</span>
               </div>
               <div className="bg-slate-950 p-6 rounded-3xl border border-emerald-500/10">
                  <span className="text-[10px] font-bold text-emerald-500/50 uppercase tracking-widest block mb-2 flex items-center gap-2"><Users size={12}/> Team Strength</span>
                  <span className="text-emerald-50 font-medium">{selectedOrg.teamStrength}</span>
               </div>
             </div>

             <div>
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-4 flex items-center gap-2"><CheckCircle size={16}/> Completed Works & Impact</h4>
                <ul className="space-y-3">
                  {selectedOrg.completedWorks?.map((work, idx) => (
                    <li key={idx} className="bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-2xl text-emerald-100/80 text-sm font-medium flex items-start gap-3">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] shrink-0"></div>
                      {work}
                    </li>
                  ))}
                </ul>
             </div>

             <div>
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Calendar size={16}/> Upcoming Initiatives / Camps</h4>
                <ul className="space-y-3">
                  {selectedOrg.upcomingTasks?.map((task, idx) => (
                    <li key={idx} className="bg-slate-950 border border-emerald-500/10 p-4 rounded-2xl text-emerald-100/80 text-sm font-medium flex items-center gap-3">
                      <Calendar size={14} className="text-emerald-500/50 shrink-0"/>
                      {task}
                    </li>
                  ))}
                </ul>
             </div>

             <div className="border-t border-emerald-500/10 pt-8 mt-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-sm text-emerald-500/80 font-medium bg-slate-950/50 px-4 py-3 rounded-xl border border-emerald-500/5">
                  <Mail size={16}/> {selectedOrg.contact}
                </div>
                <button onClick={() => { joinOrganization(selectedOrg.name); setSelectedOrg(null); }} className="px-8 py-4 w-full md:w-auto bg-emerald-600 text-white rounded-2xl font-bold tracking-wider text-xs uppercase shadow-xl hover:bg-emerald-500 active:scale-95 transition-all">Volunteer Here</button>
             </div>
          </div>
       </div>
    </div>
  ) : null;

  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-10 duration-500">
       <div>
         <h2 className="text-4xl font-serif font-bold text-white tracking-tight">Institutional Synergy</h2>
         <p className="text-emerald-500/40 text-sm mt-2 font-medium">NGOs and Student bodies working together for systemic change.</p>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {mockOrgs.map((org, i) => (
           <div key={i} className="bg-slate-900/60 p-10 rounded-[3.5rem] border border-emerald-500/10 relative overflow-hidden group hover:bg-emerald-500/5 transition-all">
             <Building2 className="absolute -right-6 -bottom-6 text-emerald-500/[0.03] transition-transform group-hover:scale-110" size={180} />
             <div className="relative z-10">
               <div className="w-20 h-20 bg-emerald-600 rounded-3xl flex items-center justify-center font-bold text-3xl text-white mb-8 shadow-2xl">{org.icon}</div>
               <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">{org.name}</h3>
               <div className="bg-emerald-500/10 w-fit px-4 py-1.5 rounded-xl border border-emerald-500/20 text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-6">{org.type}</div>
               <p className="text-emerald-100/40 text-base leading-relaxed mb-8">{org.focus}</p>
               <button onClick={() => setSelectedOrg(org)} className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-3 hover:text-emerald-300 transition-colors">View Profile <ArrowRight size={16}/></button>
             </div>
           </div>
         ))}
       </div>

       {selectedOrg && createPortal(modalContent, document.body)}
    </div>
  );
};

export default Synergy;
