import React from 'react';
import { Gavel, MessageSquare, CreditCard, Zap, Activity, ChevronRight, Brain, Calendar, CheckCircle, FileText } from 'lucide-react';
import { CASES } from './data/mockData';
import { Card, StatusPill, ProgressRing, Avatar } from './components/SharedUI';


export default function OverviewView({ setActive }) {
  const activeCases = CASES.filter(c => c.status === 'active');

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Cases', value: '2', icon: Gavel, color: '#6366F1', sub: '1 hearing this month' },
          { label: 'Unread Messages', value: '4', icon: MessageSquare, color: '#D4AF37', sub: 'From 2 advocates' },
          { label: 'Next Payment', value: 'KES 25.5K', icon: CreditCard, color: '#10B981', sub: 'Due May 10' },
          { label: 'Legal Credits', value: '480', icon: Zap, color: '#F59E0B', sub: '≈ 16 AI queries' },
        ].map(({ label, value, icon: Icon, color, sub }, i) => (
          <Card key={i} className="p-5 hover:border-white/14 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center border" style={{ background: color + '15', borderColor: color + '30' }}>
                <Icon style={{ width: 16, height: 16, color }} />
              </div>
              <Activity style={{ width: 14, height: 14 }} className="text-white/15" />
            </div>
            <p className="text-2xl font-black text-white mb-0.5" style={{ fontFamily: 'Georgia, serif' }}>{value}</p>
            <p className="text-xs text-white/35">{label}</p>
            <p className="text-[10px] text-white/20 mt-1">{sub}</p>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Active Cases */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-white font-semibold text-sm">Active Cases</h2>
            <button onClick={() => setActive('cases')} className="text-[#D4AF37] text-xs font-semibold flex items-center gap-1 hover:underline">
              View all <ChevronRight style={{ width: 13, height: 13 }} />
            </button>
          </div>
          {activeCases.map(c => (
            <Card key={c.id} className="p-5 hover:border-white/14 transition-colors cursor-pointer" onClick={() => setActive('cases')}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] text-white/30 font-mono">{c.id}</span>
                    <StatusPill status={c.status} />
                    {c.urgency === 'high' && <span className="text-[10px] text-red-400 font-bold uppercase">⚡ Urgent</span>}
                  </div>
                  <h3 className="text-white font-bold text-sm">{c.type}</h3>
                  <p className="text-white/35 text-xs mt-0.5">vs. {c.opponent}</p>
                </div>
                <div className="relative">
                  <ProgressRing pct={c.progress} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[10px] font-black text-white">{c.progress}%</span>
                  </div>
                </div>
              </div>

              {/* Timeline mini */}
              <div className="flex items-center gap-1 mb-4">
                {c.timeline.map((t, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className={`w-full h-1.5 rounded-full ${t.done ? 'bg-[#D4AF37]' : t.active ? 'bg-[#D4AF37]/40' : 'bg-white/8'}`} />
                    {t.active && <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Avatar initials={c.advocateInitials} color={c.advocateColor} size="sm" />
                  <div>
                    <p className="text-white/70 font-medium">{c.advocate}</p>
                    <p className="text-white/25">{c.court.split(',')[0]}</p>
                  </div>
                </div>
                {c.nextHearing && (
                  <div className="text-right">
                    <p className="text-white/30 text-[10px]">Next Hearing</p>
                    <p className="text-[#D4AF37] font-semibold">{new Date(c.nextHearing).toLocaleDateString('en-KE', { day: 'numeric', month: 'short' })}</p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Quick AI */}
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/25 flex items-center justify-center">
                <Brain style={{ width: 14, height: 14 }} className="text-[#D4AF37]" />
              </div>
              <span className="text-white text-xs font-semibold">Quick AI Query</span>
            </div>
            <div className="bg-[#0d0f18] rounded-xl p-3 mb-3 border border-white/5">
              <p className="text-white/45 text-xs leading-relaxed italic">"What is the limitation period for filing a land dispute claim in Kenya?"</p>
              <div className="mt-2 pt-2 border-t border-white/5">
                <p className="text-[10px] text-[#D4AF37] font-bold mb-1">AI Response:</p>
                <p className="text-white/60 text-[11px] leading-relaxed">Under the Limitation of Actions Act (Cap 22), land claims must be filed within <span className="text-[#D4AF37] font-semibold">12 years</span> from the date the cause of action accrued. For adverse possession, 12 years of continuous occupation is required...</p>
              </div>
            </div>
            <button onClick={() => setActive('ai')}
              className="w-full py-2.5 rounded-xl bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold transition-colors flex items-center justify-center gap-2">
              <Brain style={{ width: 13, height: 13 }} /> Open AI Assistant
            </button>
          </Card>

          {/* Upcoming */}
          <Card className="p-5">
            <h3 className="text-white text-xs font-semibold mb-3 flex items-center gap-2">
              <Calendar style={{ width: 14, height: 14 }} className="text-[#D4AF37]" /> Upcoming
            </h3>
            <div className="space-y-3">
              {[
                { date: 'May 10', label: 'Payment Due', sub: 'KES 25,500 — KE-2026-4902', color: 'text-amber-400', dot: 'bg-amber-400' },
                { date: 'May 12', label: 'Hearing', sub: 'ELC Court 4 · 9:00 AM', color: 'text-blue-400', dot: 'bg-blue-400' },
                { date: 'May 19', label: 'Mediation', sub: 'ELRC Nairobi · Amina Mwangi', color: 'text-purple-400', dot: 'bg-purple-400' },
              ].map(({ date, label, sub, color, dot }, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full ${dot} mt-1.5 flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-white/75 text-xs font-medium">{label}</p>
                      <span className={`text-[10px] font-bold ${color}`}>{date}</span>
                    </div>
                    <p className="text-white/30 text-[10px]">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-5">
            <h3 className="text-white text-xs font-semibold mb-3 flex items-center gap-2">
              <Activity style={{ width: 14, height: 14 }} className="text-[#D4AF37]" /> Recent Activity
            </h3>
            <div className="space-y-3">
              {[
                { icon: MessageSquare, text: 'Njeri Kamau sent a message', time: '10:32 AM', color: 'text-[#D4AF37]' },
                { icon: FileText, text: 'Replying Affidavit uploaded', time: 'Yesterday', color: 'text-blue-400' },
                { icon: CheckCircle, text: 'Stage 2 payment confirmed', time: 'Jan 14', color: 'text-green-400' },
                { icon: Brain, text: 'AI case analysis completed', time: 'Jan 10', color: 'text-purple-400' },
              ].map(({ icon: Icon, text, time, color }, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Icon style={{ width: 13, height: 13 }} className={`${color} flex-shrink-0`} />
                  <p className="text-white/45 text-[11px] flex-1">{text}</p>
                  <span className="text-white/20 text-[10px]">{time}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
