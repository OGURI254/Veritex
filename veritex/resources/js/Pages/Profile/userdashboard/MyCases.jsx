import React, { useState } from 'react';
import { Plus, Search, Landmark, Calendar, Flag, Brain, Clock, UserCheck, CheckCircle, Circle, FileText, Eye, Download, Shield, Video, Mic, Image, Lock } from 'lucide-react';
import { CASES, PAYMENTS } from './data/mockData';
import { Card, StatusPill, ProgressRing, Avatar } from './components/SharedUI';


export default function CasesView() {
  const [selected, setSelected] = useState(CASES[0]);
  const [tab, setTab] = useState('timeline');

  return (
    <div className="flex h-full overflow-hidden">
      {/* Case list */}
      <div className="w-80 border-r border-white/6 flex flex-col shrink-0">
        <div className="p-4 border-b border-white/6">
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-white font-semibold text-sm flex-1">All Cases</h2>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4AF37] text-[#12141f] text-xs font-bold hover:bg-[#c9a430] transition-colors">
              <Plus style={{ width: 12, height: 12 }} /> New Case
            </button>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/8">
            <Search style={{ width: 13, height: 13 }} className="text-white/30" />
            <input className="bg-transparent text-white/60 text-xs outline-none w-full placeholder:text-white/20" placeholder="Search cases..." />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          {CASES.map(c => (
            <button key={c.id} onClick={() => setSelected(c)}
              className={`w-full text-left px-4 py-3.5 border-b border-white/4 transition-colors hover:bg-white/3 ${selected?.id === c.id ? 'bg-[#D4AF37]/6 border-l-2 border-l-[#D4AF37]' : ''}`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] text-white/25 font-mono">{c.id}</span>
                <StatusPill status={c.status} />
              </div>
              <p className="text-white text-xs font-semibold mb-0.5">{c.type}</p>
              <p className="text-white/35 text-[11px]">{c.opponent}</p>
              <div className="mt-2 w-full h-1 rounded-full bg-white/6 overflow-hidden">
                <div className="h-full rounded-full bg-[#D4AF37]/60" style={{ width: `${c.progress}%` }} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Case detail */}
      {selected && (
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 max-w-4xl">
            {/* Case header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-sm text-white/40">{selected.id}</span>
                  <StatusPill status={selected.status} />
                  {selected.urgency === 'high' && (
                    <span className="flex items-center gap-1 text-[10px] text-red-400 font-bold px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20">
                      ⚡ High Priority
                    </span>
                  )}
                </div>
                <h2 className="text-white text-2xl font-black mb-1">{selected.type}</h2>
                <p className="text-white/40 text-sm">vs. {selected.opponent}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <ProgressRing pct={selected.progress} size={70} stroke={5} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-black text-white">{selected.progress}%</span>
                    <span className="text-[9px] text-white/30">done</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { label: 'Court', value: selected.court, icon: Landmark },
                { label: 'Filed', value: new Date(selected.filed).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' }), icon: Calendar },
                { label: 'Current Stage', value: selected.stage, icon: Flag },
                { label: 'AI Confidence', value: `${selected.confidence}%`, icon: Brain },
                { label: 'Next Hearing', value: selected.nextHearing ? new Date(selected.nextHearing).toLocaleDateString('en-KE', { day: 'numeric', month: 'short' }) : '—', icon: Clock },
                { label: 'Advocate', value: selected.advocate, icon: UserCheck },
              ].map(({ label, value, icon: Icon }, i) => (
                <Card key={i} className="p-3">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Icon style={{ width: 12, height: 12 }} className="text-[#D4AF37]/60" />
                    <span className="text-[10px] text-white/30 uppercase tracking-wider">{label}</span>
                  </div>
                  <p className="text-white text-xs font-semibold">{value}</p>
                </Card>
              ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-5 p-1 rounded-xl bg-white/4 border border-white/6 w-fit">
              {['timeline', 'documents', 'evidence', 'payments'].map(t => (
                <button key={t} onClick={() => setTab(t)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold capitalize transition-all ${tab === t ? 'bg-[#D4AF37] text-[#12141f]' : 'text-white/40 hover:text-white/60'}`}>
                  {t}
                </button>
              ))}
            </div>

            {/* Tab content */}
            {tab === 'timeline' && (
              <Card className="p-5">
                <h3 className="text-white text-sm font-semibold mb-5">Case Timeline</h3>
                <div className="relative">
                  <div className="absolute left-4 top-2 bottom-2 w-px bg-white/8" />
                  <div className="space-y-4">
                    {selected.timeline.map((t, i) => (
                      <div key={i} className="flex items-start gap-4 relative">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 border-2 ${t.done ? 'bg-[#D4AF37]/20 border-[#D4AF37]' : t.active ? 'bg-[#D4AF37]/10 border-[#D4AF37]/50' : 'bg-white/5 border-white/15'}`}>
                          {t.done ? <CheckCircle style={{ width: 14, height: 14 }} className="text-[#D4AF37]" /> :
                            t.active ? <div className="w-3 h-3 rounded-full bg-[#D4AF37]/60 animate-pulse" /> :
                              <Circle style={{ width: 10, height: 10 }} className="text-white/20" />}
                        </div>
                        <div className="flex-1 pb-2">
                          <div className="flex items-center justify-between">
                            <p className={`text-sm font-semibold ${t.done ? 'text-white' : t.active ? 'text-[#D4AF37]' : 'text-white/30'}`}>{t.label}</p>
                            <span className={`text-xs font-bold ${t.done ? 'text-[#D4AF37]' : t.active ? 'text-[#D4AF37]/70' : 'text-white/20'}`}>{t.date}</span>
                          </div>
                          {t.active && (
                            <p className="text-[11px] text-[#D4AF37]/60 mt-0.5">Current stage · In progress</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            )}

            {tab === 'documents' && (
              <div className="space-y-3">
                {selected.docs.map((doc, i) => (
                  <Card key={i} className="flex items-center gap-4 p-4 hover:border-white/14 transition-colors">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center">
                      <FileText style={{ width: 16, height: 16 }} className="text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">{doc}</p>
                      <p className="text-white/30 text-xs">Case {selected.id}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                        <Eye style={{ width: 14, height: 14 }} className="text-white/40" />
                      </button>
                      <button className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                        <Download style={{ width: 14, height: 14 }} className="text-white/40" />
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {tab === 'evidence' && (
              <div className="space-y-3">
                {selected.evidence.length === 0 ? (
                  <Card className="p-10 text-center">
                    <Shield style={{ width: 28, height: 28 }} className="text-white/15 mx-auto mb-2" />
                    <p className="text-white/30 text-sm">No evidence uploaded yet</p>
                  </Card>
                ) : selected.evidence.map((ev, i) => {
                  const isVideo = ev.endsWith('.mp4');
                  const isAudio = ev.endsWith('.mp3');
                  const color = isVideo ? 'text-red-400' : isAudio ? 'text-purple-400' : 'text-blue-400';
                  const bg = isVideo ? 'bg-red-500/15 border-red-500/25' : isAudio ? 'bg-purple-500/15 border-purple-500/25' : 'bg-blue-500/15 border-blue-500/25';
                  const Icon = isVideo ? Video : isAudio ? Mic : Image;
                  return (
                    <Card key={i} className="flex items-center gap-4 p-4 hover:border-white/14 transition-colors">
                      <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center border`}>
                        <Icon style={{ width: 16, height: 16 }} className={color} />
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium">{ev}</p>
                        <p className="text-white/30 text-xs">{isVideo ? 'Video Evidence' : isAudio ? 'Audio Recording' : 'Document/Image'} · Encrypted</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-green-500/10 border border-green-500/20">
                          <Lock style={{ width: 10, height: 10 }} className="text-green-400" />
                          <span className="text-[10px] text-green-400 font-bold">Secured</span>
                        </div>
                        <button className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                          <Download style={{ width: 14, height: 14 }} className="text-white/40" />
                        </button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}

            {tab === 'payments' && (() => {
              const pay = PAYMENTS.find(p => p.caseId === selected.id);
              if (!pay) return <Card className="p-6 text-center"><p className="text-white/30 text-sm">No payment plan for this case</p></Card>;
              const pct = Math.round((pay.paid / pay.total) * 100);
              return (
                <div className="space-y-4">
                  <Card className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white font-semibold text-sm">Payment Overview</h3>
                      <div className="text-right">
                        <p className="text-[#D4AF37] font-black text-lg">KES {(pay.paid / 1000).toFixed(1)}K</p>
                        <p className="text-white/30 text-[11px]">of KES {(pay.total / 1000).toFixed(1)}K</p>
                      </div>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/6 overflow-hidden mb-1">
                      <div className="h-full rounded-full bg-[#D4AF37]" style={{ width: `${pct}%` }} />
                    </div>
                    <p className="text-white/30 text-[11px]">{pct}% of total legal fees paid · Protected by escrow</p>
                  </Card>
                  <div className="space-y-2">
                    {pay.milestones.map((m, i) => (
                      <Card key={i} className={`flex items-center gap-4 p-4 ${m.active ? 'border-[#D4AF37]/30 bg-[#D4AF37]/4' : ''}`}>
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center border flex-shrink-0 ${m.paid ? 'bg-green-500/15 border-green-500/30' : m.active ? 'bg-[#D4AF37]/15 border-[#D4AF37]/30' : 'bg-white/5 border-white/10'}`}>
                          {m.paid ? <CheckCircle style={{ width: 16, height: 16 }} className="text-green-400" /> :
                            m.active ? <Clock style={{ width: 16, height: 16 }} className="text-[#D4AF37]" /> :
                              <Circle style={{ width: 14, height: 14 }} className="text-white/20" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className={`text-sm font-semibold ${m.paid ? 'text-green-400' : m.active ? 'text-[#D4AF37]' : 'text-white/40'}`}>{m.label} · {m.pct}%</p>
                            <p className={`text-sm font-black ${m.paid ? 'text-green-400' : m.active ? 'text-[#D4AF37]' : 'text-white/30'}`}>KES {m.amount.toLocaleString()}</p>
                          </div>
                          <p className="text-white/25 text-xs">{m.paid ? `Paid ${m.date}` : m.active ? `Due ${m.due}` : `Due ${m.due || 'TBD'}`}</p>
                        </div>
                        {m.active && (
                          <button className="px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#c9a430] text-[#12141f] text-xs font-black transition-colors whitespace-nowrap">
                            Pay via M-Pesa
                          </button>
                        )}
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}

