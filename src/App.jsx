import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Star, ShieldCheck, Mic, Award } from 'lucide-react';
import { collection, onSnapshot, addDoc, query, orderBy, serverTimestamp, doc, setDoc, deleteDoc, updateDoc, increment } from 'firebase/firestore';
import { db, auth } from './firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import emailjs from '@emailjs/browser';

// Components
import Navbar from './components/Navbar';
import Auth from './components/Auth';
import Home from './components/Home';
import Directory from './components/Directory';
import Synergy from './components/Synergy';
import Signals from './components/Signals';
import Identity from './components/Identity';
import LuckyLeavesBg from './components/LuckyLeavesBg';

// --- Static Constants ---

const badgeCriteria = [
  { id: 'quick_responder', name: "Quick Responder", color: "from-emerald-900/40 to-emerald-700/20", icon: <Star size={18}/>, iconColor: "text-emerald-400" },
  { id: 'community_pillar', name: "Community Pillar", color: "from-blue-900/40 to-blue-700/20", icon: <ShieldCheck size={18}/>, iconColor: "text-blue-400" },
  { id: 'echo_explorer', name: "Echo Explorer", color: "from-teal-900/40 to-teal-700/20", icon: <Mic size={18}/>, iconColor: "text-teal-400" },
  { id: 'high_impact', name: "High Impact", color: "from-green-900/40 to-green-700/20", icon: <Award size={18}/>, iconColor: "text-green-400" }
];

const mockOrgs = [
  { 
    name: "NSS Youth Wing", 
    type: "Student Body", 
    focus: "Rural upliftment & camps", 
    icon: "N",
    teamStrength: "450 Active Members",
    location: "Main University Campus, Block B",
    completedWorks: ["Adopted 5 rural villages", "12 Blood Donation Camps", "Digital Literacy Drive"],
    upcomingTasks: ["Tree Plantation Drive (Oct 15)", "Flood Relief Fundraiser"],
    contact: "nss@university.edu"
  },
  { 
    name: "Helping Hands NGO", 
    type: "NGO", 
    focus: "Food security & Disaster relief", 
    icon: "H",
    teamStrength: "1,200 Volunteers",
    location: "City Central District",
    completedWorks: ["500K Meals Distributed", "Kerala Flood Relief", "Daily Soup Kitchens"],
    upcomingTasks: ["Winter Blanket Distribution", "Food Waste Recovery Network"],
    contact: "contact@helpinghands.ngo"
  },
  { 
    name: "ElderCare Trust", 
    type: "Trust", 
    focus: "Senior citizen companionship", 
    icon: "E",
    teamStrength: "85 Caregivers",
    location: "North Suburbs",
    completedWorks: ["Built 3 new recreation centers", "Daily Medicine Delivery", "Weekly Companionship Visits"],
    upcomingTasks: ["Diwali Celebration with Seniors", "Free Health Checkup Camp"],
    contact: "support@eldercare.org"
  },
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('volunteer'); // 'volunteer', 'admin', 'people'
  const [activeTab, setActiveTab] = useState('home');
  const [showToast, setShowToast] = useState(null);
  
  // Real-time Cloud State
  const [volunteers, setVolunteers] = useState([]);
  const [signals, setSignals] = useState([]);
  
  // Profile State
  const [userData, setUserData] = useState({
    name: "Michelle",
    profilePic: null,
    bio: "Student volunteer dedicated to community wellness and digital inclusion.",
    location: "Chennai, India",
    impactPoints: 2450,
    skills: ["Tamil", "First Aid", "Basic IT"],
    unlockedBadges: ['community_pillar'],
    impactStory: "",
    emergencyContact: "+91 98765 43210",
    primaryNeeds: ["Medical Pickup", "Grocery Assistance"],
    bloodGroup: "O+",
    // NSS Volunteer Detail Fields
    uniqueId: "NSS-2023-45B",
    dob: "2003-05-14",
    gender: "Female",
    rollNumber: "CS21045",
    department: "Computer Science Engineering",
    yearOfJoining: "2021",
    socialCategory: "General",
    phone: "+91 98765 43210",
    email: "michelle.cs21@college.edu",
    enrollmentDate: "2023-08-10"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({ ...userData });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [messageText, setMessageText] = useState("");
  const fileInputRef = useRef(null);

  // EmailJS Configuration (Replace with your actual keys from emailjs.com)
  const EMAILJS_SERVICE_ID = "service_hearthub";
  const EMAILJS_TEMPLATE_ID = "template_help_request";
  const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY"; // User needs to replace this

  // Firestore Subscriptions & Auth States
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    // Sync Volunteers
    const vQuery = query(collection(db, 'volunteers'), orderBy('points', 'desc'));
    const unsubVolunteers = onSnapshot(vQuery, (snapshot) => {
      const vData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setVolunteers(vData);
    });

    // Sync Signals
    const sQuery = query(collection(db, 'signals'), orderBy('createdAt', 'desc'));
    const unsubSignals = onSnapshot(sQuery, (snapshot) => {
      const sData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSignals(sData);
    });

    return () => {
      unsubAuth();
      unsubVolunteers();
      unsubSignals();
    };
  }, []);

  // Computed
  const filteredVolunteers = useMemo(() => {
    return volunteers.filter(v => 
      v.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.skills?.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [volunteers, searchQuery]);

  // Actions
  const notify = (msg) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 3000);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      setActiveTab('home');
      notify("Logged out successfully");
    } catch (e) {
      notify("Error logging out");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setTempData(prev => ({ ...prev, profilePic: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const saveProfileChanges = async () => {
    try {
      const userToSave = {
        ...tempData,
        points: tempData.points || 50,
        distance: "0.1km",
        createdAt: serverTimestamp()
      };
      
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, 'volunteers', user.uid), userToSave);
      } else {
        await addDoc(collection(db, 'volunteers'), userToSave);
      }

      setUserData({ ...tempData });
      setIsEditing(false);
      setUserRole('volunteer');
      notify("Profile Saved & Volunteer Registered in Cloud.");
    } catch (e) {
      console.error(e);
      notify("Error saving profile to cloud.");
    }
  };

  const removeVolunteer = async (volunteerId) => {
    try {
      if (!volunteerId) return;
      await deleteDoc(doc(db, 'volunteers', volunteerId));
      notify("Volunteer securely removed from network.");
    } catch (e) {
      console.error(e);
      notify("Error removing volunteer.");
    }
  };

  const sendHelpRequest = async (volunteerId, targetName, message) => {
    try {
      if (!auth.currentUser) return notify("Please login to send explicit requests.");
      await addDoc(collection(db, 'helpRequests'), {
        from: auth.currentUser.uid,
        fromName: userData.name,
        to: volunteerId,
        toName: targetName,
        message,
        createdAt: serverTimestamp(),
        status: 'pending'
      });

      // --- EMAILJS INTEGRATION ---
      const templateParams = {
        to_name: targetName,
        from_name: userData.name,
        message: message,
        reply_to: userData.email || "no-reply@hearthub.com"
      };

      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
        .then(() => {
          notify(`Soul Request dispatched & Email notification sent to ${targetName}`);
        })
        .catch((error) => {
          console.error('EmailJS Error:', error);
          notify(`Request dispatched! (Email sync pending: ${error.text || 'Check Keys'})`);
        });

    } catch (e) {
      console.error(e);
      notify("Failed to transmit request. Sync active.");
    }
  };

  const resolveSignal = async (signalId) => {
    try {
      // Delete the distressed signal out of the cloud
      await deleteDoc(doc(db, 'signals', signalId));
      
      // Update local and cloud points
      setUserData(prev => ({...prev, impactPoints: prev.impactPoints + 50}));
      if (auth.currentUser) {
        const userRef = doc(db, 'volunteers', auth.currentUser.uid);
        await updateDoc(userRef, { points: increment(50) }).catch(() => {});
      }
      
      notify("Emergency averted! +50 Soul Points awarded.");
    } catch (e) {
      console.error(e);
      notify("Error processing resolution.");
    }
  };

  const joinOrganization = async (orgName) => {
    notify(`Initiative Joined! Added ${orgName} to your profile.`);
    if (auth.currentUser) {
      const userRef = doc(db, 'volunteers', auth.currentUser.uid);
      await updateDoc(userRef, { orgs: orgName }).catch(() => {});
    }
  };

  const registerVolunteer = async (newVolunteer) => {
    try {
      const volunteer = {
        name: newVolunteer.name,
        email: newVolunteer.email || null,
        about: newVolunteer.about,
        location: newVolunteer.location,
        skills: newVolunteer.skills || ["Community Support"],
        points: 50, // Welcome points
        distance: "0.1km",
        createdAt: serverTimestamp()
      };
      // If uid is provided (from Firebase Auth), use setDoc for a specific ID, otherwise fallback to addDoc
      if (newVolunteer.uid) {
        await setDoc(doc(db, 'volunteers', newVolunteer.uid), volunteer);
      } else {
        await addDoc(collection(db, 'volunteers'), volunteer);
      }
      
      notify(`Welcome ${volunteer.name}! Cloud profile created.`);

      // Welcome Email
      emailjs.send(EMAILJS_SERVICE_ID, "template_welcome", {
        to_name: volunteer.name,
        action: "Volunteer Registration"
      }, EMAILJS_PUBLIC_KEY).catch(() => {}); // Slient fail for welcome emails

      setIsLoggedIn(true);
      setUserRole('volunteer');
    } catch (e) {
      console.error("Error registering soul:", e);
      notify("Sync error. Local profile only.");
    }
  };

  const raiseSignal = async (newSignal) => {
    try {
      const signal = {
        ...newSignal,
        createdAt: serverTimestamp(),
      };
      await addDoc(collection(db, 'signals'), signal);
      notify("Distress Signal Broadcasted to Cloud.");
    } catch (e) {
      console.error("Error raising signal:", e);
      notify("Broadcast error. Check connection.");
    }
  };

  return (
    <div className="min-h-screen bg-[#010816] text-emerald-50 font-sans selection:bg-emerald-500/30 overflow-x-hidden relative">
      <LuckyLeavesBg />
      
      {!isLoggedIn ? (
        <Auth 
          userRole={userRole} 
          setUserRole={setUserRole} 
          setIsLoggedIn={setIsLoggedIn} 
          setUserData={setUserData} 
          setTempData={setTempData} 
          onRegister={registerVolunteer}
        />
      ) : (
        <>
          {/* Toast Notification */}
          {showToast && (
            <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] animate-in slide-in-from-top-10 fade-in bg-emerald-600 text-white px-8 py-3 rounded-full shadow-2xl border border-emerald-400/50 backdrop-blur-md font-bold text-sm">
              {showToast}
            </div>
          )}

          <Navbar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            userRole={userRole} 
            handleLogout={handleLogout} 
            userData={userData} 
          />

          <main className="max-w-7xl mx-auto pt-40 pb-40 px-6 relative z-10">
            {activeTab === 'home' && <Home setActiveTab={setActiveTab} onRaiseSignal={raiseSignal} />}
            
            {activeTab === 'volunteers' && (
              <Directory 
                userRole={userRole}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filteredVolunteers={filteredVolunteers}
                setSelectedVolunteer={setSelectedVolunteer}
                selectedVolunteer={selectedVolunteer}
                messageText={messageText}
                setMessageText={setMessageText}
                notify={notify}
                removeVolunteer={removeVolunteer}
                sendHelpRequest={sendHelpRequest}
              />
            )}

            {activeTab === 'profile' && (
              <Identity 
                userData={userData}
                userRole={userRole}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                tempData={tempData}
                setTempData={setTempData}
                saveProfileChanges={saveProfileChanges}
                badgeCriteria={badgeCriteria}
                fileInputRef={fileInputRef}
                handleImageUpload={handleImageUpload}
                setActiveTab={setActiveTab}
                onRaiseSignal={raiseSignal}
              />
            )}

            {activeTab === 'orgs' && <Synergy mockOrgs={mockOrgs} joinOrganization={joinOrganization} />}
            
            {activeTab === 'nearby' && <Signals signals={signals} resolveSignal={resolveSignal} userRole={userRole} />}
          </main>

          <footer className="bg-[#00040a]/80 backdrop-blur-md text-emerald-900/30 py-24 border-t border-white/5 text-center px-6 mt-20 relative z-10">
              <p className="text-[11px] font-bold tracking-[0.6em] uppercase text-emerald-100/10 mb-4">Empowering Humanity via Agentic Souls</p>
              <p className="text-[9px] max-w-xl mx-auto leading-loose opacity-40 font-medium uppercase tracking-widest">Google Solution Challenge 2026 Submission • Multimodal Gemini Platform</p>
          </footer>
        </>
      )}
    </div>
  );
}
