import React, { useState } from 'react';
import { Search, Phone, Bell, Zap } from 'lucide-react';

export default function Header({ title, subtitle, active }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const notifs = [
    { text: 'Hearing on May 12 confirmed — Court 4, 9:00 AM', time: '10:32 AM', type: 'hearing', read: false },
    { text: 'Njeri Kamau sent 2 new messages', time: '9:47 AM', type: 'message', read: false },
    { text: 'Payment milestone due in 3 days — KES 25,500', time: 'Yesterday', type: 'payment', read: true },
    { text: 'Document "Replying Affidavit" is ready for download', time: 'Yesterday', type: 'doc', read: true },
  ];
  const unread = notifs.filter(n => !n.read).length;

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-white/6 bg-[#12141f]/80 backdrop-blur-sm sticky top-0 z-30">
      <div>
        <h1 className="text-white font-bold text-lg leading-tight">{title}</h1>
        {subtitle && <p className="text-white/35 text-xs mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        {/* Quick search */}
        <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/8 text-white/30 text-xs">
          <Search style={{ width: 14, height: 14 }} />
          <span>Search anything...</span>
          <kbd className="ml-2 px-1.5 py-0.5 rounded bg-white/8 text-[10px] font-mono">⌘K</kbd>
        </div>

        {/* Emergency */}
        <button className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold hover:bg-red-500/20 transition-colors">
          <Phone style={{ width: 13, height: 13 }} /> 🆘 Emergency
        </button>

        {/* Notifications */}
        <div className="relative">
          <button onClick={() => setNotifOpen(v => !v)}
            className="relative w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center hover:bg-white/8 transition-colors">
            <Bell style={{ width: 16, height: 16 }} className="text-white/50" />
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D4AF37] text-[#12141f] text-[9px] font-black flex items-center justify-center">
                {unread}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-12 w-80 rounded-2xl border border-white/10 bg-[#1a1d2e] shadow-2xl shadow-black/50 overflow-hidden z-50">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/6">
                <span className="text-white text-sm font-semibold">Notifications</span>
                <span className="text-[#D4AF37] text-xs font-bold">{unread} new</span>
              </div>
              {notifs.map((n, i) => (
                <div key={i} className={`flex items-start gap-3 px-4 py-3 border-b border-white/5 hover:bg-white/3 transition-colors ${!n.read ? 'bg-[#D4AF37]/3' : ''}`}>
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${!n.read ? 'bg-[#D4AF37] animate-pulse' : 'bg-white/15'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-white/75 text-xs leading-relaxed">{n.text}</p>
                    <p className="text-white/25 text-[10px] mt-1">{n.time}</p>
                  </div>
                </div>
              ))}
              <div className="px-4 py-2.5 text-center">
                <button className="text-[#D4AF37] text-xs font-semibold hover:underline">View All</button>
              </div>
            </div>
          )}
        </div>

        {/* Credits */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#D4AF37]/8 border border-[#D4AF37]/20">
          <Zap style={{ width: 13, height: 13 }} className="text-[#D4AF37]" />
          <span className="text-[#D4AF37] text-xs font-bold">480</span>
          <span className="text-white/30 text-[10px]">credits</span>
        </div>
      </div>
    </header>
  );
}
