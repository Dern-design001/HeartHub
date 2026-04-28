import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Leaf, 
  Users, 
  MessageCircle, 
  BookOpen, 
  ChevronRight, 
  Sun, 
  Moon,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  Star,
  ArrowLeft,
  Mail,
  Info,
  Scale,
  HandHelping,
  Building2,
  HeartHandshake,
  Zap,
  Clock,
  MapPin,
  CheckCircle2,
  Play,
  Volume2,
  Quote,
  Music,
  Pause,
  ThumbsUp,
  Send,
  Sparkles
} from 'lucide-react';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dailyWisdom, setDailyWisdom] = useState("");
  const [playingAudio, setPlayingAudio] = useState(null);
  const [feedbackRating, setFeedbackRating] = useState(0);

  const wisdomQuotes = [
    "The heart has its reasons which reason knows nothing of.",
    "Be the light that helps others see.",
    "Self-care is how you take your power back.",
    "Every soul is a beautiful story waiting to be told.",
    "Peace begins with a smile and a deep breath."
  ];

  useEffect(() => {
    setDailyWisdom(wisdomQuotes[Math.floor(Math.random() * wisdomQuotes.length)]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const navigate = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  // --- Mock Data ---
  const testimonials = [
    { name: "Sarah J.", role: "Volunteer", text: "The matching system is so intuitive. I found a local organization that needed help with logistics within minutes.", rating: 5 },
    { name: "David K.", role: "Individual", text: "I come here every morning for the Soul Audios. The 'Morning Rain' record is my favorite way to start the day.", rating: 5 },
    { name: "Elena R.", role: "NGO Director", text: "HeartHub Souls helped us find three skilled writers for our blog. It's a game-changer for small organizations.", rating: 4 },
    { name: "Marcus T.", role: "Individual", text: "Finding a peer listener who actually understands my journey has been the most important part of my healing.", rating: 5 },
    { name: "Julian P.", role: "Community Lead", text: "The resource library is my go-to for planning our weekly wellness check-ins. Highly recommended.", rating: 5 }
  ];

  const libraryQuotes = [
    { text: "Within you, there is a stillness and a sanctuary to which you can retreat at any time.", author: "Hermann Hesse" },
    { text: "Peace is a journey of a thousand miles and it must be taken one step at a time.", author: "Lyndon B. Johnson" },
    { text: "Your calm mind is the ultimate weapon against your challenges.", author: "Bryant McGill" },
    { text: "The soul always knows what to do to heal itself. The challenge is to silence the mind.", author: "Caroline Myss" },
    { text: "Nature does not hurry, yet everything is accomplished.", author: "Lao Tzu" },
    { text: "You are the sky. Everything else—it's just the weather.", author: "Pema Chödrön" }
  ];

  const soulAudios = [
    { id: 1, title: "Gentle Morning Rain", duration: "15:00", category: "Nature", icon: <Sun size={20}/> },
    { id: 2, title: "Deep Zen Meditation", duration: "20:00", category: "Guided", icon: <Leaf size={20}/> },
    { id: 3, title: "432Hz Healing Waves", duration: "60:00", category: "Frequency", icon: <Music size={20}/> },
    { id: 4, title: "Box Breathing Guide", duration: "05:00", category: "Breathwork", icon: <Volume2 size={20}/> },
    { id: 5, title: "Forest Night Whispers", duration: "30:00", category: "Nature", icon: <Moon size={20}/> }
  ];

  const activeTasks = [
    { id: 1, title: "Peer Listener Needed", type: "Individual", urgency: "High", skill: "Emotional Support", location: "Remote", time: "2h/week" },
    { id: 2, title: "Community Food Drive", type: "Organization", urgency: "Medium", skill: "Logistics", location: "Downtown", time: "Sat Morning" },
    { id: 3, title: "Mental Health Blogger", type: "Organization", urgency: "Low", skill: "Writing", location: "Remote", time: "Flexible" },
    { id: 4, title: "Senior Companion", type: "Individual", urgency: "Medium", skill: "Socializing", location: "North Side", time: "Evenings" },
  ];

  // --- Shared Components ---

  const Navbar = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-rose-100/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <button onClick={() => navigate('home')} className="flex items-center gap-3 group">
          <div className="w-11 h-11 bg-rose-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-rose-200 group-hover:scale-105 transition-transform">
            <Heart fill="currentColor" size={24} />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-black text-xl tracking-tight text-slate-900 leading-none">HeartHub</span>
            <span className="text-rose-500 font-medium text-sm tracking-widest uppercase">Souls</span>
          </div>
        </button>

        <div className="hidden lg:flex items-center gap-10 font-bold text-sm tracking-wide uppercase">
          <button onClick={() => navigate('home')} className={`transition-all hover:text-rose-600 ${currentPage === 'home' ? 'text-rose-600' : 'text-slate-500'}`}>Home</button>
          <button onClick={() => navigate('resources')} className={`transition-all hover:text-rose-600 ${currentPage === 'resources' ? 'text-rose-600' : 'text-slate-500'}`}>Library</button>
          <button onClick={() => navigate('volunteer-match')} className={`flex items-center gap-1.5 transition-all hover:text-rose-600 ${currentPage === 'volunteer-match' ? 'text-rose-600' : 'text-slate-500'}`}>
            <Zap size={16} fill={currentPage === 'volunteer-match' ? 'currentColor' : 'none'} /> Volunteer
          </button>
          <button onClick={() => navigate('stories')} className={`transition-all hover:text-rose-600 ${currentPage === 'stories' ? 'text-rose-600' : 'text-slate-500'}`}>Soul Stories</button>
          <button onClick={() => navigate('onboarding')} className="bg-slate-900 text-white px-7 py-3 rounded-2xl hover:bg-rose-600 transition-all shadow-xl shadow-slate-200 active:scale-95">
            Join Now
          </button>
        </div>

        <button onClick={() => setIsMenuOpen(true)} className="lg:hidden p-3 text-slate-600 hover:bg-rose-50 rounded-2xl transition-colors">
          <Menu size={28} />
        </button>
      </div>

      {isMenuOpen && (
        <>
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[60] animate-in fade-in duration-300" onClick={() => setIsMenuOpen(false)} />
          <div className="fixed right-0 top-0 h-[100dvh] w-full max-w-sm bg-white z-[70] shadow-[-20px_0_50px_rgba(0,0,0,0.1)] flex flex-col p-8 animate-in slide-in-from-right duration-500 ease-out">
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-rose-100">
                  <Heart size={20} fill="currentColor" />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-xl text-slate-900 leading-none">HeartHub</span>
                  <span className="text-rose-500 font-bold text-xs uppercase tracking-tighter">Souls</span>
                </div>
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 text-slate-400 hover:text-rose-600 hover:rotate-90 transition-all"><X size={28} /></button>
            </div>

            <div className="flex flex-col gap-3">
              {[
                { id: 'home', label: 'Home', icon: null },
                { id: 'stories', label: 'Soul Stories', icon: <Sparkles size={20} /> },
                { id: 'volunteer-match', label: 'Volunteer Matching', icon: <Zap size={20} /> },
                { id: 'help', label: 'Get Help', icon: <HandHelping size={20} /> },
                { id: 'resources', label: 'Healing Library', icon: <BookOpen size={20} /> },
                { id: 'community', label: 'The Soul Circle', icon: <Users size={20} /> },
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => navigate(item.id)} 
                  className={`flex items-center gap-4 p-5 rounded-2xl font-bold text-lg transition-all ${
                    currentPage === item.id ? 'bg-rose-50 text-rose-600 translate-x-2' : 'text-slate-600 hover:bg-slate-50 hover:translate-x-1'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
            <div className="mt-auto pt-8">
              <button onClick={() => navigate('onboarding')} className="w-full py-5 bg-rose-600 text-white rounded-[2rem] font-black text-lg shadow-2xl shadow-rose-200 hover:bg-rose-700 active:scale-95 transition-all">Join Community</button>
            </div>
          </div>
        </>
      )}
    </nav>
  );

  const Footer = () => (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 mb-16">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-rose-200">
            <Heart size={20} fill="currentColor" />
          </div>
          <span className="font-black text-2xl text-slate-900">HeartHub Souls</span>
        </div>
        <div className="flex flex-wrap justify-center gap-10 text-slate-500 text-sm font-bold uppercase tracking-widest">
          <button onClick={() => navigate('privacy')} className="hover:text-rose-600 transition-colors">Privacy</button>
          <button onClick={() => navigate('terms')} className="hover:text-rose-600 transition-colors">Terms</button>
          <button onClick={() => navigate('contact')} className="hover:text-rose-600 transition-colors">Contact</button>
          <button onClick={() => navigate('about')} className="hover:text-rose-600 transition-colors">About</button>
        </div>
      </div>
      <div className="text-center text-slate-400 text-xs font-medium uppercase tracking-[0.2em]">
        <p>© {new Date().getFullYear()} HeartHub Souls Ecosystem • Built for Humanity</p>
      </div>
    </footer>
  );

  // --- Page Views ---

  const HomeView = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="relative overflow-hidden pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 bg-rose-50 text-rose-600 px-5 py-2 rounded-full text-sm font-black uppercase tracking-widest mb-8 border border-rose-100">
            <Star size={16} fill="currentColor" />
            <span>Empowering Global Wellness</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tight">
            Connect. <span className="animate-breath inline-block">Help.</span> <br/>
            <span className="animate-breath inline-block mr-2 text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-rose-400">Heal</span> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-rose-400">Together.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-500 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            We bridge the gap between people who need support and those ready to give it. Smart, fast, and deeply compassionate.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button onClick={() => navigate('volunteer-match')} className="w-full sm:w-auto bg-slate-900 text-white px-10 py-5 rounded-3xl font-black text-lg hover:bg-rose-600 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-slate-200">
              Volunteer Now <Zap size={24} fill="currentColor" />
            </button>
            <button onClick={() => navigate('help')} className="w-full sm:w-auto bg-white border-2 border-rose-100 text-rose-600 px-10 py-5 rounded-3xl font-black text-lg hover:bg-rose-50 hover:border-rose-200 transition-all">
              Request Support
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group flex flex-col items-center md:items-start text-center md:text-left">
                <div className="w-20 h-20 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-10 group-hover:rotate-12 transition-all shadow-inner">
                    <HandHelping size={40} />
                </div>
                <h3 className="text-3xl font-black mb-6 text-slate-900">For People in Need</h3>
                <p className="text-slate-500 mb-10 text-xl leading-relaxed">Post a specific task or request for emotional support. Our smart matching system will find the right volunteer for you instantly.</p>
                <button onClick={() => navigate('help')} className="text-rose-600 font-black text-lg flex items-center gap-3 group-hover:gap-5 transition-all">
                  Get Started <ChevronRight size={24} strokeWidth={3} />
                </button>
            </div>
            <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group flex flex-col items-center md:items-start text-center md:text-left">
                <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-10 group-hover:rotate-12 transition-all shadow-inner">
                    <Building2 size={40} />
                </div>
                <h3 className="text-3xl font-black mb-6 text-slate-900">For Organizations</h3>
                <p className="text-slate-500 mb-10 text-xl leading-relaxed">List your volunteer opportunities and organization needs to be instantly matched with skilled and verified souls.</p>
                <button onClick={() => navigate('help')} className="text-blue-600 font-black text-lg flex items-center gap-3 group-hover:gap-5 transition-all">
                  Partner Hub <ChevronRight size={24} strokeWidth={3} />
                </button>
            </div>
        </div>
      </main>
    </div>
  );

  const StoriesView = () => (
    <div className="max-w-7xl mx-auto px-6 py-32 animate-in fade-in duration-500">
      <div className="mb-20 text-center md:text-left">
        <button onClick={() => navigate('home')} className="inline-flex items-center gap-3 text-slate-400 hover:text-rose-600 transition-colors mb-10 font-black uppercase tracking-widest text-xs">
          <ArrowLeft size={20} /> Back to Home
        </button>
        <div className="flex flex-col md:flex-row justify-between items-end gap-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-rose-600 font-black uppercase tracking-[0.2em] mb-4 text-sm">
              <Sparkles size={20} fill="currentColor" />
              <span>Community Impact</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight">Soul Stories</h2>
            <p className="text-xl text-slate-500 font-medium">Real experiences from people using the HeartHub ecosystem to heal and grow.</p>
          </div>
          <button onClick={() => navigate('feedback')} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-rose-600 transition-all shadow-xl shadow-slate-200 flex items-center gap-2">
            Add Your Story <MessageCircle size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all flex flex-col">
            <div className="flex gap-1 mb-8">
              {[...Array(5)].map((_, idx) => (
                <Star key={idx} size={16} fill={idx < t.rating ? "#e11d48" : "none"} className={idx < t.rating ? "text-rose-600" : "text-slate-100"} />
              ))}
            </div>
            <p className="text-xl text-slate-700 leading-relaxed mb-10 italic flex-1">"{t.text}"</p>
            <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
              <div className="w-12 h-12 bg-rose-50 text-rose-400 rounded-full flex items-center justify-center">
                <Users size={24} />
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-lg">{t.name}</h4>
                <span className="text-sm text-rose-500 font-bold uppercase tracking-wider">{t.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const FeedbackView = () => (
    <div className="max-w-3xl mx-auto px-6 py-40 animate-in zoom-in duration-500">
      <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-bl-full" />
        <button onClick={() => navigate('stories')} className="flex items-center gap-2 text-slate-400 hover:text-rose-600 mb-10 transition-colors">
          <ArrowLeft size={18} /> Back to Stories
        </button>
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Sparkles size={32} />
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-4">Share Your Story</h2>
          <p className="text-slate-500 font-medium">Your journey could be the light that helps someone else find their way.</p>
        </div>
        
        <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); navigate('stories'); }}>
          <div className="flex flex-col items-center gap-4">
            <span className="text-sm font-black uppercase tracking-widest text-slate-400">Rate your journey</span>
            <div className="flex gap-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star} 
                  type="button"
                  onClick={() => setFeedbackRating(star)}
                  className={`transition-all hover:scale-110 ${feedbackRating >= star ? 'text-rose-600' : 'text-slate-200'}`}
                >
                  <Star size={40} fill={feedbackRating >= star ? "currentColor" : "none"} />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-black uppercase tracking-widest text-slate-500 px-2">Your Narrative</label>
            <textarea 
              placeholder="Tell us about your experience with HeartHub Souls..." 
              className="w-full px-8 py-6 rounded-[2rem] border-2 border-slate-100 focus:border-rose-500 outline-none transition-all font-medium min-h-[160px] bg-slate-50/50"
              required
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <input type="text" placeholder="Name or Alias" className="flex-1 px-8 py-5 rounded-2xl border-2 border-slate-100 focus:border-rose-500 outline-none transition-all font-medium" required />
            <button type="submit" className="flex-[0.6] py-5 bg-slate-900 text-white font-black text-lg rounded-2xl hover:bg-rose-600 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3">
              Post Story <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const ResourcesView = () => {
    const [libTab, setLibTab] = useState('audio');

    return (
      <div className="max-w-7xl mx-auto px-6 py-32 animate-in fade-in duration-500">
        <div className="mb-20 text-center md:text-left">
          <button onClick={() => navigate('home')} className="inline-flex items-center gap-3 text-slate-400 hover:text-rose-600 transition-colors mb-10 font-black uppercase tracking-widest text-xs">
            <ArrowLeft size={20} /> Back to Home
          </button>
          <div className="flex flex-col md:flex-row justify-between items-end gap-10">
            <div>
              <div className="flex items-center gap-3 text-rose-600 font-black uppercase tracking-[0.2em] mb-4 text-sm">
                <BookOpen size={20} fill="currentColor" />
                <span>Sanctuary of Sound & Wisdom</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight">Healing Library</h2>
              <p className="text-xl text-slate-500 font-medium max-w-2xl">A curated space to quiet the mind and nourish the heart with peaceful records and timeless wisdom.</p>
            </div>
            <div className="flex bg-slate-100 p-1.5 rounded-[1.5rem] shadow-inner">
              <button 
                onClick={() => setLibTab('audio')}
                className={`px-8 py-3 rounded-2xl text-sm font-black transition-all ${libTab === 'audio' ? 'bg-white text-rose-600 shadow-xl' : 'text-slate-500'}`}
              >
                Soul Audios
              </button>
              <button 
                onClick={() => setLibTab('quotes')}
                className={`px-8 py-3 rounded-2xl text-sm font-black transition-all ${libTab === 'quotes' ? 'bg-white text-rose-600 shadow-xl' : 'text-slate-500'}`}
              >
                Peaceful Quotes
              </button>
            </div>
          </div>
        </div>

        {libTab === 'audio' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {soulAudios.map(audio => (
              <div key={audio.id} className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    {audio.icon}
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-slate-400">{audio.category}</span>
                </div>
                <h4 className="text-2xl font-black text-slate-900 mb-2">{audio.title}</h4>
                <p className="text-slate-400 font-bold mb-8 flex items-center gap-2"><Clock size={16}/> {audio.duration}</p>
                <button 
                  onClick={() => setPlayingAudio(playingAudio === audio.id ? null : audio.id)}
                  className={`w-full py-5 rounded-2xl font-black flex items-center justify-center gap-3 transition-all ${
                    playingAudio === audio.id 
                    ? 'bg-rose-600 text-white shadow-xl shadow-rose-200' 
                    : 'bg-slate-50 text-slate-900 hover:bg-rose-50 hover:text-rose-600'
                  }`}
                >
                  {playingAudio === audio.id ? <><Pause size={20} fill="currentColor"/> Listening...</> : <><Play size={20} fill="currentColor"/> Play Record</>}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {libraryQuotes.map((q, i) => (
              <div key={i} className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:border-rose-200 transition-all">
                <Quote size={40} className="text-rose-100 mb-8 group-hover:text-rose-500 transition-colors" />
                <p className="text-2xl font-serif italic text-slate-700 leading-relaxed mb-8">"{q.text}"</p>
                <div className="w-12 h-1 bg-rose-100 rounded-full mb-4"></div>
                <span className="font-black text-sm uppercase tracking-widest text-slate-400">{q.author}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const VolunteerMatchView = () => {
    const [filter, setFilter] = useState('All');
    
    return (
        <div className="max-w-7xl mx-auto px-6 py-32 animate-in fade-in duration-500">
            <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-10">
                <div className="max-w-2xl">
                    <div className="flex items-center gap-3 text-rose-600 font-black uppercase tracking-[0.2em] mb-4 text-sm">
                        <Zap size={20} fill="currentColor" />
                        <span>Soul Connect Engine</span>
                    </div>
                    <h2 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">Urgent Needs</h2>
                    <p className="text-xl text-slate-500 font-medium">Quickly find where your skills are needed most today. Every contribution counts.</p>
                </div>
                <div className="flex bg-slate-100 p-1.5 rounded-[1.5rem] overflow-x-auto shadow-inner">
                    {['All', 'Individual', 'Organization'].map(f => (
                        <button key={f} onClick={() => setFilter(f)} className={`px-8 py-3 rounded-2xl text-sm font-black transition-all whitespace-nowrap ${filter === f ? 'bg-white text-slate-900 shadow-xl' : 'text-slate-500 hover:text-slate-800'}`}>
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {activeTasks.filter(t => filter === 'All' || t.type === filter).map(task => (
                    <div key={task.id} className="bg-white p-8 md:p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all flex flex-col md:flex-row gap-8 items-start">
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-6">
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                    task.urgency === 'High' ? 'bg-rose-100 text-rose-600' : 
                                    task.urgency === 'Medium' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
                                }`}>
                                    {task.urgency} Urgency
                                </span>
                                <span className="text-xs text-slate-400 flex items-center gap-2 font-bold uppercase tracking-wider">
                                    <CheckCircle2 size={14} className="text-slate-300" /> {task.type}
                                </span>
                            </div>
                            <h4 className="text-3xl font-black text-slate-900 mb-4">{task.title}</h4>
                            <div className="flex flex-wrap gap-5 text-sm font-bold text-slate-500">
                                <div className="flex items-center gap-2"><MapPin size={18} className="text-rose-400" /> {task.location}</div>
                                <div className="flex items-center gap-2"><Clock size={18} className="text-rose-400" /> {task.time}</div>
                                <div className="bg-slate-50 text-slate-800 px-4 py-1.5 rounded-full ring-1 ring-slate-200">#{task.skill}</div>
                            </div>
                        </div>
                        <button className="w-full md:w-auto bg-slate-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-rose-600 transition-all shadow-xl shadow-slate-100">
                            Help Now
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
  };

  const HelpView = () => (
    <div className="max-w-7xl mx-auto px-6 py-32 animate-in fade-in duration-500">
      <div className="mb-20">
        <button onClick={() => navigate('home')} className="inline-flex items-center gap-3 text-slate-400 hover:text-rose-600 transition-colors mb-10 font-black uppercase tracking-widest text-xs">
          <ArrowLeft size={20} /> Back to Home
        </button>
        <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">Help & Support Hub</h2>
        <p className="text-xl text-slate-500 font-medium">Empowerment starts with asking. Select your path below.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-12">
            <div className="flex items-center gap-5 mb-6">
                <div className="p-4 bg-rose-50 text-rose-600 rounded-2xl shadow-inner"><Users size={32}/></div>
                <h3 className="text-3xl font-black text-slate-900">Support for People</h3>
            </div>
            <div className="space-y-6">
                {[
                    { title: "Request a Volunteer", desc: "Our Soul Connect system will match you with someone nearby for chores, companionship, or errands.", icon: <Zap size={24}/> },
                    { title: "Emotional Support", desc: "Connect with certified peer listeners in a safe, judgment-free environment.", icon: <MessageCircle size={24}/> },
                    { title: "Crisis Resources", desc: "Immediate access to global helplines and emergency mental health tools.", icon: <ShieldCheck size={24}/> }
                ].map((item, i) => (
                    <div key={i} className="group p-8 bg-white rounded-[2.5rem] border border-slate-100 hover:border-rose-200 hover:shadow-2xl transition-all cursor-pointer">
                        <div className="flex gap-6 text-left items-start">
                            <div className="text-rose-500 mt-1 group-hover:scale-125 transition-transform">{item.icon}</div>
                            <div>
                                <h4 className="text-xl font-black text-slate-900 group-hover:text-rose-600 transition-colors mb-2">{item.title}</h4>
                                <p className="text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div className="space-y-12">
            <div className="flex items-center gap-5 mb-6">
                <div className="p-4 bg-slate-50 text-slate-600 rounded-2xl shadow-inner"><Building2 size={32}/></div>
                <h3 className="text-3xl font-black text-slate-900">For Organizations</h3>
            </div>
            <div className="space-y-6">
                {[
                    { title: "Recruit Volunteers", desc: "Post complex organizational tasks and get matched with highly skilled specialists.", icon: <Zap size={24}/> },
                    { title: "Wellness Partnerships", desc: "Integrate HeartHub's wellness programs directly into your team's workflow.", icon: <Heart size={24}/> },
                    { title: "Resource Sharing", desc: "Collaborate with other local NGOs on event logistics and inventory distribution.", icon: <HeartHandshake size={24}/> }
                ].map((item, i) => (
                    <div key={i} className="group p-8 bg-white rounded-[2.5rem] border border-slate-100 hover:border-slate-300 hover:shadow-2xl transition-all cursor-pointer">
                        <div className="flex gap-6 text-left items-start">
                            <div className="text-slate-500 mt-1 group-hover:scale-125 transition-transform">{item.icon}</div>
                            <div>
                                <h4 className="text-xl font-black text-slate-900 group-hover:text-slate-800 transition-colors mb-2">{item.title}</h4>
                                <p className="text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentPage) {
      case 'home': return <HomeView />;
      case 'volunteer-match': return <VolunteerMatchView />;
      case 'help': return <HelpView />;
      case 'resources': return <ResourcesView />;
      case 'feedback': return <FeedbackView />;
      case 'stories': return <StoriesView />;
      case 'onboarding': return (
        <div className="max-w-xl mx-auto px-6 py-40 animate-in zoom-in duration-500">
          <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-2xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black text-slate-900 mb-4">Welcome Soul</h2>
              <p className="text-slate-500 font-medium">Join the ecosystem of care and healing.</p>
            </div>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); navigate('home'); }}>
              <input type="text" placeholder="Display Name" className="w-full px-6 py-5 rounded-2xl border-2 border-slate-100 focus:border-rose-500 outline-none transition-all font-medium" required />
              <input type="email" placeholder="Email Address" className="w-full px-6 py-5 rounded-2xl border-2 border-slate-100 focus:border-rose-500 outline-none transition-all font-medium" required />
              <button type="submit" className="w-full py-5 bg-slate-900 text-white font-black text-lg rounded-2xl hover:bg-rose-600 transition-all shadow-xl shadow-slate-200">Start My Journey</button>
            </form>
          </div>
        </div>
      );
      default: return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-rose-50/20 text-slate-900 font-sans selection:bg-rose-200 flex flex-col relative overflow-x-hidden">
      <style>
        {`
          @keyframes breath {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.08); opacity: 0.8; }
          }
          .animate-breath {
            animation: breath 4s ease-in-out infinite;
          }
        `}
      </style>
      <Navbar />
      <div className="flex-1">
        {renderContent()}
      </div>
      <Footer />
    </div>
  );
};

export default App;
