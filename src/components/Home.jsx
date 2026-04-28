import React, { useState } from 'react';
import { Activity, Wind, Brain, Mic, ShieldCheck, AlertCircle } from 'lucide-react';
import BroadcastModal from './BroadcastModal';

const Home = ({ setActiveTab, onRaiseSignal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-10 md:p-20 rounded-[3rem] border border-emerald-500/10 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-8 bg-emerald-500/10 w-fit px-4 py-1.5 rounded-full border border-emerald-500/20">
             <Activity size={14} className="text-emerald-400 animate-pulse" />
             <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">System Ready</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8 leading-[1.1]">Empathy, <br/> Encoded.</h2>
          <p className="text-emerald-100/60 leading-relaxed text-lg mb-10 max-w-lg">
            Welcome to HeartHub-Souls. Our agentic OS connects human empathy with digital intelligence to ensure no distress signal goes unheard.
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => setActiveTab('volunteers')} className="bg-emerald-600 px-10 py-5 rounded-2xl font-bold hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-900/40">Explore Souls</button>
            <button onClick={() => setIsModalOpen(true)} className="bg-red-500/10 border border-red-500/30 px-10 py-5 rounded-2xl font-bold text-red-400 hover:bg-red-500/20 transition-all flex items-center gap-3">
               <AlertCircle size={20} /> Raise Distress Signal
            </button>
          </div>
        </div>
        <Wind className="absolute top-0 right-0 text-emerald-500 opacity-5" size={400} />
      </section>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: <Brain size={24}/>, title: "Skill-Sync Brain", desc: "Agentic matching pairs your verified skills with real-time community voice signals." },
          { icon: <Mic size={24}/>, title: "Echo-Net Ingestion", desc: "Voice-driven help for the non-tech population. Transcripting slangs and dialects via Gemini." },
          { icon: <ShieldCheck size={24}/>, title: "Impact Ledger", desc: "Verified logs via digital CERTIHUB badges to document your soul impact legacy." }
        ].map((card, i) => (
          <div key={i} className="bg-slate-900/60 p-10 rounded-[3rem] border border-emerald-500/10 shadow-xl group hover:bg-emerald-500/5 transition-all">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 mb-8 group-hover:scale-110 transition-transform">{card.icon}</div>
            <h3 className="font-bold text-2xl mb-3">{card.title}</h3>
            <p className="text-sm text-emerald-100/40 leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>

      <BroadcastModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onRaiseSignal={onRaiseSignal} 
      />
    </div>
  );
};

export default Home;
