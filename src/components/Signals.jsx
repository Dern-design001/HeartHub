import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Globe, Camera } from 'lucide-react';

// Fix for default marker icon in Leaflet + Vite
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const Signals = ({ signals, resolveSignal, userRole }) => {
  const getLatLng = (x, y) => [
    13.15 - (y / 100) * 0.15,
    80.20 + (x / 100) * 0.15
  ];

  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-10 duration-500">
       <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="space-y-2">
            <h2 className="text-4xl font-serif font-bold text-white tracking-tight">Active Soul Signals</h2>
            <p className="text-emerald-500/40 text-sm font-medium">Real-time distress signals via OpenStreetMap (100% Free).</p>
          </div>
          <div className="bg-emerald-500/10 px-6 py-3 rounded-2xl border border-emerald-500/20 text-[10px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-3 shadow-xl backdrop-blur-md">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div> Live Monitoring v2.3
          </div>
       </div>

       <div className="bg-[#020617] border border-emerald-500/10 rounded-[3.5rem] h-[600px] relative overflow-hidden shadow-2xl">
          <MapContainer 
            center={[13.0827, 80.2707]} 
            zoom={12} 
            style={{ width: '100%', height: '100%', background: '#010816' }}
            zoomControl={false}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; OpenStreetMap'
            />
            {signals.map((signal) => (
              <Marker key={signal.id} position={getLatLng(signal.x, signal.y)}>
                <Popup maxWidth={300}>
                   <div className="bg-slate-950 text-white rounded-2xl border border-emerald-500/10 overflow-hidden shadow-2xl w-64">
                      {signal.image && (
                        <div className="h-32 w-full relative overflow-hidden border-b border-emerald-500/10">
                           <img src={signal.image} alt="Distress Evidence" className="w-full h-full object-cover" />
                           <div className="absolute top-2 right-2 bg-black/60 p-1.5 rounded-lg backdrop-blur-md">
                              <Camera size={12} className="text-emerald-400" />
                           </div>
                        </div>
                      )}
                      <div className="p-4 space-y-2">
                         <div className="flex items-center justify-between">
                            <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${signal.type === 'emergency' ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                               {signal.type}
                            </span>
                         </div>
                         <p className="text-xs text-emerald-100/70 leading-relaxed font-medium">"{signal.message}"</p>
                         <p className="text-[8px] text-white/20 uppercase tracking-[0.2em] font-bold mb-2">Signal Active now</p>
                         {(userRole === 'volunteer' || userRole === 'admin') && (
                            <button onClick={() => resolveSignal(signal.id)} className="mt-4 w-full bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20 active:scale-95">
                               Resolve & Earn Points
                            </button>
                         )}
                      </div>
                   </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Map Overlay for Premium Look */}
          <div className="absolute inset-0 pointer-events-none border-[20px] border-transparent rounded-[3.5rem] shadow-[inset_0_0_100px_rgba(1,8,22,0.8)] z-[1000]"></div>
          
          <div className="absolute bottom-8 left-8 bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/5 space-y-2 z-[1000]">
             <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">Emergency Distress</span>
             </div>
             <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">Community Support</span>
             </div>
          </div>
       </div>

       <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl flex items-center gap-4 text-emerald-400">
          <Camera size={24} />
          <p className="text-sm font-bold tracking-wide">Multimodal Signal Ingestion active: Images and Voice are automatically synced to nearest guardians.</p>
       </div>
    </div>
  );
};

export default Signals;
