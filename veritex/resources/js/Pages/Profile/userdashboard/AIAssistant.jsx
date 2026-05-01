import React, { useState, useRef, useEffect } from 'react';
import { Plus, Zap, Brain, ChevronDown, Loader, Mic, Send } from 'lucide-react';
import { CASES, AI_MESSAGES } from './data/mockData';


export default function AIView() {
  const [messages, setMessages] = useState(AI_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showReasoning, setShowReasoning] = useState({});
  const bottomRef = useRef(null);

  const SUGGESTIONS = [
    'What are my rights if my landlord evicts me without notice?',
    'Can I sue my employer for constructive dismissal?',
    'What documents do I need for a title deed transfer?',
    'How long does a High Court land case take?',
    'What is the limitation period for breach of contract?',
    'Can I get an injunction against my business partner?',
  ];

  const simulateResponse = (q) => {
    const reasoning = `1. Identifying legal area: "${q}" relates to ${q.toLowerCase().includes('land') ? 'land law' : q.toLowerCase().includes('employ') ? 'employment law' : 'general civil law'}.\n2. Searching applicable statutes and case law...\n3. Retrieving precedents from Kenya Law Reports...\n4. Cross-referencing Constitution of Kenya 2010, Chapter 4 (Bill of Rights)...\n5. Synthesising response with applicable sections...`;
    const responses = {
      default: 'Under Kenyan law, your situation engages several key provisions. The relevant statute is the **Land Act 2012** and the **Land Registration Act 2012**, which together govern ownership, transfer, and dispute resolution. Courts with jurisdiction include the Environment and Land Court, established under Article 162(2)(b) of the Constitution. I recommend filing within the 12-year limitation period under the Limitation of Actions Act. Would you like me to draft a demand letter or identify the correct court division for your matter?',
    };
    return { text: responses.default, reasoning };
  };

  const send = (text = input) => {
    if (!text.trim() || loading) return;
    const userMsg = { role: 'user', text };
    setMessages(m => [...m, userMsg]);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      const resp = simulateResponse(text);
      setMessages(m => [...m, { role: 'assistant', text: resp.text, thinking: resp.reasoning }]);
      setLoading(false);
    }, 1800);
  };

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);

  return (
    <div className="flex h-full overflow-hidden">
      {/* Sidebar — suggestions & history */}
      <div className="w-64 border-r border-white/6 flex flex-col shrink-0 bg-[#0d0f18]/50">
        <div className="p-4 border-b border-white/6">
          <button onClick={() => setMessages(AI_MESSAGES)} className="w-full flex items-center gap-2 py-2.5 px-3 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold hover:bg-[#D4AF37]/20 transition-colors">
            <Plus style={{ width: 14, height: 14 }} /> New Conversation
          </button>
        </div>
        <div className="p-4 flex-1 overflow-y-auto">
          <p className="text-white/25 text-[10px] uppercase tracking-widest mb-3 font-semibold">Quick Questions</p>
          <div className="space-y-1.5">
            {SUGGESTIONS.map((s, i) => (
              <button key={i} onClick={() => send(s)}
                className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/4 text-white/40 hover:text-white/70 text-[11px] leading-relaxed transition-colors border border-transparent hover:border-white/6">
                {s}
              </button>
            ))}
          </div>
          <p className="text-white/25 text-[10px] uppercase tracking-widest mb-3 font-semibold mt-5">My Cases</p>
          {CASES.map(c => (
            <button key={c.id} onClick={() => send(`What is the current legal position in my ${c.type} case ${c.id}?`)}
              className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/4 text-white/40 hover:text-white/70 text-[11px] transition-colors">
              {c.id} — {c.type}
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-white/6">
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#D4AF37]/5 border border-[#D4AF37]/15">
            <div className="flex items-center gap-1.5">
              <Zap style={{ width: 12, height: 12 }} className="text-[#D4AF37]" />
              <span className="text-[#D4AF37] text-xs font-bold">480 credits</span>
            </div>
            <span className="text-white/25 text-[10px]">~16 queries</span>
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Chat header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/25 flex items-center justify-center">
              <Brain style={{ width: 18, height: 18 }} className="text-[#D4AF37]" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Veritex AI Legal Assistant</p>
              <p className="text-[#D4AF37] text-[10px] font-bold flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" /> Online · Constitution + Kenya Law corpus
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-2.5 py-1 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold">
              🔒 Privileged
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border ${m.role === 'assistant' ? 'bg-[#D4AF37]/15 border-[#D4AF37]/30' : 'bg-[#6366F1]/20 border-[#6366F1]/30'}`}>
                {m.role === 'assistant' ? <Brain style={{ width: 14, height: 14 }} className="text-[#D4AF37]" /> : <span className="text-[10px] font-black text-[#6366F1]">JM</span>}
              </div>
              <div className={`max-w-2xl ${m.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-2`}>
                {/* Reasoning chain */}
                {m.thinking && (
                  <div className="w-full">
                    <button onClick={() => setShowReasoning(s => ({ ...s, [i]: !s[i] }))}
                      className="flex items-center gap-1.5 text-[10px] text-white/30 hover:text-white/50 transition-colors mb-1">
                      <Brain style={{ width: 10, height: 10 }} />
                      {showReasoning[i] ? 'Hide' : 'Show'} AI reasoning chain
                      <ChevronDown style={{ width: 10, height: 10 }} className={`transition-transform ${showReasoning[i] ? 'rotate-180' : ''}`} />
                    </button>
                    {showReasoning[i] && (
                      <div className="p-3 rounded-xl bg-[#D4AF37]/4 border border-[#D4AF37]/15 mb-2">
                        <p className="text-[10px] text-white/30 font-mono whitespace-pre-line leading-relaxed">{m.thinking}</p>
                      </div>
                    )}
                  </div>
                )}
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${m.role === 'assistant' ? 'bg-[#1a1d2e] border border-white/8 text-white/80 rounded-tl-sm' : 'bg-[#6366F1]/20 border border-[#6366F1]/25 text-white/90 rounded-tr-sm'}`}>
                  {m.text}
                </div>
                {m.role === 'assistant' && (
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-white/20">5 credits used</span>
                    <button className="text-[10px] text-[#D4AF37] hover:underline font-semibold">Escalate to Lawyer →</button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center">
                <Brain style={{ width: 14, height: 14 }} className="text-[#D4AF37]" />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-[#1a1d2e] border border-white/8 rounded-tl-sm">
                <div className="flex items-center gap-2">
                  <Loader style={{ width: 14, height: 14 }} className="text-[#D4AF37] animate-spin" />
                  <span className="text-white/40 text-xs">Analysing Kenya law corpus...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/6">
          <div className="flex items-end gap-3 p-3 rounded-2xl bg-[#1a1d2e] border border-white/10 focus-within:border-[#D4AF37]/40 transition-colors">
            <textarea value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder="Describe your legal situation or ask any question..."
              rows={2} className="flex-1 bg-transparent text-white/80 text-sm outline-none resize-none placeholder:text-white/20 leading-relaxed" />
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors" title="Voice input">
                <Mic style={{ width: 14, height: 14 }} className="text-white/40" />
              </button>
              <button onClick={() => send()}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${input.trim() ? 'bg-[#D4AF37] hover:bg-[#c9a430]' : 'bg-white/5'}`}>
                <Send style={{ width: 15, height: 15 }} className={input.trim() ? 'text-[#12141f]' : 'text-white/20'} />
              </button>
            </div>
          </div>
          <p className="text-white/20 text-[10px] mt-2 text-center">Responses are AI-generated and not legal advice. Escalate to a verified advocate for representation.</p>
        </div>
      </div>
    </div>
  );
}

