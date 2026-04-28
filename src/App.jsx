import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
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
  Sparkles,
  LogOut,
  Edit2,
  Save
} from 'lucide-react';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dailyWisdom, setDailyWisdom] = useState("");
  const [playingAudio, setPlayingAudio] = useState(null);
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [activeTasks, setActiveTasks] = useState([]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    
    const unsubTasks = onSnapshot(query(collection(db, "tasks"), orderBy("createdAt", "desc")), (snapshot) => {
      const taskList = snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
      setActiveTasks(taskList);
    });

    return () => {
      unsub();
      unsubTasks();
    };
  }, []);

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
  const [testimonials, setTestimonials] = useState([
    { name: "Sarah J.", role: "Volunteer", text: "The matching system is so intuitive. I found a local organization that needed help with logistics within minutes.", rating: 5 },
    { name: "David K.", role: "Individual", text: "I come here every morning for the Soul Audios. The 'Morning Rain' record is my favorite way to start the day.", rating: 5 },
    { name: "Elena R.", role: "NGO Director", text: "HeartHub Souls helped us find three skilled writers for our blog. It's a game-changer for small organizations.", rating: 4 },
    { name: "Marcus T.", role: "Individual", text: "Finding a peer listener who actually understands my journey has been the most important part of my healing.", rating: 5 },
    { name: "Julian P.", role: "Community Lead", text: "The resource library is my go-to for planning our weekly wellness check-ins. Highly recommended.", rating: 5 }
  ]);

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
          <button onClick={() => navigate('profile')} className="bg-slate-900 text-white px-7 py-3 rounded-2xl hover:bg-rose-600 transition-all shadow-xl shadow-slate-200 active:scale-95">
            Profile
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
              <button onClick={() => navigate('profile')} className="w-full py-5 bg-rose-600 text-white rounded-[2rem] font-black text-lg shadow-2xl shadow-rose-200 hover:bg-rose-700 active:scale-95 transition-all">My Profile</button>
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
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tight text-center">
            Connect. <span className="animate-breath inline-block">Help.</span> <br/>
            <span className="animate-breath inline-block text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-rose-400 pr-3 md:pr-4">Heal</span> 
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

  const FeedbackView = () => {
    const [storyText, setStoryText] = useState('');
    const [storyName, setStoryName] = useState('');

    const handleStorySubmit = (e) => {
      e.preventDefault();
      setTestimonials([{
        name: storyName,
        role: "Community Member",
        text: storyText,
        rating: feedbackRating || 5
      }, ...testimonials]);
      setStoryText('');
      setStoryName('');
      setFeedbackRating(0);
      navigate('stories');
    };

    return (
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
        
        <form className="space-y-8" onSubmit={handleStorySubmit}>
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
              value={storyText}
              onChange={(e) => setStoryText(e.target.value)}
              placeholder="Tell us about your experience with HeartHub Souls..." 
              className="w-full px-8 py-6 rounded-[2rem] border-2 border-slate-100 focus:border-rose-500 outline-none transition-all font-medium min-h-[160px] bg-slate-50/50"
              required
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <input type="text" value={storyName} onChange={(e) => setStoryName(e.target.value)} placeholder="Name or Alias" className="flex-1 px-8 py-5 rounded-2xl border-2 border-slate-100 focus:border-rose-500 outline-none transition-all font-medium" required />
            <button type="submit" className="flex-[0.6] py-5 bg-slate-900 text-white font-black text-lg rounded-2xl hover:bg-rose-600 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3">
              Post Story <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
    );
  };

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
                            <p className="text-slate-600 font-medium mb-6">{task.desc}</p>
                            <div className="flex flex-wrap gap-5 text-sm font-bold text-slate-500">
                                <div className="flex items-center gap-2"><MapPin size={18} className="text-rose-400" /> {task.location}</div>
                                <div className="flex items-center gap-2"><Clock size={18} className="text-rose-400" /> {task.time || 'ASAP'}</div>
                                <div className="bg-slate-50 text-slate-800 px-4 py-1.5 rounded-full ring-1 ring-slate-200">#{task.skill}</div>
                            </div>
                        </div>
                        {task.phone ? (
                          <button onClick={() => window.open(`https://wa.me/${task.phone}`, '_blank')} className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-xl shadow-[#25D366]/30 self-center md:self-auto" title="Connect on WhatsApp">
                              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                              </svg>
                          </button>
                        ) : (
                          <button className="w-full md:w-auto bg-slate-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-rose-600 transition-all shadow-xl shadow-slate-100">
                              Help Now
                          </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
  };

  const HelpView = () => {
    const [selectedHelp, setSelectedHelp] = useState(null);
    const [requestForm, setRequestForm] = useState({ title: '', desc: '', location: '', phone: '', time: '' });
    const [submitting, setSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleSubmitRequest = async (e) => {
      e.preventDefault();
      if (!user) {
        alert("Please login via Profiles first so your request is verified.");
        navigate('profile');
        return;
      }
      setSubmitting(true);
      try {
        const newTask = {
           title: requestForm.title,
           desc: requestForm.desc,
           location: requestForm.location,
           phone: requestForm.phone,
           type: selectedHelp.type || 'Individual',
           skill: selectedHelp.skill || 'General Support',
           urgency: 'High',
           time: requestForm.time || 'ASAP',
           createdAt: new Date().toISOString(),
           requesterId: user.uid
        };
        await addDoc(collection(db, "tasks"), newTask);
        setShowSuccessModal(true);
        setRequestForm({ title: '', desc: '', location: '', phone: '', time: '' });
      } catch (err) {
        console.error(err);
      }
      setSubmitting(false);
    };

    const handleCloseSuccess = () => {
      setShowSuccessModal(false);
      setSelectedHelp(null);
      navigate('volunteer-match');
    };

    if (showSuccessModal) {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white p-10 md:p-12 rounded-[3.5rem] border border-slate-100 shadow-2xl relative overflow-hidden max-w-lg w-full text-center animate-in zoom-in duration-500 delay-100">
              <div className="absolute top-0 left-0 right-0 h-32 bg-emerald-500/10 rounded-b-[3.5rem] -z-10" />
              <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner shadow-emerald-200">
                 <CheckCircle2 size={48} />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-4">Request Published</h3>
              <p className="text-slate-500 font-medium mb-10 text-lg leading-relaxed">
                 Your request has been securely added to the Urgent Needs dashboard. The community has been notified.
              </p>
              <button onClick={handleCloseSuccess} className="w-full py-5 bg-slate-900 text-white font-black text-lg rounded-2xl hover:bg-emerald-600 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3">
                 View Urgent Needs <ChevronRight size={20} />
              </button>
           </div>
        </div>
      );
    }

    if (selectedHelp) {
      return (
        <div className="max-w-2xl mx-auto px-6 py-32 animate-in fade-in duration-500">
          <button onClick={() => setSelectedHelp(null)} className="inline-flex items-center gap-3 text-slate-400 hover:text-rose-600 transition-colors mb-8 font-black uppercase tracking-widest text-xs">
            <ArrowLeft size={20} /> Back to Hub
          </button>
          <div className="bg-white p-10 md:p-12 rounded-[3.5rem] border border-slate-100 shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-bl-full" />
             <div className="flex items-center gap-4 mb-6 relative z-10">
                 <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl shadow-inner">{selectedHelp.icon}</div>
                 <h3 className="text-3xl font-black text-slate-900">{selectedHelp.title}</h3>
             </div>
             <p className="text-slate-500 font-medium mb-8 relative z-10">Please provide details so volunteers can best assist you. Your WhatsApp number will be hidden publicly.</p>
             <form onSubmit={handleSubmitRequest} className="space-y-6 relative z-10">
                <input type="text" placeholder="Short Title (e.g. Blood Donation, Cleaning Assistance, Urgent Care)" required value={requestForm.title} onChange={e => setRequestForm({...requestForm, title: e.target.value})} className="w-full px-6 py-5 rounded-2xl border-2 border-slate-100 focus:border-rose-500 outline-none transition-all font-medium" />
                <textarea placeholder="Detailed Description of what you need..." required value={requestForm.desc} onChange={e => setRequestForm({...requestForm, desc: e.target.value})} className="w-full px-6 py-5 rounded-2xl border-2 border-slate-100 focus:border-rose-500 outline-none transition-all font-medium min-h-[140px]" />
                <input type="text" placeholder="Location (e.g. New York, or Remote)" required value={requestForm.location} onChange={e => setRequestForm({...requestForm, location: e.target.value})} className="w-full px-6 py-5 rounded-2xl border-2 border-slate-100 focus:border-rose-500 outline-none transition-all font-medium" />
                <input type="text" placeholder="Preferred Time or Days (e.g. Sat Morning, or ASAP)" required value={requestForm.time} onChange={e => setRequestForm({...requestForm, time: e.target.value})} className="w-full px-6 py-5 rounded-2xl border-2 border-slate-100 focus:border-rose-500 outline-none transition-all font-medium" />
                <input type="tel" placeholder="WhatsApp Number with Country Code (e.g. 1234567890)" required value={requestForm.phone} onChange={e => setRequestForm({...requestForm, phone: e.target.value.replace(/\D/g,'')})} className="w-full px-6 py-5 rounded-2xl border-2 border-slate-100 focus:border-emerald-500 outline-none transition-all font-medium" />
                <button type="submit" disabled={submitting} className="w-full py-5 bg-rose-600 text-white font-black text-lg rounded-2xl hover:bg-rose-700 transition-all shadow-xl shadow-rose-200 disabled:opacity-50 flex justify-center items-center gap-2">
                  {submitting ? 'Authenticating...' : <><Zap size={20} fill="currentColor"/> Publish Securely</>}
                </button>
             </form>
          </div>
        </div>
      );
    }

    return (
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
                      <div key={i} onClick={() => setSelectedHelp({...item, type: 'Individual', skill: item.title})} className="group p-8 bg-white rounded-[2.5rem] border border-slate-100 hover:border-rose-200 hover:shadow-2xl transition-all cursor-pointer">
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
                      <div key={i} onClick={() => setSelectedHelp({...item, type: 'Organization', skill: item.title})} className="group p-8 bg-white rounded-[2.5rem] border border-slate-100 hover:border-slate-300 hover:shadow-2xl transition-all cursor-pointer">
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
  };

  const ProfileView = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');

    const handleAuth = async (e) => {
      e.preventDefault();
      setError('');
      try {
        if (isLogin) {
          await signInWithEmailAndPassword(auth, email, password);
        } else {
          await createUserWithEmailAndPassword(auth, email, password);
        }
      } catch (err) {
        setError(err.message.replace('Firebase:', '').trim());
      }
    };

    const handleGoogleAuth = async () => {
      setError('');
      try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
      } catch (err) {
        setError(err.message.replace('Firebase:', '').trim());
      }
    };

    if (authLoading) return <div className="py-40 text-center font-bold text-slate-400">Loading Soul...</div>;

    if (!user) {
      return (
        <div className="max-w-xl mx-auto px-6 py-40 animate-in zoom-in duration-500">
          <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-bl-full" />
            <div className="text-center mb-12 relative z-10">
              <h2 className="text-4xl font-black text-slate-900 mb-4">{isLogin ? 'Welcome Back' : 'Become a Soul'}</h2>
              <p className="text-slate-500 font-medium">Join the ecosystem of care and healing.</p>
            </div>
            {error && <p className="text-rose-600 font-bold mb-4 text-center bg-rose-50 p-3 rounded-2xl border border-rose-100">{error}</p>}
            <form className="space-y-6 relative z-10" onSubmit={handleAuth}>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email Address" className="w-full px-6 py-5 rounded-2xl border-2 border-slate-100 focus:border-rose-500 outline-none transition-all font-medium" required />
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full px-6 py-5 rounded-2xl border-2 border-slate-100 focus:border-rose-500 outline-none transition-all font-medium" required />
              <button type="submit" className="w-full py-5 bg-slate-900 text-white font-black text-lg rounded-2xl hover:bg-rose-600 transition-all shadow-xl shadow-slate-200">{isLogin ? 'Login into Soul' : 'Register New Soul'}</button>
            </form>

            <div className="relative z-10 flex items-center gap-4 my-8">
              <div className="h-px bg-slate-100 flex-1"></div>
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Or</span>
              <div className="h-px bg-slate-100 flex-1"></div>
            </div>

            <button type="button" onClick={handleGoogleAuth} className="relative z-10 w-full py-5 bg-white text-slate-900 font-black text-lg rounded-2xl border-2 border-slate-100 hover:border-rose-200 hover:bg-rose-50 transition-all shadow-sm flex items-center justify-center gap-3">
              <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg"><path className="fill-slate-900" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path className="fill-rose-500" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path className="fill-amber-500" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path className="fill-emerald-500" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Continue with Google
            </button>

            <p className="text-center mt-8 text-slate-500 font-medium cursor-pointer hover:text-rose-600 relative z-10" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login here"}
            </p>
          </div>
        </div>
      );
    }

    const [profileName, setProfileName] = useState('Soul Member');
    const [profileLocation, setProfileLocation] = useState('Earth');
    const [profileTags, setProfileTags] = useState([]);
    const [newTag, setNewTag] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [savingProfile, setSavingProfile] = useState(false);

    useEffect(() => {
      if (user) {
        getDoc(doc(db, "users", user.uid)).then(docSnap => {
          if (docSnap.exists()) {
            setProfileName(docSnap.data().name || 'Soul Member');
            setProfileLocation(docSnap.data().location || 'Earth');
            setProfileTags(docSnap.data().tags || []);
          }
        });
      }
    }, [user]);

    const handleSaveProfile = async () => {
      setSavingProfile(true);
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: profileName,
          location: profileLocation,
          tags: profileTags,
          updatedAt: new Date()
        }, { merge: true });
        setIsEditing(false);
      } catch (err) {
        console.error("Error saving profile: ", err);
      }
      setSavingProfile(false);
    };

    const handleAddTag = (e) => {
      e.preventDefault();
      if (newTag.trim() && profileTags.length < 10 && !profileTags.includes(newTag.trim().toUpperCase())) {
        setProfileTags([...profileTags, newTag.trim().toUpperCase()]);
        setNewTag('');
      }
    };

    const handleRemoveTag = (tagToRemove) => {
      setProfileTags(profileTags.filter(t => t !== tagToRemove));
    };

    return (
      <div className="max-w-5xl mx-auto px-6 py-32 animate-in zoom-in duration-500">
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <button onClick={() => navigate('home')} className="inline-flex items-center gap-3 text-slate-400 hover:text-rose-600 transition-colors mb-8 font-black uppercase tracking-widest text-xs">
              <ArrowLeft size={20} /> Back to Home
            </button>
            <h2 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">Your Soul Profile</h2>
            <p className="text-xl text-slate-500 font-medium">Manage your journey and readiness to give or receive support.</p>
          </div>
          <button onClick={() => signOut(auth)} className="px-6 py-3 bg-slate-50 hover:bg-rose-50 text-slate-600 hover:text-rose-600 rounded-2xl font-black flex items-center gap-2 transition-all border border-slate-100 shadow-sm">
            <LogOut size={18}/> Disconnect
          </button>
        </div>
        
        <div className="bg-white p-10 md:p-12 rounded-[3.5rem] border border-slate-100 shadow-xl relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-bl-full" />
          <div className="flex gap-8 items-center flex-col md:flex-row text-center md:text-left relative z-10">
            <div className="w-32 h-32 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center border-4 border-white shadow-xl overflow-hidden hover:scale-105 transition-transform cursor-pointer">
               <Heart size={48} fill="currentColor"/>
            </div>
            <div className="flex-1">
               <div className="flex items-center justify-center md:justify-start gap-4 mb-3">
                 {isEditing ? (
                   <input type="text" value={profileName} onChange={e => setProfileName(e.target.value)} className="text-4xl font-black text-slate-900 border-b-2 border-slate-200 focus:border-rose-500 outline-none w-full max-w-sm px-2 py-1 bg-slate-50 rounded-t-lg" placeholder="Your Name" />
                 ) : (
                   <h3 className="text-4xl font-black text-slate-900">{profileName}</h3>
                 )}
                 
                 {!isEditing ? (
                   <button onClick={() => setIsEditing(true)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all shadow-sm border border-transparent hover:border-rose-100">
                     <Edit2 size={20} />
                   </button>
                 ) : (
                   <button onClick={handleSaveProfile} disabled={savingProfile} className="px-5 py-2 bg-slate-900 text-white font-bold rounded-xl hover:bg-rose-600 transition-all text-sm flex items-center gap-2 disabled:opacity-50 shadow-xl shadow-slate-200">
                     {savingProfile ? 'Saving...' : <><Save size={16}/> Save</>}
                   </button>
                 )}
               </div>
               <p className="text-slate-500 font-bold text-lg mb-4 flex items-center justify-center md:justify-start gap-2">
                   <Mail size={18} className="text-slate-400"/> {user.email}
               </p>
               <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4">
                  <span className="px-5 py-2 bg-rose-50 text-rose-600 rounded-full text-xs font-black uppercase tracking-widest border border-rose-100">Verified Soul</span>
                  {isEditing ? (
                    <div className="flex items-center gap-2 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-200 focus-within:border-rose-500 transition-colors">
                      <MapPin size={14} className="text-slate-400"/> 
                      <input type="text" value={profileLocation} onChange={e => setProfileLocation(e.target.value)} className="text-xs font-black uppercase tracking-widest text-slate-700 outline-none bg-transparent w-32" placeholder="Location" />
                    </div>
                  ) : (
                    <span className="px-5 py-2 bg-slate-50 text-slate-500 rounded-full text-xs font-black uppercase tracking-widest border border-slate-100 flex items-center gap-2">
                        <MapPin size={14}/> {profileLocation}
                    </span>
                  )}
               </div>
               
               <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-2">
                  {profileTags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1 border border-indigo-100 shadow-sm animate-in zoom-in duration-200">
                      {tag}
                      {isEditing && (
                        <button onClick={() => handleRemoveTag(tag)} className="hover:text-rose-600 ml-1 transition-colors"><X size={12} strokeWidth={3}/></button>
                      )}
                    </span>
                  ))}
                  {isEditing && profileTags.length < 10 && (
                    <form onSubmit={handleAddTag} className="flex gap-2">
                       <input 
                         type="text" 
                         value={newTag} 
                         onChange={e => setNewTag(e.target.value)} 
                         placeholder="Add skill tag..." 
                         className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-400 w-32 transition-colors" 
                       />
                       <button type="submit" className="px-3 py-1.5 bg-indigo-100 text-indigo-600 rounded-lg text-xs font-black uppercase tracking-wider hover:bg-indigo-200 transition-colors">+</button>
                    </form>
                  )}
               </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-rose-50 p-10 md:p-12 rounded-[3rem] text-center md:text-left flex flex-col group hover:shadow-2xl hover:shadow-rose-100 transition-all border border-rose-100 cursor-pointer" onClick={() => navigate('help')}>
             <div className="w-16 h-16 bg-white text-rose-600 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform">
                 <HandHelping size={32} />
             </div>
             <h4 className="text-3xl font-black text-slate-900 mb-4">I Need Help</h4>
             <p className="text-slate-600 mb-10 font-medium leading-relaxed flex-1 text-lg">Reach out securely and privately. Our community is here to listen and assist with exactly what you need.</p>
             <button className="w-full py-5 bg-rose-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-rose-200 hover:bg-rose-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
                 Fill Help Request <ChevronRight size={20} strokeWidth={3} />
             </button>
          </div>
          <div className="bg-emerald-50 p-10 md:p-12 rounded-[3rem] text-center md:text-left flex flex-col group hover:shadow-2xl hover:shadow-emerald-100 transition-all border border-emerald-100 cursor-pointer" onClick={() => alert('Your availability status is now ACTIVE! You will receive matches soon.')}>
             <div className="w-16 h-16 bg-white text-emerald-600 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform">
                 <Zap size={32} />
             </div>
             <h4 className="text-3xl font-black text-slate-900 mb-4">Ready To Help</h4>
             <p className="text-slate-600 mb-10 font-medium leading-relaxed flex-1 text-lg">Activate your availability to receive immediate matching requests from people who urgently need your specific skills.</p>
             <button className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-emerald-200 hover:bg-emerald-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
                 Set Active Status <Zap size={20} fill="currentColor" />
             </button>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home': return <HomeView />;
      case 'volunteer-match': return <VolunteerMatchView />;
      case 'help': return <HelpView />;
      case 'resources': return <ResourcesView />;
      case 'feedback': return <FeedbackView />;
      case 'stories': return <StoriesView />;
      case 'profile': return <ProfileView />;
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
