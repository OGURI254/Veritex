import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, BadgeCheck, Phone, Video, MoreHorizontal, Paperclip,
  FileText, Send, Lock, Shield, Star, Reply, Forward, Copy,
  Trash2, AlertTriangle, Link2, BookOpen, Download, Scale,
  Users, User, Mic, MicOff, Eye, Clock, Check, CheckCheck,
  Plus, X, ChevronDown, ChevronRight, Brain, Sparkles, Hash,
  Image, FileAudio, FileVideo, Gavel, ClipboardList, Bell,
  MessageSquare, Archive, MoreVertical, Pin, Loader, Upload,
  CheckCircle, AlertCircle, UserPlus, ExternalLink, Bookmark,
  PenTool, Zap, Filter, Info, Camera, FolderOpen, Activity,
  RefreshCw, Settings, Layers, Globe, Calendar, ArrowLeft,
  Smile, Tag, Flag, Volume2, StopCircle, Play, Square,
  ChevronLeft, PhoneOff, VideoOff, Maximize2, Minimize2,
  AtSign, Hash as HashIcon, Edit3, FileSearch, Clipboard,
  CornerUpLeft, CornerUpRight, Menu, PanelRight, Bot, Zap as ZapIcon,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────────── */
const GOLD = '#D4AF37';
const DARK = '#12141f';
const DARK2 = '#1a1d2e';
const DARK3 = '#0e1019';

const EMOJI_REACTIONS = ['👍', '❤️', '😂', '😮', '🙏', '⚖️', '✅', '🔥'];

const PARTICIPANTS_MAP = {
  'ADV-NJO': { id: 'ADV-NJO', name: 'Adv. Grace Njoroge', shortName: 'Grace', role: 'lawyer', initials: 'GN', color: '#6366F1', online: true, verified: true, specialty: 'Commercial Law', phone: '+254 712 345 678' },
  'ADV-WAN': { id: 'ADV-WAN', name: 'Adv. Wanjiru Muthoni', shortName: 'Wanjiru', role: 'lawyer', initials: 'WM', color: '#8B5CF6', online: false, verified: true, specialty: 'Land & Property', phone: '+254 722 891 023' },
  'WIT-OBI': { id: 'WIT-OBI', name: 'Peter Obiora', shortName: 'Peter', role: 'witness', initials: 'PO', color: '#10B981', online: true, verified: false, specialty: 'Land Surveyor', phone: '' },
  'WIT-ADE': { id: 'WIT-ADE', name: 'Amina Aden', shortName: 'Amina', role: 'witness', initials: 'AA', color: '#F59E0B', online: false, verified: false, specialty: 'Employer Witness', phone: '' },
  'YOU': { id: 'YOU', name: 'You (James Odhiambo)', shortName: 'You', role: 'client', initials: 'JO', color: '#D4AF37', online: true, verified: true, specialty: 'Client', phone: '' },
  'CLK-001': { id: 'CLK-001', name: 'Milimani Registry', shortName: 'Registry', role: 'official', initials: 'MR', color: '#EC4899', online: false, verified: true, specialty: 'Court Clerk', phone: '' },
};

const MOCK_THREADS = [
  {
    id: 'T001', type: 'direct', caseId: 'KE-2026-1102', caseName: 'Unfair Dismissal — Kamau Holdings', caseStatus: 'active',
    participants: ['YOU', 'ADV-NJO'], name: null, pinned: true, unread: 3,
    lastMsg: "I've reviewed the contract. Two critical clauses to address before the hearing.", lastTime: '2:41 PM', lastSender: 'ADV-NJO',
    messages: [
      { id: 'm1', sender: 'ADV-NJO', text: 'Good morning James. I have received your employment contract. Let me review and come back to you.', time: 'Apr 28, 9:00 AM', status: 'read', verified: false, evidence: false, bookmarked: false, attachments: [], reactions: {}, tags: [] },
      { id: 'm2', sender: 'YOU', text: 'Thank you Advocate Grace. Please let me know if you need anything else. I also attached the dismissal letter.', time: 'Apr 28, 9:14 AM', status: 'read', verified: false, evidence: false, bookmarked: false, attachments: [{ name: 'Dismissal_Letter_March26.pdf', type: 'pdf', size: '186 KB' }], reactions: {}, tags: [] },
      { id: 'm3', sender: 'ADV-NJO', text: 'Received. I can see they have cited "redundancy" but the timing is suspicious — just 4 days after you raised the HR complaint. This is textbook retaliatory dismissal under Section 45 of the Employment Act 2007.', time: 'Apr 28, 10:30 AM', status: 'read', verified: true, evidence: false, bookmarked: true, attachments: [], reactions: { '👍': ['YOU'] }, tags: ['#evidence', '#urgent'] },
      { id: 'm4', sender: 'ADV-NJO', text: null, time: 'Apr 28, 10:32 AM', status: 'read', verified: false, evidence: false, bookmarked: false, attachments: [], reactions: {}, tags: [], isTask: true, task: { title: 'Upload 3 months of payslips', desc: 'Required to establish your salary baseline for compensation calculation', deadline: 'By May 3, 2026', done: false } },
      { id: 'm5', sender: 'YOU', text: 'I understand. Should I also provide the WhatsApp messages between me and my manager?', time: 'Apr 28, 11:00 AM', status: 'read', verified: false, evidence: false, bookmarked: false, attachments: [], reactions: {}, tags: [] },
      { id: 'm6', sender: 'ADV-NJO', text: 'Yes — absolutely. Screenshot everything and save to your Evidence Vault. Do not delete anything. Those messages could be critical.', time: 'Apr 28, 11:05 AM', status: 'read', verified: false, evidence: true, bookmarked: false, attachments: [], reactions: { '✅': ['YOU'], '🙏': ['YOU'] }, tags: ['#evidence'] },
      { id: 'm7', sender: 'YOU', text: 'Done. I have uploaded 14 screenshots to the vault under Case KE-2026-1102.', time: 'Apr 28, 11:45 AM', status: 'read', verified: false, evidence: false, bookmarked: false, attachments: [{ name: 'WhatsApp_Screenshots_14.zip', type: 'zip', size: '4.2 MB' }], reactions: {}, tags: [] },
      { id: 'm8', sender: 'ADV-NJO', text: "I've reviewed the contract. There are two critical clauses we need to address before the hearing. I'll send a marked-up version shortly.", time: 'Today, 2:41 PM', status: 'delivered', verified: false, evidence: false, bookmarked: false, attachments: [], reactions: {}, tags: [] },
    ],
  },
  {
    id: 'T002', type: 'case-group', caseId: 'KE-2026-0889', caseName: 'Land Dispute — Kiambu County', caseStatus: 'active',
    participants: ['YOU', 'ADV-WAN', 'WIT-OBI'], name: 'Land Dispute — Case Group', pinned: false, unread: 1,
    lastMsg: 'I will be at the site on Friday at 8am for the survey.', lastTime: 'Yesterday', lastSender: 'WIT-OBI',
    messages: [
      { id: 'm1', sender: 'ADV-WAN', text: 'Welcome to the case group for KE-2026-0889. I am adding Peter Obiora — the licensed land surveyor who will verify the boundary dispute.', time: 'Apr 25, 8:00 AM', status: 'read', verified: true, evidence: false, bookmarked: false, attachments: [], reactions: {}, tags: [] },
      { id: 'm2', sender: 'WIT-OBI', text: 'Hello. I am Peter, the survey witness. I have the original beacon records from 2019 that show the true boundary placement.', time: 'Apr 25, 8:15 AM', status: 'read', verified: false, evidence: true, bookmarked: true, attachments: [], reactions: { '👍': ['YOU', 'ADV-WAN'] }, tags: ['#evidence'] },
      { id: 'm3', sender: 'WIT-OBI', text: null, time: 'Apr 25, 8:18 AM', status: 'read', verified: false, evidence: false, bookmarked: false, attachments: [{ name: 'Beacon_Records_2019.pdf', type: 'pdf', size: '2.1 MB' }, { name: 'Survey_Map_Plot4902.jpg', type: 'image', size: '3.8 MB' }], reactions: {}, tags: [] },
      { id: 'm4', sender: 'YOU', text: 'Thank you Peter. Those records are exactly what we needed. The neighbor has been claiming the fence was always there.', time: 'Apr 25, 9:00 AM', status: 'read', verified: false, evidence: false, bookmarked: false, attachments: [], reactions: {}, tags: [] },
      { id: 'm5', sender: 'ADV-WAN', text: 'Peter, can you confirm your availability for a site visit before the May 14th hearing? The court may require a fresh survey report.', time: 'Apr 27, 3:00 PM', status: 'read', verified: false, evidence: false, bookmarked: false, attachments: [], reactions: {}, tags: [] },
      { id: 'm6', sender: 'WIT-OBI', text: 'I will be at the site on Friday at 8am for the survey. I will prepare the certified report within 48 hours.', time: 'Yesterday, 5:30 PM', status: 'delivered', verified: false, evidence: false, bookmarked: false, attachments: [], reactions: {}, tags: [] },
    ],
  },
  {
    id: 'T003', type: 'direct', caseId: 'KE-2026-2241', caseName: 'GBV Protection Order', caseStatus: 'urgent',
    participants: ['YOU', 'ADV-NJO'], name: null, pinned: false, unread: 0,
    lastMsg: 'The protection order has been granted. You are safe.', lastTime: 'Apr 22', lastSender: 'ADV-NJO',
    messages: [
      { id: 'm1', sender: 'ADV-NJO', text: 'I have just received the court order. The protection order has been granted. You are safe. Next steps: 1) Keep a copy with you always, 2) Save police number 0800 720 500, 3) If respondent violates — call police immediately.', time: 'Apr 22, 4:15 PM', status: 'read', verified: true, evidence: false, bookmarked: true, attachments: [{ name: 'Protection_Order_KE2241.pdf', type: 'pdf', size: '318 KB' }], reactions: { '🙏': ['YOU'], '❤️': ['YOU'] }, tags: ['#urgent'] },
    ],
  },
  {
    id: 'T004', type: 'official', caseId: 'KE-2026-0334', caseName: 'Commercial Dispute — Invoice Recovery', caseStatus: 'active',
    participants: ['YOU', 'ADV-NJO', 'CLK-001'], name: 'Court Registry — KE-2026-0334', pinned: false, unread: 0,
    lastMsg: 'Your case has been scheduled for May 20 at 9:00 AM. Court room 5.', lastTime: 'Apr 20', lastSender: 'CLK-001',
    messages: [
      { id: 'm1', sender: 'CLK-001', text: 'This is the official communication channel for Case KE-2026-0334. All court notifications will be sent here.', time: 'Apr 18, 9:00 AM', status: 'read', verified: true, evidence: false, bookmarked: false, attachments: [], reactions: {}, tags: [] },
      { id: 'm2', sender: 'CLK-001', text: 'Your case has been scheduled for May 20, 2026 at 9:00 AM. Court room 5, Milimani Law Courts. Please ensure all parties are present.', time: 'Apr 20, 11:00 AM', status: 'read', verified: true, evidence: false, bookmarked: true, attachments: [{ name: 'Court_Summons_KE0334.pdf', type: 'pdf', size: '124 KB' }], reactions: {}, tags: [] },
    ],
  },
];

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
function roleConfig(role) {
  return ({
    lawyer: { label: 'Advocate', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/25' },
    witness: { label: 'Witness', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/25' },
    client: { label: 'Client', color: 'text-[#D4AF37]', bg: 'bg-[#D4AF37]/10', border: 'border-[#D4AF37]/25' },
    official: { label: 'Court Official', color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/25' },
  }[role] || { label: role, color: 'text-white/40', bg: 'bg-white/5', border: 'border-white/10' });
}
function caseStatusBadge(s) {
  return ({ active: { label: 'Active', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' }, urgent: { label: 'Urgent', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' }, closed: { label: 'Closed', color: 'text-white/30', bg: 'bg-white/5', border: 'border-white/10' } }[s] || {});
}
function fileIcon(type) {
  return ({ pdf: { icon: FileText, color: 'text-red-400', bg: 'bg-red-500/12' }, image: { icon: Image, color: 'text-blue-400', bg: 'bg-blue-500/12' }, zip: { icon: FolderOpen, color: 'text-yellow-400', bg: 'bg-yellow-500/12' }, audio: { icon: FileAudio, color: 'text-purple-400', bg: 'bg-purple-500/12' }, video: { icon: FileVideo, color: 'text-pink-400', bg: 'bg-pink-500/12' } }[type] || { icon: FileText, color: 'text-white/40', bg: 'bg-white/5' });
}
function getThreadDisplayName(t) {
  if (t.name) return t.name;
  const others = t.participants.filter(id => id !== 'YOU').map(id => PARTICIPANTS_MAP[id]?.shortName || id);
  return others.join(' & ');
}
function getThreadColor(t) {
  const other = t.participants.find(id => id !== 'YOU');
  return PARTICIPANTS_MAP[other]?.color || GOLD;
}
function getAllSharedFiles(t) {
  return t.messages.flatMap(m => (m.attachments || []).map(a => ({ ...a, sender: m.sender, time: m.time }))).filter(f => f.name);
}
function threadTypeIcon(type) {
  return { direct: MessageSquare, 'case-group': Users, official: Gavel }[type] || MessageSquare;
}

/* ─────────────────────────────────────────────
   AVATAR
───────────────────────────────────────────── */
function Avatar({ participant, size = 'md', showOnline = false }) {
  const sz = { xs: 'w-6 h-6 text-[9px]', sm: 'w-8 h-8 text-[10px]', md: 'w-9 h-9 text-xs', lg: 'w-11 h-11 text-sm', xl: 'w-14 h-14 text-base' }[size] || 'w-9 h-9 text-xs';
  const p = typeof participant === 'string' ? PARTICIPANTS_MAP[participant] : participant;
  if (!p) return null;
  return (
    <div className="relative flex-shrink-0">
      <div className={`${sz} rounded-full border-2 flex items-center justify-center font-black`}
        style={{ borderColor: p.color + '40', background: p.color + '20', color: p.color }}>
        {p.initials}
      </div>
      {showOnline && <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#1a1d2e] ${p.online ? 'bg-green-400' : 'bg-white/15'}`} />}
    </div>
  );
}

/* ─────────────────────────────────────────────
   TOAST
───────────────────────────────────────────── */
function Toast({ toasts, onRemove }) {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[200] flex flex-col gap-2 pointer-events-none" style={{ minWidth: 280, maxWidth: 400 }}>
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div key={t.id}
            initial={{ opacity: 0, y: -16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-2xl shadow-black/60 pointer-events-auto ${t.type === 'success' ? 'bg-green-500/10 border-green-500/25 text-green-400' :
                t.type === 'error' ? 'bg-red-500/10 border-red-500/25 text-red-400' :
                  t.type === 'gold' ? 'bg-[#D4AF37]/10 border-[#D4AF37]/25 text-[#D4AF37]' :
                    'bg-[#1a1d2e] border-white/12 text-white/70'
              }`}>
            <span className="text-sm font-semibold flex-1">{t.msg}</span>
            <button onClick={() => onRemove(t.id)} className="opacity-50 hover:opacity-100 flex-shrink-0"><X className="w-3.5 h-3.5" /></button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CALL MODAL
───────────────────────────────────────────── */
function CallModal({ thread, type, onEnd }) {
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [camOff, setCamOff] = useState(false);
  const other = thread.participants.find(id => id !== 'YOU');
  const p = PARTICIPANTS_MAP[other];

  useEffect(() => {
    const i = setInterval(() => setDuration(d => d + 1), 1000);
    return () => clearInterval(i);
  }, []);

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] flex items-center justify-center bg-black/90 backdrop-blur-xl">
      <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
        className="relative w-full max-w-sm mx-4 rounded-3xl overflow-hidden border border-white/8"
        style={{ background: `linear-gradient(135deg, ${p?.color || GOLD}22 0%, #1a1d2e 60%)` }}>
        {type === 'video' && (
          <div className="w-full h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            {camOff ? <VideoOff className="w-10 h-10 text-white/20" /> :
              <div className="text-white/10 text-xs">Camera preview</div>}
            <div className="absolute top-3 right-3 w-20 h-14 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center">
              <div className="text-[9px] text-white/20">Your camera</div>
            </div>
          </div>
        )}
        <div className={`${type === 'voice' ? 'pt-12 pb-8' : 'pt-4 pb-6'} px-6 flex flex-col items-center`}>
          {type === 'voice' && <Avatar participant={p} size="xl" showOnline />}
          <p className="text-white font-black text-xl mt-4">{p?.name}</p>
          <span className={`text-xs mt-1 font-mono ${duration > 0 ? 'text-green-400' : 'text-white/40'}`}>
            {duration > 0 ? fmt(duration) : `${type === 'video' ? 'Video' : 'Voice'} call…`}
          </span>
          <p className="text-white/25 text-xs mt-1">{p?.specialty}</p>
          <div className="flex items-center gap-4 mt-8">
            <button onClick={() => setMuted(v => !v)}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${muted ? 'bg-red-500/20 border-red-500/30 text-red-400' : 'bg-white/8 border-white/12 text-white/60'}`}>
              {muted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            {type === 'video' && (
              <button onClick={() => setCamOff(v => !v)}
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${camOff ? 'bg-red-500/20 border-red-500/30 text-red-400' : 'bg-white/8 border-white/12 text-white/60'}`}>
                {camOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
              </button>
            )}
            <button onClick={onEnd}
              className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-all shadow-lg shadow-red-500/30">
              <PhoneOff className="w-6 h-6 text-white" />
            </button>
            <button className="w-12 h-12 rounded-full bg-white/8 border border-white/12 text-white/60 flex items-center justify-center">
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   FORWARD MODAL
───────────────────────────────────────────── */
function ForwardModal({ msg, threads, onForward, onClose }) {
  const [selected, setSelected] = useState([]);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[120] flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}>
      <motion.div initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '100%', opacity: 0 }}
        onClick={e => e.stopPropagation()}
        className="w-full max-w-md rounded-t-3xl sm:rounded-3xl border border-white/8 bg-[#1a1d2e] shadow-2xl overflow-hidden">
        <div className="w-10 h-1 bg-white/15 rounded-full mx-auto mt-3 mb-1 sm:hidden" />
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/6">
          <h3 className="text-white font-bold flex items-center gap-2"><CornerUpRight className="w-4 h-4 text-[#D4AF37]" /> Forward Message</h3>
          <button onClick={onClose} className="text-white/30 hover:text-white/60"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-4 border-b border-white/5">
          <div className="p-3 rounded-xl bg-white/4 border border-white/6 text-white/50 text-xs italic">
            "{(msg.text || '[attachment]').substring(0, 80)}{(msg.text || '').length > 80 ? '…' : ''}"
          </div>
        </div>
        <div className="p-4 space-y-2 max-h-64 overflow-y-auto">
          <p className="text-[10px] text-white/25 uppercase tracking-widest font-bold mb-2">Forward to</p>
          {threads.map(t => {
            const name = getThreadDisplayName(t);
            const sel = selected.includes(t.id);
            return (
              <button key={t.id} onClick={() => setSelected(prev => sel ? prev.filter(x => x !== t.id) : [...prev, t.id])}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all text-left ${sel ? 'border-[#D4AF37]/35 bg-[#D4AF37]/8' : 'border-white/6 bg-white/3 hover:border-white/12'}`}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
                  style={{ background: getThreadColor(t) + '25', color: getThreadColor(t) }}>
                  {name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/80 text-sm font-semibold truncate">{name}</p>
                  {t.caseId && <p className="text-white/25 text-[10px] font-mono">{t.caseId}</p>}
                </div>
                {sel && <CheckCircle className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />}
              </button>
            );
          })}
        </div>
        <div className="flex gap-3 p-4 border-t border-white/5">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-white/5 border border-white/8 text-white/40 text-sm font-semibold">Cancel</button>
          <button onClick={() => { onForward(selected, msg); onClose(); }} disabled={selected.length === 0}
            className="flex-1 py-3 rounded-xl bg-[#D4AF37] disabled:opacity-30 hover:bg-[#c9a430] text-[#12141f] text-sm font-black flex items-center justify-center gap-2 transition-all">
            <Send className="w-4 h-4" /> Forward {selected.length > 0 ? `(${selected.length})` : ''}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   EMOJI PICKER
───────────────────────────────────────────── */
function EmojiPicker({ onPick, onClose }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.85, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.85 }}
      className="absolute bottom-full mb-2 left-0 z-50 flex gap-1 p-2 rounded-2xl border border-white/10 bg-[#1a1d2e] shadow-2xl">
      {EMOJI_REACTIONS.map(e => (
        <button key={e} onClick={() => { onPick(e); onClose(); }}
          className="w-9 h-9 rounded-xl text-xl hover:bg-white/10 flex items-center justify-center transition-all hover:scale-110">
          {e}
        </button>
      ))}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MESSAGE CONTEXT MENU (bottom sheet on mobile)
───────────────────────────────────────────── */
function MessageContextMenu({ msg, mine, isMobile, onAction, onClose }) {
  const items = [
    { icon: CornerUpLeft, label: 'Reply', action: 'reply', color: 'text-white/70' },
    { icon: CornerUpRight, label: 'Forward', action: 'forward', color: 'text-white/70' },
    { icon: Copy, label: 'Copy text', action: 'copy', color: 'text-white/70' },
    { icon: Bookmark, label: msg.bookmarked ? 'Remove Bookmark' : 'Bookmark', action: 'bookmark', color: msg.bookmarked ? 'text-[#D4AF37]' : 'text-white/70' },
    { icon: Smile, label: 'React', action: 'react', color: 'text-white/70' },
    { divider: true },
    { icon: AlertTriangle, label: msg.evidence ? 'Remove Evidence' : 'Mark as Evidence', action: 'evidence', color: msg.evidence ? 'text-[#D4AF37]' : 'text-amber-400' },
    { icon: Link2, label: 'Link to Case', action: 'linkcase', color: 'text-blue-400' },
    { icon: ClipboardList, label: 'Convert to Task', action: 'totask', color: 'text-purple-400' },
    { icon: Pin, label: 'Pin Message', action: 'pin', color: 'text-white/60' },
    { divider: true },
    ...(mine ? [{ icon: Trash2, label: 'Delete', action: 'delete', color: 'text-red-400' }] : []),
  ];

  if (isMobile) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 z-[100]" onClick={onClose}>
        <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          onClick={e => e.stopPropagation()}
          className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-[#1a1d2e] border-t border-white/10 overflow-hidden">
          <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mt-3 mb-2" />
          {msg.text && (
            <div className="px-5 py-3 border-b border-white/5">
              <p className="text-white/35 text-xs italic line-clamp-2">"{msg.text}"</p>
            </div>
          )}
          <div className="px-4 py-3 border-b border-white/5">
            <div className="flex gap-2 justify-between">
              {EMOJI_REACTIONS.map(e => (
                <button key={e} onClick={() => { onAction('react', msg, e); onClose(); }}
                  className="flex-1 py-2 rounded-xl text-xl hover:bg-white/10 flex items-center justify-center transition-all">{e}</button>
              ))}
            </div>
          </div>
          <div className="p-2 pb-8">
            {items.map((item, i) => item.divider ? (
              <div key={i} className="my-1 border-t border-white/5" />
            ) : (
              <button key={i} onClick={() => { onAction(item.action, msg); onClose(); }}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium hover:bg-white/5 transition-colors text-left ${item.color}`}>
                <item.icon className="w-4 h-4 flex-shrink-0" />
                {item.label}
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.92, y: -4 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.12 }}
      className={`absolute ${mine ? 'right-0 mr-0' : 'left-0'} top-0 z-50 w-52 rounded-2xl border border-white/8 bg-[#1a1d2e] shadow-2xl py-1`}
      style={{ marginTop: -8 }}>
      <div className="flex gap-1 px-2 py-2 border-b border-white/5">
        {EMOJI_REACTIONS.map(e => (
          <button key={e} onClick={() => { onAction('react', msg, e); onClose(); }}
            className="flex-1 py-1.5 rounded-lg text-base hover:bg-white/10 flex items-center justify-center transition-all">{e}</button>
        ))}
      </div>
      {items.map((item, i) => item.divider ? (
        <div key={i} className="my-1 border-t border-white/5" />
      ) : (
        <button key={i} onClick={() => { onAction(item.action, msg); onClose(); }}
          className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium hover:bg-white/5 transition-colors text-left ${item.color}`}>
          <item.icon className="w-3.5 h-3.5 flex-shrink-0" />
          {item.label}
        </button>
      ))}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   ATTACHMENT BUBBLE
───────────────────────────────────────────── */
function AttachmentBubble({ file, mine }) {
  const cfg = fileIcon(file.type);
  const Icon = cfg.icon;
  return (
    <div className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-white/8 ${cfg.bg} mt-1.5 cursor-pointer hover:border-white/20 transition-all group max-w-[220px] active:scale-95`}>
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${cfg.bg}`}>
        <Icon className={`w-4 h-4 ${cfg.color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white/80 text-[11px] font-semibold truncate">{file.name}</p>
        <p className="text-white/30 text-[10px]">{file.size}</p>
      </div>
      <Download className="w-3.5 h-3.5 text-white/20 group-hover:text-white/60 transition-colors flex-shrink-0" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   TASK BUBBLE
───────────────────────────────────────────── */
function TaskBubble({ task, onToggle }) {
  return (
    <motion.div whileTap={{ scale: 0.98 }}
      className={`px-4 py-3.5 rounded-2xl border max-w-[280px] ${task.done ? 'border-green-500/25 bg-green-500/5' : 'border-[#D4AF37]/25 bg-[#D4AF37]/5'}`}>
      <div className="flex items-start gap-2.5">
        <button onClick={onToggle} className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${task.done ? 'bg-green-500 border-green-500' : 'border-[#D4AF37]/60 hover:border-[#D4AF37]'}`}>
          {task.done && <Check className="w-3 h-3 text-white" />}
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-1.5 mb-1">
            <ClipboardList className={`w-3 h-3 ${task.done ? 'text-green-400' : 'text-[#D4AF37]'}`} />
            <span className={`text-[9px] font-black uppercase tracking-widest ${task.done ? 'text-green-400' : 'text-[#D4AF37]'}`}>Task Request</span>
          </div>
          <p className={`text-xs font-bold mb-1 ${task.done ? 'text-white/40 line-through' : 'text-white/85'}`}>{task.title}</p>
          <p className="text-white/40 text-[11px] mb-2 leading-relaxed">{task.desc}</p>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-white/25" />
            <span className="text-white/30 text-[10px]">{task.deadline}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   VOICE NOTE BUBBLE
───────────────────────────────────────────── */
function VoiceNoteBubble({ note, mine }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (!playing) return;
    const i = setInterval(() => setProgress(p => { if (p >= 100) { setPlaying(false); return 0; } return p + 2; }), 100);
    return () => clearInterval(i);
  }, [playing]);
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border max-w-[220px] mt-1.5 ${mine ? 'border-[#D4AF37]/20 bg-[#D4AF37]/8' : 'border-white/8 bg-white/4'}`}>
      <button onClick={() => setPlaying(v => !v)}
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${mine ? 'bg-[#D4AF37] text-[#12141f]' : 'bg-white/12 text-white/70'}`}>
        {playing ? <Square className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
      </button>
      <div className="flex-1 min-w-0">
        <div className="h-1 rounded-full bg-white/10 overflow-hidden">
          <motion.div className={`h-full rounded-full ${mine ? 'bg-[#D4AF37]' : 'bg-white/40'}`} style={{ width: `${progress}%` }} />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-white/25">Voice note</span>
          <span className="text-[10px] text-white/25">{note.duration}</span>
        </div>
      </div>
      {note.transcription && (
        <div className="absolute -bottom-6 left-0 right-0 text-[9px] text-white/25 italic truncate px-1">{note.transcription}</div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   SINGLE MESSAGE
───────────────────────────────────────────── */
function Message({ msg, thread, onAction, isMobile }) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const longPressTimer = useRef(null);

  const mine = msg.sender === 'YOU';
  const sender = PARTICIPANTS_MAP[msg.sender];

  useEffect(() => {
    if (!showMenu) return;
    const h = (e) => { if (!menuRef.current?.contains(e.target)) setShowMenu(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [showMenu]);

  // Long press for mobile
  const handleTouchStart = () => {
    longPressTimer.current = setTimeout(() => setShowMenu(true), 500);
  };
  const handleTouchEnd = () => clearTimeout(longPressTimer.current);

  const totalReactions = Object.entries(msg.reactions || {}).filter(([, users]) => users.length > 0);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}
      className={`flex gap-2.5 group relative ${mine ? 'flex-row-reverse' : ''}`}
      onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onTouchMove={handleTouchEnd}>

      {/* Avatar */}
      <div className="flex-shrink-0 self-end">
        {!mine ? (
          <Avatar participant={msg.sender} size="sm" showOnline />
        ) : (
          <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 flex items-center justify-center text-[10px] font-black text-[#D4AF37]">JO</div>
        )}
      </div>

      {/* Content */}
      <div className={`flex flex-col ${mine ? 'items-end' : 'items-start'} max-w-[75%] sm:max-w-[65%]`}>
        {/* Sender name for groups */}
        {!mine && thread.participants.length > 2 && (
          <span className="text-[10px] font-bold mb-1 px-1" style={{ color: sender?.color }}>
            {sender?.shortName} · <span className="text-white/25 font-normal">{roleConfig(sender?.role).label}</span>
          </span>
        )}

        {/* Reply ref */}
        {msg.replyTo && (
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/8 mb-1.5 max-w-full cursor-pointer hover:bg-white/8 ${mine ? 'flex-row-reverse' : ''}`}>
            <CornerUpLeft className="w-3 h-3 text-white/20 flex-shrink-0" />
            <p className="text-white/30 text-[10px] truncate">{msg.replyTo}</p>
          </div>
        )}

        {/* Task bubble */}
        {msg.isTask && <TaskBubble task={msg.task} onToggle={() => onAction('toggleTask', msg)} />}

        {/* Voice note */}
        {msg.isVoiceNote && <VoiceNoteBubble note={msg.voiceNote} mine={mine} />}

        {/* Text bubble */}
        {msg.text && (
          <div
            className={`relative px-4 py-3 rounded-2xl text-sm leading-relaxed break-words select-text ${mine
                ? 'bg-[#D4AF37]/12 border border-[#D4AF37]/20 text-white/90 rounded-tr-sm'
                : msg.verified
                  ? 'bg-indigo-500/10 border border-indigo-500/20 text-white/85 rounded-tl-sm'
                  : msg.evidence
                    ? 'bg-amber-500/8 border border-amber-500/20 text-white/85 rounded-tl-sm'
                    : 'bg-[#1a1d2e] border border-white/8 text-white/80 rounded-tl-sm'
              }`}>
            {msg.verified && !mine && (
              <div className="flex items-center gap-1.5 mb-1.5 pb-1.5 border-b border-indigo-500/15">
                <BadgeCheck className="w-3 h-3 text-indigo-400" />
                <span className="text-indigo-400 text-[9px] font-bold uppercase tracking-widest">Verified Legal Advice</span>
              </div>
            )}
            {msg.evidence && (
              <div className="flex items-center gap-1.5 mb-1.5 pb-1.5 border-b border-amber-500/15">
                <AlertTriangle className="w-3 h-3 text-amber-400" />
                <span className="text-amber-400 text-[9px] font-bold uppercase tracking-widest">Marked as Evidence</span>
              </div>
            )}
            {msg.forwarded && (
              <div className="flex items-center gap-1.5 mb-1.5 pb-1.5 border-b border-white/8">
                <CornerUpRight className="w-3 h-3 text-white/25" />
                <span className="text-white/25 text-[9px]">Forwarded</span>
              </div>
            )}
            {msg.text}
            {msg.bookmarked && <Star className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />}
          </div>
        )}

        {/* Attachments */}
        {(msg.attachments || []).map((file, i) => <AttachmentBubble key={i} file={file} mine={mine} />)}

        {/* Tags */}
        {(msg.tags || []).length > 0 && (
          <div className="flex gap-1 mt-1 flex-wrap">
            {msg.tags.map((tag, i) => (
              <span key={i} className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-white/5 text-white/30 border border-white/8">{tag}</span>
            ))}
          </div>
        )}

        {/* Reactions */}
        {totalReactions.length > 0 && (
          <div className="flex gap-1 mt-1.5 flex-wrap">
            {totalReactions.map(([emoji, users]) => (
              <button key={emoji} onClick={() => onAction('react', msg, emoji)}
                className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/6 border border-white/10 hover:bg-white/12 transition-all">
                <span className="text-sm">{emoji}</span>
                <span className="text-[10px] text-white/50 font-bold">{users.length}</span>
              </button>
            ))}
          </div>
        )}

        {/* Time + status */}
        <div className={`flex items-center gap-1.5 mt-1 px-1 ${mine ? 'flex-row-reverse' : ''}`}>
          <span className="text-[10px] text-white/20">{msg.time}</span>
          {mine && (
            msg.status === 'read' ? <CheckCheck className="w-3 h-3 text-[#D4AF37]" /> :
              msg.status === 'delivered' ? <CheckCheck className="w-3 h-3 text-white/20" /> :
                <Check className="w-3 h-3 text-white/20" />
          )}
          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-60 transition-opacity">
            <Lock className="w-2.5 h-2.5 text-white/20" />
          </div>
        </div>
      </div>

      {/* Desktop hover actions */}
      {!isMobile && (
        <div className={`absolute ${mine ? 'left-10' : 'right-10'} top-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5 z-10`}>
          {[
            { icon: CornerUpLeft, action: 'reply', title: 'Reply' },
            { icon: Smile, action: 'react', title: 'React' },
            { icon: CornerUpRight, action: 'forward', title: 'Forward' },
            { icon: MoreHorizontal, action: 'menu', title: 'More' },
          ].map(({ icon: Icon, action, title }) => (
            <button key={action}
              onClick={() => action === 'menu' ? setShowMenu(v => !v) : onAction(action, msg)}
              title={title}
              className="w-7 h-7 rounded-lg bg-[#1a1d2e] border border-white/8 text-white/30 hover:text-white/70 hover:border-white/15 flex items-center justify-center transition-all">
              <Icon className="w-3 h-3" />
            </button>
          ))}
        </div>
      )}

      {/* Context menu */}
      <AnimatePresence>
        {showMenu && (
          <div ref={menuRef}>
            <MessageContextMenu msg={msg} mine={mine} isMobile={isMobile}
              onAction={(action, m, emoji) => { onAction(action, m, emoji); }}
              onClose={() => setShowMenu(false)} />
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   AI ASSIST PANEL
───────────────────────────────────────────── */
function AIAssistPanel({ thread, onClose, addToast }) {
  const [mode, setMode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const prompts = {
    summary: { label: 'Summarize', icon: Brain, desc: 'Legal summary of this thread' },
    evidence: { label: 'Extract Evidence', icon: AlertTriangle, desc: 'Identify legally significant statements' },
    score: { label: 'Utility Score', icon: Zap, desc: 'Case usefulness analysis' },
    export: { label: 'Export for Court', icon: Download, desc: 'Court-ready PDF transcript' },
  };

  const results = {
    summary: `Thread Summary — ${thread.caseName}\n\nKey legal developments:\n• Advocate identified retaliatory dismissal under Employment Act s.45\n• WhatsApp evidence uploaded to vault (14 screenshots)\n• Payslip upload task pending (due May 3)\n• 2 contract clauses flagged for pre-hearing review\n\nNext action: Review flagged clauses urgently.`,
    evidence: `3 evidentially significant messages found:\n\n⚖ Apr 28, 10:30 AM — Legal opinion on retaliatory dismissal\n📎 Apr 28, 11:45 AM — 14 WhatsApp screenshots uploaded\n📋 Apr 28, 10:32 AM — Task: payslips (compensation baseline)\n\nAll timestamped and immutably recorded.`,
    score: `Case Utility Score: 87/100\n\n✅ Expert legal analysis confirmed\n✅ Digital evidence collected\n✅ Tasks being tracked\n⚠ Payslip task incomplete (due May 3)\n⚠ Contract clauses unresolved\n\nRecommendation: Address outstanding items before hearing.`,
    export: `Export ready:\n• ${thread.messages.length} messages\n• ${getAllSharedFiles(thread).length} file attachments\n• Verified legal opinions included\n• Immutable timestamps preserved\n• SHA-256 hash chain verified\n\nFormat: Court-admissible PDF with attestation cover sheet.`,
  };

  const run = (key) => {
    setMode(key);
    setLoading(true);
    setResult(null);
    setTimeout(() => { setLoading(false); setResult(results[key]); }, 1600);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}
      className="absolute inset-x-0 bottom-0 top-0 bg-[#12141f]/98 backdrop-blur-sm z-20 flex flex-col">
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/6 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-white font-bold text-sm">Veritas AI — Chat Analysis</span>
        </div>
        <button onClick={onClose} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <p className="text-white/35 text-xs">Select an analysis to run on this conversation:</p>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(prompts).map(([key, p]) => (
            <button key={key} onClick={() => run(key)}
              className={`p-3.5 rounded-xl border text-left transition-all active:scale-95 ${mode === key ? 'border-[#D4AF37]/40 bg-[#D4AF37]/10' : 'border-white/8 bg-white/3 hover:border-white/15 hover:bg-white/5'}`}>
              <p.icon className={`w-4 h-4 mb-2 ${mode === key ? 'text-[#D4AF37]' : 'text-white/40'}`} />
              <p className={`text-xs font-bold ${mode === key ? 'text-[#D4AF37]' : 'text-white/70'}`}>{p.label}</p>
              <p className="text-[10px] text-white/25 mt-0.5">{p.desc}</p>
            </button>
          ))}
        </div>
        <AnimatePresence>
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex items-center gap-2 p-4 rounded-xl bg-[#D4AF37]/5 border border-[#D4AF37]/15">
              <Loader className="w-4 h-4 text-[#D4AF37] animate-spin" />
              <span className="text-[#D4AF37] text-xs font-medium">Analysing conversation…</span>
            </motion.div>
          )}
          {result && !loading && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-[#D4AF37]/5 border border-[#D4AF37]/15">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest">AI Result</span>
              </div>
              <pre className="text-white/70 text-xs leading-relaxed whitespace-pre-wrap font-sans">{result}</pre>
              {mode === 'export' && (
                <button onClick={() => addToast('Chat exported as court-ready PDF', 'success')}
                  className="mt-3 w-full py-2.5 rounded-xl bg-[#D4AF37] text-[#12141f] text-xs font-black flex items-center justify-center gap-2 active:scale-95 transition-all">
                  <Download className="w-3.5 h-3.5" /> Download Court PDF
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   RIGHT SIDEBAR
───────────────────────────────────────────── */
function RightSidebar({ thread, onAddParticipant, onClose, isMobile }) {
  const [tab, setTab] = useState('participants');
  const files = getAllSharedFiles(thread);
  const participants = thread.participants.map(id => PARTICIPANTS_MAP[id]);
  const cs = caseStatusBadge(thread.caseStatus);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#0e1019]">
      {isMobile && (
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 flex-shrink-0">
          <span className="text-white font-bold text-sm">Case Panel</span>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      <div className="flex border-b border-white/5 px-2 pt-2 gap-0.5 flex-shrink-0">
        {[{ id: 'participants', icon: Users, label: 'People' }, { id: 'files', icon: Paperclip, label: 'Files' }, { id: 'case', icon: Scale, label: 'Case' }].map(({ id, icon: Icon, label }) => (
          <button key={id} onClick={() => setTab(id)}
            className={`flex-1 flex items-center justify-center gap-1 px-2 py-2 rounded-lg text-[11px] font-semibold transition-all ${tab === id ? 'bg-[#D4AF37]/12 text-[#D4AF37] border border-[#D4AF37]/20' : 'text-white/30 hover:text-white/55 hover:bg-white/4'}`}>
            <Icon className="w-3 h-3" /> {label}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto p-3">
        <AnimatePresence mode="wait">
          {tab === 'participants' && (
            <motion.div key="p" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
              {participants.map((p, i) => {
                if (!p) return null;
                const rc = roleConfig(p.role);
                return (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-white/5 bg-white/2">
                    <Avatar participant={p} size="md" showOnline />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 mb-0.5">
                        <p className="text-white/85 text-xs font-bold truncate">{p.name}</p>
                        {p.verified && <BadgeCheck className="w-3 h-3 text-[#D4AF37] flex-shrink-0" />}
                      </div>
                      <span className={`inline-block text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full border ${rc.color} ${rc.bg} ${rc.border}`}>{rc.label}</span>
                      {p.specialty && <p className="text-white/25 text-[10px] mt-1">{p.specialty}</p>}
                      <div className="flex items-center gap-1 mt-1">
                        <div className={`w-1.5 h-1.5 rounded-full ${p.online ? 'bg-green-400' : 'bg-white/15'}`} />
                        <span className="text-white/25 text-[10px]">{p.online ? 'Online' : 'Offline'}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
              <button onClick={onAddParticipant}
                className="w-full flex items-center gap-2 py-2.5 px-3 rounded-xl border border-dashed border-white/12 text-white/30 hover:text-white/55 hover:border-white/20 text-xs font-semibold transition-all active:scale-95">
                <UserPlus className="w-3.5 h-3.5" /> Add Participant
              </button>
            </motion.div>
          )}
          {tab === 'files' && (
            <motion.div key="f" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
              {files.length === 0 ? (
                <div className="text-center py-8"><Paperclip className="w-8 h-8 text-white/8 mx-auto mb-2" /><p className="text-white/20 text-xs">No files shared</p></div>
              ) : files.map((file, i) => {
                const cfg = fileIcon(file.type);
                const Icon = cfg.icon;
                const s = PARTICIPANTS_MAP[file.sender];
                return (
                  <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border border-white/5 ${cfg.bg} cursor-pointer hover:border-white/12 transition-all group active:scale-95`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${cfg.bg}`}><Icon className={`w-4 h-4 ${cfg.color}`} /></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white/75 text-[11px] font-semibold truncate">{file.name}</p>
                      <p className="text-white/25 text-[10px]">{file.size} · {s?.initials}</p>
                    </div>
                    <Download className="w-3.5 h-3.5 text-white/15 group-hover:text-white/60 transition-colors" />
                  </div>
                );
              })}
            </motion.div>
          )}
          {tab === 'case' && (
            <motion.div key="c" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
              {thread.caseId ? (
                <>
                  <div className="p-4 rounded-xl border border-white/6 bg-white/2">
                    <div className="flex items-center gap-2 mb-2">
                      <Scale className="w-4 h-4 text-[#D4AF37]" />
                      <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest">Linked Case</span>
                    </div>
                    <p className="text-white font-bold text-sm mb-1 leading-snug">{thread.caseName}</p>
                    <p className="text-white/30 text-[11px] font-mono mb-3">{thread.caseId}</p>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${cs.color} ${cs.bg} ${cs.border}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${thread.caseStatus === 'urgent' ? 'bg-red-400 animate-pulse' : 'bg-green-400'}`} />
                      {cs.label}
                    </span>
                  </div>
                  {[{ icon: ExternalLink, label: 'View Full Case', color: 'text-[#D4AF37]' }, { icon: FileText, label: 'Case Documents', color: 'text-blue-400' }, { icon: Activity, label: 'Case Timeline', color: 'text-purple-400' }].map(({ icon: Icon, label, color }, i) => (
                    <button key={i} className="w-full flex items-center gap-2.5 px-3 py-3 rounded-xl border border-white/6 bg-white/2 hover:border-white/12 hover:bg-white/4 transition-all text-xs font-semibold text-white/55 hover:text-white/80 active:scale-95">
                      <Icon className={`w-3.5 h-3.5 ${color}`} /> {label}
                    </button>
                  ))}
                </>
              ) : (
                <div className="text-center py-8"><Scale className="w-8 h-8 text-white/8 mx-auto mb-2" /><p className="text-white/20 text-xs">No case linked</p></div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="p-3 border-t border-white/5 flex-shrink-0">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/8 bg-white/3 hover:bg-white/5 text-white/40 hover:text-white/70 text-xs font-semibold transition-all active:scale-95">
          <Download className="w-3.5 h-3.5" /> Export Chat as PDF
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   INVITE MODAL
───────────────────────────────────────────── */
function InviteModal({ onClose }) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('witness');
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[120] flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
      <motion.div initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 30 }}
        onClick={e => e.stopPropagation()}
        className="w-full max-w-md rounded-t-3xl sm:rounded-3xl border border-white/8 bg-[#1a1d2e] shadow-2xl overflow-hidden">
        <div className="w-10 h-1 bg-white/15 rounded-full mx-auto mt-3 sm:hidden" />
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          <h3 className="text-white font-bold text-lg flex items-center gap-2"><UserPlus className="w-5 h-5 text-[#D4AF37]" /> Add Participant</h3>
          <button onClick={onClose} className="text-white/30 hover:text-white/60"><X className="w-5 h-5" /></button>
        </div>
        <div className="space-y-3 px-5 pb-4">
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="participant@example.com"
            className="w-full px-3 py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm outline-none focus:border-[#D4AF37]/40 transition-colors placeholder:text-white/20" />
          <div className="grid grid-cols-4 gap-2">
            {['witness', 'lawyer', 'official', 'client'].map(r => (
              <button key={r} onClick={() => setRole(r)}
                className={`py-2.5 rounded-xl border text-xs font-bold capitalize transition-all active:scale-95 ${role === r ? 'border-[#D4AF37]/35 bg-[#D4AF37]/10 text-[#D4AF37]' : 'border-white/8 bg-white/3 text-white/40 hover:border-white/15'}`}>{r}</button>
            ))}
          </div>
          <textarea rows={2} placeholder="Add a note about this participant…"
            className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm outline-none resize-none placeholder:text-white/20 focus:border-[#D4AF37]/40 transition-colors" />
        </div>
        <div className="flex gap-3 px-5 pb-8 sm:pb-5">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-white/5 border border-white/8 text-white/40 text-sm font-semibold">Cancel</button>
          <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#c9a430] text-[#12141f] text-sm font-black flex items-center justify-center gap-2 active:scale-95 transition-all">
            <Send className="w-4 h-4" /> Send Invite
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   NEW CHAT MODAL
───────────────────────────────────────────── */
function NewChatModal({ onClose }) {
  const [type, setType] = useState('direct');
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[120] flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
      <motion.div initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 30 }}
        onClick={e => e.stopPropagation()}
        className="w-full max-w-md rounded-t-3xl sm:rounded-3xl border border-white/8 bg-[#1a1d2e] shadow-2xl overflow-hidden">
        <div className="w-10 h-1 bg-white/15 rounded-full mx-auto mt-3 sm:hidden" />
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-white/6">
          <h3 className="text-white font-bold text-base flex items-center gap-2"><Plus className="w-4 h-4 text-[#D4AF37]" /> New Conversation</h3>
          <button onClick={onClose} className="text-white/30 hover:text-white/60"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-3 gap-2">
            {[{ id: 'direct', icon: User, label: 'Direct' }, { id: 'case-group', icon: Users, label: 'Case Group' }, { id: 'official', icon: Gavel, label: 'Official' }].map(({ id, icon: Icon, label }) => (
              <button key={id} onClick={() => setType(id)}
                className={`p-3 rounded-xl border text-center transition-all active:scale-95 ${type === id ? 'border-[#D4AF37]/35 bg-[#D4AF37]/10' : 'border-white/8 bg-white/3 hover:border-white/15'}`}>
                <Icon className={`w-5 h-5 mx-auto mb-1 ${type === id ? 'text-[#D4AF37]' : 'text-white/30'}`} />
                <p className={`text-xs font-bold ${type === id ? 'text-[#D4AF37]' : 'text-white/50'}`}>{label}</p>
              </button>
            ))}
          </div>
          <input placeholder="Search by name or email…"
            className="w-full px-3 py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm outline-none placeholder:text-white/20 focus:border-[#D4AF37]/40 transition-colors" />
          <select className="w-full px-3 py-3 rounded-xl bg-white/5 border border-white/10 text-white/50 text-sm outline-none focus:border-[#D4AF37]/40 transition-colors appearance-none">
            <option value="">Link to Case (optional)</option>
            {MOCK_THREADS.filter(t => t.caseId).map(t => <option key={t.caseId}>{t.caseId} — {t.caseName}</option>)}
          </select>
        </div>
        <div className="flex gap-3 px-5 pb-8 sm:pb-5">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-white/5 border border-white/8 text-white/40 text-sm font-semibold">Cancel</button>
          <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#c9a430] text-[#12141f] text-sm font-black active:scale-95 transition-all">Start Chat</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   VOICE RECORDING UI
───────────────────────────────────────────── */
function VoiceRecorder({ onSend, onCancel }) {
  const [secs, setSecs] = useState(0);
  const [transcribing, setTranscribing] = useState(false);
  useEffect(() => {
    const i = setInterval(() => setSecs(s => s + 1), 1000);
    return () => clearInterval(i);
  }, []);
  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const handleSend = () => {
    setTranscribing(true);
    setTimeout(() => { onSend(fmt(secs)); }, 1200);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
      className="flex items-center gap-3 px-4 py-3 bg-red-500/8 border-t border-red-500/20">
      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.8, repeat: Infinity }}
        className="w-3 h-3 rounded-full bg-red-400" />
      <span className="text-red-400 text-sm font-mono font-bold">{fmt(secs)}</span>
      <span className="text-red-400/60 text-xs flex-1">{transcribing ? 'Transcribing…' : 'Recording voice note…'}</span>
      <button onClick={onCancel} className="w-9 h-9 rounded-full bg-white/8 border border-white/12 flex items-center justify-center text-white/50 hover:text-white transition-colors active:scale-95">
        <X className="w-4 h-4" />
      </button>
      <button onClick={handleSend} className="w-9 h-9 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white transition-colors active:scale-95">
        <Send className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   THREAD LIST ITEM
───────────────────────────────────────────── */
function ThreadItem({ thread, selected, onClick }) {
  const name = getThreadDisplayName(thread);
  const color = getThreadColor(thread);
  const TypeIcon = threadTypeIcon(thread.type);
  const isGroup = thread.participants.length > 2;

  return (
    <motion.button onClick={onClick} whileTap={{ scale: 0.98 }}
      className={`w-full text-left px-4 py-3.5 border-b border-white/3 transition-colors relative ${selected ? 'bg-[#D4AF37]/8 border-l-2 border-l-[#D4AF37]' : 'hover:bg-white/3 border-l-2 border-l-transparent'}`}>
      {thread.pinned && <Pin className="absolute top-2 right-3 w-2.5 h-2.5 text-white/15" />}
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          {isGroup ? (
            <div className="relative w-10 h-10">
              {thread.participants.filter(id => id !== 'YOU').slice(0, 2).map((id, i) => {
                const p = PARTICIPANTS_MAP[id];
                return (
                  <div key={id} className="absolute w-7 h-7 rounded-full border-2 flex items-center justify-center text-[9px] font-black"
                    style={{ borderColor: '#0e1019', background: p?.color + '30', color: p?.color, top: i === 0 ? 0 : '30%', left: i === 0 ? 0 : '35%' }}>
                    {p?.initials}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black border-2 flex-shrink-0"
              style={{ background: color + '22', color, borderColor: color + '40' }}>
              {name[0]}
            </div>
          )}
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#0e1019] flex items-center justify-center">
            <TypeIcon className={`w-2.5 h-2.5 ${thread.type === 'official' ? 'text-pink-400' : thread.type === 'case-group' ? 'text-[#D4AF37]' : 'text-white/30'}`} />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-0.5">
            <p className={`text-xs font-bold truncate pr-2 ${selected ? 'text-white' : 'text-white/80'}`}>{name}</p>
            <span className="text-[10px] text-white/20 flex-shrink-0">{thread.lastTime}</span>
          </div>
          {thread.caseId && <p className="text-[9px] text-white/20 font-mono mb-0.5">{thread.caseId}</p>}
          <p className={`text-[11px] truncate ${thread.unread > 0 ? 'text-white/65 font-semibold' : 'text-white/30'}`}>
            {thread.lastSender === 'YOU' ? 'You: ' : ''}{thread.lastMsg}
          </p>
          {thread.caseStatus === 'urgent' && (
            <div className="flex items-center gap-1 mt-1">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
              <span className="text-[9px] text-red-400 font-bold uppercase tracking-widest">Urgent</span>
            </div>
          )}
        </div>

        {thread.unread > 0 && (
          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#D4AF37] text-[#12141f] text-[9px] font-black flex items-center justify-center">
            {thread.unread}
          </span>
        )}
      </div>
    </motion.button>
  );
}

/* ─────────────────────────────────────────────
   MAIN MESSAGES VIEW
───────────────────────────────────────────── */
export default function MessagesView() {
  const [threads, setThreads] = useState(MOCK_THREADS);
  const [selectedId, setSelectedId] = useState('T001');
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [replyingTo, setReplyingTo] = useState(null);
  const [showAI, setShowAI] = useState(false);
  const [showRightPanel, setShowRightPanel] = useState(false); // off by default on mobile
  const [showSidebar, setShowSidebar] = useState(false); // mobile sidebar drawer
  const [showInvite, setShowInvite] = useState(false);
  const [showNewChat, setShowNewChat] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [activeCall, setActiveCall] = useState(null); // { type: 'voice'|'video' }
  const [forwardMsg, setForwardMsg] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const moreMenuRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // On desktop, default right panel to open
  useEffect(() => {
    if (!isMobile) setShowRightPanel(true);
  }, [isMobile]);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [selectedId, threads]);

  useEffect(() => {
    if (!showMoreMenu) return;
    const h = (e) => { if (!moreMenuRef.current?.contains(e.target)) setShowMoreMenu(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [showMoreMenu]);

  const addToast = useCallback((msg, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  }, []);

  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  const selectedThread = threads.find(t => t.id === selectedId);

  const filteredThreads = threads.filter(t => {
    const q = search.toLowerCase();
    const name = getThreadDisplayName(t).toLowerCase();
    const matchSearch = !q || name.includes(q) || (t.caseId || '').toLowerCase().includes(q) || t.lastMsg.toLowerCase().includes(q);
    const matchType = typeFilter === 'all' || t.type === typeFilter;
    return matchSearch && matchType;
  });

  const sendMessage = useCallback((overrideText) => {
    const text = overrideText || input.trim();
    if (!text || !selectedThread) return;
    const newMsg = {
      id: 'm' + Date.now(), sender: 'YOU', text,
      time: 'Just now', status: 'sent', verified: false, evidence: false,
      bookmarked: false, attachments: [], reactions: {}, tags: [],
      ...(replyingTo ? { replyTo: (replyingTo.text || '[attachment]').substring(0, 60) + '…' } : {}),
    };
    setThreads(prev => prev.map(t => t.id === selectedId
      ? { ...t, messages: [...t.messages, newMsg], lastMsg: text, lastTime: 'Just now', lastSender: 'YOU', unread: 0 }
      : t));
    setInput('');
    setReplyingTo(null);
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  }, [input, selectedId, replyingTo, selectedThread]);

  const sendVoiceNote = useCallback((duration) => {
    const newMsg = {
      id: 'm' + Date.now(), sender: 'YOU', text: null,
      time: 'Just now', status: 'sent', verified: false, evidence: false,
      bookmarked: false, attachments: [], reactions: {}, tags: [],
      isVoiceNote: true,
      voiceNote: { duration, transcription: 'Voice note — transcription processing…' },
    };
    setThreads(prev => prev.map(t => t.id === selectedId
      ? { ...t, messages: [...t.messages, newMsg], lastMsg: '🎙 Voice note', lastTime: 'Just now', lastSender: 'YOU' }
      : t));
    setIsRecording(false);
    addToast('Voice note sent · Transcription processing…', 'gold');
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  }, [selectedId, addToast]);

  const handleMessageAction = useCallback((action, msg, extra) => {
    if (action === 'reply') { setReplyingTo(msg); setTimeout(() => inputRef.current?.focus(), 100); return; }
    if (action === 'copy') { navigator.clipboard?.writeText(msg.text || ''); addToast('Copied to clipboard', 'info'); return; }
    if (action === 'forward') { setForwardMsg(msg); return; }
    if (action === 'react') {
      const emoji = extra;
      setThreads(prev => prev.map(t => t.id === selectedId ? {
        ...t, messages: t.messages.map(m => {
          if (m.id !== msg.id) return m;
          const current = { ...(m.reactions || {}) };
          if (current[emoji]?.includes('YOU')) {
            current[emoji] = current[emoji].filter(u => u !== 'YOU');
            if (current[emoji].length === 0) delete current[emoji];
          } else {
            current[emoji] = [...(current[emoji] || []), 'YOU'];
          }
          return { ...m, reactions: current };
        })
      } : t));
      return;
    }
    if (action === 'toggleTask') {
      setThreads(prev => prev.map(t => t.id === selectedId
        ? { ...t, messages: t.messages.map(m => m.id === msg.id ? { ...m, task: { ...m.task, done: !m.task.done } } : m) }
        : t));
      addToast(msg.task?.done ? 'Task marked incomplete' : 'Task marked complete ✅', 'success');
      return;
    }
    if (action === 'totask') {
      addToast('Message converted to task in your dashboard', 'gold');
      return;
    }
    if (action === 'linkcase') {
      addToast('Message linked to case ' + (selectedThread?.caseId || 'N/A'), 'gold');
      return;
    }
    if (action === 'pin') {
      addToast('Message pinned', 'info');
      return;
    }
    if (action === 'delete') {
      if (!msg.sender === 'YOU') return;
      setThreads(prev => prev.map(t => t.id === selectedId
        ? { ...t, messages: t.messages.filter(m => m.id !== msg.id) }
        : t));
      addToast('Message deleted', 'error');
      return;
    }
    const field = { bookmark: 'bookmarked', evidence: 'evidence' }[action];
    if (field) {
      const next = !msg[field];
      setThreads(prev => prev.map(t => t.id === selectedId
        ? { ...t, messages: t.messages.map(m => m.id === msg.id ? { ...m, [field]: next } : m) }
        : t));
      if (action === 'evidence' && next) addToast('Marked as evidence · Saved to vault', 'gold');
      if (action === 'bookmark' && next) addToast('Message bookmarked ⭐', 'info');
    }
  }, [selectedId, selectedThread, addToast]);

  const handleForward = useCallback((targetIds, msg) => {
    targetIds.forEach(tid => {
      const fwdMsg = {
        id: 'm' + Date.now() + Math.random(),
        sender: 'YOU', text: msg.text,
        time: 'Just now', status: 'sent',
        verified: false, evidence: false, bookmarked: false,
        attachments: msg.attachments || [],
        reactions: {}, tags: [],
        forwarded: true,
      };
      setThreads(prev => prev.map(t => t.id === tid
        ? { ...t, messages: [...t.messages, fwdMsg], lastMsg: msg.text || '[attachment]', lastTime: 'Just now', lastSender: 'YOU' }
        : t));
    });
    addToast(`Forwarded to ${targetIds.length} conversation${targetIds.length > 1 ? 's' : ''}`, 'success');
  }, [addToast]);

  const selectThread = (id) => {
    setSelectedId(id);
    setShowAI(false);
    setReplyingTo(null);
    setShowSidebar(false); // close mobile sidebar
    setThreads(prev => prev.map(t => t.id === id ? { ...t, unread: 0 } : t));
  };

  const unreadCount = threads.reduce((a, t) => a + (t.unread || 0), 0);

  return (
    <div className="flex h-full overflow-hidden bg-[#12141f]" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {/* Toasts */}
      <Toast toasts={toasts} onRemove={removeToast} />

      {/* Modals */}
      <AnimatePresence>
        {showInvite && <InviteModal onClose={() => setShowInvite(false)} />}
        {showNewChat && <NewChatModal onClose={() => setShowNewChat(false)} />}
        {activeCall && selectedThread && (
          <CallModal thread={selectedThread} type={activeCall.type} onEnd={() => { setActiveCall(null); addToast(`${activeCall.type === 'video' ? 'Video' : 'Voice'} call ended`, 'info'); }} />
        )}
        {forwardMsg && (
          <ForwardModal msg={forwardMsg} threads={threads.filter(t => t.id !== selectedId)}
            onForward={handleForward} onClose={() => setForwardMsg(null)} />
        )}
      </AnimatePresence>

      {/* ── LEFT SIDEBAR ── */}
      {/* Desktop always visible, mobile as drawer */}
      <AnimatePresence>
        {(showSidebar || !isMobile) && (
          <>
            {isMobile && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 z-30" onClick={() => setShowSidebar(false)} />
            )}
            <motion.div
              initial={isMobile ? { x: '-100%' } : false}
              animate={{ x: 0 }}
              exit={isMobile ? { x: '-100%' } : {}}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className={`${isMobile ? 'fixed left-0 top-0 bottom-0 z-40 w-72' : 'relative w-72 flex-shrink-0'} border-r border-white/6 flex flex-col bg-[#0e1019]`}>

              {/* Header */}
              <div className="p-4 border-b border-white/5 flex-shrink-0">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <h2 className="text-white font-black text-sm tracking-tight">Messages</h2>
                    {unreadCount > 0 && <span className="px-1.5 py-0.5 rounded-full bg-[#D4AF37] text-[#12141f] text-[9px] font-black">{unreadCount}</span>}
                  </div>
                  <div className="flex items-center gap-1.5">
                    {isMobile && (
                      <button onClick={() => setShowSidebar(false)} className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-white/40"><X className="w-4 h-4" /></button>
                    )}
                    <button onClick={() => setShowNewChat(true)}
                      className="w-8 h-8 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center hover:bg-[#D4AF37]/20 transition-colors active:scale-95">
                      <Plus className="w-3.5 h-3.5 text-[#D4AF37]" />
                    </button>
                  </div>
                </div>
                {/* Search */}
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search conversations…"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/4 border border-white/6 text-white/70 text-xs outline-none placeholder:text-white/20 focus:border-[#D4AF37]/25 transition-colors" />
                </div>
                {/* Filters */}
                <div className="flex gap-1">
                  {[{ id: 'all', label: 'All' }, { id: 'direct', label: 'Direct' }, { id: 'case-group', label: 'Groups' }, { id: 'official', label: 'Court' }].map(({ id, label }) => (
                    <button key={id} onClick={() => setTypeFilter(id)}
                      className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold transition-all ${typeFilter === id ? 'bg-[#D4AF37]/12 text-[#D4AF37] border border-[#D4AF37]/20' : 'text-white/25 hover:text-white/50'}`}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Thread list */}
              <div className="flex-1 overflow-y-auto">
                {filteredThreads.map(thread => (
                  <ThreadItem key={thread.id} thread={thread} selected={selectedId === thread.id} onClick={() => selectThread(thread.id)} />
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── MAIN CHAT ── */}
      {selectedThread ? (
        <div className="flex-1 flex flex-col overflow-hidden relative min-w-0">
          {/* Chat Header */}
          <div className="flex items-center gap-2 px-3 sm:px-4 py-3 border-b border-white/6 bg-[#12141f] flex-shrink-0">
            {/* Mobile back / sidebar toggle */}
            <button onClick={() => setShowSidebar(true)} className="md:hidden w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-white/50 hover:text-white flex-shrink-0 active:scale-95">
              <Menu className="w-4 h-4" />
            </button>

            {/* Avatars */}
            <div className="flex -space-x-2 flex-shrink-0">
              {selectedThread.participants.filter(id => id !== 'YOU').slice(0, 3).map(id => (
                <Avatar key={id} participant={id} size="sm" showOnline />
              ))}
            </div>

            {/* Name + meta */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-white font-bold text-sm truncate">{getThreadDisplayName(selectedThread)}</p>
                {selectedThread.type === 'official' && <BadgeCheck className="w-3.5 h-3.5 text-pink-400 flex-shrink-0" />}
                {selectedThread.participants.some(id => PARTICIPANTS_MAP[id]?.verified && id !== 'YOU') && (
                  <BadgeCheck className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {selectedThread.caseId && <span className="text-[10px] text-white/25 font-mono hidden sm:block">{selectedThread.caseId}</span>}
                <div className="flex items-center gap-1">
                  <div className={`w-1.5 h-1.5 rounded-full ${selectedThread.participants.some(id => PARTICIPANTS_MAP[id]?.online && id !== 'YOU') ? 'bg-green-400' : 'bg-white/15'}`} />
                  <span className="text-[10px] text-white/25">
                    {selectedThread.participants.filter(id => PARTICIPANTS_MAP[id]?.online && id !== 'YOU').length > 0 ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
            </div>

            {/* Action buttons — always clickable */}
            <div className="flex items-center gap-1 flex-shrink-0">
              {/* Voice call */}
              <button onClick={() => setActiveCall({ type: 'voice' })} title="Voice call"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-white/50 hover:text-green-400 hover:bg-green-500/10 hover:border-green-500/20 transition-all active:scale-95">
                <Phone className="w-4 h-4" />
              </button>
              {/* Video call */}
              <button onClick={() => setActiveCall({ type: 'video' })} title="Video call"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-white/50 hover:text-blue-400 hover:bg-blue-500/10 hover:border-blue-500/20 transition-all active:scale-95 hidden sm:flex">
                <Video className="w-4 h-4" />
              </button>
              {/* AI */}
              <button onClick={() => setShowAI(v => !v)} title="AI Analysis"
                className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all active:scale-95 ${showAI ? 'bg-[#D4AF37]/15 border-[#D4AF37]/30 text-[#D4AF37]' : 'bg-white/5 border-white/8 text-white/50 hover:text-[#D4AF37] hover:bg-[#D4AF37]/8 hover:border-[#D4AF37]/20'}`}>
                <Sparkles className="w-4 h-4" />
              </button>
              {/* Case panel */}
              <button onClick={() => setShowRightPanel(v => !v)} title="Case panel"
                className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all active:scale-95 hidden sm:flex ${showRightPanel ? 'bg-white/10 border-white/15 text-white/70' : 'bg-white/5 border-white/8 text-white/50 hover:text-white/70'}`}>
                <PanelRight className="w-4 h-4" />
              </button>
              {/* More menu */}
              <div className="relative" ref={moreMenuRef}>
                <button onClick={() => setShowMoreMenu(v => !v)} title="More"
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all active:scale-95 ${showMoreMenu ? 'bg-white/10 border-white/15 text-white/70' : 'bg-white/5 border-white/8 text-white/50 hover:text-white/70'}`}>
                  <MoreVertical className="w-4 h-4" />
                </button>
                <AnimatePresence>
                  {showMoreMenu && (
                    <motion.div initial={{ opacity: 0, scale: 0.92, y: -4 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92 }}
                      className="absolute right-0 top-full mt-2 w-52 rounded-2xl border border-white/8 bg-[#1a1d2e] shadow-2xl z-50 overflow-hidden py-1">
                      {[
                        { icon: Video, label: 'Video Call', action: () => { setActiveCall({ type: 'video' }); setShowMoreMenu(false); } },
                        { icon: Bell, label: 'Mute Notifications', action: () => { addToast('Notifications muted', 'info'); setShowMoreMenu(false); } },
                        { icon: Search, label: 'Search Messages', action: () => { setShowMoreMenu(false); addToast('Message search coming soon', 'info'); } },
                        { icon: Archive, label: 'Archive Chat', action: () => { setShowMoreMenu(false); addToast('Chat archived', 'info'); } },
                        { icon: PanelRight, label: showRightPanel ? 'Hide Case Panel' : 'Show Case Panel', action: () => { setShowRightPanel(v => !v); setShowMoreMenu(false); } },
                        { divider: true },
                        { icon: Trash2, label: 'Clear History', action: () => { setShowMoreMenu(false); addToast('Chat history cleared', 'error'); }, color: 'text-red-400' },
                      ].map((item, i) => item.divider ? (
                        <div key={i} className="my-1 border-t border-white/5" />
                      ) : (
                        <button key={i} onClick={item.action}
                          className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium hover:bg-white/5 transition-colors text-left ${item.color || 'text-white/60'}`}>
                          <item.icon className="w-3.5 h-3.5 flex-shrink-0" />{item.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-4 relative">
            {/* E2E banner */}
            <div className="flex items-center gap-2 my-1">
              <div className="flex-1 h-px bg-white/4" />
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/3 border border-white/6">
                <Lock className="w-3 h-3 text-green-400" />
                <span className="text-[10px] text-white/25">End-to-end encrypted · Attorney-client privileged</span>
              </div>
              <div className="flex-1 h-px bg-white/4" />
            </div>

            {selectedThread.messages.map(msg => (
              <Message key={msg.id} msg={msg} thread={selectedThread}
                onAction={handleMessageAction} isMobile={isMobile} />
            ))}

            {/* Typing indicator */}
            {selectedThread.id === 'T001' && (
              <div className="flex items-center gap-2.5">
                <Avatar participant="ADV-NJO" size="sm" />
                <div className="flex items-center gap-1 px-4 py-3 rounded-2xl rounded-tl-sm bg-[#1a1d2e] border border-white/8">
                  {[0, 1, 2].map(i => (
                    <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-white/25"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }} />
                  ))}
                </div>
                <span className="text-[10px] text-white/20">Adv. Njoroge is typing…</span>
              </div>
            )}

            <div ref={messagesEndRef} />

            {/* AI Panel overlay */}
            <AnimatePresence>
              {showAI && <AIAssistPanel thread={selectedThread} onClose={() => setShowAI(false)} addToast={addToast} />}
            </AnimatePresence>
          </div>

          {/* Reply preview */}
          <AnimatePresence>
            {replyingTo && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                className="px-4 py-3 border-t border-white/5 bg-[#1a1d2e] flex items-center gap-3 flex-shrink-0">
                <div className="w-0.5 h-8 bg-[#D4AF37] rounded-full" />
                <div className="flex-1 min-w-0">
                  <p className="text-[#D4AF37] text-[10px] font-bold mb-0.5">Replying to {PARTICIPANTS_MAP[replyingTo.sender]?.shortName}</p>
                  <p className="text-white/35 text-xs truncate">{(replyingTo.text || '[attachment]').substring(0, 70)}</p>
                </div>
                <button onClick={() => setReplyingTo(null)} className="text-white/20 hover:text-white/60 active:scale-95"><X className="w-4 h-4" /></button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Voice recorder */}
          <AnimatePresence>
            {isRecording && (
              <VoiceRecorder onSend={sendVoiceNote} onCancel={() => setIsRecording(false)} />
            )}
          </AnimatePresence>

          {/* Input area */}
          {!isRecording && (
            <div className="p-3 sm:p-4 border-t border-white/6 flex-shrink-0 bg-[#12141f]">
              <div className="flex items-end gap-2 p-2.5 sm:p-3 rounded-2xl bg-[#1a1d2e] border border-white/8 focus-within:border-[#D4AF37]/30 transition-colors">
                {/* Attach */}
                <div className="flex items-center gap-0.5 flex-shrink-0 pb-0.5">
                  {[
                    { icon: Paperclip, title: 'Attach file', action: () => addToast('File picker opened', 'info') },
                    { icon: Image, title: 'Send image', action: () => addToast('Image picker opened', 'info') },
                    { icon: FileText, title: 'Send document', action: () => addToast('Document picker opened', 'info') },
                  ].map(({ icon: Icon, title, action }, i) => (
                    <button key={i} title={title} onClick={action}
                      className="w-8 h-8 rounded-xl hover:bg-white/8 flex items-center justify-center transition-colors active:scale-90">
                      <Icon className="w-4 h-4 text-white/30 hover:text-white/60" />
                    </button>
                  ))}
                </div>

                {/* Input */}
                <textarea ref={inputRef} value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                  placeholder="Type a message…"
                  rows={1}
                  style={{ resize: 'none', minHeight: 34, maxHeight: 100 }}
                  className="flex-1 bg-transparent text-white/80 text-sm outline-none placeholder:text-white/20 py-1 leading-relaxed"
                  onInput={e => { e.target.style.height = 'auto'; e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px'; }} />

                {/* Emoji (mobile) */}
                <button title="Emoji" onClick={() => addToast('Emoji picker coming soon 😊', 'info')}
                  className="w-8 h-8 rounded-xl hover:bg-white/8 flex items-center justify-center transition-colors active:scale-90 flex-shrink-0">
                  <Smile className="w-4 h-4 text-white/25" />
                </button>

                {/* Voice note */}
                <button onClick={() => setIsRecording(true)} title="Voice note"
                  className="w-9 h-9 rounded-xl hover:bg-white/8 flex items-center justify-center flex-shrink-0 transition-colors active:scale-90">
                  <Mic className="w-4 h-4 text-white/30" />
                </button>

                {/* Send */}
                <button onClick={() => sendMessage()} title="Send (Enter)"
                  className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all active:scale-90 ${input.trim() ? 'bg-[#D4AF37] hover:bg-[#c9a430] shadow-lg shadow-[#D4AF37]/25' : 'bg-white/5'}`}>
                  <Send className={`w-4 h-4 ${input.trim() ? 'text-[#12141f]' : 'text-white/15'}`} />
                </button>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-1.5 px-1">
                <div className="flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5 text-green-400" />
                  <span className="text-[10px] text-white/20">Encrypted</span>
                </div>
                <span className="text-[10px] text-white/15 hidden sm:block">Enter to send · Shift+Enter for new line</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <MessageSquare className="w-12 h-12 text-white/8 mx-auto mb-3" />
            <p className="text-white/25 font-semibold text-sm">Select a conversation</p>
            <button onClick={() => setShowSidebar(true)} className="mt-3 px-4 py-2 rounded-xl border border-white/8 text-white/30 text-xs hover:text-white/60 transition-colors md:hidden">
              Open conversations
            </button>
          </div>
        </div>
      )}

      {/* ── RIGHT SIDEBAR — Desktop slide, Mobile bottom sheet ── */}
      <AnimatePresence>
        {showRightPanel && selectedThread && (
          <>
            {isMobile ? (
              <>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/60 z-30" onClick={() => setShowRightPanel(false)} />
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                  className="fixed bottom-0 left-0 right-0 z-40 rounded-t-3xl border-t border-white/8 overflow-hidden"
                  style={{ maxHeight: '80vh' }}>
                  <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mt-3 mb-1" />
                  <div style={{ height: '75vh' }}>
                    <RightSidebar thread={selectedThread} onAddParticipant={() => { setShowRightPanel(false); setShowInvite(true); }}
                      onClose={() => setShowRightPanel(false)} isMobile={true} />
                  </div>
                </motion.div>
              </>
            ) : (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 268, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="flex-shrink-0 overflow-hidden border-l border-white/6">
                <RightSidebar thread={selectedThread} onAddParticipant={() => setShowInvite(true)}
                  onClose={() => setShowRightPanel(false)} isMobile={false} />
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}