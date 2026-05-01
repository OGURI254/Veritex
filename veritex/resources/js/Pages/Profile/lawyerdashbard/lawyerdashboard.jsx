import { useState, useEffect, useRef, useCallback } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Scale, LayoutDashboard, Gavel, MessageSquare, CreditCard, FileText,
    MapPin, Shield, Bell, Search, ChevronDown, ChevronRight, Menu, X,
    Plus, Upload, Mic, Send, Brain, Zap, Clock, CheckCircle, AlertCircle,
    TrendingUp, Users, Phone, Lock, Star, Download, Eye, Trash2, Filter,
    MoreHorizontal, ArrowRight, Building, Landmark, UserCheck, Image,
    Video, BadgeCheck, ThumbsUp, AlertTriangle, Briefcase, CreditCard as CC,
    LogOut, Settings, HelpCircle, ChevronLeft, Circle, Activity, Hash,
    Calendar, Layers, Info, Loader, RotateCcw, MicOff, Flag, Award,
    CheckSquare, Square, Tag, ArrowUpRight, ArrowDownRight, Target,
    Inbox, Mail, Paperclip, BookOpen, ChevronUp, Edit3, Save, BarChart2,
    PieChart, TrendingDown, DollarSign, Banknote, RefreshCw, UserPlus,
    ClipboardList, AlignLeft, GitBranch, Maximize2, Minimize2, Play,
    Pause, StopCircle, Radio, ListChecks, BarChart, Shuffle, Cpu, Hash as HashIcon,
    Globe, Navigation, Bookmark, FolderOpen, Archive, MessageCircle,
    ThumbsDown, AlertOctagon, Check, Ban, Sparkles, Wand2, SortAsc,
    Copy, ExternalLink, ChevronUpDown, Headphones, Volume2, User,
    Sliders, Lightbulb, ZapOff, Timer, FolderPlus, FileCheck, FilePlus,
    PenTool, Stamp, Send as SendIcon
} from 'lucide-react';

/* ═══════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════ */
const T = {
    bg0: '#08090f',
    bg1: '#0d0f18',
    bg2: '#12141f',
    bg3: '#1a1d2e',
    bg4: '#20243a',
    gold: '#D4AF37',
    goldDim: '#a8882a',
    jade: '#10B981',
    indigo: '#6366F1',
    red: '#EF4444',
    amber: '#F59E0B',
    border: 'rgba(255,255,255,0.07)',
    borderHov: 'rgba(255,255,255,0.13)',
    text1: 'rgba(255,255,255,0.90)',
    text2: 'rgba(255,255,255,0.55)',
    text3: 'rgba(255,255,255,0.30)',
    text4: 'rgba(255,255,255,0.15)',
};

/* ═══════════════════════════════════════════
   MOCK DATA
═══════════════════════════════════════════ */
const LAWYER = {
    name: 'Njeri Kamau', initials: 'NK', specialization: 'Land & Employment Law',
    lsk: 'LSK/2014/4892', experience: '11 years', nairobi: true,
    rating: 4.9, reviews: 214, winRate: 89, responseTime: '< 5 min',
    status: 'online', credits: 1240, subscription: 'Pro',
};

const CASES = [
    {
        id: 'KE-2026-4902', client: 'John Mwangi', clientInitials: 'JM', clientColor: '#6366F1',
        type: 'Land Dispute', status: 'active', priority: 'high',
        opponent: 'Kimani Properties Ltd', court: 'Environment & Land Court, Milimani',
        filed: '2026-01-14', nextHearing: '2026-05-12', progress: 55,
        confidence: 91, fee: 85000, paid: 51000,
        stage: 'Full Hearing Scheduled',
        description: 'Client claims adverse possession and challenges fraudulent transfer of a 0.5-acre parcel in Ruaka, Nairobi County. Title deed obtained under suspicious circumstances during intestate succession. Interlocutory injunction already obtained.',
        tasks: [
            { id: 1, text: 'Obtain 30-year historical search from Ardhi House', assigned: 'client', done: false, urgent: true },
            { id: 2, text: 'Prepare hearing bundle — 5 copies required by May 8', assigned: 'lawyer', done: false, urgent: true },
            { id: 3, text: 'Compile witness list and prepare witness statements', assigned: 'lawyer', done: false, urgent: false },
            { id: 4, text: 'Upload certified copy of original title deed', assigned: 'client', done: true, urgent: false },
        ],
        timeline: [
            { label: 'Plaint Filed', date: 'Jan 14', done: true },
            { label: 'Service Effected', date: 'Jan 22', done: true },
            { label: 'Directions Hearing', date: 'Feb 8', done: true },
            { label: 'Interlocutory Injunction', date: 'Mar 3', done: true },
            { label: 'Full Hearing', date: 'May 12', done: false, active: true },
            { label: 'Judgment', date: 'TBD', done: false },
        ],
        evidence: [
            { name: 'title_deed_scan.pdf', type: 'document', size: '2.1 MB', date: 'Jan 15', hash: '8d969eef...c92', verified: true },
            { name: 'site_photo_boundary.jpg', type: 'photo', size: '3.4 MB', date: 'Jan 15', hash: '4e07408b...d3', verified: true },
            { name: 'witness_statement.mp4', type: 'video', size: '48.2 MB', date: 'Mar 3', hash: 'e10adc39...b5', verified: true },
        ],
        docs: ['Plaint', 'Verifying Affidavit', 'Land Search Report', 'List of Documents', 'Hearing Bundle Draft'],
        notes: 'Strong case — respondent\'s replying affidavit is weak. Focus argument on Section 26 Land Registration Act. Prepare to counter adverse possession counterclaim.',
        messages: [
            { from: 'client', text: 'I went to Ardhi House. They said the search will be ready in 3 days.', time: '10:02 AM', mine: false },
            { from: 'lawyer', text: 'Good. Request a 30-year search specifically — not the standard 5-year. Call me when you have it.', time: '10:18 AM', mine: true },
        ]
    },
    {
        id: 'KE-2026-3117', client: 'Amara Osei', clientInitials: 'AO', clientColor: '#10B981',
        type: 'Wrongful Dismissal', status: 'active', priority: 'medium',
        opponent: 'Apex Finance Ltd', court: 'Employment & Labour Relations Court',
        filed: '2026-02-28', nextHearing: '2026-05-19', progress: 30,
        confidence: 87, fee: 45000, paid: 27000,
        stage: 'Mediation Scheduled',
        description: 'Client was dismissed without notice or terminal dues after 8 years. Employer claims probation — however no probation clause was ever signed. Client has strong documentary evidence including unsigned employment terms.',
        tasks: [
            { id: 1, text: 'Prepare mediation position paper', assigned: 'lawyer', done: false, urgent: true },
            { id: 2, text: 'Calculate full terminal dues + interest', assigned: 'lawyer', done: false, urgent: false },
            { id: 3, text: 'Client to provide 3 recent payslips', assigned: 'client', done: true, urgent: false },
        ],
        timeline: [
            { label: 'Memorandum Filed', date: 'Feb 28', done: true },
            { label: 'Respondent Served', date: 'Mar 10', done: true },
            { label: 'Mediation', date: 'May 19', done: false, active: true },
            { label: 'Full Hearing', date: 'Jun 30', done: false },
            { label: 'Award / Judgment', date: 'TBD', done: false },
        ],
        evidence: [
            { name: 'payslip_march.jpg', type: 'photo', size: '512 KB', date: 'Feb 20', hash: '5f4dcc3b...e8', verified: true },
            { name: 'email_thread.pdf', type: 'document', size: '1.8 MB', date: 'Feb 21', hash: '098f6bcd...21d', verified: true },
        ],
        docs: ['Statement of Claim', 'Employment Contract Analysis', 'Mediation Brief'],
        notes: 'Employer has signalled willingness to settle at 8 months. Counter at 12 months + NSSF arrears. Section 49 EA gives strong discretion to courts.',
        messages: [
            { from: 'client', text: 'The employer has contacted me directly. What should I do?', time: 'Yesterday 2:10 PM', mine: false },
            { from: 'lawyer', text: 'Do not respond to them directly. All communication should go through me. Refer them to this platform.', time: 'Yesterday 2:25 PM', mine: true },
        ]
    },
    {
        id: 'KE-2026-0801', client: 'Fatuma Hassan', clientInitials: 'FH', clientColor: '#F59E0B',
        type: 'Succession & Probate', status: 'active', priority: 'normal',
        opponent: 'Estate of Ahmad Hassan', court: 'Chief Magistrate\'s Court — Succession',
        filed: '2026-04-02', nextHearing: '2026-06-14', progress: 15,
        confidence: 78, fee: 38000, paid: 7600,
        stage: 'Grant Petition Filed',
        description: 'Client applying for grant of letters of administration for deceased father\'s estate including a title deed and motor vehicle. Disputed by half-sibling from first wife.',
        tasks: [
            { id: 1, text: 'Obtain death certificate from Registrar of Deaths', assigned: 'client', done: true, urgent: false },
            { id: 2, text: 'Identify and value all estate assets', assigned: 'client', done: false, urgent: false },
            { id: 3, text: 'File petition for grant of letters of administration', assigned: 'lawyer', done: true, urgent: false },
            { id: 4, text: 'Prepare Summons for Directions', assigned: 'lawyer', done: false, urgent: false },
        ],
        timeline: [
            { label: 'Petition Filed', date: 'Apr 2', done: true },
            { label: 'Publication in Gazette', date: 'Apr 18', done: true },
            { label: 'Objection Period Closes', date: 'May 18', done: false, active: true },
            { label: 'Hearing of Petition', date: 'Jun 14', done: false },
            { label: 'Grant Issued', date: 'TBD', done: false },
        ],
        evidence: [
            { name: 'death_certificate.pdf', type: 'document', size: '840 KB', date: 'Apr 2', hash: 'a87ff679...f12', verified: true },
        ],
        docs: ['Petition for Grant', 'Affidavit in Support', 'Gazette Notice'],
        notes: 'Watch for objection from Hassan Musa. If objection lodged, we will need to convert to contested — revise fee accordingly.',
        messages: [
            { from: 'client', text: 'My brother says he will object to the grant. Is that a problem?', time: 'Apr 20 11:30 AM', mine: false },
            { from: 'lawyer', text: 'It can complicate things but we are well-prepared. Let\'s discuss on a call this week.', time: 'Apr 20 12:05 PM', mine: true },
        ]
    },
];

const CLIENTS = [
    { id: 'CLT-001', name: 'John Mwangi', initials: 'JM', color: '#6366F1', phone: '+254 712 345 678', email: 'j.mwangi@email.com', cases: 2, activeCases: 1, totalPaid: 64500, lastContact: '10:32 AM', rating: 5, joined: 'Jan 10, 2026', status: 'active' },
    { id: 'CLT-002', name: 'Amara Osei', initials: 'AO', color: '#10B981', phone: '+254 723 456 789', email: 'a.osei@email.com', cases: 1, activeCases: 1, totalPaid: 27000, lastContact: 'Yesterday', rating: 5, joined: 'Feb 20, 2026', status: 'active' },
    { id: 'CLT-003', name: 'Fatuma Hassan', initials: 'FH', color: '#F59E0B', phone: '+254 734 567 890', email: 'f.hassan@email.com', cases: 1, activeCases: 1, totalPaid: 7600, lastContact: 'Apr 20', rating: 4, joined: 'Apr 2, 2026', status: 'active' },
    { id: 'CLT-004', name: 'Peter Kamau', initials: 'PK', color: '#EF4444', phone: '+254 701 234 567', email: 'p.kamau@email.com', cases: 3, activeCases: 0, totalPaid: 126000, lastContact: 'Mar 15', rating: 5, joined: 'Jun 12, 2025', status: 'past' },
];

const CASE_REQUESTS = [
    { id: 'REQ-2026-091', client: 'Samuel Njoroge', initials: 'SN', color: '#8B5CF6', type: 'Business Dispute', brief: 'Business partner of 4 years has withdrawn KES 2.3M from joint account without consent. Need urgent injunction and suit for breach of partnership agreement.', urgency: 'urgent', budget: '80,000 – 120,000', match: 97, time: '2 hours ago' },
    { id: 'REQ-2026-089', client: 'Grace Wanjiku', initials: 'GW', color: '#EC4899', type: 'Land Dispute', brief: 'Neighbour has encroached on 0.3 acres of registered land. I have title deed and survey map. Need a boundary dispute resolved urgently before construction begins.', urgency: 'high', budget: '40,000 – 70,000', match: 94, time: '5 hours ago' },
    { id: 'REQ-2026-087', client: 'Denis Otieno', initials: 'DO', color: '#14B8A6', type: 'Employment', brief: 'Dismissed after whistleblowing on financial fraud. Have documented evidence of the fraud. Need unfair dismissal + whistleblower protection case.', urgency: 'high', budget: '50,000 – 90,000', match: 88, time: '1 day ago' },
    { id: 'REQ-2026-085', client: 'Mary Njoki', initials: 'MN', color: '#F97316', type: 'Family Law', brief: 'Seeking divorce and custody of 2 children. Matrimonial property includes a parcel in Kiambu. Husband has hired separate counsel.', urgency: 'normal', budget: '60,000 – 100,000', match: 72, time: '2 days ago' },
];

const MESSAGES_DATA = [
    {
        id: 1, clientId: 'CLT-001', client: 'John Mwangi', initials: 'JM', color: '#6366F1', unread: 2, caseId: 'KE-2026-4902', time: '10:32 AM', preview: 'I went to Ardhi House. They said the search will be ready in 3 days.', priority: 'high', thread: [
            { from: 'client', text: 'Good morning. I went to Ardhi House as instructed. They said the search will be ready in 3 days.', time: '10:02 AM', mine: false },
            { from: 'lawyer', text: 'Good. Please specifically request the 30-year historical search — not the standard 5-year. That is critical for our argument. Call them and confirm this.', time: '10:18 AM', mine: true },
            { from: 'client', text: 'I also found an old letter from my late father referencing the land. Can I upload it?', time: '10:29 AM', mine: false },
            { from: 'lawyer', text: 'Yes — upload it immediately to the Evidence Vault. That could be very useful. I will review it this afternoon.', time: '10:32 AM', mine: true },
        ]
    },
    {
        id: 2, clientId: 'CLT-002', client: 'Amara Osei', initials: 'AO', color: '#10B981', unread: 0, caseId: 'KE-2026-3117', time: 'Yesterday', preview: 'The employer has contacted me directly about settling.', priority: 'medium', thread: [
            { from: 'client', text: 'The employer HR called me directly and asked if I want to settle outside court. Is that a problem?', time: 'Yesterday 2:10 PM', mine: false },
            { from: 'lawyer', text: 'Do NOT respond to them directly. All negotiations must go through me. Tell them to contact my office. This is a good sign — they are nervous about the hearing.', time: 'Yesterday 2:25 PM', mine: true },
            { from: 'client', text: 'Understood. They mentioned 8 months\' salary. Should I accept?', time: 'Yesterday 2:41 PM', mine: false },
            { from: 'lawyer', text: 'Absolutely not. We will counter at 12 months plus NSSF arrears of KES 94,000. Leave the negotiation to me.', time: 'Yesterday 3:02 PM', mine: true },
        ]
    },
    {
        id: 3, clientId: 'CLT-003', client: 'Fatuma Hassan', initials: 'FH', color: '#F59E0B', unread: 1, caseId: 'KE-2026-0801', time: 'Apr 20', preview: 'My brother says he will object to the grant.', priority: 'normal', thread: [
            { from: 'client', text: 'My brother Hassan Musa has told my aunt he plans to object to the grant. He claims father promised him the car.', time: 'Apr 20 11:30 AM', mine: false },
            { from: 'lawyer', text: 'Verbal promises do not constitute legal obligations under the Law of Succession Act. If he files an objection, we are well-prepared. Let\'s schedule a call to discuss strategy.', time: 'Apr 20 12:05 PM', mine: true },
        ]
    },
];

const EARNINGS = {
    thisMonth: 128500, lastMonth: 96000, ytd: 487000, pending: 104500,
    inEscrow: 65500, activeCases: 3,
    monthly: [62000, 81000, 73000, 96000, 128500],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    byCase: [
        { id: 'KE-2026-4902', label: 'Land — Mwangi', fee: 85000, paid: 51000, pending: 34000 },
        { id: 'KE-2026-3117', label: 'Employment — Osei', fee: 45000, paid: 27000, pending: 18000 },
        { id: 'KE-2026-0801', label: 'Succession — Hassan', fee: 38000, paid: 7600, pending: 30400 },
    ],
    transactions: [
        { desc: 'Case Filing Fee — KE-2026-0801', amount: 7600, date: 'Apr 2', type: 'in', ref: 'TXN991827' },
        { desc: 'Hearing Milestone — KE-2026-4902', amount: 25500, date: 'Mar 3', type: 'in', ref: 'TXN978342' },
        { desc: 'M-Pesa Payout to Account', amount: -52000, date: 'Mar 1', type: 'out', ref: 'TXN974100' },
        { desc: 'Filing Milestone — KE-2026-3117', amount: 13500, date: 'Feb 28', type: 'in', ref: 'TXN961204' },
        { desc: 'Consultation — KE-2026-3117', amount: 9000, date: 'Feb 20', type: 'in', ref: 'TXN952801' },
    ],
};

const CALENDAR_EVENTS = [
    { id: 1, date: '2026-05-08', time: '9:00 AM', label: 'File Hearing Bundle', type: 'deadline', case: 'KE-2026-4902', urgent: true },
    { id: 2, date: '2026-05-10', time: '11:00 AM', label: 'Client Call — John Mwangi', type: 'meeting', case: 'KE-2026-4902', urgent: false },
    { id: 3, date: '2026-05-12', time: '9:00 AM', label: 'Full Hearing — ELC Court 4', type: 'hearing', case: 'KE-2026-4902', urgent: true },
    { id: 4, date: '2026-05-19', time: '10:30 AM', label: 'Mediation — ELRC Nairobi', type: 'hearing', case: 'KE-2026-3117', urgent: false },
    { id: 5, date: '2026-05-20', time: '2:00 PM', label: 'New Client Consultation — Njoroge', type: 'meeting', case: null, urgent: false },
    { id: 6, date: '2026-06-14', time: '9:00 AM', label: 'Succession Petition Hearing', type: 'hearing', case: 'KE-2026-0801', urgent: false },
];

const TASKS = [
    { id: 1, text: 'Prepare hearing bundle — 5 copies by May 8', case: 'KE-2026-4902', client: 'John Mwangi', due: 'May 8', priority: 'urgent', done: false, assigned: 'lawyer' },
    { id: 2, text: 'Draft mediation position paper for Apex Finance case', case: 'KE-2026-3117', client: 'Amara Osei', due: 'May 16', priority: 'high', done: false, assigned: 'lawyer' },
    { id: 3, text: 'Review replying affidavit filed by Kimani Properties', case: 'KE-2026-4902', client: 'John Mwangi', due: 'May 5', priority: 'urgent', done: true, assigned: 'lawyer' },
    { id: 4, text: 'Prepare Summons for Directions — succession matter', case: 'KE-2026-0801', client: 'Fatuma Hassan', due: 'May 25', priority: 'normal', done: false, assigned: 'lawyer' },
    { id: 5, text: 'Upload certified case law precedents for hearing', case: 'KE-2026-4902', client: 'John Mwangi', due: 'May 9', priority: 'high', done: false, assigned: 'lawyer' },
    { id: 6, text: 'Send written mediation counter-offer to Apex Finance', case: 'KE-2026-3117', client: 'Amara Osei', due: 'May 17', priority: 'high', done: false, assigned: 'lawyer' },
];

const AI_HISTORY = [
    { role: 'assistant', text: 'Karibu, Njeri. I am Veritas — your AI legal research engine. I have indexed the Constitution, all Acts of Parliament, and 12 years of Kenya Law Reports. How can I assist your practice today?', thinking: null },
];

const DOC_TEMPLATES = [
    { name: 'Pleadings — Plaint', desc: 'High Court / Magistrates\' Court originating process', credits: 50, time: '2 min', cat: 'Litigation', icon: '⚖️' },
    { name: 'Written Submissions', desc: 'Structured legal arguments with case law citations', credits: 80, time: '3 min', cat: 'Litigation', icon: '📋' },
    { name: 'Mediation Brief', desc: 'Position paper for court-directed mediation', credits: 60, time: '2 min', cat: 'ADR', icon: '🤝' },
    { name: 'Demand Letter (Premium)', desc: 'Lawyer-issued formal demand with statutory references', credits: 40, time: '90 sec', cat: 'Dispute', icon: '📨' },
    { name: 'Sale Agreement', desc: 'Land or goods — Land Act / Sale of Goods Act compliant', credits: 70, time: '2 min', cat: 'Conveyancing', icon: '🏠' },
    { name: 'Lease Agreement', desc: 'Landlord & Tenant Act 2022 compliant — commercial or residential', credits: 65, time: '2 min', cat: 'Conveyancing', icon: '🔑' },
    { name: 'Affidavit (Complex)', desc: 'Multi-deponent, interlocutory or substantive affidavit', credits: 55, time: '90 sec', cat: 'Litigation', icon: '📜' },
    { name: 'Settlement Agreement', desc: 'Consent terms — can be made rule of court', credits: 75, time: '2 min', cat: 'ADR', icon: '✅' },
];

const PERFORMANCE = {
    winRate: 89, responseTime: 4.2, clientRating: 4.9, casesClosed: 31, casesActive: 3,
    avgResolution: 8.4, onTimeFilings: 97, repeatClients: 68,
    categories: [
        { label: 'Land & Property', count: 14, wins: 13 },
        { label: 'Employment', count: 9, wins: 8 },
        { label: 'Succession', count: 5, wins: 4 },
        { label: 'Commercial', count: 3, wins: 2 },
    ],
};

/* ═══════════════════════════════════════════
   UI PRIMITIVES
═══════════════════════════════════════════ */
const Card = ({ children, className = '', onClick }) => (
    <div onClick={onClick}
        className={`rounded-2xl border bg-[#1a1d2e]/80 backdrop-blur-sm transition-colors ${onClick ? 'cursor-pointer hover:border-white/14' : ''} ${className}`}
        style={{ borderColor: T.border }}>
        {children}
    </div>
);

const PriorityBadge = ({ priority }) => {
    const map = {
        urgent: 'bg-red-500/15 text-red-400 border-red-500/25',
        high: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
        medium: 'bg-blue-500/15 text-blue-400 border-blue-500/25',
        normal: 'bg-white/6 text-white/40 border-white/10',
    };
    const icon = { urgent: '🔴', high: '🟠', medium: '🔵', normal: '⚪' };
    return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${map[priority]}`}>
            <span style={{ fontSize: 7 }}>{icon[priority]}</span> {priority}
        </span>
    );
};

const StatusPill = ({ status }) => {
    const map = {
        active: 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/25',
        concluded: 'bg-white/8 text-white/35 border-white/10',
        pending: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
    };
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${map[status]}`}>
            {status === 'active' && <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />}
            {status}
        </span>
    );
};

const Avatar = ({ initials, color, size = 'md' }) => {
    const s = { xs: 'w-6 h-6 text-[9px]', sm: 'w-8 h-8 text-[10px]', md: 'w-10 h-10 text-sm', lg: 'w-12 h-12 text-base' };
    return (
        <div className={`${s[size]} rounded-full flex items-center justify-center font-black border flex-shrink-0`}
            style={{ background: color + '22', borderColor: color + '40', color }}>
            {initials}
        </div>
    );
};

const ProgressBar = ({ pct, color = T.gold, height = 'h-1.5' }) => (
    <div className={`w-full ${height} rounded-full bg-white/6 overflow-hidden`}>
        <div className={`h-full rounded-full transition-all duration-700`} style={{ width: `${pct}%`, background: color }} />
    </div>
);

const ProgressRing = ({ pct, size = 60, stroke = 4, color = T.gold }) => {
    const r = (size - stroke) / 2;
    const circ = 2 * Math.PI * r;
    return (
        <svg width={size} height={size} className="-rotate-90">
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
                strokeDasharray={circ} strokeDashoffset={circ - (pct / 100) * circ} strokeLinecap="round" />
        </svg>
    );
};

const MiniSparkline = ({ data, color = T.gold, height = 40 }) => {
    const max = Math.max(...data); const min = Math.min(...data);
    const w = 120; const h = height;
    const pts = data.map((v, i) => {
        const x = (i / (data.length - 1)) * w;
        const y = h - ((v - min) / (max - min || 1)) * (h - 8) - 4;
        return `${x},${y}`;
    }).join(' ');
    return (
        <svg width={w} height={h} className="overflow-visible">
            <polyline fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={pts} />
            <polyline fill={`url(#grad-${color.replace('#', '')})`} stroke="none" points={`0,${h} ${pts} ${w},${h}`} opacity="0.15" />
            <defs>
                <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} /><stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
            </defs>
        </svg>
    );
};

/* ═══════════════════════════════════════════
   SIDEBAR
═══════════════════════════════════════════ */
const NAV = [
    { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
    { id: 'cases', icon: Gavel, label: 'Cases', badge: '3' },
    { id: 'clients', icon: Users, label: 'Clients' },
    { id: 'marketplace', icon: Inbox, label: 'Marketplace', badge: '4' },
    { id: 'messages', icon: MessageSquare, label: 'Messages', badge: '3' },
    { id: 'tasks', icon: ListChecks, label: 'Tasks & Deadlines', badge: '5' },
    { id: 'calendar', icon: Calendar, label: 'Calendar' },
    { id: 'documents', icon: FileText, label: 'Documents' },
    { id: 'ai', icon: Sparkles, label: 'Veritas AI' },
    { id: 'payments', icon: Banknote, label: 'Earnings' },
    { id: 'performance', icon: BarChart2, label: 'Performance' },
];

function Sidebar({ active, setActive, collapsed, setCollapsed }) {
    return (
        <aside className={`flex flex-col border-r h-screen sticky top-0 transition-all duration-300 ${collapsed ? 'w-[60px]' : 'w-[220px]'}`}
            style={{ background: T.bg2, borderColor: T.border }}>
            <div className="flex items-center gap-2.5 px-4 py-4 border-b" style={{ borderColor: T.border }}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: T.gold + '20', border: `1px solid ${T.gold}40` }}>
                    <Scale style={{ width: 14, height: 14, color: T.gold }} />
                </div>
                {!collapsed && <span className="font-bold text-white text-base tracking-tight">Veritex</span>}
                <button onClick={() => setCollapsed(v => !v)}
                    className="ml-auto w-5 h-5 rounded flex items-center justify-center hover:bg-white/8 transition-colors">
                    {collapsed ? <ChevronRight style={{ width: 12, height: 12, color: T.text3 }} /> : <ChevronLeft style={{ width: 12, height: 12, color: T.text3 }} />}
                </button>
            </div>

            {!collapsed && (
                <div className="px-3 py-3 border-b" style={{ borderColor: T.border }}>
                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl" style={{ background: T.bg3 }}>
                        <div className="w-8 h-8 rounded-full font-black text-xs flex items-center justify-center border flex-shrink-0"
                            style={{ background: T.gold + '22', borderColor: T.gold + '50', color: T.gold }}>NK</div>
                        <div className="min-w-0 flex-1">
                            <p className="text-white text-[11px] font-bold truncate">{LAWYER.name}</p>
                            <p className="text-[10px] truncate" style={{ color: T.text3 }}>Land & Employment · LSK</p>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-[#10B981] flex-shrink-0 animate-pulse" />
                    </div>
                </div>
            )}

            <nav className="flex-1 py-2 overflow-y-auto">
                {NAV.map(({ id, icon: Icon, label, badge }) => (
                    <button key={id} onClick={() => setActive(id)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 text-left transition-all relative group ${active === id ? 'text-white' : 'hover:text-white/70'}`}
                        style={{ color: active === id ? 'white' : T.text3 }}>
                        {active === id && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r" style={{ background: T.gold }} />
                        )}
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${active === id ? 'opacity-100' : 'opacity-50 group-hover:opacity-75'}`}
                            style={{ background: active === id ? T.gold + '20' : 'transparent' }}>
                            <Icon style={{ width: 14, height: 14, color: active === id ? T.gold : 'inherit' }} />
                        </div>
                        {!collapsed && (
                            <>
                                <span className="text-[12px] font-medium flex-1 truncate">{label}</span>
                                {badge && (
                                    <span className="w-4 h-4 rounded-full text-[9px] font-black flex items-center justify-center"
                                        style={{ background: T.gold + '25', color: T.gold }}>{badge}</span>
                                )}
                            </>
                        )}
                        {collapsed && badge && <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full" style={{ background: T.gold }} />}
                    </button>
                ))}
            </nav>

            <div className="border-t py-2" style={{ borderColor: T.border }}>
                {[{ icon: Settings, label: 'Settings' }, { icon: LogOut, label: 'Sign Out' }].map(({ icon: Icon, label }) => (
                    <button key={label} className="w-full flex items-center gap-2.5 px-3 py-2 hover:text-white/60 transition-colors" style={{ color: T.text4 }}>
                        <Icon style={{ width: 14, height: 14 }} className="flex-shrink-0" />
                        {!collapsed && <span className="text-[11px]">{label}</span>}
                    </button>
                ))}
            </div>
        </aside>
    );
}

/* ═══════════════════════════════════════════
   TOP BAR
═══════════════════════════════════════════ */
function TopBar({ title, subtitle }) {
    const [notifOpen, setNotifOpen] = useState(false);
    const [statusOpen, setStatusOpen] = useState(false);
    const [status, setStatus] = useState('online');
    const [search, setSearch] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);

    const notifs = [
        { icon: Inbox, text: 'New case request: Business Dispute — KES 80K–120K', time: '2h ago', type: 'request', unread: true },
        { icon: MessageSquare, text: 'John Mwangi sent 2 new messages', time: '10:32 AM', type: 'message', unread: true },
        { icon: CreditCard, text: 'KES 7,600 received — Fatuma Hassan', time: 'Apr 2', type: 'payment', unread: true },
        { icon: Gavel, text: 'Hearing confirmed: ELC Court 4, May 12 at 9:00 AM', time: 'Yesterday', type: 'court', unread: false },
        { icon: AlertTriangle, text: 'Deadline: Hearing bundle due in 7 days', time: 'Yesterday', type: 'deadline', unread: false },
    ];
    const unread = notifs.filter(n => n.unread).length;
    const statusConfig = {
        online: { label: 'Available', color: '#10B981', dot: 'bg-[#10B981]' },
        busy: { label: 'Busy', color: '#F59E0B', dot: 'bg-amber-400' },
        away: { label: 'Away', color: T.text3, dot: 'bg-white/20' },
    };

    const searchResults = search.length > 1 ? [
        ...CASES.filter(c => c.id.includes(search) || c.client.toLowerCase().includes(search.toLowerCase()) || c.type.toLowerCase().includes(search.toLowerCase())).map(c => ({ type: 'case', label: `${c.id} — ${c.type}`, sub: c.client })),
        ...CLIENTS.filter(c => c.name.toLowerCase().includes(search.toLowerCase())).map(c => ({ type: 'client', label: c.name, sub: c.cases + ' cases' })),
    ] : [];

    return (
        <header className="flex items-center gap-4 px-6 py-3 border-b sticky top-0 z-40 backdrop-blur-sm"
            style={{ background: T.bg2 + 'e8', borderColor: T.border }}>

            {/* Smart search */}
            <div className="flex-1 relative max-w-lg">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl border focus-within:border-white/20 transition-colors"
                    style={{ background: T.bg3, borderColor: T.border }}>
                    <Search style={{ width: 14, height: 14, color: T.text3 }} />
                    <input value={search} onChange={e => { setSearch(e.target.value); setSearchOpen(true); }}
                        onFocus={() => setSearchOpen(true)} onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
                        placeholder="Search cases, clients, documents..." className="bg-transparent text-white/70 text-xs outline-none w-full placeholder:text-white/20" />
                    {search && <button onClick={() => setSearch('')}><X style={{ width: 12, height: 12, color: T.text3 }} /></button>}
                    <kbd className="px-1.5 py-0.5 rounded text-[9px] font-mono" style={{ background: T.bg4, color: T.text4 }}>⌘K</kbd>
                </div>
                {searchOpen && searchResults.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 rounded-xl border shadow-2xl overflow-hidden z-50"
                        style={{ background: T.bg3, borderColor: T.border }}>
                        {searchResults.map((r, i) => (
                            <div key={i} className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/4 cursor-pointer transition-colors border-b last:border-0" style={{ borderColor: T.border }}>
                                <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: T.gold + '20' }}>
                                    {r.type === 'case' ? <Gavel style={{ width: 11, height: 11, color: T.gold }} /> : <User style={{ width: 11, height: 11, color: T.gold }} />}
                                </div>
                                <div>
                                    <p className="text-white text-xs font-medium">{r.label}</p>
                                    <p className="text-[10px]" style={{ color: T.text3 }}>{r.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex items-center gap-2">
                {/* Quick add */}
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all"
                    style={{ background: T.gold, color: '#0d0f18' }}>
                    <Plus style={{ width: 13, height: 13 }} /> New Case
                </button>

                {/* Emergency */}
                <button className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-bold transition-colors"
                    style={{ background: '#EF444415', border: `1px solid #EF444425`, color: '#EF4444' }}>
                    <Phone style={{ width: 12, height: 12 }} /> 🆘
                </button>

                {/* Notifications */}
                <div className="relative">
                    <button onClick={() => setNotifOpen(v => !v)}
                        className="relative w-8 h-8 rounded-xl flex items-center justify-center hover:bg-white/8 transition-colors border"
                        style={{ borderColor: T.border }}>
                        <Bell style={{ width: 15, height: 15, color: T.text3 }} />
                        {unread > 0 && <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] font-black flex items-center justify-center" style={{ background: T.gold, color: '#0d0f18' }}>{unread}</span>}
                    </button>
                    {notifOpen && (
                        <div className="absolute right-0 top-11 w-80 rounded-2xl border shadow-2xl overflow-hidden z-50" style={{ background: T.bg3, borderColor: 'rgba(255,255,255,0.12)' }}>
                            <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: T.border }}>
                                <span className="text-white text-sm font-semibold">Notifications</span>
                                <span className="text-xs font-bold" style={{ color: T.gold }}>{unread} new</span>
                            </div>
                            {notifs.map((n, i) => (
                                <div key={i} className={`flex items-start gap-3 px-4 py-3 border-b last:border-0 hover:bg-white/3 cursor-pointer transition-colors ${n.unread ? 'bg-[#D4AF37]/3' : ''}`} style={{ borderColor: T.border }}>
                                    <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: T.gold + '18', border: `1px solid ${T.gold}25` }}>
                                        <n.icon style={{ width: 11, height: 11, color: T.gold }} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs leading-relaxed" style={{ color: n.unread ? T.text1 : T.text2 }}>{n.text}</p>
                                        <p className="text-[10px] mt-1" style={{ color: T.text4 }}>{n.time}</p>
                                    </div>
                                    {n.unread && <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: T.gold }} />}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Status + Profile */}
                <div className="relative">
                    <button onClick={() => setStatusOpen(v => !v)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl border hover:bg-white/5 transition-colors"
                        style={{ background: T.bg3, borderColor: T.border }}>
                        <div className="w-6 h-6 rounded-full font-black text-[10px] flex items-center justify-center border flex-shrink-0"
                            style={{ background: T.gold + '22', borderColor: T.gold + '50', color: T.gold }}>NK</div>
                        <div className="hidden sm:block text-left">
                            <p className="text-white text-[11px] font-semibold leading-none">Njeri Kamau</p>
                            <div className="flex items-center gap-1 mt-0.5">
                                <div className={`w-1.5 h-1.5 rounded-full ${statusConfig[status].dot}`} />
                                <p style={{ fontSize: 9, color: statusConfig[status].color }} className="font-medium">{statusConfig[status].label}</p>
                            </div>
                        </div>
                        <ChevronDown style={{ width: 12, height: 12, color: T.text3 }} />
                    </button>
                    {statusOpen && (
                        <div className="absolute right-0 top-12 w-44 rounded-xl border shadow-xl overflow-hidden z-50" style={{ background: T.bg3, borderColor: T.border }}>
                            {Object.entries(statusConfig).map(([k, v]) => (
                                <button key={k} onClick={() => { setStatus(k); setStatusOpen(false); }}
                                    className="w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-white/5 transition-colors">
                                    <div className={`w-2 h-2 rounded-full ${v.dot}`} />
                                    <span className="text-xs" style={{ color: k === status ? 'white' : T.text2 }}>{v.label}</span>
                                    {k === status && <CheckCircle style={{ width: 12, height: 12, color: T.gold, marginLeft: 'auto' }} />}
                                </button>
                            ))}
                            <div className="border-t" style={{ borderColor: T.border }}>
                                <button className="w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-white/5 transition-colors">
                                    <Settings style={{ width: 12, height: 12, color: T.text3 }} />
                                    <span className="text-xs" style={{ color: T.text2 }}>Profile Settings</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

/* ═══════════════════════════════════════════
   1. OVERVIEW VIEW
═══════════════════════════════════════════ */
function OverviewView({ setActive }) {
    const urgentTasks = TASKS.filter(t => !t.done && t.priority === 'urgent');
    const highTasks = TASKS.filter(t => !t.done && t.priority === 'high');
    const upcomingEvents = CALENDAR_EVENTS.filter(e => new Date(e.date) >= new Date()).slice(0, 4);

    return (
        <div className="p-5 space-y-5 max-w-screen-xl mx-auto">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Active Cases', value: '3', delta: '+1 this month', icon: Gavel, color: T.indigo, trend: 'up' },
                    { label: 'New Requests', value: '4', delta: '2 urgent', icon: Inbox, color: T.amber, trend: 'up' },
                    { label: 'Pending Tasks', value: `${TASKS.filter(t => !t.done).length}`, delta: '2 overdue', icon: ListChecks, color: T.red, trend: 'down' },
                    { label: 'Earnings This Month', value: 'KES 128.5K', delta: '+34% vs last month', icon: Banknote, color: T.jade, trend: 'up' },
                ].map(({ label, value, delta, icon: Icon, color, trend }, i) => (
                    <Card key={i} className="p-5">
                        <div className="flex items-start justify-between mb-3">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center border" style={{ background: color + '15', borderColor: color + '30' }}>
                                <Icon style={{ width: 16, height: 16, color }} />
                            </div>
                            {trend === 'up' ? <TrendingUp style={{ width: 14, height: 14, color: T.jade }} /> : <TrendingDown style={{ width: 14, height: 14, color: T.red }} />}
                        </div>
                        <p className="text-2xl font-black text-white mb-0.5" style={{ fontFamily: 'Georgia, serif' }}>{value}</p>
                        <p className="text-[11px] text-white/35">{label}</p>
                        <p className="text-[10px] mt-1 font-medium" style={{ color: trend === 'up' ? T.jade : T.red }}>{delta}</p>
                    </Card>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-5">
                {/* Left: Urgent + Revenue */}
                <div className="space-y-4">
                    {/* Needs Attention */}
                    <Card className="overflow-hidden">
                        <div className="px-4 py-3 border-b flex items-center gap-2" style={{ borderColor: T.border, background: `${T.red}08` }}>
                            <AlertOctagon style={{ width: 14, height: 14, color: T.red }} />
                            <span className="text-white text-xs font-bold">Needs Attention</span>
                            <span className="ml-auto px-2 py-0.5 rounded-full text-[9px] font-black" style={{ background: T.red + '20', color: T.red }}>{urgentTasks.length + highTasks.length}</span>
                        </div>
                        <div className="divide-y" style={{ divideColor: T.border }}>
                            {[...urgentTasks, ...highTasks].slice(0, 5).map((t, i) => (
                                <div key={i} className="flex items-start gap-3 px-4 py-3 hover:bg-white/2 transition-colors">
                                    <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: t.priority === 'urgent' ? T.red + '20' : T.amber + '20', border: `1px solid ${t.priority === 'urgent' ? T.red : T.amber}40` }}>
                                        <AlertCircle style={{ width: 10, height: 10, color: t.priority === 'urgent' ? T.red : T.amber }} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white/75 text-[11px] leading-snug">{t.text}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[9px] font-mono" style={{ color: T.text3 }}>{t.case}</span>
                                            <span className="text-[9px]" style={{ color: T.amber }}>Due {t.due}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="px-4 py-2 border-t" style={{ borderColor: T.border }}>
                            <button onClick={() => setActive('tasks')} className="text-[11px] font-semibold hover:underline flex items-center gap-1" style={{ color: T.gold }}>
                                View all tasks <ChevronRight style={{ width: 11, height: 11 }} />
                            </button>
                        </div>
                    </Card>

                    {/* Revenue sparkline */}
                    <Card className="p-5">
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <p className="text-[10px] uppercase tracking-widest font-bold" style={{ color: T.text3 }}>Monthly Revenue</p>
                                <p className="text-2xl font-black text-white mt-1" style={{ fontFamily: 'Georgia, serif' }}>KES 487K</p>
                                <p className="text-[10px] mt-0.5" style={{ color: T.jade }}>Year to date</p>
                            </div>
                            <MiniSparkline data={EARNINGS.monthly} color={T.gold} />
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t" style={{ borderColor: T.border }}>
                            {EARNINGS.months.map((m, i) => (
                                <div key={i} className="text-center">
                                    <p className="text-[9px]" style={{ color: T.text3 }}>{m}</p>
                                    <p className="text-[10px] font-bold text-white/60">{(EARNINGS.monthly[i] / 1000).toFixed(0)}K</p>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Center: Active Cases */}
                <div className="lg:col-span-1">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-white font-semibold text-sm">Active Cases</h2>
                        <button onClick={() => setActive('cases')} className="text-[11px] font-semibold flex items-center gap-1 hover:underline" style={{ color: T.gold }}>
                            View all <ChevronRight style={{ width: 12, height: 12 }} />
                        </button>
                    </div>
                    <div className="space-y-3">
                        {CASES.map(c => (
                            <Card key={c.id} className="p-4 hover:border-white/14 transition-colors" onClick={() => setActive('cases')}>
                                <div className="flex items-start gap-3">
                                    <Avatar initials={c.clientInitials} color={c.clientColor} size="sm" />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <p className="text-white text-xs font-semibold">{c.client}</p>
                                            <PriorityBadge priority={c.priority} />
                                        </div>
                                        <p className="text-[11px] mb-2" style={{ color: T.text3 }}>{c.type} · {c.id}</p>
                                        <ProgressBar pct={c.progress} />
                                        <div className="flex items-center justify-between mt-2">
                                            <p className="text-[10px]" style={{ color: T.text3 }}>Stage: <span className="text-white/50">{c.stage}</span></p>
                                            {c.nextHearing && <p className="text-[10px] font-bold" style={{ color: T.gold }}>{new Date(c.nextHearing).toLocaleDateString('en-KE', { day: 'numeric', month: 'short' })}</p>}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Right: Calendar + Performance */}
                <div className="space-y-4">
                    {/* Upcoming events */}
                    <Card className="overflow-hidden">
                        <div className="px-4 py-3 border-b flex items-center gap-2" style={{ borderColor: T.border }}>
                            <Calendar style={{ width: 13, height: 13, color: T.gold }} />
                            <span className="text-white text-xs font-bold">This Week</span>
                        </div>
                        <div className="divide-y" style={{ divideColor: T.border }}>
                            {upcomingEvents.map((ev, i) => {
                                const typeColor = { hearing: T.indigo, deadline: T.red, meeting: T.jade };
                                const typeIcon = { hearing: Gavel, deadline: AlertCircle, meeting: Users };
                                const Icon = typeIcon[ev.type];
                                return (
                                    <div key={i} className="flex items-center gap-3 px-4 py-3 hover:bg-white/2 transition-colors">
                                        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 border" style={{ background: typeColor[ev.type] + '15', borderColor: typeColor[ev.type] + '25' }}>
                                            <Icon style={{ width: 13, height: 13, color: typeColor[ev.type] }} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-white/80 text-[11px] font-medium truncate">{ev.label}</p>
                                            <p className="text-[9px] mt-0.5" style={{ color: T.text3 }}>{new Date(ev.date).toLocaleDateString('en-KE', { weekday: 'short', month: 'short', day: 'numeric' })} · {ev.time}</p>
                                        </div>
                                        {ev.urgent && <span className="text-[9px] font-black px-1.5 py-0.5 rounded" style={{ background: T.red + '20', color: T.red }}>URGENT</span>}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="px-4 py-2 border-t" style={{ borderColor: T.border }}>
                            <button onClick={() => setActive('calendar')} className="text-[11px] font-semibold hover:underline flex items-center gap-1" style={{ color: T.gold }}>
                                Full calendar <ChevronRight style={{ width: 11, height: 11 }} />
                            </button>
                        </div>
                    </Card>

                    {/* Quick performance */}
                    <Card className="p-5">
                        <p className="text-[10px] uppercase tracking-widest font-bold mb-4" style={{ color: T.text3 }}>Performance Snapshot</p>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { label: 'Win Rate', value: `${PERFORMANCE.winRate}%`, color: T.jade },
                                { label: 'Client Rating', value: `${PERFORMANCE.clientRating}★`, color: T.gold },
                                { label: 'Avg. Resolution', value: `${PERFORMANCE.avgResolution}w`, color: T.indigo },
                                { label: 'On-Time Filings', value: `${PERFORMANCE.onTimeFilings}%`, color: T.amber },
                            ].map(({ label, value, color }, i) => (
                                <div key={i} className="p-2.5 rounded-xl text-center" style={{ background: T.bg3 }}>
                                    <p className="text-lg font-black" style={{ color, fontFamily: 'Georgia, serif' }}>{value}</p>
                                    <p className="text-[9px] mt-0.5" style={{ color: T.text3 }}>{label}</p>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* New request alert */}
                    <Card className="p-4" style={{ background: `${T.gold}08`, borderColor: `${T.gold}30` }}>
                        <div className="flex items-center gap-2 mb-2">
                            <Inbox style={{ width: 14, height: 14, color: T.gold }} />
                            <span className="text-xs font-bold" style={{ color: T.gold }}>4 New Case Requests</span>
                        </div>
                        <p className="text-[11px] mb-3" style={{ color: T.text2 }}>1 urgent business dispute — KES 80–120K potential</p>
                        <button onClick={() => setActive('marketplace')}
                            className="w-full py-2 rounded-xl text-xs font-bold transition-all" style={{ background: T.gold, color: '#0d0f18' }}>
                            Review Requests →
                        </button>
                    </Card>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   2. CASES VIEW
═══════════════════════════════════════════ */
function CasesView() {
    const [selected, setSelected] = useState(CASES[0]);
    const [tab, setTab] = useState('overview');
    const [filter, setFilter] = useState('all');
    const [taskNote, setTaskNote] = useState('');
    const [tasks, setTasks] = useState(selected.tasks);
    const [msgInput, setMsgInput] = useState('');

    useEffect(() => { setTasks(selected.tasks); setTab('overview'); }, [selected]);

    const filteredCases = filter === 'all' ? CASES : CASES.filter(c => c.priority === filter || c.status === filter);

    const addTask = (assignedTo = 'client') => {
        if (!taskNote.trim()) return;
        setTasks(t => [...t, { id: Date.now(), text: taskNote, assigned: assignedTo, done: false, urgent: false }]);
        setTaskNote('');
    };

    return (
        <div className="flex h-full overflow-hidden">
            {/* Case list sidebar */}
            <div className="w-72 border-r flex flex-col shrink-0" style={{ background: T.bg1, borderColor: T.border }}>
                <div className="p-3 border-b space-y-2" style={{ borderColor: T.border }}>
                    <div className="flex items-center gap-2">
                        <div className="flex-1 flex items-center gap-2 px-2.5 py-2 rounded-xl border" style={{ background: T.bg3, borderColor: T.border }}>
                            <Search style={{ width: 12, height: 12, color: T.text3 }} />
                            <input className="bg-transparent text-white/60 text-[11px] outline-none w-full placeholder:text-white/20" placeholder="Search cases..." />
                        </div>
                        <button className="w-8 h-8 rounded-xl flex items-center justify-center border hover:bg-white/8 transition-colors" style={{ borderColor: T.border }}>
                            <Filter style={{ width: 13, height: 13, color: T.text3 }} />
                        </button>
                    </div>
                    <div className="flex gap-1">
                        {['all', 'urgent', 'high', 'active'].map(f => (
                            <button key={f} onClick={() => setFilter(f)}
                                className={`flex-1 py-1 rounded-lg text-[10px] font-semibold capitalize transition-all`}
                                style={{ background: filter === f ? T.gold : T.bg4, color: filter === f ? '#0d0f18' : T.text3 }}>
                                {f}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {filteredCases.map(c => (
                        <button key={c.id} onClick={() => setSelected(c)}
                            className={`w-full text-left px-4 py-4 border-b hover:bg-white/3 transition-colors ${selected?.id === c.id ? 'border-l-2' : ''}`}
                            style={{ borderColor: T.border, borderLeftColor: selected?.id === c.id ? T.gold : T.border }}>
                            <div className="flex items-start gap-2.5">
                                <Avatar initials={c.clientInitials} color={c.clientColor} size="sm" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-0.5">
                                        <p className="text-white text-[11px] font-semibold truncate">{c.client}</p>
                                        <PriorityBadge priority={c.priority} />
                                    </div>
                                    <p className="text-[10px] mb-1.5" style={{ color: T.text3 }}>{c.type}</p>
                                    <ProgressBar pct={c.progress} height="h-1" />
                                    <div className="flex items-center justify-between mt-1.5">
                                        <span className="text-[9px] font-mono" style={{ color: T.text4 }}>{c.id}</span>
                                        {c.nextHearing && <span className="text-[9px] font-bold" style={{ color: T.gold }}>{new Date(c.nextHearing).toLocaleDateString('en-KE', { day: 'numeric', month: 'short' })}</span>}
                                    </div>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
                <div className="p-3 border-t" style={{ borderColor: T.border }}>
                    <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all"
                        style={{ background: T.gold, color: '#0d0f18' }}>
                        <Plus style={{ width: 13, height: 13 }} /> Open New Case
                    </button>
                </div>
            </div>

            {/* Case detail */}
            {selected && (
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Case header */}
                    <div className="px-6 py-4 border-b flex items-start justify-between shrink-0" style={{ borderColor: T.border, background: T.bg2 }}>
                        <div>
                            <div className="flex items-center gap-2 mb-1.5">
                                <span className="text-[10px] font-mono" style={{ color: T.text3 }}>{selected.id}</span>
                                <StatusPill status={selected.status} />
                                <PriorityBadge priority={selected.priority} />
                            </div>
                            <h2 className="text-white text-xl font-black">{selected.type}</h2>
                            <p className="text-sm mt-0.5" style={{ color: T.text2 }}>
                                <span style={{ color: T.gold }}>Client:</span> {selected.client} &nbsp;·&nbsp; vs. {selected.opponent}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="text-center">
                                <div className="relative inline-flex">
                                    <ProgressRing pct={selected.progress} size={64} stroke={5} color={T.gold} />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-base font-black text-white">{selected.progress}%</span>
                                    </div>
                                </div>
                                <p style={{ fontSize: 9, color: T.text3 }}>complete</p>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold border transition-colors hover:bg-white/8"
                                    style={{ borderColor: T.border, color: T.text2 }}>
                                    <Phone style={{ width: 12, height: 12 }} /> Call Client
                                </button>
                                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all"
                                    style={{ background: T.gold, color: '#0d0f18' }}>
                                    <Brain style={{ width: 12, height: 12 }} /> AI Strategy
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-0.5 px-6 py-2 border-b shrink-0" style={{ borderColor: T.border, background: T.bg2 }}>
                        {['overview', 'tasks', 'evidence', 'documents', 'messages', 'court'].map(t => (
                            <button key={t} onClick={() => setTab(t)}
                                className="px-3 py-1.5 rounded-lg text-[11px] font-semibold capitalize transition-all"
                                style={{ background: tab === t ? T.gold : 'transparent', color: tab === t ? '#0d0f18' : T.text3 }}>
                                {t}
                            </button>
                        ))}
                    </div>

                    {/* Tab content */}
                    <div className="flex-1 overflow-y-auto p-5">

                        {tab === 'overview' && (
                            <div className="grid lg:grid-cols-2 gap-5">
                                <div className="space-y-4">
                                    {/* Info grid */}
                                    <Card className="p-4">
                                        <p className="text-[10px] uppercase tracking-widest font-bold mb-3" style={{ color: T.text3 }}>Case Details</p>
                                        <div className="grid grid-cols-2 gap-3">
                                            {[
                                                { label: 'Court', value: selected.court.split(',')[0] },
                                                { label: 'Filed', value: new Date(selected.filed).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' }) },
                                                { label: 'Stage', value: selected.stage },
                                                { label: 'Next Hearing', value: selected.nextHearing ? new Date(selected.nextHearing).toLocaleDateString('en-KE', { day: 'numeric', month: 'short' }) : '—' },
                                                { label: 'AI Confidence', value: `${selected.confidence}%` },
                                                { label: 'Fee Collected', value: `${Math.round(selected.paid / selected.fee * 100)}%` },
                                            ].map(({ label, value }, i) => (
                                                <div key={i}>
                                                    <p style={{ fontSize: 9, color: T.text4 }} className="uppercase tracking-wider">{label}</p>
                                                    <p className="text-white text-xs font-semibold mt-0.5">{value}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </Card>

                                    {/* Case description */}
                                    <Card className="p-4">
                                        <p className="text-[10px] uppercase tracking-widest font-bold mb-2" style={{ color: T.text3 }}>Case Description</p>
                                        <p className="text-[11px] leading-relaxed" style={{ color: T.text2 }}>{selected.description}</p>
                                    </Card>

                                    {/* Lawyer notes */}
                                    <Card className="p-4" style={{ borderColor: `${T.gold}30`, background: `${T.gold}05` }}>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Lightbulb style={{ width: 13, height: 13, color: T.gold }} />
                                            <p className="text-[10px] uppercase tracking-widest font-bold" style={{ color: T.gold }}>Strategy Notes</p>
                                        </div>
                                        <p className="text-[11px] leading-relaxed" style={{ color: T.text2 }}>{selected.notes}</p>
                                    </Card>
                                </div>

                                {/* Timeline */}
                                <Card className="p-4">
                                    <p className="text-[10px] uppercase tracking-widest font-bold mb-4" style={{ color: T.text3 }}>Case Timeline</p>
                                    <div className="relative">
                                        <div className="absolute left-3.5 top-2 bottom-2 w-px" style={{ background: T.border }} />
                                        <div className="space-y-4">
                                            {selected.timeline.map((t, i) => (
                                                <div key={i} className="flex items-start gap-4 relative">
                                                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 z-10 border-2 ${t.done ? '' : t.active ? '' : ''}`}
                                                        style={{
                                                            background: t.done ? `${T.gold}20` : t.active ? `${T.gold}12` : `${T.bg4}`,
                                                            borderColor: t.done ? T.gold : t.active ? `${T.gold}60` : T.border,
                                                        }}>
                                                        {t.done ? <CheckCircle style={{ width: 13, height: 13, color: T.gold }} /> :
                                                            t.active ? <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: T.gold + '80' }} /> :
                                                                <div className="w-2 h-2 rounded-full" style={{ background: T.border }} />}
                                                    </div>
                                                    <div className="flex-1 pb-1">
                                                        <div className="flex items-center justify-between">
                                                            <p className="text-[11px] font-semibold" style={{ color: t.done ? 'white' : t.active ? T.gold : T.text3 }}>{t.label}</p>
                                                            <span className="text-[10px] font-bold" style={{ color: t.done ? T.gold : t.active ? `${T.gold}80` : T.text4 }}>{t.date}</span>
                                                        </div>
                                                        {t.active && <p className="text-[10px] mt-0.5" style={{ color: `${T.gold}70` }}>Current stage</p>}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        )}

                        {tab === 'tasks' && (
                            <div className="space-y-4 max-w-2xl">
                                <Card className="p-4">
                                    <p className="text-[10px] uppercase tracking-widest font-bold mb-3" style={{ color: T.text3 }}>Assign Task to Client</p>
                                    <div className="flex gap-2">
                                        <input value={taskNote} onChange={e => setTaskNote(e.target.value)}
                                            placeholder='e.g. "Upload your employment letter"'
                                            className="flex-1 px-3 py-2 rounded-xl text-xs outline-none border transition-colors placeholder:text-white/20"
                                            style={{ background: T.bg3, borderColor: T.border, color: 'white' }} />
                                        <button onClick={() => addTask('client')} className="px-3 py-2 rounded-xl text-xs font-bold transition-all" style={{ background: T.indigo + '25', border: `1px solid ${T.indigo}40`, color: T.indigo }}>
                                            → Client
                                        </button>
                                        <button onClick={() => addTask('lawyer')} className="px-3 py-2 rounded-xl text-xs font-bold transition-all" style={{ background: T.gold + '20', border: `1px solid ${T.gold}35`, color: T.gold }}>
                                            → Me
                                        </button>
                                    </div>
                                    <p className="text-[10px] mt-2" style={{ color: T.text4 }}>Tasks assigned to client appear on their dashboard with notifications</p>
                                </Card>
                                <div className="space-y-2">
                                    {['lawyer', 'client'].map(assignee => (
                                        <div key={assignee}>
                                            <p className="text-[10px] uppercase tracking-widest font-bold mb-2" style={{ color: T.text3 }}>
                                                {assignee === 'lawyer' ? '⚖️ Your Tasks' : `👤 Client Tasks — ${selected.client}`}
                                            </p>
                                            {tasks.filter(t => t.assigned === assignee).map((t, i) => (
                                                <Card key={i} className="flex items-start gap-3 p-3 mb-2">
                                                    <button onClick={() => setTasks(prev => prev.map(tk => tk.id === t.id ? { ...tk, done: !tk.done } : tk))}
                                                        className="mt-0.5 flex-shrink-0">
                                                        {t.done ? <CheckSquare style={{ width: 16, height: 16, color: T.jade }} /> : <Square style={{ width: 16, height: 16, color: T.text3 }} />}
                                                    </button>
                                                    <div className="flex-1">
                                                        <p className={`text-[11px] ${t.done ? 'line-through' : ''}`} style={{ color: t.done ? T.text3 : 'white/75' }}>{t.text}</p>
                                                    </div>
                                                    {t.urgent && !t.done && <span className="text-[9px] font-black px-1.5 py-0.5 rounded" style={{ background: T.red + '20', color: T.red }}>URGENT</span>}
                                                    <button className="text-white/15 hover:text-red-400 transition-colors">
                                                        <Trash2 style={{ width: 13, height: 13 }} />
                                                    </button>
                                                </Card>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {tab === 'evidence' && (
                            <div className="space-y-3 max-w-3xl">
                                <Card className="flex items-center gap-3 p-3.5" style={{ borderColor: `${T.jade}30`, background: `${T.jade}06` }}>
                                    <Shield style={{ width: 15, height: 15, color: T.jade }} />
                                    <p className="text-[11px]" style={{ color: T.text2 }}>All evidence is SHA-256 hashed and blockchain-anchored. Admissible in all Kenyan courts.</p>
                                </Card>
                                {selected.evidence.map((ev, i) => {
                                    const typeIcon = { document: FileText, photo: Image, video: Video, audio: Mic };
                                    const typeColor = { document: T.indigo, photo: T.jade, video: T.red, audio: '#8B5CF6' };
                                    const Icon = typeIcon[ev.type] || FileText;
                                    return (
                                        <Card key={i} className="flex items-center gap-4 px-5 py-4">
                                            <div className="w-9 h-9 rounded-xl flex items-center justify-center border" style={{ background: typeColor[ev.type] + '15', borderColor: typeColor[ev.type] + '25' }}>
                                                <Icon style={{ width: 16, height: 16, color: typeColor[ev.type] }} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-white text-[11px] font-medium truncate">{ev.name}</p>
                                                <div className="flex items-center gap-3 mt-0.5">
                                                    <span className="text-[9px] font-mono" style={{ color: T.text4 }}>SHA: {ev.hash}</span>
                                                    <span style={{ fontSize: 9, color: T.text4 }}>{ev.size}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {ev.verified ? (
                                                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg" style={{ background: T.jade + '15', border: `1px solid ${T.jade}25` }}>
                                                        <BadgeCheck style={{ width: 10, height: 10, color: T.jade }} />
                                                        <span className="text-[9px] font-bold" style={{ color: T.jade }}>Court-ready</span>
                                                    </div>
                                                ) : (
                                                    <div className="px-2 py-1 rounded-lg text-[9px] font-bold" style={{ background: T.amber + '15', color: T.amber, border: `1px solid ${T.amber}25` }}>Processing</div>
                                                )}
                                                <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/8 transition-colors">
                                                    <Download style={{ width: 13, height: 13, color: T.text3 }} />
                                                </button>
                                            </div>
                                        </Card>
                                    );
                                })}
                                <label className="block cursor-pointer group">
                                    <div className="flex items-center justify-center gap-3 p-5 rounded-2xl border-2 border-dashed hover:border-white/20 transition-colors" style={{ borderColor: T.border }}>
                                        <Upload style={{ width: 16, height: 16, color: T.text3 }} />
                                        <span className="text-[11px]" style={{ color: T.text3 }}>Upload additional evidence</span>
                                    </div>
                                    <input type="file" className="hidden" multiple />
                                </label>
                            </div>
                        )}

                        {tab === 'documents' && (
                            <div className="space-y-3 max-w-3xl">
                                {selected.docs.map((doc, i) => (
                                    <Card key={i} className="flex items-center gap-4 px-5 py-4">
                                        <div className="w-9 h-9 rounded-xl flex items-center justify-center border" style={{ background: T.gold + '15', borderColor: T.gold + '25' }}>
                                            <FileText style={{ width: 16, height: 16, color: T.gold }} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-white text-[11px] font-medium">{doc}</p>
                                            <p style={{ fontSize: 9, color: T.text4 }}>Case {selected.id}</p>
                                        </div>
                                        <div className="flex gap-1.5">
                                            {['View', 'Edit', 'Download'].map(action => (
                                                <button key={action} className="px-2.5 py-1 rounded-lg text-[10px] font-semibold border hover:bg-white/8 transition-colors"
                                                    style={{ borderColor: T.border, color: T.text2 }}>{action}</button>
                                            ))}
                                        </div>
                                    </Card>
                                ))}
                                <button className="w-full flex items-center justify-center gap-2 p-3.5 rounded-2xl border-2 border-dashed hover:border-white/20 transition-colors text-[11px]"
                                    style={{ borderColor: T.border, color: T.text3 }}>
                                    <Plus style={{ width: 14, height: 14 }} /> Generate New Document with AI
                                </button>
                            </div>
                        )}

                        {tab === 'messages' && (
                            <div className="max-w-2xl space-y-4">
                                <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: `${T.jade}10`, border: `1px solid ${T.jade}20` }}>
                                    <Lock style={{ width: 13, height: 13, color: T.jade }} />
                                    <p className="text-[11px]" style={{ color: T.text2 }}>End-to-end encrypted · Protected by legal professional privilege</p>
                                </div>
                                {selected.messages.map((msg, i) => (
                                    <div key={i} className={`flex gap-3 ${msg.mine ? 'flex-row-reverse' : ''}`}>
                                        <div className="w-7 h-7 rounded-full flex items-center justify-center border flex-shrink-0"
                                            style={{ background: msg.mine ? T.gold + '20' : selected.clientColor + '22', borderColor: msg.mine ? T.gold + '40' : selected.clientColor + '40', color: msg.mine ? T.gold : selected.clientColor, fontSize: 10, fontWeight: 900 }}>
                                            {msg.mine ? 'NK' : selected.clientInitials}
                                        </div>
                                        <div className="max-w-sm px-4 py-3 rounded-2xl text-[11px] leading-relaxed"
                                            style={{ background: msg.mine ? `${T.gold}12` : T.bg3, border: `1px solid ${msg.mine ? T.gold + '25' : T.border}`, color: T.text1, borderRadius: msg.mine ? '16px 4px 16px 16px' : '4px 16px 16px 16px' }}>
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                                <div className="flex items-center gap-2 p-3 rounded-2xl border" style={{ background: T.bg3, borderColor: T.border }}>
                                    <input value={msgInput} onChange={e => setMsgInput(e.target.value)}
                                        placeholder="Message your client..."
                                        className="flex-1 bg-transparent text-white/70 text-[11px] outline-none placeholder:text-white/20" />
                                    <button className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
                                        style={{ background: msgInput ? T.gold : T.bg4 }}>
                                        <Send style={{ width: 13, height: 13, color: msgInput ? '#0d0f18' : T.text4 }} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {tab === 'court' && (
                            <div className="grid lg:grid-cols-2 gap-5 max-w-3xl">
                                <Card className="p-4 space-y-3">
                                    <p className="text-[10px] uppercase tracking-widest font-bold" style={{ color: T.text3 }}>Court Actions</p>
                                    {[
                                        { label: 'Schedule Hearing Date', icon: Calendar, color: T.indigo },
                                        { label: 'Upload Court Filing', icon: Upload, color: T.jade },
                                        { label: 'Request Adjournment', icon: RotateCcw, color: T.amber },
                                        { label: 'Extract Decree / Judgment', icon: FileCheck, color: T.gold },
                                        { label: 'File Notice of Appeal', icon: ArrowUpRight, color: T.red },
                                    ].map(({ label, icon: Icon, color }, i) => (
                                        <button key={i} className="w-full flex items-center gap-3 p-3 rounded-xl border hover:bg-white/4 transition-colors text-left"
                                            style={{ borderColor: T.border }}>
                                            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: color + '15', border: `1px solid ${color}25` }}>
                                                <Icon style={{ width: 13, height: 13, color }} />
                                            </div>
                                            <span className="text-[11px] font-medium" style={{ color: T.text2 }}>{label}</span>
                                            <ChevronRight style={{ width: 12, height: 12, color: T.text4, marginLeft: 'auto' }} />
                                        </button>
                                    ))}
                                </Card>
                                <Card className="p-4">
                                    <p className="text-[10px] uppercase tracking-widest font-bold mb-3" style={{ color: T.text3 }}>JICMS Status</p>
                                    <div className="space-y-3">
                                        {[
                                            { label: 'Case Number Confirmed', done: true },
                                            { label: 'All Parties Served', done: true },
                                            { label: 'Hearing Date Set', done: true },
                                            { label: 'Hearing Bundle Filed', done: false },
                                            { label: 'Judgment Delivered', done: false },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                {item.done ? <CheckCircle style={{ width: 15, height: 15, color: T.jade }} /> : <Circle style={{ width: 15, height: 15, color: T.text4 }} />}
                                                <p className="text-[11px]" style={{ color: item.done ? T.text1 : T.text3 }}>{item.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════
   3. CLIENTS VIEW
═══════════════════════════════════════════ */
function ClientsView() {
    const [selected, setSelected] = useState(CLIENTS[0]);
    const [tab, setTab] = useState('overview');

    return (
        <div className="flex h-full overflow-hidden">
            <div className="w-72 border-r flex flex-col shrink-0" style={{ background: T.bg1, borderColor: T.border }}>
                <div className="p-3 border-b" style={{ borderColor: T.border }}>
                    <div className="flex items-center gap-2 px-2.5 py-2 rounded-xl border mb-2" style={{ background: T.bg3, borderColor: T.border }}>
                        <Search style={{ width: 12, height: 12, color: T.text3 }} />
                        <input className="bg-transparent text-white/60 text-[11px] outline-none w-full placeholder:text-white/20" placeholder="Search clients..." />
                    </div>
                    <div className="flex gap-1">
                        {['All', 'Active', 'Past'].map(f => (
                            <button key={f} className="flex-1 py-1 rounded-lg text-[10px] font-semibold" style={{ background: f === 'All' ? T.gold : T.bg4, color: f === 'All' ? '#0d0f18' : T.text3 }}>{f}</button>
                        ))}
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {CLIENTS.map(c => (
                        <button key={c.id} onClick={() => setSelected(c)}
                            className={`w-full text-left px-4 py-4 border-b hover:bg-white/3 transition-colors ${selected?.id === c.id ? 'border-l-2' : ''}`}
                            style={{ borderColor: T.border, borderLeftColor: selected?.id === c.id ? T.gold : T.border }}>
                            <div className="flex items-center gap-3">
                                <Avatar initials={c.initials} color={c.color} size="sm" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <p className="text-white text-[11px] font-semibold">{c.name}</p>
                                        {c.unread > 0 && <span className="w-4 h-4 rounded-full text-[9px] font-black flex items-center justify-center" style={{ background: T.gold, color: '#0d0f18' }}>{c.unread}</span>}
                                    </div>
                                    <p className="text-[9px] mt-0.5" style={{ color: T.text3 }}>{c.activeCases} active case{c.activeCases !== 1 ? 's' : ''} · {c.lastContact}</p>
                                    <div className="flex items-center gap-1 mt-1">
                                        {[...Array(c.rating)].map((_, i) => <Star key={i} style={{ width: 8, height: 8, color: T.gold, fill: T.gold }} />)}
                                        <span style={{ fontSize: 9, color: T.text4, marginLeft: 2 }}>KES {(c.totalPaid / 1000).toFixed(0)}K paid</span>
                                    </div>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
                <div className="p-3 border-t" style={{ borderColor: T.border }}>
                    <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold border hover:bg-white/5 transition-colors"
                        style={{ borderColor: T.border, color: T.text2 }}>
                        <UserPlus style={{ width: 13, height: 13 }} /> Invite New Client
                    </button>
                </div>
            </div>

            {selected && (
                <div className="flex-1 overflow-y-auto p-5">
                    {/* Client header */}
                    <div className="flex items-start gap-5 mb-5">
                        <Avatar initials={selected.initials} color={selected.color} size="lg" />
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <h2 className="text-white text-xl font-black">{selected.name}</h2>
                                <BadgeCheck style={{ width: 16, height: 16, color: T.gold }} />
                                <StatusPill status={selected.status} />
                            </div>
                            <p style={{ color: T.text2, fontSize: 12 }}>{selected.email} · {selected.phone}</p>
                            <p style={{ color: T.text3, fontSize: 11 }} className="mt-0.5">Client since {selected.joined} · {selected.cases} cases total</p>
                            <div className="flex items-center gap-1 mt-1.5">
                                {[...Array(selected.rating)].map((_, i) => <Star key={i} style={{ width: 12, height: 12, color: T.gold, fill: T.gold }} />)}
                                <span style={{ fontSize: 10, color: T.text3, marginLeft: 4 }}>{selected.rating}.0 · {selected.cases} interactions</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold border hover:bg-white/8 transition-colors" style={{ borderColor: T.border, color: T.text2 }}>
                                <MessageSquare style={{ width: 13, height: 13 }} /> Message
                            </button>
                            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold border hover:bg-white/8 transition-colors" style={{ borderColor: T.border, color: T.text2 }}>
                                <Phone style={{ width: 13, height: 13 }} /> Call
                            </button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-1 mb-4 p-1 rounded-xl w-fit" style={{ background: T.bg3 }}>
                        {['overview', 'cases', 'documents', 'payments'].map(t => (
                            <button key={t} onClick={() => setTab(t)} className="px-3 py-1.5 rounded-lg text-[11px] font-semibold capitalize transition-all"
                                style={{ background: tab === t ? T.gold : 'transparent', color: tab === t ? '#0d0f18' : T.text3 }}>{t}</button>
                        ))}
                    </div>

                    {tab === 'overview' && (
                        <div className="grid lg:grid-cols-3 gap-4">
                            {[
                                { label: 'Total Cases', value: selected.cases, icon: Gavel, color: T.indigo },
                                { label: 'Total Paid', value: `KES ${(selected.totalPaid / 1000).toFixed(1)}K`, icon: Banknote, color: T.jade },
                                { label: 'Active Cases', value: selected.activeCases, icon: Activity, color: T.gold },
                            ].map(({ label, value, icon: Icon, color }, i) => (
                                <Card key={i} className="p-4 flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl flex items-center justify-center border" style={{ background: color + '15', borderColor: color + '25' }}>
                                        <Icon style={{ width: 16, height: 16, color }} />
                                    </div>
                                    <div>
                                        <p className="text-white text-lg font-black" style={{ fontFamily: 'Georgia, serif' }}>{value}</p>
                                        <p style={{ fontSize: 10, color: T.text3 }}>{label}</p>
                                    </div>
                                </Card>
                            ))}
                            <div className="lg:col-span-3">
                                <Card className="p-4">
                                    <p className="text-[10px] uppercase tracking-widest font-bold mb-3" style={{ color: T.text3 }}>Active Cases</p>
                                    {CASES.filter(c => c.client === selected.name).map((c, i) => (
                                        <div key={i} className="flex items-center gap-4 py-2 border-b last:border-0" style={{ borderColor: T.border }}>
                                            <div className="flex-1">
                                                <p className="text-white text-xs font-semibold">{c.type}</p>
                                                <p style={{ fontSize: 10, color: T.text3 }}>{c.id} · {c.court.split(',')[0]}</p>
                                            </div>
                                            <ProgressBar pct={c.progress} height="h-1" />
                                            <PriorityBadge priority={c.priority} />
                                        </div>
                                    ))}
                                </Card>
                            </div>
                        </div>
                    )}

                    {tab === 'payments' && (
                        <div className="space-y-3 max-w-2xl">
                            {PAYMENTS.filter(p => CASES.find(c => c.id === p.caseId && c.client === selected.name)).map((pay, i) => {
                                const pct = Math.round((pay.paid / pay.total) * 100);
                                return (
                                    <Card key={i} className="p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <p className="text-white text-sm font-semibold">{pay.label}</p>
                                            <p className="font-black" style={{ color: T.gold, fontFamily: 'Georgia, serif' }}>KES {(pay.paid / 1000).toFixed(1)}K / {(pay.total / 1000).toFixed(1)}K</p>
                                        </div>
                                        <ProgressBar pct={pct} height="h-2" />
                                        <p style={{ fontSize: 10, color: T.text3 }} className="mt-2">{pct}% collected · Escrow-protected</p>
                                    </Card>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════
   4. MARKETPLACE VIEW
═══════════════════════════════════════════ */
function MarketplaceView() {
    const [dismissed, setDismissed] = useState([]);
    const [accepted, setAccepted] = useState([]);
    const visible = CASE_REQUESTS.filter(r => !dismissed.includes(r.id) && !accepted.includes(r.id));

    return (
        <div className="p-5 max-w-5xl mx-auto space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-white font-bold text-base">Case Marketplace</h2>
                    <p style={{ color: T.text3, fontSize: 11 }}>AI-matched requests based on your specialisation, track record, and availability</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl border" style={{ background: T.bg3, borderColor: T.border }}>
                    <Sparkles style={{ width: 13, height: 13, color: T.gold }} />
                    <span style={{ fontSize: 11, color: T.gold }} className="font-bold">AI-matched to you</span>
                </div>
            </div>

            {accepted.length > 0 && (
                <Card className="flex items-center gap-3 p-4" style={{ borderColor: `${T.jade}30`, background: `${T.jade}08` }}>
                    <CheckCircle style={{ width: 15, height: 15, color: T.jade }} />
                    <p style={{ fontSize: 12, color: T.text1 }}>{accepted.length} case{accepted.length > 1 ? 's' : ''} accepted — client has been notified and can now message you.</p>
                </Card>
            )}

            <div className="space-y-4">
                {visible.map((req, i) => (
                    <Card key={req.id} className="p-5 hover:border-white/14 transition-colors">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-4 flex-1">
                                <Avatar initials={req.initials} color={req.color} size="md" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <p className="text-white font-bold text-sm">{req.client}</p>
                                        <PriorityBadge priority={req.urgency} />
                                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ background: T.gold + '20', color: T.gold }}>
                                            {req.match}% match
                                        </span>
                                    </div>
                                    <p className="text-xs font-semibold mb-1" style={{ color: T.indigo }}>{req.type}</p>
                                    <p className="text-[11px] leading-relaxed mb-3" style={{ color: T.text2 }}>"{req.brief}"</p>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1.5">
                                            <Banknote style={{ width: 12, height: 12, color: T.jade }} />
                                            <span className="text-[11px] font-bold" style={{ color: T.jade }}>KES {req.budget}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock style={{ width: 11, height: 11, color: T.text3 }} />
                                            <span style={{ fontSize: 10, color: T.text3 }}>Posted {req.time}</span>
                                        </div>
                                        <span style={{ fontSize: 10, color: T.text4 }} className="font-mono">{req.id}</span>
                                    </div>
                                </div>
                            </div>

                            {/* AI confidence ring */}
                            <div className="text-center flex-shrink-0">
                                <div className="relative inline-flex">
                                    <ProgressRing pct={req.match} size={56} stroke={4} color={req.match > 90 ? T.jade : T.gold} />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-[11px] font-black text-white">{req.match}%</span>
                                    </div>
                                </div>
                                <p style={{ fontSize: 9, color: T.text4 }}>AI match</p>
                            </div>
                        </div>

                        <div className="flex gap-2 mt-4 pt-4 border-t" style={{ borderColor: T.border }}>
                            <button onClick={() => setAccepted(a => [...a, req.id])}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all"
                                style={{ background: T.gold, color: '#0d0f18' }}>
                                <CheckCircle style={{ width: 14, height: 14 }} /> Accept Case
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border hover:bg-white/8 transition-colors"
                                style={{ borderColor: T.border, color: T.text2 }}>
                                <Eye style={{ width: 14, height: 14 }} /> Request More Info
                            </button>
                            <button onClick={() => setDismissed(d => [...d, req.id])}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border hover:bg-red-500/10 transition-colors ml-auto"
                                style={{ borderColor: T.border, color: T.text3 }}>
                                <X style={{ width: 14, height: 14 }} /> Decline
                            </button>
                        </div>
                    </Card>
                ))}
                {visible.length === 0 && (
                    <Card className="p-12 text-center">
                        <Inbox style={{ width: 28, height: 28, color: T.text4, margin: '0 auto 8px' }} />
                        <p style={{ color: T.text3, fontSize: 13 }}>No pending requests. New matches will appear here.</p>
                    </Card>
                )}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   5. MESSAGES VIEW
═══════════════════════════════════════════ */
function MessagesView() {
    const [selected, setSelected] = useState(MESSAGES_DATA[0]);
    const [threads, setThreads] = useState(MESSAGES_DATA);
    const [input, setInput] = useState('');
    const [flagged, setFlagged] = useState([]);

    const sendMsg = () => {
        if (!input.trim()) return;
        const newMsg = { from: 'lawyer', text: input, time: 'Just now', mine: true };
        setThreads(prev => prev.map(t => t.id === selected.id ? { ...t, thread: [...t.thread, newMsg] } : t));
        setSelected(s => ({ ...s, thread: [...s.thread, newMsg] }));
        setInput('');
    };

    return (
        <div className="flex h-full overflow-hidden">
            {/* Thread list */}
            <div className="w-72 border-r flex flex-col shrink-0" style={{ background: T.bg1, borderColor: T.border }}>
                <div className="p-3 border-b" style={{ borderColor: T.border }}>
                    <div className="flex items-center gap-2 px-2.5 py-2 rounded-xl border" style={{ background: T.bg3, borderColor: T.border }}>
                        <Search style={{ width: 12, height: 12, color: T.text3 }} />
                        <input className="bg-transparent text-white/60 text-[11px] outline-none w-full placeholder:text-white/20" placeholder="Search messages..." />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {threads.map(t => (
                        <button key={t.id} onClick={() => setSelected(t)}
                            className={`w-full text-left px-4 py-4 border-b hover:bg-white/3 transition-colors ${selected?.id === t.id ? 'border-l-2' : ''}`}
                            style={{ borderColor: T.border, borderLeftColor: selected?.id === t.id ? T.gold : T.border }}>
                            <div className="flex items-start gap-3">
                                <Avatar initials={t.initials} color={t.color} size="sm" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-0.5">
                                        <p className="text-white text-[11px] font-semibold">{t.client}</p>
                                        <div className="flex items-center gap-1">
                                            {flagged.includes(t.id) && <Flag style={{ width: 10, height: 10, color: T.red }} />}
                                            {t.unread > 0 && <span className="w-4 h-4 rounded-full text-[8px] font-black flex items-center justify-center" style={{ background: T.gold, color: '#0d0f18' }}>{t.unread}</span>}
                                        </div>
                                    </div>
                                    <p style={{ fontSize: 9, color: T.text3 }} className="font-mono mb-1">{t.caseId}</p>
                                    <p style={{ fontSize: 10, color: T.text3 }} className="truncate">{t.preview}</p>
                                    <div className="flex items-center justify-between mt-1">
                                        <PriorityBadge priority={t.priority} />
                                        <span style={{ fontSize: 9, color: T.text4 }}>{t.time}</span>
                                    </div>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Chat */}
            {selected && (
                <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-3 border-b" style={{ borderColor: T.border, background: T.bg2 }}>
                        <div className="flex items-center gap-3">
                            <Avatar initials={selected.initials} color={selected.color} size="sm" />
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="text-white font-semibold text-sm">{selected.client}</p>
                                    <BadgeCheck style={{ width: 13, height: 13, color: T.gold }} />
                                </div>
                                <p style={{ fontSize: 10, color: T.text3 }}>{selected.caseId}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => setFlagged(f => f.includes(selected.id) ? f.filter(x => x !== selected.id) : [...f, selected.id])}
                                className="w-8 h-8 rounded-xl flex items-center justify-center border hover:bg-white/8 transition-colors"
                                style={{ borderColor: T.border, background: flagged.includes(selected.id) ? T.red + '15' : 'transparent' }}>
                                <Flag style={{ width: 14, height: 14, color: flagged.includes(selected.id) ? T.red : T.text3 }} />
                            </button>
                            {[Phone, Video].map((Icon, i) => (
                                <button key={i} className="w-8 h-8 rounded-xl flex items-center justify-center border hover:bg-white/8 transition-colors" style={{ borderColor: T.border }}>
                                    <Icon style={{ width: 14, height: 14, color: T.text3 }} />
                                </button>
                            ))}
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg" style={{ background: T.jade + '10', border: `1px solid ${T.jade}20` }}>
                                <Lock style={{ width: 10, height: 10, color: T.jade }} />
                                <span style={{ fontSize: 9, color: T.jade }} className="font-bold">E2E Encrypted</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-5 space-y-4">
                        {selected.thread.map((msg, i) => (
                            <div key={i} className={`flex gap-3 group ${msg.mine ? 'flex-row-reverse' : ''}`}>
                                <div className="w-7 h-7 rounded-full flex items-center justify-center border flex-shrink-0 text-[9px] font-black"
                                    style={{ background: msg.mine ? T.gold + '22' : selected.color + '22', borderColor: msg.mine ? T.gold + '40' : selected.color + '40', color: msg.mine ? T.gold : selected.color }}>
                                    {msg.mine ? 'NK' : selected.initials}
                                </div>
                                <div className="max-w-sm flex flex-col gap-1">
                                    <div className="px-4 py-3 rounded-2xl text-[11px] leading-relaxed"
                                        style={{ background: msg.mine ? T.gold + '12' : T.bg3, border: `1px solid ${msg.mine ? T.gold + '25' : T.border}`, color: T.text1, borderRadius: msg.mine ? '16px 4px 16px 16px' : '4px 16px 16px 16px' }}>
                                        {msg.text}
                                    </div>
                                    <div className={`flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity ${msg.mine ? 'flex-row-reverse' : ''}`}>
                                        <span style={{ fontSize: 9, color: T.text4 }}>{msg.time}</span>
                                        <button className="flex items-center gap-1 text-[9px] hover:underline" style={{ color: T.gold }}>
                                            → Task
                                        </button>
                                        <button className="flex items-center gap-1 text-[9px] hover:underline" style={{ color: T.indigo }}>
                                            → Evidence
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-4 border-t" style={{ borderColor: T.border }}>
                        <div className="flex items-end gap-2 p-3 rounded-2xl border" style={{ background: T.bg3, borderColor: T.border }}>
                            <div className="flex gap-1.5">
                                {[Paperclip, FileText, Image].map((Icon, i) => (
                                    <button key={i} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/8 transition-colors">
                                        <Icon style={{ width: 13, height: 13, color: T.text3 }} />
                                    </button>
                                ))}
                            </div>
                            <textarea value={input} onChange={e => setInput(e.target.value)}
                                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMsg(); } }}
                                placeholder="Message your client — protected by legal professional privilege..."
                                rows={2} className="flex-1 bg-transparent text-white/75 text-[11px] outline-none resize-none placeholder:text-white/20" />
                            <button onClick={sendMsg} className="w-8 h-8 rounded-xl flex items-center justify-center transition-all flex-shrink-0"
                                style={{ background: input ? T.gold : T.bg4 }}>
                                <Send style={{ width: 13, height: 13, color: input ? '#0d0f18' : T.text4 }} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════
   6. TASKS VIEW
═══════════════════════════════════════════ */
function TasksView() {
    const [allTasks, setAllTasks] = useState(TASKS);
    const [newTask, setNewTask] = useState('');
    const [filter, setFilter] = useState('all');

    const toggle = (id) => setAllTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));

    const filtered = filter === 'all' ? allTasks :
        filter === 'done' ? allTasks.filter(t => t.done) :
            allTasks.filter(t => !t.done && t.priority === filter);

    const priorityColor = { urgent: T.red, high: T.amber, medium: T.indigo, normal: T.text3 };

    return (
        <div className="p-5 max-w-4xl mx-auto space-y-5">
            {/* Progress overview */}
            <div className="grid grid-cols-4 gap-4">
                {[
                    { label: 'Total Tasks', value: allTasks.length, color: T.text2 },
                    { label: 'Completed', value: allTasks.filter(t => t.done).length, color: T.jade },
                    { label: 'Urgent', value: allTasks.filter(t => !t.done && t.priority === 'urgent').length, color: T.red },
                    { label: 'Due This Week', value: allTasks.filter(t => !t.done).length, color: T.amber },
                ].map(({ label, value, color }, i) => (
                    <Card key={i} className="p-4 text-center">
                        <p className="text-2xl font-black" style={{ color, fontFamily: 'Georgia, serif' }}>{value}</p>
                        <p style={{ fontSize: 10, color: T.text3 }}>{label}</p>
                    </Card>
                ))}
            </div>

            {/* Add task */}
            <Card className="p-4">
                <p className="text-[10px] uppercase tracking-widest font-bold mb-3" style={{ color: T.text3 }}>Add Task</p>
                <div className="flex gap-2">
                    <input value={newTask} onChange={e => setNewTask(e.target.value)}
                        placeholder="e.g. Prepare hearing submissions for ELC..."
                        className="flex-1 px-3 py-2 rounded-xl text-[11px] outline-none border transition-colors placeholder:text-white/20"
                        style={{ background: T.bg3, borderColor: T.border, color: 'white' }} />
                    <select className="px-3 py-2 rounded-xl text-[11px] outline-none border" style={{ background: T.bg3, borderColor: T.border, color: T.text2 }}>
                        <option>urgent</option><option>high</option><option>normal</option>
                    </select>
                    <button onClick={() => { if (newTask) { setAllTasks(p => [...p, { id: Date.now(), text: newTask, case: null, client: null, due: 'TBD', priority: 'normal', done: false, assigned: 'lawyer' }]); setNewTask(''); } }}
                        className="px-4 py-2 rounded-xl text-xs font-bold transition-all" style={{ background: T.gold, color: '#0d0f18' }}>
                        + Add
                    </button>
                </div>
            </Card>

            {/* Filter */}
            <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ background: T.bg3 }}>
                {['all', 'urgent', 'high', 'done'].map(f => (
                    <button key={f} onClick={() => setFilter(f)} className="px-3 py-1.5 rounded-lg text-[11px] font-semibold capitalize transition-all"
                        style={{ background: filter === f ? T.gold : 'transparent', color: filter === f ? '#0d0f18' : T.text3 }}>{f}</button>
                ))}
            </div>

            {/* Task list */}
            <div className="space-y-2">
                {filtered.map((task, i) => (
                    <Card key={task.id} className={`flex items-start gap-3 p-4 transition-all ${task.done ? 'opacity-50' : ''}`}
                        style={{ borderColor: task.priority === 'urgent' && !task.done ? T.red + '40' : T.border, background: task.priority === 'urgent' && !task.done ? T.red + '05' : undefined }}>
                        <button onClick={() => toggle(task.id)} className="mt-0.5 flex-shrink-0">
                            {task.done ? <CheckSquare style={{ width: 17, height: 17, color: T.jade }} /> : <Square style={{ width: 17, height: 17, color: T.text3 }} />}
                        </button>
                        <div className="flex-1 min-w-0">
                            <p className={`text-[12px] font-medium ${task.done ? 'line-through' : 'text-white/85'}`}>{task.text}</p>
                            <div className="flex items-center gap-3 mt-1.5">
                                {task.case && <span className="text-[9px] font-mono" style={{ color: T.text4 }}>{task.case}</span>}
                                {task.client && <span style={{ fontSize: 10, color: T.text3 }}>{task.client}</span>}
                                <span style={{ fontSize: 10, color: task.priority === 'urgent' ? T.red : T.amber }} className="font-semibold">Due: {task.due}</span>
                            </div>
                        </div>
                        <PriorityBadge priority={task.priority} />
                        <button className="text-white/10 hover:text-red-400 transition-colors ml-1">
                            <Trash2 style={{ width: 13, height: 13 }} />
                        </button>
                    </Card>
                ))}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   7. CALENDAR VIEW
═══════════════════════════════════════════ */
function CalendarView() {
    const [selectedEvent, setSelectedEvent] = useState(CALENDAR_EVENTS[0]);
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const today = 1;

    const eventsByDay = {};
    CALENDAR_EVENTS.forEach(e => {
        const d = parseInt(e.date.split('-')[2]);
        if (!eventsByDay[d]) eventsByDay[d] = [];
        eventsByDay[d].push(e);
    });

    const typeColor = { hearing: T.indigo, deadline: T.red, meeting: T.jade };
    const typeIcon = { hearing: Gavel, deadline: AlertCircle, meeting: Users };

    return (
        <div className="flex h-full overflow-hidden">
            {/* Calendar grid */}
            <div className="flex-1 p-5 overflow-y-auto">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-white font-bold text-base">May 2026</h2>
                    <div className="flex gap-2">
                        <button className="w-8 h-8 rounded-xl border flex items-center justify-center hover:bg-white/8 transition-colors" style={{ borderColor: T.border }}>
                            <ChevronLeft style={{ width: 14, height: 14, color: T.text3 }} />
                        </button>
                        <button className="w-8 h-8 rounded-xl border flex items-center justify-center hover:bg-white/8 transition-colors" style={{ borderColor: T.border }}>
                            <ChevronRight style={{ width: 14, height: 14, color: T.text3 }} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-1">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                        <div key={d} className="text-center py-2 text-[10px] font-bold uppercase" style={{ color: T.text4 }}>{d}</div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {/* Offset for May 2026 starting on Friday */}
                    {[...Array(4)].map((_, i) => <div key={`empty-${i}`} />)}
                    {days.map(d => {
                        const events = eventsByDay[d] || [];
                        const isToday = d === today;
                        return (
                            <button key={d} onClick={() => events[0] && setSelectedEvent(events[0])}
                                className="rounded-xl p-2 text-left hover:bg-white/4 transition-colors min-h-[70px]"
                                style={{ background: isToday ? T.gold + '15' : events.length > 0 ? T.bg3 : 'transparent', border: `1px solid ${isToday ? T.gold + '40' : events.length > 0 ? T.border : 'transparent'}` }}>
                                <p className="text-[11px] font-bold mb-1" style={{ color: isToday ? T.gold : T.text2 }}>{d}</p>
                                {events.map((ev, ei) => (
                                    <div key={ei} className="px-1.5 py-0.5 rounded text-[9px] font-medium mb-0.5 truncate"
                                        style={{ background: typeColor[ev.type] + '25', color: typeColor[ev.type] }}>
                                        {ev.label}
                                    </div>
                                ))}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Event sidebar */}
            <div className="w-72 border-l flex flex-col" style={{ background: T.bg1, borderColor: T.border }}>
                <div className="p-4 border-b" style={{ borderColor: T.border }}>
                    <h3 className="text-white font-semibold text-sm">Upcoming Events</h3>
                </div>
                <div className="flex-1 overflow-y-auto divide-y" style={{ divideColor: T.border }}>
                    {CALENDAR_EVENTS.map((ev, i) => {
                        const Icon = typeIcon[ev.type];
                        const color = typeColor[ev.type];
                        return (
                            <button key={i} onClick={() => setSelectedEvent(ev)}
                                className={`w-full text-left px-4 py-4 hover:bg-white/3 transition-colors ${selectedEvent?.id === ev.id ? 'border-l-2' : ''}`}
                                style={{ borderLeftColor: selectedEvent?.id === ev.id ? T.gold : T.border }}>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-xl flex items-center justify-center border flex-shrink-0" style={{ background: color + '15', borderColor: color + '25' }}>
                                        <Icon style={{ width: 13, height: 13, color }} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white text-[11px] font-semibold truncate">{ev.label}</p>
                                        <p style={{ fontSize: 10, color: T.text3 }}>{new Date(ev.date).toLocaleDateString('en-KE', { weekday: 'short', month: 'short', day: 'numeric' })} · {ev.time}</p>
                                        {ev.case && <p style={{ fontSize: 9, color: T.text4 }} className="font-mono mt-0.5">{ev.case}</p>}
                                    </div>
                                    {ev.urgent && <span style={{ fontSize: 9, color: T.red, background: T.red + '20' }} className="px-1.5 py-0.5 rounded font-black">!</span>}
                                </div>
                            </button>
                        );
                    })}
                </div>
                <div className="p-4 border-t" style={{ borderColor: T.border }}>
                    <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold border hover:bg-white/8 transition-colors"
                        style={{ borderColor: T.border, color: T.text2 }}>
                        <Plus style={{ width: 13, height: 13 }} /> Add Event
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   8. DOCUMENTS VIEW
═══════════════════════════════════════════ */
const PAYMENTS = [
    { caseId: 'KE-2026-4902', label: 'Land Dispute — Mwangi', total: 85000, paid: 51000, milestones: [{ label: 'Consultation', pct: 20, amount: 17000, paid: true, date: 'Jan 10' }, { label: 'Case Filing', pct: 30, amount: 25500, paid: true, date: 'Jan 14' }, { label: 'Hearing', pct: 30, amount: 25500, paid: false, due: 'May 10', active: true }, { label: 'Judgment', pct: 20, amount: 17000, paid: false, due: 'TBD' }] },
    { caseId: 'KE-2026-3117', label: 'Wrongful Dismissal — Osei', total: 45000, paid: 27000, milestones: [{ label: 'Consultation', pct: 20, amount: 9000, paid: true, date: 'Feb 20' }, { label: 'Case Filing', pct: 30, amount: 13500, paid: true, date: 'Feb 28' }, { label: 'Mediation', pct: 30, amount: 13500, paid: false, due: 'May 19', active: true }, { label: 'Outcome', pct: 20, amount: 9000, paid: false, due: 'TBD' }] },
];

function DocumentsView() {
    const [tab, setTab] = useState('workspace');
    const [generating, setGenerating] = useState(null);
    const [done, setDone] = useState(null);
    const [genModal, setGenModal] = useState(null);

    const gen = (tpl) => {
        setGenModal(null);
        setGenerating(tpl.name);
        setTimeout(() => { setGenerating(null); setDone(tpl.name); setTimeout(() => setDone(null), 5000); }, 2800);
    };

    return (
        <div className="p-5 max-w-6xl mx-auto space-y-4">
            {done && (
                <Card className="flex items-center gap-3 p-3.5" style={{ borderColor: `${T.jade}30`, background: `${T.jade}08` }}>
                    <CheckCircle style={{ width: 15, height: 15, color: T.jade }} />
                    <p style={{ fontSize: 12, color: T.text1 }}>"{done}" generated and ready for review</p>
                    <button className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold" style={{ background: T.jade + '20', color: T.jade, border: `1px solid ${T.jade}30` }}>
                        <Download style={{ width: 12, height: 12 }} /> Download
                    </button>
                </Card>
            )}
            {generating && (
                <Card className="flex items-center gap-3 p-3.5" style={{ borderColor: `${T.gold}30`, background: `${T.gold}06` }}>
                    <Loader style={{ width: 15, height: 15, color: T.gold }} className="animate-spin" />
                    <p style={{ fontSize: 12, color: T.gold }}>Generating "{generating}" using Kenya Law corpus + your case context...</p>
                </Card>
            )}

            <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ background: T.bg3 }}>
                {['workspace', 'templates', 'review queue'].map(t => (
                    <button key={t} onClick={() => setTab(t)} className="px-3 py-1.5 rounded-lg text-[11px] font-semibold capitalize transition-all"
                        style={{ background: tab === t ? T.gold : 'transparent', color: tab === t ? '#0d0f18' : T.text3 }}>{t}</button>
                ))}
            </div>

            {tab === 'workspace' && (
                <div className="space-y-3">
                    {[
                        { name: 'Hearing Bundle — KE-2026-4902', status: 'draft', case: 'KE-2026-4902', modified: '2 hours ago', size: '4.2 MB', type: '📋' },
                        { name: 'Mediation Position Paper — KE-2026-3117', status: 'draft', case: 'KE-2026-3117', modified: 'Yesterday', size: '890 KB', type: '🤝' },
                        { name: 'Written Submissions — Land Act Analysis', status: 'ready', case: 'KE-2026-4902', modified: 'May 2', size: '1.4 MB', type: '⚖️' },
                        { name: 'Settlement Counter-Offer Letter', status: 'sent', case: 'KE-2026-3117', modified: 'Apr 30', size: '120 KB', type: '📨' },
                        { name: 'Summons for Directions — Succession', status: 'pending-review', case: 'KE-2026-0801', modified: 'Apr 28', size: '340 KB', type: '📜' },
                    ].map((doc, i) => {
                        const statusMap = {
                            draft: { label: 'Draft', color: T.amber },
                            ready: { label: 'Ready to File', color: T.jade },
                            sent: { label: 'Sent', color: T.indigo },
                            'pending-review': { label: 'Pending Client Review', color: T.gold },
                        };
                        const s = statusMap[doc.status];
                        return (
                            <Card key={i} className="flex items-center gap-4 px-5 py-4 hover:border-white/14 transition-colors">
                                <span className="text-2xl">{doc.type}</span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-white text-[12px] font-semibold truncate">{doc.name}</p>
                                    <div className="flex items-center gap-3 mt-0.5">
                                        <span style={{ fontSize: 9, color: T.text4 }} className="font-mono">{doc.case}</span>
                                        <span style={{ fontSize: 9, color: T.text4 }}>{doc.modified}</span>
                                        <span style={{ fontSize: 9, color: T.text4 }}>{doc.size}</span>
                                    </div>
                                </div>
                                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold border" style={{ background: s.color + '15', borderColor: s.color + '25', color: s.color }}>{s.label}</span>
                                <div className="flex gap-1">
                                    {['Edit', 'Download', 'Share'].map(a => (
                                        <button key={a} className="px-2.5 py-1 rounded-lg text-[10px] border hover:bg-white/8 transition-colors" style={{ borderColor: T.border, color: T.text2 }}>{a}</button>
                                    ))}
                                </div>
                            </Card>
                        );
                    })}
                </div>
            )}

            {tab === 'templates' && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {DOC_TEMPLATES.map((tpl, i) => (
                        <Card key={i} className="p-5 hover:border-white/15 transition-colors cursor-pointer group" onClick={() => setGenModal(tpl)}>
                            <div className="text-3xl mb-2">{tpl.icon}</div>
                            <div className="px-1.5 py-0.5 rounded text-[9px] font-bold inline-block mb-2" style={{ background: T.indigo + '20', color: T.indigo }}>{tpl.cat}</div>
                            <h3 className="text-white font-bold text-[12px] mb-1">{tpl.name}</h3>
                            <p style={{ fontSize: 10, color: T.text3 }} className="leading-relaxed mb-3">{tpl.desc}</p>
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-1 text-[10px] font-bold" style={{ color: T.gold }}><Zap style={{ width: 10, height: 10 }} />{tpl.credits}cr</span>
                                <span style={{ fontSize: 9, color: T.text4 }} className="flex items-center gap-1"><Clock style={{ width: 9, height: 9 }} />{tpl.time}</span>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {tab === 'review queue' && (
                <div className="space-y-3">
                    {[
                        { name: 'Land Search Certificate (Ardhi House)', client: 'John Mwangi', uploaded: '2 hours ago', action: 'verify', type: 'Official Document' },
                        { name: 'Old letter from deceased father — land reference', client: 'John Mwangi', uploaded: '10:32 AM', action: 'review', type: 'Evidence' },
                        { name: 'Identity card copy', client: 'Fatuma Hassan', uploaded: 'Yesterday', action: 'approve', type: 'KYC Document' },
                    ].map((doc, i) => (
                        <Card key={i} className="flex items-center gap-4 px-5 py-4">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center border" style={{ background: T.gold + '15', borderColor: T.gold + '25' }}>
                                <FileText style={{ width: 16, height: 16, color: T.gold }} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-white text-[12px] font-semibold truncate">{doc.name}</p>
                                <p style={{ fontSize: 10, color: T.text3 }}>{doc.client} · {doc.type} · {doc.uploaded}</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all" style={{ background: T.jade + '20', color: T.jade, border: `1px solid ${T.jade}30` }}>
                                    <Check style={{ width: 13, height: 13, display: 'inline', marginRight: 4 }} />Approve
                                </button>
                                <button className="px-3 py-1.5 rounded-xl text-[11px] font-bold border hover:bg-white/8 transition-colors" style={{ borderColor: T.border, color: T.text2 }}>
                                    Request Edit
                                </button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Gen modal */}
            {genModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <Card className="w-full max-w-lg p-6 shadow-2xl">
                        <div className="flex items-start justify-between mb-5">
                            <div className="flex items-center gap-3">
                                <span className="text-4xl">{genModal.icon}</span>
                                <div>
                                    <h3 className="text-white font-bold text-base">{genModal.name}</h3>
                                    <p style={{ fontSize: 11, color: T.text3 }}>{genModal.desc}</p>
                                </div>
                            </div>
                            <button onClick={() => setGenModal(null)} style={{ color: T.text3 }}><X style={{ width: 17, height: 17 }} /></button>
                        </div>
                        <div className="space-y-3 mb-5">
                            <div>
                                <label className="text-[10px] uppercase tracking-widest font-bold block mb-1.5" style={{ color: T.text3 }}>Link to Case</label>
                                <select className="w-full px-3 py-2.5 rounded-xl text-[11px] outline-none border" style={{ background: T.bg3, borderColor: T.border, color: T.text2 }}>
                                    <option>None</option>
                                    {CASES.map(c => <option key={c.id}>{c.id} — {c.type} ({c.client})</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] uppercase tracking-widest font-bold block mb-1.5" style={{ color: T.text3 }}>AI Instructions</label>
                                <textarea rows={3} placeholder="Additional context, specific clauses, or legal arguments to include..."
                                    className="w-full px-3 py-2.5 rounded-xl text-[11px] outline-none resize-none border placeholder:text-white/20"
                                    style={{ background: T.bg3, borderColor: T.border, color: 'white' }} />
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => setGenModal(null)} className="flex-1 py-2.5 rounded-xl text-xs font-medium border" style={{ borderColor: T.border, color: T.text2 }}>Cancel</button>
                            <button onClick={() => gen(genModal)} className="flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2" style={{ background: T.gold, color: '#0d0f18' }}>
                                <Sparkles style={{ width: 14, height: 14 }} /> Generate with Veritas AI
                            </button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════
   9. VERITAS AI VIEW
═══════════════════════════════════════════ */
function AIView() {
    const [messages, setMessages] = useState(AI_HISTORY);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [showReasoning, setShowReasoning] = useState({});
    const [mode, setMode] = useState('research');
    const bottomRef = useRef(null);

    const modes = [
        { id: 'research', label: 'Legal Research', icon: BookOpen, color: T.indigo },
        { id: 'strategy', label: 'Case Strategy', icon: Target, color: T.jade },
        { id: 'draft', label: 'Document Drafting', icon: PenTool, color: T.gold },
        { id: 'precedents', label: 'Precedents', icon: Scale, color: '#8B5CF6' },
    ];

    const suggestions = {
        research: ['What is the test for adverse possession under Kenya law?', 'Cite Section 49 of the Employment Act 2007 on compensation', 'Grounds for interlocutory injunctions — American Cyanamid test in Kenya'],
        strategy: ['What is the strongest argument for my land case KE-2026-4902?', 'Should I recommend settlement or hearing in the Osei case?', 'What are the risks if the succession matter becomes contested?'],
        draft: ['Draft written submissions for a land dispute emphasising Section 26 LRA', 'Draft a mediation position paper claiming 12 months\' compensation', 'Generate a consent judgment for a commercial debt recovery case'],
        precedents: ['Most recent ELC decisions on fraudulent transfer of title', 'ELRC awards on constructive dismissal — 2022–2025', 'Succession Act cases on competing claims between wives'],
    };

    const simulate = (q) => {
        const resp = {
            research: `Under Kenyan law, adverse possession is governed by **Section 7 and 38 of the Limitation of Actions Act (Cap 22)**. The claimant must demonstrate:\n\n1. **Factual possession** — actual physical control of the land\n2. **Animus possidendi** — intention to possess as owner\n3. **12 continuous years** of uninterrupted occupation to the exclusion of the true owner\n\nKey precedent: *Githu v Ndeete [1984] KLR 776* established that possession must be open, notorious, and adverse. The ELC has applied this rigorously in post-2010 cases. See also *Republic v Chief Land Registrar ex parte Maina [2016]* on rectification of registers.`,
            strategy: `**AI Case Assessment — KE-2026-4902**\n\nYour current position is **strong**. Key strategic recommendations:\n\n1. **Lead with Section 26(1) LRA** — the title is prima facie conclusive evidence of ownership. The opponent must rebut with fraud or mistake — their affidavit fails this threshold.\n\n2. **Interlocutory injunction already secured** — this signals judicial sympathy for your client's position. Maintain it through trial.\n\n3. **Historical search from Ardhi House** is critical. A 30-year clean chain breaks any adverse possession counter-claim.\n\n4. **Settlement risk** — the opponent's weak affidavit suggests they may offer settlement before the hearing. Recommend your client reject anything below KES 800,000 in costs and restoration of title.\n\n**Probability of success: 91%** based on comparable ELC outcomes 2020–2025.`,
            draft: `I have drafted the opening section of your written submissions:\n\n---\n**IN THE ENVIRONMENT AND LAND COURT AT NAIROBI**\n**ELC CASE NO. 4902 OF 2026**\n\n**WRITTEN SUBMISSIONS ON BEHALF OF THE PLAINTIFF**\n\n**INTRODUCTION**\n\n1. The Plaintiff, John Mwangi, is the registered proprietor of LR No. 12847/Ruaka, Nairobi County, as evidenced by a title deed registered in his name on 14th March 2019 under the Land Registration Act, No. 3 of 2012.\n\n2. It is the Plaintiff's case that the Defendant has fraudulently procured a transfer of the suit property without the Plaintiff's knowledge, consent, or participation, in contravention of Sections 26(1)(b) and 80 of the Land Registration Act...\n\n---\n*[Full 8-page submission available — click Generate Full Document]*`,
            precedents: `**Recent ELC Precedents — Fraudulent Transfer of Title (2022–2025)**\n\n1. ***Kagumo v Wachira & Registrar of Titles [2023] eKLR*** — ELC held that fraudulent transfer is void ab initio under Section 26(1)(b) LRA. Title rectification ordered within 30 days.\n\n2. ***Ngugi v Ndung\'u & Others [2024] ELC Nairobi*** — Court emphasised that a registered proprietor\'s title cannot be displaced except on proof of fraud. Interlocutory injunction upheld through trial.\n\n3. ***Otieno v Mugo [2022] KLR (Land)*** — Adverse possession counterclaim rejected where claimant failed to show 12 continuous years. Section 7 LAA strictly applied.`,
        };
        const reasoning = `Mode: ${mode}\n1. Analysing query against Kenya Law corpus...\n2. Cross-referencing: Constitution 2010 · Land Registration Act 2012 · Limitation of Actions Act Cap 22 · Kenya Law Reports...\n3. Retrieving relevant case law precedents (2020–2025)...\n4. Applying facts from linked case files...\n5. Generating practitioner-grade response...`;
        return { text: resp[mode] || resp.research, reasoning };
    };

    const send = (text = input) => {
        if (!text.trim() || loading) return;
        setMessages(m => [...m, { role: 'user', text }]);
        setInput('');
        setLoading(true);
        setTimeout(() => {
            const r = simulate(text);
            setMessages(m => [...m, { role: 'assistant', text: r.text, thinking: r.reasoning }]);
            setLoading(false);
        }, 2000);
    };

    useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);

    return (
        <div className="flex h-full overflow-hidden">
            {/* Left panel */}
            <div className="w-64 border-r flex flex-col shrink-0" style={{ background: T.bg1, borderColor: T.border }}>
                <div className="p-3 border-b" style={{ borderColor: T.border }}>
                    <button onClick={() => setMessages(AI_HISTORY)} className="w-full flex items-center gap-2 py-2 px-3 rounded-xl text-[11px] font-bold border hover:bg-white/8 transition-colors" style={{ borderColor: T.border, color: T.text2 }}>
                        <Plus style={{ width: 12, height: 12 }} /> New Session
                    </button>
                </div>

                {/* Mode selector */}
                <div className="p-3 border-b space-y-1" style={{ borderColor: T.border }}>
                    <p style={{ fontSize: 9, color: T.text4 }} className="uppercase tracking-widest font-bold px-1 mb-2">AI Mode</p>
                    {modes.map(m => (
                        <button key={m.id} onClick={() => setMode(m.id)}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-colors"
                            style={{ background: mode === m.id ? m.color + '18' : 'transparent', border: `1px solid ${mode === m.id ? m.color + '35' : 'transparent'}` }}>
                            <m.icon style={{ width: 13, height: 13, color: mode === m.id ? m.color : T.text3 }} />
                            <span style={{ fontSize: 11, color: mode === m.id ? 'white' : T.text3 }} className="font-medium">{m.label}</span>
                        </button>
                    ))}
                </div>

                {/* Suggestions */}
                <div className="flex-1 overflow-y-auto p-3">
                    <p style={{ fontSize: 9, color: T.text4 }} className="uppercase tracking-widest font-bold px-1 mb-2">Quick Prompts</p>
                    {(suggestions[mode] || []).map((s, i) => (
                        <button key={i} onClick={() => send(s)}
                            className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/4 mb-1 transition-colors border border-transparent hover:border-white/6"
                            style={{ color: T.text3, fontSize: 10 }}>
                            {s}
                        </button>
                    ))}

                    <p style={{ fontSize: 9, color: T.text4 }} className="uppercase tracking-widest font-bold px-1 mb-2 mt-4">My Cases</p>
                    {CASES.map(c => (
                        <button key={c.id} onClick={() => send(`Analyse the legal strategy for my case ${c.id}: ${c.type} — ${c.description?.slice(0, 80)}...`)}
                            className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/4 mb-1 transition-colors border border-transparent hover:border-white/6"
                            style={{ color: T.text3, fontSize: 10 }}>
                            {c.id} · {c.type}
                        </button>
                    ))}
                </div>

                {/* Credits */}
                <div className="p-3 border-t" style={{ borderColor: T.border }}>
                    <div className="flex items-center justify-between px-3 py-2 rounded-xl" style={{ background: T.bg3 }}>
                        <div className="flex items-center gap-1.5">
                            <Zap style={{ width: 12, height: 12, color: T.gold }} />
                            <span style={{ fontSize: 11, color: T.gold }} className="font-bold">{LAWYER.credits} credits</span>
                        </div>
                        <button className="text-[10px] font-semibold hover:underline" style={{ color: T.text3 }}>Top up</button>
                    </div>
                </div>
            </div>

            {/* Chat */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-3 border-b" style={{ borderColor: T.border, background: T.bg2 }}>
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center border" style={{ background: T.gold + '18', borderColor: T.gold + '30' }}>
                            <Sparkles style={{ width: 17, height: 17, color: T.gold }} />
                        </div>
                        <div>
                            <p className="text-white font-bold text-sm">Veritas AI — Lawyer Mode</p>
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: T.jade }} />
                                <p style={{ fontSize: 10, color: T.jade }} className="font-bold">Constitution · All Acts · Kenya Law Reports · 12yr case law</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {modes.find(m => m.id === mode) && (
                            <div className="px-2.5 py-1 rounded-lg text-[10px] font-bold border" style={{ background: modes.find(m2 => m2.id === mode).color + '18', borderColor: modes.find(m2 => m2.id === mode).color + '30', color: modes.find(m2 => m2.id === mode).color }}>
                                {modes.find(m => m.id === mode).label}
                            </div>
                        )}
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg" style={{ background: T.jade + '10', border: `1px solid ${T.jade}20` }}>
                            <Lock style={{ width: 10, height: 10, color: T.jade }} />
                            <span style={{ fontSize: 9, color: T.jade }} className="font-bold">Privileged</span>
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-5">
                    {messages.map((m, i) => (
                        <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className="w-8 h-8 rounded-full flex items-center justify-center border flex-shrink-0"
                                style={{ background: m.role === 'assistant' ? T.gold + '18' : T.indigo + '22', borderColor: m.role === 'assistant' ? T.gold + '35' : T.indigo + '40' }}>
                                {m.role === 'assistant' ? <Sparkles style={{ width: 14, height: 14, color: T.gold }} /> : <span style={{ fontSize: 9, fontWeight: 900, color: T.indigo }}>NK</span>}
                            </div>
                            <div className={`max-w-2xl flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                                {m.thinking && (
                                    <div className="w-full mb-1">
                                        <button onClick={() => setShowReasoning(s => ({ ...s, [i]: !s[i] }))}
                                            className="flex items-center gap-1.5 text-[10px] hover:opacity-70 transition-opacity" style={{ color: T.text4 }}>
                                            <Brain style={{ width: 10, height: 10 }} />
                                            {showReasoning[i] ? 'Hide' : 'Show'} Veritas reasoning chain
                                            <ChevronDown style={{ width: 10, height: 10, transform: showReasoning[i] ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                                        </button>
                                        {showReasoning[i] && (
                                            <div className="mt-1 p-3 rounded-xl border" style={{ background: T.gold + '06', borderColor: T.gold + '18' }}>
                                                <p style={{ fontSize: 9, color: T.text3, fontFamily: 'monospace', whiteSpace: 'pre-line', lineHeight: 1.6 }}>{m.thinking}</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                                <div className="px-5 py-4 rounded-2xl text-[12px] leading-relaxed whitespace-pre-line"
                                    style={{
                                        background: m.role === 'assistant' ? T.bg3 : T.indigo + '18',
                                        border: `1px solid ${m.role === 'assistant' ? T.border : T.indigo + '30'}`,
                                        color: T.text1,
                                        borderRadius: m.role === 'user' ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
                                    }}>
                                    {m.text}
                                </div>
                                {m.role === 'assistant' && (
                                    <div className="flex items-center gap-3 mt-1.5 px-1">
                                        <span style={{ fontSize: 9, color: T.text4 }}>20 credits used</span>
                                        <button className="text-[10px] font-semibold hover:underline" style={{ color: T.gold }}>Export as Note</button>
                                        <button className="text-[10px] font-semibold hover:underline" style={{ color: T.indigo }}>Insert in Document</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center border" style={{ background: T.gold + '18', borderColor: T.gold + '35' }}>
                                <Sparkles style={{ width: 14, height: 14, color: T.gold }} />
                            </div>
                            <div className="px-5 py-4 rounded-2xl border" style={{ background: T.bg3, borderColor: T.border }}>
                                <div className="flex items-center gap-2">
                                    <Loader style={{ width: 14, height: 14, color: T.gold }} className="animate-spin" />
                                    <span style={{ fontSize: 11, color: T.text3 }}>Veritas is researching Kenya law corpus...</span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={bottomRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t" style={{ borderColor: T.border }}>
                    <div className="flex items-end gap-2 p-3 rounded-2xl border" style={{ background: T.bg3, borderColor: T.border }}>
                        <textarea value={input} onChange={e => setInput(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
                            placeholder={`Ask Veritas anything in ${modes.find(m => m.id === mode)?.label} mode...`}
                            rows={2} className="flex-1 bg-transparent text-white/80 text-[12px] outline-none resize-none placeholder:text-white/20" />
                        <div className="flex flex-col gap-1.5">
                            <button className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-white/8 transition-colors">
                                <Mic style={{ width: 14, height: 14, color: T.text3 }} />
                            </button>
                            <button onClick={() => send()}
                                className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
                                style={{ background: input ? T.gold : T.bg4 }}>
                                <Send style={{ width: 14, height: 14, color: input ? '#0d0f18' : T.text4 }} />
                            </button>
                        </div>
                    </div>
                    <p style={{ fontSize: 9, color: T.text4 }} className="text-center mt-1.5">Veritas AI responses are research tools. Apply your professional judgment before relying on any output in court.</p>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   10. EARNINGS VIEW
═══════════════════════════════════════════ */
function EarningsView() {
    return (
        <div className="p-5 max-w-6xl mx-auto space-y-5">
            {/* Top KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'This Month', value: `KES ${(EARNINGS.thisMonth / 1000).toFixed(1)}K`, sub: `+${Math.round((EARNINGS.thisMonth - EARNINGS.lastMonth) / EARNINGS.lastMonth * 100)}% vs last month`, icon: TrendingUp, color: T.jade },
                    { label: 'Year to Date', value: `KES ${(EARNINGS.ytd / 1000).toFixed(0)}K`, sub: 'Jan–May 2026', icon: BarChart, color: T.gold },
                    { label: 'Outstanding', value: `KES ${(EARNINGS.pending / 1000).toFixed(1)}K`, sub: 'In escrow or due', icon: Clock, color: T.amber },
                    { label: 'In Escrow', value: `KES ${(EARNINGS.inEscrow / 1000).toFixed(1)}K`, sub: 'Protected · Awaiting milestones', icon: Shield, color: T.indigo },
                ].map(({ label, value, sub, icon: Icon, color }, i) => (
                    <Card key={i} className="p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <Icon style={{ width: 15, height: 15, color }} />
                            <p style={{ fontSize: 10, color: T.text3 }}>{label}</p>
                        </div>
                        <p className="text-2xl font-black text-white" style={{ fontFamily: 'Georgia, serif' }}>{value}</p>
                        <p style={{ fontSize: 10, color }} className="mt-0.5 font-medium">{sub}</p>
                    </Card>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-5">
                {/* Revenue sparkline */}
                <div className="lg:col-span-2">
                    <Card className="p-5">
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <h3 className="text-white font-semibold text-sm">Monthly Revenue</h3>
                                <p style={{ fontSize: 11, color: T.text3 }}>January – May 2026</p>
                            </div>
                            <MiniSparkline data={EARNINGS.monthly} color={T.gold} height={50} />
                        </div>
                        <div className="flex items-end gap-3">
                            {EARNINGS.monthly.map((v, i) => {
                                const max = Math.max(...EARNINGS.monthly);
                                const pct = (v / max) * 100;
                                const isLast = i === EARNINGS.monthly.length - 1;
                                return (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                                        <p style={{ fontSize: 9, color: isLast ? T.gold : T.text4 }} className="font-bold">
                                            {(v / 1000).toFixed(0)}K
                                        </p>
                                        <div className="w-full rounded-t-lg" style={{ height: 80, background: T.bg3, position: 'relative', overflow: 'hidden' }}>
                                            <div className="w-full rounded-t-lg absolute bottom-0 transition-all duration-700"
                                                style={{ height: `${pct}%`, background: isLast ? T.gold : T.gold + '40' }} />
                                        </div>
                                        <p style={{ fontSize: 9, color: isLast ? T.gold : T.text3 }}>{EARNINGS.months[i]}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>
                </div>

                {/* Revenue by category */}
                <Card className="p-5">
                    <h3 className="text-white font-semibold text-sm mb-4">By Practice Area</h3>
                    <div className="space-y-3">
                        {PERFORMANCE.categories.map(({ label, count, wins }, i) => {
                            const colors = [T.gold, T.indigo, T.jade, T.amber];
                            return (
                                <div key={i}>
                                    <div className="flex items-center justify-between mb-1">
                                        <p style={{ fontSize: 11, color: T.text2 }}>{label}</p>
                                        <p style={{ fontSize: 10, color: colors[i] }} className="font-bold">{count} cases · {Math.round(wins / count * 100)}% wins</p>
                                    </div>
                                    <ProgressBar pct={count / PERFORMANCE.casesClosed * 100} color={colors[i]} />
                                </div>
                            );
                        })}
                    </div>
                </Card>
            </div>

            {/* Case breakdown */}
            <Card className="overflow-hidden">
                <div className="px-5 py-3.5 border-b" style={{ borderColor: T.border }}>
                    <h3 className="text-white font-semibold text-sm">Earnings by Case</h3>
                </div>
                <div className="divide-y" style={{ divideColor: T.border }}>
                    {EARNINGS.byCase.map((ec, i) => {
                        const pct = Math.round(ec.paid / ec.fee * 100);
                        return (
                            <div key={i} className="flex items-center gap-5 px-5 py-4 hover:bg-white/2 transition-colors">
                                <div className="w-8 h-8 rounded-xl flex items-center justify-center border flex-shrink-0" style={{ background: T.gold + '15', borderColor: T.gold + '25' }}>
                                    <Gavel style={{ width: 14, height: 14, color: T.gold }} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-white text-[11px] font-semibold">{ec.label}</p>
                                    <p style={{ fontSize: 9, color: T.text4 }} className="font-mono">{ec.id}</p>
                                    <ProgressBar pct={pct} height="h-1 mt-1.5" color={T.gold} />
                                </div>
                                <div className="text-right">
                                    <p className="text-white text-sm font-black" style={{ fontFamily: 'Georgia, serif' }}>KES {(ec.paid / 1000).toFixed(1)}K</p>
                                    <p style={{ fontSize: 10, color: T.text3 }}>of KES {(ec.fee / 1000).toFixed(0)}K · {pct}%</p>
                                </div>
                                <div className="text-right">
                                    <p style={{ fontSize: 11, color: T.amber }} className="font-bold">KES {(ec.pending / 1000).toFixed(1)}K</p>
                                    <p style={{ fontSize: 9, color: T.text4 }}>outstanding</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Card>

            {/* Transactions */}
            <Card className="overflow-hidden">
                <div className="px-5 py-3.5 border-b flex items-center justify-between" style={{ borderColor: T.border }}>
                    <h3 className="text-white font-semibold text-sm">Transactions</h3>
                    <button className="flex items-center gap-1.5 text-[11px] font-semibold hover:underline" style={{ color: T.gold }}>
                        <Download style={{ width: 12, height: 12 }} /> Export
                    </button>
                </div>
                <div className="divide-y" style={{ divideColor: T.border }}>
                    {EARNINGS.transactions.map((tx, i) => (
                        <div key={i} className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/2 transition-colors">
                            <div className="w-7 h-7 rounded-xl flex items-center justify-center border flex-shrink-0"
                                style={{ background: tx.type === 'in' ? T.jade + '15' : T.red + '15', borderColor: tx.type === 'in' ? T.jade + '25' : T.red + '25' }}>
                                {tx.type === 'in' ? <ArrowDownRight style={{ width: 13, height: 13, color: T.jade }} /> : <ArrowUpRight style={{ width: 13, height: 13, color: T.red }} />}
                            </div>
                            <div className="flex-1">
                                <p style={{ fontSize: 11, color: T.text1 }} className="font-medium">{tx.desc}</p>
                                <p style={{ fontSize: 9, color: T.text4 }} className="font-mono">{tx.ref} · {tx.date}</p>
                            </div>
                            <p className="font-bold text-sm" style={{ color: tx.type === 'in' ? T.jade : T.red, fontFamily: 'Georgia, serif' }}>
                                {tx.type === 'in' ? '+' : ''}KES {Math.abs(tx.amount).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}

/* ═══════════════════════════════════════════
   11. PERFORMANCE VIEW
═══════════════════════════════════════════ */
function PerformanceView() {
    return (
        <div className="p-5 max-w-5xl mx-auto space-y-5">
            {/* Main metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Overall Win Rate', value: `${PERFORMANCE.winRate}%`, icon: Award, color: T.jade, sub: `${PERFORMANCE.casesClosed} concluded cases` },
                    { label: 'Client Rating', value: `${PERFORMANCE.clientRating} / 5`, icon: Star, color: T.gold, sub: `${PERFORMANCE.reviews} verified reviews` },
                    { label: 'Avg. Response Time', value: `${PERFORMANCE.responseTime} min`, icon: Clock, color: T.indigo, sub: 'Within business hours' },
                    { label: 'On-Time Filings', value: `${PERFORMANCE.onTimeFilings}%`, icon: CheckCircle, color: T.jade, sub: 'Court deadlines met' },
                ].map(({ label, value, icon: Icon, color, sub }, i) => (
                    <Card key={i} className="p-5 text-center">
                        <div className="relative inline-flex mb-3">
                            <ProgressRing pct={parseFloat(value)} size={70} stroke={5} color={color} />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Icon style={{ width: 22, height: 22, color }} />
                            </div>
                        </div>
                        <p className="text-2xl font-black text-white" style={{ fontFamily: 'Georgia, serif' }}>{value}</p>
                        <p style={{ fontSize: 11, color: T.text3 }}>{label}</p>
                        <p style={{ fontSize: 9, color: T.text4 }} className="mt-1">{sub}</p>
                    </Card>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-5">
                {/* Win rate by category */}
                <Card className="p-5">
                    <h3 className="text-white font-semibold text-sm mb-4">Win Rate by Practice Area</h3>
                    <div className="space-y-4">
                        {PERFORMANCE.categories.map(({ label, count, wins }, i) => {
                            const rate = Math.round(wins / count * 100);
                            const colors = [T.jade, T.gold, T.indigo, T.amber];
                            return (
                                <div key={i}>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <p style={{ fontSize: 12, color: T.text1 }}>{label}</p>
                                        <div className="flex items-center gap-2">
                                            <p style={{ fontSize: 10, color: T.text3 }}>{wins}/{count} wins</p>
                                            <p style={{ fontSize: 12, color: colors[i] }} className="font-black">{rate}%</p>
                                        </div>
                                    </div>
                                    <ProgressBar pct={rate} color={colors[i]} height="h-2.5" />
                                </div>
                            );
                        })}
                    </div>
                </Card>

                {/* Client satisfaction */}
                <Card className="p-5">
                    <h3 className="text-white font-semibold text-sm mb-4">Client Satisfaction</h3>
                    <div className="space-y-3">
                        {[
                            { label: 'Communication', score: 98 },
                            { label: 'Legal Expertise', score: 95 },
                            { label: 'Value for Money', score: 91 },
                            { label: 'Response Time', score: 97 },
                            { label: 'Overall Experience', score: 96 },
                        ].map(({ label, score }, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <p style={{ fontSize: 11, color: T.text2, width: 140, flexShrink: 0 }}>{label}</p>
                                <ProgressBar pct={score} color={T.gold} height="h-2 flex-1" />
                                <p style={{ fontSize: 11, color: T.gold, width: 36, textAlign: 'right', flexShrink: 0 }} className="font-bold">{score}%</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-5 pt-4 border-t" style={{ borderColor: T.border }}>
                        <div className="flex items-center justify-between">
                            <p style={{ fontSize: 11, color: T.text3 }}>Repeat Clients</p>
                            <p style={{ fontSize: 16, color: T.gold }} className="font-black">{PERFORMANCE.repeatClients}%</p>
                        </div>
                        <ProgressBar pct={PERFORMANCE.repeatClients} color={T.gold} height="h-2 mt-1.5" />
                    </div>
                </Card>
            </div>

            {/* Recent reviews */}
            <Card className="overflow-hidden">
                <div className="px-5 py-3.5 border-b" style={{ borderColor: T.border }}>
                    <h3 className="text-white font-semibold text-sm">Recent Client Reviews</h3>
                </div>
                <div className="divide-y" style={{ divideColor: T.border }}>
                    {[
                        { client: 'Peter Kamau', initials: 'PK', color: T.red, rating: 5, text: 'Njeri is exceptional. She resolved my land case in half the time I expected. Her knowledge of the ELC procedure is outstanding.', case: 'Land Dispute', date: 'Mar 15' },
                        { client: 'Amara Osei', initials: 'AO', color: T.jade, rating: 5, text: 'Very professional and responsive. She explained every step clearly and made me feel confident throughout the process.', case: 'Employment', date: 'May 2' },
                        { client: 'Anonymous', initials: '??', color: T.text4, rating: 4, text: 'Great advocate. Would have preferred more frequent updates on the case status but overall very satisfied with the outcome.', case: 'Commercial', date: 'Feb 8' },
                    ].map((rev, i) => (
                        <div key={i} className="flex items-start gap-4 px-5 py-4">
                            <Avatar initials={rev.initials} color={rev.color} size="sm" />
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <p className="text-white text-[11px] font-semibold">{rev.client}</p>
                                    <div className="flex items-center gap-1.5">
                                        <div className="flex">
                                            {[...Array(rev.rating)].map((_, j) => <Star key={j} style={{ width: 10, height: 10, color: T.gold, fill: T.gold }} />)}
                                        </div>
                                        <span style={{ fontSize: 9, color: T.text4 }}>{rev.date}</span>
                                    </div>
                                </div>
                                <p style={{ fontSize: 10, color: T.text4 }} className="font-mono mb-1">Case type: {rev.case}</p>
                                <p style={{ fontSize: 11, color: T.text2 }} className="leading-relaxed">"{rev.text}"</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}

/* ═══════════════════════════════════════════
   ROOT DASHBOARD
═══════════════════════════════════════════ */
const VIEW_META = {
    overview: { title: 'Good morning, Njeri', subtitle: `${new Date().toLocaleDateString('en-KE', { weekday: 'long', day: 'numeric', month: 'long' })} · ${CASES.filter(c => c.status === 'active').length} active cases · ${TASKS.filter(t => !t.done && t.priority === 'urgent').length} urgent tasks` },
    cases: { title: 'Case Management', subtitle: 'All client matters — search, filter, and take action' },
    clients: { title: 'Client Directory', subtitle: 'Manage client relationships and case history' },
    marketplace: { title: 'Case Marketplace', subtitle: 'AI-matched incoming case requests' },
    messages: { title: 'Secure Messaging', subtitle: 'Encrypted client communication — attorney-client privileged' },
    tasks: { title: 'Tasks & Deadlines', subtitle: 'Your workload and client task assignments' },
    calendar: { title: 'Schedule', subtitle: 'Court dates, hearings, meetings, and deadlines' },
    documents: { title: 'Document Workspace', subtitle: 'Draft, review, approve, and manage legal documents' },
    ai: { title: 'Veritas AI', subtitle: 'AI legal research, strategy, drafting, and precedents — Kenyan law only' },
    payments: { title: 'Earnings & Payments', subtitle: 'Revenue tracking, escrow status, and transaction history' },
    performance: { title: 'Performance Analytics', subtitle: 'Win rates, client satisfaction, and practice insights' },
};

export default function LawyerDashboard({ auth }) {
    const [active, setActive] = useState('overview');
    const [collapsed, setCollapsed] = useState(false);
    const meta = VIEW_META[active];

    const fullHeight = ['cases', 'clients', 'messages', 'ai', 'calendar', 'marketplace'].includes(active);

    const renderView = () => {
        switch (active) {
            case 'overview': return <OverviewView setActive={setActive} />;
            case 'cases': return <CasesView />;
            case 'clients': return <ClientsView />;
            case 'marketplace': return <MarketplaceView />;
            case 'messages': return <MessagesView />;
            case 'tasks': return <TasksView />;
            case 'calendar': return <CalendarView />;
            case 'documents': return <DocumentsView />;
            case 'ai': return <AIView />;
            case 'payments': return <EarningsView />;
            case 'performance': return <PerformanceView />;
            default: return <OverviewView setActive={setActive} />;
        }
    };

    return (
        <>
            <Head title="Veritex Lawyer Dashboard — Njeri Kamau" />
            <div className="flex h-screen overflow-hidden" style={{ background: T.bg0, color: 'white', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
                <Sidebar active={active} setActive={setActive} collapsed={collapsed} setCollapsed={setCollapsed} />
                <div className="flex-1 flex flex-col overflow-hidden">
                    <TopBar title={meta.title} subtitle={meta.subtitle} />
                    <main className={`flex-1 ${fullHeight ? 'overflow-hidden' : 'overflow-y-auto'}`}
                        style={{ background: T.bg1 }}>
                        {renderView()}
                    </main>
                </div>
            </div>
        </>
    );
}