import { Head, Link } from '@inertiajs/react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import {
    Brain, Scale, FileText, Gavel, Shield, AlertTriangle,
    CreditCard, BookOpen, ArrowRight, ChevronDown, Check,
    Users, Star, BadgeCheck, Lock, Globe, Zap, MessageSquare,
    Phone, MapPin, Clock, TrendingUp, CheckCircle, Play,
    Sparkles, Activity, Layers, Search, Upload, Bell,
    Building2, Heart, Landmark, Award, ExternalLink,
    ChevronRight, BarChart2, Hash, Coins,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const GOLD = '#D4AF37';
const DARK = '#12141f';
const DARK2 = '#1a1d2e';

/* ─────────────────────────────────────────────
   ANIMATION HELPERS
───────────────────────────────────────────── */
const fadeUp = {
    hidden: { opacity: 0, y: 44 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};
const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.7 } },
};
const scaleIn = {
    hidden: { opacity: 0, scale: 0.88 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};
const slideLeft = {
    hidden: { opacity: 0, x: -56 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};
const slideRight = {
    hidden: { opacity: 0, x: 56 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = (d = 0.1) => ({
    hidden: {},
    visible: { transition: { staggerChildren: d } },
});

function useReveal(amount = 0.15) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount });
    return [ref, inView];
}

/* ─────────────────────────────────────────────
   MICRO COMPONENTS
───────────────────────────────────────────── */

function GlowOrb({ color, size, top, left, right, bottom, blur = 180, opacity = 0.12 }) {
    return (
        <div className="absolute rounded-full pointer-events-none"
            style={{ background: color, width: size, height: size, top, left, right, bottom, filter: `blur(${blur}px)`, opacity }} />
    );
}

function GridLines() {
    return (
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
            style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)`,
                backgroundSize: '64px 64px',
            }} />
    );
}

function FloatingDots({ n = 14 }) {
    const dots = Array.from({ length: n }, (_, i) => ({
        id: i, x: Math.random() * 100, y: Math.random() * 100,
        size: Math.random() * 2.5 + 1,
        dur: Math.random() * 10 + 7,
        delay: Math.random() * 4,
        color: i % 3 === 0 ? 'rgba(212,175,55,0.4)' : i % 3 === 1 ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.1)',
    }));
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {dots.map(d => (
                <motion.div key={d.id} className="absolute rounded-full"
                    style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.size, height: d.size, background: d.color }}
                    animate={{ y: [0, -30, 0], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: 'easeInOut' }} />
            ))}
        </div>
    );
}

function SectionLabel({ children }) {
    return (
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/5 mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em]">{children}</span>
        </div>
    );
}

function PrimaryBtn({ children, href, onClick }) {
    const cls = "group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#D4AF37] hover:bg-[#c9a430] text-[#12141f] font-black text-sm transition-all shadow-xl shadow-[#D4AF37]/20 hover:shadow-[#D4AF37]/40";
    if (href) return (
        <Link href={href} className={cls}>
            {children}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
    );
    return (
        <button onClick={onClick} className={cls}>
            {children}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
    );
}

function GhostBtn({ children, href }) {
    return (
        <Link href={href || '#'}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/12 text-white/60 hover:text-white hover:border-white/25 font-medium text-sm transition-all backdrop-blur-sm">
            {children}
        </Link>
    );
}

/* ─────────────────────────────────────────────
   SECTION 1 — HERO
───────────────────────────────────────────── */
function HeroSection({ auth }) {
    const { scrollY } = useScroll();
    const yOrb = useTransform(scrollY, [0, 500], [0, -60]);
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);

    const words = ['Legal Services,', 'Simplified for', 'Everyone.'];

    return (
        <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden pt-24 pb-16">
            <GlowOrb color="#D4AF37" size="700px" top="-15%" left="-10%" opacity={0.1} blur={220} />
            <GlowOrb color="#6366F1" size="500px" top="30%" right="-10%" opacity={0.09} blur={200} />
            <GlowOrb color="#D4AF37" size="300px" bottom="0%" left="50%" opacity={0.07} blur={150} />
            <GridLines />
            <FloatingDots n={20} />

            <motion.div style={{ opacity }} className="relative z-10 max-w-7xl mx-auto px-6 w-full">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left */}
                    <motion.div initial="hidden" animate="visible" variants={stagger(0.12)} className="text-center lg:text-left">
                        <motion.div variants={fadeUp}>
                            <SectionLabel>Veritex Platform · All Services</SectionLabel>
                        </motion.div>

                        <div className="overflow-hidden mb-6">
                            {words.map((word, i) => (
                                <div key={i} className="overflow-hidden">
                                    <motion.h1
                                        initial={{ y: '110%' }}
                                        animate={{ y: 0 }}
                                        transition={{ duration: 0.9, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                                        className={`block font-heading font-black leading-[1.05] tracking-tight ${i === 0 ? 'text-5xl lg:text-7xl text-white' :
                                                i === 1 ? 'text-5xl lg:text-7xl text-white' :
                                                    'text-5xl lg:text-7xl text-gradient'
                                            }`}
                                    >
                                        {word}
                                    </motion.h1>
                                </div>
                            ))}
                        </div>

                        <motion.p variants={fadeUp} className="text-white/55 text-base lg:text-lg leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
                            From asking a simple legal question to filing a court case and hiring a verified advocate —
                            Veritex gives you <span className="text-white/85 font-semibold">complete control of your legal journey</span>, in plain language, 24/7.
                        </motion.p>

                        <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center lg:justify-start">
                            <PrimaryBtn href={auth?.user ? route('cases.create') : route('register')}>
                                Start a Case
                            </PrimaryBtn>
                            <GhostBtn href="#">
                                <Brain className="w-4 h-4 text-[#D4AF37]" /> Ask Veritas AI
                            </GhostBtn>
                            <GhostBtn href="#">
                                <Scale className="w-4 h-4" /> Find a Lawyer
                            </GhostBtn>
                        </motion.div>

                        {/* Trust row */}
                        <motion.div variants={fadeUp} className="mt-10 flex items-center gap-6 justify-center lg:justify-start">
                            {[
                                { icon: Shield, label: 'AES-256 Encrypted' },
                                { icon: BadgeCheck, label: 'LSK Verified Lawyers' },
                                { icon: Lock, label: 'Court-Admissible' },
                            ].map(({ icon: Icon, label }, i) => (
                                <div key={i} className="flex items-center gap-1.5">
                                    <Icon className="w-3.5 h-3.5 text-[#D4AF37]/70" />
                                    <span className="text-white/35 text-xs font-medium">{label}</span>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right — animated services preview */}
                    <motion.div
                        style={{ y: yOrb }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="relative hidden lg:block"
                    >
                        <div className="absolute -inset-6 rounded-[2.5rem] bg-[#D4AF37]/6 blur-3xl" />
                        <div className="relative rounded-3xl border border-white/8 bg-[#1a1d2e]/80 backdrop-blur-xl p-7 shadow-2xl shadow-black/50">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2.5">
                                    <div className="p-2 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20">
                                        <Scale className="w-5 h-5 text-[#D4AF37]" />
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-sm">Veritex Platform</p>
                                        <p className="text-white/30 text-[10px]">8 integrated services</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                    <span className="text-green-400 text-[10px] font-bold">All Systems Online</span>
                                </div>
                            </div>

                            {/* Service pills */}
                            <div className="grid grid-cols-2 gap-2.5 mb-5">
                                {[
                                    { icon: Brain, label: 'AI Legal Assistant', color: 'text-[#D4AF37]', bg: 'bg-[#D4AF37]/10', active: true },
                                    { icon: Users, label: 'Find a Lawyer', color: 'text-purple-400', bg: 'bg-purple-500/10', active: false },
                                    { icon: Scale, label: 'Case Management', color: 'text-blue-400', bg: 'bg-blue-500/10', active: true },
                                    { icon: Gavel, label: 'Court Services', color: 'text-pink-400', bg: 'bg-pink-500/10', active: false },
                                    { icon: FileText, label: 'Documents', color: 'text-green-400', bg: 'bg-green-500/10', active: false },
                                    { icon: Shield, label: 'Evidence Vault', color: 'text-cyan-400', bg: 'bg-cyan-500/10', active: false },
                                ].map(({ icon: Icon, label, color, bg, active }, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.7 + i * 0.08 }}
                                        className={`flex items-center gap-2.5 p-3 rounded-xl border transition-all ${active ? 'border-[#D4AF37]/25 bg-[#D4AF37]/5' : 'border-white/5 bg-white/3'}`}
                                    >
                                        <div className={`w-7 h-7 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
                                            <Icon className={`w-3.5 h-3.5 ${color}`} />
                                        </div>
                                        <span className={`text-xs font-semibold ${active ? 'text-white/85' : 'text-white/45'}`}>{label}</span>
                                        {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />}
                                    </motion.div>
                                ))}
                            </div>

                            {/* Live query */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.4 }}
                                className="p-4 rounded-2xl bg-[#0e1019] border border-[#D4AF37]/15"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                                    <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest">Veritas AI — Live</span>
                                </div>
                                <p className="text-white/60 text-xs mb-2">"My employer dismissed me 4 days after I filed an HR complaint. Is this legal?"</p>
                                <div className="h-px bg-white/5 my-2" />
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 2 }}
                                    className="text-[#D4AF37]/80 text-xs leading-relaxed"
                                >
                                    This appears to be <strong>retaliatory dismissal</strong> under Section 45 of Kenya's Employment Act 2007. You have grounds to file an unfair dismissal claim at the ELRC within 3 months. Shall I connect you with an advocate?
                                </motion.p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll hint */}
            <motion.div style={{ opacity }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                <span className="text-[10px] text-white/20 uppercase tracking-[0.2em]">Explore services</span>
                <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <ChevronDown className="w-4 h-4 text-white/20" />
                </motion.div>
            </motion.div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   SECTION 2 — STAT STRIP
───────────────────────────────────────────── */
function StatStrip() {
    const [ref, inView] = useReveal(0.3);
    const stats = [
        { value: '8', suffix: '', label: 'Integrated Services', icon: Layers },
        { value: '24', suffix: '/7', label: 'AI Legal Assistance', icon: Brain },
        { value: '100', suffix: '+', label: 'Verified Advocates', icon: BadgeCheck },
        { value: '47', suffix: '', label: 'Kenya Counties Covered', icon: MapPin },
    ];
    return (
        <div ref={ref} className="relative py-6 border-y border-white/5 bg-[#0e1019]/60 backdrop-blur-sm overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/3 via-transparent to-[#6366F1]/3" />
            <motion.div
                initial="hidden" animate={inView ? 'visible' : 'hidden'}
                variants={stagger(0.1)}
                className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:divide-x divide-white/5"
            >
                {stats.map(({ value, suffix, label, icon: Icon }, i) => (
                    <motion.div key={i} variants={fadeUp} className="text-center px-4 py-2">
                        <Icon className="w-4 h-4 text-[#D4AF37]/50 mx-auto mb-1" />
                        <p className="text-3xl font-heading font-black text-white tracking-tight">
                            {value}<span className="text-[#D4AF37]">{suffix}</span>
                        </p>
                        <p className="text-xs text-white/30 mt-1">{label}</p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   SECTION 3 — CORE SERVICES GRID
───────────────────────────────────────────── */
const SERVICES = [
    {
        icon: Brain,
        color: 'text-[#D4AF37]', bg: 'bg-[#D4AF37]/10', border: 'border-[#D4AF37]/25',
        glow: 'shadow-[#D4AF37]/10',
        label: 'AI Legal Assistance',
        tagline: 'Instant legal guidance — anytime, anywhere',
        desc: 'Ask any legal question in plain English or Swahili and receive instant, Kenya-law-grounded guidance powered by the Veritas AI engine. No jargon. No waiting.',
        features: ['Ask legal questions — 24/7', 'Rights explained in simple language', 'AI case recommendations', 'Multilingual: English, Swahili & more'],
        cta: 'Ask Veritas AI',
        badge: 'AI-Powered',
        stat: '99ms avg response',
    },
    {
        icon: Users,
        color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20',
        glow: 'shadow-purple-500/8',
        label: 'Hire a Lawyer',
        tagline: 'Connect with verified legal professionals',
        desc: 'Browse a curated marketplace of LSK-verified advocates. Filter by specialization, read reviews, compare fees, and chat before you commit — all inside Veritex.',
        features: ['Browse by specialization & rating', 'Secure chat before hiring', 'Transparent fee comparison', 'Milestone-based escrow payments'],
        cta: 'Find a Lawyer',
        badge: 'LSK Verified',
        stat: '100+ advocates',
    },
    {
        icon: Scale,
        color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20',
        glow: 'shadow-blue-500/8',
        label: 'Case Management',
        tagline: 'Track and manage your legal cases end-to-end',
        desc: 'From the moment you open a case to the day judgment is delivered — track every milestone, upload evidence, communicate with your lawyer, and never miss a deadline.',
        features: ['Visual case timeline tracker', 'Secure evidence vault upload', 'Real-time hearing notifications', 'AI case outcome predictions'],
        cta: 'Start a Case',
        badge: 'End-to-End',
        stat: '62% avg resolution',
    },
    {
        icon: Gavel,
        color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20',
        glow: 'shadow-pink-500/8',
        label: 'Court Services',
        tagline: 'Handle court processes entirely digitally',
        desc: 'A citizen-facing layer on Kenya\'s JICMS — file cases electronically, join virtual hearings, track adjournment dates, and access the full court judgment repository.',
        features: ['E-filing integrated with JICMS', 'Virtual hearing video links', 'Hearing date & alert system', 'Full judgment repository'],
        cta: 'Go to Court Services',
        badge: 'JICMS Integrated',
        stat: '6 court tiers covered',
    },
    {
        icon: FileText,
        color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20',
        glow: 'shadow-green-500/8',
        label: 'Legal Document Drafting',
        tagline: 'Generate legally valid documents in under 3 minutes',
        desc: 'AI-powered document generation grounded in Kenyan law. Contracts, tenancy agreements, demand letters, affidavits, NDAs, power of attorney — all downloadable as court-ready PDFs.',
        features: ['30+ document templates', 'Kenya-law compliant output', 'AI clause risk detection', 'E-signature & lawyer review flow'],
        cta: 'Create Document',
        badge: 'AI-Generated',
        stat: '30–100 Legal Credits',
    },
    {
        icon: AlertTriangle,
        color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20',
        glow: 'shadow-red-500/8',
        label: 'Report a Case',
        tagline: 'Report incidents and legal issues instantly',
        desc: 'File crime reports, land encroachment incidents, GBV cases, fraud, and labour violations directly through Veritex. Your report is encrypted, timestamped, and routed to the right authority.',
        features: ['Crime & GBV reporting', 'Land dispute filing', 'Fraud & corruption reports', '🆘 Emergency Legal Button — always free'],
        cta: 'Report Now',
        badge: 'Emergency Ready',
        stat: '8-min response time',
    },
    {
        icon: CreditCard,
        color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20',
        glow: 'shadow-cyan-500/8',
        label: 'Payments & Legal Credits',
        tagline: 'Flexible, secure, and fully protected payments',
        desc: 'An M-Pesa-inspired legal credit economy. Pay for AI services, lawyer consultations, and court fees using Legal Credits. All lawyer payments flow through milestone-protected escrow.',
        features: ['Legal Credit micropayments', 'M-Pesa & card integration', 'Milestone-based escrow', 'Zero hidden fees'],
        cta: 'View Pricing',
        badge: 'Escrow Protected',
        stat: '5-tier milestone model',
    },
    {
        icon: BookOpen,
        color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20',
        glow: 'shadow-orange-500/8',
        label: 'Legal Knowledge Hub',
        tagline: 'Understand your rights — in plain language',
        desc: 'An AI-curated library of Kenyan law, international frameworks, and plain-language explanations. Know your constitutional rights, understand court procedures, and learn before you act.',
        features: ['Kenya Constitution — plain language', 'All major Acts explained', 'Global human rights frameworks', 'AI-simplified legal jargon'],
        cta: 'Explore Library',
        badge: 'Free Access',
        stat: '200+ guides',
    },
];

function ServicesGrid() {
    const [ref, inView] = useReveal(0.05);
    const [hovered, setHovered] = useState(null);
    const [expanded, setExpanded] = useState(null);

    return (
        <section id="services" className="relative py-28 lg:py-36 overflow-hidden">
            <GlowOrb color="#6366F1" size="500px" top="10%" right="-5%" opacity={0.07} blur={220} />
            <GlowOrb color="#D4AF37" size="400px" bottom="5%" left="-5%" opacity={0.06} blur={200} />

            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    variants={stagger(0.1)}
                    className="text-center mb-16"
                >
                    <motion.div variants={fadeUp}><SectionLabel>Core Services</SectionLabel></motion.div>
                    <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-heading font-black text-white mb-4 leading-tight">
                        Everything Legal,<br />
                        <span className="text-gradient">In One Platform</span>
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-white/45 max-w-2xl mx-auto text-base leading-relaxed">
                        Eight deeply integrated services that work together — from your first question to the final judgment.
                        No switching tabs, no separate apps, no confusion.
                    </motion.p>
                </motion.div>

                {/* Grid */}
                <motion.div
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    variants={stagger(0.07)}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                >
                    {SERVICES.map((svc, i) => {
                        const Icon = svc.icon;
                        const isExpanded = expanded === i;
                        const isHovered = hovered === i;

                        return (
                            <motion.div
                                key={i}
                                variants={scaleIn}
                                onMouseEnter={() => setHovered(i)}
                                onMouseLeave={() => setHovered(null)}
                                onClick={() => setExpanded(isExpanded ? null : i)}
                                className={`relative group rounded-2xl border cursor-pointer overflow-hidden transition-all duration-300 ${isExpanded
                                        ? `${svc.border} bg-gradient-to-b from-white/[0.06] to-white/[0.02] shadow-xl ${svc.glow}`
                                        : 'border-white/6 bg-white/[0.025] hover:border-white/12 hover:bg-white/[0.04]'
                                    }`}
                            >
                                {/* Top accent line */}
                                <div className={`absolute top-0 left-0 right-0 h-0.5 transition-all duration-500 ${isExpanded || isHovered ? `bg-gradient-to-r from-transparent via-current to-transparent ${svc.color}` : 'bg-transparent'}`} />

                                {/* Badge */}
                                <div className="absolute top-4 right-4">
                                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${svc.color} ${svc.bg} border ${svc.border}`}>
                                        {svc.badge}
                                    </span>
                                </div>

                                <div className="p-5">
                                    {/* Icon */}
                                    <div className={`w-11 h-11 rounded-xl ${svc.bg} border ${svc.border} flex items-center justify-center mb-4 transition-all duration-300 ${isHovered ? 'scale-110' : ''}`}>
                                        <Icon className={`w-5 h-5 ${svc.color}`} />
                                    </div>

                                    <h3 className="text-white font-bold text-sm mb-1 pr-16 leading-snug">{svc.label}</h3>
                                    <p className={`text-xs font-medium mb-3 ${isExpanded ? svc.color : 'text-white/35'} transition-colors`}>{svc.tagline}</p>

                                    {/* Expand indicator */}
                                    <div className="flex items-center justify-between">
                                        <span className={`text-[10px] font-bold ${svc.color}`}>{svc.stat}</span>
                                        <ChevronDown className={`w-4 h-4 text-white/20 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                                    </div>

                                    {/* Expanded content */}
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pt-4 border-t border-white/6 mt-4">
                                                    <p className="text-white/50 text-xs leading-relaxed mb-4">{svc.desc}</p>
                                                    <div className="space-y-1.5 mb-4">
                                                        {svc.features.map((f, fi) => (
                                                            <div key={fi} className="flex items-start gap-2">
                                                                <CheckCircle className={`w-3 h-3 ${svc.color} mt-0.5 flex-shrink-0`} />
                                                                <span className="text-white/55 text-xs">{f}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <button
                                                        onClick={e => { e.stopPropagation(); }}
                                                        className={`w-full py-2.5 rounded-xl ${svc.bg} border ${svc.border} ${svc.color} text-xs font-black transition-all hover:opacity-80 flex items-center justify-center gap-2`}
                                                    >
                                                        {svc.cta} <ArrowRight className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 }}
                    className="text-center text-white/20 text-xs mt-8"
                >
                    Click any service card to explore its features
                </motion.p>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   SECTION 4 — ECOSYSTEM HIGHLIGHT
───────────────────────────────────────────── */
function EcosystemSection() {
    const [ref, inView] = useReveal();

    const pillars = [
        { icon: Brain, label: 'AI + Human Lawyers', desc: 'Veritas AI handles instant questions. Verified advocates handle complex cases. Together, 24/7.', color: 'text-[#D4AF37]', bg: 'bg-[#D4AF37]/8' },
        { icon: Activity, label: 'Live Case Tracking', desc: 'Visual timeline, real-time notifications, and missed-deadline alerts — you always know where your case stands.', color: 'text-blue-400', bg: 'bg-blue-500/8' },
        { icon: Gavel, label: 'Court Integration', desc: 'Direct e-filing into Kenya\'s JICMS, virtual hearing links, and the full judgment repository.', color: 'text-purple-400', bg: 'bg-purple-500/8' },
        { icon: Shield, label: 'Secure Evidence Vault', desc: 'AES-256 encrypted, SHA-256 hashed, immutably timestamped. Every file is court-admissible from day one.', color: 'text-green-400', bg: 'bg-green-500/8' },
        { icon: Globe, label: 'Multilingual Access', desc: 'English, Swahili, and expanding. Justice doesn\'t stop at language barriers.', color: 'text-cyan-400', bg: 'bg-cyan-500/8' },
        { icon: CreditCard, label: 'Escrow Protection', desc: 'Every payment passes through milestone-verified escrow. Lawyers get paid when they deliver.', color: 'text-pink-400', bg: 'bg-pink-500/8' },
    ];

    return (
        <section className="relative py-28 lg:py-36 bg-[#0e1019]/60 overflow-hidden">
            <GlowOrb color="#D4AF37" size="600px" top="0%" left="25%" opacity={0.06} blur={250} />
            <GridLines />

            <div className="max-w-7xl mx-auto px-6">
                <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger(0.1)} className="text-center mb-16">
                    <motion.div variants={fadeUp}><SectionLabel>One Ecosystem</SectionLabel></motion.div>
                    <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-heading font-black text-white mb-4 leading-tight">
                        One Platform.<br />
                        <span className="text-gradient">Complete Legal Ecosystem.</span>
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-white/40 max-w-xl mx-auto text-base leading-relaxed">
                        Most legal platforms do one thing. Veritex does everything — and makes every part work together seamlessly.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger(0.08)}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
                >
                    {pillars.map(({ icon: Icon, label, desc, color, bg }, i) => (
                        <motion.div
                            key={i} variants={fadeUp}
                            whileHover={{ y: -6, transition: { duration: 0.3 } }}
                            className="group relative p-6 rounded-2xl border border-white/6 bg-white/[0.025] overflow-hidden cursor-default"
                        >
                            <div className={`absolute inset-0 ${bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                            <div className="relative">
                                <div className={`w-10 h-10 rounded-xl ${bg} border border-white/8 flex items-center justify-center mb-4`}>
                                    <Icon className={`w-5 h-5 ${color}`} />
                                </div>
                                <h3 className="text-white font-bold text-sm mb-2">{label}</h3>
                                <p className="text-white/45 text-xs leading-relaxed">{desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   SECTION 5 — HOW IT WORKS
───────────────────────────────────────────── */
function HowItWorks() {
    const [ref, inView] = useReveal();
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        {
            num: '01',
            title: 'Ask or Start',
            subtitle: 'Tell us your problem',
            desc: 'Type a question, describe a situation, or select a case type. Veritas AI instantly analyses your issue and determines the right service — from a simple rights question to a full court case.',
            icon: Brain,
            color: 'text-[#D4AF37]',
            bg: 'bg-[#D4AF37]/10',
            border: 'border-[#D4AF37]/25',
            visual: ['AI analyses your issue', 'Determines correct jurisdiction', 'Identifies applicable law', 'Recommends next step'],
        },
        {
            num: '02',
            title: 'Get Matched',
            subtitle: 'Connect with the right advocate',
            desc: 'If your case needs a human lawyer, Veritex matches you with the right advocate based on specialization, rating, availability, and fees. Chat before you commit — no pressure.',
            icon: Users,
            color: 'text-purple-400',
            bg: 'bg-purple-500/10',
            border: 'border-purple-500/25',
            visual: ['Matches by specialty & location', 'Transparent fee comparison', 'Secure pre-hire chat', 'Escrow activated on hire'],
        },
        {
            num: '03',
            title: 'Take Action',
            subtitle: 'File, track, and resolve',
            desc: 'File your case, upload evidence, generate documents, and attend virtual hearings — all from one dashboard. Every step is tracked, every deadline is flagged, and AI guides you at each stage.',
            icon: Scale,
            color: 'text-blue-400',
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/25',
            visual: ['E-file directly to court', 'Upload encrypted evidence', 'Generate legal documents', 'Attend virtual hearings'],
        },
        {
            num: '04',
            title: 'Stay Protected',
            subtitle: 'Secure records, forever',
            desc: 'Every message, document, and piece of evidence is AES-256 encrypted, immutably timestamped, and stored in your personal Legal Vault. Your legal history is protected — and always available.',
            icon: Shield,
            color: 'text-green-400',
            bg: 'bg-green-500/10',
            border: 'border-green-500/25',
            visual: ['AES-256 encryption', 'Blockchain audit trail', 'Attorney-client privilege', 'Lifetime secure access'],
        },
    ];

    const active = steps[activeStep];
    const ActiveIcon = active.icon;

    useEffect(() => {
        if (!inView) return;
        const t = setInterval(() => setActiveStep(s => (s + 1) % steps.length), 3500);
        return () => clearInterval(t);
    }, [inView]);

    return (
        <section id="how-it-works" className="relative py-28 lg:py-36 overflow-hidden">
            <GlowOrb color="#D4AF37" size="500px" top="20%" right="-5%" opacity={0.08} blur={200} />

            <div className="max-w-7xl mx-auto px-6">
                <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger(0.1)} className="text-center mb-16">
                    <motion.div variants={fadeUp}><SectionLabel>How It Works</SectionLabel></motion.div>
                    <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-heading font-black text-white mb-4">
                        Your Legal Journey,<br />
                        <span className="text-gradient">Step by Step</span>
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-white/40 max-w-xl mx-auto">
                        Four simple phases — from your first question to a fully resolved case.
                    </motion.p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left — step selector */}
                    <div className="space-y-3">
                        {steps.map(({ num, title, subtitle, icon: Icon, color, bg, border }, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: 0.1 * i }}
                                onClick={() => setActiveStep(i)}
                                className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${activeStep === i ? `${border} bg-gradient-to-r from-white/[0.05] to-transparent` : 'border-white/5 hover:border-white/10'
                                    }`}
                            >
                                <div className={`w-12 h-12 rounded-xl ${bg} border ${border} flex items-center justify-center flex-shrink-0 transition-all ${activeStep === i ? 'scale-110' : ''}`}>
                                    <Icon className={`w-6 h-6 ${color}`} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className={`text-[10px] font-black ${activeStep === i ? color : 'text-white/20'} transition-colors`}>{num}</span>
                                        <h3 className={`text-sm font-bold transition-colors ${activeStep === i ? 'text-white' : 'text-white/45'}`}>{title}</h3>
                                    </div>
                                    <p className={`text-xs transition-colors ${activeStep === i ? 'text-white/55' : 'text-white/25'}`}>{subtitle}</p>
                                </div>
                                {activeStep === i && <div className={`w-2 h-2 rounded-full ${color.replace('text-', 'bg-')}`} />}
                            </motion.div>
                        ))}
                    </div>

                    {/* Right — animated detail panel */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeStep}
                            initial={{ opacity: 0, y: 20, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                            className={`relative p-8 rounded-3xl border ${active.border} bg-gradient-to-br from-white/[0.05] to-transparent`}
                        >
                            {/* Glow */}
                            <div className={`absolute -inset-4 rounded-[2rem] blur-2xl opacity-20 ${active.bg}`} />

                            <div className="relative">
                                <div className={`w-14 h-14 rounded-2xl ${active.bg} border ${active.border} flex items-center justify-center mb-5`}>
                                    <ActiveIcon className={`w-7 h-7 ${active.color}`} />
                                </div>

                                <div className="flex items-center gap-3 mb-3">
                                    <span className={`text-xs font-black ${active.color} uppercase tracking-widest`}>Step {activeStep + 1} of 4</span>
                                    <span className={`text-xs font-black ${active.color}`}>· {active.title}</span>
                                </div>

                                <h3 className="text-2xl font-heading font-black text-white mb-3">{active.subtitle}</h3>
                                <p className="text-white/50 text-sm leading-relaxed mb-6">{active.desc}</p>

                                <div className="grid grid-cols-2 gap-2">
                                    {active.visual.map((item, i) => (
                                        <div key={i} className={`flex items-center gap-2 p-2.5 rounded-xl ${active.bg} border ${active.border}`}>
                                            <CheckCircle className={`w-3 h-3 ${active.color} flex-shrink-0`} />
                                            <span className="text-white/60 text-xs">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Step dots */}
                            <div className="flex items-center gap-2 mt-6">
                                {steps.map((_, i) => (
                                    <button key={i} onClick={() => setActiveStep(i)}
                                        className={`rounded-full transition-all ${i === activeStep ? `w-6 h-2 ${active.color.replace('text-', 'bg-')}` : 'w-2 h-2 bg-white/15'}`} />
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   SECTION 6 — TRUST
───────────────────────────────────────────── */
function TrustSection() {
    const [ref, inView] = useReveal();

    const badges = [
        { icon: BadgeCheck, title: 'LSK-Verified Lawyers', desc: 'Every advocate on Veritex is verified with the Law Society of Kenya. No unqualified practitioners, ever.', color: 'text-[#D4AF37]', bg: 'bg-[#D4AF37]/8', border: 'border-[#D4AF37]/20' },
        { icon: Lock, title: 'Military-Grade Security', desc: 'AES-256 encryption for all data in transit and at rest. Kenya Data Protection Act 2019 and GDPR compliant.', color: 'text-blue-400', bg: 'bg-blue-500/8', border: 'border-blue-500/15' },
        { icon: Shield, title: 'Attorney-Client Privilege', desc: 'All communications between you and your lawyer are legally privileged and protected from disclosure.', color: 'text-green-400', bg: 'bg-green-500/8', border: 'border-green-500/15' },
        { icon: Activity, title: 'Immutable Audit Trail', desc: 'Every file access, message, and evidence upload is blockchain-hashed and immutably timestamped.', color: 'text-purple-400', bg: 'bg-purple-500/8', border: 'border-purple-500/15' },
        { icon: Globe, title: 'Kenya Data Protection Act', desc: 'Full compliance with the Data Protection Act 2019. Your data is never sold, shared, or monetised.', color: 'text-cyan-400', bg: 'bg-cyan-500/8', border: 'border-cyan-500/15' },
        { icon: Heart, title: 'Built for the 80%', desc: 'Designed first for citizens who cannot afford traditional legal fees. The Emergency Button is always free.', color: 'text-red-400', bg: 'bg-red-500/8', border: 'border-red-500/15' },
    ];

    return (
        <section id="trust" className="relative py-28 lg:py-36 bg-[#0e1019]/60 overflow-hidden">
            <GlowOrb color="#6366F1" size="500px" top="10%" left="-5%" opacity={0.08} blur={220} />
            <GridLines />

            <div className="max-w-7xl mx-auto px-6">
                <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger(0.1)} className="text-center mb-16">
                    <motion.div variants={fadeUp}><SectionLabel>Why Trust Veritex</SectionLabel></motion.div>
                    <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-heading font-black text-white mb-4 leading-tight">
                        Security & Integrity<br />
                        <span className="text-gradient">Are Not Optional</span>
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-white/40 max-w-xl mx-auto text-base leading-relaxed">
                        In a system built around legal truth, trust is the product. Every technical decision at Veritex is made with one question: <em className="text-white/60 not-italic">"Would this hold up in court?"</em>
                    </motion.p>
                </motion.div>

                <motion.div
                    initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger(0.08)}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
                >
                    {badges.map(({ icon: Icon, title, desc, color, bg, border }, i) => (
                        <motion.div key={i} variants={fadeUp} whileHover={{ y: -5 }}
                            className={`p-6 rounded-2xl border ${border} ${bg} cursor-default`}>
                            <div className={`w-10 h-10 rounded-xl ${bg} border ${border} flex items-center justify-center mb-4`}>
                                <Icon className={`w-5 h-5 ${color}`} />
                            </div>
                            <h3 className="text-white font-bold text-sm mb-2">{title}</h3>
                            <p className="text-white/45 text-xs leading-relaxed">{desc}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Compliance logos row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 }}
                    className="mt-14 flex flex-wrap items-center justify-center gap-6"
                >
                    <p className="text-white/20 text-xs uppercase tracking-widest mr-4 w-full text-center mb-2">Compliant With</p>
                    {['Kenya DPA 2019', 'Employment Act 2007', 'Land Registration Act', 'GDPR Framework', 'LSK Regulations', 'JICMS Integration'].map((item, i) => (
                        <div key={i} className="px-4 py-2 rounded-full border border-white/8 bg-white/3 text-white/35 text-xs font-semibold">
                            {item}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   SECTION 7 — PRICING TIERS TEASER
───────────────────────────────────────────── */
function PricingTeaser() {
    const [ref, inView] = useReveal();

    const tiers = [
        {
            name: 'Citizen Free',
            price: 'KES 0',
            period: 'forever',
            color: 'text-white/70',
            border: 'border-white/10',
            bg: 'bg-white/[0.03]',
            features: ['5 AI questions / month', 'Emergency Legal Button 🆘', 'Know Your Rights library', 'One document upload'],
            cta: 'Start Free',
            ctaStyle: 'border border-white/15 text-white/60 hover:text-white hover:border-white/30',
        },
        {
            name: 'Citizen Plus',
            price: 'KES 500',
            period: 'per month',
            color: 'text-[#D4AF37]',
            border: 'border-[#D4AF37]/35',
            bg: 'bg-[#D4AF37]/5',
            badge: 'Most Popular',
            features: ['100 AI Legal Credits / month', 'Unlimited case tracking', 'Full document library', 'Lawyer marketplace access', 'Evidence vault 5GB', 'Priority support'],
            cta: 'Get Started',
            ctaStyle: 'bg-[#D4AF37] text-[#12141f] font-black hover:bg-[#c9a430]',
            featured: true,
        },
        {
            name: 'Professional',
            price: 'KES 2,500',
            period: 'per month',
            color: 'text-purple-400',
            border: 'border-purple-500/25',
            bg: 'bg-purple-500/5',
            features: ['Unlimited AI Credits', 'AI Document Generator', 'Court filing integration', 'Lawyer dashboard access', 'Evidence vault 50GB', 'Dedicated case manager'],
            cta: 'Contact Sales',
            ctaStyle: 'border border-purple-500/30 text-purple-400 hover:bg-purple-500/10',
        },
    ];

    return (
        <section id="pricing" className="relative py-28 lg:py-36 overflow-hidden">
            <GlowOrb color="#D4AF37" size="600px" top="0%" left="30%" opacity={0.07} blur={250} />

            <div className="max-w-7xl mx-auto px-6">
                <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger(0.1)} className="text-center mb-16">
                    <motion.div variants={fadeUp}><SectionLabel>Pricing</SectionLabel></motion.div>
                    <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-heading font-black text-white mb-4 leading-tight">
                        Justice Shouldn't<br />
                        <span className="text-gradient">Have a Barrier to Entry</span>
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-white/40 max-w-lg mx-auto">
                        Start free. The Emergency Legal Button is always free. Premium features scale with your needs.
                    </motion.p>
                </motion.div>

                <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger(0.12)}
                    className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
                    {tiers.map(({ name, price, period, color, border, bg, features, cta, ctaStyle, badge, featured }, i) => (
                        <motion.div
                            key={i}
                            variants={scaleIn}
                            whileHover={{ y: -6 }}
                            className={`relative rounded-3xl border p-7 ${bg} ${border} ${featured ? 'shadow-2xl shadow-[#D4AF37]/10' : ''}`}
                        >
                            {featured && <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent rounded-t-3xl" />}
                            {badge && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <span className="px-3 py-1 rounded-full bg-[#D4AF37] text-[#12141f] text-[10px] font-black uppercase tracking-widest shadow-lg">
                                        {badge}
                                    </span>
                                </div>
                            )}

                            <p className={`text-xs font-bold uppercase tracking-widest ${color} mb-3`}>{name}</p>
                            <div className="mb-5">
                                <span className="text-4xl font-heading font-black text-white">{price}</span>
                                <span className="text-white/25 text-sm ml-1">/ {period}</span>
                            </div>

                            <div className="space-y-2 mb-6">
                                {features.map((f, fi) => (
                                    <div key={fi} className="flex items-start gap-2">
                                        <CheckCircle className={`w-3.5 h-3.5 ${color} mt-0.5 flex-shrink-0`} />
                                        <span className="text-white/55 text-xs">{f}</span>
                                    </div>
                                ))}
                            </div>

                            <button className={`w-full py-3 rounded-xl text-sm font-bold transition-all ${ctaStyle}`}>{cta}</button>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}
                    className="text-center text-white/20 text-xs mt-8">
                    Legal Credits never expire · No hidden fees · Cancel anytime
                </motion.p>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   SECTION 8 — IMPACT NUMBERS
───────────────────────────────────────────── */
function ImpactNumbers() {
    const [ref, inView] = useReveal(0.2);

    const numbers = [
        { value: '80%', label: 'Cost Reduction vs. Traditional Legal Fees', icon: TrendingUp, color: 'text-green-400' },
        { value: '21', label: 'Days to resolve GBV Protection Order (vs. 120+ avg)', icon: Clock, color: 'text-[#D4AF37]' },
        { value: '8min', label: 'Emergency Legal Button response time', icon: Phone, color: 'text-red-400' },
        { value: '1M+', label: 'Target citizens served by Year 3', icon: Users, color: 'text-blue-400' },
    ];

    return (
        <section className="relative py-20 bg-[#0e1019]/80 overflow-hidden border-y border-white/5">
            <GlowOrb color="#D4AF37" size="400px" top="50%" left="50%" opacity={0.06} blur={200} />

            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    variants={stagger(0.1)}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {numbers.map(({ value, label, icon: Icon, color }, i) => (
                        <motion.div key={i} variants={scaleIn} className="text-center px-4">
                            <div className="flex justify-center mb-3">
                                <div className="w-10 h-10 rounded-xl bg-white/4 border border-white/6 flex items-center justify-center">
                                    <Icon className={`w-5 h-5 ${color}`} />
                                </div>
                            </div>
                            <p className={`text-3xl lg:text-4xl font-heading font-black mb-2 ${color}`}>{value}</p>
                            <p className="text-white/30 text-xs leading-snug">{label}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   SECTION 9 — FAQ
───────────────────────────────────────────── */
function FAQ() {
    const [ref, inView] = useReveal();
    const [open, setOpen] = useState(null);

    const faqs = [
        { q: 'Is Veritex available outside Kenya?', a: 'Phase 1 (2026) focuses on Kenya. Phase 3 (2027–2028) expands to Uganda, Tanzania, Rwanda, Ethiopia, and South Africa. Phase 4 targets 25+ countries globally.' },
        { q: 'Are the lawyers on Veritex actually qualified?', a: 'Yes. Every advocate on Veritex is verified with the Law Society of Kenya (LSK) before they can accept cases. Their registration number, specialization, and disciplinary record are checked.' },
        { q: 'How does the Emergency Legal Button work?', a: 'Tapping the Emergency Button connects you to an on-call advocate, shares your GPS location, and simultaneously alerts the nearest police station. It is completely free and available 24/7.' },
        { q: 'Can my lawyer see all my documents?', a: 'Only lawyers linked to your specific case can access your documents. You control access at all times. You can revoke a lawyer\'s access at any point from your settings.' },
        { q: 'What happens to my case data if I stop using Veritex?', a: 'Your data is yours. You can download a full encrypted export of all your case files, documents, and evidence at any time. We never delete your data without your explicit request.' },
        { q: 'Is the AI legal advice legally binding?', a: 'No — Veritas AI provides guidance and education, not formal legal advice. For binding legal advice, you must engage a qualified advocate through our lawyer marketplace.' },
    ];

    return (
        <section className="relative py-28 lg:py-36 overflow-hidden">
            <GlowOrb color="#6366F1" size="400px" top="20%" right="-5%" opacity={0.07} blur={200} />

            <div className="max-w-3xl mx-auto px-6">
                <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger(0.1)} className="text-center mb-14">
                    <motion.div variants={fadeUp}><SectionLabel>Frequently Asked</SectionLabel></motion.div>
                    <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-heading font-black text-white mb-4">
                        Common <span className="text-gradient">Questions</span>
                    </motion.h2>
                </motion.div>

                <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger(0.07)} className="space-y-3">
                    {faqs.map(({ q, a }, i) => (
                        <motion.div key={i} variants={fadeUp}>
                            <button
                                onClick={() => setOpen(open === i ? null : i)}
                                className={`w-full text-left p-5 rounded-2xl border transition-all ${open === i ? 'border-[#D4AF37]/25 bg-[#D4AF37]/5' : 'border-white/6 bg-white/[0.025] hover:border-white/12'}`}
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <p className={`text-sm font-semibold transition-colors ${open === i ? 'text-white' : 'text-white/65'}`}>{q}</p>
                                    <ChevronDown className={`w-4 h-4 flex-shrink-0 text-[#D4AF37]/60 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`} />
                                </div>
                                <AnimatePresence>
                                    {open === i && (
                                        <motion.p
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="text-white/45 text-sm leading-relaxed mt-3 overflow-hidden"
                                        >
                                            {a}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </button>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   SECTION 10 — FINAL CTA
───────────────────────────────────────────── */
function FinalCTA({ auth }) {
    const [ref, inView] = useReveal(0.2);

    return (
        <section className="relative py-32 lg:py-44 overflow-hidden">
            <GlowOrb color="#D4AF37" size="800px" top="50%" left="50%" opacity={0.1} blur={280} />
            <GlowOrb color="#6366F1" size="400px" top="10%" left="10%" opacity={0.07} blur={200} />
            <FloatingDots n={14} />
            <GridLines />

            <motion.div
                ref={ref}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                variants={stagger(0.14)}
                className="relative z-10 max-w-4xl mx-auto px-6 text-center"
            >
                <motion.div variants={scaleIn}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/5 mb-8">
                        <Scale className="w-4 h-4 text-[#D4AF37]" />
                        <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">Ready to Begin?</span>
                    </div>
                </motion.div>

                <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-white mb-6 leading-[1.06]">
                    Ready to take control of<br />
                    <span className="text-gradient">your legal journey?</span>
                </motion.h2>

                <motion.p variants={fadeUp} className="text-white/45 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                    Over 2 million unresolved cases in Kenya alone. Yours doesn't have to be one of them.
                    Start free. The Emergency Button is always available.
                </motion.p>

                <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                    <PrimaryBtn href={auth?.user ? route('cases.create') : route('register')}>
                        Start a Case Free
                    </PrimaryBtn>
                    <GhostBtn href="#">
                        <Brain className="w-4 h-4 text-[#D4AF37]" /> Ask Veritas AI
                    </GhostBtn>
                    <GhostBtn href="#">
                        <Scale className="w-4 h-4" /> Find a Lawyer
                    </GhostBtn>
                </motion.div>

                <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-5">
                    {[
                        { icon: Lock, text: 'AES-256 Encrypted' },
                        { icon: BadgeCheck, text: 'LSK Verified Lawyers' },
                        { icon: Shield, text: 'Emergency Button Free' },
                        { icon: Globe, text: 'Nairobi · Expanding Globally' },
                    ].map(({ icon: Icon, text }, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                            <Icon className="w-3.5 h-3.5 text-[#D4AF37]/60" />
                            <span className="text-white/30 text-xs">{text}</span>
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   NAV
───────────────────────────────────────────── */
function Nav({ auth }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', fn);
        return () => window.removeEventListener('scroll', fn);
    }, []);

    const links = [
        { label: 'Services', href: '#services' },
        { label: 'How It Works', href: '#how-it-works' },
        { label: 'Trust', href: '#trust' },
        { label: 'Pricing', href: '#pricing' },
    ];

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#12141f]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/40' : ''}`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="relative">
                        <div className="absolute inset-0 rounded-xl bg-[#D4AF37]/25 blur-md group-hover:blur-lg transition-all" />
                        <div className="relative p-2 rounded-xl bg-[#1a1d2e] border border-[#D4AF37]/30">
                            <Scale className="w-5 h-5 text-[#D4AF37]" />
                        </div>
                    </div>
                    <span className="font-heading font-bold text-xl tracking-tight text-white">Veritex</span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {links.map(({ label, href }, i) => (
                        <motion.a key={label} href={href}
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * i + 0.2 }}
                            className="text-sm text-white/50 hover:text-white transition-colors font-medium">
                            {label}
                        </motion.a>
                    ))}
                </div>

                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="hidden md:flex items-center gap-3">
                    {auth?.user ? (
                        <Link href={route('dashboard')} className="px-5 py-2.5 rounded-full bg-[#D4AF37] hover:bg-[#c9a430] text-[#12141f] text-sm font-black transition-all shadow-lg shadow-[#D4AF37]/25">
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link href={route('login')} className="text-white/50 hover:text-white text-sm font-medium transition-colors px-3">Sign in</Link>
                            <Link href={route('register')} className="px-5 py-2.5 rounded-full bg-[#D4AF37] hover:bg-[#c9a430] text-[#12141f] text-sm font-black transition-all shadow-lg shadow-[#D4AF37]/20">
                                Get Started →
                            </Link>
                        </>
                    )}
                </motion.div>

                <button className="md:hidden text-white" onClick={() => setMobileOpen(v => !v)}>
                    {mobileOpen ? <X className="w-6 h-6" /> : <Hash className="w-6 h-6" />}
                </button>
            </div>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[#1a1d2e]/95 backdrop-blur-xl border-t border-white/5 px-6 py-4 flex flex-col gap-4">
                        {links.map(({ label, href }) => (
                            <a key={label} href={href} className="text-white/60 hover:text-white transition-colors py-1" onClick={() => setMobileOpen(false)}>{label}</a>
                        ))}
                        <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
                            <Link href={route('login')} className="text-center py-2.5 rounded-full border border-white/10 text-sm text-white/60">Sign in</Link>
                            <Link href={route('register')} className="text-center py-2.5 rounded-full bg-[#D4AF37] text-[#12141f] text-sm font-black">Get Started</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function Footer() {
    const cols = [
        { title: 'Services', links: ['AI Legal Assistant', 'Hire a Lawyer', 'Case Management', 'Court Services', 'Document Drafting', 'Report a Case'] },
        { title: 'Platform', links: ['How It Works', 'Pricing', 'Security', 'Integrations', 'API Access', 'Partners'] },
        { title: 'Resources', links: ['Legal Knowledge Hub', 'Know Your Rights', 'Kenya Constitution', 'Case Law Library', 'Blog', 'Help Centre'] },
        { title: 'Company', links: ['About Veritex', 'Mission & Impact', 'SDG Alignment', 'Press Kit', 'Careers', 'Contact'] },
    ];

    return (
        <footer className="border-t border-white/5 bg-[#0e1019] pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                {/* Top */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2.5 mb-4">
                            <div className="p-2 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/25">
                                <Scale className="w-5 h-5 text-[#D4AF37]" />
                            </div>
                            <span className="font-heading font-bold text-xl text-white">Veritex</span>
                        </div>
                        <p className="text-white/30 text-xs leading-relaxed mb-5">
                            Global Legal Rights & Justice Platform. Built in Nairobi 🇰🇪 for Africa and the world.
                        </p>
                        <div className="flex flex-col gap-1.5">
                            {[
                                { icon: Shield, text: 'AES-256 Encrypted' },
                                { icon: BadgeCheck, text: 'LSK Verified' },
                                { icon: Lock, text: 'Court-Admissible' },
                            ].map(({ icon: Icon, text }, i) => (
                                <div key={i} className="flex items-center gap-1.5">
                                    <Icon className="w-3 h-3 text-[#D4AF37]/50" />
                                    <span className="text-white/25 text-[10px]">{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {cols.map(({ title, links }) => (
                        <div key={title}>
                            <p className="text-white/60 font-bold text-xs uppercase tracking-widest mb-4">{title}</p>
                            <ul className="space-y-2.5">
                                {links.map(l => (
                                    <li key={l}>
                                        <a href="#" className="text-white/25 hover:text-white/70 text-xs transition-colors">{l}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom */}
                <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-white/20 text-xs">© 2026 Veritex Global Ltd. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        {['Privacy Policy', 'Terms of Service', 'Data Protection'].map(l => (
                            <a key={l} href="#" className="text-white/20 hover:text-white/50 text-[10px] transition-colors">{l}</a>
                        ))}
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-white/20 text-[10px]">All systems operational</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

/* ─────────────────────────────────────────────
   ROOT PAGE
───────────────────────────────────────────── */
export default function AboutUs({ auth }) {
    return (
        <>
            <Head title="Veritex — Legal Services, Simplified for Everyone" />
            <div className="min-h-screen bg-[#12141f] text-white font-sans selection:bg-[#D4AF37] selection:text-[#12141f] overflow-x-hidden"
                style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>

                {/* Global ambient glow layer */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-[0.04]"
                        style={{ background: 'radial-gradient(circle, #D4AF37, transparent 70%)', filter: 'blur(80px)' }} />
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-[0.04]"
                        style={{ background: 'radial-gradient(circle, #6366F1, transparent 70%)', filter: 'blur(80px)' }} />
                </div>

                <Nav auth={auth} />
                <HeroSection auth={auth} />
                <StatStrip />
                <ServicesGrid />
                <EcosystemSection />
                <HowItWorks />
                <TrustSection />
                <PricingTeaser />
                <ImpactNumbers />
                <FAQ />
                <FinalCTA auth={auth} />
                <Footer />
            </div>
        </>
    );
}