import React, { useState } from 'react';
import { Heart, ArrowRight, User, Shield, Sparkles, UserPlus, Mail, Key, Fingerprint } from 'lucide-react';
import { auth } from '../firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInAnonymously 
} from 'firebase/auth';

const Auth = ({ userRole, setUserRole, setIsLoggedIn, setUserData, setTempData, onRegister }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [regData, setRegData] = useState({ name: "", email: "", password: "", bio: "", location: "Chennai" });
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Sign In Methods
  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    if (!loginData.email || !loginData.password) {
      setErrorMsg("Please enter email and password.");
      return;
    }
    setIsLoading(true);
    setErrorMsg('');
    try {
      await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
      setIsLoggedIn(true);
    } catch (err) {
      setErrorMsg(err.message || 'Login failed.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const displayName = result.user.displayName || "Google Soul";
      const name = displayName.split(" ")[0];
      setUserData(prev => ({ ...prev, name }));
      setTempData(prev => ({ ...prev, name }));
      setIsLoggedIn(true);
    } catch (err) {
      setErrorMsg(err.message || 'Google login failed.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnonymousSignIn = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      await signInAnonymously(auth);
      setUserData(prev => ({ ...prev, name: "Anonymous Soul" }));
      setTempData(prev => ({ ...prev, name: "Anonymous Soul" }));
      setIsLoggedIn(true);
    } catch (err) {
      setErrorMsg(err.message || 'Anonymous login failed.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Sign Up Method
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!regData.name || !regData.email || !regData.password) {
      setErrorMsg("Please fill in required fields (Name, Email, Password).");
      return;
    }
    setIsLoading(true);
    setErrorMsg('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, regData.email, regData.password);
      
      onRegister({
        name: regData.name,
        email: regData.email,
        about: regData.bio || "New soul ready to help.",
        location: regData.location,
        skills: ["Community Support"],
        uid: userCredential.user.uid
      });

      setUserData(prev => ({ ...prev, name: regData.name, bio: regData.bio }));
      setTempData(prev => ({ ...prev, name: regData.name, bio: regData.bio }));
      
      // onRegister in App.jsx also sets isLoggedIn to true
    } catch (err) {
      setErrorMsg(err.message || 'Registration failed.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-6 text-slate-50 font-sans relative z-10 w-full">
      <div className="max-w-md w-full bg-slate-900/60 backdrop-blur-xl p-10 rounded-[2.5rem] border border-emerald-500/10 shadow-2xl relative overflow-hidden flex flex-col pt-12 pb-14">
        <div className="text-center mb-8">
          <div className="inline-flex bg-emerald-600 p-4 rounded-3xl mb-4 shadow-xl shadow-emerald-900/40 animate-pulse">
            <Heart className="text-white" size={40} />
          </div>
          <h1 className="text-3xl font-serif font-bold text-white tracking-tight">HeartHub-Souls</h1>
          <p className="text-emerald-500/50 text-xs mt-3 uppercase tracking-widest font-bold">
            {isRegistering ? "Soul Integration Form" : "The Empathy OS"}
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-xl mb-6 text-center select-none font-medium">
            {errorMsg}
          </div>
        )}

        {!isRegistering ? (
          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-3 block pl-1">Sign In as</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'volunteer', label: 'Volunteer', icon: <Heart size={16} /> },
                  { id: 'admin', label: 'Admin', icon: <Shield size={16} /> },
                  { id: 'people', label: 'People', icon: <User size={16} /> }
                ].map(role => (
                  <button 
                    key={role.id}
                    type="button"
                    onClick={() => {
                      setUserRole(role.id);
                      const name = role.id === 'people' ? "Mrs. Aruna" : "Michelle";
                      setUserData(prev => ({ ...prev, name }));
                      setTempData(prev => ({ ...prev, name }));
                    }}
                    className={`flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all ${userRole === role.id ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'border-emerald-500/5 text-emerald-500/30 hover:border-emerald-500/20'}`}
                  >
                    {role.icon}
                    <span className="text-[10px] font-bold">{role.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 pt-2">
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500/30 group-focus-within:text-emerald-400 transition-colors" size={18} />
                <input 
                  type="email" 
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  placeholder="Soul ID / Email" 
                  className="w-full bg-slate-950/80 border border-emerald-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm text-white outline-none focus:ring-1 ring-emerald-500 focus:border-emerald-500 transition-all placeholder:text-emerald-500/20" 
                />
              </div>
              <div className="relative group">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500/30 group-focus-within:text-emerald-400 transition-colors" size={18} />
                <input 
                  type="password" 
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  placeholder="Soul-Key / Password" 
                  className="w-full bg-slate-950/80 border border-emerald-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm text-white outline-none focus:ring-1 ring-emerald-500 focus:border-emerald-500 transition-all placeholder:text-emerald-500/20" 
                />
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-emerald-900/30 hover:bg-emerald-500 transition-all flex items-center justify-center gap-3 group active:scale-95 disabled:opacity-70 disabled:active:scale-100"
              >
                {isLoading ? "Authenticating..." : "Enter HeartHub"} 
                {!isLoading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>

            <div className="flex items-center gap-4 text-emerald-500/30 my-6">
              <div className="h-px bg-emerald-500/10 flex-1"></div>
              <span className="text-[10px] font-bold uppercase tracking-widest">Or Continue With</span>
              <div className="h-px bg-emerald-500/10 flex-1"></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button 
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 bg-slate-900/80 border border-emerald-500/10 hover:border-emerald-500/30 hover:bg-emerald-500/5 py-3 rounded-xl text-xs font-bold text-slate-300 transition-all active:scale-95 disabled:opacity-50"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 mb-px" xmlns="http://www.w3.org/2000/svg"><path className="fill-white" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path className="fill-emerald-400" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path className="fill-emerald-500" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path className="fill-white" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Google
              </button>
              <button 
                type="button"
                onClick={handleAnonymousSignIn}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 bg-slate-900/80 border border-emerald-500/10 hover:border-emerald-500/30 hover:bg-emerald-500/5 py-3 rounded-xl text-xs font-bold text-slate-300 transition-all active:scale-95 disabled:opacity-50"
              >
                <Fingerprint size={16} className="text-emerald-400"/> Guest
              </button>
            </div>

            <button 
              type="button"
              onClick={() => setIsRegistering(true)}
              className="w-full pt-4 text-[10px] font-bold text-emerald-400/50 uppercase tracking-[0.3em] hover:text-emerald-400 transition-all mt-4"
            >
              First visit? Join as Volunteer
            </button>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest pl-1 mb-1 block">Soul Name</label>
                <input 
                  required
                  value={regData.name}
                  onChange={(e) => setRegData({...regData, name: e.target.value})}
                  type="text" placeholder="Your Name" 
                  className="w-full bg-slate-950/80 border border-emerald-500/10 rounded-2xl px-5 py-3.5 text-sm text-white outline-none focus:ring-1 ring-emerald-500 focus:border-emerald-500 transition-all placeholder:text-emerald-500/20" 
                />
              </div>
              
              <div>
                <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest pl-1 mb-1 block">Soul ID (Email)</label>
                <input 
                  required
                  value={regData.email}
                  onChange={(e) => setRegData({...regData, email: e.target.value})}
                  type="email" placeholder="email@heart.hub" 
                  className="w-full bg-slate-950/80 border border-emerald-500/10 rounded-2xl px-5 py-3.5 text-sm text-white outline-none focus:ring-1 ring-emerald-500 focus:border-emerald-500 transition-all placeholder:text-emerald-500/20" 
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest pl-1 mb-1 block">Soul-Key (Password)</label>
                <input 
                  required
                  value={regData.password}
                  onChange={(e) => setRegData({...regData, password: e.target.value})}
                  type="password" placeholder="Create a password" 
                  className="w-full bg-slate-950/80 border border-emerald-500/10 rounded-2xl px-5 py-3.5 text-sm text-white outline-none focus:ring-1 ring-emerald-500 focus:border-emerald-500 transition-all placeholder:text-emerald-500/20" 
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest pl-1 mb-1 block">Your Mission (Bio)</label>
                <textarea 
                  value={regData.bio}
                  onChange={(e) => setRegData({...regData, bio: e.target.value})}
                  placeholder="Tell us how you'd like to help..." 
                  className="w-full bg-slate-950/80 border border-emerald-500/10 rounded-2xl px-5 py-3 text-sm text-white outline-none focus:ring-1 ring-emerald-500 h-20 resize-none focus:border-emerald-500 transition-all placeholder:text-emerald-500/20"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 text-white py-4 mt-2 rounded-[1rem] font-bold shadow-xl shadow-emerald-900/30 hover:bg-emerald-500 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-70 disabled:active:scale-100"
            >
              {isLoading ? "Integrating..." : "Join the Soul Network"} 
              {!isLoading && <UserPlus size={18} />}
            </button>

            <button 
              type="button"
              onClick={() => setIsRegistering(false)}
              className="w-full pt-4 text-[10px] font-bold text-emerald-400/50 uppercase tracking-[0.3em] hover:text-white transition-all"
            >
              Back to Sign In
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Auth;
