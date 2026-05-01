import React, { useState } from 'react';
import { MapPin, Shield, Search, Navigation } from 'lucide-react';
import { COURTS } from './data/mockData';
import { Card } from './components/SharedUI';


export default function MapView() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = COURTS.filter(c => {
    const matchFilter = filter === 'all' || c.type === filter;
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.division.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="flex h-full overflow-hidden">
      {/* List */}
      <div className="w-80 border-r border-white/6 flex flex-col shrink-0">
        <div className="p-4 border-b border-white/6 space-y-3">
          <div className="flex gap-1 p-1 rounded-xl bg-white/4 border border-white/6">
            {['all', 'court', 'police'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${filter === f ? 'bg-[#D4AF37] text-[#12141f]' : 'text-white/40 hover:text-white/60'}`}>
                {f === 'all' ? 'All' : f === 'court' ? '⚖️ Courts' : '🚔 Police'}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/8">
            <Search style={{ width: 13, height: 13 }} className="text-white/30" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              className="bg-transparent text-white/60 text-xs outline-none w-full placeholder:text-white/20" placeholder="Search..." />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filtered.map((loc, i) => (
            <button key={i} onClick={() => setSelected(loc)}
              className={`w-full text-left px-4 py-4 border-b border-white/4 hover:bg-white/3 transition-colors ${selected?.name === loc.name ? 'bg-[#D4AF37]/5 border-l-2 border-l-[#D4AF37]' : ''}`}>
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${loc.type === 'court' ? 'bg-blue-500/15 border border-blue-500/25' : 'bg-red-500/15 border border-red-500/25'}`}>
                  {loc.type === 'court' ? <Landmark style={{ width: 14, height: 14 }} className="text-blue-400" /> : <Shield style={{ width: 14, height: 14 }} className="text-red-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-semibold">{loc.name}</p>
                  <p className="text-white/35 text-[11px] leading-tight mt-0.5">{loc.division}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative overflow-hidden">
        {/* Map background */}
        <div className="absolute inset-0 bg-[#0d1117]">
          {/* Grid lines */}
          <svg className="absolute inset-0 w-full h-full opacity-10">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#D4AF37" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          {/* Road-like lines for Nairobi */}
          <svg className="absolute inset-0 w-full h-full">
            <line x1="0" y1="44%" x2="100%" y2="44%" stroke="#D4AF37" strokeWidth="1.5" opacity="0.08" />
            <line x1="0" y1="55%" x2="100%" y2="55%" stroke="#D4AF37" strokeWidth="1" opacity="0.06" />
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#D4AF37" strokeWidth="1.5" opacity="0.08" />
            <line x1="40%" y1="0" x2="40%" y2="100%" stroke="#D4AF37" strokeWidth="1" opacity="0.05" />
            <line x1="30%" y1="20%" x2="70%" y2="70%" stroke="#D4AF37" strokeWidth="1" opacity="0.06" />
            <line x1="70%" y1="20%" x2="30%" y2="75%" stroke="#D4AF37" strokeWidth="1" opacity="0.05" />
            {/* River-like path */}
            <path d="M 20% 10% Q 45% 40% 35% 60% Q 25% 80% 40% 100%" fill="none" stroke="#6366F1" strokeWidth="2" opacity="0.1" />
          </svg>
          {/* Area labels */}
          {[
            { label: 'CBD', x: '50%', y: '44%' },
            { label: 'Westlands', x: '30%', y: '28%' },
            { label: 'Kibera', x: '20%', y: '42%' },
            { label: 'Eastleigh', x: '68%', y: '38%' },
            { label: 'Parklands', x: '38%', y: '20%' },
            { label: 'Hurlingham', x: '42%', y: '58%' },
          ].map((a, i) => (
            <div key={i} className="absolute transform -translate-x-1/2 -translate-y-1/2 text-white/10 text-[10px] font-medium uppercase tracking-wider" style={{ left: a.x, top: a.y }}>
              {a.label}
            </div>
          ))}
          {/* Location pins */}
          {COURTS.map((loc, i) => {
            const isSel = selected?.name === loc.name;
            const isFiltered = filter === 'all' || filter === loc.type;
            return (
              <button key={i} onClick={() => setSelected(loc)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-10"
                style={{ left: `${loc.x}%`, top: `${loc.y}%` }}>
                <div className={`relative transition-all ${isFiltered ? 'opacity-100' : 'opacity-20'}`}>
                  {isSel && (
                    <div className={`absolute inset-0 rounded-full animate-ping ${loc.type === 'court' ? 'bg-blue-500/30' : 'bg-red-500/30'}`}
                      style={{ width: 36, height: 36, top: -6, left: -6 }} />
                  )}
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shadow-lg transition-all ${loc.type === 'court' ? `bg-blue-500/80 border-blue-300 ${isSel ? 'scale-150' : 'group-hover:scale-125'}` : `bg-red-500/80 border-red-300 ${isSel ? 'scale-150' : 'group-hover:scale-125'}`}`}>
                    {loc.type === 'court' ? <Landmark style={{ width: 10, height: 10 }} className="text-white" /> : <Shield style={{ width: 10, height: 10 }} className="text-white" />}
                  </div>
                  {/* Tooltip */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-40 px-2.5 py-2 rounded-xl bg-[#1a1d2e] border border-white/15 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-xl z-20">
                    <p className="text-white text-[11px] font-semibold leading-tight">{loc.name}</p>
                    <p className="text-white/35 text-[9px] mt-0.5 leading-tight">{loc.division}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 flex items-center gap-4 px-4 py-3 rounded-xl bg-[#1a1d2e]/90 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500/80 border border-blue-300" />
            <span className="text-white/50 text-[11px]">Law Courts</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500/80 border border-red-300" />
            <span className="text-white/50 text-[11px]">Police Stations</span>
          </div>
        </div>

        {/* Selected detail panel */}
        {selected && (
          <div className="absolute top-4 right-4 w-72 rounded-2xl border border-white/12 bg-[#1a1d2e]/95 backdrop-blur-md p-5 shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${selected.type === 'court' ? 'bg-blue-500/15 border-blue-500/30' : 'bg-red-500/15 border-red-500/30'}`}>
                {selected.type === 'court' ? <Landmark style={{ width: 18, height: 18 }} className="text-blue-400" /> : <Shield style={{ width: 18, height: 18 }} className="text-red-400" />}
              </div>
              <button onClick={() => setSelected(null)} className="text-white/25 hover:text-white/50">
                <X style={{ width: 16, height: 16 }} />
              </button>
            </div>
            <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${selected.type === 'court' ? 'text-blue-400' : 'text-red-400'}`}>
              {selected.type === 'court' ? 'Law Court' : 'Police Station'}
            </p>
            <h3 className="text-white font-bold text-sm mb-1">{selected.name}</h3>
            <p className="text-white/35 text-[11px] mb-4 leading-relaxed">{selected.division}</p>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-2 py-2.5 px-3 rounded-xl bg-white/5 border border-white/8 hover:bg-white/8 transition-colors text-left">
                <Navigation style={{ width: 13, height: 13 }} className="text-[#D4AF37]" />
                <span className="text-white/60 text-xs">Get Directions</span>
              </button>
              {selected.type === 'court' && (
                <button className="w-full flex items-center gap-2 py-2.5 px-3 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/15 transition-colors text-left">
                  <FileText style={{ width: 13, height: 13 }} className="text-blue-400" />
                  <span className="text-blue-400 text-xs font-semibold">File Case Here</span>
                </button>
              )}
              {selected.type === 'police' && (
                <button className="w-full flex items-center gap-2 py-2.5 px-3 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/15 transition-colors text-left">
                  <Phone style={{ width: 13, height: 13 }} className="text-red-400" />
                  <span className="text-red-400 text-xs font-semibold">Emergency — Report Here</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

