import { useState, useEffect, useRef } from 'react';

/* ═══════════════════════════════════════════════════════
   DESIGN TOKENS — Command-centre aesthetic
   Deep navy blacks · Crimson alerts · Cool steel accents
═══════════════════════════════════════════════════════ */
const C = {
    bg0: '#06070d',
    bg1: '#090c14',
    bg2: '#0d1020',
    bg3: '#131728',
    bg4: '#1a1f35',
    bg5: '#20263e',

    red: '#EF4444',
    redD: '#DC2626',
    amber: '#F59E0B',
    jade: '#10B981',
    blue: '#3B82F6',
    indigo: '#6366F1',
    violet: '#8B5CF6',
    gold: '#D4AF37',

    b0: 'rgba(255,255,255,0.05)',
    b1: 'rgba(255,255,255,0.09)',
    b2: 'rgba(255,255,255,0.15)',

    t1: 'rgba(255,255,255,0.92)',
    t2: 'rgba(255,255,255,0.60)',
    t3: 'rgba(255,255,255,0.35)',
    t4: 'rgba(255,255,255,0.18)',
    t5: 'rgba(255,255,255,0.09)',
};

/* ═══════════════════════════════════════════
   MOCK DATA
═══════════════════════════════════════════ */
const ADMIN = { name: 'Wanjiku Kariuki', role: 'Super Admin', initials: 'WK', avatar: '#8B5CF6' };

const PLATFORM_STATS = {
    totalUsers: 14892, usersGrowth: 12.4,
    activeCases: 3241, casesGrowth: 8.1,
    activeLawyers: 312, lawyersGrowth: 4.2,
    documentsGenerated: 28940, docsGrowth: 19.3,
    vaultSizeMB: 84200, vaultCap: 500000,
    revenueMonth: 2840000, revGrowth: 34.7,
    escrowBalance: 18420000,
    pendingPayments: 4230000,
    aiQueriesDay: 3847,
    flaggedItems: 23,
};

const ALERTS = [
    { id: 1, level: 'critical', title: 'Suspected Multi-Account Fraud', detail: 'User ID USR-8821 has 3 accounts with same KYC documents. IP: 41.90.XX.XX', time: '4 min ago', category: 'fraud', resolved: false },
    { id: 2, level: 'critical', title: 'Lawyer Credential Forgery Attempt', detail: 'LSK number LSK/2023/FAKE submitted by ADV-1192. Bar Association query returned no match.', time: '38 min ago', category: 'compliance', resolved: false },
    { id: 3, level: 'high', title: 'Escrow Release Dispute', detail: 'Client CLT-4490 disputes milestone completion in case KE-2026-5511. KES 34,000 frozen.', time: '1h 12min ago', category: 'payment', resolved: false },
    { id: 4, level: 'high', title: 'AI Hallucination Detected', detail: 'AI cited non-existent statute "Employment (Amendment) Act 2025 s.14" in 3 responses. Flagged by QA.', time: '2h ago', category: 'ai', resolved: false },
    { id: 5, level: 'medium', title: 'Failed Payment — Gateway Timeout', detail: '14 M-Pesa transactions failed between 09:00–09:15 AM. Safaricom API latency spike.', time: '3h ago', category: 'payment', resolved: true },
    { id: 6, level: 'medium', title: 'Abuse Report — Offensive Messaging', detail: 'Client CLT-0928 reported lawyer ADV-0441 for unprofessional language. Screenshot attached.', time: '5h ago', category: 'moderation', resolved: false },
    { id: 7, level: 'low', title: 'Storage Threshold Warning', detail: 'Vault storage at 16.8% capacity. Archival policy may need review at 25%.', time: '1 day ago', category: 'system', resolved: false },
];

const USERS = [
    { id: 'USR-001', name: 'John Mwangi', email: 'j.mwangi@gmail.com', phone: '+254 712 345 678', joined: '2026-01-10', kyc: 'verified', status: 'active', cases: 2, risk: 'low', county: 'Nairobi' },
    { id: 'USR-002', name: 'Amara Osei', email: 'a.osei@yahoo.com', phone: '+254 723 456 789', joined: '2026-02-18', kyc: 'verified', status: 'active', cases: 1, risk: 'low', county: 'Mombasa' },
    { id: 'USR-003', name: 'Fatuma Hassan', email: 'f.hassan@email.com', phone: '+254 734 567 890', joined: '2026-04-02', kyc: 'pending', status: 'active', cases: 1, risk: 'low', county: 'Kilifi' },
    { id: 'USR-004', name: 'Denis Otieno', email: 'd.otieno@gmail.com', phone: '+254 701 234 567', joined: '2025-11-28', kyc: 'verified', status: 'active', cases: 3, risk: 'medium', county: 'Kisumu' },
    { id: 'USR-005', name: 'Samuel Njoroge', email: 's.njoroge@outlook.com', phone: '+254 720 111 222', joined: '2026-04-22', kyc: 'failed', status: 'suspended', cases: 0, risk: 'high', county: 'Nairobi' },
    { id: 'USR-006', name: 'Mary Njoki', email: 'm.njoki@gmail.com', phone: '+254 798 333 444', joined: '2025-09-14', kyc: 'verified', status: 'active', cases: 4, risk: 'low', county: 'Kiambu' },
    { id: 'USR-007', name: '[FLAGGED] USR-8821', email: 'flagged@temp.com', phone: '+254 700 000 000', joined: '2026-05-01', kyc: 'failed', status: 'banned', cases: 0, risk: 'critical', county: 'Unknown' },
];

const LAWYERS = [
    { id: 'ADV-001', name: 'Njeri Kamau', email: 'n.kamau@law.co.ke', lsk: 'LSK/2014/4892', specialization: 'Land & Employment', rating: 4.9, activeCases: 3, totalCases: 214, status: 'active', verified: 'approved', earnings: 487000, responseTime: 4.2, winRate: 89, joined: '2024-06-12', county: 'Nairobi' },
    { id: 'ADV-002', name: 'Amina Mwangi', email: 'a.mwangi@advocates.co.ke', lsk: 'LSK/2016/6210', specialization: 'Family & Matrimonial', rating: 4.8, activeCases: 5, totalCases: 178, status: 'active', verified: 'approved', earnings: 324000, responseTime: 5.8, winRate: 84, joined: '2024-08-01', county: 'Nairobi' },
    { id: 'ADV-003', name: 'James Odhiambo', email: 'j.odhiambo@legal.co.ke', lsk: 'LSK/2009/1204', specialization: 'Land & Commercial', rating: 4.9, activeCases: 2, totalCases: 312, status: 'active', verified: 'approved', earnings: 891000, responseTime: 3.1, winRate: 92, joined: '2024-05-20', county: 'Kisumu' },
    { id: 'ADV-004', name: 'Grace Wachira', email: 'g.wachira@barlaw.co.ke', lsk: 'LSK/2019/9340', specialization: 'Criminal Defence', rating: 4.6, activeCases: 7, totalCases: 89, status: 'active', verified: 'pending', earnings: 214000, responseTime: 7.2, winRate: 76, joined: '2025-01-14', county: 'Nairobi' },
    { id: 'ADV-005', name: 'Patrick Mutua', email: 'p.mutua@lawfirm.ke', lsk: 'LSK/2021/11420', specialization: 'Employment', rating: 4.2, activeCases: 4, totalCases: 52, status: 'active', verified: 'pending', earnings: 98000, responseTime: 12.4, winRate: 71, joined: '2025-03-22', county: 'Machakos' },
    { id: 'ADV-006', name: '[FLAGGED] ADV-1192', email: 'fake@nowhere.com', lsk: 'LSK/2023/FAKE', specialization: 'Unknown', rating: 0, activeCases: 0, totalCases: 0, status: 'suspended', verified: 'rejected', earnings: 0, responseTime: 0, winRate: 0, joined: '2026-05-01', county: 'Unknown' },
];

const CASES_ALL = [
    { id: 'KE-2026-4902', client: 'John Mwangi', clientId: 'USR-001', lawyer: 'Njeri Kamau', lawyerId: 'ADV-001', type: 'Land Dispute', status: 'active', priority: 'high', stage: 'Full Hearing', filed: '2026-01-14', nextHearing: '2026-05-12', fee: 85000, paid: 51000, county: 'Nairobi', flagged: false },
    { id: 'KE-2026-3117', client: 'Amara Osei', clientId: 'USR-002', lawyer: 'Amina Mwangi', lawyerId: 'ADV-002', type: 'Wrongful Dismissal', status: 'active', priority: 'medium', stage: 'Mediation', filed: '2026-02-28', nextHearing: '2026-05-19', fee: 45000, paid: 27000, county: 'Mombasa', flagged: false },
    { id: 'KE-2026-0801', client: 'Fatuma Hassan', clientId: 'USR-003', lawyer: 'Njeri Kamau', lawyerId: 'ADV-001', type: 'Succession', status: 'active', priority: 'normal', stage: 'Petition Filed', filed: '2026-04-02', nextHearing: '2026-06-14', fee: 38000, paid: 7600, county: 'Kilifi', flagged: false },
    { id: 'KE-2026-5511', client: 'Denis Otieno', clientId: 'USR-004', lawyer: 'Grace Wachira', lawyerId: 'ADV-004', type: 'Criminal Defence', status: 'disputed', priority: 'urgent', stage: 'Payment Dispute', filed: '2026-03-10', nextHearing: '2026-05-20', fee: 120000, paid: 86000, county: 'Kisumu', flagged: true },
    { id: 'KE-2025-8814', client: 'Mary Njoki', clientId: 'USR-006', lawyer: 'James Odhiambo', lawyerId: 'ADV-003', type: 'Land Dispute', status: 'concluded', priority: 'low', stage: 'Judgment Enforced', filed: '2025-09-02', nextHearing: null, fee: 95000, paid: 95000, county: 'Kiambu', flagged: false },
    { id: 'KE-2025-7201', client: 'Mary Njoki', clientId: 'USR-006', lawyer: 'James Odhiambo', lawyerId: 'ADV-003', type: 'Debt Recovery', status: 'concluded', priority: 'low', stage: 'Decree Extracted', filed: '2025-06-15', nextHearing: null, fee: 55000, paid: 55000, county: 'Kiambu', flagged: false },
];

const DOCUMENTS_ALL = [
    { id: 'DOC-001', name: 'Replying Affidavit — ELC', type: 'Court Pleading', owner: 'Njeri Kamau', caseId: 'KE-2026-4902', created: '2026-03-18', status: 'filed', size: '118 KB', aiGenerated: true, flagged: false },
    { id: 'DOC-002', name: 'Employment Contract Analysis', type: 'AI Analysis', owner: 'Amina Mwangi', caseId: 'KE-2026-3117', created: '2026-02-20', status: 'ready', size: '24 KB', aiGenerated: true, flagged: false },
    { id: 'DOC-003', name: 'Demand Letter — Kimani Properties', type: 'Demand Letter', owner: 'John Mwangi', caseId: 'KE-2026-4902', created: '2026-01-10', status: 'signed', size: '42 KB', aiGenerated: true, flagged: false },
    { id: 'DOC-004', name: '[FLAGGED] Forged Title Deed', type: 'Uploaded Evidence', owner: 'USR-8821', caseId: null, created: '2026-05-01', status: 'flagged', size: '2.8 MB', aiGenerated: false, flagged: true },
    { id: 'DOC-005', name: 'Petition for Grant — Succession', type: 'Court Pleading', owner: 'Njeri Kamau', caseId: 'KE-2026-0801', created: '2026-04-02', status: 'filed', size: '86 KB', aiGenerated: true, flagged: false },
];

const VAULT_META = [
    { id: 'VLT-001', fileType: 'PDF', sizeMB: 2.1, caseId: 'KE-2026-4902', uploadedBy: 'USR-001', date: '2026-01-15', accessLog: 2, flagged: false, encrypted: true },
    { id: 'VLT-002', fileType: 'JPG', sizeMB: 3.4, caseId: 'KE-2026-4902', uploadedBy: 'USR-001', date: '2026-01-15', accessLog: 1, flagged: false, encrypted: true },
    { id: 'VLT-003', fileType: 'MP4', sizeMB: 48.2, caseId: 'KE-2026-4902', uploadedBy: 'USR-001', date: '2026-03-03', accessLog: 3, flagged: false, encrypted: true },
    { id: 'VLT-004', fileType: 'PDF', sizeMB: 1.8, caseId: 'KE-2026-3117', uploadedBy: 'USR-002', date: '2026-02-21', accessLog: 2, flagged: false, encrypted: true },
    { id: 'VLT-005', fileType: 'PDF', sizeMB: 2.8, caseId: null, uploadedBy: 'USR-8821', date: '2026-05-01', accessLog: 0, flagged: true, encrypted: false },
];

const MESSAGE_LOGS = [
    { id: 'MSG-001', parties: 'USR-001 ↔ ADV-001', caseId: 'KE-2026-4902', messageCount: 34, lastActivity: '10:32 AM', flagged: false, encrypted: true, reason: null },
    { id: 'MSG-002', parties: 'USR-002 ↔ ADV-002', caseId: 'KE-2026-3117', messageCount: 18, lastActivity: 'Yesterday', flagged: false, encrypted: true, reason: null },
    { id: 'MSG-003', parties: 'USR-004 ↔ ADV-004', caseId: 'KE-2026-5511', messageCount: 7, lastActivity: '2h ago', flagged: true, encrypted: true, reason: 'Abuse report — offensive language from ADV-004' },
    { id: 'MSG-004', parties: 'USR-8821 ↔ ADV-001', caseId: null, messageCount: 2, lastActivity: 'May 1', flagged: true, encrypted: false, reason: 'Suspected fraud — attempting to conduct transaction outside platform' },
];

const TRANSACTIONS = [
    { id: 'TXN-001', desc: 'Case Filing — KE-2026-4902', from: 'USR-001', to: 'ADV-001', amount: 25500, platform: 2550, net: 22950, date: 'Jan 14', status: 'completed', type: 'milestone', escrow: false },
    { id: 'TXN-002', desc: 'Consultation — KE-2026-4902', from: 'USR-001', to: 'ADV-001', amount: 17000, platform: 1700, net: 15300, date: 'Jan 10', status: 'completed', type: 'milestone', escrow: false },
    { id: 'TXN-003', desc: 'Hearing Milestone — KE-2026-4902', from: 'USR-001', to: 'ADV-001', amount: 25500, platform: 2550, net: 22950, date: 'Pending', status: 'escrow', type: 'milestone', escrow: true },
    { id: 'TXN-004', desc: 'Escrow Dispute Hold — KE-2026-5511', from: 'USR-004', to: 'ADV-004', amount: 34000, platform: 0, net: 0, date: 'May 1', status: 'disputed', type: 'dispute', escrow: true },
    { id: 'TXN-005', desc: 'Succession Petition — KE-2026-0801', from: 'USR-003', to: 'ADV-001', amount: 7600, platform: 760, net: 6840, date: 'Apr 2', status: 'completed', type: 'milestone', escrow: false },
    { id: 'TXN-006', desc: 'M-Pesa Gateway Failure (14 transactions)', from: 'Multiple', to: 'Escrow', amount: 0, platform: 0, net: 0, date: 'May 1 09:00', status: 'failed', type: 'system', escrow: false },
];

const AI_STATS = {
    queriesToday: 3847, queriesWeek: 24190, queriesMonth: 89420,
    avgResponseMs: 340, avgCreditsUsed: 12.4,
    topTopics: [
        { topic: 'Land & Property Rights', count: 892, pct: 23 },
        { topic: 'Employment Law', count: 778, pct: 20 },
        { topic: 'Succession & Probate', count: 543, pct: 14 },
        { topic: 'Criminal Procedure', count: 412, pct: 11 },
        { topic: 'Family Law', count: 389, pct: 10 },
        { topic: 'Commercial / Contracts', count: 310, pct: 8 },
        { topic: 'Other', count: 523, pct: 14 },
    ],
    qualityFlags: [
        { id: 'QF-001', severity: 'critical', issue: 'Cited non-existent statute', detail: '"Employment (Amendment) Act 2025 s.14" does not exist. AI hallucinated citation in 3 responses.', count: 3, date: '2h ago', resolved: false },
        { id: 'QF-002', severity: 'high', issue: 'Incorrect court jurisdiction', detail: 'AI directed user to Magistrates\' Court for a case requiring Environment & Land Court jurisdiction.', count: 1, date: '1 day ago', resolved: false },
        { id: 'QF-003', severity: 'medium', issue: 'Outdated case law cited', detail: 'AI cited case law overruled in 2024. Requires corpus refresh.', count: 7, date: '3 days ago', resolved: true },
        { id: 'QF-004', severity: 'low', issue: 'Response exceeded credit threshold', detail: 'Several responses consumed 40+ credits against 30cr limit. Token limits need calibration.', count: 12, date: '5 days ago', resolved: false },
    ],
    rules: [
        { id: 'R001', label: 'Max response tokens', value: '1,024', editable: true },
        { id: 'R002', label: 'Jurisdiction lock', value: 'Kenya (KE)', editable: true },
        { id: 'R003', label: 'Credit cap per query', value: '30 credits', editable: true },
        { id: 'R004', label: 'Hallucination guard', value: 'Enabled', editable: true },
        { id: 'R005', label: 'Escalate to lawyer threshold', value: '< 70% confidence', editable: true },
        { id: 'R006', label: 'Emergency override', value: 'Always bypass limits', editable: false },
    ],
};

const AUDIT_LOG = [
    { id: 1, action: 'User account suspended', actor: 'Admin WK', target: 'USR-8821', time: '12:10 PM', category: 'user', severity: 'high' },
    { id: 2, action: 'Lawyer credential rejected', actor: 'Admin WK', target: 'ADV-1192', time: '11:52 AM', category: 'lawyer', severity: 'high' },
    { id: 3, action: 'Escrow funds frozen (dispute)', actor: 'System', target: 'TXN-004', time: '11:30 AM', category: 'payment', severity: 'medium' },
    { id: 4, action: 'AI quality flag raised', actor: 'System QA', target: 'QF-001', time: '10:04 AM', category: 'ai', severity: 'critical' },
    { id: 5, action: 'Vault file access (legal order)', actor: 'Admin WK', target: 'VLT-005', time: '9:44 AM', category: 'vault', severity: 'high' },
    { id: 6, action: 'New lawyer approved', actor: 'Admin WK', target: 'ADV-003', time: '9:10 AM', category: 'lawyer', severity: 'low' },
    { id: 7, action: 'KYC manually verified', actor: 'Admin WK', target: 'USR-006', time: '8:55 AM', category: 'compliance', severity: 'low' },
    { id: 8, action: 'Platform pricing updated', actor: 'Admin WK', target: 'Settings', time: 'Yesterday 3:20 PM', category: 'settings', severity: 'medium' },
    { id: 9, action: 'Abuse report investigated', actor: 'Admin MO', target: 'MSG-003', time: 'Yesterday 2:15 PM', category: 'moderation', severity: 'medium' },
    { id: 10, action: 'Monthly revenue report exported', actor: 'Admin WK', target: 'Reports', time: 'Yesterday 9:00 AM', category: 'reports', severity: 'low' },
];

const MODERATION_QUEUE = [
    { id: 'MOD-001', type: 'Abuse Report', reporter: 'USR-004', against: 'ADV-004', detail: 'Lawyer used offensive language and threatened client over payment dispute.', evidence: 'Screenshot in MSG-003', time: '5h ago', status: 'open', severity: 'high' },
    { id: 'MOD-002', type: 'Fraud Attempt', reporter: 'System', against: 'USR-8821', detail: 'Multiple accounts created with same ID documents. Attempting to manipulate lawyer reviews.', evidence: '3 duplicate KYC records', time: '4h ago', status: 'actioned', severity: 'critical' },
    { id: 'MOD-003', type: 'Illegal Document Upload', reporter: 'System AI', against: 'USR-8821', detail: 'Uploaded file flagged as potentially forged government document. Metadata inconsistencies detected.', evidence: 'VLT-005', time: '4h ago', status: 'actioned', severity: 'critical' },
    { id: 'MOD-004', type: 'Out-of-Platform Transaction', reporter: 'System AI', against: 'USR-8821', detail: 'Messages indicate attempt to pay lawyer outside platform to avoid escrow.', evidence: 'MSG-004', time: '4h ago', status: 'actioned', severity: 'high' },
    { id: 'MOD-005', type: 'Negative Review Manipulation', reporter: 'System AI', against: 'USR-003', detail: 'Unusual pattern of 5-star reviews submitted from same IP range across 6 lawyer profiles.', evidence: 'IP analysis log', time: '2 days ago', status: 'investigating', severity: 'medium' },
];

const RBAC_ROLES = [
    { role: 'Super Admin', holder: 'Wanjiku Kariuki', access: ['all'], color: C.red, note: 'Full platform access — all modules and data' },
    { role: 'Compliance Officer', holder: 'Michael Otieno', access: ['users', 'lawyers', 'compliance', 'vault', 'audit'], color: C.amber, note: 'KYC, credentials, legal compliance. No financial data.' },
    { role: 'Finance Admin', holder: 'Sarah Kimani', access: ['payments', 'reports', 'escrow'], color: C.jade, note: 'Payment processing, escrow, revenue. No user PII.' },
    { role: 'Support Admin', holder: 'David Mugo', access: ['users', 'cases', 'messages', 'moderation'], color: C.blue, note: 'User support, disputes. Cannot approve lawyers or access vault.' },
];

/* ═══════════════════════════════════════════
   UI PRIMITIVES
═══════════════════════════════════════════ */
const Card = ({ children, className = '', style = {}, onClick }) => (
    <div onClick={onClick} style={{ background: C.bg3, border: `1px solid ${C.b0}`, borderRadius: 16, ...style }}
        className={`transition-colors ${onClick ? 'cursor-pointer hover:border-white/10' : ''} ${className}`}>
        {children}
    </div>
);

const Badge = ({ label, color, dot = false }) => (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase"
        style={{ background: color + '18', border: `1px solid ${color}30`, color }}>
        {dot && <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: color }} />}
        {label}
    </span>
);

const SeverityBadge = ({ level }) => {
    const map = { critical: C.red, high: C.amber, medium: C.blue, low: C.t3 };
    return <Badge label={level} color={map[level] || C.t3} dot={level === 'critical'} />;
};

const StatusBadge = ({ status }) => {
    const map = {
        active: C.jade, approved: C.jade, completed: C.jade, resolved: C.jade, verified: C.jade,
        pending: C.amber, investigating: C.amber, escrow: C.amber,
        suspended: C.red, banned: C.red, disputed: C.red, flagged: C.red, rejected: C.red, failed: C.red,
        concluded: C.t3, actioned: C.violet, 'pending-review': C.gold,
    };
    return <Badge label={status} color={map[status] || C.t3} />;
};

const MiniBar = ({ pct, color }) => (
    <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: C.b0 }}>
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
    </div>
);

const Stat = ({ label, value, sub, icon: Icon, color, trend }) => (
    <Card className="p-5">
        <div className="flex items-start justify-between mb-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center border" style={{ background: color + '14', borderColor: color + '28' }}>
                <Icon size={16} style={{ color }} />
            </div>
            {trend !== undefined && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: trend >= 0 ? C.jade + '18' : C.red + '18', color: trend >= 0 ? C.jade : C.red }}>
                    {trend >= 0 ? '+' : ''}{trend}%
                </span>
            )}
        </div>
        <p className="text-2xl font-black text-white mb-0.5" style={{ fontFamily: 'Georgia, serif' }}>{value}</p>
        <p className="text-[11px]" style={{ color: C.t3 }}>{label}</p>
        {sub && <p className="text-[10px] mt-1" style={{ color: C.t4 }}>{sub}</p>}
    </Card>
);

const TableHead = ({ cols }) => (
    <div className="flex items-center gap-3 px-4 py-2.5 border-b" style={{ borderColor: C.b0 }}>
        {cols.map((c, i) => (
            <div key={i} className="text-[9px] uppercase tracking-widest font-bold flex-shrink-0" style={{ color: C.t4, width: c.w || 'auto', flex: c.flex || undefined }}>
                {c.label}
            </div>
        ))}
    </div>
);

const Avatar = ({ initials, color, size = 8 }) => (
    <div className={`w-${size} h-${size} rounded-full flex items-center justify-center font-black text-[10px] border flex-shrink-0`}
        style={{ background: color + '20', borderColor: color + '40', color, width: size * 4, height: size * 4, fontSize: size < 8 ? 9 : 11 }}>
        {initials}
    </div>
);

function useInterval(fn, ms) {
    useEffect(() => { const t = setInterval(fn, ms); return () => clearInterval(t); }, [fn, ms]);
}

/* ═══════════════════════════════════════════
   SIDEBAR
═══════════════════════════════════════════ */
const NAV = [
    { id: 'overview', label: 'Overview', icon: '⬛', emoji: '📊' },
    { id: 'users', label: 'Users', icon: '👥', emoji: '👥', badge: 1 },
    { id: 'lawyers', label: 'Lawyers', icon: '⚖️', emoji: '⚖️', badge: 2 },
    { id: 'cases', label: 'Cases', icon: '📁', emoji: '📁', badge: 1 },
    { id: 'documents', label: 'Documents', icon: '📄', emoji: '📄', badge: 1 },
    { id: 'vault', label: 'Vault', icon: '🔐', emoji: '🔐', badge: 1 },
    { id: 'messages', label: 'Messages', icon: '💬', emoji: '💬', badge: 2 },
    { id: 'payments', label: 'Payments', icon: '💰', emoji: '💰', badge: 1 },
    { id: 'ai', label: 'Veritas AI', icon: '🤖', emoji: '🤖', badge: 2 },
    { id: 'analytics', label: 'Analytics', icon: '📈', emoji: '📈' },
    { id: 'compliance', label: 'Compliance', icon: '🛡️', emoji: '🛡️' },
    { id: 'moderation', label: 'Moderation', icon: '🚨', emoji: '🚨', badge: 5 },
    { id: 'settings', label: 'Settings', icon: '⚙️', emoji: '⚙️' },
];

function Sidebar({ active, setActive }) {
    return (
        <aside className="flex flex-col h-screen sticky top-0 shrink-0" style={{ width: 220, background: C.bg1, borderRight: `1px solid ${C.b0}` }}>
            {/* Logo */}
            <div className="flex items-center gap-2.5 px-4 py-4 border-b" style={{ borderColor: C.b0 }}>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: C.red + '20', border: `1px solid ${C.red}35` }}>
                    <span style={{ fontSize: 14 }}>⚖️</span>
                </div>
                <div>
                    <span className="font-black text-white text-base tracking-tight">Veritex</span>
                    <div className="flex items-center gap-1 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: C.red }} />
                        <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: C.red }}>Admin</span>
                    </div>
                </div>
            </div>

            {/* Admin profile */}
            <div className="px-3 py-3 border-b" style={{ borderColor: C.b0 }}>
                <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl" style={{ background: C.bg3 }}>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center font-black text-[10px] border flex-shrink-0"
                        style={{ background: C.violet + '25', borderColor: C.violet + '50', color: C.violet }}>WK</div>
                    <div className="min-w-0">
                        <p className="text-white text-[11px] font-bold truncate">{ADMIN.name}</p>
                        <p className="text-[9px] font-bold uppercase tracking-wider truncate" style={{ color: C.red }}>Super Admin</p>
                    </div>
                    <div className="w-2 h-2 rounded-full ml-auto flex-shrink-0" style={{ background: C.jade }} />
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 py-2 overflow-y-auto">
                {NAV.map(({ id, label, emoji, badge }) => (
                    <button key={id} onClick={() => setActive(id)}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-left transition-all relative group"
                        style={{ color: active === id ? C.t1 : C.t3 }}>
                        {active === id && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r" style={{ background: C.red }} />}
                        <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ background: active === id ? C.red + '18' : 'transparent', fontSize: 12 }}>
                            {emoji}
                        </div>
                        <span className="text-[12px] font-medium flex-1 truncate">{label}</span>
                        {badge && (
                            <span className="w-4 h-4 rounded-full text-[9px] font-black flex items-center justify-center"
                                style={{ background: C.red + '25', color: C.red }}>{badge}</span>
                        )}
                    </button>
                ))}
            </nav>

            <div className="border-t py-2 px-3" style={{ borderColor: C.b0 }}>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: C.red + '08', border: `1px solid ${C.red}18` }}>
                    <span style={{ fontSize: 11 }}>🔒</span>
                    <p className="text-[9px] font-bold uppercase" style={{ color: C.red }}>Privileged Access — All actions logged</p>
                </div>
            </div>
        </aside>
    );
}

/* ═══════════════════════════════════════════
   TOP BAR
═══════════════════════════════════════════ */
function TopBar({ active }) {
    const [alertsOpen, setAlertsOpen] = useState(false);
    const [liveTime, setLiveTime] = useState(new Date());
    const unresolved = ALERTS.filter(a => !a.resolved).length;

    useInterval(() => setLiveTime(new Date()), 1000);

    const alertColors = { critical: C.red, high: C.amber, medium: C.blue, low: C.t3 };
    const meta = {
        overview: 'Platform Control Tower', users: 'User Management', lawyers: 'Lawyer Management',
        cases: 'Case Registry', documents: 'Document Control', vault: 'Evidence Vault (Metadata)',
        messages: 'Message Monitoring', payments: 'Financial Control', ai: 'Veritas AI Control Panel',
        analytics: 'Reports & Analytics', compliance: 'Compliance & Legal Control',
        moderation: 'Moderation System', settings: 'System Settings',
    };

    return (
        <header className="flex items-center gap-4 px-6 py-3 border-b sticky top-0 z-40 backdrop-blur-sm"
            style={{ background: C.bg2 + 'e8', borderColor: C.b0 }}>
            <div className="flex-1">
                <h1 className="text-white font-bold text-base">{meta[active] || 'Admin'}</h1>
                <p className="text-[10px] mt-0.5 font-mono" style={{ color: C.t4 }}>
                    {liveTime.toLocaleString('en-KE', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </p>
            </div>

            {/* Search */}
            <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl border" style={{ background: C.bg3, borderColor: C.b0 }}>
                <span style={{ fontSize: 13 }}>🔍</span>
                <input placeholder="Search users, cases, lawyers..." className="bg-transparent text-white/60 text-xs outline-none w-48 placeholder:text-white/20" />
                <kbd className="px-1.5 py-0.5 rounded text-[9px] font-mono" style={{ background: C.bg4, color: C.t4 }}>⌘K</kbd>
            </div>

            {/* Live counter */}
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl border" style={{ background: C.jade + '08', borderColor: C.jade + '20' }}>
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: C.jade }} />
                <span className="text-[11px] font-bold" style={{ color: C.jade }}>{PLATFORM_STATS.aiQueriesDay.toLocaleString()}</span>
                <span className="text-[10px]" style={{ color: C.t4 }}>AI queries today</span>
            </div>

            {/* Alerts */}
            <div className="relative">
                <button onClick={() => setAlertsOpen(v => !v)}
                    className="relative w-9 h-9 rounded-xl flex items-center justify-center border transition-colors"
                    style={{ background: unresolved > 0 ? C.red + '15' : C.bg3, borderColor: unresolved > 0 ? C.red + '35' : C.b0 }}>
                    <span style={{ fontSize: 16 }}>🔔</span>
                    {unresolved > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[9px] font-black flex items-center justify-center"
                            style={{ background: C.red, color: 'white' }}>{unresolved}</span>
                    )}
                </button>
                {alertsOpen && (
                    <div className="absolute right-0 top-12 w-96 rounded-2xl border shadow-2xl overflow-hidden z-50"
                        style={{ background: C.bg3, borderColor: C.b1, boxShadow: '0 20px 60px rgba(0,0,0,0.7)' }}>
                        <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: C.b0 }}>
                            <span className="text-white text-sm font-bold">System Alerts</span>
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ background: C.red + '20', color: C.red }}>{unresolved} unresolved</span>
                        </div>
                        <div className="max-h-96 overflow-y-auto divide-y" style={{ divideColor: C.b0 }}>
                            {ALERTS.map((a, i) => (
                                <div key={i} className={`flex items-start gap-3 px-4 py-3 hover:bg-white/2 transition-colors ${a.resolved ? 'opacity-40' : ''}`}>
                                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: alertColors[a.level] }} />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-0.5">
                                            <p className="text-white text-[11px] font-semibold">{a.title}</p>
                                            <SeverityBadge level={a.level} />
                                        </div>
                                        <p className="text-[10px] leading-relaxed" style={{ color: C.t3 }}>{a.detail}</p>
                                        <p className="text-[9px] mt-1" style={{ color: C.t4 }}>{a.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Profile */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl border" style={{ background: C.bg3, borderColor: C.b0 }}>
                <div className="w-6 h-6 rounded-full flex items-center justify-center font-black text-[9px] border flex-shrink-0"
                    style={{ background: C.violet + '25', borderColor: C.violet + '50', color: C.violet }}>WK</div>
                <span className="text-white text-[11px] font-semibold">{ADMIN.name}</span>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: C.red }} />
            </div>
        </header>
    );
}

/* ═══════════════════════════════════════════
   1. OVERVIEW
═══════════════════════════════════════════ */
function OverviewView({ setActive }) {
    const [liveActive, setLiveActive] = useState(14892);
    useInterval(() => setLiveActive(v => v + Math.floor(Math.random() * 3 - 1)), 3000);

    const activityData = [42, 58, 71, 65, 89, 104, 98, 112, 89, 127, 141, 138, 152, 167, 158, 171, 184, 178, 163, 189, 201, 197, 213, 228];

    return (
        <div className="p-5 space-y-5 max-w-screen-xl mx-auto">
            {/* Critical alert banner */}
            {ALERTS.filter(a => a.level === 'critical' && !a.resolved).length > 0 && (
                <div className="flex items-center gap-4 px-5 py-3.5 rounded-2xl border animate-pulse"
                    style={{ background: C.red + '08', borderColor: C.red + '30' }}>
                    <span style={{ fontSize: 18 }}>🚨</span>
                    <div className="flex-1">
                        <p className="text-white font-bold text-sm">{ALERTS.filter(a => a.level === 'critical' && !a.resolved).length} Critical Alert{ALERTS.filter(a => a.level === 'critical' && !a.resolved).length > 1 ? 's' : ''} Require Immediate Attention</p>
                        <p className="text-[11px]" style={{ color: C.t3 }}>{ALERTS.filter(a => a.level === 'critical' && !a.resolved)[0]?.title}</p>
                    </div>
                    <button onClick={() => setActive('moderation')}
                        className="px-4 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0"
                        style={{ background: C.red, color: 'white' }}>
                        Review Now →
                    </button>
                </div>
            )}

            {/* KPI Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Stat label="Total Users" value={liveActive.toLocaleString()} sub="↑ 142 today" icon={() => <span>👥</span>} color={C.blue} trend={PLATFORM_STATS.usersGrowth} />
                <Stat label="Active Cases" value={PLATFORM_STATS.activeCases.toLocaleString()} sub="312 advocates" icon={() => <span>⚖️</span>} color={C.gold} trend={PLATFORM_STATS.casesGrowth} />
                <Stat label="Monthly Revenue" value={`KES ${(PLATFORM_STATS.revenueMonth / 1000000).toFixed(2)}M`} sub={`KES ${(PLATFORM_STATS.escrowBalance / 1000000).toFixed(2)}M in escrow`} icon={() => <span>💰</span>} color={C.jade} trend={PLATFORM_STATS.revGrowth} />
                <Stat label="Flagged Items" value={PLATFORM_STATS.flaggedItems} sub={`${ALERTS.filter(a => !a.resolved).length} unresolved alerts`} icon={() => <span>🚨</span>} color={C.red} />
            </div>

            <div className="grid lg:grid-cols-3 gap-5">
                {/* Live activity graph */}
                <div className="lg:col-span-2">
                    <Card className="p-5 h-full">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="text-white font-semibold text-sm">Platform Activity — Last 24h</p>
                                <p className="text-[10px] mt-0.5" style={{ color: C.t3 }}>User sessions · Cases created · AI queries</p>
                            </div>
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl" style={{ background: C.jade + '10', border: `1px solid ${C.jade}20` }}>
                                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: C.jade }} />
                                <span className="text-[10px] font-bold" style={{ color: C.jade }}>Live</span>
                            </div>
                        </div>
                        <div className="flex items-end gap-1 h-28">
                            {activityData.map((v, i) => {
                                const max = Math.max(...activityData);
                                const pct = (v / max) * 100;
                                const isLast = i === activityData.length - 1;
                                return (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                                        <div className="w-full rounded-t" style={{ height: `${pct}%`, background: isLast ? C.red : `${C.blue}40`, minHeight: 4 }} />
                                        {i % 6 === 0 && <p className="text-[8px]" style={{ color: C.t5 }}>{`${i}h`}</p>}
                                    </div>
                                );
                            })}
                        </div>
                    </Card>
                </div>

                {/* Right: Alerts + Quick stats */}
                <div className="space-y-4">
                    {/* Alert summary */}
                    <Card className="overflow-hidden">
                        <div className="px-4 py-3 border-b flex items-center gap-2" style={{ borderColor: C.b0, background: C.red + '06' }}>
                            <span style={{ fontSize: 14 }}>🚨</span>
                            <span className="text-white text-xs font-bold">Alerts</span>
                            <span className="ml-auto px-2 py-0.5 rounded-full text-[9px] font-black" style={{ background: C.red + '25', color: C.red }}>
                                {ALERTS.filter(a => !a.resolved).length} active
                            </span>
                        </div>
                        {ALERTS.filter(a => !a.resolved).slice(0, 4).map((a, i) => (
                            <div key={i} className="flex items-start gap-2.5 px-4 py-3 border-b hover:bg-white/2 transition-colors" style={{ borderColor: C.b0 }}>
                                <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: { critical: C.red, high: C.amber, medium: C.blue, low: C.t3 }[a.level] }} />
                                <div className="flex-1 min-w-0">
                                    <p className="text-white/80 text-[11px] font-medium leading-snug">{a.title}</p>
                                    <p className="text-[9px] mt-0.5" style={{ color: C.t4 }}>{a.time}</p>
                                </div>
                                <SeverityBadge level={a.level} />
                            </div>
                        ))}
                        <button onClick={() => setActive('moderation')} className="w-full py-2.5 text-[11px] font-semibold hover:underline" style={{ color: C.red }}>
                            View all alerts →
                        </button>
                    </Card>

                    {/* Quick platform health */}
                    <Card className="p-4 space-y-3">
                        <p className="text-[10px] uppercase tracking-widest font-bold" style={{ color: C.t4 }}>Platform Health</p>
                        {[
                            { label: 'AI Uptime', value: '99.8%', color: C.jade },
                            { label: 'Payment Gateway', value: '98.2%', color: C.jade },
                            { label: 'Vault Integrity', value: '100%', color: C.jade },
                            { label: 'Vault Capacity Used', value: `${((PLATFORM_STATS.vaultSizeMB / PLATFORM_STATS.vaultCap) * 100).toFixed(1)}%`, color: C.amber },
                        ].map(({ label, value, color }, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <p className="text-[11px]" style={{ color: C.t3 }}>{label}</p>
                                <p className="text-[11px] font-black" style={{ color }}>{value}</p>
                            </div>
                        ))}
                    </Card>
                </div>
            </div>

            {/* Recent audit log snippet */}
            <Card className="overflow-hidden">
                <div className="px-5 py-3.5 border-b flex items-center justify-between" style={{ borderColor: C.b0 }}>
                    <div className="flex items-center gap-2">
                        <span style={{ fontSize: 14 }}>📋</span>
                        <span className="text-white font-semibold text-sm">Recent Audit Log</span>
                    </div>
                    <button onClick={() => setActive('compliance')} className="text-[11px] font-semibold hover:underline" style={{ color: C.red }}>View full log →</button>
                </div>
                <div className="divide-y" style={{ divideColor: C.b0 }}>
                    {AUDIT_LOG.slice(0, 5).map((log, i) => (
                        <div key={i} className="flex items-center gap-4 px-5 py-3 hover:bg-white/2 transition-colors">
                            <span className="text-[10px] font-mono w-20 flex-shrink-0" style={{ color: C.t4 }}>{log.time}</span>
                            <p className="flex-1 text-[11px]" style={{ color: C.t2 }}>
                                <span className="font-bold" style={{ color: C.t1 }}>{log.actor}</span> · {log.action} · <span className="font-mono" style={{ color: C.t3 }}>{log.target}</span>
                            </p>
                            <SeverityBadge level={log.severity} />
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}

/* ═══════════════════════════════════════════
   2. USER MANAGEMENT
═══════════════════════════════════════════ */
function UsersView() {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');
    const [selected, setSelected] = useState(null);
    const [actionModal, setActionModal] = useState(null);

    const filtered = USERS.filter(u => {
        const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.id.includes(search) || u.email.includes(search);
        const matchFilter = filter === 'all' || u.status === filter || u.kyc === filter || u.risk === filter;
        return matchSearch && matchFilter;
    });

    const riskColor = { low: C.jade, medium: C.amber, high: C.red, critical: C.red };

    return (
        <div className="flex h-full overflow-hidden">
            {/* Table */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-5 space-y-4">
                    {/* Filters */}
                    <div className="flex items-center gap-3 flex-wrap">
                        <div className="flex items-center gap-2 px-3 py-2 rounded-xl border flex-1 min-w-48" style={{ background: C.bg3, borderColor: C.b0 }}>
                            <span style={{ fontSize: 13 }}>🔍</span>
                            <input value={search} onChange={e => setSearch(e.target.value)}
                                placeholder="Search by name, email, ID..." className="bg-transparent text-white/60 text-xs outline-none flex-1 placeholder:text-white/20" />
                        </div>
                        {['all', 'active', 'suspended', 'banned', 'verified', 'pending', 'high'].map(f => (
                            <button key={f} onClick={() => setFilter(f)}
                                className="px-3 py-1.5 rounded-lg text-[10px] font-bold capitalize transition-all"
                                style={{ background: filter === f ? C.red : C.bg3, color: filter === f ? 'white' : C.t3, border: `1px solid ${filter === f ? C.red : C.b0}` }}>
                                {f}
                            </button>
                        ))}
                        <div className="ml-auto text-[11px]" style={{ color: C.t3 }}>{filtered.length} users</div>
                    </div>

                    {/* Table */}
                    <Card className="overflow-hidden">
                        <TableHead cols={[
                            { label: 'User', flex: 1 }, { label: 'Contact', w: 160 }, { label: 'KYC', w: 90 },
                            { label: 'Status', w: 90 }, { label: 'Risk', w: 80 }, { label: 'Cases', w: 60 }, { label: 'Actions', w: 120 }
                        ]} />
                        <div className="divide-y" style={{ divideColor: C.b0 }}>
                            {filtered.map((u, i) => (
                                <div key={i} className={`flex items-center gap-3 px-4 py-3 hover:bg-white/2 transition-colors ${u.risk === 'critical' || u.risk === 'high' ? '' : ''}`}
                                    style={{ background: u.risk === 'critical' ? C.red + '05' : 'transparent' }}>
                                    {/* User */}
                                    <div className="flex items-center gap-2.5 flex-1 min-w-0">
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black border flex-shrink-0"
                                            style={{ background: C.blue + '20', borderColor: C.blue + '35', color: C.blue }}>
                                            {u.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-white text-[11px] font-semibold truncate">{u.name}</p>
                                            <p className="text-[9px] font-mono" style={{ color: C.t4 }}>{u.id} · {u.county}</p>
                                        </div>
                                    </div>
                                    {/* Contact */}
                                    <div style={{ width: 160 }}>
                                        <p className="text-[10px] truncate" style={{ color: C.t3 }}>{u.email}</p>
                                        <p className="text-[10px]" style={{ color: C.t4 }}>{u.phone}</p>
                                    </div>
                                    {/* KYC */}
                                    <div style={{ width: 90 }}>
                                        <StatusBadge status={u.kyc} />
                                    </div>
                                    {/* Status */}
                                    <div style={{ width: 90 }}>
                                        <StatusBadge status={u.status} />
                                    </div>
                                    {/* Risk */}
                                    <div style={{ width: 80 }}>
                                        <Badge label={u.risk} color={riskColor[u.risk] || C.t3} dot={u.risk === 'critical'} />
                                    </div>
                                    {/* Cases */}
                                    <div style={{ width: 60 }}>
                                        <p className="text-white text-[11px] font-bold text-center">{u.cases}</p>
                                    </div>
                                    {/* Actions */}
                                    <div className="flex gap-1" style={{ width: 120 }}>
                                        <button onClick={() => setSelected(u)} className="px-2 py-1 rounded-lg text-[9px] border hover:bg-white/8 transition-colors" style={{ borderColor: C.b0, color: C.t3 }}>View</button>
                                        {u.status !== 'banned' && (
                                            <button onClick={() => setActionModal({ user: u, action: 'suspend' })} className="px-2 py-1 rounded-lg text-[9px] border transition-colors" style={{ borderColor: C.amber + '30', color: C.amber, background: C.amber + '10' }}>Suspend</button>
                                        )}
                                        {u.status === 'suspended' && (
                                            <button onClick={() => setActionModal({ user: u, action: 'ban' })} className="px-2 py-1 rounded-lg text-[9px] border transition-colors" style={{ borderColor: C.red + '30', color: C.red, background: C.red + '10' }}>Ban</button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>

            {/* Side panel */}
            {selected && (
                <div className="w-72 border-l p-5 overflow-y-auto" style={{ borderColor: C.b0, background: C.bg2 }}>
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-white font-bold text-sm">User Profile</p>
                        <button onClick={() => setSelected(null)} style={{ color: C.t3 }}>✕</button>
                    </div>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center font-black text-base border mx-auto mb-3"
                        style={{ background: C.blue + '20', borderColor: C.blue + '40', color: C.blue }}>
                        {selected.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <p className="text-white font-bold text-center text-sm mb-0.5">{selected.name}</p>
                    <p className="text-center text-[10px] font-mono mb-4" style={{ color: C.t4 }}>{selected.id}</p>
                    <div className="space-y-2.5">
                        {[
                            { label: 'Email', value: selected.email },
                            { label: 'Phone', value: selected.phone },
                            { label: 'County', value: selected.county },
                            { label: 'Joined', value: selected.joined },
                            { label: 'KYC Status', value: selected.kyc },
                            { label: 'Account Status', value: selected.status },
                            { label: 'Risk Level', value: selected.risk },
                            { label: 'Active Cases', value: selected.cases },
                        ].map(({ label, value }, i) => (
                            <div key={i} className="flex items-center justify-between py-2 border-b" style={{ borderColor: C.b0 }}>
                                <p className="text-[10px]" style={{ color: C.t4 }}>{label}</p>
                                <p className="text-[11px] font-semibold" style={{ color: C.t2 }}>{value}</p>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-2 mt-5">
                        {[
                            { label: '✅ Verify KYC Manually', color: C.jade },
                            { label: '⏸ Suspend Account', color: C.amber },
                            { label: '🚫 Ban User', color: C.red },
                            { label: '🔄 Reset Account', color: C.blue },
                        ].map(({ label, color }, i) => (
                            <button key={i} className="w-full py-2 rounded-xl text-[11px] font-bold border transition-colors text-left px-3"
                                style={{ borderColor: color + '30', color, background: color + '08' }}>
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════
   3. LAWYERS VIEW
═══════════════════════════════════════════ */
function LawyersView() {
    const [selected, setSelected] = useState(null);
    const [credModal, setCredModal] = useState(null);

    const pending = LAWYERS.filter(l => l.verified === 'pending');

    return (
        <div className="p-5 space-y-5 max-w-screen-xl mx-auto">
            {/* Verification queue */}
            {pending.length > 0 && (
                <Card className="overflow-hidden" style={{ borderColor: C.amber + '30' }}>
                    <div className="px-5 py-3.5 border-b flex items-center gap-2" style={{ borderColor: C.b0, background: C.amber + '06' }}>
                        <span style={{ fontSize: 14 }}>⏳</span>
                        <span className="text-white font-bold text-sm">Pending Lawyer Verification</span>
                        <span className="ml-auto px-2 py-0.5 rounded-full text-[9px] font-black" style={{ background: C.amber + '25', color: C.amber }}>{pending.length} awaiting</span>
                    </div>
                    <div className="divide-y" style={{ divideColor: C.b0 }}>
                        {pending.map((l, i) => (
                            <div key={i} className="flex items-center gap-4 px-5 py-4 hover:bg-white/2 transition-colors">
                                <div className="w-9 h-9 rounded-full flex items-center justify-center font-black text-[11px] border"
                                    style={{ background: C.amber + '20', borderColor: C.amber + '40', color: C.amber }}>
                                    {l.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-white font-semibold text-sm">{l.name}</p>
                                    <p className="text-[10px]" style={{ color: C.t3 }}>{l.specialization} · {l.lsk} · Joined {l.joined}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => setCredModal(l)} className="px-3 py-1.5 rounded-xl text-[11px] font-bold border hover:bg-white/8 transition-colors" style={{ borderColor: C.b0, color: C.t2 }}>View Credentials</button>
                                    <button className="px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all" style={{ background: C.jade, color: 'white' }}>✓ Approve</button>
                                    <button className="px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all" style={{ background: C.red + '20', border: `1px solid ${C.red}30`, color: C.red }}>✗ Reject</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            {/* Full lawyer table */}
            <Card className="overflow-hidden">
                <div className="px-5 py-3.5 border-b flex items-center gap-3" style={{ borderColor: C.b0 }}>
                    <span className="text-white font-semibold text-sm">All Advocates</span>
                    <span className="ml-auto text-[10px]" style={{ color: C.t4 }}>{LAWYERS.length} total</span>
                </div>
                <TableHead cols={[
                    { label: 'Advocate', flex: 1 }, { label: 'Specialisation', w: 160 }, { label: 'LSK No.', w: 130 },
                    { label: 'Rating', w: 70 }, { label: 'Win %', w: 70 }, { label: 'Cases', w: 60 },
                    { label: 'Earnings', w: 100 }, { label: 'Status', w: 100 }, { label: 'Actions', w: 130 },
                ]} />
                <div className="divide-y" style={{ divideColor: C.b0 }}>
                    {LAWYERS.map((l, i) => (
                        <div key={i} className="flex items-center gap-3 px-4 py-3.5 hover:bg-white/2 transition-colors"
                            style={{ background: l.verified === 'rejected' ? C.red + '04' : 'transparent' }}>
                            <div className="flex items-center gap-2.5 flex-1 min-w-0">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black border"
                                    style={{ background: C.gold + '20', borderColor: C.gold + '40', color: C.gold }}>
                                    {l.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-white text-[11px] font-semibold truncate">{l.name}</p>
                                    <p className="text-[9px] font-mono" style={{ color: C.t4 }}>{l.id} · {l.county}</p>
                                </div>
                            </div>
                            <p className="text-[10px] truncate" style={{ color: C.t3, width: 160 }}>{l.specialization}</p>
                            <p className="text-[10px] font-mono" style={{ color: C.t3, width: 130 }}>{l.lsk}</p>
                            <p className="text-[11px] font-bold text-center" style={{ color: C.gold, width: 70 }}>⭐ {l.rating}</p>
                            <div style={{ width: 70 }}>
                                <p className="text-[11px] font-bold text-center" style={{ color: l.winRate > 80 ? C.jade : l.winRate > 70 ? C.amber : C.red }}>{l.winRate}%</p>
                            </div>
                            <p className="text-[11px] font-bold text-center text-white" style={{ width: 60 }}>{l.totalCases}</p>
                            <p className="text-[11px] font-bold" style={{ color: C.jade, width: 100 }}>KES {(l.earnings / 1000).toFixed(0)}K</p>
                            <div style={{ width: 100 }}>
                                <StatusBadge status={l.verified} />
                            </div>
                            <div className="flex gap-1" style={{ width: 130 }}>
                                <button onClick={() => setSelected(l)} className="px-2 py-1 rounded-lg text-[9px] border hover:bg-white/8 transition-colors" style={{ borderColor: C.b0, color: C.t3 }}>Profile</button>
                                {l.status !== 'suspended' && l.verified !== 'rejected' && (
                                    <button className="px-2 py-1 rounded-lg text-[9px] border transition-colors" style={{ borderColor: C.amber + '30', color: C.amber, background: C.amber + '08' }}>Suspend</button>
                                )}
                                {l.verified === 'approved' && (
                                    <button className="px-2 py-1 rounded-lg text-[9px] border transition-colors" style={{ borderColor: C.gold + '30', color: C.gold, background: C.gold + '08' }}>Feature</button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Credential verification modal */}
            {credModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <Card className="w-full max-w-lg p-6 shadow-2xl" style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.8)' }}>
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <p className="text-white font-bold text-base">Credential Verification</p>
                                <p className="text-[11px]" style={{ color: C.t3 }}>{credModal.name} · {credModal.lsk}</p>
                            </div>
                            <button onClick={() => setCredModal(null)} style={{ color: C.t3 }}>✕</button>
                        </div>
                        <div className="space-y-3 mb-5">
                            {[
                                { label: 'Full Name', value: credModal.name, status: 'verified' },
                                { label: 'LSK Number', value: credModal.lsk, status: 'pending' },
                                { label: 'Specialisation', value: credModal.specialization, status: 'pending' },
                                { label: 'Bar Association Query', value: 'Awaiting response from LSK API', status: 'pending' },
                                { label: 'National ID', value: '●●●●●●●● (masked)', status: 'pending' },
                                { label: 'Biometric KYC', value: 'Submitted — Awaiting verification', status: 'pending' },
                            ].map(({ label, value, status }, i) => (
                                <div key={i} className="flex items-center justify-between py-2 border-b" style={{ borderColor: C.b0 }}>
                                    <p className="text-[11px]" style={{ color: C.t3 }}>{label}</p>
                                    <div className="flex items-center gap-2">
                                        <p className="text-[11px] font-medium" style={{ color: C.t2 }}>{value}</p>
                                        <StatusBadge status={status} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => setCredModal(null)} className="flex-1 py-3 rounded-xl text-sm font-bold transition-all" style={{ background: C.jade, color: 'white' }}>
                                ✓ Approve Lawyer
                            </button>
                            <button onClick={() => setCredModal(null)} className="flex-1 py-3 rounded-xl text-sm font-bold border transition-all" style={{ borderColor: C.red + '40', color: C.red, background: C.red + '10' }}>
                                ✗ Reject & Notify
                            </button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════
   4. CASES VIEW
═══════════════════════════════════════════ */
function CasesView() {
    const [selected, setSelected] = useState(null);
    const [filter, setFilter] = useState('all');

    const filtered = CASES_ALL.filter(c => filter === 'all' || c.status === filter || c.flagged.toString() === filter);

    return (
        <div className="flex h-full overflow-hidden">
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <div className="flex gap-2 flex-wrap">
                    {['all', 'active', 'disputed', 'concluded', 'true'].map(f => (
                        <button key={f} onClick={() => setFilter(f)}
                            className="px-3 py-1.5 rounded-lg text-[10px] font-bold capitalize transition-all"
                            style={{ background: filter === f ? C.red : C.bg3, color: filter === f ? 'white' : C.t3, border: `1px solid ${filter === f ? C.red : C.b0}` }}>
                            {f === 'true' ? '🚩 Flagged' : f}
                        </button>
                    ))}
                    <div className="ml-auto text-[11px] self-center" style={{ color: C.t3 }}>{filtered.length} cases</div>
                </div>

                <Card className="overflow-hidden">
                    <TableHead cols={[
                        { label: 'Case ID', w: 120 }, { label: 'Client', w: 130 }, { label: 'Advocate', w: 140 },
                        { label: 'Type', w: 140 }, { label: 'Stage', w: 120 }, { label: 'Status', w: 90 },
                        { label: 'Fee / Paid', w: 120 }, { label: 'Actions', w: 130 },
                    ]} />
                    <div className="divide-y" style={{ divideColor: C.b0 }}>
                        {filtered.map((c, i) => (
                            <div key={i} className="flex items-center gap-3 px-4 py-3.5 hover:bg-white/2 transition-colors"
                                style={{ background: c.flagged ? C.red + '05' : c.status === 'disputed' ? C.amber + '05' : 'transparent' }}>
                                <div style={{ width: 120 }}>
                                    <p className="text-[10px] font-mono font-bold" style={{ color: C.gold }}>{c.id}</p>
                                    {c.flagged && <span className="text-[9px]" style={{ color: C.red }}>🚩 FLAGGED</span>}
                                </div>
                                <div style={{ width: 130 }}>
                                    <p className="text-[11px] font-medium" style={{ color: C.t1 }}>{c.client}</p>
                                    <p className="text-[9px] font-mono" style={{ color: C.t4 }}>{c.clientId}</p>
                                </div>
                                <div style={{ width: 140 }}>
                                    <p className="text-[11px] font-medium" style={{ color: C.t1 }}>{c.lawyer}</p>
                                    <p className="text-[9px] font-mono" style={{ color: C.t4 }}>{c.lawyerId}</p>
                                </div>
                                <p className="text-[10px]" style={{ color: C.t3, width: 140 }}>{c.type}</p>
                                <p className="text-[10px]" style={{ color: C.t2, width: 120 }}>{c.stage}</p>
                                <div style={{ width: 90 }}><StatusBadge status={c.status} /></div>
                                <div style={{ width: 120 }}>
                                    <p className="text-[10px] font-bold" style={{ color: C.jade }}>KES {(c.paid / 1000).toFixed(1)}K</p>
                                    <p className="text-[9px]" style={{ color: C.t4 }}>of KES {(c.fee / 1000).toFixed(0)}K</p>
                                </div>
                                <div className="flex gap-1" style={{ width: 130 }}>
                                    <button onClick={() => setSelected(c)} className="px-2 py-1 rounded-lg text-[9px] border hover:bg-white/8 transition-colors" style={{ borderColor: C.b0, color: C.t3 }}>View</button>
                                    <button className="px-2 py-1 rounded-lg text-[9px] border transition-colors" style={{ borderColor: C.amber + '30', color: C.amber, background: C.amber + '08' }}>Reassign</button>
                                    {!c.flagged && <button className="px-2 py-1 rounded-lg text-[9px] border transition-colors" style={{ borderColor: C.red + '30', color: C.red, background: C.red + '08' }}>Flag</button>}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {selected && (
                <div className="w-80 border-l p-5 overflow-y-auto" style={{ borderColor: C.b0, background: C.bg2 }}>
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-white font-bold text-sm">Case Detail</p>
                        <button onClick={() => setSelected(null)} style={{ color: C.t3 }}>✕</button>
                    </div>
                    <p className="text-[10px] font-mono font-bold mb-3" style={{ color: C.gold }}>{selected.id}</p>
                    <div className="space-y-2">
                        {[
                            { label: 'Type', value: selected.type }, { label: 'Client', value: `${selected.client} (${selected.clientId})` },
                            { label: 'Advocate', value: `${selected.lawyer} (${selected.lawyerId})` },
                            { label: 'Court', value: selected.court || '—' }, { label: 'Filed', value: selected.filed },
                            { label: 'Stage', value: selected.stage }, { label: 'Status', value: selected.status },
                            { label: 'Next Hearing', value: selected.nextHearing || '—' },
                            { label: 'Total Fee', value: `KES ${selected.fee.toLocaleString()}` },
                            { label: 'Amount Paid', value: `KES ${selected.paid.toLocaleString()}` },
                            { label: 'County', value: selected.county },
                        ].map(({ label, value }, i) => (
                            <div key={i} className="flex items-start justify-between py-2 border-b" style={{ borderColor: C.b0 }}>
                                <p className="text-[10px]" style={{ color: C.t4 }}>{label}</p>
                                <p className="text-[11px] font-medium text-right" style={{ color: C.t2 }}>{value}</p>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-2 mt-5">
                        {[
                            { label: '🔄 Reassign Advocate', color: C.blue },
                            { label: '⬆️ Escalate Case', color: C.amber },
                            { label: '🚩 Flag as Suspicious', color: C.red },
                            { label: '💬 View Dispute', color: C.violet },
                        ].map(({ label, color }, i) => (
                            <button key={i} className="w-full py-2 rounded-xl text-[11px] font-bold border text-left px-3 transition-colors"
                                style={{ borderColor: color + '28', color, background: color + '08' }}>{label}</button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════
   5. DOCUMENTS VIEW
═══════════════════════════════════════════ */
function DocumentsView() {
    return (
        <div className="p-5 space-y-4 max-w-screen-xl mx-auto">
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl border flex-1 max-w-sm" style={{ background: C.bg3, borderColor: C.b0 }}>
                    <span style={{ fontSize: 13 }}>🔍</span>
                    <input placeholder="Search documents..." className="bg-transparent text-white/60 text-xs outline-none flex-1 placeholder:text-white/20" />
                </div>
                <div className="ml-auto text-[11px]" style={{ color: C.t3 }}>{DOCUMENTS_ALL.length} documents</div>
            </div>

            {DOCUMENTS_ALL.filter(d => d.flagged).length > 0 && (
                <Card className="overflow-hidden" style={{ borderColor: C.red + '30' }}>
                    <div className="px-4 py-3 border-b flex items-center gap-2" style={{ borderColor: C.b0, background: C.red + '06' }}>
                        <span>🚩</span>
                        <span className="text-white font-bold text-xs">Flagged Documents Requiring Review</span>
                    </div>
                    {DOCUMENTS_ALL.filter(d => d.flagged).map((doc, i) => (
                        <div key={i} className="flex items-center gap-4 px-5 py-4">
                            <span style={{ fontSize: 20 }}>📄</span>
                            <div className="flex-1">
                                <p className="text-white font-semibold text-sm">{doc.name}</p>
                                <p className="text-[10px]" style={{ color: C.t3 }}>Owner: {doc.owner} · Size: {doc.size} · {doc.created}</p>
                            </div>
                            <StatusBadge status="flagged" />
                            <div className="flex gap-2">
                                <button className="px-3 py-1.5 rounded-xl text-[11px] font-bold border transition-colors" style={{ borderColor: C.red + '30', color: C.red, background: C.red + '10' }}>Remove</button>
                                <button className="px-3 py-1.5 rounded-xl text-[11px] font-bold border hover:bg-white/8 transition-colors" style={{ borderColor: C.b0, color: C.t2 }}>Audit History</button>
                            </div>
                        </div>
                    ))}
                </Card>
            )}

            <Card className="overflow-hidden">
                <TableHead cols={[
                    { label: 'Document', flex: 1 }, { label: 'Type', w: 130 }, { label: 'Owner', w: 140 },
                    { label: 'Case', w: 120 }, { label: 'Date', w: 100 }, { label: 'Status', w: 100 },
                    { label: 'AI Generated', w: 100 }, { label: 'Actions', w: 130 },
                ]} />
                <div className="divide-y" style={{ divideColor: C.b0 }}>
                    {DOCUMENTS_ALL.map((doc, i) => (
                        <div key={i} className="flex items-center gap-3 px-4 py-3.5 hover:bg-white/2 transition-colors"
                            style={{ background: doc.flagged ? C.red + '05' : 'transparent' }}>
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                                <span style={{ fontSize: 16 }}>📄</span>
                                <p className="text-white text-[11px] font-medium truncate">{doc.name}</p>
                            </div>
                            <p className="text-[10px]" style={{ color: C.t3, width: 130 }}>{doc.type}</p>
                            <p className="text-[10px]" style={{ color: C.t3, width: 140 }}>{doc.owner}</p>
                            <p className="text-[10px] font-mono" style={{ color: C.t4, width: 120 }}>{doc.caseId || '—'}</p>
                            <p className="text-[10px]" style={{ color: C.t4, width: 100 }}>{doc.created}</p>
                            <div style={{ width: 100 }}><StatusBadge status={doc.status} /></div>
                            <div style={{ width: 100 }}>
                                <Badge label={doc.aiGenerated ? 'AI' : 'Manual'} color={doc.aiGenerated ? C.violet : C.t3} />
                            </div>
                            <div className="flex gap-1" style={{ width: 130 }}>
                                {doc.flagged ? (
                                    <>
                                        <button className="px-2 py-1 rounded-lg text-[9px] border transition-colors" style={{ borderColor: C.red + '30', color: C.red, background: C.red + '08' }}>Remove</button>
                                        <button className="px-2 py-1 rounded-lg text-[9px] border hover:bg-white/8 transition-colors" style={{ borderColor: C.b0, color: C.t3 }}>Audit</button>
                                    </>
                                ) : (
                                    <>
                                        <button className="px-2 py-1 rounded-lg text-[9px] border hover:bg-white/8 transition-colors" style={{ borderColor: C.b0, color: C.t3 }}>Audit</button>
                                        <button className="px-2 py-1 rounded-lg text-[9px] border transition-colors" style={{ borderColor: C.amber + '25', color: C.amber, background: C.amber + '08' }}>Flag</button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}

/* ═══════════════════════════════════════════
   6. VAULT (METADATA ONLY)
═══════════════════════════════════════════ */
function VaultView() {
    const [accessModal, setAccessModal] = useState(null);

    return (
        <div className="p-5 space-y-4 max-w-5xl mx-auto">
            {/* Privacy notice */}
            <Card className="flex items-start gap-4 p-5" style={{ borderColor: C.amber + '30', background: C.amber + '05' }}>
                <span style={{ fontSize: 24 }}>⚠️</span>
                <div>
                    <p className="text-white font-bold text-sm mb-1">Restricted Access — Metadata Only</p>
                    <p className="text-[11px] leading-relaxed" style={{ color: C.t2 }}>
                        Admin access to vault file contents is strictly prohibited without a valid legal requirement (court order, regulatory demand, or internal security investigation). All access attempts are logged and audited. Viewing file contents requires dual-admin approval and generates an irreversible audit entry.
                    </p>
                </div>
            </Card>

            {/* Storage overview */}
            <div className="grid grid-cols-4 gap-4">
                {[
                    { label: 'Total Files', value: VAULT_META.length, color: C.blue },
                    { label: 'Total Size', value: `${(PLATFORM_STATS.vaultSizeMB / 1024).toFixed(1)} GB`, color: C.gold },
                    { label: 'Capacity Used', value: `${((PLATFORM_STATS.vaultSizeMB / PLATFORM_STATS.vaultCap) * 100).toFixed(1)}%`, color: C.amber },
                    { label: 'Flagged Files', value: VAULT_META.filter(v => v.flagged).length, color: C.red },
                ].map(({ label, value, color }, i) => (
                    <Card key={i} className="p-4 text-center">
                        <p className="text-2xl font-black mb-1" style={{ color, fontFamily: 'Georgia, serif' }}>{value}</p>
                        <p className="text-[10px]" style={{ color: C.t3 }}>{label}</p>
                    </Card>
                ))}
            </div>

            {/* Metadata table */}
            <Card className="overflow-hidden">
                <div className="px-5 py-3.5 border-b" style={{ borderColor: C.b0 }}>
                    <p className="text-white font-semibold text-sm">Vault Metadata Registry</p>
                    <p className="text-[10px] mt-0.5" style={{ color: C.t4 }}>File contents are not displayed. Access requires legal justification and dual approval.</p>
                </div>
                <TableHead cols={[
                    { label: 'Vault ID', w: 100 }, { label: 'File Type', w: 80 }, { label: 'Size', w: 80 },
                    { label: 'Case ID', w: 120 }, { label: 'Uploaded By', w: 100 }, { label: 'Date', w: 100 },
                    { label: 'Encrypted', w: 90 }, { label: 'Access Log', w: 90 }, { label: 'Actions', w: 130 },
                ]} />
                <div className="divide-y" style={{ divideColor: C.b0 }}>
                    {VAULT_META.map((v, i) => (
                        <div key={i} className="flex items-center gap-3 px-4 py-3.5 hover:bg-white/2 transition-colors"
                            style={{ background: v.flagged ? C.red + '06' : 'transparent' }}>
                            <p className="text-[10px] font-mono font-bold" style={{ color: C.t2, width: 100 }}>{v.id}</p>
                            <div style={{ width: 80 }}>
                                <Badge label={v.fileType} color={C.blue} />
                            </div>
                            <p className="text-[10px]" style={{ color: C.t3, width: 80 }}>{v.sizeMB} MB</p>
                            <p className="text-[10px] font-mono" style={{ color: C.t3, width: 120 }}>{v.caseId || '⚠️ No case'}</p>
                            <p className="text-[10px] font-mono" style={{ color: C.t3, width: 100 }}>{v.uploadedBy}</p>
                            <p className="text-[10px]" style={{ color: C.t4, width: 100 }}>{v.date}</p>
                            <div style={{ width: 90 }}>
                                <Badge label={v.encrypted ? 'AES-256' : '⚠️ None'} color={v.encrypted ? C.jade : C.red} />
                            </div>
                            <p className="text-[11px] font-bold text-center" style={{ color: C.t2, width: 90 }}>{v.accessLog} views</p>
                            <div className="flex gap-1" style={{ width: 130 }}>
                                {v.flagged ? (
                                    <button onClick={() => setAccessModal(v)} className="px-2 py-1 rounded-lg text-[9px] border transition-colors" style={{ borderColor: C.red + '30', color: C.red, background: C.red + '08' }}>
                                        Request Access
                                    </button>
                                ) : (
                                    <button onClick={() => setAccessModal(v)} className="px-2 py-1 rounded-lg text-[9px] border hover:bg-white/8 transition-colors" style={{ borderColor: C.b0, color: C.t3 }}>
                                        Access Log
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {accessModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <Card className="w-full max-w-md p-6 shadow-2xl" style={{ borderColor: C.red + '40', boxShadow: '0 30px 80px rgba(0,0,0,0.8)' }}>
                        <p className="text-white font-bold text-base mb-1">🔐 Restricted File Access Request</p>
                        <p className="text-[11px] mb-5" style={{ color: C.t3 }}>{accessModal.id} · {accessModal.fileType} · {accessModal.sizeMB} MB</p>
                        <div className="space-y-3 mb-5">
                            <div>
                                <label className="text-[10px] uppercase tracking-wider font-bold block mb-1.5" style={{ color: C.t4 }}>Legal Justification</label>
                                <select className="w-full px-3 py-2.5 rounded-xl text-[11px] outline-none border" style={{ background: C.bg3, borderColor: C.b0, color: C.t2 }}>
                                    <option>Court Order / Subpoena</option>
                                    <option>Fraud Investigation</option>
                                    <option>Regulatory Requirement (ODPP/DCI)</option>
                                    <option>Internal Security Audit</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] uppercase tracking-wider font-bold block mb-1.5" style={{ color: C.t4 }}>Reference Number</label>
                                <input placeholder="e.g. Court Order No. HC/CR/001/2026" className="w-full px-3 py-2.5 rounded-xl text-[11px] outline-none border placeholder:text-white/15" style={{ background: C.bg3, borderColor: C.b0, color: 'white' }} />
                            </div>
                        </div>
                        <div className="p-3 rounded-xl mb-4 border" style={{ background: C.red + '08', borderColor: C.red + '25' }}>
                            <p className="text-[10px] font-bold" style={{ color: C.red }}>⚠️ This request will be logged with your identity, timestamp, and justification. Requires approval from a second Super Admin.</p>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => setAccessModal(null)} className="flex-1 py-2.5 rounded-xl text-xs font-bold border" style={{ borderColor: C.b0, color: C.t2 }}>Cancel</button>
                            <button onClick={() => setAccessModal(null)} className="flex-1 py-2.5 rounded-xl text-xs font-bold" style={{ background: C.red, color: 'white' }}>Submit Request</button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════
   7. MESSAGES (CONTROLLED)
═══════════════════════════════════════════ */
function MessagesView() {
    return (
        <div className="p-5 space-y-4 max-w-5xl mx-auto">
            <Card className="flex items-start gap-4 p-4" style={{ borderColor: C.blue + '25', background: C.blue + '04' }}>
                <span style={{ fontSize: 18 }}>🔒</span>
                <p className="text-[11px] leading-relaxed" style={{ color: C.t2 }}>
                    Admin access is limited to <strong style={{ color: 'white' }}>metadata and flagged messages only</strong>. Message content is protected by attorney-client privilege and Kenya Data Protection Act 2019. Content is only accessible via a verified legal order.
                </p>
            </Card>

            <div className="grid grid-cols-4 gap-4">
                {[
                    { label: 'Total Conversations', value: MESSAGE_LOGS.length, color: C.blue },
                    { label: 'Flagged', value: MESSAGE_LOGS.filter(m => m.flagged).length, color: C.red },
                    { label: 'Active Today', value: 312, color: C.jade },
                    { label: 'Total Messages', value: '48.2K', color: C.gold },
                ].map(({ label, value, color }, i) => (
                    <Card key={i} className="p-4 text-center">
                        <p className="text-2xl font-black mb-1" style={{ color, fontFamily: 'Georgia, serif' }}>{value}</p>
                        <p className="text-[10px]" style={{ color: C.t3 }}>{label}</p>
                    </Card>
                ))}
            </div>

            <Card className="overflow-hidden">
                <TableHead cols={[
                    { label: 'Thread ID', w: 90 }, { label: 'Parties', flex: 1 }, { label: 'Case', w: 120 },
                    { label: 'Messages', w: 90 }, { label: 'Last Activity', w: 110 },
                    { label: 'Encrypted', w: 90 }, { label: 'Status', w: 90 }, { label: 'Actions', w: 150 },
                ]} />
                <div className="divide-y" style={{ divideColor: C.b0 }}>
                    {MESSAGE_LOGS.map((m, i) => (
                        <div key={i} className="flex items-center gap-3 px-4 py-3.5 hover:bg-white/2 transition-colors"
                            style={{ background: m.flagged ? C.red + '05' : 'transparent' }}>
                            <p className="text-[10px] font-mono" style={{ color: C.t4, width: 90 }}>{m.id}</p>
                            <div className="flex-1 min-w-0">
                                <p className="text-[11px] font-medium" style={{ color: C.t1 }}>{m.parties}</p>
                                {m.flagged && <p className="text-[10px] mt-0.5" style={{ color: C.red }}>{m.reason}</p>}
                            </div>
                            <p className="text-[10px] font-mono" style={{ color: C.t3, width: 120 }}>{m.caseId || '—'}</p>
                            <p className="text-[11px] font-bold text-center" style={{ color: C.t2, width: 90 }}>{m.messageCount}</p>
                            <p className="text-[10px]" style={{ color: C.t3, width: 110 }}>{m.lastActivity}</p>
                            <div style={{ width: 90 }}>
                                <Badge label={m.encrypted ? 'E2E' : '⚠️ Plain'} color={m.encrypted ? C.jade : C.red} />
                            </div>
                            <div style={{ width: 90 }}>
                                <Badge label={m.flagged ? 'Flagged' : 'Normal'} color={m.flagged ? C.red : C.t3} dot={m.flagged} />
                            </div>
                            <div className="flex gap-1" style={{ width: 150 }}>
                                <button className="px-2 py-1 rounded-lg text-[9px] border hover:bg-white/8 transition-colors" style={{ borderColor: C.b0, color: C.t3 }}>Metadata</button>
                                {m.flagged && (
                                    <>
                                        <button className="px-2 py-1 rounded-lg text-[9px] border transition-colors" style={{ borderColor: C.red + '30', color: C.red, background: C.red + '08' }}>Investigate</button>
                                        <button className="px-2 py-1 rounded-lg text-[9px] border transition-colors" style={{ borderColor: C.amber + '30', color: C.amber, background: C.amber + '08' }}>Block</button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}

/* ═══════════════════════════════════════════
   8. PAYMENTS VIEW
═══════════════════════════════════════════ */
function PaymentsView() {
    const [refundModal, setRefundModal] = useState(null);

    return (
        <div className="p-5 space-y-5 max-w-screen-xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Revenue This Month', value: `KES ${(PLATFORM_STATS.revenueMonth / 1000000).toFixed(2)}M`, color: C.jade, sub: '+34.7% MoM' },
                    { label: 'Total Escrow', value: `KES ${(PLATFORM_STATS.escrowBalance / 1000000).toFixed(2)}M`, color: C.gold, sub: 'Protected balances' },
                    { label: 'Pending Payments', value: `KES ${(PLATFORM_STATS.pendingPayments / 1000000).toFixed(2)}M`, color: C.amber, sub: 'Awaiting milestone' },
                    { label: 'Disputed Transactions', value: TRANSACTIONS.filter(t => t.status === 'disputed').length, color: C.red, sub: 'Require resolution' },
                ].map(({ label, value, color, sub }, i) => (
                    <Card key={i} className="p-5">
                        <p className="text-[10px] uppercase tracking-wider font-bold mb-2" style={{ color: C.t4 }}>{label}</p>
                        <p className="text-2xl font-black text-white" style={{ fontFamily: 'Georgia, serif' }}>{value}</p>
                        <p className="text-[10px] mt-1 font-medium" style={{ color }}>{sub}</p>
                    </Card>
                ))}
            </div>

            {/* Disputed */}
            {TRANSACTIONS.filter(t => t.status === 'disputed').length > 0 && (
                <Card className="overflow-hidden" style={{ borderColor: C.red + '30' }}>
                    <div className="px-5 py-3.5 border-b flex items-center gap-2" style={{ borderColor: C.b0, background: C.red + '06' }}>
                        <span>⚠️</span>
                        <span className="text-white font-bold text-sm">Disputed Transactions</span>
                    </div>
                    {TRANSACTIONS.filter(t => t.status === 'disputed').map((tx, i) => (
                        <div key={i} className="flex items-center gap-4 px-5 py-4">
                            <div className="flex-1">
                                <p className="text-white font-semibold text-sm">{tx.desc}</p>
                                <p className="text-[10px]" style={{ color: C.t3 }}>From: {tx.from} · Case frozen · KES {tx.amount.toLocaleString()}</p>
                            </div>
                            <StatusBadge status="disputed" />
                            <div className="flex gap-2">
                                <button className="px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all" style={{ background: C.jade, color: 'white' }}>Release to Advocate</button>
                                <button className="px-3 py-1.5 rounded-xl text-[11px] font-bold border transition-all" style={{ background: C.blue + '15', borderColor: C.blue + '30', color: C.blue }}>Refund to Client</button>
                                <button className="px-3 py-1.5 rounded-xl text-[11px] font-bold border hover:bg-white/8 transition-colors" style={{ borderColor: C.b0, color: C.t2 }}>Investigate</button>
                            </div>
                        </div>
                    ))}
                </Card>
            )}

            {/* All transactions */}
            <Card className="overflow-hidden">
                <div className="px-5 py-3.5 border-b flex items-center justify-between" style={{ borderColor: C.b0 }}>
                    <span className="text-white font-semibold text-sm">Transaction Register</span>
                    <button className="flex items-center gap-1.5 text-[11px] font-semibold" style={{ color: C.gold }}>📥 Export CSV</button>
                </div>
                <TableHead cols={[
                    { label: 'Ref', w: 100 }, { label: 'Description', flex: 1 }, { label: 'From', w: 90 },
                    { label: 'To', w: 90 }, { label: 'Amount', w: 100 }, { label: 'Platform Fee', w: 100 },
                    { label: 'Date', w: 90 }, { label: 'Status', w: 90 }, { label: 'Actions', w: 110 },
                ]} />
                <div className="divide-y" style={{ divideColor: C.b0 }}>
                    {TRANSACTIONS.map((tx, i) => (
                        <div key={i} className="flex items-center gap-3 px-4 py-3.5 hover:bg-white/2 transition-colors"
                            style={{ background: tx.status === 'disputed' ? C.red + '04' : tx.status === 'failed' ? C.amber + '04' : 'transparent' }}>
                            <p className="text-[10px] font-mono" style={{ color: C.t4, width: 100 }}>{tx.id}</p>
                            <p className="text-[11px] flex-1" style={{ color: C.t2 }}>{tx.desc}</p>
                            <p className="text-[10px] font-mono" style={{ color: C.t3, width: 90 }}>{tx.from}</p>
                            <p className="text-[10px] font-mono" style={{ color: C.t3, width: 90 }}>{tx.to}</p>
                            <p className="text-[11px] font-bold" style={{ color: tx.amount > 0 ? C.jade : C.t3, width: 100 }}>
                                {tx.amount > 0 ? `KES ${tx.amount.toLocaleString()}` : '—'}
                            </p>
                            <p className="text-[11px]" style={{ color: C.gold, width: 100 }}>
                                {tx.platform > 0 ? `KES ${tx.platform.toLocaleString()}` : '—'}
                            </p>
                            <p className="text-[10px]" style={{ color: C.t4, width: 90 }}>{tx.date}</p>
                            <div style={{ width: 90 }}><StatusBadge status={tx.status} /></div>
                            <div className="flex gap-1" style={{ width: 110 }}>
                                {tx.status === 'escrow' && <button className="px-2 py-1 rounded-lg text-[9px] border transition-colors" style={{ borderColor: C.jade + '30', color: C.jade, background: C.jade + '08' }}>Release</button>}
                                {tx.status !== 'failed' && tx.status !== 'disputed' && (
                                    <button onClick={() => setRefundModal(tx)} className="px-2 py-1 rounded-lg text-[9px] border hover:bg-white/8 transition-colors" style={{ borderColor: C.b0, color: C.t3 }}>Refund</button>
                                )}
                                {tx.status === 'failed' && <button className="px-2 py-1 rounded-lg text-[9px] border transition-colors" style={{ borderColor: C.amber + '30', color: C.amber, background: C.amber + '08' }}>Retry</button>}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}

/* ═══════════════════════════════════════════
   9. AI CONTROL PANEL
═══════════════════════════════════════════ */
function AIView() {
    const [editRule, setEditRule] = useState(null);
    const [rules, setRules] = useState(AI_STATS.rules);

    return (
        <div className="p-5 space-y-5 max-w-screen-xl mx-auto">
            {/* AI stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Queries Today', value: AI_STATS.queriesToday.toLocaleString(), color: C.violet },
                    { label: 'Queries This Month', value: AI_STATS.queriesMonth.toLocaleString(), color: C.indigo },
                    { label: 'Avg. Response', value: `${AI_STATS.avgResponseMs}ms`, color: C.jade },
                    { label: 'Active Quality Flags', value: AI_STATS.qualityFlags.filter(f => !f.resolved).length, color: C.red },
                ].map(({ label, value, color }, i) => (
                    <Card key={i} className="p-5">
                        <p className="text-2xl font-black text-white mb-0.5" style={{ fontFamily: 'Georgia, serif' }}>{value}</p>
                        <p className="text-[10px]" style={{ color: C.t3 }}>{label}</p>
                    </Card>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-5">
                {/* Top topics */}
                <Card className="p-5">
                    <p className="text-white font-semibold text-sm mb-4">Most Queried Topics</p>
                    <div className="space-y-3">
                        {AI_STATS.topTopics.map(({ topic, count, pct }, i) => {
                            const colors = [C.gold, C.blue, C.jade, C.violet, C.amber, C.indigo, C.t3];
                            return (
                                <div key={i}>
                                    <div className="flex items-center justify-between mb-1">
                                        <p className="text-[11px]" style={{ color: C.t2 }}>{topic}</p>
                                        <div className="flex items-center gap-2">
                                            <p className="text-[10px]" style={{ color: C.t4 }}>{count.toLocaleString()}</p>
                                            <p className="text-[11px] font-bold" style={{ color: colors[i] }}>{pct}%</p>
                                        </div>
                                    </div>
                                    <MiniBar pct={pct} color={colors[i]} />
                                </div>
                            );
                        })}
                    </div>
                </Card>

                {/* Quality flags */}
                <Card className="overflow-hidden">
                    <div className="px-4 py-3 border-b flex items-center gap-2" style={{ borderColor: C.b0, background: C.red + '06' }}>
                        <span>🚨</span>
                        <span className="text-white font-bold text-sm">AI Quality Flags</span>
                        <span className="ml-auto px-2 py-0.5 rounded-full text-[9px] font-black" style={{ background: C.red + '25', color: C.red }}>
                            {AI_STATS.qualityFlags.filter(f => !f.resolved).length} active
                        </span>
                    </div>
                    <div className="divide-y" style={{ divideColor: C.b0 }}>
                        {AI_STATS.qualityFlags.map((flag, i) => (
                            <div key={i} className={`px-4 py-3.5 ${flag.resolved ? 'opacity-40' : ''}`}>
                                <div className="flex items-start justify-between mb-1">
                                    <p className="text-white text-[11px] font-semibold">{flag.issue}</p>
                                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                                        <SeverityBadge level={flag.severity} />
                                        {flag.resolved && <Badge label="Resolved" color={C.jade} />}
                                    </div>
                                </div>
                                <p className="text-[10px] leading-relaxed mb-2" style={{ color: C.t3 }}>{flag.detail}</p>
                                <div className="flex items-center justify-between">
                                    <p className="text-[9px]" style={{ color: C.t4 }}>{flag.count} occurrence{flag.count > 1 ? 's' : ''} · {flag.date}</p>
                                    {!flag.resolved && (
                                        <div className="flex gap-1">
                                            <button className="px-2 py-1 rounded-lg text-[9px] border transition-colors" style={{ borderColor: C.jade + '30', color: C.jade, background: C.jade + '08' }}>Fix Prompt</button>
                                            <button className="px-2 py-1 rounded-lg text-[9px] border hover:bg-white/8 transition-colors" style={{ borderColor: C.b0, color: C.t3 }}>Mark Resolved</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* AI Rules */}
            <Card className="overflow-hidden">
                <div className="px-5 py-3.5 border-b" style={{ borderColor: C.b0 }}>
                    <p className="text-white font-semibold text-sm">AI Governance Rules</p>
                    <p className="text-[10px] mt-0.5" style={{ color: C.t4 }}>Control AI behaviour, limits, and safety parameters. All changes are logged.</p>
                </div>
                <div className="divide-y" style={{ divideColor: C.b0 }}>
                    {rules.map((rule, i) => (
                        <div key={i} className="flex items-center justify-between px-5 py-3.5 hover:bg-white/2 transition-colors">
                            <div>
                                <p className="text-[11px] font-medium" style={{ color: C.t1 }}>{rule.label}</p>
                                <p className="text-[10px] font-mono" style={{ color: C.t4 }}>{rule.id}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 rounded-lg text-[11px] font-bold" style={{ background: C.violet + '18', color: C.violet }}>
                                    {editRule === i ? '...' : rule.value}
                                </span>
                                {rule.editable ? (
                                    <button onClick={() => setEditRule(editRule === i ? null : i)}
                                        className="px-2 py-1 rounded-lg text-[9px] border hover:bg-white/8 transition-colors" style={{ borderColor: C.b0, color: C.t3 }}>
                                        {editRule === i ? 'Save' : 'Edit'}
                                    </button>
                                ) : (
                                    <Badge label="Locked" color={C.t4} />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}

/* ═══════════════════════════════════════════
   10. ANALYTICS VIEW
═══════════════════════════════════════════ */
function AnalyticsView() {
    const weeklyUsers = [1820, 1940, 2010, 1890, 2140, 2340, 2580];
    const weeklyCases = [120, 134, 141, 128, 156, 178, 191];
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return (
        <div className="p-5 space-y-5 max-w-screen-xl mx-auto">
            {/* Chart grid */}
            <div className="grid lg:grid-cols-2 gap-5">
                {[
                    { title: 'Daily Active Users', data: weeklyUsers, color: C.blue, suffix: '' },
                    { title: 'Cases Created', data: weeklyCases, color: C.gold, suffix: '' },
                ].map(({ title, data, color }, ci) => {
                    const max = Math.max(...data);
                    return (
                        <Card key={ci} className="p-5">
                            <p className="text-white font-semibold text-sm mb-4">{title} — Last 7 Days</p>
                            <div className="flex items-end gap-2 h-28">
                                {data.map((v, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                                        <p className="text-[9px]" style={{ color: C.t4 }}>{v.toLocaleString()}</p>
                                        <div className="w-full rounded-t" style={{ height: `${(v / max) * 100}%`, background: color + (i === data.length - 1 ? 'ff' : '45'), minHeight: 4 }} />
                                        <p className="text-[9px]" style={{ color: C.t4 }}>{days[i]}</p>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Lawyer performance table */}
            <Card className="overflow-hidden">
                <div className="px-5 py-3.5 border-b flex items-center justify-between" style={{ borderColor: C.b0 }}>
                    <p className="text-white font-semibold text-sm">Advocate Leaderboard</p>
                    <button className="text-[11px] font-semibold" style={{ color: C.gold }}>📥 Export PDF</button>
                </div>
                <div className="divide-y" style={{ divideColor: C.b0 }}>
                    {LAWYERS.filter(l => l.verified === 'approved').sort((a, b) => b.winRate - a.winRate).map((l, i) => (
                        <div key={i} className="flex items-center gap-4 px-5 py-4 hover:bg-white/2 transition-colors">
                            <p className="text-lg font-black w-8 text-center" style={{ color: i === 0 ? C.gold : C.t3 }}>{i + 1}</p>
                            <div className="flex-1">
                                <p className="text-white text-[12px] font-semibold">{l.name}</p>
                                <p className="text-[10px]" style={{ color: C.t3 }}>{l.specialization} · {l.county}</p>
                            </div>
                            <div className="flex items-center gap-6 text-center">
                                {[
                                    { label: 'Win Rate', value: `${l.winRate}%`, color: l.winRate > 85 ? C.jade : l.winRate > 75 ? C.amber : C.red },
                                    { label: 'Rating', value: `⭐ ${l.rating}`, color: C.gold },
                                    { label: 'Cases', value: l.totalCases, color: C.blue },
                                    { label: 'Earnings', value: `KES ${(l.earnings / 1000).toFixed(0)}K`, color: C.jade },
                                    { label: 'Response', value: `${l.responseTime}m`, color: l.responseTime < 6 ? C.jade : C.amber },
                                ].map(({ label, value, color }, j) => (
                                    <div key={j} className="w-24">
                                        <p className="text-[13px] font-black" style={{ color, fontFamily: 'Georgia, serif' }}>{value}</p>
                                        <p className="text-[9px]" style={{ color: C.t4 }}>{label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* County distribution */}
            <Card className="p-5">
                <p className="text-white font-semibold text-sm mb-4">Case Distribution by County</p>
                <div className="grid grid-cols-4 gap-3">
                    {[
                        { county: 'Nairobi', cases: 1820, pct: 56 },
                        { county: 'Mombasa', cases: 412, pct: 13 },
                        { county: 'Kiambu', cases: 318, pct: 10 },
                        { county: 'Kisumu', cases: 224, pct: 7 },
                        { county: 'Nakuru', cases: 196, pct: 6 },
                        { county: 'Kilifi', cases: 128, pct: 4 },
                        { county: 'Machakos', cases: 84, pct: 3 },
                        { county: 'Other (40)', cases: 59, pct: 2 },
                    ].map(({ county, cases, pct }, i) => {
                        const colors = [C.blue, C.gold, C.jade, C.violet, C.amber, C.indigo, C.red, C.t3];
                        return (
                            <div key={i} className="p-3 rounded-xl" style={{ background: C.bg4 }}>
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-[11px] font-semibold" style={{ color: C.t1 }}>{county}</p>
                                    <p className="text-[11px] font-black" style={{ color: colors[i] }}>{pct}%</p>
                                </div>
                                <MiniBar pct={pct} color={colors[i]} />
                                <p className="text-[9px] mt-1.5" style={{ color: C.t4 }}>{cases.toLocaleString()} cases</p>
                            </div>
                        );
                    })}
                </div>
            </Card>
        </div>
    );
}

/* ═══════════════════════════════════════════
   11. COMPLIANCE VIEW
═══════════════════════════════════════════ */
function ComplianceView() {
    const [tab, setTab] = useState('audit');

    return (
        <div className="p-5 space-y-4 max-w-screen-xl mx-auto">
            <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ background: C.bg3 }}>
                {['audit', 'kyc', 'rbac'].map(t => (
                    <button key={t} onClick={() => setTab(t)}
                        className="px-4 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all"
                        style={{ background: tab === t ? C.red : 'transparent', color: tab === t ? 'white' : C.t3 }}>
                        {t === 'kyc' ? 'KYC Queue' : t === 'rbac' ? 'Access Roles' : 'Audit Log'}
                    </button>
                ))}
            </div>

            {tab === 'audit' && (
                <Card className="overflow-hidden">
                    <div className="px-5 py-3.5 border-b flex items-center justify-between" style={{ borderColor: C.b0 }}>
                        <div>
                            <p className="text-white font-semibold text-sm">Immutable Audit Trail</p>
                            <p className="text-[10px] mt-0.5" style={{ color: C.t4 }}>Every admin action is permanently recorded and cannot be deleted.</p>
                        </div>
                        <button className="text-[11px] font-semibold" style={{ color: C.gold }}>📥 Export</button>
                    </div>
                    <div className="divide-y" style={{ divideColor: C.b0 }}>
                        {AUDIT_LOG.map((log, i) => (
                            <div key={i} className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/2 transition-colors">
                                <span className="text-[10px] font-mono flex-shrink-0 w-28" style={{ color: C.t4 }}>{log.time}</span>
                                <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0`}
                                    style={{ background: { user: C.blue, lawyer: C.gold, payment: C.jade, ai: C.violet, vault: C.red, compliance: C.amber, settings: C.indigo, reports: C.t3, moderation: C.red }[log.category] + '20' }}>
                                    <span style={{ fontSize: 11 }}>{{ user: '👤', lawyer: '⚖️', payment: '💰', ai: '🤖', vault: '🔐', compliance: '🛡️', settings: '⚙️', reports: '📊', moderation: '🚨' }[log.category]}</span>
                                </div>
                                <p className="flex-1 text-[11px]" style={{ color: C.t2 }}>
                                    <span className="font-bold" style={{ color: C.t1 }}>{log.actor}</span>
                                    {' '}·{' '}{log.action}
                                    {' '}·{' '}<span className="font-mono text-[10px]" style={{ color: C.t3 }}>{log.target}</span>
                                </p>
                                <Badge label={log.category} color={{ user: C.blue, lawyer: C.gold, payment: C.jade, ai: C.violet, vault: C.red, compliance: C.amber, settings: C.indigo, reports: C.t3, moderation: C.red }[log.category] || C.t3} />
                                <SeverityBadge level={log.severity} />
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            {tab === 'kyc' && (
                <div className="space-y-3">
                    <p className="text-[11px]" style={{ color: C.t3 }}>KYC documents pending manual review or failed automatic verification.</p>
                    {USERS.filter(u => u.kyc !== 'verified').map((u, i) => (
                        <Card key={i} className="flex items-center gap-4 p-4">
                            <div className="w-9 h-9 rounded-full flex items-center justify-center font-black text-[11px] border"
                                style={{ background: C.blue + '20', borderColor: C.blue + '40', color: C.blue }}>
                                {u.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </div>
                            <div className="flex-1">
                                <p className="text-white font-semibold text-sm">{u.name}</p>
                                <p className="text-[10px]" style={{ color: C.t3 }}>{u.id} · {u.email} · Joined {u.joined}</p>
                            </div>
                            <StatusBadge status={u.kyc} />
                            <div className="flex gap-2">
                                {u.kyc === 'pending' && (
                                    <>
                                        <button className="px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all" style={{ background: C.jade, color: 'white' }}>✓ Verify</button>
                                        <button className="px-3 py-1.5 rounded-xl text-[11px] font-bold border transition-all" style={{ borderColor: C.red + '35', color: C.red, background: C.red + '10' }}>✗ Reject</button>
                                    </>
                                )}
                                {u.kyc === 'failed' && (
                                    <button className="px-3 py-1.5 rounded-xl text-[11px] font-bold border transition-all" style={{ borderColor: C.amber + '35', color: C.amber, background: C.amber + '10' }}>Re-request Docs</button>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {tab === 'rbac' && (
                <div className="space-y-4">
                    <p className="text-[11px] leading-relaxed" style={{ color: C.t3 }}>Role-based access control ensures each admin sees only what their role requires. Access grants are logged and cannot be self-assigned.</p>
                    {RBAC_ROLES.map((role, i) => (
                        <Card key={i} className="p-5" style={{ borderColor: role.color + '25' }}>
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center border" style={{ background: role.color + '18', borderColor: role.color + '30' }}>
                                        <span style={{ fontSize: 18 }}>{{ 'Super Admin': '👑', 'Compliance Officer': '🛡️', 'Finance Admin': '💰', 'Support Admin': '🎧' }[role.role]}</span>
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-sm">{role.role}</p>
                                        <p className="text-[11px]" style={{ color: C.t3 }}>Held by: {role.holder}</p>
                                    </div>
                                </div>
                                <button className="px-3 py-1.5 rounded-xl text-[11px] font-bold border hover:bg-white/8 transition-colors" style={{ borderColor: C.b0, color: C.t2 }}>Edit Permissions</button>
                            </div>
                            <p className="text-[11px] mb-3" style={{ color: C.t3 }}>{role.note}</p>
                            <div className="flex flex-wrap gap-2">
                                {(role.access[0] === 'all' ? ['All Modules', 'All Data', 'Full Control'] : role.access).map((a, j) => (
                                    <Badge key={j} label={a} color={role.color} />
                                ))}
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════
   12. MODERATION VIEW
═══════════════════════════════════════════ */
function ModerationView() {
    const [items, setItems] = useState(MODERATION_QUEUE);
    const [selected, setSelected] = useState(null);

    const action = (id, newStatus) => setItems(prev => prev.map(m => m.id === id ? { ...m, status: newStatus } : m));

    const statusColor = { open: C.red, actioned: C.jade, investigating: C.amber };

    return (
        <div className="flex h-full overflow-hidden">
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <div className="grid grid-cols-4 gap-4">
                    {[
                        { label: 'Open Reports', value: items.filter(m => m.status === 'open').length, color: C.red },
                        { label: 'Investigating', value: items.filter(m => m.status === 'investigating').length, color: C.amber },
                        { label: 'Actioned', value: items.filter(m => m.status === 'actioned').length, color: C.jade },
                        { label: 'Total Cases', value: items.length, color: C.t3 },
                    ].map(({ label, value, color }, i) => (
                        <Card key={i} className="p-4 text-center">
                            <p className="text-2xl font-black mb-1" style={{ color, fontFamily: 'Georgia, serif' }}>{value}</p>
                            <p className="text-[10px]" style={{ color: C.t3 }}>{label}</p>
                        </Card>
                    ))}
                </div>

                <div className="space-y-3">
                    {items.map((m, i) => (
                        <Card key={i} className="p-5 cursor-pointer hover:border-white/12 transition-colors"
                            style={{ borderColor: m.severity === 'critical' ? C.red + '35' : C.b0, background: m.status === 'open' && m.severity === 'critical' ? C.red + '05' : C.bg3 }}
                            onClick={() => setSelected(m)}>
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: { 'Abuse Report': C.amber, 'Fraud Attempt': C.red, 'Illegal Document Upload': C.red, 'Out-of-Platform Transaction': C.red, 'Negative Review Manipulation': C.violet }[m.type] + '20' }}>
                                        <span style={{ fontSize: 14 }}>{{ 'Abuse Report': '⚠️', 'Fraud Attempt': '🚨', 'Illegal Document Upload': '🚫', 'Out-of-Platform Transaction': '💸', 'Negative Review Manipulation': '⭐' }[m.type]}</span>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="text-white font-bold text-sm">{m.type}</p>
                                            <SeverityBadge level={m.severity} />
                                            <Badge label={m.status} color={statusColor[m.status] || C.t3} dot={m.status === 'open'} />
                                        </div>
                                        <p className="text-[10px] mt-0.5" style={{ color: C.t3 }}>Against: <span style={{ color: C.red }}>{m.against}</span> · Reported by: {m.reporter} · {m.time}</p>
                                    </div>
                                </div>
                                <span className="text-[10px] font-mono" style={{ color: C.t4 }}>{m.id}</span>
                            </div>
                            <p className="text-[11px] leading-relaxed mb-3" style={{ color: C.t2 }}>{m.detail}</p>
                            <p className="text-[10px] mb-3" style={{ color: C.t4 }}>Evidence: <span style={{ color: C.t2 }}>{m.evidence}</span></p>
                            {m.status === 'open' && (
                                <div className="flex gap-2">
                                    <button onClick={e => { e.stopPropagation(); action(m.id, 'investigating'); }} className="px-3 py-1.5 rounded-xl text-[11px] font-bold border transition-all" style={{ borderColor: C.amber + '35', color: C.amber, background: C.amber + '10' }}>🔍 Investigate</button>
                                    <button onClick={e => { e.stopPropagation(); action(m.id, 'actioned'); }} className="px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all" style={{ background: C.red, color: 'white' }}>⚡ Take Action</button>
                                    <button className="px-3 py-1.5 rounded-xl text-[11px] font-bold border hover:bg-white/8 transition-colors" style={{ borderColor: C.b0, color: C.t2 }}>Warn User</button>
                                    <button className="px-3 py-1.5 rounded-xl text-[11px] font-bold border transition-all" style={{ borderColor: C.amber + '30', color: C.amber, background: C.amber + '08' }}>Suspend</button>
                                    <button className="px-3 py-1.5 rounded-xl text-[11px] font-bold border transition-all" style={{ borderColor: C.red + '30', color: C.red, background: C.red + '08' }}>🚫 Ban</button>
                                </div>
                            )}
                            {m.status === 'investigating' && (
                                <div className="flex gap-2">
                                    <button onClick={e => { e.stopPropagation(); action(m.id, 'actioned'); }} className="px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all" style={{ background: C.red, color: 'white' }}>Mark Actioned</button>
                                    <button onClick={e => { e.stopPropagation(); action(m.id, 'open'); }} className="px-3 py-1.5 rounded-xl text-[11px] font-bold border hover:bg-white/8 transition-colors" style={{ borderColor: C.b0, color: C.t2 }}>Reopen</button>
                                </div>
                            )}
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   13. SETTINGS VIEW
═══════════════════════════════════════════ */
function SettingsView() {
    const [toggles, setToggles] = useState({
        aiAssistant: true, emergencyButton: true, lawyerMarketplace: true,
        documentGen: true, virtualHearings: true, maintenanceMode: false,
        newRegistrations: true, mobileApp: true,
    });

    const Toggle = ({ id, label, desc }) => (
        <div className="flex items-center justify-between py-4 border-b" style={{ borderColor: C.b0 }}>
            <div>
                <p className="text-white text-[12px] font-semibold">{label}</p>
                {desc && <p className="text-[10px] mt-0.5" style={{ color: C.t4 }}>{desc}</p>}
            </div>
            <button onClick={() => setToggles(t => ({ ...t, [id]: !t[id] }))}
                className="w-10 h-5.5 rounded-full flex items-center transition-all relative"
                style={{ background: toggles[id] ? C.jade : C.b0, border: `1px solid ${toggles[id] ? C.jade : C.b1}`, height: 22, padding: '2px' }}>
                <div className="w-4 h-4 rounded-full transition-all" style={{ background: 'white', transform: `translateX(${toggles[id] ? 18 : 0}px)`, width: 16, height: 16 }} />
            </button>
        </div>
    );

    return (
        <div className="p-5 space-y-5 max-w-3xl mx-auto">
            {/* Pricing */}
            <Card className="p-5">
                <p className="text-white font-semibold text-sm mb-4">Credit & Pricing Model</p>
                <div className="space-y-3">
                    {[
                        { label: 'Basic AI Query', value: '5 credits', editable: true },
                        { label: 'Complex AI Query', value: '20 credits', editable: true },
                        { label: 'Document Generation', value: '30–100 credits', editable: true },
                        { label: 'Platform Commission', value: '10% of lawyer fee', editable: true },
                        { label: 'Emergency Button', value: 'Always FREE', editable: false },
                        { label: '100 Credits Pack', value: 'KES 1,000', editable: true },
                    ].map(({ label, value, editable }, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b" style={{ borderColor: C.b0 }}>
                            <p className="text-[11px]" style={{ color: C.t2 }}>{label}</p>
                            <div className="flex items-center gap-2">
                                <span className="px-3 py-1 rounded-lg text-[11px] font-bold" style={{ background: C.gold + '18', color: C.gold }}>{value}</span>
                                {editable && <button className="text-[10px] border px-2 py-0.5 rounded hover:bg-white/8 transition-colors" style={{ borderColor: C.b0, color: C.t3 }}>Edit</button>}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Feature toggles */}
            <Card className="p-5">
                <p className="text-white font-semibold text-sm mb-1">Feature Toggles</p>
                <p className="text-[10px] mb-4" style={{ color: C.t4 }}>Enable or disable platform modules. Changes take effect immediately. All toggle actions are audit-logged.</p>
                {[
                    { id: 'aiAssistant', label: 'AI Legal Assistant', desc: 'Veritex AI query engine for citizens and lawyers' },
                    { id: 'emergencyButton', label: 'Emergency Legal Button', desc: 'Always-free emergency access — CANNOT be disabled in production' },
                    { id: 'lawyerMarketplace', label: 'Lawyer Marketplace', desc: 'Case request intake and lawyer matching' },
                    { id: 'documentGen', label: 'AI Document Generation', desc: 'Automated legal document drafting' },
                    { id: 'virtualHearings', label: 'Virtual Hearings Module', desc: 'Secure video conferencing for court hearings' },
                    { id: 'newRegistrations', label: 'New User Registrations', desc: 'Disable to pause onboarding during maintenance' },
                    { id: 'mobileApp', label: 'Mobile App Access', desc: 'iOS and Android app API access' },
                    { id: 'maintenanceMode', label: '⚠️ Maintenance Mode', desc: 'Puts platform in read-only mode for all users' },
                ].map(t => <Toggle key={t.id} {...t} />)}
            </Card>

            {/* Subscription plans */}
            <Card className="p-5">
                <p className="text-white font-semibold text-sm mb-4">Subscription Plans</p>
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { name: 'Free', price: 'KES 0', features: '50 AI credits · Basic documents · Emergency button', color: C.t3 },
                        { name: 'Standard', price: 'KES 500/mo', features: '300 credits · All document types · Case tracking', color: C.blue },
                        { name: 'Pro', price: 'KES 1,500/mo', features: '1,000 credits · Priority lawyers · Analytics · API access', color: C.gold },
                    ].map(({ name, price, features, color }, i) => (
                        <div key={i} className="p-4 rounded-xl border" style={{ background: C.bg4, borderColor: color + '30' }}>
                            <p className="font-black text-white text-base mb-0.5">{name}</p>
                            <p className="font-bold mb-2" style={{ color }}>{price}</p>
                            <p className="text-[10px] leading-relaxed" style={{ color: C.t4 }}>{features}</p>
                            <button className="mt-3 w-full py-1.5 rounded-lg text-[10px] font-bold border hover:bg-white/8 transition-colors" style={{ borderColor: C.b0, color: C.t2 }}>Edit Plan</button>
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
export default function AdminDashboard() {
    const [active, setActive] = useState('overview');

    const fullHeight = ['users', 'cases', 'messages', 'vault'].includes(active);

    const renderView = () => {
        switch (active) {
            case 'overview': return <OverviewView setActive={setActive} />;
            case 'users': return <UsersView />;
            case 'lawyers': return <LawyersView />;
            case 'cases': return <CasesView />;
            case 'documents': return <DocumentsView />;
            case 'vault': return <VaultView />;
            case 'messages': return <MessagesView />;
            case 'payments': return <PaymentsView />;
            case 'ai': return <AIView />;
            case 'analytics': return <AnalyticsView />;
            case 'compliance': return <ComplianceView />;
            case 'moderation': return <ModerationView />;
            case 'settings': return <SettingsView />;
            default: return <OverviewView setActive={setActive} />;
        }
    };

    return (
        <div className="flex h-screen overflow-hidden"
            style={{ background: C.bg0, color: 'white', fontFamily: "'DM Sans', system-ui, sans-serif" }}>

            {/* Scan-line texture for command-center feel */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.015]"
                style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 3px)', backgroundSize: '100% 3px' }} />

            <Sidebar active={active} setActive={setActive} />

            <div className="flex-1 flex flex-col overflow-hidden relative z-10">
                <TopBar active={active} />
                <main className={`flex-1 ${fullHeight ? 'overflow-hidden' : 'overflow-y-auto'}`}
                    style={{ background: C.bg1 }}>
                    {renderView()}
                </main>

                {/* Status footer */}
                <div className="flex items-center gap-6 px-6 py-2 border-t" style={{ borderColor: C.b0, background: C.bg2 }}>
                    {[
                        { label: 'Platform', value: 'Operational', color: C.jade },
                        { label: 'AI Engine', value: '99.8% uptime', color: C.jade },
                        { label: 'Vault', value: 'Secure', color: C.jade },
                        { label: 'Gateway', value: 'Degraded', color: C.amber },
                    ].map(({ label, value, color }, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                            <span className="text-[10px]" style={{ color: C.t4 }}>{label}:</span>
                            <span className="text-[10px] font-semibold" style={{ color }}>{value}</span>
                        </div>
                    ))}
                    <span className="ml-auto text-[9px] font-mono" style={{ color: C.t5 }}>Veritex Admin v2.1.0 · All actions logged · GDPR compliant</span>
                </div>
            </div>
        </div>
    );
}