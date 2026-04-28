import React from 'react';
import { 
  User, Camera, MapPin, Award, Edit3, Save, Trophy, 
  CheckCircle2, Stethoscope, Phone, AlertCircle, Sprout, UserPlus 
} from 'lucide-react';

const Identity = ({ 
  userData, 
  userRole, 
  isEditing, 
  setIsEditing, 
  tempData, 
  setTempData, 
  saveProfileChanges, 
  badgeCriteria, 
  fileInputRef, 
  handleImageUpload,
  setActiveTab
}) => {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="bg-slate-900 p-12 rounded-[4rem] border border-emerald-500/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/[0.03] rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="relative flex flex-col md:flex-row items-center gap-16">
          <div className="relative">
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
            <div onClick={() => isEditing && fileInputRef.current?.click()} className={`w-52 h-52 rounded-full bg-slate-950 border-8 border-slate-900 shadow-2xl overflow-hidden flex items-center justify-center relative ${isEditing ? 'cursor-pointer ring-4 ring-emerald-500/30 scale-105 transition-all' : ''} transition-all duration-500`}>
              {(isEditing ? tempData.profilePic : userData.profilePic) ? (
                <img src={isEditing ? tempData.profilePic : userData.profilePic} className="w-full h-full object-cover" alt="Pfp" />
              ) : (
                <User size={80} className="text-emerald-900" strokeWidth={1}/>
              )}
              {isEditing && <div className="absolute inset-0 bg-emerald-950/40 flex items-center justify-center text-white backdrop-blur-sm"><Camera size={40} /></div>}
            </div>
          </div>
          <div className="text-center md:text-left flex-1 space-y-6">
            {isEditing ? (
              <div className="space-y-8 w-full max-w-4xl pb-4">
                {/* Personal Info Box */}
                <div className="bg-slate-950/50 p-6 rounded-3xl border border-emerald-500/10">
                  <h4 className="text-emerald-400 font-bold border-b border-emerald-500/20 pb-2 mb-4 uppercase tracking-widest text-xs">Personal Info</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    <div className="lg:col-span-3">
                      <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest pl-1 mb-2 block">Full Name (as per certificates)</label>
                      <input type="text" value={tempData.name} onChange={(e) => setTempData({ ...tempData, name: e.target.value })} className="bg-slate-950 px-5 py-3.5 rounded-2xl w-full border border-emerald-500/20 shadow-inner outline-none text-white focus:ring-1 ring-emerald-500 transition-all text-sm font-semibold" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest pl-1 mb-2 block">Date of Birth</label>
                      <input type="date" value={tempData.dob || ''} onChange={(e) => setTempData({ ...tempData, dob: e.target.value })} className="bg-slate-950 px-5 py-3.5 rounded-2xl w-full border border-emerald-500/20 outline-none text-white focus:ring-1 ring-emerald-500 transition-all text-sm" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest pl-1 mb-2 block">Gender</label>
                      <select value={tempData.gender || ''} onChange={(e) => setTempData({ ...tempData, gender: e.target.value })} className="bg-slate-950 px-5 py-3.5 rounded-2xl w-full border border-emerald-500/20 outline-none text-emerald-50 focus:ring-1 ring-emerald-500 transition-all text-sm">
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest pl-1 mb-2 block">Social Category</label>
                      <select value={tempData.socialCategory || ''} onChange={(e) => setTempData({ ...tempData, socialCategory: e.target.value })} className="bg-slate-950 px-5 py-3.5 rounded-2xl w-full border border-emerald-500/20 outline-none text-white focus:ring-1 ring-emerald-500 transition-all text-sm">
                        <option value="">Select</option>
                        <option value="General">General</option>
                        <option value="OBC">OBC</option>
                        <option value="SC">SC</option>
                        <option value="ST">ST</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Academic & NSS Info Box */}
                <div className="bg-slate-950/50 p-6 rounded-3xl border border-emerald-500/10">
                  <h4 className="text-emerald-400 font-bold border-b border-emerald-500/20 pb-2 mb-4 uppercase tracking-widest text-xs">Academic Info & NSS Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest pl-1 mb-2 block">Volunteer Unique ID (Generated)</label>
                      <input type="text" value={tempData.uniqueId || ''} onChange={(e) => setTempData({ ...tempData, uniqueId: e.target.value })} className="bg-slate-950 px-5 py-3.5 rounded-2xl w-full border border-emerald-500/20 outline-none text-white focus:ring-1 ring-emerald-500 transition-all text-sm" placeholder="e.g. NSS-204" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest pl-1 mb-2 block">Enrollment Date (Joined NSS)</label>
                      <input type="date" value={tempData.enrollmentDate || ''} onChange={(e) => setTempData({ ...tempData, enrollmentDate: e.target.value })} className="bg-slate-950 px-5 py-3.5 rounded-2xl w-full border border-emerald-500/20 outline-none text-white focus:ring-1 ring-emerald-500 transition-all text-sm" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest pl-1 mb-2 block">Roll Number</label>
                      <input type="text" value={tempData.rollNumber || ''} onChange={(e) => setTempData({ ...tempData, rollNumber: e.target.value })} className="bg-slate-950 px-5 py-3.5 rounded-2xl w-full border border-emerald-500/20 outline-none text-white focus:ring-1 ring-emerald-500 transition-all text-sm" placeholder="Enter Registration/Roll No." />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest pl-1 mb-2 block">Department</label>
                      <input type="text" value={tempData.department || ''} onChange={(e) => setTempData({ ...tempData, department: e.target.value })} className="bg-slate-950 px-5 py-3.5 rounded-2xl w-full border border-emerald-500/20 outline-none text-white focus:ring-1 ring-emerald-500 transition-all text-sm" placeholder="e.g. Computer Science Engineering" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest pl-1 mb-2 block">Year of Joining College</label>
                      <input type="text" value={tempData.yearOfJoining || ''} onChange={(e) => setTempData({ ...tempData, yearOfJoining: e.target.value })} className="bg-slate-950 px-5 py-3.5 rounded-2xl w-full border border-emerald-500/20 outline-none text-white focus:ring-1 ring-emerald-500 transition-all text-sm" placeholder="e.g. 2023" />
                    </div>
                  </div>
                </div>

                {/* Contact Details & Health */}
                <div className="bg-slate-950/50 p-6 rounded-3xl border border-emerald-500/10">
                  <h4 className="text-emerald-400 font-bold border-b border-emerald-500/20 pb-2 mb-4 uppercase tracking-widest text-xs">Contact Details & Health</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    <div className="lg:col-span-2">
                      <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest pl-1 mb-2 block">Official College Email ID</label>
                      <input type="email" value={tempData.email || ''} onChange={(e) => setTempData({ ...tempData, email: e.target.value })} className="bg-slate-950 px-5 py-3.5 rounded-2xl w-full border border-emerald-500/20 outline-none text-white focus:ring-1 ring-emerald-500 transition-all text-sm" placeholder="student@college.edu" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest pl-1 mb-2 block">Phone Number</label>
                      <input type="tel" value={tempData.phone || ''} onChange={(e) => setTempData({ ...tempData, phone: e.target.value })} className="bg-slate-950 px-5 py-3.5 rounded-2xl w-full border border-emerald-500/20 outline-none text-white focus:ring-1 ring-emerald-500 transition-all text-sm" placeholder="+91..." />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest pl-1 mb-2 block">Blood Group</label>
                      <select value={tempData.bloodGroup || ''} onChange={(e) => setTempData({ ...tempData, bloodGroup: e.target.value })} className="bg-slate-950 px-5 py-3.5 rounded-2xl w-full border border-emerald-500/20 outline-none text-emerald-50 focus:ring-1 ring-emerald-500 transition-all text-sm">
                        <option value="">Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                      </select>
                    </div>
                    <div className="lg:col-span-2">
                       <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest pl-1 mb-2 block">Emergency Details / Location</label>
                       <input type="text" value={tempData.emergencyContact || ''} onChange={(e) => setTempData({ ...tempData, emergencyContact: e.target.value })} className="bg-slate-950 px-5 py-3.5 rounded-2xl w-full border border-emerald-500/20 outline-none text-white focus:ring-1 ring-emerald-500 transition-all text-sm" placeholder="Emergency contact & Location" />
                    </div>
                  </div>
                </div>
                
                {/* Additional */}
                <div>
                   <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest pl-1 mb-2 block">Volunteer Mission / Bio</label>
                   <textarea value={tempData.bio || ''} onChange={(e) => setTempData({ ...tempData, bio: e.target.value })} className="text-emerald-100/80 text-sm bg-slate-950 px-6 py-4 rounded-3xl w-full h-24 border border-emerald-500/20 shadow-inner outline-none resize-none focus:ring-1 ring-emerald-500" placeholder="Why do you want to join?" />
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <h2 className="text-5xl font-serif font-bold text-white tracking-tight">{userData.name}</h2>
                  <span className="bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-xl border border-emerald-500/20 text-[10px] font-bold uppercase tracking-widest">{userRole}</span>
                </div>
                <p className="text-emerald-100/60 text-xl max-w-2xl leading-relaxed font-light">{userData.bio}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-8">
                  <span className="flex items-center gap-3 bg-emerald-500/5 px-6 py-3 rounded-2xl text-emerald-400 text-xs font-bold border border-emerald-500/10 uppercase tracking-widest shadow-lg"><MapPin size={18} /> {userData.location}</span>
                  {userRole === 'volunteer' && <span className="flex items-center gap-3 bg-emerald-500/5 px-6 py-3 rounded-2xl text-emerald-400 text-xs font-bold border border-emerald-500/10 uppercase tracking-widest shadow-lg"><Award size={18} /> {userData.impactPoints} Soul pts</span>}
                </div>
              </>
            )}
          </div>
          <div className="flex md:flex-col gap-4 self-center md:self-start mt-6 md:mt-0">
            {isEditing ? (
              <button onClick={saveProfileChanges} className="flex items-center gap-3 px-8 py-5 bg-emerald-600 text-white rounded-3xl shadow-2xl active:scale-95 transition-all font-bold tracking-widest uppercase border border-emerald-400">
                <Save size={24} /> SAVE DETAILS
              </button>
            ) : (
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => { setTempData({...userData}); setIsEditing(true); }} 
                  className="flex items-center justify-center gap-3 px-8 py-5 bg-emerald-600 text-white rounded-3xl shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] hover:bg-emerald-500 active:scale-95 transition-all font-bold uppercase tracking-wider border border-emerald-400"
                >
                  <UserPlus size={20} /> LET ME JOIN
                </button>
                <button 
                  onClick={() => { setTempData({...userData}); setIsEditing(true); }} 
                  className="flex items-center justify-center gap-2 p-4 bg-slate-950 text-emerald-500 rounded-[2rem] border border-emerald-500/20 shadow-2xl hover:bg-emerald-900 transition-all font-semibold text-sm"
                >
                  <Edit3 size={18} /> Edit Profile Base
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
         <div className="md:col-span-2 space-y-10">
            {userRole === 'volunteer' ? (
              <section className="bg-slate-900/60 p-12 rounded-[4rem] border border-emerald-500/10 shadow-2xl">
                <h3 className="font-bold text-white text-2xl flex items-center gap-4 mb-10"><Trophy size={28} className="text-emerald-400" /> CERTIHUB Ledger & Skills</h3>
                <div className="grid grid-cols-2 gap-6 mb-10">
                  {badgeCriteria.map(badge => (
                    <div key={badge.id} className={`flex flex-col items-center p-8 rounded-[2.5rem] border transition-all ${userData.unlockedBadges.includes(badge.id) ? 'bg-gradient-to-br border-emerald-500/20 ' + badge.color : 'bg-white/5 opacity-20'}`}>
                      <div className={`p-5 rounded-full bg-slate-950 mb-4 shadow-2xl ${badge.iconColor} border border-white/5`}>{badge.icon}</div>
                      <span className="text-[10px] font-bold text-emerald-100 text-center uppercase tracking-widest leading-tight">{badge.name}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-6">
                  <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest pl-1">Verified Capabilities</label>
                  <div className="flex flex-wrap gap-4">
                    {userData.skills.map((s, i) => (
                      <span key={i} className="bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 px-6 py-3 rounded-2xl text-xs font-bold flex items-center gap-3">
                         <CheckCircle2 size={16}/> {s}
                      </span>
                    ))}
                  </div>
                </div>
              </section>
            ) : (
              <section className="bg-slate-900/60 p-12 rounded-[4rem] border border-emerald-500/10 shadow-2xl space-y-10">
                 <h3 className="font-bold text-white text-2xl flex items-center gap-4"><Stethoscope size={28} className="text-emerald-400" /> Care Information</h3>
                 <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-slate-950 p-8 rounded-3xl border border-emerald-500/5 shadow-xl">
                       <p className="text-[10px] font-bold text-emerald-500/40 uppercase tracking-widest mb-4">Emergency Contact</p>
                       <p className="text-2xl font-bold text-white flex items-center gap-4"><Phone size={24} className="text-emerald-400" /> {userData.emergencyContact}</p>
                    </div>
                    <div className="bg-slate-950 p-8 rounded-3xl border border-emerald-500/5 shadow-xl">
                       <p className="text-[10px] font-bold text-emerald-500/40 uppercase tracking-widest mb-4">Health Markers</p>
                       <p className="text-2xl font-bold text-white flex items-center gap-4"><AlertCircle size={24} className="text-red-400" /> Blood: {userData.bloodGroup}</p>
                    </div>
                 </div>
                 <div className="space-y-6">
                    <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest pl-1">Primary Needs Dashboard</label>
                    <div className="flex flex-wrap gap-4">
                       {userData.primaryNeeds.map((n, i) => (
                         <div key={i} className="bg-emerald-600/10 border border-emerald-600/20 px-8 py-4 rounded-2xl text-emerald-400 font-bold text-sm tracking-wide">{n}</div>
                       ))}
                       {isEditing && <button className="border-2 border-dashed border-emerald-500/20 text-emerald-500/40 px-8 py-4 rounded-2xl text-sm font-bold hover:bg-emerald-500/5 transition-all">+ Add Care Need</button>}
                    </div>
                 </div>
              </section>
            )}
         </div>

         <div className="space-y-10">
            <div className="bg-[#042d24] p-10 rounded-[3.5rem] border border-emerald-500/20 shadow-2xl relative overflow-hidden group">
              <Sprout className="absolute -right-8 -bottom-8 text-emerald-500/10 transition-transform group-hover:scale-125 duration-1000" size={200} />
              <div className="relative z-10 space-y-8">
                <h3 className="text-2xl font-serif font-bold text-white">Impact Garden</h3>
                <div className="bg-black/20 p-8 rounded-[2rem] border border-emerald-500/10">
                  <div className="text-6xl font-bold text-emerald-400 tracking-tighter mb-2">{userRole === 'volunteer' ? "2,450" : "12"}</div>
                  <div className="text-[11px] font-bold text-emerald-400/40 uppercase tracking-widest">{userRole === 'volunteer' ? "Total Soul Pts" : "Souls Connected"}</div>
                </div>
                <button onClick={() => setActiveTab('home')} className="w-full py-5 bg-emerald-600 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-2xl active:scale-95">Visit Sanctuary</button>
              </div>
            </div>
            
            {userRole === 'people' && (
              <div className="bg-slate-900/60 p-10 rounded-[3.5rem] border border-emerald-500/10 shadow-2xl">
                 <h3 className="text-xl font-bold text-white mb-6">Signal Broadcasting</h3>
                 <div className="p-8 bg-emerald-600 text-white rounded-3xl shadow-xl shadow-emerald-900/30 space-y-4">
                    <div className="w-4 h-4 bg-white rounded-full animate-pulse shadow-[0_0_15px_white]"></div>
                    <p className="font-bold">Echo-Net Active</p>
                    <p className="text-[10px] opacity-70 leading-relaxed uppercase tracking-widest font-bold">Your voice notes are currently being monitored by nearest guardians.</p>
                 </div>
              </div>
            )}
         </div>
      </div>
    </div>
  );
};

export default Identity;
