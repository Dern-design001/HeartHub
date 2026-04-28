import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MapPin, AlertTriangle, Camera, Image as ImageIcon, Trash2 } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

const LocationMarker = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={DefaultIcon} />
  );
};

const BroadcastModal = ({ isOpen, onClose, onRaiseSignal }) => {
  const [complaint, setComplaint] = useState("");
  const [type, setType] = useState("emergency");
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  
  // Default to Chennai center
  const [location, setLocation] = useState({ lat: 13.0827, lng: 80.2707 });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (complaint && location) {
      const x = ((location.lng - 80.20) / 0.15) * 100;
      const y = ((13.15 - location.lat) / 0.15) * 100;

      onRaiseSignal({
        type,
        message: complaint,
        image: image,
        x: Math.max(0, Math.min(100, x)),
        y: Math.max(0, Math.min(100, y))
      });
      setComplaint("");
      setImage(null);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-[#010816]/90 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="max-w-5xl w-full bg-slate-900 border border-emerald-500/20 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row h-[90vh] md:h-auto"
          >
            {/* Left Side: Map Picker */}
            <div className="md:w-1/2 bg-[#020617] relative flex flex-col min-h-[300px]">
               <MapContainer 
                center={[13.0827, 80.2707]} 
                zoom={13} 
                style={{ width: '100%', height: '100%' }}
                zoomControl={false}
               >
                  <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; OpenStreetMap'
                  />
                  <LocationMarker position={location} setPosition={setLocation} />
               </MapContainer>
               <div className="absolute top-8 left-8 bg-black/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/5 flex items-center gap-3 z-[1000]">
                  <MapPin className="text-emerald-400" size={18} />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white">Tap map to mark spot</span>
               </div>
            </div>

            {/* Right Side: Form */}
            <div className="md:w-1/2 p-10 space-y-8 flex flex-col justify-between overflow-y-auto">
               <div>
                  <div className="flex justify-between items-center mb-8">
                     <h3 className="text-3xl font-serif font-bold text-white">Rise Complaint</h3>
                     <button onClick={onClose} className="text-emerald-500/40 hover:text-white transition-all"><X size={24}/></button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest pl-1">Signal Intensity</label>
                        <div className="grid grid-cols-2 gap-3">
                           <button 
                             type="button" 
                             onClick={() => setType('emergency')}
                             className={`py-4 rounded-2xl border font-bold text-[10px] uppercase tracking-widest transition-all ${type === 'emergency' ? 'bg-red-500/10 border-red-500/50 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'bg-slate-950 border-emerald-500/5 text-emerald-500/20 hover:border-emerald-500/20'}`}
                           >
                             Emergency
                           </button>
                           <button 
                             type="button" 
                             onClick={() => setType('support')}
                             className={`py-4 rounded-2xl border font-bold text-[10px] uppercase tracking-widest transition-all ${type === 'support' ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'bg-slate-950 border-emerald-500/5 text-emerald-500/20 hover:border-emerald-500/20'}`}
                           >
                             Support
                           </button>
                        </div>
                     </div>

                     <div className="space-y-4">
                        <div className="space-y-2">
                           <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest pl-1">Issue Details</label>
                           <textarea 
                              required
                              value={complaint}
                              onChange={(e) => setComplaint(e.target.value)}
                              placeholder="Explain the situation..."
                              className="w-full bg-slate-950 border border-emerald-500/10 rounded-3xl p-6 text-sm text-white outline-none focus:ring-1 ring-emerald-500 h-32 resize-none leading-relaxed"
                           />
                        </div>

                        <div className="space-y-2">
                           <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest pl-1">Evidence (Optional)</label>
                           <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                           
                           {image ? (
                             <div className="relative group rounded-3xl overflow-hidden border border-emerald-500/20 h-48 bg-slate-950">
                                <img src={image} alt="Evidence" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-sm">
                                   <button 
                                    type="button" 
                                    onClick={() => setImage(null)}
                                    className="p-4 bg-red-500 text-white rounded-full shadow-2xl hover:bg-red-400 transition-all"
                                   >
                                      <Trash2 size={24} />
                                   </button>
                                </div>
                             </div>
                           ) : (
                             <div 
                              onClick={() => fileInputRef.current?.click()}
                              className="w-full h-32 border-2 border-dashed border-emerald-500/10 rounded-3xl flex flex-col items-center justify-center gap-3 text-emerald-500/30 hover:border-emerald-500/30 hover:text-emerald-400 transition-all cursor-pointer group bg-slate-950/50"
                             >
                                <Camera size={32} className="group-hover:scale-110 transition-transform" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Capture or Upload Asset</span>
                             </div>
                           )}
                        </div>
                     </div>

                     <button 
                       type="submit"
                       className="w-full bg-emerald-600 text-white py-5 rounded-[1.5rem] font-bold shadow-xl hover:bg-emerald-500 transition-all flex items-center justify-center gap-3 active:scale-95"
                     >
                       Broadcast SOS <Send size={20}/>
                     </button>
                  </form>
               </div>

               <div className="pt-6 border-t border-white/5 flex items-center gap-4 text-white/20">
                  <AlertTriangle size={16} />
                  <p className="text-[9px] font-bold uppercase tracking-widest leading-tight">Visual evidence helps Guardians respond faster.</p>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BroadcastModal;
