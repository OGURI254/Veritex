import React, { useState } from 'react';
import { Search, BadgeCheck, Phone, Video, MoreHorizontal, Paperclip, FileText, Send, Lock } from 'lucide-react';
import { MESSAGES } from './data/mockData';
import { Avatar } from './components/SharedUI';


export default function MessagesView() {
  const [selected, setSelected] = useState(MESSAGES[0]);
  const [input, setInput] = useState('');
  const [threads, setThreads] = useState(MESSAGES);

  const sendMsg = () => {
    if (!input.trim()) return;
    setThreads(prev => prev.map(t => t.id === selected.id
      ? { ...t, thread: [...t.thread, { sender: 'You', text: input, time: 'Just now', mine: true }] }
      : t
    ));
    setSelected(s => ({ ...s, thread: [...s.thread, { sender: 'You', text: input, time: 'Just now', mine: true }] }));
    setInput('');
  };

  return (
    <div className="flex h-full overflow-hidden">
      {/* Thread list */}
      <div className="w-72 border-r border-white/6 flex flex-col shrink-0">
        <div className="p-4 border-b border-white/6">
          <h2 className="text-white font-semibold text-sm mb-3">Conversations</h2>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/8">
            <Search style={{ width: 13, height: 13 }} className="text-white/30" />
            <input className="bg-transparent text-white/60 text-xs outline-none w-full placeholder:text-white/20" placeholder="Search messages..." />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {threads.map(t => (
            <button key={t.id} onClick={() => setSelected(t)}
              className={`w-full text-left px-4 py-4 border-b border-white/4 hover:bg-white/3 transition-colors ${selected?.id === t.id ? 'bg-[#D4AF37]/5 border-l-2 border-l-[#D4AF37]' : ''}`}>
              <div className="flex items-start gap-3">
                <Avatar initials={t.initials} color={t.color} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-white text-xs font-semibold">{t.from}</p>
                    <p className="text-white/25 text-[10px]">{t.time}</p>
                  </div>
                  <p className="text-[10px] text-white/30 font-mono mb-1">{t.caseId}</p>
                  <p className="text-white/40 text-[11px] truncate">{t.preview}</p>
                </div>
                {t.unread > 0 && <span className="w-5 h-5 rounded-full bg-[#D4AF37] text-[#12141f] text-[9px] font-black flex items-center justify-center flex-shrink-0">{t.unread}</span>}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Conversation */}
      {selected && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/6">
            <div className="flex items-center gap-3">
              <Avatar initials={selected.initials} color={selected.color} size="md" />
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-white font-semibold text-sm">{selected.from}</p>
                  <BadgeCheck style={{ width: 14, height: 14 }} className="text-[#D4AF37]" />
                </div>
                <p className="text-white/30 text-xs">Advocate · {selected.caseId}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Phone style={{ width: 15, height: 15 }} className="text-white/40" />
              </button>
              <button className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Video style={{ width: 15, height: 15 }} className="text-white/40" />
              </button>
              <button className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center hover:bg-white/10 transition-colors">
                <MoreHorizontal style={{ width: 15, height: 15 }} className="text-white/40" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div className="flex items-center gap-3 my-2">
              <div className="flex-1 h-px bg-white/5" />
              <span className="text-[10px] text-white/20 px-2">End-to-end encrypted · Attorney-client privileged</span>
              <div className="flex-1 h-px bg-white/5" />
            </div>
            {selected.thread.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.mine ? 'flex-row-reverse' : ''}`}>
                {!msg.mine && <Avatar initials={selected.initials} color={selected.color} size="sm" />}
                {msg.mine && <div className="w-7 h-7 rounded-full bg-[#6366F1]/20 border border-[#6366F1]/30 flex items-center justify-center text-[10px] font-black text-[#6366F1] flex-shrink-0">JM</div>}
                <div className={`max-w-md flex flex-col ${msg.mine ? 'items-end' : 'items-start'}`}>
                  <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.mine ? 'bg-[#6366F1]/20 border border-[#6366F1]/25 text-white/90 rounded-tr-sm' : 'bg-[#1a1d2e] border border-white/8 text-white/80 rounded-tl-sm'}`}>
                    {msg.text}
                  </div>
                  <p className="text-[10px] text-white/20 mt-1 px-1">{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/6">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#1a1d2e] border border-white/10 focus-within:border-[#D4AF37]/40 transition-colors">
              <div className="flex items-center gap-1.5">
                <button className="w-8 h-8 rounded-xl hover:bg-white/8 flex items-center justify-center transition-colors" title="Attach file">
                  <Paperclip style={{ width: 15, height: 15 }} className="text-white/30 hover:text-white/60" />
                </button>
                <button className="w-8 h-8 rounded-xl hover:bg-white/8 flex items-center justify-center transition-colors" title="Upload document">
                  <FileText style={{ width: 15, height: 15 }} className="text-white/30 hover:text-white/60" />
                </button>
              </div>
              <input value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMsg()}
                placeholder="Type a message to your advocate..."
                className="flex-1 bg-transparent text-white/80 text-sm outline-none placeholder:text-white/20" />
              <button onClick={sendMsg}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${input.trim() ? 'bg-[#D4AF37] hover:bg-[#c9a430]' : 'bg-white/5'}`}>
                <Send style={{ width: 15, height: 15 }} className={input.trim() ? 'text-[#12141f]' : 'text-white/20'} />
              </button>
            </div>
            <div className="flex items-center gap-2 mt-2 px-1">
              <Lock style={{ width: 10, height: 10 }} className="text-green-400" />
              <span className="text-[10px] text-white/20">Messages are encrypted and protected by legal professional privilege</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

