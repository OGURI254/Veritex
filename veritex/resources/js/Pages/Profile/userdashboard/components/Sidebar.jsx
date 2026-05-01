import React from 'react';
import { Link } from '@inertiajs/react';
import {
  Scale, LayoutDashboard, Gavel, MessageSquare, CreditCard, FileText,
  MapPin, Shield, Brain, ChevronRight, ChevronLeft, Settings, HelpCircle, LogOut
} from 'lucide-react';

export const NAV_ITEMS = [
  { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
  { id: 'cases', icon: Gavel, label: 'My Cases', badge: '2' },
  { id: 'ai', icon: Brain, label: 'AI Assistant' },
  { id: 'messages', icon: MessageSquare, label: 'Messages', badge: '2' },
  { id: 'payments', icon: CreditCard, label: 'Payments' },
  { id: 'documents', icon: FileText, label: 'Documents' },
  { id: 'evidence', icon: Shield, label: 'Evidence Vault' },
  { id: 'map', icon: MapPin, label: 'Courts & Police' },
];

export default function Sidebar({ active, setActive, collapsed, setCollapsed }) {
  return (
    <aside className={`flex flex-col border-r border-white/6 bg-[#12141f] transition-all duration-300 ${collapsed ? 'w-16' : 'w-60'} shrink-0 h-screen sticky top-0`}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/6">
        <div className="w-8 h-8 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center flex-shrink-0">
          <Scale className="w-4 h-4 text-[#D4AF37]" />
        </div>
        {!collapsed && <span className="font-bold text-white text-lg tracking-tight">Veritex</span>}
        <button onClick={() => setCollapsed(v => !v)}
          className="ml-auto w-6 h-6 rounded-md bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
          {collapsed ? <ChevronRight className="w-3.5 h-3.5 text-white/50" /> : <ChevronLeft className="w-3.5 h-3.5 text-white/50" />}
        </button>
      </div>

      {/* User */}
      {!collapsed && (
        <div className="flex items-center gap-3 px-4 py-4 border-b border-white/6">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37]/40 to-[#6366F1]/30 flex items-center justify-center text-xs font-black text-[#D4AF37] border border-[#D4AF37]/30 flex-shrink-0">JM</div>
          <div className="min-w-0">
            <p className="text-white text-xs font-semibold truncate">John Mwangi</p>
            <p className="text-white/30 text-[10px] truncate">Client · Nairobi</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0 animate-pulse" />
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 py-3 overflow-y-auto">
        {NAV_ITEMS.map(({ id, icon: Icon, label, badge }) => (
          <button key={id} onClick={() => setActive(id)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all relative group ${active === id ? 'text-white bg-[#D4AF37]/10' : 'text-white/40 hover:text-white/70 hover:bg-white/4'}`}>
            {active === id && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r bg-[#D4AF37]" />}
            <Icon className={`w-4.5 h-4.5 flex-shrink-0 ${active === id ? 'text-[#D4AF37]' : ''}`} style={{ width: 18, height: 18 }} />
            {!collapsed && (
              <>
                <span className="text-sm font-medium flex-1 truncate">{label}</span>
                {badge && (
                  <span className="w-5 h-5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-black flex items-center justify-center">
                    {badge}
                  </span>
                )}
              </>
            )}
            {collapsed && badge && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#D4AF37]" />
            )}
          </button>
        ))}
      </nav>

      {/* Bottom */}
      <div className="border-t border-white/6 py-3">
        {[
          { icon: Settings, label: 'Settings', href: route('profile.edit') },
          { icon: HelpCircle, label: 'Help', href: '#' },
          { icon: LogOut, label: 'Sign Out', href: route('logout'), method: 'post' }
        ].map(({ icon: Icon, label, href, method }) => {
          const Comp = method ? Link : 'a';
          return (
            <Comp key={label} href={href} method={method} as={method ? 'button' : undefined} className="w-full flex items-center gap-3 px-4 py-2 text-white/30 hover:text-white/60 transition-colors">
              <Icon style={{ width: 16, height: 16 }} className="flex-shrink-0" />
              {!collapsed && <span className="text-xs">{label}</span>}
            </Comp>
          );
        })}
      </div>
    </aside>
  );
}
