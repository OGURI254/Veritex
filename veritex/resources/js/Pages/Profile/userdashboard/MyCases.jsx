import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Search, Landmark, Calendar, Flag, Brain, Clock,
  UserCheck, CheckCircle, Circle, FileText, Eye, Download,
  Shield, Video, Mic, Image, Lock, Scale, AlertTriangle,
  TrendingUp, Zap, MessageSquare, CreditCard, Upload, Bell,
  ChevronRight, ChevronDown, MoreHorizontal, Filter, Grid3x3,
  List, X, BadgeCheck, Activity, Gavel, Phone, MapPin, Star,
  BarChart2, Folder, ArrowRight, Check, AlertCircle, Info,
  Users, Bookmark, Hash, Layers, Sparkles, Loader, RefreshCw,
  PenTool, Send, ClipboardList, FolderOpen, RotateCcw, Target,
  TrendingDown, DollarSign, Play, Pause, Paperclip, UploadCloud,
  CheckSquare, Navigation, ExternalLink, Archive, Flag as FlagIcon,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   MOCK DATA
───────────────────────────────────────────── */
const MOCK_CASES = [
  {
    id: 'KE-2026-1102',
    title: 'Unfair Dismissal',
    type: 'Employment',
    status: 'active',
    urgency: 'high',
    opponent: 'Kamau Holdings Ltd',
    court: 'Employment & Labour Relations Court, Nairobi',
    filed: '2026-03-15',
    advocate: 'Adv. Grace Njoroge',
    advocateInitials: 'GN',
    advocateColor: '#6366F1',
    advocateOnline: true,
    progress: 62,
    confidence: 78,
    stage: 'Discovery & Evidence',
    nextHearing: '2026-05-14',
    lastUpdate: '2 days ago',
    nextAction: 'Upload 3 months of payslips',
    nextActionUrgent: true,
    daysOpen: 47,
    estimatedDuration: '4–6 months',
    riskLevel: 'medium',
    riskPct: 56,
    category: 'Business',
    notifications: [
      { id: 1, text: 'Advocate uploaded marked-up contract', time: '2 hours ago', type: 'document', unread: true },
      { id: 2, text: 'Hearing date confirmed: May 14', time: 'Yesterday', type: 'court', unread: true },
      { id: 3, text: 'Payslips task is overdue', time: '3 days ago', type: 'alert', unread: false },
    ],
    timeline: [
      { label: 'Case Opened & Reported', date: 'Mar 15, 2026', done: true, active: false, notes: 'Wrongful dismissal complaint filed via Veritex' },
      { label: 'Lawyer Assigned', date: 'Mar 16, 2026', done: true, active: false, notes: 'Adv. Grace Njoroge accepted the case' },
      { label: 'Evidence Collection', date: 'Apr 1–28, 2026', done: true, active: false, notes: '14 WhatsApp screenshots, dismissal letter uploaded' },
      { label: 'Filed in Court', date: 'Apr 20, 2026', done: true, active: false, notes: 'Plaint filed at ELRC Nairobi, case number assigned' },
      { label: 'Discovery & Evidence Review', date: 'Current', done: false, active: true, notes: 'Payslips required. Contract review ongoing.' },
      { label: 'First Hearing', date: 'May 14, 2026', done: false, active: false, notes: 'Directions hearing — both parties to appear' },
      { label: 'Full Hearing', date: 'TBD', done: false, active: false, notes: 'Date to be set at directions hearing' },
      { label: 'Judgment', date: 'TBD', done: false, active: false, notes: 'Expected 2–4 months after full hearing' },
    ],
    documents: [
      { name: 'Plaint — ELRC Filing', type: 'pdf', size: '218 KB', date: 'Apr 20', by: 'Adv. Njoroge', status: 'filed' },
      { name: 'Employment Contract (Marked Up)', type: 'pdf', size: '148 KB', date: 'Apr 28', by: 'Adv. Njoroge', status: 'review' },
      { name: 'Dismissal Letter — March 2026', type: 'pdf', size: '86 KB', date: 'Apr 2', by: 'You', status: 'uploaded' },
      { name: 'AI Demand Letter Draft', type: 'pdf', size: '42 KB', date: 'Apr 15', by: 'Veritex AI', status: 'draft' },
    ],
    evidence: [
      { name: 'WhatsApp_Screenshots_14.zip', type: 'zip', size: '4.2 MB', date: 'Apr 28, 11:45 AM', hash: 'SHA-256: 8d969e…c6c92', secured: true, by: 'You' },
      { name: 'HR_Complaint_Email.pdf', type: 'pdf', size: '120 KB', date: 'Apr 10, 2:00 PM', hash: 'SHA-256: a1b2c3…d4e5f6', secured: true, by: 'You' },
      { name: 'Payslips_Jan-Mar_2026.pdf', type: 'pdf', size: '340 KB', date: 'PENDING', hash: null, secured: false, by: null, required: true },
      { name: 'Witness_Statement_AW.pdf', type: 'pdf', size: '96 KB', date: 'Apr 22, 9:00 AM', hash: 'SHA-256: f3e9a2…b1c0d9', secured: true, by: 'Adv. Njoroge' },
    ],
    payment: {
      total: 85000,
      paid: 42500,
      currency: 'KES',
      milestones: [
        { label: 'Initial Consultation', pct: 10, amount: 8500, paid: true, date: 'Mar 16', due: null, active: false },
        { label: 'Case Filing Fee', pct: 20, amount: 17000, paid: true, date: 'Apr 20', due: null, active: false },
        { label: 'Discovery Phase', pct: 20, amount: 17000, paid: false, due: 'May 10', active: true },
        { label: 'Court Representation', pct: 30, amount: 25500, paid: false, due: 'May 14', active: false },
        { label: 'Judgment & Conclusion', pct: 20, amount: 17000, paid: false, due: 'TBD', active: false },
      ],
    },
    insights: {
      duration: '4–6 months',
      successChance: 78,
      riskLabel: 'Medium',
      recommendation: 'Prioritise uploading payslips before May 10. The non-compete clause in your contract is likely unenforceable — do not let the employer use it as leverage.',
      keyFacts: ['Dismissal followed HR complaint by 4 days (strong retaliation indicator)', 'Non-compete clause likely unenforceable per Employment Act s.45', '14 WhatsApp screenshots secured as evidence'],
    },
    accessLog: [
      { who: 'Adv. Grace Njoroge', action: 'Viewed case files', time: 'Today, 2:40 PM' },
      { who: 'You', action: 'Uploaded WhatsApp screenshots', time: 'Apr 28, 11:45 AM' },
      { who: 'Adv. Grace Njoroge', action: 'Uploaded marked contract', time: 'Apr 28, 2:41 PM' },
    ],
  },
  {
    id: 'KE-2026-0889',
    title: 'Land Boundary Dispute',
    type: 'Land',
    status: 'in-court',
    urgency: 'medium',
    opponent: 'Njuguna Family',
    court: 'Environment & Land Court, Kiambu',
    filed: '2026-02-20',
    advocate: 'Adv. Wanjiru Muthoni',
    advocateInitials: 'WM',
    advocateColor: '#8B5CF6',
    advocateOnline: false,
    progress: 75,
    confidence: 85,
    stage: 'Expert Evidence Phase',
    nextHearing: '2026-05-20',
    lastUpdate: '5 days ago',
    nextAction: 'Confirm surveyor for site visit',
    nextActionUrgent: false,
    daysOpen: 79,
    estimatedDuration: '2–3 months',
    riskLevel: 'low',
    riskPct: 20,
    category: 'Personal',
    notifications: [
      { id: 1, text: 'Surveyor Peter Obiora confirmed site visit Friday', time: 'Yesterday', type: 'update', unread: true },
      { id: 2, text: 'Next hearing May 20 — confirm attendance', time: '3 days ago', type: 'court', unread: false },
    ],
    timeline: [
      { label: 'Dispute Reported', date: 'Feb 20, 2026', done: true, active: false, notes: 'Land encroachment reported at ELC Kiambu' },
      { label: 'Lawyer Assigned', date: 'Feb 21, 2026', done: true, active: false, notes: 'Adv. Wanjiru Muthoni instructed' },
      { label: 'Survey Evidence Obtained', date: 'Mar 5, 2026', done: true, active: false, notes: 'Beacon records 2019 secured from surveyor' },
      { label: 'Case Filed at ELC', date: 'Mar 10, 2026', done: true, active: false, notes: 'Originating summons filed' },
      { label: 'Expert Evidence Phase', date: 'Current', done: false, active: true, notes: 'Surveyor site visit Friday. Report due 48hrs later.' },
      { label: 'Hearing — May 20', date: 'May 20, 2026', done: false, active: false, notes: 'Directions hearing with expert report' },
      { label: 'Final Determination', date: 'TBD', done: false, active: false, notes: 'Court to issue order fixing boundary' },
    ],
    documents: [
      { name: 'Originating Summons', type: 'pdf', size: '180 KB', date: 'Mar 10', by: 'Adv. Wanjiru', status: 'filed' },
      { name: 'Beacon Records 2019', type: 'pdf', size: '2.1 MB', date: 'Mar 5', by: 'Witness: P. Obiora', status: 'uploaded' },
      { name: 'Land Sale Agreement LR4902', type: 'pdf', size: '224 KB', date: 'Feb 25', by: 'You', status: 'signed' },
    ],
    evidence: [
      { name: 'Beacon_Records_2019.pdf', type: 'pdf', size: '2.1 MB', date: 'Mar 5, 8:18 AM', hash: 'SHA-256: 9c8f7e…b2a1d0', secured: true, by: 'P. Obiora' },
      { name: 'Survey_Map_Plot4902.jpg', type: 'image', size: '3.8 MB', date: 'Mar 5, 8:18 AM', hash: 'SHA-256: 4f5e6d…c7b8a9', secured: true, by: 'P. Obiora' },
      { name: 'Surveyor_Report_May2026.pdf', type: 'pdf', size: '1.2 MB', date: 'PENDING', hash: null, secured: false, by: null, required: true },
    ],
    payment: {
      total: 60000,
      paid: 48000,
      currency: 'KES',
      milestones: [
        { label: 'Consultation & Filing', pct: 30, amount: 18000, paid: true, date: 'Feb 21', due: null, active: false },
        { label: 'Evidence & Discovery', pct: 30, amount: 18000, paid: true, date: 'Mar 15', due: null, active: false },
        { label: 'Expert Witness Fees', pct: 20, amount: 12000, paid: true, date: 'Apr 10', due: null, active: false },
        { label: 'Hearing Representation', pct: 20, amount: 12000, paid: false, due: 'May 18', active: true },
      ],
    },
    insights: {
      duration: '2–3 months',
      successChance: 85,
      riskLabel: 'Low',
      recommendation: 'Beacon records from 2019 are strong physical evidence. Ensure surveyor report is submitted 5 days before hearing. Strong position — avoid settlement unless highly favourable.',
      keyFacts: ['2019 beacon records predate the dispute', 'Certified surveyor witness adds significant credibility', 'Opponent has no documented counter-evidence'],
    },
    accessLog: [
      { who: 'Adv. Wanjiru Muthoni', action: 'Reviewed survey documents', time: 'Apr 27, 3:00 PM' },
      { who: 'P. Obiora', action: 'Uploaded beacon records', time: 'Mar 5, 8:18 AM' },
    ],
  },
  {
    id: 'KE-2026-2241',
    title: 'GBV Protection Order',
    type: 'Family',
    status: 'resolved',
    urgency: 'low',
    opponent: 'Respondent (Sealed)',
    court: 'Milimani Magistrates Court',
    filed: '2026-04-01',
    advocate: 'Adv. Grace Njoroge',
    advocateInitials: 'GN',
    advocateColor: '#6366F1',
    advocateOnline: true,
    progress: 100,
    confidence: 100,
    stage: 'Order Granted',
    nextHearing: null,
    lastUpdate: '9 days ago',
    nextAction: 'Keep copy of order with you at all times',
    nextActionUrgent: false,
    daysOpen: 21,
    estimatedDuration: 'Completed',
    riskLevel: 'low',
    riskPct: 0,
    category: 'Personal',
    notifications: [
      { id: 1, text: 'Protection order successfully enforced', time: 'Apr 22', type: 'success', unread: false },
    ],
    timeline: [
      { label: 'Emergency Consultation', date: 'Apr 1, 2026', done: true, active: false, notes: 'Emergency Legal Button activated. Adv. Njoroge contacted within 8 minutes.' },
      { label: 'Statutory Declaration Filed', date: 'Apr 1, 2026', done: true, active: false, notes: 'Sworn declaration submitted to court' },
      { label: 'Ex-Parte Application', date: 'Apr 2, 2026', done: true, active: false, notes: 'Emergency hearing granted same day' },
      { label: 'Interim Protection Order', date: 'Apr 2, 2026', done: true, active: false, notes: 'Immediate interim order granted. Respondent served.' },
      { label: 'Full Hearing', date: 'Apr 22, 2026', done: true, active: false, notes: 'Full protection order granted for 12 months' },
      { label: '✅ Protection Order Active', date: 'Apr 22, 2026', done: true, active: false, notes: 'Final 12-month protection order. Case concluded.' },
    ],
    documents: [
      { name: 'Protection Order — Final', type: 'pdf', size: '318 KB', date: 'Apr 22', by: 'Court Registry', status: 'filed' },
      { name: 'Statutory Declaration', type: 'pdf', size: '86 KB', date: 'Apr 1', by: 'You', status: 'signed' },
      { name: 'Medical Examination Report', type: 'pdf', size: '145 KB', date: 'Apr 1', by: 'You', status: 'uploaded' },
    ],
    evidence: [
      { name: 'Medical_Exam_Report.pdf', type: 'pdf', size: '145 KB', date: 'Apr 1, 10:00 AM', hash: 'SHA-256: 2e4f6a…1c3b5d', secured: true, by: 'You' },
      { name: 'Photo_Evidence_A1.jpg', type: 'image', size: '2.1 MB', date: 'Apr 1, 10:15 AM', hash: 'SHA-256: 7a8b9c…0d1e2f', secured: true, by: 'You' },
    ],
    payment: {
      total: 0,
      paid: 0,
      currency: 'KES',
      milestones: [],
      note: 'This case was handled under Legal Aid — no fees charged.',
    },
    insights: {
      duration: 'Completed (21 days)',
      successChance: 100,
      riskLabel: 'Resolved',
      recommendation: 'The 12-month protection order is active. Save police station number: 0800 720 500. If respondent violates, contact police immediately and notify Adv. Njoroge.',
      keyFacts: ['Resolved in 21 days — faster than national average of 120+ days', 'Emergency Legal Button response: 8 minutes', 'Legal Aid applied — zero cost to client'],
    },
    accessLog: [
      { who: 'Adv. Grace Njoroge', action: 'Protection order granted', time: 'Apr 22, 4:15 PM' },
      { who: 'Court Registry', action: 'Order sealed and issued', time: 'Apr 22, 4:00 PM' },
    ],
  },
  {
    id: 'KE-2026-0334',
    title: 'Invoice Recovery',
    type: 'Civil',
    status: 'pending',
    urgency: 'low',
    opponent: 'BuildRight Contractors Ltd',
    court: 'Milimani Law Courts — Commercial Division',
    filed: '2026-04-18',
    advocate: 'Adv. Grace Njoroge',
    advocateInitials: 'GN',
    advocateColor: '#6366F1',
    advocateOnline: true,
    progress: 25,
    confidence: 72,
    stage: 'Pre-Trial Filing',
    nextHearing: '2026-05-20',
    lastUpdate: '10 days ago',
    nextAction: 'Fix defect in Affidavit of Service',
    nextActionUrgent: true,
    daysOpen: 13,
    estimatedDuration: '3–5 months',
    riskLevel: 'medium',
    riskPct: 45,
    category: 'Business',
    notifications: [
      { id: 1, text: 'AI flagged Affidavit of Service missing court stamp', time: '1 week ago', type: 'alert', unread: true },
      { id: 2, text: 'Hearing scheduled: May 20', time: 'Apr 20', type: 'court', unread: false },
    ],
    timeline: [
      { label: 'Demand Letter Sent', date: 'Apr 5, 2026', done: true, active: false, notes: 'AI-generated demand letter sent via registered post' },
      { label: 'Demand Ignored (14 days)', date: 'Apr 19, 2026', done: true, active: false, notes: 'No response received. Proceeded to file.' },
      { label: 'Plaint Filed at Court', date: 'Apr 18, 2026', done: true, active: false, notes: 'Plaint for KES 340,000 filed at Commercial Division' },
      { label: 'Summons Issued', date: 'Apr 20, 2026', done: true, active: false, notes: 'Court summons issued to defendant' },
      { label: 'Service of Process', date: 'Current', done: false, active: true, notes: 'Affidavit of Service needs correction — missing stamp' },
      { label: 'First Hearing — May 20', date: 'May 20, 2026', done: false, active: false, notes: 'Directions hearing' },
      { label: 'Trial', date: 'TBD', done: false, active: false, notes: 'Date to be set at directions' },
      { label: 'Judgment', date: 'TBD', done: false, active: false, notes: 'Expected order for payment + costs' },
    ],
    documents: [
      { name: 'Plaint — Invoice Recovery', type: 'pdf', size: '124 KB', date: 'Apr 18', by: 'Adv. Njoroge', status: 'filed' },
      { name: 'AI Demand Letter', type: 'pdf', size: '42 KB', date: 'Apr 5', by: 'Veritex AI', status: 'signed' },
      { name: 'Affidavit of Service ⚠', type: 'pdf', size: '58 KB', date: 'Apr 20', by: 'Process Server', status: 'needs-attention' },
    ],
    evidence: [
      { name: 'Invoice_KES340K_Unpaid.pdf', type: 'pdf', size: '64 KB', date: 'Apr 5, 9:00 AM', hash: 'SHA-256: e5d4c3…b2a1f0', secured: true, by: 'You' },
      { name: 'LPO_Signed_BuildRight.pdf', type: 'pdf', size: '112 KB', date: 'Apr 5, 9:05 AM', hash: 'SHA-256: 6a7b8c…9d0e1f', secured: true, by: 'You' },
      { name: 'Delivery_Confirmation_Email.pdf', type: 'pdf', size: '89 KB', date: 'Apr 5, 9:10 AM', hash: 'SHA-256: 3f2e1d…c4b5a6', secured: true, by: 'You' },
    ],
    payment: {
      total: 35000,
      paid: 17500,
      currency: 'KES',
      milestones: [
        { label: 'Filing & Demand Letter', pct: 25, amount: 8750, paid: true, date: 'Apr 18', due: null, active: false },
        { label: 'Service of Process', pct: 25, amount: 8750, paid: true, date: 'Apr 20', due: null, active: false },
        { label: 'Hearing Preparation', pct: 25, amount: 8750, paid: false, due: 'May 15', active: true },
        { label: 'Trial & Judgment', pct: 25, amount: 8750, paid: false, due: 'TBD', active: false },
      ],
    },
    insights: {
      duration: '3–5 months',
      successChance: 72,
      riskLabel: 'Medium',
      recommendation: 'Fix the Affidavit of Service defect immediately to avoid service challenge. Strong paper trail (invoice, LPO, delivery confirmation) makes this case straightforward once service is corrected.',
      keyFacts: ['Complete paper trail: invoice + LPO + delivery confirmation', 'Affidavit of Service has critical defect — fix before May 20', 'KES 340K + statutory interest at 14% p.a. claimable'],
    },
    accessLog: [
      { who: 'Adv. Grace Njoroge', action: 'Reviewed filing documents', time: 'Apr 20, 11:00 AM' },
      { who: 'Veritex AI', action: 'Flagged affidavit defect', time: 'Apr 21, 8:00 AM' },
    ],
  },
];

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
function statusCfg(status) {
  return {
    active: { label: 'Active', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/25', dot: 'bg-blue-400' },
    'in-court': { label: 'In Court', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/25', dot: 'bg-purple-400' },
    resolved: { label: 'Resolved', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/25', dot: 'bg-green-400' },
    pending: { label: 'Pending', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/25', dot: 'bg-amber-400' },
    escalated: { label: 'Escalated', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/25', dot: 'bg-red-400 animate-pulse' },
  }[status] || { label: status, color: 'text-white/40', bg: 'bg-white/5', border: 'border-white/10', dot: 'bg-white/30' };
}

function urgencyCfg(urgency) {
  return {
    high: { label: '⚡ High Priority', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
    medium: { label: '⚠ Attention Needed', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    low: { label: '✓ Stable', color: 'text-green-400', bg: 'bg-green-500/8', border: 'border-green-500/15' },
  }[urgency] || {};
}

function typeCfg(type) {
  return {
    Employment: { color: 'text-blue-400', bg: 'bg-blue-500/10', icon: Users },
    Land: { color: 'text-green-400', bg: 'bg-green-500/10', icon: MapPin },
    Family: { color: 'text-pink-400', bg: 'bg-pink-500/10', icon: Users },
    Civil: { color: 'text-purple-400', bg: 'bg-purple-500/10', icon: Scale },
    Criminal: { color: 'text-red-400', bg: 'bg-red-500/10', icon: Gavel },
  }[type] || { color: 'text-white/40', bg: 'bg-white/5', icon: Scale };
}

function fileIcon(type) {
  const m = {
    pdf: { icon: FileText, color: 'text-red-400', bg: 'bg-red-500/10' },
    image: { icon: Image, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    zip: { icon: FolderOpen, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
    audio: { icon: Mic, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    video: { icon: Video, color: 'text-pink-400', bg: 'bg-pink-500/10' },
  };
  return m[type] || { icon: FileText, color: 'text-white/40', bg: 'bg-white/5' };
}

function docStatusCfg(status) {
  return {
    filed: { label: 'Filed', color: 'text-purple-400', bg: 'bg-purple-500/10' },
    signed: { label: 'Signed', color: 'text-green-400', bg: 'bg-green-500/10' },
    uploaded: { label: 'Uploaded', color: 'text-blue-400', bg: 'bg-blue-500/10' },
    review: { label: 'Under Review', color: 'text-amber-400', bg: 'bg-amber-500/10' },
    draft: { label: 'Draft', color: 'text-white/30', bg: 'bg-white/5' },
    'needs-attention': { label: '⚠ Needs Fix', color: 'text-red-400', bg: 'bg-red-500/10' },
  }[status] || { label: status, color: 'text-white/30', bg: 'bg-white/5' };
}

/* ─────────────────────────────────────────────
   SMALL PRIMITIVES
───────────────────────────────────────────── */
function Card({ children, className = '', onClick }) {
  return (
    <div onClick={onClick}
      className={`rounded-2xl border border-white/6 bg-white/[0.03] backdrop-blur-sm ${onClick ? 'cursor-pointer hover:border-white/12' : ''} ${className}`}>
      {children}
    </div>
  );
}

function StatusBadge({ status }) {
  const cfg = statusCfg(status);
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${cfg.color} ${cfg.bg} ${cfg.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

function ProgressRing({ pct, size = 56, stroke = 4, color = GOLD }) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
      <motion.circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ * (1 - pct / 100) }}
        transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
      />
    </svg>
  );
}

const GOLD = '#D4AF37';

/* ─────────────────────────────────────────────
   AI INSIGHT PANEL (inline)
───────────────────────────────────────────── */
function AIInsightPanel({ c }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState(null);

  const presets = ['What should I do next?', "What's my chance of winning?", 'Explain my risk level', 'What documents do I still need?'];

  const ask = (q) => {
    const text = q || query;
    if (!text.trim()) return;
    setQuery(text);
    setLoading(true);
    setAnswer(null);
    setTimeout(() => {
      setLoading(false);
      setAnswer(
        text.toLowerCase().includes('next')
          ? `For ${c.id}: ${c.insights.recommendation}`
          : text.toLowerCase().includes('chance') || text.toLowerCase().includes('win')
          ? `AI Confidence: ${c.insights.successChance}%. ${c.insights.recommendation}`
          : text.toLowerCase().includes('risk')
          ? `Risk Level: ${c.insights.riskLabel}. ${c.insights.keyFacts.join(' · ')}`
          : text.toLowerCase().includes('document')
          ? `Missing documents: ${c.evidence.filter(e => e.required).map(e => e.name).join(', ') || 'None — all documents uploaded!'}`
          : `Based on case ${c.id}: ${c.insights.recommendation}`
      );
    }, 1800);
  };

  return (
    <div className="space-y-4">
      {/* Score cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 rounded-xl border border-white/6 bg-white/2 text-center">
          <p className="text-3xl font-black mb-0.5" style={{ color: c.insights.successChance >= 75 ? '#4ade80' : c.insights.successChance >= 50 ? GOLD : '#f87171' }}>
            {c.insights.successChance}%
          </p>
          <p className="text-[10px] text-white/25">AI Confidence</p>
        </div>
        <div className="p-3 rounded-xl border border-white/6 bg-white/2 text-center">
          <p className={`text-lg font-black mb-0.5 ${c.riskLevel === 'low' ? 'text-green-400' : c.riskLevel === 'medium' ? 'text-amber-400' : 'text-red-400'}`}>
            {c.insights.riskLabel}
          </p>
          <p className="text-[10px] text-white/25">Risk Level</p>
        </div>
        <div className="p-3 rounded-xl border border-white/6 bg-white/2 text-center">
          <p className="text-sm font-black text-white/70 mb-0.5">{c.insights.duration}</p>
          <p className="text-[10px] text-white/25">Est. Duration</p>
        </div>
      </div>

      {/* Recommendation */}
      <div className="p-4 rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/5">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest">AI Recommendation</span>
        </div>
        <p className="text-white/70 text-xs leading-relaxed">{c.insights.recommendation}</p>
      </div>

      {/* Key facts */}
      <div>
        <p className="text-[10px] text-white/25 uppercase tracking-widest font-bold mb-2">Key Legal Facts</p>
        <div className="space-y-1.5">
          {c.insights.keyFacts.map((f, i) => (
            <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-white/3 border border-white/5">
              <CheckCircle className="w-3 h-3 text-[#D4AF37] mt-0.5 flex-shrink-0" />
              <span className="text-white/65 text-xs">{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Ask AI */}
      <div className="border border-[#D4AF37]/15 rounded-xl overflow-hidden">
        <div className="px-4 py-3 bg-[#D4AF37]/4">
          <p className="text-[10px] text-[#D4AF37]/70 font-bold uppercase tracking-widest mb-2">Ask about this case</p>
          <div className="flex gap-2 mb-2">
            <input value={query} onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && ask()}
              placeholder="Ask anything about this case…"
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/70 text-xs outline-none focus:border-[#D4AF37]/35 placeholder:text-white/20 transition-colors" />
            <button onClick={() => ask()} className="w-8 h-8 rounded-lg bg-[#D4AF37] flex items-center justify-center hover:bg-[#c9a430] transition-colors">
              <Send className="w-3.5 h-3.5 text-[#12141f]" />
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {presets.map((p, i) => (
              <button key={i} onClick={() => ask(p)}
                className="px-2.5 py-1 rounded-full bg-white/5 border border-white/8 text-white/35 hover:text-[#D4AF37] hover:border-[#D4AF37]/25 text-[10px] transition-colors">
                {p}
              </button>
            ))}
          </div>
        </div>
        <AnimatePresence>
          {loading && (
            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
              className="px-4 py-3 flex items-center gap-2 border-t border-white/5">
              <Loader className="w-3.5 h-3.5 text-[#D4AF37] animate-spin" />
              <span className="text-[#D4AF37]/60 text-xs">Analysing case data…</span>
            </motion.div>
          )}
          {answer && !loading && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0 }}
              className="px-4 py-3 border-t border-white/5 flex items-start gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
              <p className="text-white/65 text-xs leading-relaxed flex-1">{answer}</p>
              <button onClick={() => setAnswer(null)}><X className="w-3.5 h-3.5 text-white/20 hover:text-white/50" /></button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TIMELINE TAB
───────────────────────────────────────────── */
function TimelineTab({ c }) {
  const [expanded, setExpanded] = useState(null);
  return (
    <div className="relative pl-6">
      <div className="absolute left-3 top-2 bottom-2 w-px bg-white/8" />
      <div className="space-y-2">
        {c.timeline.map((t, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
            className="relative">
            {/* Dot */}
            <div className={`absolute -left-6 top-3.5 w-6 h-6 rounded-full flex items-center justify-center z-10 border-2 ${
              t.done ? 'bg-[#D4AF37]/20 border-[#D4AF37]' :
              t.active ? 'bg-[#D4AF37]/10 border-[#D4AF37]/50' :
              'bg-[#1a1d2e] border-white/12'
            }`}>
              {t.done ? <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37]" /> :
               t.active ? <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]/70" /> :
               <Circle className="w-3 h-3 text-white/15" />}
            </div>

            <div
              onClick={() => setExpanded(expanded === i ? null : i)}
              className={`ml-4 p-4 rounded-xl border cursor-pointer transition-all ${
                t.active ? 'border-[#D4AF37]/30 bg-[#D4AF37]/5' :
                t.done ? 'border-white/5 bg-white/2 hover:border-white/10' :
                'border-white/4 bg-transparent hover:border-white/8 opacity-50 hover:opacity-70'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <p className={`text-sm font-semibold ${t.done ? 'text-white/80' : t.active ? 'text-[#D4AF37]' : 'text-white/30'}`}>{t.label}</p>
                  {t.active && (
                    <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] text-[9px] font-black uppercase tracking-widest">Current</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${t.done ? 'text-[#D4AF37]' : 'text-white/20'}`}>{t.date}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-white/20 transition-transform ${expanded === i ? 'rotate-180' : ''}`} />
                </div>
              </div>
              <AnimatePresence>
                {expanded === i && (
                  <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="text-xs text-white/40 mt-2 leading-relaxed overflow-hidden">
                    {t.notes}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   DOCUMENTS TAB
───────────────────────────────────────────── */
function DocumentsTab({ c }) {
  return (
    <div className="space-y-3">
      {c.documents.map((doc, i) => {
        const status = docStatusCfg(doc.status);
        const Icon = fileIcon(doc.type).icon;
        const fCfg = fileIcon(doc.type);
        return (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <Card className="flex items-center gap-4 p-4 hover:border-white/10 transition-colors">
              <div className={`w-10 h-10 rounded-xl ${fCfg.bg} border border-white/6 flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-5 h-5 ${fCfg.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white/85 text-sm font-semibold truncate">{doc.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-white/25 text-[10px]">by {doc.by}</span>
                  <span className="text-white/15">·</span>
                  <span className="text-white/25 text-[10px]">{doc.size}</span>
                  <span className="text-white/15">·</span>
                  <span className="text-white/25 text-[10px]">{doc.date}</span>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-lg text-[10px] font-bold ${status.color} ${status.bg}`}>{status.label}</span>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                  <Eye className="w-3.5 h-3.5 text-white/35" />
                </button>
                <button className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                  <Download className="w-3.5 h-3.5 text-white/35" />
                </button>
              </div>
            </Card>
          </motion.div>
        );
      })}
      <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-white/10 text-white/25 hover:text-white/50 hover:border-white/20 text-sm font-semibold transition-all">
        <UploadCloud className="w-4 h-4" /> Upload Document
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   EVIDENCE VAULT TAB
───────────────────────────────────────────── */
function EvidenceTab({ c }) {
  return (
    <div className="space-y-4">
      {/* Encryption status */}
      <div className="flex items-center gap-3 p-3.5 rounded-xl border border-green-500/20 bg-green-500/5">
        <Shield className="w-5 h-5 text-green-400 flex-shrink-0" />
        <div>
          <p className="text-green-400 text-xs font-bold">Evidence Vault — AES-256 Encrypted</p>
          <p className="text-white/35 text-[10px]">All files are immutably timestamped and blockchain-hashed. Court-admissible.</p>
        </div>
      </div>

      <div className="space-y-3">
        {c.evidence.map((ev, i) => {
          const fCfg = fileIcon(ev.type);
          const Icon = fCfg.icon;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <Card className={`p-4 ${ev.required ? 'border-red-500/20 bg-red-500/3' : 'hover:border-white/10'} transition-colors`}>
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl ${ev.required ? 'bg-red-500/10 border border-red-500/20' : `${fCfg.bg} border border-white/6`} flex items-center justify-center flex-shrink-0`}>
                    {ev.required ? <AlertTriangle className="w-5 h-5 text-red-400" /> : <Icon className={`w-5 h-5 ${fCfg.color}`} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm font-semibold ${ev.required ? 'text-red-400' : 'text-white/85'}`}>{ev.name}</p>
                      {ev.secured ? (
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 flex-shrink-0">
                          <Lock className="w-2.5 h-2.5 text-green-400" />
                          <span className="text-[9px] text-green-400 font-bold">Secured</span>
                        </div>
                      ) : ev.required ? (
                        <span className="text-[10px] text-red-400 font-bold flex-shrink-0">Required</span>
                      ) : null}
                    </div>
                    {ev.hash && (
                      <p className="text-[10px] font-mono text-white/20 mt-0.5 truncate">{ev.hash}</p>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                      {ev.size && <span className="text-white/25 text-[10px]">{ev.size}</span>}
                      {ev.date && <span className="text-white/25 text-[10px]">{ev.date !== 'PENDING' ? ev.date : ''}</span>}
                      {ev.by && <span className="text-white/25 text-[10px]">by {ev.by}</span>}
                    </div>
                  </div>
                  {!ev.required && (
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                        <Eye className="w-3.5 h-3.5 text-white/35" />
                      </button>
                      <button className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                        <Download className="w-3.5 h-3.5 text-white/35" />
                      </button>
                    </div>
                  )}
                  {ev.required && (
                    <button className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-500/15 border border-red-500/25 text-red-400 text-xs font-bold hover:bg-red-500/25 transition-colors">
                      <UploadCloud className="w-3.5 h-3.5" /> Upload
                    </button>
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Upload evidence button */}
      <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-white/10 text-white/25 hover:text-[#D4AF37] hover:border-[#D4AF37]/25 text-sm font-semibold transition-all">
        <Shield className="w-4 h-4" /> Add to Evidence Vault
      </button>

      {/* Access log */}
      <div>
        <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold mb-3">Access Log</p>
        <div className="space-y-2">
          {c.accessLog.map((log, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-white/4 last:border-0">
              <Activity className="w-3.5 h-3.5 text-white/20 flex-shrink-0" />
              <div className="flex-1">
                <span className="text-white/50 text-xs font-semibold">{log.who}</span>
                <span className="text-white/30 text-xs"> — {log.action}</span>
              </div>
              <span className="text-white/20 text-[10px]">{log.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAYMENTS TAB
───────────────────────────────────────────── */
function PaymentsTab({ c }) {
  const pay = c.payment;
  if (pay.note) return (
    <Card className="p-6 text-center">
      <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
      <p className="text-green-400 font-semibold text-sm">{pay.note}</p>
    </Card>
  );
  const pct = pay.total > 0 ? Math.round((pay.paid / pay.total) * 100) : 0;
  return (
    <div className="space-y-4">
      {/* Overview */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white/30 text-xs uppercase tracking-widest mb-1">Total Legal Fees</p>
            <p className="text-white font-black text-2xl">KES {pay.total.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <div className="relative w-16 h-16">
              <ProgressRing pct={pct} size={64} stroke={5} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-white font-black text-base leading-none">{pct}%</span>
                <span className="text-white/25 text-[9px]">paid</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between text-xs mb-2">
          <span className="text-green-400 font-bold">Paid: KES {pay.paid.toLocaleString()}</span>
          <span className="text-amber-400 font-bold">Remaining: KES {(pay.total - pay.paid).toLocaleString()}</span>
        </div>
        <div className="w-full h-2 rounded-full bg-white/6 overflow-hidden">
          <motion.div className="h-full rounded-full bg-[#D4AF37]" style={{ width: 0 }}
            animate={{ width: `${pct}%` }} transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }} />
        </div>
        <div className="flex items-center gap-1.5 mt-3">
          <Shield className="w-3 h-3 text-green-400" />
          <span className="text-white/30 text-[10px]">All payments protected by Veritex Escrow — released only on milestone confirmation</span>
        </div>
      </Card>

      {/* Milestones */}
      <div className="space-y-2">
        {pay.milestones.map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
            <Card className={`flex items-center gap-4 p-4 ${m.active ? 'border-[#D4AF37]/30 bg-[#D4AF37]/4' : ''}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border flex-shrink-0 ${
                m.paid ? 'bg-green-500/15 border-green-500/30' :
                m.active ? 'bg-[#D4AF37]/15 border-[#D4AF37]/30' :
                'bg-white/4 border-white/8'
              }`}>
                {m.paid ? <CheckCircle className="w-5 h-5 text-green-400" /> :
                 m.active ? <Clock className="w-5 h-5 text-[#D4AF37]" /> :
                 <Circle className="w-4 h-4 text-white/20" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-0.5">
                  <p className={`text-sm font-bold ${m.paid ? 'text-green-400' : m.active ? 'text-[#D4AF37]' : 'text-white/35'}`}>
                    {m.label} <span className="font-normal opacity-70">· {m.pct}%</span>
                  </p>
                  <p className={`text-sm font-black ${m.paid ? 'text-green-400' : m.active ? 'text-[#D4AF37]' : 'text-white/25'}`}>
                    KES {m.amount.toLocaleString()}
                  </p>
                </div>
                <p className="text-white/25 text-[11px]">
                  {m.paid ? `✓ Paid ${m.date}` : m.active ? `Due ${m.due} — escrow pending` : `Due ${m.due || 'TBD'}`}
                </p>
              </div>
              {m.active && (
                <button className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#c9a430] text-[#12141f] text-xs font-black transition-all shadow-lg shadow-[#D4AF37]/20 whitespace-nowrap">
                  <CreditCard className="w-3.5 h-3.5" /> Pay via M-Pesa
                </button>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   NOTIFICATIONS TAB
───────────────────────────────────────────── */
function NotificationsTab({ c }) {
  const iconMap = {
    document: { icon: FileText, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    court: { icon: Gavel, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    alert: { icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/10' },
    update: { icon: Activity, color: 'text-[#D4AF37]', bg: 'bg-[#D4AF37]/10' },
    success: { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/10' },
  };
  return (
    <div className="space-y-2">
      {c.notifications.map((n, i) => {
        const cfg = iconMap[n.type] || iconMap.update;
        const Icon = cfg.icon;
        return (
          <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
            <div className={`flex items-center gap-3 p-4 rounded-xl border ${n.unread ? 'border-white/8 bg-white/3' : 'border-white/4 bg-transparent opacity-60'}`}>
              <div className={`w-9 h-9 rounded-xl ${cfg.bg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-4 h-4 ${cfg.color}`} />
              </div>
              <div className="flex-1">
                <p className="text-white/75 text-sm font-medium">{n.text}</p>
                <p className="text-white/25 text-[11px] mt-0.5">{n.time}</p>
              </div>
              {n.unread && <div className="w-2 h-2 rounded-full bg-[#D4AF37] flex-shrink-0" />}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────
   RIGHT ACTION PANEL
───────────────────────────────────────────── */
function ActionPanel({ c }) {
  const [escalating, setEscalating] = useState(false);
  const [escalated, setEscalated] = useState(false);

  const actions = [
    { icon: Upload, label: 'Add Evidence', color: 'text-[#D4AF37]', bg: 'bg-[#D4AF37]/10', border: 'border-[#D4AF37]/25', glow: 'hover:shadow-[#D4AF37]/10' },
    { icon: CreditCard, label: 'Make Payment', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20', glow: 'hover:shadow-green-500/10' },
    { icon: FileText, label: 'Generate Document', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', glow: 'hover:shadow-blue-500/10' },
    { icon: Bell, label: 'Request Update', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', glow: 'hover:shadow-purple-500/10' },
    { icon: MessageSquare, label: 'Message Lawyer', color: 'text-white/60', bg: 'bg-white/5', border: 'border-white/10', glow: '' },
  ];

  return (
    <div className="space-y-4">
      {/* Next action banner */}
      {c.nextAction && (
        <div className={`p-4 rounded-xl border ${c.nextActionUrgent ? 'border-red-500/25 bg-red-500/6' : 'border-[#D4AF37]/20 bg-[#D4AF37]/5'}`}>
          <div className="flex items-center gap-2 mb-1.5">
            {c.nextActionUrgent ? <AlertTriangle className="w-3.5 h-3.5 text-red-400" /> : <Zap className="w-3.5 h-3.5 text-[#D4AF37]" />}
            <span className={`text-[10px] font-bold uppercase tracking-widest ${c.nextActionUrgent ? 'text-red-400' : 'text-[#D4AF37]'}`}>
              {c.nextActionUrgent ? 'Action Required' : 'Next Step'}
            </span>
          </div>
          <p className={`text-sm font-semibold ${c.nextActionUrgent ? 'text-red-300' : 'text-white/80'}`}>{c.nextAction}</p>
        </div>
      )}

      {/* Quick actions grid */}
      <div>
        <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold mb-2">Quick Actions</p>
        <div className="space-y-2">
          {actions.map(({ icon: Icon, label, color, bg, border, glow }, i) => (
            <motion.button
              key={i}
              whileHover={{ x: 3 }}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border ${bg} ${border} transition-all hover:shadow-lg ${glow} text-left`}
            >
              <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <span className={`text-sm font-semibold ${color}`}>{label}</span>
              <ChevronRight className="w-3.5 h-3.5 text-white/15 ml-auto" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Case details mini-card */}
      <div className="p-4 rounded-xl border border-white/6 bg-white/2 space-y-2.5">
        <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold">Court & Hearing</p>
        <div className="flex items-start gap-2">
          <Landmark className="w-3.5 h-3.5 text-white/25 mt-0.5 flex-shrink-0" />
          <p className="text-white/55 text-xs">{c.court}</p>
        </div>
        {c.nextHearing ? (
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
            <p className="text-[#D4AF37] text-xs font-semibold">
              {new Date(c.nextHearing).toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
        ) : (
          <p className="text-white/20 text-xs">No upcoming hearing</p>
        )}
        <div className="flex items-center gap-2">
          <Phone className="w-3.5 h-3.5 text-white/25 flex-shrink-0" />
          <p className="text-white/35 text-xs">Milimani: 0800 720 500</p>
        </div>
      </div>

      {/* Escalate */}
      {c.status !== 'resolved' && (
        <div>
          {!escalating ? (
            <button onClick={() => setEscalating(true)}
              className="w-full py-2.5 rounded-xl border border-red-500/15 bg-red-500/4 text-red-400/60 hover:text-red-400 hover:border-red-500/25 text-xs font-bold transition-all flex items-center justify-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5" /> Escalate Case
            </button>
          ) : (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 space-y-3">
              <p className="text-red-400 text-xs font-bold">Confirm Escalation</p>
              <p className="text-white/40 text-xs">This will flag the case as urgent and alert Veritex legal supervisors. A senior advocate will be assigned within 4 hours.</p>
              <div className="flex gap-2">
                <button onClick={() => setEscalating(false)} className="flex-1 py-2 rounded-xl bg-white/5 border border-white/8 text-white/35 text-xs font-semibold">Cancel</button>
                <button onClick={() => { setEscalating(false); setEscalated(true); }}
                  className="flex-1 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-black transition-colors">
                  Escalate Now
                </button>
              </div>
            </motion.div>
          )}
          {escalated && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              className="mt-2 flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
              <CheckCircle className="w-4 h-4 text-red-400" />
              <p className="text-red-400 text-xs font-semibold">Case escalated. Senior advocate will contact you within 4 hours.</p>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   CASE DETAIL VIEW
───────────────────────────────────────────── */
function CaseDetail({ c }) {
  const [tab, setTab] = useState('timeline');
  const [showRightPanel, setShowRightPanel] = useState(true);
  const typeC = typeCfg(c.type);
  const TypeIcon = typeC.icon;

  const tabs = [
    { id: 'timeline', label: 'Timeline', icon: Activity },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'evidence', label: 'Evidence', icon: Shield },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'ai', label: 'AI Insights', icon: Brain },
    { id: 'notifications', label: `Alerts ${c.notifications.filter(n => n.unread).length > 0 ? `(${c.notifications.filter(n => n.unread).length})` : ''}`, icon: Bell },
  ];

  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-6">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap mb-3">
                  <span className="font-mono text-xs text-white/30 bg-white/5 px-2.5 py-1 rounded-lg">{c.id}</span>
                  <StatusBadge status={c.status} />
                  {c.urgency !== 'low' && (
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${urgencyCfg(c.urgency).color} ${urgencyCfg(c.urgency).bg} ${urgencyCfg(c.urgency).border}`}>
                      {urgencyCfg(c.urgency).label}
                    </span>
                  )}
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${typeC.color} ${typeC.bg}`}>
                    <TypeIcon className="w-3 h-3" /> {c.type}
                  </span>
                </div>
                <h2 className="text-white text-2xl font-black mb-1 tracking-tight">{c.title}</h2>
                <p className="text-white/40 text-sm">vs. {c.opponent}</p>
              </div>

              {/* Progress ring */}
              <div className="flex flex-col items-center gap-1 flex-shrink-0 ml-4">
                <div className="relative">
                  <ProgressRing pct={c.progress} size={72} stroke={5} color={c.progress === 100 ? '#4ade80' : GOLD} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-black text-white">{c.progress}%</span>
                    <span className="text-[9px] text-white/25">done</span>
                  </div>
                </div>
                <span className="text-[10px] text-white/25">{c.daysOpen} days open</span>
              </div>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-4">
              {[
                { label: 'Court', value: c.court.split(',')[0], icon: Landmark },
                { label: 'Filed', value: new Date(c.filed).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' }), icon: Calendar },
                { label: 'Stage', value: c.stage, icon: Flag },
                { label: 'AI Confidence', value: `${c.confidence}%`, icon: Brain },
                { label: 'Next Hearing', value: c.nextHearing ? new Date(c.nextHearing).toLocaleDateString('en-KE', { day: 'numeric', month: 'short' }) : 'None', icon: Clock },
                { label: 'Last Update', value: c.lastUpdate, icon: Activity },
              ].map(({ label, value, icon: Icon }, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}>
                  <div className="p-3 rounded-xl border border-white/5 bg-white/2">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Icon className="w-3 h-3 text-[#D4AF37]/50" />
                      <span className="text-[9px] text-white/25 uppercase tracking-widest font-bold">{label}</span>
                    </div>
                    <p className="text-white/75 text-xs font-semibold leading-snug">{value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Lawyer row */}
            <div className="flex items-center gap-3 p-3.5 rounded-xl border border-white/6 bg-white/2">
              <div className="w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-black flex-shrink-0"
                style={{ borderColor: c.advocateColor + '40', background: c.advocateColor + '20', color: c.advocateColor }}>
                {c.advocateInitials}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="text-white/80 text-sm font-bold">{c.advocate}</p>
                  <BadgeCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${c.advocateOnline ? 'bg-green-400' : 'bg-white/20'}`} />
                  <span className="text-white/25 text-[10px]">{c.advocateOnline ? 'Online' : 'Offline'}</span>
                  <span className="text-white/15">·</span>
                  <span className="text-white/25 text-[10px]">Your Assigned Advocate</span>
                </div>
              </div>
              <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold hover:bg-[#D4AF37]/20 transition-colors">
                <MessageSquare className="w-3.5 h-3.5" /> Message
              </button>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-1 mb-5 overflow-x-auto pb-1">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setTab(id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                  tab === id ? 'bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/25' : 'text-white/30 hover:text-white/60 hover:bg-white/4'
                }`}>
                <Icon className="w-3.5 h-3.5" /> {label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              {tab === 'timeline' && <TimelineTab c={c} />}
              {tab === 'documents' && <DocumentsTab c={c} />}
              {tab === 'evidence' && <EvidenceTab c={c} />}
              {tab === 'payments' && <PaymentsTab c={c} />}
              {tab === 'ai' && <AIInsightPanel c={c} />}
              {tab === 'notifications' && <NotificationsTab c={c} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Right action panel */}
      <AnimatePresence>
        {showRightPanel && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 300, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 border-l border-white/5 overflow-hidden"
            style={{ maxHeight: '100%', overflowY: 'auto' }}
          >
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Actions</p>
                <button onClick={() => setShowRightPanel(false)} className="text-white/20 hover:text-white/50"><X className="w-4 h-4" /></button>
              </div>
              <ActionPanel c={c} />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {!showRightPanel && (
        <button onClick={() => setShowRightPanel(true)}
          className="fixed right-4 bottom-20 z-10 w-10 h-10 rounded-xl bg-[#D4AF37] shadow-xl shadow-[#D4AF37]/25 flex items-center justify-center">
          <Zap className="w-4 h-4 text-[#12141f]" />
        </button>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   CASE CARD (grid view)
───────────────────────────────────────────── */
function CaseCard({ c, selected, onClick }) {
  const typeC = typeCfg(c.type);
  const TypeIcon = typeC.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className={`relative rounded-2xl border cursor-pointer overflow-hidden transition-all duration-200 p-5 ${
        selected
          ? 'border-[#D4AF37]/50 bg-[#D4AF37]/6 shadow-xl shadow-[#D4AF37]/8'
          : 'border-white/6 bg-white/[0.03] hover:border-white/12 hover:bg-white/[0.05]'
      }`}
    >
      {selected && <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#f0cc55]" />}
      {c.urgency === 'high' && !selected && <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500" />}

      <div className="flex items-start justify-between mb-3">
        <div className={`px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1.5 ${typeC.color} ${typeC.bg}`}>
          <TypeIcon className="w-3 h-3" /> {c.type}
        </div>
        <StatusBadge status={c.status} />
      </div>

      <h3 className="text-white font-bold text-sm mb-0.5">{c.title}</h3>
      <p className="text-white/30 text-[11px] mb-3">vs. {c.opponent}</p>

      <div className="flex items-center gap-2 mb-3">
        <div className="relative flex-shrink-0">
          <ProgressRing pct={c.progress} size={32} stroke={3} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[8px] font-black text-white">{c.progress}%</span>
          </div>
        </div>
        <div className="flex-1 h-1.5 rounded-full bg-white/6 overflow-hidden">
          <motion.div className="h-full rounded-full bg-[#D4AF37]/60"
            initial={{ width: 0 }} animate={{ width: `${c.progress}%` }} transition={{ duration: 1, ease: 'easeOut' }} />
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black border-2 flex-shrink-0"
          style={{ borderColor: c.advocateColor + '40', background: c.advocateColor + '20', color: c.advocateColor }}>
          {c.advocateInitials}
        </div>
        <span className="text-white/40 text-[11px]">{c.advocate}</span>
      </div>

      {c.nextAction && (
        <div className={`flex items-start gap-2 p-2.5 rounded-lg ${c.nextActionUrgent ? 'bg-red-500/8 border border-red-500/15' : 'bg-white/4 border border-white/5'}`}>
          {c.nextActionUrgent ? <AlertTriangle className="w-3 h-3 text-red-400 mt-0.5 flex-shrink-0" /> : <ArrowRight className="w-3 h-3 text-[#D4AF37] mt-0.5 flex-shrink-0" />}
          <p className={`text-[10px] ${c.nextActionUrgent ? 'text-red-300' : 'text-white/45'}`}>{c.nextAction}</p>
        </div>
      )}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   CASE ROW (table view)
───────────────────────────────────────────── */
function CaseRow({ c, selected, onClick }) {
  const typeC = typeCfg(c.type);
  const TypeIcon = typeC.icon;
  return (
    <motion.div
      layout
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`flex items-center gap-4 px-5 py-3.5 rounded-xl cursor-pointer transition-all border ${
        selected ? 'bg-[#D4AF37]/6 border-[#D4AF37]/25' : 'border-transparent hover:bg-white/3 hover:border-white/6'
      }`}
    >
      <div className="w-8">
        <TypeIcon className={`w-4 h-4 ${typeC.color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-semibold truncate">{c.title}</p>
        <p className="text-white/25 text-[10px] font-mono">{c.id}</p>
      </div>
      <div className="hidden md:block w-28"><StatusBadge status={c.status} /></div>
      <div className="hidden lg:block w-32 text-xs text-white/40 truncate">{c.advocate.split(' ').slice(-1)[0]}</div>
      <div className="hidden lg:flex w-16 items-center gap-1.5">
        <div className="flex-1 h-1 rounded-full bg-white/6 overflow-hidden">
          <div className="h-full rounded-full bg-[#D4AF37]/60" style={{ width: `${c.progress}%` }} />
        </div>
        <span className="text-[10px] text-white/30">{c.progress}%</span>
      </div>
      <div className="hidden xl:block w-24 text-[11px] text-white/25">{c.lastUpdate}</div>
      {c.urgency !== 'low' && (
        <div className={`flex-shrink-0 w-2 h-2 rounded-full ${c.urgency === 'high' ? 'bg-red-400 animate-pulse' : 'bg-amber-400'}`} />
      )}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   NEW CASE MODAL
───────────────────────────────────────────── */
function NewCaseModal({ onClose }) {
  const [step, setStep] = useState(1);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        className="w-full max-w-lg rounded-3xl border border-white/8 bg-[#1a1d2e] p-7 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-bold text-xl flex items-center gap-2"><Scale className="w-5 h-5 text-[#D4AF37]" /> Open New Case</h3>
          <button onClick={onClose} className="text-white/30 hover:text-white/60"><X className="w-5 h-5" /></button>
        </div>
        <div className="space-y-4 mb-6">
          <div>
            <label className="text-white/35 text-xs mb-2 block">Case Type</label>
            <div className="grid grid-cols-3 gap-2">
              {['Employment', 'Land', 'Family', 'Civil', 'Criminal', 'Other'].map(t => {
                const cfg = typeCfg(t);
                const Icon = cfg.icon;
                return (
                  <button key={t} className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center gap-1.5 justify-center transition-all border-white/8 bg-white/3 ${cfg.color} hover:border-white/15`}>
                    <Icon className="w-3.5 h-3.5" /> {t}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <label className="text-white/35 text-xs mb-1.5 block">Brief Description</label>
            <textarea rows={3} placeholder="e.g. I was dismissed from my job after raising a safety complaint..."
              className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm outline-none resize-none placeholder:text-white/20 focus:border-[#D4AF37]/40 transition-colors" />
          </div>
          <div>
            <label className="text-white/35 text-xs mb-1.5 block">Urgency Level</label>
            <div className="grid grid-cols-3 gap-2">
              {['Emergency 🚨', 'Urgent ⚡', 'Standard ✓'].map((u, i) => (
                <button key={i} className="py-2 rounded-xl border border-white/8 bg-white/3 text-white/50 hover:border-white/15 text-xs font-bold transition-all">{u}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-white/5 border border-white/8 text-white/40 text-sm font-semibold">Cancel</button>
          <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#c9a430] text-[#12141f] text-sm font-black transition-all flex items-center justify-center gap-2">
            <Brain className="w-4 h-4" /> AI-Assign Lawyer
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MAIN CASES VIEW
───────────────────────────────────────────── */
export default function CasesView() {
  const [cases] = useState(MOCK_CASES);
  const [selectedId, setSelectedId] = useState('KE-2026-1102');
  const [viewMode, setViewMode] = useState('split'); // 'split' | 'list' | 'grid'
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortFilter, setSortFilter] = useState('recent');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [showNewCase, setShowNewCase] = useState(false);

  const selectedCase = cases.find(c => c.id === selectedId);

  const filtered = cases.filter(c => {
    const q = search.toLowerCase();
    const matchSearch = !q || c.title.toLowerCase().includes(q) || c.id.toLowerCase().includes(q) || c.advocate.toLowerCase().includes(q) || c.type.toLowerCase().includes(q) || c.opponent.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    const matchType = typeFilter === 'all' || c.type.toLowerCase() === typeFilter.toLowerCase();
    return matchSearch && matchStatus && matchType;
  }).sort((a, b) => {
    if (sortFilter === 'urgent') return (b.urgency === 'high' ? 2 : b.urgency === 'medium' ? 1 : 0) - (a.urgency === 'high' ? 2 : a.urgency === 'medium' ? 1 : 0);
    if (sortFilter === 'progress') return b.progress - a.progress;
    return 0;
  });

  const needsAttention = cases.filter(c => c.urgency !== 'low' || c.notifications.some(n => n.unread)).length;

  return (
    <div className="flex h-full overflow-hidden bg-[#12141f]" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {/* Modal */}
      <AnimatePresence>
        {showNewCase && <NewCaseModal onClose={() => setShowNewCase(false)} />}
      </AnimatePresence>

      {/* ── LEFT: Case List ── */}
      <div className={`border-r border-white/5 flex flex-col flex-shrink-0 bg-[#0e1019] ${viewMode === 'split' ? 'w-80' : 'flex-1'}`}>

        {/* Header */}
        <div className="p-4 border-b border-white/5 flex-shrink-0 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white font-black text-sm tracking-tight">My Cases</h2>
              <p className="text-white/25 text-[11px] mt-0.5">
                {cases.length} total {needsAttention > 0 && <span className="text-amber-400">· {needsAttention} need attention</span>}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {viewMode === 'split' && (
                <div className="flex gap-0.5 p-0.5 rounded-lg bg-white/4 border border-white/6">
                  <button onClick={() => setViewMode('list')} className="p-1.5 rounded-md text-white/30 hover:text-white/60 transition-colors"><List className="w-3.5 h-3.5" /></button>
                  <button onClick={() => setViewMode('grid')} className="p-1.5 rounded-md text-white/30 hover:text-white/60 transition-colors"><Grid3x3 className="w-3.5 h-3.5" /></button>
                </div>
              )}
              {viewMode !== 'split' && (
                <button onClick={() => setViewMode('split')} className="px-2.5 py-1.5 rounded-lg border border-white/8 text-white/35 text-[11px] hover:border-white/15 transition-colors">Split</button>
              )}
              <button onClick={() => setShowNewCase(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#c9a430] text-[#12141f] text-xs font-black transition-colors shadow-lg shadow-[#D4AF37]/20">
                <Plus className="w-3.5 h-3.5" /> New
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search cases, IDs, lawyers…"
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/4 border border-white/6 text-white/70 text-xs outline-none placeholder:text-white/20 focus:border-[#D4AF37]/25 transition-colors" />
          </div>

          {/* Filter row */}
          <div className="flex items-center gap-2">
            <button onClick={() => setFiltersOpen(v => !v)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] font-semibold transition-all ${filtersOpen ? 'border-[#D4AF37]/30 bg-[#D4AF37]/8 text-[#D4AF37]' : 'border-white/8 bg-white/3 text-white/35 hover:text-white/60'}`}>
              <Filter className="w-3 h-3" /> Filters
            </button>
            {/* Smart filters */}
            {[
              { id: 'all', label: 'All' },
              { id: 'urgent', label: '⚡ Urgent' },
              { id: 'active', label: 'Active' },
              { id: 'in-court', label: 'In Court' },
            ].map(({ id, label }) => (
              <button key={id} onClick={() => setStatusFilter(id === 'urgent' ? 'all' : id)}
                className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all flex-shrink-0 ${
                  statusFilter === id || (id === 'urgent' && sortFilter === 'urgent')
                    ? 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20'
                    : 'text-white/25 hover:text-white/50'
                }`}>{label}</button>
            ))}
          </div>

          {/* Expanded filters */}
          <AnimatePresence>
            {filtersOpen && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden space-y-2">
                <div>
                  <p className="text-[9px] text-white/20 uppercase tracking-widest font-bold mb-1.5">Case Type</p>
                  <div className="flex flex-wrap gap-1">
                    {['all', 'Employment', 'Land', 'Family', 'Civil', 'Criminal'].map(t => (
                      <button key={t} onClick={() => setTypeFilter(t)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold border capitalize transition-all ${
                          typeFilter === t ? 'border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37]' : 'border-white/8 text-white/30 hover:border-white/15'
                        }`}>{t}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[9px] text-white/20 uppercase tracking-widest font-bold mb-1.5">Sort By</p>
                  <div className="flex gap-1">
                    {[{ id: 'recent', label: 'Recent' }, { id: 'urgent', label: 'Urgent First' }, { id: 'progress', label: 'Progress' }].map(s => (
                      <button key={s.id} onClick={() => setSortFilter(s.id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all ${sortFilter === s.id ? 'border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37]' : 'border-white/8 text-white/30 hover:border-white/15'}`}>
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Cases list */}
        <div className="flex-1 overflow-y-auto py-2 px-2">
          {filtered.length === 0 ? (
            <div className="py-10 text-center">
              <Scale className="w-8 h-8 text-white/10 mx-auto mb-2" />
              <p className="text-white/20 text-xs">No cases match your search</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 gap-3 p-2">
              <AnimatePresence>
                {filtered.map(c => (
                  <CaseCard key={c.id} c={c} selected={selectedId === c.id} onClick={() => setSelectedId(c.id)} />
                ))}
              </AnimatePresence>
            </div>
          ) : viewMode === 'list' ? (
            <div className="space-y-0.5">
              {filtered.map(c => <CaseRow key={c.id} c={c} selected={selectedId === c.id} onClick={() => setSelectedId(c.id)} />)}
            </div>
          ) : (
            /* Split mode — compact rows */
            filtered.map(c => (
              <motion.button
                key={c.id}
                onClick={() => setSelectedId(c.id)}
                whileHover={{ x: 2 }}
                transition={{ duration: 0.12 }}
                className={`w-full text-left px-4 py-4 border-b border-white/3 transition-all relative ${
                  selectedId === c.id ? 'bg-[#D4AF37]/6 border-l-2 border-l-[#D4AF37]' : 'border-l-2 border-l-transparent hover:bg-white/2'
                }`}
              >
                {(c.urgency === 'high' || c.nextActionUrgent) && <div className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full bg-red-400 m-2 animate-pulse" />}

                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-[9px] text-white/20">{c.id}</span>
                  <StatusBadge status={c.status} />
                </div>
                <p className="text-white text-xs font-bold mb-0.5 truncate">{c.title}</p>
                <p className="text-white/30 text-[10px] truncate mb-2">vs. {c.opponent}</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 rounded-full bg-white/6 overflow-hidden">
                    <div className="h-full rounded-full bg-[#D4AF37]/60" style={{ width: `${c.progress}%` }} />
                  </div>
                  <span className="text-[10px] text-white/25 flex-shrink-0">{c.progress}%</span>
                </div>
                {c.nextAction && (
                  <p className={`text-[10px] mt-1.5 truncate ${c.nextActionUrgent ? 'text-red-400' : 'text-white/25'}`}>
                    {c.nextActionUrgent ? '⚡ ' : '→ '}{c.nextAction}
                  </p>
                )}
              </motion.button>
            ))
          )}
        </div>
      </div>

      {/* ── RIGHT: Case Detail ── */}
      {viewMode === 'split' && selectedCase && (
        <motion.div
          key={selectedCase.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 flex overflow-hidden"
        >
          <CaseDetail c={selectedCase} />
        </motion.div>
      )}

      {viewMode !== 'split' && selectedId && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            className="fixed inset-0 z-30 bg-[#12141f] overflow-hidden flex flex-col"
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/6 flex-shrink-0">
              <button onClick={() => setSelectedId(null)} className="flex items-center gap-2 text-white/40 hover:text-white text-sm font-medium transition-colors">
                <ChevronRight className="w-4 h-4 rotate-180" /> Back to Cases
              </button>
            </div>
            <div className="flex-1 overflow-hidden flex">
              <CaseDetail c={selectedCase} />
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}