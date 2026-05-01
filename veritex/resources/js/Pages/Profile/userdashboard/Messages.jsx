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
  RefreshCw, Settings, Layers, Globe, Calendar,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────────── */
const GOLD = '#D4AF37';
const DARK = '#12141f';
const DARK2 = '#1a1d2e';
const DARK3 = '#0e1019';

/* ─────────────────────────────────────────────
   MOCK DATA
───────────────────────────────────────────── */
const PARTICIPANTS_MAP = {
  'ADV-NJO': { id: 'ADV-NJO', name: 'Adv. Grace Njoroge', role: 'lawyer', initials: 'GN', color: '#6366F1', online: true, verified: true, specialty: 'Commercial Law', phone: '+254 712 345 678' },
  'ADV-WAN': { id: 'ADV-WAN', name: 'Adv. Wanjiru Muthoni', role: 'lawyer', initials: 'WM', color: '#8B5CF6', online: false, verified: true, specialty: 'Land & Property', phone: '+254 722 891 023' },
  'WIT-OBI': { id: 'WIT-OBI', name: 'Peter Obiora', role: 'witness', initials: 'PO', color: '#10B981', online: true, verified: false, specialty: 'Witness — Land Survey', phone: '' },
  'WIT-ADE': { id: 'WIT-ADE', name: 'Amina Aden', role: 'witness', initials: 'AA', color: '#F59E0B', online: false, verified: false, specialty: 'Witness — Employer', phone: '' },
  'YOU': { id: 'YOU', name: 'You (James Odhiambo)', role: 'client', initials: 'JO', color: '#6366F1', online: true, verified: true, specialty: 'Client', phone: '' },
  'CLK-001': { id: 'CLK-001', name: 'Milimani Registry', role: 'official', initials: 'MR', color: '#EC4899', online: false, verified: true, specialty: 'Court Clerk', phone: '' },
};

const MOCK_THREADS = [
  {
    id: 'T001',
    type: 'direct',
    caseId: 'KE-2026-1102',
    caseName: 'Unfair Dismissal — Kamau Holdings',
    caseStatus: 'active',
    participants: ['YOU', 'ADV-NJO'],
    name: null, // derived from participants
    pinned: true,
    unread: 3,
    lastMsg: "I've reviewed the contract.There are two critical clauses we need to address before the hearing.",
    lastTime: '2:41 PM',
    lastSender: 'ADV-NJO',
    messages: [
      { id: 'm1', sender: 'ADV-NJO', text: 'Good morning James. I have received your employment contract. Let me review and come back to you.', time: 'Apr 28, 9:00 AM', status: 'read', verified: false, evidence: false, bookmarked: false, attachments: [] },
      { id: 'm2', sender: 'YOU', text: 'Thank you Advocate Grace. Please let me know if you need anything else from me. I also attached the dismissal letter.', time: 'Apr 28, 9:14 AM', status: 'read', verified: false, evidence: false, bookmarked: false, attachments: [{ name: 'Dismissal_Letter_March26.pdf', type: 'pdf', size: '186 KB' }] },
      { id: 'm3', sender: 'ADV-NJO', text: 'Received. I can see they have cited "redundancy" but the timing is suspicious — just 4 days after you raised the HR complaint. This is textbook retaliatory dismissal under Section 45 of the Employment Act 2007.', time: 'Apr 28, 10:30 AM', status: 'read', verified: true, evidence: false, bookmarked: true, attachments: [] },
      { id: 'm4', sender: 'ADV-NJO', text: null, time: 'Apr 28, 10:32 AM', status: 'read', verified: false, evidence: false, bookmarked: false, isTask: true, task: { title: 'Upload 3 months of payslips', desc: 'Required to establish your salary baseline for compensation calculation', deadline: 'By May 3, 2026', done: false } },
      { id: 'm5', sender: 'YOU', text: 'I understand. Should I also provide the WhatsApp messages between me and my manager?', time: 'Apr 28, 11:00 AM', status: 'read', verified: false, evidence: false, bookmarked: false, attachments: [] },
      { id: 'm6', sender: 'ADV-NJO', text: 'Yes — absolutely. Screenshot everything and save to your Evidence Vault. Do not delete anything. Those messages could be critical.', time: 'Apr 28, 11:05 AM', status: 'read', verified: false, evidence: true, bookmarked: false, attachments: [] },
      { id: 'm7', sender: 'YOU', text: 'Done. I have uploaded 14 screenshots to the vault under Case KE-2026-1102.', time: 'Apr 28, 11:45 AM', status: 'read', verified: false, evidence: false, bookmarked: false, attachments: [{ name: 'WhatsApp_Screenshots_14.zip', type: 'zip', size: '4.2 MB' }] },
      { id: 'm8', sender: 'ADV-NJO', text: "I've reviewed the contract. There are two critical clauses we need to address before the hearing. I'll send a marked-up version shortly.", time: 'Today, 2:41 PM', status: 'delivered', verified: false, evidence: false, bookmarked: false, attachments: [] },
    ],
  },
  {
    id: 'T002',
    type: 'case-group',
    caseId: 'KE-2026-0889',
    caseName: 'Land Dispute — Kiambu County',
    caseStatus: 'active',
    participants: ['YOU', 'ADV-WAN', 'WIT-OBI'],
    name: 'Land Dispute — Case Group',
    pinned: false,
    unread: 1,
    lastMsg: 'I will be at the site on Friday at 8am for the survey.',
    lastTime: 'Yesterday',
    lastSender: 'WIT-OBI',
    messages: [
      { id: 'm1', sender: 'ADV-WAN', text: 'Welcome to the case group for KE-2026-0889. I am adding Peter Obiora who is the licensed land surveyor who will verify the boundary dispute.', time: 'Apr 25, 8:00 AM', status: 'read', verified: true, evidence: false, bookmarked: false, attachments: [] },
      { id: 'm2', sender: 'WIT-OBI', text: 'Hello. I am Peter, the survey witness. I have the original beacon records from 2019 that show the true boundary placement.', time: 'Apr 25, 8:15 AM', status: 'read', verified: false, evidence: true, bookmarked: true, attachments: [] },
      { id: 'm3', sender: 'WIT-OBI', text: null, time: 'Apr 25, 8:18 AM', status: 'read', verified: false, evidence: false, bookmarked: false, attachments: [{ name: 'Beacon_Records_2019.pdf', type: 'pdf', size: '2.1 MB' }, { name: 'Survey_Map_Plot4902.jpg', type: 'image', size: '3.8 MB' }] },
      { id: 'm4', sender: 'YOU', text: 'Thank you Peter. Those records are exactly what we needed. The neighbor has been claiming the fence was always there.', time: 'Apr 25, 9:00 AM', status: 'read', verified: false, evidence: false, bookmarked: false, attachments: [] },
      { id: 'm5', sender: 'ADV-WAN', text: 'Peter, can you confirm your availability for a site visit before the May 14th hearing? The court may require a fresh survey report.', time: 'Apr 27, 3:00 PM', status: 'read', verified: false, evidence: false, bookmarked: false, attachments: [] },
      { id: 'm6', sender: 'WIT-OBI', text: 'I will be at the site on Friday at 8am for the survey. I will prepare the certified report within 48 hours.', time: 'Yesterday, 5:30 PM', status: 'delivered', verified: false, evidence: false, bookmarked: false, attachments: [] },
    ],
  },
  {
    id: 'T003',
    type: 'direct',
    caseId: 'KE-2026-2241',
    caseName: 'GBV Protection Order',
    caseStatus: 'urgent',
    participants: ['YOU', 'ADV-NJO'],
    name: null,
    pinned: false,
    unread: 0,
    lastMsg: 'The protection order has been granted. You are safe. Here are the next steps.',
    lastTime: 'Apr 22',
    lastSender: 'ADV-NJO',
    messages: [
      { id: 'm1', sender: 'ADV-NJO', text: 'I have just received the court order. The protection order has been granted. You are safe. Here are the next steps: 1) Keep a copy with you at all times, 2) Save the police station number 0800 720 500, 3) If respondent violates, call police immediately.', time: 'Apr 22, 4:15 PM', status: 'read', verified: true, evidence: false, bookmarked: true, attachments: [{ name: 'Protection_Order_KE2241.pdf', type: 'pdf', size: '318 KB' }] },
    ],
  },
  {
    id: 'T004',
    type: 'official',
    caseId: 'KE-2026-0334',
    caseName: 'Commercial Dispute — Invoice Recovery',
    caseStatus: 'active',
    participants: ['YOU', 'ADV-NJO', 'CLK-001'],
    name: 'Court Registry — KE-2026-0334',
    pinned: false,
    unread: 0,
    lastMsg: 'Your case has been scheduled for May 20, 2026 at 9:00 AM. Court room 5.',
    lastTime: 'Apr 20',
    lastSender: 'CLK-001',
    messages: [
      { id: 'm1', sender: 'CLK-001', text: 'This is the official communication channel for Case KE-2026-0334. All court notifications will be sent here.', time: 'Apr 18, 9:00 AM', status: 'read', verified: true, evidence: false, bookmarked: false, attachments: [] },
      { id: 'm2', sender: 'CLK-001', text: 'Your case has been scheduled for May 20, 2026 at 9:00 AM. Court room 5, Milimani Law Courts. Please ensure all parties are present.', time: 'Apr 20, 11:00 AM', status: 'read', verified: true, evidence: false, bookmarked: true, attachments: [{ name: 'Court_Summons_KE0334.pdf', type: 'pdf', size: '124 KB' }] },
    ],
  },
];

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
function roleConfig(role) {
  return {
    lawyer: { label: 'Advocate', color: 'text-[#6366F1]', bg: 'bg-[#6366F1]/10', border: 'border-[#6366F1]/25', dot: 'bg-[#6366F1]' },
    witness: { label: 'Witness', color: 'text-[#10B981]', bg: 'bg-[#10B981]/10', border: 'border-[#10B981]/25', dot: 'bg-[#10B981]' },
    client: { label: 'Client', color: 'text-[#D4AF37]', bg: 'bg-[#D4AF37]/10', border: 'border-[#D4AF37]/25', dot: 'bg-[#D4AF37]' },
    official: { label: 'Court Official', color: 'text-[#EC4899]', bg: 'bg-[#EC4899]/10', border: 'border-[#EC4899]/25', dot: 'bg-[#EC4899]' },
  }[role] || { label: role, color: 'text-white/40', bg: 'bg-white/5', border: 'border-white/10', dot: 'bg-white/30' };
}

function threadTypeConfig(type) {
  return {
    direct: { icon: MessageSquare, label: 'Direct', color: 'text-white/40' },
    'case-group': { icon: Users, label: 'Case Group', color: 'text-[#D4AF37]' },
    official: { icon: Gavel, label: 'Court Official', color: 'text-[#EC4899]' },
  }[type] || { icon: MessageSquare, label: type, color: 'text-white/40' };
}

function caseStatusBadge(status) {
  return {
    active: { label: 'Active', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
    urgent: { label: 'Urgent', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
    closed: { label: 'Closed', color: 'text-white/30', bg: 'bg-white/5', border: 'border-white/10' },
  }[status] || {};
}

function fileIcon(type) {
  const map = { pdf: { icon: FileText, color: 'text-red-400', bg: 'bg-red-500/10' }, image: { icon: Image, color: 'text-blue-400', bg: 'bg-blue-500/10' }, zip: { icon: FolderOpen, color: 'text-yellow-400', bg: 'bg-yellow-500/10' }, audio: { icon: FileAudio, color: 'text-purple-400', bg: 'bg-purple-500/10' }, video: { icon: FileVideo, color: 'text-pink-400', bg: 'bg-pink-500/10' } };
  return map[type] || { icon: FileText, color: 'text-white/40', bg: 'bg-white/5' };
}

function getThreadDisplayName(thread) {
  if (thread.name) return thread.name;
  const others = thread.participants.filter(id => id !== 'YOU').map(id => PARTICIPANTS_MAP[id]?.name || id);
  return others.join(', ');
}

function getThreadInitials(thread) {
  if (thread.participants.length > 2) return thread.participants.length + '';
  const other = thread.participants.find(id => id !== 'YOU');
  return PARTICIPANTS_MAP[other]?.initials || '??';
}

function getThreadColor(thread) {
  const other = thread.participants.find(id => id !== 'YOU');
  return PARTICIPANTS_MAP[other]?.color || GOLD;
}

function getAllSharedFiles(thread) {
  return thread.messages
    .flatMap(m => (m.attachments || []).map(a => ({ ...a, sender: m.sender, time: m.time })))
    .filter(f => f.name);
}

/* ─────────────────────────────────────────────
   AVATAR
───────────────────────────────────────────── */
function Avatar({ participant, size = 'md', showOnline = false }) {
  const sz = { sm: 'w-7 h-7 text-[10px]', md: 'w-9 h-9 text-xs', lg: 'w-11 h-11 text-sm' }[size];
  const p = typeof participant === 'string' ? PARTICIPANTS_MAP[participant] : participant;
  if (!p) return null;
  return (
    <div className="relative flex-shrink-0">
      <div className={`${sz} rounded-full border-2 flex items-center justify-center font-black`}
        style={{ borderColor: p.color + '40', background: p.color + '20', color: p.color }}>
        {p.initials}
      </div>
      {showOnline && (
        <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#1a1d2e] ${p.online ? 'bg-green-400' : 'bg-white/20'}`} />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MESSAGE STATUS ICONS
───────────────────────────────────────────── */
function MsgStatus({ status, mine }) {
  if (!mine) return null;
  if (status === 'read') return <CheckCheck className="w-3 h-3 text-[#D4AF37]" />;
  if (status === 'delivered') return <CheckCheck className="w-3 h-3 text-white/20" />;
  return <Check className="w-3 h-3 text-white/20" />;
}

/* ─────────────────────────────────────────────
   FILE ATTACHMENT PREVIEW
───────────────────────────────────────────── */
function AttachmentBubble({ file }) {
  const cfg = fileIcon(file.type);
  const Icon = cfg.icon;
  return (
    <div className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-white/8 ${cfg.bg} backdrop-blur-sm mt-1.5 cursor-pointer hover:border-white/15 transition-colors group max-w-[240px]`}>
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${cfg.bg}`}>
        <Icon className={`w-4 h-4 ${cfg.color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white/80 text-[11px] font-semibold truncate">{file.name}</p>
        <p className="text-white/30 text-[10px]">{file.size}</p>
      </div>
      <Download className="w-3.5 h-3.5 text-white/20 group-hover:text-white/60 transition-colors" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   TASK BUBBLE
───────────────────────────────────────────── */
function TaskBubble({ task, onToggle }) {
  return (
    <div className={`px-4 py-3.5 rounded-2xl border mt-1 ${task.done ? 'border-green-500/25 bg-green-500/5' : 'border-[#D4AF37]/25 bg-[#D4AF37]/5'}`}>
      <div className="flex items-start gap-2.5">
        <button onClick={onToggle} className={`w-5 h-5 rounded flex items-center justify-center border flex-shrink-0 mt-0.5 transition-all ${task.done ? 'bg-green-500 border-green-500' : 'border-[#D4AF37]/50 hover:border-[#D4AF37]'}`}>
          {task.done && <Check className="w-3 h-3 text-white" />}
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <ClipboardList className={`w-3.5 h-3.5 ${task.done ? 'text-green-400' : 'text-[#D4AF37]'}`} />
            <span className={`text-xs font-bold uppercase tracking-widest ${task.done ? 'text-green-400' : 'text-[#D4AF37]'}`}>Task Request</span>
          </div>
          <p className={`text-sm font-semibold mb-1 ${task.done ? 'text-white/40 line-through' : 'text-white/85'}`}>{task.title}</p>
          <p className="text-white/40 text-xs mb-2">{task.desc}</p>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-white/25" />
            <span className="text-white/30 text-[10px]">{task.deadline}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MESSAGE CONTEXT MENU
───────────────────────────────────────────── */
function MessageMenu({ msg, mine, onAction, onClose }) {
  const items = [
    { icon: Reply, label: 'Reply', action: 'reply' },
    { icon: Forward, label: 'Forward', action: 'forward' },
    { icon: Copy, label: 'Copy text', action: 'copy' },
    { icon: Bookmark, label: msg.bookmarked ? 'Remove bookmark' : 'Bookmark', action: 'bookmark', active: msg.bookmarked },
    { divider: true },
    { icon: AlertTriangle, label: 'Mark as Evidence', action: 'evidence', color: 'text-[#D4AF37]', active: msg.evidence },
    { icon: Link2, label: 'Link to Case', action: 'linkcase', color: 'text-blue-400' },
    { icon: Pin, label: 'Pin Message', action: 'pin' },
    { divider: true },
    ...(mine ? [{ icon: Trash2, label: 'Delete', action: 'delete', color: 'text-red-400' }] : []),
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: -4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.15 }}
      className={`absolute ${mine ? 'right-full mr-2' : 'left-full ml-2'} top-0 z-50 w-48 rounded-2xl border border-white/8 bg-[#1a1d2e] shadow-2xl shadow-black/50 overflow-hidden py-1`}
    >
      {items.map((item, i) => item.divider ? (
        <div key={i} className="my-1 border-t border-white/5" />
      ) : (
        <button key={i} onClick={() => { onAction(item.action, msg); onClose(); }}
          className={`w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium hover:bg-white/5 transition-colors text-left ${item.color || (item.active ? 'text-[#D4AF37]' : 'text-white/60')}`}>
          <item.icon className="w-3.5 h-3.5" />
          {item.label}
        </button>
      ))}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   SINGLE MESSAGE
───────────────────────────────────────────── */
function Message({ msg, thread, onAction, replyingTo }) {
  const [showMenu, setShowMenu] = useState(false);
  const [hovered, setHovered] = useState(false);
  const menuRef = useRef(null);

  const mine = msg.sender === 'YOU';
  const sender = PARTICIPANTS_MAP[msg.sender];

  useEffect(() => {
    if (!showMenu) return;
    const handle = (e) => { if (!menuRef.current?.contains(e.target)) setShowMenu(false); };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [showMenu]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); }}
      className={`flex gap-3 group relative ${mine ? 'flex-row-reverse' : ''}`}
    >
      {/* Avatar */}
      {!mine && <Avatar participant={msg.sender} size="sm" showOnline />}
      {mine && <div className="w-7 h-7 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 flex items-center justify-center text-[10px] font-black text-[#D4AF37] flex-shrink-0">JO</div>}

      {/* Content */}
      <div className={`flex flex-col max-w-[62%] ${mine ? 'items-end' : 'items-start'}`}>
        {/* Reply badge */}
        {msg.replyTo && (
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/4 border border-white/6 mb-1 max-w-full cursor-pointer hover:bg-white/6 ${mine ? 'flex-row-reverse' : ''}`}>
            <Reply className="w-3 h-3 text-white/25 flex-shrink-0" />
            <p className="text-white/35 text-[10px] truncate">{msg.replyTo}</p>
          </div>
        )}

        {/* Task */}
        {msg.isTask && <TaskBubble task={msg.task} onToggle={() => onAction('toggleTask', msg)} />}

        {/* Text bubble */}
        {msg.text && (
          <div className={`relative px-4 py-3 rounded-2xl text-sm leading-relaxed ${mine
              ? 'bg-[#D4AF37]/12 border border-[#D4AF37]/20 text-white/90 rounded-tr-sm'
              : msg.verified
                ? 'bg-[#6366F1]/12 border border-[#6366F1]/20 text-white/85 rounded-tl-sm'
                : 'bg-[#1a1d2e] border border-white/8 text-white/80 rounded-tl-sm'
            }`}>
            {/* Verified badge */}
            {msg.verified && !mine && (
              <div className="flex items-center gap-1.5 mb-1.5 pb-1.5 border-b border-[#6366F1]/15">
                <BadgeCheck className="w-3 h-3 text-[#6366F1]" />
                <span className="text-[#6366F1] text-[9px] font-bold uppercase tracking-widest">Verified Legal Advice</span>
              </div>
            )}

            {/* Evidence badge */}
            {msg.evidence && (
              <div className="flex items-center gap-1.5 mb-1.5 pb-1.5 border-b border-[#D4AF37]/15">
                <AlertTriangle className="w-3 h-3 text-[#D4AF37]" />
                <span className="text-[#D4AF37] text-[9px] font-bold uppercase tracking-widest">Marked as Evidence</span>
              </div>
            )}

            {msg.text}

            {/* Bookmark indicator */}
            {msg.bookmarked && (
              <Star className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
            )}
          </div>
        )}

        {/* Attachments */}
        {(msg.attachments || []).map((file, i) => (
          <AttachmentBubble key={i} file={file} />
        ))}

        {/* Meta row */}
        <div className={`flex items-center gap-2 mt-1.5 px-1 ${mine ? 'flex-row-reverse' : ''}`}>
          <span className="text-[10px] text-white/20">{msg.time}</span>
          <MsgStatus status={msg.status} mine={mine} />
          {/* Timestamp lock */}
          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <Lock className="w-2.5 h-2.5 text-white/15" />
            <span className="text-[9px] text-white/15">Immutable</span>
          </div>
        </div>
      </div>

      {/* Hover action bar */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className={`absolute top-0 flex items-center gap-0.5 ${mine ? 'left-0 -translate-x-full pr-2' : 'right-0 translate-x-full pl-2'}`}
            style={{ zIndex: 10 }}
          >
            {[
              { icon: Reply, action: 'reply', title: 'Reply' },
              { icon: AlertTriangle, action: 'evidence', title: 'Evidence', active: msg.evidence },
              { icon: Bookmark, action: 'bookmark', title: 'Bookmark', active: msg.bookmarked },
              { icon: MoreHorizontal, action: 'menu', title: 'More' },
            ].map(({ icon: Icon, action, title, active }) => (
              <button key={action}
                onClick={(e) => { e.stopPropagation(); action === 'menu' ? setShowMenu(v => !v) : onAction(action, msg); }}
                title={title}
                className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all border ${active ? 'bg-[#D4AF37]/15 border-[#D4AF37]/30 text-[#D4AF37]' : 'bg-[#1a1d2e] border-white/8 text-white/30 hover:text-white/70 hover:border-white/15'
                  }`}>
                <Icon className="w-3 h-3" />
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Context menu */}
      <AnimatePresence>
        {showMenu && (
          <div ref={menuRef} className="absolute top-0 z-50" style={{ [mine ? 'right' : 'left']: '100%' }}>
            <MessageMenu msg={msg} mine={mine} onAction={onAction} onClose={() => setShowMenu(false)} />
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   AI ASSIST PANEL
───────────────────────────────────────────── */
function AIAssistPanel({ thread, onClose }) {
  const [mode, setMode] = useState('summary');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const prompts = {
    summary: { label: 'Summarize Conversation', desc: 'Get a concise legal summary of this thread', output: `This conversation covers the wrongful dismissal case KE-2026-1102. Key developments: (1) Advocate Njoroge identified retaliatory dismissal under Employment Act s.45; (2) WhatsApp screenshots uploaded as evidence; (3) Payslip task pending completion. Next step: Address two critical contract clauses before the May hearing.` },
    evidence: { label: 'Extract Evidence', desc: 'Identify legally significant statements', output: `3 messages flagged as legally significant:\n\n• Apr 28, 10:30 AM — Adv. Njoroge: Retaliatory dismissal analysis (Expert legal opinion)\n• Apr 28, 11:00 AM — Your question re: WhatsApp messages (Intent to preserve digital evidence)\n• Apr 28, 10:32 AM — Task: Upload payslips (Required for compensation calculation)` },
    useful: { label: 'Case Utility Score', desc: 'How useful is this thread for your case?', output: `Case Utility: 87/100\n\n✓ Expert legal analysis present\n✓ Evidence collection in progress\n✓ Task assignments tracked\n⚠ Payslip task incomplete — address before May 3\n⚠ Contract clauses unresolved — hearing risk` },
    export: { label: 'Export for Court', desc: 'Generate court-ready PDF transcript', output: `Ready to export:\n• 8 messages\n• 2 file attachments\n• 1 verified legal opinion\n• Immutable timestamps preserved\n• SHA-256 hash chain verified\n\nFormat: Court-admissible PDF with cover sheet` },
  };

  const run = (key) => {
    setMode(key);
    setLoading(true);
    setResult(null);
    setTimeout(() => { setLoading(false); setResult(prompts[key].output); }, 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="absolute inset-0 bg-[#1a1d2e] z-20 flex flex-col rounded-tl-none"
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-white font-bold text-sm">Veritas AI — Conversation Analysis</span>
        </div>
        <button onClick={onClose} className="text-white/30 hover:text-white/70"><X className="w-4 h-4" /></button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-3">
        <p className="text-white/35 text-xs">What would you like to do with this conversation?</p>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(prompts).map(([key, p]) => (
            <button key={key} onClick={() => run(key)}
              className={`p-3 rounded-xl border text-left transition-all ${mode === key ? 'border-[#D4AF37]/35 bg-[#D4AF37]/8' : 'border-white/6 bg-white/3 hover:border-white/12'}`}>
              <p className={`text-xs font-bold mb-0.5 ${mode === key ? 'text-[#D4AF37]' : 'text-white/70'}`}>{p.label}</p>
              <p className="text-[10px] text-white/30">{p.desc}</p>
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
                <button className="mt-3 w-full py-2 rounded-xl bg-[#D4AF37] text-[#12141f] text-xs font-black flex items-center justify-center gap-1.5">
                  <Download className="w-3.5 h-3.5" /> Download Court-Ready PDF
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
function RightSidebar({ thread, onAddParticipant }) {
  const [tab, setTab] = useState('participants');
  const sharedFiles = getAllSharedFiles(thread);
  const participants = thread.participants.map(id => PARTICIPANTS_MAP[id]);
  const caseStatus = caseStatusBadge(thread.caseStatus);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Tab headers */}
      <div className="flex border-b border-white/5 px-2 pt-2 gap-0.5 flex-shrink-0">
        {[
          { id: 'participants', icon: Users, label: 'People' },
          { id: 'files', icon: Paperclip, label: 'Files' },
          { id: 'case', icon: Scale, label: 'Case' },
        ].map(({ id, icon: Icon, label }) => (
          <button key={id} onClick={() => setTab(id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-semibold transition-all ${tab === id ? 'bg-[#D4AF37]/12 text-[#D4AF37] border border-[#D4AF37]/20' : 'text-white/30 hover:text-white/55 hover:bg-white/4'}`}>
            <Icon className="w-3 h-3" /> {label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence mode="wait">
          {/* Participants */}
          {tab === 'participants' && (
            <motion.div key="participants" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
              {participants.map((p, i) => {
                const role = roleConfig(p.role);
                return (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-white/5 bg-white/2">
                    <Avatar participant={p} size="md" showOnline />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <p className="text-white/85 text-xs font-bold truncate">{p.name}</p>
                        {p.verified && <BadgeCheck className="w-3 h-3 text-[#D4AF37] flex-shrink-0" />}
                      </div>
                      <span className={`inline-block text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${role.color} ${role.bg} ${role.border}`}>{role.label}</span>
                      {p.specialty && <p className="text-white/25 text-[10px] mt-1">{p.specialty}</p>}
                      <div className="flex items-center gap-1.5 mt-1">
                        <div className={`w-1.5 h-1.5 rounded-full ${p.online ? 'bg-green-400' : 'bg-white/15'}`} />
                        <span className="text-white/25 text-[10px]">{p.online ? 'Online now' : 'Offline'}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
              <button onClick={onAddParticipant}
                className="w-full flex items-center gap-2 py-2.5 px-3 rounded-xl border border-dashed border-white/10 text-white/25 hover:text-white/50 hover:border-white/20 text-xs font-semibold transition-all">
                <UserPlus className="w-3.5 h-3.5" /> Add Participant
              </button>
            </motion.div>
          )}

          {/* Files */}
          {tab === 'files' && (
            <motion.div key="files" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
              {sharedFiles.length === 0 ? (
                <div className="text-center py-8">
                  <Paperclip className="w-8 h-8 text-white/10 mx-auto mb-2" />
                  <p className="text-white/20 text-xs">No files shared yet</p>
                </div>
              ) : (
                <>
                  <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold">{sharedFiles.length} shared file{sharedFiles.length > 1 ? 's' : ''}</p>
                  {sharedFiles.map((file, i) => {
                    const cfg = fileIcon(file.type);
                    const Icon = cfg.icon;
                    const sender = PARTICIPANTS_MAP[file.sender];
                    return (
                      <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border border-white/5 ${cfg.bg} cursor-pointer hover:border-white/12 transition-colors group`}>
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${cfg.bg}`}>
                          <Icon className={`w-4 h-4 ${cfg.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white/75 text-[11px] font-semibold truncate">{file.name}</p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-white/25 text-[10px]">{file.size}</span>
                            <span className="text-white/15">·</span>
                            <span className="text-white/25 text-[10px]">{sender?.initials}</span>
                          </div>
                        </div>
                        <Download className="w-3.5 h-3.5 text-white/15 group-hover:text-white/60 transition-colors" />
                      </div>
                    );
                  })}
                </>
              )}
            </motion.div>
          )}

          {/* Case */}
          {tab === 'case' && (
            <motion.div key="case" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
              {thread.caseId ? (
                <>
                  <div className="p-4 rounded-xl border border-white/6 bg-white/2">
                    <div className="flex items-center gap-2 mb-3">
                      <Scale className="w-4 h-4 text-[#D4AF37]" />
                      <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest">Linked Case</span>
                    </div>
                    <p className="text-white font-bold text-sm mb-1">{thread.caseName}</p>
                    <p className="text-white/35 text-[11px] font-mono mb-3">{thread.caseId}</p>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold border ${caseStatus.color} ${caseStatus.bg} ${caseStatus.border}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${thread.caseStatus === 'urgent' ? 'bg-red-400 animate-pulse' : 'bg-green-400'}`} />
                      {caseStatus.label}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {[
                      { icon: ExternalLink, label: 'View Full Case', color: 'text-[#D4AF37]' },
                      { icon: FileText, label: 'View Case Documents', color: 'text-blue-400' },
                      { icon: Activity, label: 'Case Timeline', color: 'text-purple-400' },
                    ].map(({ icon: Icon, label, color }, i) => (
                      <button key={i} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-white/6 bg-white/2 hover:border-white/12 hover:bg-white/4 transition-all text-xs font-semibold text-white/55 hover:text-white/80">
                        <Icon className={`w-3.5 h-3.5 ${color}`} /> {label}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <Scale className="w-8 h-8 text-white/10 mx-auto mb-2" />
                  <p className="text-white/20 text-xs">No case linked</p>
                  <button className="mt-3 px-4 py-2 rounded-xl border border-white/8 text-white/30 text-xs hover:text-white/60 transition-colors">
                    Link to Case
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Export chat */}
      <div className="p-4 border-t border-white/5 flex-shrink-0">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/8 bg-white/3 hover:bg-white/5 text-white/40 hover:text-white/70 text-xs font-semibold transition-all">
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
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.93 }} animate={{ scale: 1 }} exit={{ scale: 0.93 }}
        onClick={e => e.stopPropagation()}
        className="w-full max-w-md rounded-3xl border border-white/8 bg-[#1a1d2e] p-7 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-white font-bold text-lg flex items-center gap-2"><UserPlus className="w-5 h-5 text-[#D4AF37]" /> Add Participant</h3>
          <button onClick={onClose} className="text-white/30 hover:text-white/60"><X className="w-5 h-5" /></button>
        </div>
        <div className="space-y-3 mb-5">
          <div>
            <label className="text-white/35 text-xs mb-1.5 block">Email Address</label>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="participant@example.com"
              className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm outline-none focus:border-[#D4AF37]/40 transition-colors placeholder:text-white/20" />
          </div>
          <div>
            <label className="text-white/35 text-xs mb-1.5 block">Role</label>
            <div className="grid grid-cols-2 gap-2">
              {['witness', 'lawyer', 'official', 'client'].map(r => (
                <button key={r} onClick={() => setRole(r)}
                  className={`py-2.5 rounded-xl border text-xs font-bold capitalize transition-all ${role === r ? 'border-[#D4AF37]/35 bg-[#D4AF37]/8 text-[#D4AF37]' : 'border-white/8 bg-white/3 text-white/40 hover:border-white/15'}`}>
                  {r}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-white/35 text-xs mb-1.5 block">Personal Note (optional)</label>
            <textarea rows={2} placeholder="e.g. Peter is the land surveyor witness..."
              className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm outline-none resize-none placeholder:text-white/20 focus:border-[#D4AF37]/40 transition-colors" />
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-white/5 border border-white/8 text-white/40 text-sm font-semibold">Cancel</button>
          <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#c9a430] text-[#12141f] text-sm font-black transition-all flex items-center justify-center gap-2">
            <Send className="w-4 h-4" /> Send Invite
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   NEW CONVERSATION MODAL
───────────────────────────────────────────── */
function NewChatModal({ onClose }) {
  const [type, setType] = useState('direct');
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.93 }} animate={{ scale: 1 }} exit={{ scale: 0.93 }}
        onClick={e => e.stopPropagation()}
        className="w-full max-w-md rounded-3xl border border-white/8 bg-[#1a1d2e] p-7 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-white font-bold text-lg flex items-center gap-2"><MessageSquare className="w-5 h-5 text-[#D4AF37]" /> New Conversation</h3>
          <button onClick={onClose} className="text-white/30 hover:text-white/60"><X className="w-5 h-5" /></button>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-5">
          {[
            { id: 'direct', icon: User, label: 'Direct', desc: 'With one person' },
            { id: 'case-group', icon: Users, label: 'Case Group', desc: 'Multi-party' },
            { id: 'official', icon: Gavel, label: 'Official', desc: 'Court channel' },
          ].map(({ id, icon: Icon, label, desc }) => (
            <button key={id} onClick={() => setType(id)}
              className={`p-3 rounded-xl border text-center transition-all ${type === id ? 'border-[#D4AF37]/35 bg-[#D4AF37]/8' : 'border-white/8 bg-white/3 hover:border-white/15'}`}>
              <Icon className={`w-5 h-5 mx-auto mb-1.5 ${type === id ? 'text-[#D4AF37]' : 'text-white/30'}`} />
              <p className={`text-xs font-bold ${type === id ? 'text-[#D4AF37]' : 'text-white/60'}`}>{label}</p>
              <p className="text-[10px] text-white/25 mt-0.5">{desc}</p>
            </button>
          ))}
        </div>
        <div className="space-y-3 mb-5">
          <input placeholder="Search by name or email…"
            className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm outline-none placeholder:text-white/20 focus:border-[#D4AF37]/40 transition-colors" />
          <select className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60 text-sm outline-none focus:border-[#D4AF37]/40 transition-colors">
            <option value="">Link to Case (optional)</option>
            {MOCK_THREADS.filter(t => t.caseId).map(t => <option key={t.caseId}>{t.caseId} — {t.caseName}</option>)}
          </select>
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-white/5 border border-white/8 text-white/40 text-sm font-semibold">Cancel</button>
          <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#c9a430] text-[#12141f] text-sm font-black">Start Chat</button>
        </div>
      </motion.div>
    </motion.div>
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
  const [showRightPanel, setShowRightPanel] = useState(true);
  const [showInvite, setShowInvite] = useState(false);
  const [showNewChat, setShowNewChat] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [evidenceToast, setEvidenceToast] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const selectedThread = threads.find(t => t.id === selectedId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedId, threads]);

  const filteredThreads = threads.filter(t => {
    const q = search.toLowerCase();
    const name = getThreadDisplayName(t).toLowerCase();
    const matchSearch = !q || name.includes(q) || (t.caseId || '').toLowerCase().includes(q) || t.lastMsg.toLowerCase().includes(q);
    const matchType = typeFilter === 'all' || t.type === typeFilter;
    return matchSearch && matchType;
  });

  const sendMessage = useCallback(() => {
    if (!input.trim() || !selectedThread) return;
    const newMsg = {
      id: 'm' + Date.now(),
      sender: 'YOU',
      text: input.trim(),
      time: 'Just now',
      status: 'sent',
      verified: false,
      evidence: false,
      bookmarked: false,
      attachments: [],
      ...(replyingTo ? { replyTo: replyingTo.text?.substring(0, 60) + '…' } : {}),
    };
    setThreads(prev => prev.map(t => t.id === selectedId
      ? { ...t, messages: [...t.messages, newMsg], lastMsg: input.trim(), lastTime: 'Just now', lastSender: 'YOU' }
      : t
    ));
    setInput('');
    setReplyingTo(null);
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  }, [input, selectedId, replyingTo, selectedThread]);

  const handleMessageAction = useCallback((action, msg) => {
    if (action === 'reply') { setReplyingTo(msg); inputRef.current?.focus(); return; }
    if (action === 'copy') { navigator.clipboard?.writeText(msg.text || ''); return; }
    if (action === 'toggleTask') {
      setThreads(prev => prev.map(t => t.id === selectedId
        ? { ...t, messages: t.messages.map(m => m.id === msg.id ? { ...m, task: { ...m.task, done: !m.task.done } } : m) }
        : t
      ));
      return;
    }

    const field = { bookmark: 'bookmarked', evidence: 'evidence' }[action];
    if (field) {
      const next = !msg[field];
      setThreads(prev => prev.map(t => t.id === selectedId
        ? { ...t, messages: t.messages.map(m => m.id === msg.id ? { ...m, [field]: next } : m) }
        : t
      ));
      if (action === 'evidence' && next) {
        setEvidenceToast(`Message marked as evidence and saved to vault`);
        setTimeout(() => setEvidenceToast(null), 4000);
      }
    }
  }, [selectedId]);

  const unreadCount = threads.reduce((acc, t) => acc + (t.unread || 0), 0);

  return (
    <div className="flex h-full overflow-hidden bg-[#12141f]" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>

      {/* Modals */}
      <AnimatePresence>
        {showInvite && <InviteModal onClose={() => setShowInvite(false)} />}
        {showNewChat && <NewChatModal onClose={() => setShowNewChat(false)} />}
      </AnimatePresence>

      {/* Evidence Toast */}
      <AnimatePresence>
        {evidenceToast && (
          <motion.div initial={{ opacity: 0, y: -10, x: '-50%' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="fixed top-5 left-1/2 z-[100] flex items-center gap-2.5 px-5 py-3 rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 shadow-2xl"
            style={{ minWidth: 260 }}>
            <AlertTriangle className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-[#D4AF37] text-sm font-semibold">{evidenceToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── LEFT SIDEBAR ── */}
      <div className="w-72 border-r border-white/6 flex flex-col flex-shrink-0 bg-[#0e1019]">
        {/* Header */}
        <div className="p-4 border-b border-white/5 flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h2 className="text-white font-black text-sm tracking-tight">Messages</h2>
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-[#D4AF37] text-[#12141f] text-[9px] font-black">{unreadCount}</span>
              )}
            </div>
            <button onClick={() => setShowNewChat(true)}
              className="w-8 h-8 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center hover:bg-[#D4AF37]/20 transition-colors">
              <Plus className="w-3.5 h-3.5 text-[#D4AF37]" />
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search conversations…"
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/4 border border-white/6 text-white/70 text-xs outline-none placeholder:text-white/20 focus:border-[#D4AF37]/25 transition-colors" />
          </div>

          {/* Type filters */}
          <div className="flex gap-1">
            {[
              { id: 'all', label: 'All' },
              { id: 'direct', label: 'Direct' },
              { id: 'case-group', label: 'Groups' },
              { id: 'official', label: 'Court' },
            ].map(({ id, label }) => (
              <button key={id} onClick={() => setTypeFilter(id)}
                className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold transition-all ${typeFilter === id ? 'bg-[#D4AF37]/12 text-[#D4AF37] border border-[#D4AF37]/20' : 'text-white/25 hover:text-white/50'}`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Thread list */}
        <div className="flex-1 overflow-y-auto">
          {filteredThreads.length === 0 ? (
            <div className="py-10 text-center">
              <MessageSquare className="w-8 h-8 text-white/10 mx-auto mb-2" />
              <p className="text-white/20 text-xs">No conversations found</p>
            </div>
          ) : (
            filteredThreads.map((thread) => {
              const isSelected = selectedId === thread.id;
              const { icon: TypeIcon, color: typeColor } = threadTypeConfig(thread.type);
              const displayName = getThreadDisplayName(thread);
              const initials = getThreadInitials(thread);
              const bgColor = getThreadColor(thread);
              const isGroup = thread.participants.length > 2;

              return (
                <motion.button
                  key={thread.id}
                  onClick={() => { setSelectedId(thread.id); setShowAI(false); }}
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.15 }}
                  className={`w-full text-left px-4 py-3.5 border-b border-white/3 transition-colors relative ${isSelected
                      ? 'bg-[#D4AF37]/6 border-l-2 border-l-[#D4AF37]'
                      : 'hover:bg-white/2 border-l-2 border-l-transparent'
                    }`}
                >
                  {thread.pinned && <Pin className="absolute top-2 right-3 w-2.5 h-2.5 text-white/15" />}

                  <div className="flex items-start gap-3">
                    {/* Avatar / Group indicator */}
                    <div className="relative flex-shrink-0">
                      {isGroup ? (
                        <div className="relative w-9 h-9">
                          {thread.participants.filter(id => id !== 'YOU').slice(0, 2).map((id, i) => {
                            const p = PARTICIPANTS_MAP[id];
                            return (
                              <div key={id} className={`absolute w-6 h-6 rounded-full border border-[#0e1019] flex items-center justify-center text-[8px] font-black`}
                                style={{ background: p?.color + '30', color: p?.color, borderColor: '#0e1019', top: i === 0 ? 0 : '50%', left: i === 0 ? 0 : '40%' }}>
                                {p?.initials}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black border-2 flex-shrink-0"
                          style={{ background: bgColor + '20', color: bgColor, borderColor: bgColor + '35' }}>
                          {initials}
                        </div>
                      )}

                      {/* Type indicator */}
                      <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#0e1019] flex items-center justify-center`}>
                        <TypeIcon className={`w-2.5 h-2.5 ${typeColor}`} />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className={`text-xs font-bold truncate pr-2 ${isSelected ? 'text-white' : 'text-white/80'}`}>{displayName}</p>
                        <span className="text-[10px] text-white/20 flex-shrink-0">{thread.lastTime}</span>
                      </div>
                      {thread.caseId && (
                        <p className="text-[9px] text-white/20 font-mono mb-0.5">{thread.caseId}</p>
                      )}
                      <p className={`text-[11px] truncate ${thread.unread > 0 ? 'text-white/65 font-semibold' : 'text-white/30'}`}>
                        {thread.lastSender === 'YOU' ? 'You: ' : ''}{thread.lastMsg}
                      </p>
                    </div>

                    {thread.unread > 0 && (
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#D4AF37] text-[#12141f] text-[9px] font-black flex items-center justify-center mt-1">
                        {thread.unread}
                      </span>
                    )}
                  </div>

                  {/* Case status pill */}
                  {thread.caseStatus === 'urgent' && (
                    <div className="mt-2 flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                      <span className="text-[9px] text-red-400 font-bold uppercase tracking-widest">Urgent Case</span>
                    </div>
                  )}
                </motion.button>
              );
            })
          )}
        </div>
      </div>

      {/* ── MAIN CHAT ── */}
      {selectedThread ? (
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {/* Chat header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/6 bg-[#12141f] flex-shrink-0">
            <div className="flex items-center gap-3">
              {/* Participants avatars */}
              <div className="flex -space-x-2">
                {selectedThread.participants.filter(id => id !== 'YOU').slice(0, 3).map(id => (
                  <Avatar key={id} participant={id} size="md" showOnline />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-white font-bold text-sm">{getThreadDisplayName(selectedThread)}</p>
                  {selectedThread.type === 'official' && <BadgeCheck className="w-4 h-4 text-[#EC4899]" />}
                  {selectedThread.participants.some(id => PARTICIPANTS_MAP[id]?.verified && id !== 'YOU') && (
                    <BadgeCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  )}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  {selectedThread.caseId && (
                    <span className="text-[10px] text-white/25 font-mono">{selectedThread.caseId}</span>
                  )}
                  <span className="text-white/10">·</span>
                  <div className="flex items-center gap-1">
                    <div className={`w-1.5 h-1.5 rounded-full ${selectedThread.participants.some(id => PARTICIPANTS_MAP[id]?.online && id !== 'YOU') ? 'bg-green-400' : 'bg-white/15'}`} />
                    <span className="text-[10px] text-white/25">
                      {selectedThread.participants.filter(id => PARTICIPANTS_MAP[id]?.online && id !== 'YOU').length > 0 ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1.5">
              <button title="AI Analysis" onClick={() => setShowAI(v => !v)}
                className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${showAI ? 'bg-[#D4AF37]/12 border-[#D4AF37]/30 text-[#D4AF37]' : 'bg-white/4 border-white/8 text-white/35 hover:text-white/70'}`}>
                <Sparkles className="w-4 h-4" />
              </button>
              <button title="Voice call" className="w-9 h-9 rounded-xl bg-white/4 border border-white/8 flex items-center justify-center text-white/35 hover:text-white/70 hover:bg-white/7 transition-all">
                <Phone className="w-4 h-4" />
              </button>
              <button title="Video call" className="w-9 h-9 rounded-xl bg-white/4 border border-white/8 flex items-center justify-center text-white/35 hover:text-white/70 hover:bg-white/7 transition-all">
                <Video className="w-4 h-4" />
              </button>
              <button onClick={() => setShowRightPanel(v => !v)} title="Case panel"
                className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${showRightPanel ? 'bg-white/8 border-white/12 text-white/60' : 'bg-white/4 border-white/8 text-white/35 hover:text-white/60'}`}>
                <Layers className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-xl bg-white/4 border border-white/8 flex items-center justify-center text-white/35 hover:text-white/70 transition-all">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4 relative">
            {/* E2E banner */}
            <div className="flex items-center gap-3 my-1">
              <div className="flex-1 h-px bg-white/4" />
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/3 border border-white/6">
                <Lock className="w-3 h-3 text-green-400" />
                <span className="text-[10px] text-white/30 font-medium">End-to-end encrypted · Attorney-client privileged</span>
              </div>
              <div className="flex-1 h-px bg-white/4" />
            </div>

            {selectedThread.messages.map((msg, i) => (
              <Message
                key={msg.id}
                msg={msg}
                thread={selectedThread}
                onAction={handleMessageAction}
                replyingTo={replyingTo}
              />
            ))}

            {/* Typing indicator */}
            {selectedThread.id === 'T001' && (
              <div className="flex items-center gap-3">
                <Avatar participant="ADV-NJO" size="sm" />
                <div className="flex items-center gap-1 px-4 py-3 rounded-2xl rounded-tl-sm bg-[#1a1d2e] border border-white/8">
                  {[0, 1, 2].map(i => (
                    <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-white/30"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }} />
                  ))}
                </div>
                <span className="text-[10px] text-white/20">Adv. Njoroge is typing…</span>
              </div>
            )}

            <div ref={messagesEndRef} />

            {/* AI Assist overlay */}
            <AnimatePresence>
              {showAI && <AIAssistPanel thread={selectedThread} onClose={() => setShowAI(false)} />}
            </AnimatePresence>
          </div>

          {/* Reply preview */}
          <AnimatePresence>
            {replyingTo && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                className="px-5 py-3 border-t border-white/5 bg-[#1a1d2e] flex items-center gap-3">
                <div className="w-0.5 h-full bg-[#D4AF37] rounded-full self-stretch" />
                <div className="flex-1">
                  <p className="text-[#D4AF37] text-[10px] font-bold mb-0.5">Replying to {PARTICIPANTS_MAP[replyingTo.sender]?.name}</p>
                  <p className="text-white/40 text-xs truncate">{replyingTo.text?.substring(0, 80)}</p>
                </div>
                <button onClick={() => setReplyingTo(null)} className="text-white/20 hover:text-white/60"><X className="w-4 h-4" /></button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input area */}
          <div className="p-4 border-t border-white/6 flex-shrink-0 bg-[#12141f]">
            <div className="flex items-end gap-3 p-3 rounded-2xl bg-[#1a1d2e] border border-white/8 focus-within:border-[#D4AF37]/35 transition-colors">
              {/* Attach buttons */}
              <div className="flex items-center gap-0.5 flex-shrink-0 pb-0.5">
                {[
                  { icon: Paperclip, title: 'Attach file' },
                  { icon: Image, title: 'Send image' },
                  { icon: FileText, title: 'Send document' },
                ].map(({ icon: Icon, title }, i) => (
                  <button key={i} title={title} className="w-8 h-8 rounded-xl hover:bg-white/6 flex items-center justify-center transition-colors">
                    <Icon className="w-4 h-4 text-white/25 hover:text-white/60" />
                  </button>
                ))}
              </div>

              {/* Text input */}
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                placeholder="Type a message to your advocate…"
                rows={1}
                style={{ resize: 'none', minHeight: 36, maxHeight: 120 }}
                className="flex-1 bg-transparent text-white/80 text-sm outline-none placeholder:text-white/20 py-1.5 leading-relaxed"
                onInput={e => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }}
              />

              {/* Voice note */}
              <button
                onClick={() => setIsRecording(v => !v)}
                className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${isRecording ? 'bg-red-500/20 border border-red-500/30' : 'hover:bg-white/6'}`}
              >
                {isRecording
                  ? <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.8, repeat: Infinity }}><MicOff className="w-4 h-4 text-red-400" /></motion.div>
                  : <Mic className="w-4 h-4 text-white/25 hover:text-white/60" />
                }
              </button>

              {/* Send */}
              <button onClick={sendMessage}
                className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${input.trim() ? 'bg-[#D4AF37] hover:bg-[#c9a430] shadow-lg shadow-[#D4AF37]/20' : 'bg-white/4'}`}>
                <Send className={`w-4 h-4 ${input.trim() ? 'text-[#12141f]' : 'text-white/15'}`} />
              </button>
            </div>

            {/* Footer info row */}
            <div className="flex items-center justify-between mt-2 px-1">
              <div className="flex items-center gap-1.5">
                <Lock className="w-2.5 h-2.5 text-green-400" />
                <span className="text-[10px] text-white/18">Encrypted · Attorney-client privileged</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-white/15">Shift+Enter for new line</span>
                {isRecording && (
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                    <span className="text-[10px] text-red-400 font-semibold">Recording…</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <MessageSquare className="w-12 h-12 text-white/10 mx-auto mb-3" />
            <p className="text-white/30 font-semibold">Select a conversation</p>
          </div>
        </div>
      )}

      {/* ── RIGHT SIDEBAR ── */}
      <AnimatePresence>
        {showRightPanel && selectedThread && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 overflow-hidden border-l border-white/6 bg-[#0e1019]"
          >
            <RightSidebar thread={selectedThread} onAddParticipant={() => setShowInvite(true)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}