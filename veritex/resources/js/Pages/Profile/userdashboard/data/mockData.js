export const CASES = [
  {
    id: 'KE-2026-4902', type: 'Land Dispute', status: 'active', stage: 'Hearing',
    opponent: 'Kimani Properties Ltd', court: 'Environment & Land Court, Milimani',
    filed: '2026-01-14', nextHearing: '2026-05-12', advocate: 'Njeri Kamau',
    advocateInitials: 'NK', advocateColor: '#D4AF37', confidence: 91,
    progress: 55, urgency: 'high',
    timeline: [
      { label: 'Plaint Filed', date: 'Jan 14', done: true },
      { label: 'Service Effected', date: 'Jan 22', done: true },
      { label: 'Directions Hearing', date: 'Feb 8', done: true },
      { label: 'Interlocutory Injunction', date: 'Mar 3', done: true },
      { label: 'Full Hearing', date: 'May 12', done: false, active: true },
      { label: 'Judgment', date: 'TBD', done: false },
    ],
    docs: ['Plaint', 'Verifying Affidavit', 'Land Search', 'Title Deed Copy'],
    evidence: ['title_deed_scan.pdf', 'survey_map.jpg', 'witness_statement.mp4'],
    payments: { total: 85000, paid: 51000, next: 25500, nextDue: '2026-05-10' },
  },
  {
    id: 'KE-2026-3117', type: 'Wrongful Dismissal', status: 'active', stage: 'Mediation',
    opponent: 'Apex Finance Ltd', court: 'Employment & Labour Relations Court',
    filed: '2026-02-28', nextHearing: '2026-05-19', advocate: 'Amina Mwangi',
    advocateInitials: 'AM', advocateColor: '#6366F1', confidence: 87,
    progress: 30, urgency: 'medium',
    timeline: [
      { label: 'Memorandum Filed', date: 'Feb 28', done: true },
      { label: 'Respondent Served', date: 'Mar 10', done: true },
      { label: 'Mediation Scheduled', date: 'May 19', done: false, active: true },
      { label: 'Hearing (if no settlement)', date: 'Jun 30', done: false },
      { label: 'Award / Judgment', date: 'TBD', done: false },
    ],
    docs: ['Statement of Claim', 'Employment Contract', 'Termination Letter'],
    evidence: ['payslip_march.jpg', 'email_thread.pdf', 'witness_audio.mp3'],
    payments: { total: 45000, paid: 13500, next: 13500, nextDue: '2026-05-19' },
  },
  {
    id: 'KE-2026-1088', type: 'Debt Recovery', status: 'concluded', stage: 'Judgment Enforced',
    opponent: 'Baraka Trading Co', court: 'Chief Magistrate\'s Court, Milimani',
    filed: '2025-11-02', nextHearing: null, advocate: 'James Odhiambo',
    advocateInitials: 'JO', advocateColor: '#10B981', confidence: 100,
    progress: 100, urgency: 'low',
    timeline: [
      { label: 'Suit Filed', date: 'Nov 2', done: true },
      { label: 'Default Judgment', date: 'Dec 5', done: true },
      { label: 'Decree Extracted', date: 'Dec 12', done: true },
      { label: 'Execution Levied', date: 'Jan 18', done: true },
      { label: 'KES 4.2M Recovered', date: 'Feb 3', done: true },
    ],
    docs: ['Plaint', 'Agreement', 'Decree', 'Proclamation'],
    evidence: [],
    payments: { total: 32000, paid: 32000, next: 0, nextDue: null },
  },
];

export const MESSAGES = [
  {
    id: 1, from: 'Njeri Kamau', initials: 'NK', color: '#D4AF37', time: '10:32 AM', unread: 2, caseId: 'KE-2026-4902',
    preview: 'The hearing on 12th May is confirmed. Please ensure...',
    thread: [
      { sender: 'Njeri Kamau', text: 'Good morning. I have reviewed the respondent\'s replying affidavit filed yesterday. They are challenging the authenticity of your title — we will need a certified copy of the original deed from the Land Registry.', time: '9:14 AM', mine: false },
      { sender: 'You', text: 'Understood. I can go to Ardhi House today. Should I request a historical search as well?', time: '9:31 AM', mine: true },
      { sender: 'Njeri Kamau', text: 'Yes — a 30-year historical search is ideal. Also request a copy of the mutation form. That will close their argument entirely.', time: '9:47 AM', mine: false },
      { sender: 'You', text: 'Got it. I will submit both today and share the PDFs here.', time: '10:02 AM', mine: true },
      { sender: 'Njeri Kamau', text: 'The hearing on 12th May is confirmed at 9:00 AM, Court 4. Please ensure you are there by 8:30. I will meet you outside the registry.', time: '10:32 AM', mine: false },
    ]
  },
  {
    id: 2, from: 'Amina Mwangi', initials: 'AM', color: '#6366F1', time: 'Yesterday', unread: 0, caseId: 'KE-2026-3117',
    preview: 'The employer has indicated willingness to settle at...',
    thread: [
      { sender: 'Amina Mwangi', text: 'Update on the mediation: The employer has indicated willingness to settle at 8 months\' salary. Given the strength of your contract evidence, I recommend we counter at 12 months plus NSSF arrears.', time: 'Yesterday 3:15 PM', mine: false },
      { sender: 'You', text: 'That sounds right. What is the risk if they reject and we go to full hearing?', time: 'Yesterday 3:44 PM', mine: true },
      { sender: 'Amina Mwangi', text: 'The risk is low. Section 49 of the Employment Act gives the court discretion to award up to 12 months. Your unsigned "probation" clause is fatal to their defence.', time: 'Yesterday 4:02 PM', mine: false },
    ]
  },
];

export const AI_MESSAGES = [
  { role: 'assistant', text: 'Hello. I am your Veritex AI Legal Assistant, trained on the Constitution of Kenya, all Acts of Parliament, and over a decade of Kenyan case law. How can I assist you today?', thinking: null },
];

export const COURTS = [
  { name: 'Milimani Law Courts', type: 'court', lat: 1.2921, lng: 36.8219, x: 52, y: 44, division: 'High Court, Commercial, Family, Environment & Land' },
  { name: 'Makadara Law Courts', type: 'court', lat: 1.2867, lng: 36.8545, x: 72, y: 51, division: 'Magistrates\' Court' },
  { name: 'Kibera Law Courts', type: 'court', lat: 1.3133, lng: 36.7900, x: 28, y: 38, division: 'Magistrates\' Court' },
  { name: 'Nairobi DCI Headquarters', type: 'police', lat: 1.2966, lng: 36.8219, x: 51, y: 40, division: 'Directorate of Criminal Investigations' },
  { name: 'Central Police Station', type: 'police', lat: 1.2841, lng: 36.8205, x: 50, y: 56, division: 'Administration Police' },
  { name: 'Gigiri Police Station', type: 'police', lat: 1.2340, lng: 36.8050, x: 44, y: 25, division: 'Administration Police' },
  { name: 'Westlands Police Station', type: 'police', lat: 1.2637, lng: 36.8050, x: 40, y: 33, division: 'Kenya Police Service' },
  { name: 'ELRC Nairobi', type: 'court', lat: 1.2980, lng: 36.8180, x: 48, y: 39, division: 'Employment & Labour Relations Court' },
];

export const DOCUMENTS = [
  { name: 'Demand Letter — Kimani Properties', type: 'generated', date: '2026-01-10', status: 'signed', size: '42 KB', caseId: 'KE-2026-4902', icon: 'letter' },
  { name: 'Replying Affidavit — ELC', type: 'generated', date: '2026-03-18', status: 'filed', size: '118 KB', caseId: 'KE-2026-4902', icon: 'affidavit' },
  { name: 'Statement of Claim — Wrongful Dismissal', type: 'generated', date: '2026-02-25', status: 'filed', size: '86 KB', caseId: 'KE-2026-3117', icon: 'claim' },
  { name: 'Employment Contract Analysis', type: 'ai-analysis', date: '2026-02-20', status: 'ready', size: '24 KB', caseId: 'KE-2026-3117', icon: 'analysis' },
  { name: 'Land Search Certificate', type: 'uploaded', date: '2026-01-15', status: 'verified', size: '2.1 MB', caseId: 'KE-2026-4902', icon: 'official' },
];

export const DOC_TEMPLATES = [
  { name: 'Demand Letter', desc: 'Formal notice of breach with 14/30-day compliance demand', credits: 30, time: '45 sec', icon: '📋' },
  { name: 'Affidavit', desc: 'Sworn statement for court filing — any division', credits: 40, time: '1 min', icon: '📜' },
  { name: 'Sale Agreement', desc: 'Property or goods sale with standard warranties', credits: 60, time: '2 min', icon: '🏠' },
  { name: 'Employment Contract', desc: 'Kenya Employment Act 2007 compliant contract', credits: 50, time: '90 sec', icon: '💼' },
  { name: 'Cease & Desist', desc: 'IP, defamation, harassment — all grounds', credits: 35, time: '60 sec', icon: '🛑' },
  { name: 'Will & Testament', desc: 'Testamentary disposition — Kenya Succession Act', credits: 80, time: '3 min', icon: '⚖️' },
  { name: 'Tenancy Agreement', desc: 'Landlord & Tenant Act compliant lease', credits: 45, time: '90 sec', icon: '🔑' },
  { name: 'Loan Agreement', desc: 'Interest, repayment schedule, default clauses', credits: 55, time: '2 min', icon: '💰' },
];

export const PAYMENTS = [
  {
    caseId: 'KE-2026-4902', label: 'Land Dispute · Njeri Kamau',
    total: 85000, paid: 51000, currency: 'KES',
    milestones: [
      { label: 'Consultation', pct: 20, amount: 17000, paid: true, date: 'Jan 10' },
      { label: 'Case Filing', pct: 30, amount: 25500, paid: true, date: 'Jan 14' },
      { label: 'Hearing Fee', pct: 30, amount: 25500, paid: false, due: 'May 10', active: true },
      { label: 'Judgment', pct: 20, amount: 17000, paid: false, due: 'TBD' },
    ],
  },
  {
    caseId: 'KE-2026-3117', label: 'Wrongful Dismissal · Amina Mwangi',
    total: 45000, paid: 13500, currency: 'KES',
    milestones: [
      { label: 'Consultation', pct: 20, amount: 9000, paid: true, date: 'Feb 20' },
      { label: 'Case Filing', pct: 30, amount: 13500, paid: true, date: 'Feb 28' },
      { label: 'Mediation Prep', pct: 30, amount: 13500, paid: false, due: 'May 19', active: true },
      { label: 'Outcome', pct: 20, amount: 9000, paid: false, due: 'TBD' },
    ],
  },
];
