import { Head, Link } from '@inertiajs/react';
import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
    Scale, Search, MapPin, Star, CheckCircle, ChevronDown, SlidersHorizontal,
    MessageSquare, ArrowRight, BadgeCheck, Zap, Clock, TrendingUp, Filter,
    X, ChevronRight, Globe, Briefcase, Shield, Award, Users, Phone,
    BookOpen, ThumbsUp, Eye, Heart, Sparkles, RotateCcw, AlertCircle,
    Menu, Bell, ChevronUp, Play, Mic, Video, ArrowUpRight, Gavel,
    Home, CreditCard, Landmark, UserX, Building, Calendar
} from 'lucide-react';

/* ─────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────── */
const T = {
    bg0: '#07080f',
    bg1: '#0a0c16',
    bg2: '#0f1221',
    bg3: '#161929',
    bg4: '#1c2035',
    gold: '#D4AF37',
    goldL: '#e8c84a',
    jade: '#10B981',
    indigo: '#6366F1',
    violet: '#8B5CF6',
    blue: '#3B82F6',
    red: '#EF4444',
    amber: '#F59E0B',
};

/* ─────────────────────────────────────────
   LAWYER DATA
───────────────────────────────────────── */
const LAWYERS = [
    {
        id: 'ADV-001',
        name: 'Njeri Kamau',
        initials: 'NK',
        title: 'Advocate of the High Court of Kenya',
        lsk: 'LSK/2014/4892',
        specializations: ['Land & Property', 'Employment'],
        primarySpec: 'Land & Property',
        location: 'Nairobi',
        county: 'Nairobi County',
        experience: 11,
        rating: 4.9,
        reviews: 214,
        cases: 312,
        winRate: 89,
        responseTime: '< 5 min',
        consultationFee: 200,
        bio: 'Senior land advocate with 11 years specialising in title deed disputes, adverse possession, and property succession. Former state counsel at the Attorney General\'s office.',
        tags: ['Top Rated', 'Featured'],
        available: true,
        languages: ['English', 'Swahili', 'Kikuyu'],
        recentWins: ['ELC Milimani — Title restored in 6 weeks', 'Adverse possession — 2.5 acres recovered'],
        accentColor: '#D4AF37',
        gradient: 'from-amber-500/20 to-yellow-600/10',
        verified: true,
        featured: true,
    },
    {
        id: 'ADV-002',
        name: 'Amina Mwangi',
        initials: 'AM',
        title: 'Advocate of the High Court of Kenya',
        lsk: 'LSK/2016/6210',
        specializations: ['Family Law', 'Matrimonial'],
        primarySpec: 'Family Law',
        location: 'Nairobi',
        county: 'Nairobi County',
        experience: 8,
        rating: 4.8,
        reviews: 178,
        cases: 241,
        winRate: 84,
        responseTime: '< 10 min',
        consultationFee: 150,
        bio: 'Specialist in family law with a focus on custody, divorce, and women\'s property rights. Certified mediator under the Mediation (Pilot Project) Rules 2015.',
        tags: ['Top Rated', 'Mediator'],
        available: true,
        languages: ['English', 'Swahili'],
        recentWins: ['Custody granted — 2 children', 'Matrimonial property division — KES 12M'],
        accentColor: '#EC4899',
        gradient: 'from-pink-500/20 to-rose-600/10',
        verified: true,
        featured: false,
    },
    {
        id: 'ADV-003',
        name: 'James Odhiambo',
        initials: 'JO',
        title: 'Senior Advocate of the High Court',
        lsk: 'LSK/2009/1204',
        specializations: ['Commercial Law', 'Land & Property'],
        primarySpec: 'Commercial Law',
        location: 'Kisumu',
        county: 'Kisumu County',
        experience: 15,
        rating: 4.9,
        reviews: 312,
        cases: 489,
        winRate: 92,
        responseTime: '< 3 min',
        consultationFee: 350,
        bio: 'One of Kenya\'s leading commercial litigators with 15 years of experience in high-value contract disputes, debt recovery, and corporate restructuring. Former partner at a Big 5 Kenyan firm.',
        tags: ['Top Rated', 'Senior Advocate', 'Featured'],
        available: false,
        languages: ['English', 'Swahili', 'Luo'],
        recentWins: ['KES 240M commercial dispute — won', 'KES 4.2M debt recovery — 9 weeks'],
        accentColor: '#10B981',
        gradient: 'from-emerald-500/20 to-green-600/10',
        verified: true,
        featured: true,
    },
    {
        id: 'ADV-004',
        name: 'Grace Wachira',
        initials: 'GW',
        title: 'Advocate of the High Court of Kenya',
        lsk: 'LSK/2017/7840',
        specializations: ['Criminal Defence', 'Human Rights'],
        primarySpec: 'Criminal Defence',
        location: 'Nairobi',
        county: 'Nairobi County',
        experience: 7,
        rating: 4.7,
        reviews: 89,
        cases: 156,
        winRate: 79,
        responseTime: '< 8 min',
        consultationFee: 180,
        bio: 'Criminal defence specialist with extensive courtroom experience at the High Court and Court of Appeal. Human rights background — previously with KHRC. Expert in bail applications and DPP negotiations.',
        tags: ['Verified'],
        available: true,
        languages: ['English', 'Swahili', 'Gikuyu'],
        recentWins: ['Acquittal — assault charges', 'Bail secured — murder charge (reduced to manslaughter)'],
        accentColor: '#EF4444',
        gradient: 'from-red-500/20 to-rose-700/10',
        verified: true,
        featured: false,
    },
    {
        id: 'ADV-005',
        name: 'Patrick Mutua',
        initials: 'PM',
        title: 'Advocate of the High Court of Kenya',
        lsk: 'LSK/2018/8912',
        specializations: ['Employment Law', 'Labour Relations'],
        primarySpec: 'Employment Law',
        location: 'Machakos',
        county: 'Machakos County',
        experience: 6,
        rating: 4.5,
        reviews: 52,
        cases: 98,
        winRate: 76,
        responseTime: '< 15 min',
        consultationFee: 100,
        bio: 'Employment and labour law specialist serving both employees and employers across Eastern Province. Extensive experience at the Employment and Labour Relations Court in Nairobi.',
        tags: ['Affordable'],
        available: true,
        languages: ['English', 'Swahili', 'Kamba'],
        recentWins: ['ELRC — 12 months compensation', 'Reinstatement after wrongful dismissal'],
        accentColor: '#6366F1',
        gradient: 'from-indigo-500/20 to-violet-700/10',
        verified: true,
        featured: false,
    },
    {
        id: 'ADV-006',
        name: 'Salome Chebet',
        initials: 'SC',
        title: 'Advocate of the High Court of Kenya',
        lsk: 'LSK/2015/5503',
        specializations: ['Succession & Probate', 'Family Law'],
        primarySpec: 'Succession & Probate',
        location: 'Eldoret',
        county: 'Uasin Gishu County',
        experience: 9,
        rating: 4.6,
        reviews: 134,
        cases: 201,
        winRate: 82,
        responseTime: '< 12 min',
        consultationFee: 130,
        bio: 'Succession and probate specialist with deep expertise in intestate succession, grant of letters of administration, and estate administration. Regular speaker at LSK-CPD succession law seminars.',
        tags: ['Verified', 'CPD Trainer'],
        available: true,
        languages: ['English', 'Swahili', 'Kalenjin'],
        recentWins: ['Grant obtained — contested estate KES 18M', 'Will successfully upheld against 4 objectors'],
        accentColor: '#8B5CF6',
        gradient: 'from-violet-500/20 to-purple-700/10',
        verified: true,
        featured: false,
    },
    {
        id: 'ADV-007',
        name: 'Hassan Abdalla',
        initials: 'HA',
        title: 'Advocate of the High Court of Kenya',
        lsk: 'LSK/2012/3108',
        specializations: ['Land & Property', 'Conveyancing'],
        primarySpec: 'Conveyancing',
        location: 'Mombasa',
        county: 'Mombasa County',
        experience: 12,
        rating: 4.7,
        reviews: 188,
        cases: 334,
        winRate: 85,
        responseTime: '< 7 min',
        consultationFee: 220,
        bio: 'Leading conveyancing advocate in Mombasa specialising in coastal land law, including beach plots, foreign ownership restrictions, and Islamic succession law as applied to land.',
        tags: ['Top Rated', 'Coastal Expert'],
        available: true,
        languages: ['English', 'Swahili', 'Arabic'],
        recentWins: ['Beach plot title cleared — Diani', 'Foreigner title — correct company structure advised'],
        accentColor: '#F59E0B',
        gradient: 'from-amber-500/20 to-orange-600/10',
        verified: true,
        featured: false,
    },
    {
        id: 'ADV-008',
        name: 'Dr. Wanjiku Ndegwa',
        initials: 'WN',
        title: 'Senior Advocate & PhD (Law)',
        lsk: 'LSK/2007/0891',
        specializations: ['Constitutional Law', 'Judicial Review'],
        primarySpec: 'Constitutional Law',
        location: 'Nairobi',
        county: 'Nairobi County',
        experience: 17,
        rating: 5.0,
        reviews: 67,
        cases: 128,
        winRate: 94,
        cases: 128,
        consultationFee: 500,
        bio: 'Senior Advocate with a PhD in Constitutional Law from the University of Nairobi. Argued landmark cases before the Supreme Court. Specialises in judicial review, constitutional petitions, and electoral disputes.',
        tags: ['Top Rated', 'Senior Advocate', 'Academic'],
        available: true,
        languages: ['English', 'Swahili'],
        recentWins: ['Supreme Court — landmark constitutional petition', 'High Court — judicial review of county legislation'],
        accentColor: '#3B82F6',
        gradient: 'from-blue-500/20 to-indigo-700/10',
        verified: true,
        featured: true,
        responseTime: '< 20 min',
        winRate: 94,
    },
];

const CASE_TYPES = [
    { id: 'all', label: 'All Types', icon: Scale },
    { id: 'Land & Property', label: 'Land & Property', icon: Home },
    { id: 'Employment Law', label: 'Employment', icon: Briefcase },
    { id: 'Criminal Defence', label: 'Criminal', icon: UserX },
    { id: 'Family Law', label: 'Family', icon: Heart },
    { id: 'Commercial Law', label: 'Business', icon: Building },
    { id: 'Succession & Probate', label: 'Succession', icon: BookOpen },
    { id: 'Constitutional Law', label: 'Constitutional', icon: Landmark },
    { id: 'Conveyancing', label: 'Conveyancing', icon: CreditCard },
];

const LOCATIONS = ['All Kenya', 'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Machakos', 'Kisii', 'Nyeri', 'Thika'];
const SORT_OPTIONS = [
    { id: 'recommended', label: 'Recommended' },
    { id: 'rating', label: 'Highest Rated' },
    { id: 'price_asc', label: 'Lowest Price' },
    { id: 'price_desc', label: 'Highest Price' },
    { id: 'experience', label: 'Most Experienced' },
    { id: 'winrate', label: 'Best Win Rate' },
    { id: 'response', label: 'Fastest Response' },
];

const TAG_COLORS = {
    'Top Rated': { bg: T.gold + '18', border: T.gold + '35', color: T.gold },
    'Featured': { bg: T.violet + '18', border: T.violet + '35', color: T.violet },
    'Verified': { bg: T.jade + '18', border: T.jade + '30', color: T.jade },
    'Senior Advocate': { bg: T.blue + '18', border: T.blue + '30', color: T.blue },
    'Mediator': { bg: T.indigo + '18', border: T.indigo + '30', color: T.indigo },
    'Affordable': { bg: T.jade + '15', border: T.jade + '25', color: T.jade },
    'Academic': { bg: '#8B5CF6' + '18', border: '#8B5CF6' + '30', color: '#8B5CF6' },
    'CPD Trainer': { bg: T.amber + '18', border: T.amber + '30', color: T.amber },
    'Coastal Expert': { bg: T.blue + '15', border: T.blue + '25', color: T.blue },
};

const SPEC_ICONS = {
    'Land & Property': Home,
    'Employment Law': Briefcase,
    'Criminal Defence': UserX,
    'Family Law': Heart,
    'Commercial Law': Building,
    'Succession & Probate': BookOpen,
    'Constitutional Law': Landmark,
    'Conveyancing': CreditCard,
    'Matrimonial': Heart,
    'Labour Relations': Briefcase,
    'Human Rights': Shield,
    'Judicial Review': Gavel,
};

/* ─────────────────────────────────────────
   MOTION VARIANTS
───────────────────────────────────────── */
const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = (delay = 0.1) => ({
    hidden: {},
    visible: { transition: { staggerChildren: delay } },
});
const cardVariant = {
    hidden: { opacity: 0, y: 32, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.25 } },
};

/* ─────────────────────────────────────────
   UTILITY COMPONENTS
───────────────────────────────────────── */
const GlowOrb = ({ color, size, top, left, opacity = 0.12, blur = 200 }) => (
    <div className="absolute rounded-full pointer-events-none" style={{ background: color, width: size, height: size, top, left, filter: `blur(${blur}px)`, opacity }} />
);

const StarRating = ({ rating, size = 12, showNumber = true }) => (
    <div className="flex items-center gap-1">
        <div className="flex">
            {[1, 2, 3, 4, 5].map(s => (
                <svg key={s} width={size} height={size} viewBox="0 0 12 12" fill="none">
                    <path d="M6 1L7.545 4.13L11 4.635L8.5 7.07L9.09 10.51L6 8.885L2.91 10.51L3.5 7.07L1 4.635L4.455 4.13L6 1Z"
                        fill={s <= Math.floor(rating) ? T.gold : s - 0.5 <= rating ? T.gold + '80' : 'rgba(255,255,255,0.12)'}
                        stroke={s <= Math.floor(rating) ? T.gold : 'none'} strokeWidth="0.5" />
                </svg>
            ))}
        </div>
        {showNumber && <span className="font-bold text-white" style={{ fontSize: size }}>{rating.toFixed(1)}</span>}
    </div>
);

const LawyerTag = ({ tag }) => {
    const style = TAG_COLORS[tag] || { bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)' };
    return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border"
            style={{ background: style.bg, borderColor: style.border, color: style.color }}>
            {tag === 'Top Rated' && '⭐ '}
            {tag === 'Verified' && '✓ '}
            {tag === 'Featured' && '✦ '}
            {tag}
        </span>
    );
};

const AvailabilityDot = ({ available, size = 'md' }) => {
    const sizes = { sm: 'w-2 h-2', md: 'w-2.5 h-2.5' };
    return (
        <div className={`${sizes[size]} rounded-full flex-shrink-0 ${available ? 'animate-pulse' : ''}`}
            style={{ background: available ? T.jade : 'rgba(255,255,255,0.2)' }} />
    );
};

/* ─────────────────────────────────────────
   NAV
───────────────────────────────────────── */
function Nav({ auth }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', fn);
        return () => window.removeEventListener('scroll', fn);
    }, []);

    return (
        <motion.nav initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${scrolled ? 'backdrop-blur-xl border-b' : ''}`}
            style={{ borderColor: scrolled ? 'rgba(255,255,255,0.06)' : 'transparent', background: scrolled ? T.bg2 + 'ee' : 'transparent' }}>
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center border" style={{ background: T.gold + '18', borderColor: T.gold + '35' }}>
                        <Scale className="w-4 h-4" style={{ color: T.gold }} />
                    </div>
                    <span className="font-black text-white text-lg tracking-tight">Veritex</span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {['Practice Areas', 'Lawyers', 'AI Engine', 'How It Works'].map((item, i) => (
                        <a key={i} href="#" className="text-sm font-medium transition-colors" style={{ color: item === 'Lawyers' ? T.gold : 'rgba(255,255,255,0.5)' }}>
                            {item}
                        </a>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-3">
                    {auth?.user ? (
                        <Link href={route('dashboard')} className="px-5 py-2.5 rounded-full text-sm font-bold transition-all"
                            style={{ background: T.gold, color: '#07080f' }}>
                            Dashboard →
                        </Link>
                    ) : (
                        <>
                            <Link href={route('login')} className="px-4 py-2 rounded-full text-sm font-medium transition-colors" style={{ color: 'rgba(255,255,255,0.6)' }}>Log in</Link>
                            <Link href={route('register')} className="px-5 py-2.5 rounded-full text-sm font-bold transition-all"
                                style={{ background: T.gold, color: '#07080f', boxShadow: `0 8px 24px ${T.gold}25` }}>
                                Get Started →
                            </Link>
                        </>
                    )}
                </div>

                <button className="md:hidden" onClick={() => setMobileOpen(v => !v)} style={{ color: 'white' }}>
                    {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t px-6 py-4 flex flex-col gap-4"
                        style={{ background: T.bg2, borderColor: 'rgba(255,255,255,0.06)' }}>
                        {['Practice Areas', 'Lawyers', 'AI Engine'].map((item, i) => (
                            <a key={i} href="#" className="py-1 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{item}</a>
                        ))}
                        <Link href={route('register')} className="py-2.5 rounded-full text-sm font-bold text-center" style={{ background: T.gold, color: '#07080f' }}>Get Started</Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}

/* ─────────────────────────────────────────
   HERO
───────────────────────────────────────── */
function Hero({ totalCount, filteredCount, searchActive }) {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, -60]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section className="relative overflow-hidden pt-32 pb-16">
            <GlowOrb color={T.gold} size="700px" top="-20%" left="-10%" opacity={0.08} blur={240} />
            <GlowOrb color={T.indigo} size="500px" top="10%" left="55%" opacity={0.07} blur={200} />
            <GlowOrb color={T.gold} size="300px" top="60%" left="75%" opacity={0.05} blur={160} />

            {/* Grid texture */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
                style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />

            <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                {/* Eyebrow */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8"
                    style={{ background: T.gold + '08', borderColor: T.gold + '25' }}>
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: T.gold }} />
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: T.gold }}>
                        {totalCount} LSK-Verified Advocates · Available Now
                    </span>
                </motion.div>

                {/* Headline */}
                <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
                    className="font-black leading-[1.02] tracking-tight mb-6 text-white"
                    style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontFamily: 'Georgia, "Times New Roman", serif' }}>
                    Find the Right Lawyer
                    <br />
                    <span style={{ background: `linear-gradient(135deg, ${T.gold} 0%, ${T.goldL} 50%, ${T.gold} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        for Your Case
                    </span>
                </motion.h1>

                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
                    style={{ color: 'rgba(255,255,255,0.55)' }}>
                    Browse verified legal professionals by expertise, location, and track record.
                    Every advocate is <span className="font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>LSK-certified</span>,
                    client-reviewed, and available to start your case today.
                </motion.p>

                {/* Trust stats */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                    className="flex flex-wrap items-center justify-center gap-8">
                    {[
                        { label: 'Verified Advocates', value: '312+', icon: BadgeCheck, color: T.jade },
                        { label: 'Avg. Response Time', value: '< 5 min', icon: Clock, color: T.gold },
                        { label: 'Cases Resolved', value: '8,400+', icon: CheckCircle, color: T.indigo },
                        { label: 'Client Rating', value: '4.8 ★', icon: Star, color: T.gold },
                    ].map(({ label, value, icon: Icon, color }, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <Icon className="w-4 h-4" style={{ color }} />
                            <span className="font-black text-white text-sm">{value}</span>
                            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{label}</span>
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}

/* ─────────────────────────────────────────
   SEARCH + FILTER BAR
───────────────────────────────────────── */
function FilterBar({ filters, setFilters, resultCount, onReset }) {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);
    const [priceOpen, setPriceOpen] = useState(false);
    const sortRef = useRef(null);

    useEffect(() => {
        const fn = (e) => { if (sortRef.current && !sortRef.current.contains(e.target)) setSortOpen(false); };
        document.addEventListener('mousedown', fn);
        return () => document.removeEventListener('mousedown', fn);
    }, []);

    const hasActiveFilters = filters.caseType !== 'all' || filters.location !== 'All Kenya' ||
        filters.minRating > 0 || filters.availableOnly || filters.maxPrice < 500 || filters.search;

    return (
        <div className="sticky top-16 z-40 border-b" style={{ background: T.bg1 + 'f0', borderColor: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}>
            <div className="max-w-7xl mx-auto px-6 py-4">
                {/* Main search row */}
                <div className="flex items-center gap-3 flex-wrap">
                    {/* Search input */}
                    <div className="flex items-center gap-3 flex-1 min-w-64 px-4 py-3 rounded-2xl border transition-all focus-within:border-white/20"
                        style={{ background: T.bg3, borderColor: 'rgba(255,255,255,0.08)' }}>
                        <Search className="w-4 h-4 flex-shrink-0" style={{ color: T.gold }} />
                        <input
                            value={filters.search}
                            onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
                            placeholder="Search by name, specialization, or keyword..."
                            className="flex-1 bg-transparent text-sm outline-none placeholder:text-white/25"
                            style={{ color: 'white' }}
                        />
                        {filters.search && (
                            <button onClick={() => setFilters(f => ({ ...f, search: '' }))} style={{ color: 'rgba(255,255,255,0.3)' }}>
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {/* Case type pills — desktop */}
                    <div className="hidden xl:flex items-center gap-1.5 flex-wrap">
                        {CASE_TYPES.slice(0, 6).map(({ id, label, icon: Icon }) => (
                            <button key={id} onClick={() => setFilters(f => ({ ...f, caseType: id }))}
                                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all"
                                style={{
                                    background: filters.caseType === id ? T.gold + '20' : T.bg3,
                                    borderColor: filters.caseType === id ? T.gold + '50' : 'rgba(255,255,255,0.08)',
                                    color: filters.caseType === id ? T.gold : 'rgba(255,255,255,0.5)',
                                }}>
                                <Icon className="w-3 h-3" />
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* Location dropdown */}
                    <select value={filters.location} onChange={e => setFilters(f => ({ ...f, location: e.target.value }))}
                        className="px-4 py-3 rounded-2xl text-sm font-medium outline-none border transition-all appearance-none cursor-pointer"
                        style={{ background: T.bg3, borderColor: filters.location !== 'All Kenya' ? T.gold + '45' : 'rgba(255,255,255,0.08)', color: filters.location !== 'All Kenya' ? T.gold : 'rgba(255,255,255,0.5)', minWidth: 140 }}>
                        {LOCATIONS.map(l => <option key={l} value={l} style={{ background: T.bg3 }}>{l === 'All Kenya' ? '📍 All Kenya' : `📍 ${l}`}</option>)}
                    </select>

                    {/* Availability toggle */}
                    <button onClick={() => setFilters(f => ({ ...f, availableOnly: !f.availableOnly }))}
                        className="flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-semibold border transition-all"
                        style={{
                            background: filters.availableOnly ? T.jade + '15' : T.bg3,
                            borderColor: filters.availableOnly ? T.jade + '40' : 'rgba(255,255,255,0.08)',
                            color: filters.availableOnly ? T.jade : 'rgba(255,255,255,0.5)',
                        }}>
                        <AvailabilityDot available={true} size="sm" />
                        Online Now
                    </button>

                    {/* Rating filter */}
                    <div className="flex items-center gap-1 px-4 py-3 rounded-2xl border transition-all"
                        style={{ background: T.bg3, borderColor: filters.minRating > 0 ? T.gold + '40' : 'rgba(255,255,255,0.08)' }}>
                        <Star className="w-3.5 h-3.5" style={{ color: T.gold }} />
                        <select value={filters.minRating} onChange={e => setFilters(f => ({ ...f, minRating: Number(e.target.value) }))}
                            className="bg-transparent text-xs font-semibold outline-none cursor-pointer appearance-none"
                            style={{ color: filters.minRating > 0 ? T.gold : 'rgba(255,255,255,0.5)' }}>
                            <option value={0} style={{ background: T.bg3 }}>Any rating</option>
                            <option value={4} style={{ background: T.bg3 }}>4.0+</option>
                            <option value={4.5} style={{ background: T.bg3 }}>4.5+</option>
                            <option value={4.8} style={{ background: T.bg3 }}>4.8+</option>
                        </select>
                    </div>

                    {/* Sort */}
                    <div className="relative" ref={sortRef}>
                        <button onClick={() => setSortOpen(v => !v)}
                            className="flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-semibold border transition-all"
                            style={{ background: T.bg3, borderColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}>
                            <TrendingUp className="w-3.5 h-3.5" />
                            {SORT_OPTIONS.find(s => s.id === filters.sort)?.label}
                            <ChevronDown className="w-3 h-3" style={{ transform: sortOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                        </button>
                        <AnimatePresence>
                            {sortOpen && (
                                <motion.div initial={{ opacity: 0, y: 8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 4, scale: 0.97 }}
                                    className="absolute right-0 top-14 w-52 rounded-2xl border overflow-hidden shadow-2xl z-50"
                                    style={{ background: T.bg3, borderColor: 'rgba(255,255,255,0.12)', boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}>
                                    {SORT_OPTIONS.map(opt => (
                                        <button key={opt.id} onClick={() => { setFilters(f => ({ ...f, sort: opt.id })); setSortOpen(false); }}
                                            className="w-full text-left px-4 py-3 text-xs font-medium border-b last:border-0 hover:bg-white/5 transition-colors"
                                            style={{ borderColor: 'rgba(255,255,255,0.05)', color: filters.sort === opt.id ? T.gold : 'rgba(255,255,255,0.6)' }}>
                                            {filters.sort === opt.id && '✓ '}{opt.label}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Reset */}
                    {hasActiveFilters && (
                        <button onClick={onReset} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all"
                            style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }}>
                            <RotateCcw className="w-3 h-3" /> Reset
                        </button>
                    )}
                </div>

                {/* Case type row — shown below on smaller screens */}
                <div className="xl:hidden flex items-center gap-1.5 flex-wrap mt-3">
                    {CASE_TYPES.map(({ id, label, icon: Icon }) => (
                        <button key={id} onClick={() => setFilters(f => ({ ...f, caseType: id }))}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold border transition-all"
                            style={{
                                background: filters.caseType === id ? T.gold + '18' : T.bg3,
                                borderColor: filters.caseType === id ? T.gold + '45' : 'rgba(255,255,255,0.07)',
                                color: filters.caseType === id ? T.gold : 'rgba(255,255,255,0.4)',
                            }}>
                            <Icon className="w-3 h-3" />
                            {label}
                        </button>
                    ))}
                </div>

                {/* Result count row */}
                <div className="flex items-center justify-between mt-3">
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                        Showing <span className="font-bold" style={{ color: 'rgba(255,255,255,0.7)' }}>{resultCount}</span> advocate{resultCount !== 1 ? 's' : ''}
                        {filters.location !== 'All Kenya' && <> in <span style={{ color: T.gold }}>{filters.location}</span></>}
                    </p>
                    {hasActiveFilters && (
                        <p className="text-xs font-semibold" style={{ color: T.gold }}>
                            {[
                                filters.caseType !== 'all' && filters.caseType,
                                filters.availableOnly && 'Online',
                                filters.minRating > 0 && `${filters.minRating}★+`,
                            ].filter(Boolean).join(' · ')}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────
   LAWYER CARD
───────────────────────────────────────── */
function LawyerCard({ lawyer, index, onViewProfile }) {
    const [saved, setSaved] = useState(false);
    const [hovered, setHovered] = useState(false);
    const SpecIcon = SPEC_ICONS[lawyer.primarySpec] || Scale;

    return (
        <motion.div
            variants={cardVariant}
            layout
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            className="group relative flex flex-col rounded-3xl border overflow-hidden cursor-pointer"
            style={{
                background: T.bg3,
                borderColor: hovered ? T.gold + '30' : 'rgba(255,255,255,0.07)',
                boxShadow: hovered ? `0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px ${T.gold}20` : '0 4px 20px rgba(0,0,0,0.3)',
                transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
                transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
            }}
        >
            {/* Featured glow */}
            {lawyer.featured && (
                <div className="absolute inset-0 rounded-3xl pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at top left, ${T.gold}08 0%, transparent 60%)` }} />
            )}

            {/* Top accent line */}
            <div className="h-0.5 w-full" style={{ background: hovered ? `linear-gradient(90deg, ${lawyer.accentColor}80, transparent)` : 'transparent', transition: 'background 0.4s' }} />

            <div className="p-6 flex flex-col flex-1">
                {/* Header row */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-xl border-2 transition-all"
                                style={{ background: `linear-gradient(135deg, ${lawyer.accentColor}25, ${lawyer.accentColor}10)`, borderColor: lawyer.accentColor + '50', color: lawyer.accentColor }}>
                                {lawyer.initials}
                            </div>
                            {/* Availability indicator */}
                            <div className="absolute -bottom-1 -right-1 flex items-center gap-1 px-1.5 py-0.5 rounded-full border text-[9px] font-bold"
                                style={{ background: lawyer.available ? T.jade + '20' : T.bg4, borderColor: lawyer.available ? T.jade + '40' : 'rgba(255,255,255,0.1)', color: lawyer.available ? T.jade : 'rgba(255,255,255,0.3)' }}>
                                <div className={`w-1.5 h-1.5 rounded-full ${lawyer.available ? 'animate-pulse' : ''}`} style={{ background: lawyer.available ? T.jade : 'rgba(255,255,255,0.2)' }} />
                                {lawyer.available ? 'Online' : 'Busy'}
                            </div>
                        </div>

                        {/* Name + title */}
                        <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                                <h3 className="font-black text-white text-base leading-tight">{lawyer.name}</h3>
                                {lawyer.verified && (
                                    <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: T.jade + '25', border: `1px solid ${T.jade}40` }}>
                                        <CheckCircle className="w-2.5 h-2.5" style={{ color: T.jade }} />
                                    </div>
                                )}
                            </div>
                            <p className="text-[11px] leading-snug mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>{lawyer.title}</p>
                            {/* Tags */}
                            <div className="flex flex-wrap gap-1">
                                {lawyer.tags.slice(0, 3).map(tag => <LawyerTag key={tag} tag={tag} />)}
                            </div>
                        </div>
                    </div>

                    {/* Save button */}
                    <button onClick={e => { e.stopPropagation(); setSaved(s => !s); }}
                        className="w-8 h-8 rounded-xl flex items-center justify-center border transition-all flex-shrink-0"
                        style={{ background: saved ? T.red + '18' : 'transparent', borderColor: saved ? T.red + '35' : 'rgba(255,255,255,0.08)', color: saved ? T.red : 'rgba(255,255,255,0.3)' }}>
                        <Heart className="w-4 h-4" style={{ fill: saved ? T.red : 'none' }} />
                    </button>
                </div>

                {/* Specializations */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {lawyer.specializations.map((spec, i) => {
                        const Icon = SPEC_ICONS[spec] || Scale;
                        return (
                            <div key={i} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-semibold"
                                style={{ background: i === 0 ? lawyer.accentColor + '14' : 'rgba(255,255,255,0.04)', borderColor: i === 0 ? lawyer.accentColor + '30' : 'rgba(255,255,255,0.07)', color: i === 0 ? lawyer.accentColor : 'rgba(255,255,255,0.45)' }}>
                                <Icon className="w-3 h-3" />
                                {spec}
                            </div>
                        );
                    })}
                </div>

                {/* Bio */}
                <p className="text-[12px] leading-relaxed mb-4 flex-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    {lawyer.bio.length > 140 ? lawyer.bio.slice(0, 140) + '...' : lawyer.bio}
                </p>

                {/* Stats grid */}
                <div className="grid grid-cols-4 gap-2 mb-4 p-3 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    {[
                        { label: 'Experience', value: `${lawyer.experience}yr`, color: lawyer.accentColor },
                        { label: 'Win Rate', value: `${lawyer.winRate}%`, color: lawyer.winRate >= 85 ? T.jade : lawyer.winRate >= 75 ? T.amber : T.red },
                        { label: 'Cases', value: lawyer.cases, color: 'rgba(255,255,255,0.7)' },
                        { label: 'Response', value: lawyer.responseTime, color: T.jade },
                    ].map(({ label, value, color }, i) => (
                        <div key={i} className="text-center">
                            <p className="font-black text-sm leading-tight" style={{ color, fontFamily: 'Georgia, serif' }}>{value}</p>
                            <p className="text-[9px] mt-0.5 uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.25)' }}>{label}</p>
                        </div>
                    ))}
                </div>

                {/* Rating + location */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <StarRating rating={lawyer.rating} size={12} showNumber={true} />
                        <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.3)' }}>({lawyer.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3" style={{ color: 'rgba(255,255,255,0.3)' }} />
                        <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.4)' }}>{lawyer.location}</span>
                    </div>
                </div>

                {/* Languages */}
                <div className="flex items-center gap-1.5 mb-4">
                    <Globe className="w-3 h-3 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.25)' }} />
                    <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.35)' }}>{lawyer.languages.join(' · ')}</span>
                </div>

                {/* Recent wins — shown on hover */}
                <AnimatePresence>
                    {hovered && lawyer.recentWins.length > 0 && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                            className="mb-4 overflow-hidden">
                            <div className="p-3 rounded-xl border" style={{ background: T.jade + '08', borderColor: T.jade + '20' }}>
                                <p className="text-[9px] font-black uppercase tracking-widest mb-2" style={{ color: T.jade }}>Recent Wins</p>
                                {lawyer.recentWins.map((win, i) => (
                                    <div key={i} className="flex items-start gap-2 mt-1">
                                        <CheckCircle className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: T.jade }} />
                                        <p className="text-[11px] leading-snug" style={{ color: 'rgba(255,255,255,0.6)' }}>{win}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Divider + Price */}
                <div className="border-t pt-4 flex items-center justify-between mb-4" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                    <div>
                        <p className="text-[9px] uppercase tracking-widest font-bold mb-0.5" style={{ color: 'rgba(255,255,255,0.25)' }}>Consultation</p>
                        <div className="flex items-baseline gap-1">
                            <span className="font-black text-xl text-white" style={{ fontFamily: 'Georgia, serif' }}>{lawyer.consultationFee}</span>
                            <span className="text-xs font-semibold" style={{ color: T.gold }}>credits</span>
                            <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.25)' }}>≈ KES {lawyer.consultationFee * 10}</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-[9px] font-mono uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.2)' }}>{lawyer.lsk}</p>
                        <p className="text-[10px] font-semibold" style={{ color: T.jade }}>✓ LSK Verified</p>
                    </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                    <button onClick={() => onViewProfile(lawyer)}
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-bold border transition-all"
                        style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}>
                        <Eye className="w-3.5 h-3.5" /> View Profile
                    </button>
                    <button className="w-10 h-10 rounded-2xl flex items-center justify-center border transition-all flex-shrink-0"
                        style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}>
                        <MessageSquare className="w-4 h-4" />
                    </button>
                    <Link href={route('register')}
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-black transition-all"
                        style={{ background: lawyer.available ? T.gold : 'rgba(255,255,255,0.06)', color: lawyer.available ? '#07080f' : 'rgba(255,255,255,0.3)', boxShadow: lawyer.available ? `0 8px 20px ${T.gold}25` : 'none' }}>
                        {lawyer.available ? (
                            <><Gavel className="w-3.5 h-3.5" /> Hire Lawyer</>
                        ) : (
                            <>⏳ Notify Me</>
                        )}
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

/* ─────────────────────────────────────────
   LAWYER PROFILE MODAL
───────────────────────────────────────── */
function LawyerProfileModal({ lawyer, onClose }) {
    const SpecIcon = SPEC_ICONS[lawyer.primarySpec] || Scale;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
            onClick={onClose}>
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl"
                style={{ background: T.bg3, border: `1px solid ${T.gold}25`, maxHeight: '90vh', overflowY: 'auto' }}
                onClick={e => e.stopPropagation()}>

                {/* Modal header */}
                <div className="relative p-8 pb-0">
                    {/* Background accent */}
                    <div className="absolute inset-0 pointer-events-none"
                        style={{ background: `radial-gradient(ellipse at top left, ${lawyer.accentColor}12 0%, transparent 60%)` }} />

                    <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 rounded-xl flex items-center justify-center border transition-all hover:bg-white/8"
                        style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}>
                        <X className="w-4 h-4" />
                    </button>

                    <div className="relative z-10 flex items-start gap-5 mb-6">
                        <div className="w-20 h-20 rounded-3xl flex items-center justify-center font-black text-2xl border-2 flex-shrink-0"
                            style={{ background: `linear-gradient(135deg, ${lawyer.accentColor}30, ${lawyer.accentColor}12)`, borderColor: lawyer.accentColor + '60', color: lawyer.accentColor }}>
                            {lawyer.initials}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1 flex-wrap">
                                <h2 className="font-black text-white text-2xl">{lawyer.name}</h2>
                                {lawyer.verified && (
                                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-full border text-[10px] font-bold"
                                        style={{ background: T.jade + '18', borderColor: T.jade + '35', color: T.jade }}>
                                        <BadgeCheck className="w-3 h-3" /> LSK Verified
                                    </div>
                                )}
                                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold"
                                    style={{ background: lawyer.available ? T.jade + '15' : 'rgba(255,255,255,0.05)', borderColor: lawyer.available ? T.jade + '30' : 'rgba(255,255,255,0.1)', color: lawyer.available ? T.jade : 'rgba(255,255,255,0.35)' }}>
                                    <AvailabilityDot available={lawyer.available} size="sm" />
                                    {lawyer.available ? 'Available Now' : 'Currently Busy'}
                                </div>
                            </div>
                            <p className="text-sm mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>{lawyer.title}</p>
                            <p className="text-[11px] font-mono" style={{ color: 'rgba(255,255,255,0.25)' }}>{lawyer.lsk} · {lawyer.county}</p>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="relative z-10 flex flex-wrap gap-2 mb-6">
                        {lawyer.tags.map(tag => <LawyerTag key={tag} tag={tag} />)}
                    </div>
                </div>

                <div className="px-8 pb-8">
                    {/* Stats */}
                    <div className="grid grid-cols-4 gap-3 mb-6 p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        {[
                            { label: 'Experience', value: `${lawyer.experience} yrs`, color: lawyer.accentColor },
                            { label: 'Win Rate', value: `${lawyer.winRate}%`, color: lawyer.winRate >= 85 ? T.jade : T.amber },
                            { label: 'Cases', value: lawyer.cases, color: 'rgba(255,255,255,0.8)' },
                            { label: 'Response', value: lawyer.responseTime, color: T.jade },
                        ].map(({ label, value, color }, i) => (
                            <div key={i} className="text-center p-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                                <p className="font-black text-lg leading-tight mb-0.5" style={{ color, fontFamily: 'Georgia, serif' }}>{value}</p>
                                <p className="text-[10px] uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.3)' }}>{label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-3 mb-6 p-4 rounded-2xl" style={{ background: T.gold + '08', border: `1px solid ${T.gold}20` }}>
                        <StarRating rating={lawyer.rating} size={18} showNumber={false} />
                        <p className="font-black text-3xl" style={{ color: T.gold, fontFamily: 'Georgia, serif' }}>{lawyer.rating.toFixed(1)}</p>
                        <div>
                            <p className="text-white font-semibold text-sm">Client Rating</p>
                            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Based on {lawyer.reviews} verified client reviews</p>
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="mb-5">
                        <p className="text-[11px] uppercase tracking-widest font-bold mb-2" style={{ color: 'rgba(255,255,255,0.25)' }}>About</p>
                        <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>{lawyer.bio}</p>
                    </div>

                    {/* Specializations */}
                    <div className="mb-5">
                        <p className="text-[11px] uppercase tracking-widest font-bold mb-3" style={{ color: 'rgba(255,255,255,0.25)' }}>Practice Areas</p>
                        <div className="flex flex-wrap gap-2">
                            {lawyer.specializations.map((spec, i) => {
                                const Icon = SPEC_ICONS[spec] || Scale;
                                return (
                                    <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-semibold"
                                        style={{ background: i === 0 ? lawyer.accentColor + '15' : 'rgba(255,255,255,0.04)', borderColor: i === 0 ? lawyer.accentColor + '35' : 'rgba(255,255,255,0.08)', color: i === 0 ? lawyer.accentColor : 'rgba(255,255,255,0.6)' }}>
                                        <Icon className="w-3.5 h-3.5" /> {spec}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Recent wins */}
                    <div className="mb-5">
                        <p className="text-[11px] uppercase tracking-widest font-bold mb-3" style={{ color: 'rgba(255,255,255,0.25)' }}>Recent Case Outcomes</p>
                        <div className="space-y-2">
                            {lawyer.recentWins.map((win, i) => (
                                <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: T.jade + '08', border: `1px solid ${T.jade}18` }}>
                                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: T.jade }} />
                                    <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>{win}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Languages */}
                    <div className="mb-6">
                        <p className="text-[11px] uppercase tracking-widest font-bold mb-2" style={{ color: 'rgba(255,255,255,0.25)' }}>Languages</p>
                        <div className="flex gap-2">
                            {lawyer.languages.map((lang, i) => (
                                <span key={i} className="px-3 py-1 rounded-lg text-xs font-semibold border"
                                    style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}>{lang}</span>
                            ))}
                        </div>
                    </div>

                    {/* Price + CTA */}
                    <div className="border-t pt-6" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="text-[11px] uppercase tracking-widest font-bold mb-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>Consultation Fee</p>
                                <div className="flex items-baseline gap-1.5">
                                    <span className="text-3xl font-black text-white" style={{ fontFamily: 'Georgia, serif' }}>{lawyer.consultationFee}</span>
                                    <span className="text-sm font-bold" style={{ color: T.gold }}>credits</span>
                                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>≈ KES {lawyer.consultationFee * 10}</span>
                                </div>
                                <p className="text-[11px] mt-1" style={{ color: T.jade }}>Protected by escrow · Release on milestone confirmation</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-bold border transition-all"
                                style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}>
                                <MessageSquare className="w-4 h-4" /> Send Message
                            </button>
                            <Link href={route('register')}
                                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-black transition-all"
                                style={{ background: lawyer.available ? T.gold : 'rgba(255,255,255,0.08)', color: lawyer.available ? '#07080f' : 'rgba(255,255,255,0.4)', boxShadow: lawyer.available ? `0 12px 30px ${T.gold}30` : 'none' }}>
                                <Gavel className="w-4 h-4" />
                                {lawyer.available ? 'Hire Now' : 'Join Waitlist'}
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

/* ─────────────────────────────────────────
   FEATURED LAWYERS — HORIZONTAL STRIP
───────────────────────────────────────── */
function FeaturedStrip({ lawyers, onViewProfile }) {
    const featured = lawyers.filter(l => l.featured);
    if (!featured.length) return null;

    return (
        <section className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center gap-3 mb-5">
                <Sparkles className="w-4 h-4" style={{ color: T.gold }} />
                <h2 className="font-bold text-white text-sm">Featured Advocates</h2>
                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>Handpicked for exceptional track records</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {featured.map((lawyer) => (
                    <motion.div key={lawyer.id} whileHover={{ y: -4 }} transition={{ duration: 0.3 }}
                        onClick={() => onViewProfile(lawyer)}
                        className="flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all"
                        style={{ background: `linear-gradient(135deg, ${lawyer.accentColor}08, transparent)`, borderColor: lawyer.accentColor + '25' }}>
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-base border-2 flex-shrink-0"
                            style={{ background: lawyer.accentColor + '22', borderColor: lawyer.accentColor + '50', color: lawyer.accentColor }}>
                            {lawyer.initials}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                                <p className="font-bold text-white text-sm truncate">{lawyer.name}</p>
                                {lawyer.available && <AvailabilityDot available size="sm" />}
                            </div>
                            <p className="text-[11px] mb-1 truncate" style={{ color: 'rgba(255,255,255,0.45)' }}>{lawyer.primarySpec}</p>
                            <div className="flex items-center gap-2">
                                <StarRating rating={lawyer.rating} size={10} showNumber={true} />
                                <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>{lawyer.winRate}% wins</span>
                            </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                            <p className="font-black text-base" style={{ color: lawyer.accentColor, fontFamily: 'Georgia, serif' }}>{lawyer.consultationFee}</p>
                            <p className="text-[9px]" style={{ color: T.gold }}>credits</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────
   EMPTY STATE
───────────────────────────────────────── */
function EmptyState({ onReset }) {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6"
                style={{ background: T.gold + '12', border: `2px dashed ${T.gold}30` }}>
                <Scale className="w-8 h-8" style={{ color: T.gold + '60' }} />
            </div>
            <h3 className="text-white font-bold text-xl mb-2">No advocates found</h3>
            <p className="text-sm mb-6 max-w-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Try adjusting your filters or broadening your search to find the right advocate for your matter.
            </p>
            <button onClick={onReset} className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all"
                style={{ background: T.gold, color: '#07080f' }}>
                <RotateCcw className="w-4 h-4" /> Reset All Filters
            </button>
        </motion.div>
    );
}

/* ─────────────────────────────────────────
   CTA BANNER
───────────────────────────────────────── */
function CTABanner() {
    return (
        <section className="max-w-7xl mx-auto px-6 py-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="relative overflow-hidden rounded-3xl border p-10 text-center"
                style={{ background: `linear-gradient(135deg, ${T.gold}10 0%, ${T.indigo}08 50%, transparent 100%)`, borderColor: T.gold + '20' }}>
                <GlowOrb color={T.gold} size="400px" top="50%" left="50%" opacity={0.08} blur={180} />
                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
                        style={{ background: T.gold + '10', borderColor: T.gold + '25' }}>
                        <Phone className="w-3.5 h-3.5" style={{ color: T.red }} />
                        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: T.red }}>🆘 Emergency Legal Help</span>
                    </div>
                    <h2 className="font-black text-white text-3xl mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                        Under arrest? In active crisis?
                    </h2>
                    <p className="text-sm mb-6 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.5)' }}>
                        The Emergency Legal Button is always free. One tap sends your GPS, calls a duty advocate, and alerts your next-of-kin — no credits required.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link href={route('register')}
                            className="flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-black transition-all"
                            style={{ background: T.gold, color: '#07080f', boxShadow: `0 12px 30px ${T.gold}30` }}>
                            <Gavel className="w-4 h-4" /> Start Your Case Free
                        </Link>
                        <button className="flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-bold border transition-all"
                            style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)' }}>
                            <Brain className="w-4 h-4" /> Ask AI First
                        </button>
                    </div>
                    <p className="text-[11px] mt-4" style={{ color: 'rgba(255,255,255,0.25)' }}>
                        No credit card required · AES-256 Encrypted · Kenya Data Protection Act Compliant
                    </p>
                </div>
            </motion.div>
        </section>
    );
}

// Import Brain for CTA (was missing)
function Brain({ className, style }) {
    return <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={16} height={16}><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" /><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" /></svg>;
}

/* ─────────────────────────────────────────
   FOOTER
───────────────────────────────────────── */
function Footer() {
    return (
        <footer className="border-t py-10" style={{ background: T.bg2, borderColor: 'rgba(255,255,255,0.06)' }}>
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-5">
                <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center border" style={{ background: T.gold + '15', borderColor: T.gold + '30' }}>
                        <Scale className="w-3.5 h-3.5" style={{ color: T.gold }} />
                    </div>
                    <span className="font-black text-white text-base">Veritex</span>
                    <span className="text-xs ml-1" style={{ color: 'rgba(255,255,255,0.2)' }}>Legal Rights & Justice Platform</span>
                </div>
                <div className="flex flex-wrap justify-center gap-6 text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    {['Practice Areas', 'AI Engine', 'For Lawyers', 'Privacy', 'Terms', 'LSK Compliance'].map(l => (
                        <a key={l} href="#" className="hover:text-white/60 transition-colors">{l}</a>
                    ))}
                </div>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>© 2026 Veritex. Built in Nairobi 🇰🇪</p>
            </div>
        </footer>
    );
}

/* ─────────────────────────────────────────
   ROOT PAGE
───────────────────────────────────────── */
const defaultFilters = {
    search: '',
    caseType: 'all',
    location: 'All Kenya',
    minRating: 0,
    maxPrice: 500,
    availableOnly: false,
    sort: 'recommended',
};

export default function LawyersPage({ auth }) {
    const [filters, setFilters] = useState(defaultFilters);
    const [profileModal, setProfileModal] = useState(null);
    const [page, setPage] = useState(1);
    const CARDS_PER_PAGE = 6;

    const filtered = useMemo(() => {
        let result = [...LAWYERS];

        if (filters.search) {
            const q = filters.search.toLowerCase();
            result = result.filter(l =>
                l.name.toLowerCase().includes(q) ||
                l.specializations.some(s => s.toLowerCase().includes(q)) ||
                l.bio.toLowerCase().includes(q) ||
                l.location.toLowerCase().includes(q)
            );
        }

        if (filters.caseType !== 'all') {
            result = result.filter(l => l.specializations.some(s => s.includes(filters.caseType) || filters.caseType.includes(s)));
        }

        if (filters.location !== 'All Kenya') {
            result = result.filter(l => l.location === filters.location || l.county.includes(filters.location));
        }

        if (filters.minRating > 0) {
            result = result.filter(l => l.rating >= filters.minRating);
        }

        if (filters.availableOnly) {
            result = result.filter(l => l.available);
        }

        if (filters.maxPrice < 500) {
            result = result.filter(l => l.consultationFee <= filters.maxPrice);
        }

        // Sort
        switch (filters.sort) {
            case 'rating': result.sort((a, b) => b.rating - a.rating); break;
            case 'price_asc': result.sort((a, b) => a.consultationFee - b.consultationFee); break;
            case 'price_desc': result.sort((a, b) => b.consultationFee - a.consultationFee); break;
            case 'experience': result.sort((a, b) => b.experience - a.experience); break;
            case 'winrate': result.sort((a, b) => b.winRate - a.winRate); break;
            case 'response': result.sort((a, b) => a.responseTime.localeCompare(b.responseTime)); break;
            default: result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)); break;
        }

        return result;
    }, [filters]);

    const paginated = filtered.slice(0, page * CARDS_PER_PAGE);
    const hasMore = paginated.length < filtered.length;

    const resetFilters = () => { setFilters(defaultFilters); setPage(1); };

    // Reset page on filter change
    useEffect(() => { setPage(1); }, [filters]);

    return (
        <>
            <Head title="Find a Lawyer — Veritex | Kenya's Legal Marketplace" />

            <div className="min-h-screen" style={{ background: T.bg0, color: 'white', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
                <Nav auth={auth} />
                <Hero totalCount={LAWYERS.length} filteredCount={filtered.length} searchActive={!!filters.search} />
                <FilterBar filters={filters} setFilters={setFilters} resultCount={filtered.length} onReset={resetFilters} />

                <main className="max-w-7xl mx-auto px-6">
                    {/* Featured strip */}
                    {filters.sort === 'recommended' && !filters.search && filters.caseType === 'all' && (
                        <FeaturedStrip lawyers={LAWYERS} onViewProfile={setProfileModal} />
                    )}

                    {/* Main grid */}
                    <section className="py-8">
                        {filtered.length > 0 ? (
                            <>
                                <motion.div
                                    layout
                                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
                                    variants={stagger(0.07)}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <AnimatePresence mode="popLayout">
                                        {paginated.map((lawyer, i) => (
                                            <LawyerCard
                                                key={lawyer.id}
                                                lawyer={lawyer}
                                                index={i}
                                                onViewProfile={setProfileModal}
                                            />
                                        ))}
                                    </AnimatePresence>
                                </motion.div>

                                {/* Load more */}
                                {hasMore && (
                                    <div className="flex justify-center mt-10">
                                        <motion.button
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            onClick={() => setPage(p => p + 1)}
                                            className="flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold border transition-all hover:border-white/20"
                                            style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}>
                                            Show More Advocates ({filtered.length - paginated.length} remaining)
                                            <ChevronDown className="w-4 h-4" />
                                        </motion.button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <EmptyState onReset={resetFilters} />
                        )}
                    </section>

                    <CTABanner />
                </main>

                <Footer />

                {/* Profile modal */}
                <AnimatePresence>
                    {profileModal && (
                        <LawyerProfileModal lawyer={profileModal} onClose={() => setProfileModal(null)} />
                    )}
                </AnimatePresence>

                {/* Floating emergency button */}
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.5 }}
                    className="fixed bottom-6 right-6 z-40">
                    <button className="flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-black shadow-2xl border transition-all hover:scale-105"
                        style={{ background: '#EF444418', borderColor: '#EF444435', color: '#EF4444', boxShadow: '0 8px 30px rgba(239,68,68,0.2)' }}>
                        <Phone className="w-4 h-4" />
                        🆘 Emergency
                    </button>
                </motion.div>
            </div>
        </>
    );
}