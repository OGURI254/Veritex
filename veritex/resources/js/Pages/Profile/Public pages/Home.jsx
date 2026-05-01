import { Head, Link } from '@inertiajs/react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import {
    Scale, ShieldCheck, Zap, ArrowRight, FileText, Globe, Users,
    BookOpen, Lock, Brain, AlertTriangle, TrendingUp, Star,
    ChevronDown, CheckCircle, Landmark, BadgeCheck, Coins,
    MessageSquare, MapPin, BarChart2, Gavel, Phone, Menu, X, Home as HomeIcon, Briefcase, Heart, UserX, Building, CreditCard,
    Clock, Award, ThumbsUp, Search, ChevronRight, Mic,
    PlayCircle, Fingerprint, Eye, EyeOff, HelpCircle
} from 'lucide-react';

/* ─────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────── */
const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
};

const stagger = (delay = 0.12) => ({
    hidden: {},
    visible: { transition: { staggerChildren: delay } }
});

const slideLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const slideRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

/* ─────────────────────────────────────────────
   REUSABLE HOOKS
───────────────────────────────────────────── */
function useScrollReveal(threshold = 0.15) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: threshold });
    return [ref, isInView];
}

/* ─────────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────────── */
function AnimatedCounter({ value, suffix = '', prefix = '', duration = 2 }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;
        const num = parseFloat(value.replace(/[^0-9.]/g, ''));
        let start = 0;
        const step = num / (duration * 60);
        const timer = setInterval(() => {
            start += step;
            if (start >= num) { setCount(num); clearInterval(timer); }
            else setCount(parseFloat(start.toFixed(1)));
        }, 1000 / 60);
        return () => clearInterval(timer);
    }, [isInView, value, duration]);

    return (
        <span ref={ref}>
            {prefix}{typeof count === 'number' && count % 1 === 0 ? count.toFixed(0) : count}{suffix}
        </span>
    );
}

/* ─────────────────────────────────────────────
   FLOATING PARTICLES
───────────────────────────────────────────── */
function FloatingParticles({ count = 18 }) {
    const particles = Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 12 + 8,
        delay: Math.random() * 5,
        color: i % 3 === 0 ? 'rgba(212,175,55,0.35)' : i % 3 === 1 ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.12)',
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map(p => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full"
                    style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, background: p.color }}
                    animate={{ y: [0, -40, 0], x: [0, Math.random() * 20 - 10, 0], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
                />
            ))}
        </div>
    );
}

function GridTexture() {
    return (
        <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
                backgroundSize: '60px 60px',
            }}
        />
    );
}

function GlowOrb({ color, size, top, left, blur = 180, opacity = 0.15 }) {
    return (
        <div
            className="absolute rounded-full pointer-events-none"
            style={{ background: color, width: size, height: size, top, left, filter: `blur(${blur}px)`, opacity }}
        />
    );
}

function Section({ children, className = '' }) {
    const [ref, isInView] = useScrollReveal();
    return (
        <motion.section ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className={className}>
            {children}
        </motion.section>
    );
}

/* ─────────────────────────────────────────────
   NAV
───────────────────────────────────────────── */
function Nav({ auth }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const links = ['Practice Areas', 'AI Engine', 'How It Works', 'Lawyers'];

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-darkbg-300/90 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/40' : ''}`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2.5 group cursor-pointer">
                    <div className="relative">
                        <div className="absolute inset-0 rounded-2xl bg-secondary-500/20 blur-md group-hover:blur-lg transition-all" />
                        <img src="/Logo/icon.png" alt="Veritex Icon" className="relative w-10 h-10 object-contain rounded-2xl" />
                    </div>
                    <img src="/Logo/logo.png" alt="Veritex" className="h-6 object-contain" />
                </motion.div>

                <div className="hidden md:flex items-center gap-8">
                    {links.map((link, i) => (
                        <motion.a key={link} href={`#${link.toLowerCase().replace(/ /g, '-')}`}
                            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * i + 0.2 }}
                            className="text-sm text-accent-100/60 hover:text-white transition-colors font-medium tracking-wide">
                            {link}
                        </motion.a>
                    ))}
                </div>

                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="hidden md:flex items-center gap-3">
                    {auth?.user ? (
                        <Link href={route('dashboard')} className="px-5 py-2.5 rounded-full bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold transition-all shadow-lg shadow-primary-500/30">
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link href={route('login')} className="px-4 py-2 rounded-full text-accent-100/70 hover:text-white text-sm font-medium transition-colors">
                                Log in
                            </Link>
                            <Link href={route('register')} className="px-5 py-2.5 rounded-full bg-secondary-500 hover:bg-secondary-600 text-darkbg-300 text-sm font-bold transition-all shadow-lg shadow-secondary-500/20 hover:shadow-secondary-500/40">
                                Consult Now →
                            </Link>
                        </>
                    )}
                </motion.div>

                <button className="md:hidden text-white" onClick={() => setMobileOpen(v => !v)}>
                    {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-darkbg-200/95 backdrop-blur-xl border-t border-white/5 px-6 py-4 flex flex-col gap-4">
                        {links.map(link => (
                            <a key={link} href={`#${link.toLowerCase().replace(/ /g, '-')}`}
                                className="text-accent-100/70 hover:text-white transition-colors py-1" onClick={() => setMobileOpen(false)}>
                                {link}
                            </a>
                        ))}
                        <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
                            <Link href={route('login')} className="text-center py-2.5 rounded-full border border-white/10 text-sm font-medium text-accent-100/70">Log in</Link>
                            <Link href={route('register')} className="text-center py-2.5 rounded-full bg-secondary-500 text-darkbg-300 text-sm font-bold">Consult Now</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}

/* ─────────────────────────────────────────────
   HERO SECTION — Rewritten
───────────────────────────────────────────── */
function Hero({ auth }) {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, -80]);
    const y2 = useTransform(scrollY, [0, 500], [0, -40]);
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);

    const [query, setQuery] = useState('');
    const placeholders = [
        'My landlord locked me out illegally...',
        'I was dismissed without notice...',
        'Someone forged my title deed...',
        'My business partner defrauded me...',
        'I need to file for custody of my child...',
    ];
    const [phIndex, setPhIndex] = useState(0);

    useEffect(() => {
        const t = setInterval(() => setPhIndex(i => (i + 1) % placeholders.length), 3000);
        return () => clearInterval(t);
    }, []);

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
            <GlowOrb color="#D4AF37" size="600px" top="-10%" left="-15%" opacity={0.12} blur={200} />
            <GlowOrb color="#6366F1" size="500px" top="20%" left="55%" opacity={0.1} blur={180} />
            <GlowOrb color="#D4AF37" size="300px" top="60%" left="70%" opacity={0.08} blur={160} />
            <GridTexture />
            <FloatingParticles count={22} />

            <motion.div style={{ y: y1, opacity }} className="relative z-10 max-w-7xl mx-auto px-6 w-full">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

                    {/* Left: Text */}
                    <motion.div initial="hidden" animate="visible" variants={stagger(0.14)} className="flex-1 text-center lg:text-left">

                        {/* Urgency badge */}
                        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-secondary-500/30 bg-secondary-500/5 backdrop-blur-sm">
                            <div className="w-2 h-2 rounded-full bg-secondary-500 animate-pulse" />
                            <span className="text-secondary-500 text-xs font-semibold uppercase tracking-widest">Verified Advocates · AI Legal Intelligence · Available Now</span>
                        </motion.div>

                        {/* Headline — bold, direct */}
                        <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-[5.5rem] font-heading font-black leading-[1.04] tracking-tight mb-6">
                            {['Every Legal', 'Problem Has', 'an Answer.'].map((line, i) => (
                                <span key={i} className="block overflow-hidden">
                                    <motion.span
                                        className={`block ${i === 2 ? 'text-gradient' : 'text-white'}`}
                                        initial={{ y: '110%' }}
                                        animate={{ y: 0 }}
                                        transition={{ duration: 0.9, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        {line}
                                    </motion.span>
                                </span>
                            ))}
                        </motion.h1>

                        <motion.p variants={fadeUp} className="text-base lg:text-lg text-accent-100/60 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            Describe your situation. Our AI analyses it instantly — then connects you to a
                            <span className="text-accent-100/90 font-medium"> verified, bar-certified advocate</span> who
                            specialises in exactly your matter. No legal jargon. No waiting rooms. No surprises.
                        </motion.p>

                        {/* Search / query input */}
                        <motion.div variants={fadeUp} className="relative mb-8 max-w-xl mx-auto lg:mx-0">
                            <div className="relative group">
                                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-secondary-500/40 to-primary-500/20 blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                                <div className="relative flex items-center gap-3 px-5 py-4 rounded-2xl border border-white/10 bg-darkbg-200/80 backdrop-blur-md">
                                    <Search className="w-5 h-5 text-secondary-500 flex-shrink-0" />
                                    <input
                                        type="text"
                                        value={query}
                                        onChange={e => setQuery(e.target.value)}
                                        placeholder={placeholders[phIndex]}
                                        className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-accent-100/30 transition-all"
                                    />
                                    <Link href={route('register')}
                                        className="flex-shrink-0 px-4 py-2 rounded-xl bg-secondary-500 hover:bg-secondary-600 text-darkbg-300 text-xs font-bold transition-all">
                                        Analyse →
                                    </Link>
                                </div>
                            </div>
                            <p className="text-[11px] text-accent-100/25 mt-2 ml-1">Your query is encrypted end-to-end. Fully confidential.</p>
                        </motion.div>

                        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                            <Link href={route('register')}
                                className="group relative flex items-center gap-2 px-8 py-4 rounded-full bg-secondary-500 hover:bg-secondary-600 text-darkbg-300 font-bold text-sm tracking-wide transition-all shadow-xl shadow-secondary-500/20 hover:shadow-secondary-500/40">
                                <Phone className="w-4 h-4" />
                                <span>Speak to a Lawyer Now</span>
                                <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                            <a href="#how-it-works"
                                className="flex items-center gap-2 px-6 py-4 rounded-full border border-white/10 text-accent-100/70 hover:text-white hover:border-white/20 text-sm font-medium transition-all backdrop-blur-sm">
                                <PlayCircle className="w-4 h-4" />
                                See How It Works
                            </a>
                        </motion.div>

                        {/* Trust row */}
                        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-6 justify-center lg:justify-start">
                            <div className="flex items-center gap-2 text-xs text-accent-100/40">
                                <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
                                <span>LSK-Verified Advocates</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-accent-100/40">
                                <Lock className="w-3.5 h-3.5 text-secondary-500" />
                                <span>AES-256 Encrypted</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-accent-100/40">
                                <Clock className="w-3.5 h-3.5 text-primary-100" />
                                <span>Response in under 5 minutes</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right: Live Consultation Card */}
                    <motion.div
                        style={{ y: y2 }}
                        initial={{ opacity: 0, scale: 0.88 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="flex-1 w-full max-w-md lg:max-w-xl"
                    >
                        <div className="relative">
                            <div className="absolute -inset-4 rounded-[2rem] bg-secondary-500/10 blur-2xl" />
                            <div className="relative rounded-3xl border border-white/8 bg-darkbg-200/80 backdrop-blur-2xl overflow-hidden p-6 shadow-2xl shadow-black/50">

                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 rounded-xl bg-primary-500/20 border border-primary-500/20">
                                            <ShieldCheck className="w-5 h-5 text-primary-100" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-accent-100/40 uppercase tracking-widest">Active Consultation</p>
                                            <p className="text-sm font-semibold text-white">Employment · Wrongful Dismissal</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                        <span className="text-green-400 text-[10px] font-bold uppercase tracking-wider">Live</span>
                                    </div>
                                </div>

                                {/* AI response simulation */}
                                <div className="mb-5 space-y-3">
                                    <div className="flex gap-3">
                                        <div className="w-7 h-7 rounded-full bg-accent-100/10 border border-white/10 flex items-center justify-center flex-shrink-0">
                                            <Users className="w-3.5 h-3.5 text-accent-100/50" />
                                        </div>
                                        <div className="flex-1 p-3 rounded-xl rounded-tl-sm bg-white/5 border border-white/5">
                                            <p className="text-xs text-accent-100/70 leading-relaxed">I was terminated after 6 years without notice or any terminal dues. My employer says I was on probation — but I have never signed any probation contract.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 flex-row-reverse">
                                        <div className="w-7 h-7 rounded-full bg-secondary-500/20 border border-secondary-500/30 flex items-center justify-center flex-shrink-0">
                                            <Brain className="w-3.5 h-3.5 text-secondary-500" />
                                        </div>
                                        <div className="flex-1 p-3 rounded-xl rounded-tr-sm bg-secondary-500/10 border border-secondary-500/20">
                                            <p className="text-[10px] text-secondary-500 font-bold uppercase tracking-wider mb-1.5">Veritex AI · Legal Analysis</p>
                                            <p className="text-xs text-accent-100/80 leading-relaxed">Under <span className="text-secondary-500 font-semibold">Section 35 of the Employment Act 2007</span>, probation must be expressly agreed in writing. Without a signed contract, you are deemed a permanent employee entitled to full notice pay and severance. This is a strong unfair termination claim.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Advocate match */}
                                <div className="p-4 rounded-2xl bg-darkbg-300/80 border border-white/8 mb-4">
                                    <p className="text-[10px] text-accent-100/30 uppercase tracking-widest mb-3">Recommended Advocate</p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary-500/40 to-primary-500/30 border border-secondary-500/30 flex items-center justify-center text-sm font-black text-secondary-500">NK</div>
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-white">Njeri Kamau, Advocate</p>
                                            <p className="text-[11px] text-accent-100/40">Employment & Labour Law · 11 yrs · Nairobi</p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-secondary-500 text-secondary-500" />)}
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-3">
                                        <div className="flex-1 text-center py-2 rounded-lg bg-secondary-500/10 border border-secondary-500/20">
                                            <p className="text-[10px] text-accent-100/40">Win Rate</p>
                                            <p className="text-sm font-black text-secondary-500">89%</p>
                                        </div>
                                        <div className="flex-1 text-center py-2 rounded-lg bg-white/5 border border-white/8">
                                            <p className="text-[10px] text-accent-100/40">Cases</p>
                                            <p className="text-sm font-black text-white">214</p>
                                        </div>
                                        <div className="flex-1 text-center py-2 rounded-lg bg-green-500/10 border border-green-500/20">
                                            <p className="text-[10px] text-accent-100/40">Availability</p>
                                            <p className="text-sm font-black text-green-400">Now</p>
                                        </div>
                                    </div>
                                </div>

                                <button className="w-full py-3 rounded-xl bg-secondary-500 hover:bg-secondary-600 text-darkbg-300 text-sm font-black transition-all shadow-lg shadow-secondary-500/20">
                                    Book Consultation →
                                </button>
                            </div>

                            <motion.div initial={{ opacity: 0, x: 30, y: -10 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ delay: 1.1, duration: 0.6 }}
                                className="absolute -top-4 -right-4 px-3 py-2 rounded-xl bg-primary-500/20 border border-primary-500/30 backdrop-blur-md flex items-center gap-2">
                                <Brain className="w-4 h-4 text-primary-100" />
                                <span className="text-xs text-primary-100 font-semibold">AI Analysis: 94% Match</span>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, x: -30, y: 10 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ delay: 1.3, duration: 0.6 }}
                                className="absolute -bottom-4 -left-4 px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/20 backdrop-blur-md flex items-center gap-2">
                                <Phone className="w-4 h-4 text-red-400" />
                                <span className="text-xs text-red-400 font-semibold">🆘 Emergency Line Active</span>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} style={{ opacity }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                <span className="text-[10px] text-accent-100/30 uppercase tracking-[0.2em]">Scroll to explore</span>
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <ChevronDown className="w-4 h-4 text-accent-100/30" />
                </motion.div>
            </motion.div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   STATS BAR
───────────────────────────────────────────── */
function StatsBar() {
    const [ref, isInView] = useScrollReveal(0.3);
    const stats = [
        { value: '2.13', suffix: 'M', label: 'Unresolved Cases in Kenya', icon: Gavel },
        { value: '80', suffix: '%', label: 'Kenyans Denied Legal Aid', icon: AlertTriangle },
        { value: '5', suffix: ' min', label: 'Avg. First Response Time', icon: Clock },
        { value: '94', suffix: '%', label: 'AI Case Match Accuracy', icon: Brain },
    ];

    return (
        <div ref={ref} className="relative z-10 py-8 border-y border-white/5 bg-darkbg-200/50 backdrop-blur-sm overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary-500/3 via-transparent to-primary-500/3" />
            <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={stagger(0.1)}
                className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x divide-white/5">
                {stats.map(({ value, suffix, label, icon: Icon }, i) => (
                    <motion.div key={i} variants={fadeUp} className="text-center px-6 py-2">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <Icon className="w-4 h-4 text-secondary-500/60" />
                        </div>
                        <p className="text-3xl lg:text-4xl font-heading font-black text-white tracking-tight">
                            {isInView && <AnimatedCounter value={value} suffix={suffix} />}
                        </p>
                        <p className="text-xs text-accent-100/40 mt-1 font-medium">{label}</p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   PRACTICE AREAS — NEW SECTION
───────────────────────────────────────────── */
function PracticeAreas() {
    const [ref, isInView] = useScrollReveal();
    const [hovered, setHovered] = useState(null);

    const areas = [
        {
            icon: HomeIcon, title: 'Land & Property', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20',
            matters: ['Title deed disputes', 'Illegal evictions', 'Adverse possession', 'Succession & inheritance', 'Boundary disputes'],
            urgency: 'High demand'
        },
        {
            icon: Briefcase, title: 'Employment & Labour', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20',
            matters: ['Wrongful termination', 'Unpaid wages & dues', 'Workplace discrimination', 'NSSF/NHIF disputes', 'Constructive dismissal'],
            urgency: 'Most common'
        },
        {
            icon: Heart, title: 'Family & Matrimonial', color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20',
            matters: ['Divorce & separation', 'Child custody & access', 'Maintenance orders', 'Domestic violence protection', 'Adoption proceedings'],
            urgency: 'Sensitive'
        },
        {
            icon: UserX, title: 'Criminal Defence', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20',
            matters: ['Police bond & bail applications', 'Charges & plea bargaining', 'DPP representations', 'Appeals & reviews', 'Rights violations (IPOA)'],
            urgency: '⚡ Urgent'
        },
        {
            icon: Building, title: 'Business & Commercial', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20',
            matters: ['Contract drafting & disputes', 'Debt recovery', 'Company disputes', 'Intellectual property', 'Regulatory compliance'],
            urgency: 'Time-sensitive'
        },
        {
            icon: FileText, title: 'Succession & Probate', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20',
            matters: ['Grant of probate', 'Letters of administration', 'Will drafting & contesting', 'Estate administration', 'Missing person declarations'],
            urgency: 'Deadline-bound'
        },
    ];

    return (
        <section id="practice-areas" className="relative py-28 lg:py-36 overflow-hidden">
            <GlowOrb color="#D4AF37" size="400px" top="10%" left="-5%" opacity={0.07} blur={200} />
            <div className="max-w-7xl mx-auto px-6">
                <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={stagger(0.1)} className="text-center mb-16">
                    <motion.span variants={fadeUp} className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-secondary-500 mb-4">
                        Practice Areas
                    </motion.span>
                    <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-heading font-black text-white mb-5 leading-tight">
                        Whatever Your Legal Matter —<br />
                        <span className="text-gradient">We Have a Specialist for It</span>
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-accent-100/50 max-w-2xl mx-auto text-base leading-relaxed">
                        Every practice area is staffed by advocates with verified track records in that specific field.
                        You're never matched with a generalist when your matter demands an expert.
                    </motion.p>
                </motion.div>

                <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={stagger(0.08)}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {areas.map(({ icon: Icon, title, color, bg, border, matters, urgency }, i) => (
                        <motion.div
                            key={i}
                            variants={scaleIn}
                            onHoverStart={() => setHovered(i)}
                            onHoverEnd={() => setHovered(null)}
                            whileHover={{ y: -6, transition: { duration: 0.3 } }}
                            className={`group relative p-6 rounded-2xl border ${border} ${bg} overflow-hidden cursor-default`}
                        >
                            <div className="absolute top-4 right-4">
                                <span className={`text-[10px] font-bold uppercase tracking-wider ${color} opacity-60`}>{urgency}</span>
                            </div>
                            <div className={`w-10 h-10 rounded-xl ${bg} border ${border} flex items-center justify-center mb-4`}>
                                <Icon className={`w-5 h-5 ${color}`} />
                            </div>
                            <h3 className="text-white font-bold mb-3 text-base">{title}</h3>
                            <ul className="space-y-1.5">
                                {matters.map((m, j) => (
                                    <li key={j} className="flex items-center gap-2">
                                        <ChevronRight className={`w-3 h-3 ${color} flex-shrink-0`} />
                                        <span className="text-accent-100/55 text-xs">{m}</span>
                                    </li>
                                ))}
                            </ul>
                            <motion.div
                                animate={{ opacity: hovered === i ? 1 : 0 }}
                                className="mt-4 pt-4 border-t border-white/5"
                            >
                                <Link href={route('register')} className={`inline-flex items-center gap-1.5 text-xs font-semibold ${color}`}>
                                    Find a {title} Lawyer <ArrowRight className="w-3 h-3" />
                                </Link>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Emergency band */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 }}
                    className="mt-8 p-5 rounded-2xl border border-red-500/20 bg-red-500/5 flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center flex-shrink-0">
                            <Phone className="w-5 h-5 text-red-400" />
                        </div>
                        <div>
                            <p className="text-white font-bold text-sm">Under Arrest? Detained? In Active Crisis?</p>
                            <p className="text-accent-100/50 text-xs mt-0.5">The Emergency Legal Button is always free — one tap sends your GPS, calls a duty advocate, and alerts next-of-kin.</p>
                        </div>
                    </div>
                    <Link href={route('register')} className="flex-shrink-0 px-5 py-2.5 rounded-full bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 text-sm font-bold transition-all whitespace-nowrap">
                        🆘 Emergency Help
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   HOW IT WORKS — NEW SECTION
───────────────────────────────────────────── */
function HowItWorks() {
    const [ref, isInView] = useScrollReveal();

    const steps = [
        {
            num: '01',
            icon: MessageSquare,
            title: 'Describe Your Situation',
            desc: 'Type or speak — in English or Swahili. No legal knowledge needed. Just tell us what happened. Our AI asks the right follow-up questions.',
            detail: 'AI-powered intake · Multilingual · Voice-to-text · Fully confidential',
            color: 'secondary',
        },
        {
            num: '02',
            icon: Brain,
            title: 'Get Instant Legal Analysis',
            desc: 'Within seconds, our AI identifies your legal position, cites the applicable Kenyan law, and tells you how strong your case is — in plain language.',
            detail: 'Case law analysis · Rights identification · Statute citation · Risk assessment',
            color: 'primary',
        },
        {
            num: '03',
            icon: Users,
            title: 'Match With a Verified Advocate',
            desc: 'If your matter needs human representation, we match you with an LSK-certified advocate whose specialisation, track record, and availability align with your case.',
            detail: 'LSK-verified · Specialty-matched · Reviewed · Milestone-protected fees',
            color: 'green',
        },
        {
            num: '04',
            icon: Gavel,
            title: 'Pursue Your Rights — Fully Supported',
            desc: 'Your advocate handles correspondence, filings, and hearings. You track every development in real time, with encrypted evidence storage and hearing reminders.',
            detail: 'Case tracking · Document vault · Court integration · Appeals support',
            color: 'purple',
        },
    ];

    const colorMap = {
        secondary: { text: 'text-secondary-500', bg: 'bg-secondary-500/10', border: 'border-secondary-500/20', num: 'text-secondary-500/20' },
        primary: { text: 'text-primary-100', bg: 'bg-primary-500/10', border: 'border-primary-500/20', num: 'text-primary-100/20' },
        green: { text: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20', num: 'text-green-400/20' },
        purple: { text: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', num: 'text-purple-400/20' },
    };

    return (
        <section id="how-it-works" className="relative py-28 lg:py-36 bg-darkbg-200/40 overflow-hidden">
            <GlowOrb color="#6366F1" size="500px" top="30%" left="60%" opacity={0.07} blur={200} />
            <GridTexture />
            <div className="max-w-7xl mx-auto px-6">
                <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={stagger(0.12)} className="text-center mb-16">
                    <motion.span variants={fadeUp} className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-secondary-500 mb-4">
                        How It Works
                    </motion.span>
                    <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-heading font-black text-white mb-4">
                        From Confusion to Clarity<br />
                        <span className="text-gradient">in Four Steps</span>
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-accent-100/50 max-w-xl mx-auto">
                        Most people don't know what kind of legal problem they have. That's exactly where we start.
                    </motion.p>
                </motion.div>

                <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={stagger(0.12)}
                    className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                    {/* Connector line */}
                    <div className="hidden lg:block absolute top-14 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-secondary-500/20 via-primary-500/20 to-purple-500/20" />

                    {steps.map(({ num, icon: Icon, title, desc, detail, color }, i) => {
                        const c = colorMap[color];
                        return (
                            <motion.div key={i} variants={fadeUp}
                                className="relative p-6 rounded-2xl border border-white/6 bg-darkbg-200/60 backdrop-blur-sm group hover:border-white/12 transition-colors">
                                <div className="absolute top-4 right-4 font-heading font-black text-5xl leading-none select-none" style={{ color: c.num.replace('/20', '') + '15' }}>
                                    {num}
                                </div>
                                <div className={`relative z-10 w-11 h-11 rounded-2xl ${c.bg} border ${c.border} flex items-center justify-center mb-5`}>
                                    <Icon className={`w-5 h-5 ${c.text}`} />
                                </div>
                                <h3 className="relative z-10 text-white font-bold mb-3 text-sm leading-snug">{title}</h3>
                                <p className="relative z-10 text-accent-100/50 text-xs leading-relaxed mb-4">{desc}</p>
                                <div className={`inline-block px-3 py-1.5 rounded-lg ${c.bg} border ${c.border}`}>
                                    <p className={`text-[10px] ${c.text} font-semibold`}>{detail}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* CTA below */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6 }}
                    className="mt-12 text-center">
                    <Link href={route('register')}
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-secondary-500 hover:bg-secondary-600 text-darkbg-300 font-bold text-sm transition-all shadow-xl shadow-secondary-500/20">
                        Start Your Case — Free Analysis <ArrowRight className="w-4 h-4" />
                    </Link>
                    <p className="text-accent-100/25 text-xs mt-3">No credit card required · Confidential · Cancel anytime</p>
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   PLATFORM MODULES — Tightened
───────────────────────────────────────────── */
function PlatformModules() {
    const [ref, isInView] = useScrollReveal();
    const [active, setActive] = useState(0);

    const modules = [
        {
            icon: Users, color: 'text-secondary-500', bg: 'bg-secondary-500/10', border: 'border-secondary-500/20',
            title: 'For Citizens', subtitle: 'Your Pocket Legal Counsel',
            desc: 'Every Kenyan has constitutional rights. We ensure you know them, can exercise them, and have professional support to enforce them — day or night, in any language.',
            features: [
                'Plain-language constitutional rights guide in Swahili & English',
                'AI Legal Assistant with instant escalation to a human advocate',
                'Step-by-step case filing — AI determines the correct court and division',
                'Real-time case status, hearing reminders, and adjournment alerts',
                'Encrypted Personal Legal Vault — documents, evidence, correspondence',
                '🆘 Emergency Legal Button — one tap triggers lawyer + GPS + NOK alert',
            ],
        },
        {
            icon: Gavel, color: 'text-primary-100', bg: 'bg-primary-500/10', border: 'border-primary-500/20',
            title: 'For Advocates', subtitle: 'A Complete Digital Practice',
            desc: 'Verified advocates get a full practice management suite — from client acquisition to judgment, with milestone-protected payments and reputation analytics.',
            features: [
                'Case Marketplace — browse by specialisation, jurisdiction, and urgency',
                'Encrypted client messaging and document exchange',
                'Phased escrow payments — funds held until milestone completion',
                'AI-assisted pleadings drafting, precedent search, and document versioning',
                'Public reputation score, verified reviews, and success rate analytics',
                'Integrated CPD modules for LSK mandatory development requirements',
            ],
        },
        {
            icon: Landmark, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20',
            title: 'For Courts', subtitle: 'Digital Justice Delivery',
            desc: 'A citizen-facing interface built on top of JICMS — making e-filing, virtual hearings, and digital evidence submission seamless for all parties.',
            features: [
                'Electronic case filing fully integrated with the Judiciary\'s JICMS system',
                'Secure virtual hearing links — attended from anywhere in Kenya',
                'Automatic adjournment and hearing notifications to all parties',
                'Digital evidence submission with immutable blockchain audit trail',
                'Judgment repository with AI plain-language summaries for litigants',
                'Spanning all 6 tiers — Supreme Court to Magistrates\' Courts',
            ],
        },
        {
            icon: Lock, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20',
            title: 'Security & Privacy', subtitle: 'Military-Grade Trust Layer',
            desc: 'Legal matters demand the highest confidentiality standards. Our architecture is built to ensure nothing you share with us can be accessed without your explicit consent.',
            features: [
                'End-to-end AES-256 encryption for all data — in transit and at rest',
                'National ID + biometric KYC verification for all advocates and court users',
                'Blockchain-anchored immutable audit trail for all evidence and filings',
                'Kenya Data Protection Act 2019 and GDPR dual compliance',
                'Role-based access: citizen / advocate / judiciary / administrator',
                'Multi-factor authentication required at all sensitive actions',
            ],
        },
    ];

    const active_m = modules[active];

    return (
        <section id="platform" className="relative py-28 lg:py-36 overflow-hidden">
            <GlowOrb color="#D4AF37" size="500px" top="20%" left="60%" opacity={0.08} blur={200} />
            <div className="max-w-7xl mx-auto px-6">
                <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={stagger(0.12)} className="text-center mb-16">
                    <motion.span variants={fadeUp} className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-secondary-500 mb-4">
                        Platform
                    </motion.span>
                    <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-heading font-black text-white mb-4">
                        Built for Everyone<br />
                        <span className="text-gradient">Involved in Justice</span>
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-accent-100/50 max-w-xl mx-auto">
                        Whether you're a first-time litigant, a seasoned advocate, or a judicial officer — the platform is purpose-built for your role.
                    </motion.p>
                </motion.div>

                <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={stagger(0.06)}
                    className="flex flex-wrap justify-center gap-2 mb-10">
                    {modules.map(({ icon: Icon, title, color }, i) => (
                        <motion.button key={i} variants={fadeUp} onClick={() => setActive(i)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-300 ${active === i ? `${color} border-current bg-current/10` : 'text-accent-100/40 border-white/8 hover:border-white/15 hover:text-accent-100/70'}`}>
                            <Icon className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">{title}</span>
                        </motion.button>
                    ))}
                </motion.div>

                <AnimatePresence mode="wait">
                    <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.45 }}
                        className="grid lg:grid-cols-2 gap-8 items-center">
                        <div className="p-8 lg:p-10 rounded-3xl border border-white/6 bg-darkbg-200/70 backdrop-blur-sm">
                            <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-xl ${active_m.bg} border ${active_m.border} mb-6`}>
                                <active_m.icon className={`w-5 h-5 ${active_m.color}`} />
                                <span className={`text-sm font-bold ${active_m.color}`}>{active_m.subtitle}</span>
                            </div>
                            <h3 className="text-2xl lg:text-3xl font-heading font-black text-white mb-3">{active_m.title}</h3>
                            <p className="text-accent-100/55 mb-6 leading-relaxed">{active_m.desc}</p>
                            <Link href={route('register')} className={`inline-flex items-center gap-2 text-sm font-semibold ${active_m.color} hover:underline underline-offset-4`}>
                                Get Started <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {active_m.features.map((f, i) => (
                                <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                                    className="flex items-start gap-3 p-4 rounded-xl border border-white/5 bg-darkbg-300/50 group hover:border-white/10 transition-colors">
                                    <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${active_m.color}`} />
                                    <span className="text-sm text-accent-100/70 group-hover:text-accent-100/90 transition-colors">{f}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   AI ENGINE — Refocused on user benefits
───────────────────────────────────────────── */
function AIEngine() {
    const [ref, isInView] = useScrollReveal();
    const engines = [
        {
            icon: MessageSquare, title: 'Ask Any Legal Question', label: 'Available 24/7',
            color: 'secondary',
            desc: 'In plain English or Swahili. Receive a structured legal opinion citing applicable statutes and case law — in seconds, not days.',
            stat: '99ms avg. response',
        },
        {
            icon: FileText, title: 'AI Document Generation', label: 'Instant & Accurate',
            color: 'primary',
            desc: 'Demand letters, affidavits, contracts, pleadings, and probate documents — generated by AI and reviewed by an advocate before submission.',
            stat: 'Advocate-reviewed drafts',
        },
        {
            icon: TrendingUp, title: 'Case Outcome Prediction', label: 'Data-Driven Strategy',
            color: 'green',
            desc: 'Trained on decades of Kenyan case law from the Kenya Law Reports. Know your odds, timeline, and whether to settle or litigate before you commit.',
            stat: '94% prediction accuracy',
        },
        {
            icon: Search, title: 'Precedent & Statute Search', label: 'Comprehensive Database',
            color: 'purple',
            desc: 'Instant retrieval across the Constitution, all Acts of Parliament, subsidiary legislation, and 10+ years of Kenyan High Court and Court of Appeal judgments.',
            stat: 'Full Kenya Law corpus',
        },
    ];

    const colorMap = {
        secondary: { text: 'text-secondary-500', bg: 'bg-secondary-500/10', border: 'border-secondary-500/20', glow: 'shadow-secondary-500/10' },
        primary: { text: 'text-primary-100', bg: 'bg-primary-500/10', border: 'border-primary-500/20', glow: 'shadow-primary-500/10' },
        green: { text: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20', glow: 'shadow-green-500/10' },
        purple: { text: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', glow: 'shadow-purple-500/10' },
    };

    return (
        <section id="ai-engine" className="relative py-28 lg:py-36 bg-darkbg-200/40 overflow-hidden">
            <GlowOrb color="#D4AF37" size="600px" top="-5%" left="30%" opacity={0.07} blur={250} />
            <GridTexture />
            <div className="max-w-7xl mx-auto px-6">
                <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={stagger(0.12)}
                    className="flex flex-col lg:flex-row gap-16 items-center mb-20">
                    <motion.div variants={slideLeft} className="flex-1">
                        <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-secondary-500 mb-4">AI Legal Engine</span>
                        <h2 className="text-4xl lg:text-5xl font-heading font-black text-white mb-5 leading-tight">
                            The Lawyer That Never<br />
                            <span className="text-gradient">Sleeps, Forgets, or Charges by the Hour</span>
                        </h2>
                        <p className="text-accent-100/50 leading-relaxed mb-6">
                            Our AI has read every statute, studied every precedent, and can identify your legal position faster than most lawyers can open their brief.
                            It doesn't replace your advocate — it ensures your advocate arrives already briefed, focused, and ready.
                        </p>
                        <div className="flex items-center gap-4 p-4 rounded-xl border border-secondary-500/20 bg-secondary-500/5">
                            <Brain className="w-8 h-8 text-secondary-500 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-semibold text-white">Grounded in Kenyan Law — Not Global Generics</p>
                                <p className="text-xs text-accent-100/40">Constitution · All Acts of Parliament · Kenyan High Court judgments · Court of Appeal decisions · Kenya Law Reports</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div variants={slideRight} className="flex-1 grid grid-cols-2 gap-4">
                        {[
                            { value: '10+', label: 'Years of Case Law Indexed' },
                            { value: '2', label: 'Languages — Swahili & English' },
                            { value: '94%', label: 'Outcome Prediction Accuracy' },
                            { value: '24/7', label: 'Availability — No Appointments' },
                        ].map((s, i) => (
                            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: 0.4 + i * 0.1 }}
                                className="p-5 rounded-2xl border border-white/6 bg-darkbg-200/60 text-center">
                                <p className="text-3xl font-heading font-black text-secondary-500 mb-1">{s.value}</p>
                                <p className="text-[11px] text-accent-100/40">{s.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={stagger(0.1)}
                    className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {engines.map(({ icon: Icon, title, label, color, desc, stat }, i) => {
                        const c = colorMap[color];
                        return (
                            <motion.div key={i} variants={fadeUp} whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                className={`group relative p-6 rounded-2xl border ${c.border} ${c.bg} overflow-hidden cursor-default shadow-xl ${c.glow}`}>
                                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full ${c.bg} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-1/2 translate-x-1/2`} />
                                <div className="relative">
                                    <div className={`w-10 h-10 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center mb-4`}>
                                        <Icon className={`w-5 h-5 ${c.text}`} />
                                    </div>
                                    <div className={`text-[10px] font-bold uppercase tracking-widest ${c.text} mb-2`}>{label}</div>
                                    <h3 className="text-white font-bold text-sm mb-3">{title}</h3>
                                    <p className="text-accent-100/50 text-xs leading-relaxed mb-4">{desc}</p>
                                    <div className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${c.text} ${c.bg} border ${c.border}`}>{stat}</div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   TRUST & CREDENTIALS — NEW SECTION
───────────────────────────────────────────── */
function TrustLayer() {
    const [ref, isInView] = useScrollReveal();

    const credentials = [
        { icon: BadgeCheck, title: 'LSK-Verified Advocates', desc: 'Every advocate on the platform has passed LSK enrolment verification. No unqualified practitioners — ever.', color: 'text-secondary-500' },
        { icon: Fingerprint, title: 'Biometric KYC at Onboarding', desc: 'Advocates are verified against National ID and biometric data — the same standard used by financial institutions.', color: 'text-blue-400' },
        { icon: Lock, title: 'Privileged Communication', desc: 'All correspondence between you and your advocate is covered by legal professional privilege and encrypted at rest and in transit.', color: 'text-green-400' },
        { icon: ShieldCheck, title: 'Escrow-Protected Fees', desc: 'Your legal fees are held in escrow and released only upon milestone completion — confirmed by you. No advance-and-disappear risk.', color: 'text-amber-400' },
        { icon: Eye, title: 'Full Audit Trail', desc: 'Every action taken on your case — by you, your advocate, or the platform — is logged, timestamped, and immutable.', color: 'text-purple-400' },
        { icon: Award, title: 'Rated & Reviewed', desc: 'Advocates are rated by clients after every matter. Sustained poor ratings result in suspension. Quality is enforced, not assumed.', color: 'text-pink-400' },
    ];

    return (
        <section className="relative py-28 lg:py-36 overflow-hidden">
            <GlowOrb color="#10B981" size="400px" top="20%" left="-5%" opacity={0.07} blur={200} />
            <div className="max-w-7xl mx-auto px-6">
                <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={stagger(0.12)} className="text-center mb-16">
                    <motion.span variants={fadeUp} className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-secondary-500 mb-4">
                        Why You Can Trust Us
                    </motion.span>
                    <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-heading font-black text-white mb-5 leading-tight">
                        Your Legal Matter Is Too Important<br />
                        <span className="text-gradient">to Leave to Chance</span>
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-accent-100/50 max-w-2xl mx-auto text-base leading-relaxed">
                        We built Veritex because trust is the foundation of justice. Every safeguard, verification, and protection is there because you deserve certainty — not just service.
                    </motion.p>
                </motion.div>

                <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={stagger(0.08)}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
                    {credentials.map(({ icon: Icon, title, desc, color }, i) => (
                        <motion.div key={i} variants={scaleIn} whileHover={{ y: -6, transition: { duration: 0.3 } }}
                            className="group p-6 rounded-2xl border border-white/6 bg-darkbg-200/50 backdrop-blur-sm hover:border-white/12 transition-colors">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center flex-shrink-0 group-hover:bg-white/8 transition-colors">
                                    <Icon className={`w-5 h-5 ${color}`} />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold text-sm mb-2">{title}</h3>
                                    <p className="text-accent-100/50 text-xs leading-relaxed">{desc}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Compliance strip */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}
                    className="flex flex-wrap items-center justify-center gap-6 p-6 rounded-2xl border border-white/5 bg-darkbg-300/50">
                    {[
                        'Kenya Data Protection Act 2019',
                        'Law Society of Kenya Regulated',
                        'GDPR Compliant Architecture',
                        'AES-256 Encryption Standard',
                        'ISO 27001 Security Framework',
                    ].map((badge, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <CheckCircle className="w-3.5 h-3.5 text-secondary-500" />
                            <span className="text-xs text-accent-100/40 font-medium">{badge}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   CASE OUTCOMES — NEW SECTION (Testimonial-style)
───────────────────────────────────────────── */
function CaseOutcomes() {
    const [ref, isInView] = useScrollReveal();

    const outcomes = [
        {
            type: 'Land Dispute',
            result: 'Title Restored',
            summary: 'Client\'s inherited land was fraudulently transferred during probate proceedings. Advocate obtained an urgent injunction and successfully reverted the title within 6 weeks.',
            duration: '6 weeks',
            court: 'Environment & Land Court',
            icon: HomeIcon,
            color: 'text-amber-400',
            bg: 'bg-amber-500/10',
            border: 'border-amber-500/20',
        },
        {
            type: 'Wrongful Dismissal',
            result: 'Full Compensation Awarded',
            summary: 'Client dismissed after 8 years without notice or terminal dues. Industrial Court awarded 12 months\' compensation plus all unpaid dues with interest.',
            duration: '11 weeks',
            court: 'Employment & Labour Relations Court',
            icon: Briefcase,
            color: 'text-blue-400',
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/20',
        },
        {
            type: 'Debt Recovery',
            result: 'KES 4.2M Recovered',
            summary: 'Business client owed KES 4.2M under a written supply agreement. Advocate obtained judgment in default and levied execution within the statutory period.',
            duration: '9 weeks',
            court: 'Commercial Division — High Court',
            icon: CreditCard,
            color: 'text-green-400',
            bg: 'bg-green-500/10',
            border: 'border-green-500/20',
        },
    ];

    return (
        <section className="relative py-28 lg:py-36 bg-darkbg-200/40 overflow-hidden">
            <GlowOrb color="#D4AF37" size="500px" top="10%" left="50%" opacity={0.07} blur={250} />
            <div className="max-w-7xl mx-auto px-6">
                <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={stagger(0.12)} className="text-center mb-16">
                    <motion.span variants={fadeUp} className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-secondary-500 mb-4">
                        Outcomes
                    </motion.span>
                    <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-heading font-black text-white mb-4">
                        Real Cases. Real Results.<br />
                        <span className="text-gradient">Real Advocates.</span>
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-accent-100/50 max-w-xl mx-auto">
                        These are anonymised summaries of matters handled through the platform. Outcomes vary — but the quality of representation doesn't.
                    </motion.p>
                </motion.div>

                <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={stagger(0.1)}
                    className="grid lg:grid-cols-3 gap-6 mb-12">
                    {outcomes.map(({ type, result, summary, duration, court, icon: Icon, color, bg, border }, i) => (
                        <motion.div key={i} variants={fadeUp} whileHover={{ y: -6 }}
                            className={`p-6 rounded-2xl border ${border} ${bg} cursor-default`}>
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-9 h-9 rounded-xl ${bg} border ${border} flex items-center justify-center`}>
                                    <Icon className={`w-4.5 h-4.5 ${color}`} />
                                </div>
                                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                                    <ThumbsUp className="w-3 h-3 text-green-400" />
                                    <span className="text-green-400 text-[10px] font-bold">Success</span>
                                </div>
                            </div>
                            <p className={`text-[10px] font-bold uppercase tracking-widest ${color} mb-1`}>{type}</p>
                            <h3 className="text-white font-black text-lg mb-3">{result}</h3>
                            <p className="text-accent-100/55 text-xs leading-relaxed mb-4">"{summary}"</p>
                            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] text-accent-100/30 uppercase tracking-wider">Resolved in</p>
                                    <p className={`text-sm font-black ${color}`}>{duration}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-accent-100/30 uppercase tracking-wider">Forum</p>
                                    <p className="text-[11px] text-accent-100/60 font-medium">{court}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* FAQ teaser */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}
                    className="grid sm:grid-cols-3 gap-4">
                    {[
                        { q: 'What if I can\'t afford a lawyer?', a: 'Our AI handles most guidance at minimal cost. For representation, payment is phased — you only pay as milestones are reached.' },
                        { q: 'How quickly will a lawyer respond?', a: 'Most advocates on the platform respond within 5 minutes during business hours. Emergency matters are prioritised around the clock.' },
                        { q: 'Is my information shared with anyone?', a: 'Never. Your data is protected under attorney-client privilege and Kenya\'s Data Protection Act. Only your assigned advocate has access.' },
                    ].map(({ q, a }, i) => (
                        <div key={i} className="p-5 rounded-xl border border-white/6 bg-darkbg-200/50">
                            <div className="flex items-start gap-3">
                                <HelpCircle className="w-4 h-4 text-secondary-500 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-white text-xs font-semibold mb-2">{q}</p>
                                    <p className="text-accent-100/45 text-xs leading-relaxed">{a}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   ADVOCATE DIRECTORY CTA — NEW SECTION
───────────────────────────────────────────── */
function LawyerSection() {
    const [ref, isInView] = useScrollReveal();

    const advocates = [
        { initials: 'NK', name: 'Njeri Kamau', spec: 'Employment & Labour', yrs: '11 yrs', rating: 4.9, cases: 214, available: true, color: '#D4AF37' },
        { initials: 'AM', name: 'Amina Mwangi', spec: 'Family & Matrimonial', yrs: '8 yrs', rating: 4.8, cases: 178, available: true, color: '#6366F1' },
        { initials: 'JO', name: 'James Odhiambo', spec: 'Land & Property', yrs: '15 yrs', rating: 4.9, cases: 312, available: false, color: '#10B981' },
        { initials: 'SC', name: 'Salome Chege', spec: 'Criminal Defence', yrs: '9 yrs', rating: 4.7, cases: 259, available: true, color: '#F59E0B' },
    ];

    return (
        <section id="lawyers" className="relative py-28 lg:py-36 overflow-hidden">
            <GlowOrb color="#6366F1" size="500px" top="30%" left="60%" opacity={0.08} blur={200} />
            <div className="max-w-7xl mx-auto px-6">
                <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={stagger(0.12)}
                    className="flex flex-col lg:flex-row gap-12 items-center">
                    <motion.div variants={slideLeft} className="flex-1">
                        <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-secondary-500 mb-4">Verified Advocates</span>
                        <h2 className="text-4xl lg:text-5xl font-heading font-black text-white mb-5 leading-tight">
                            Consult a Lawyer Who Has<br />
                            <span className="text-gradient">Won This Exact Case Before</span>
                        </h2>
                        <p className="text-accent-100/50 leading-relaxed mb-6">
                            Every advocate in our directory is LSK-enrolled, specialisation-verified, and rated by actual clients.
                            You see their track record before you commit to anything.
                        </p>
                        <ul className="space-y-3 mb-8">
                            {[
                                'Browse by practice area, county, and language',
                                'View verified win rates and client reviews',
                                'Book a consultation — pay only when confirmed',
                                'First AI analysis is always free',
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-accent-100/60">
                                    <CheckCircle className="w-4 h-4 text-secondary-500 flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <Link href={route('register')}
                            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-secondary-500 hover:bg-secondary-600 text-darkbg-300 font-bold text-sm transition-all shadow-lg shadow-secondary-500/20">
                            Browse Verified Advocates <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>

                    <motion.div variants={slideRight} className="flex-1 space-y-3">
                        {advocates.map(({ initials, name, spec, yrs, rating, cases, available, color }, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 + i * 0.1 }}
                                className="flex items-center gap-4 p-4 rounded-2xl border border-white/6 bg-darkbg-200/60 hover:border-white/12 transition-colors group cursor-pointer">
                                <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0 border"
                                    style={{ background: color + '25', borderColor: color + '40', color }}>
                                    {initials}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <p className="text-white font-semibold text-sm truncate">{name}, Advocate</p>
                                        <BadgeCheck className="w-3.5 h-3.5 text-secondary-500 flex-shrink-0" />
                                    </div>
                                    <p className="text-accent-100/40 text-xs">{spec} · {yrs}</p>
                                </div>
                                <div className="hidden sm:flex items-center gap-4 flex-shrink-0">
                                    <div className="text-center">
                                        <div className="flex items-center gap-0.5">
                                            <Star className="w-3 h-3 fill-secondary-500 text-secondary-500" />
                                            <span className="text-xs font-bold text-white">{rating}</span>
                                        </div>
                                        <p className="text-[10px] text-accent-100/30">{cases} cases</p>
                                    </div>
                                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${available ? 'bg-green-500/10 border border-green-500/20 text-green-400' : 'bg-white/5 border border-white/10 text-accent-100/30'}`}>
                                        <div className={`w-1.5 h-1.5 rounded-full ${available ? 'bg-green-400 animate-pulse' : 'bg-white/20'}`} />
                                        {available ? 'Available' : 'Busy'}
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-accent-100/20 group-hover:text-accent-100/50 transition-colors flex-shrink-0" />
                            </motion.div>
                        ))}

                        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}
                            className="text-center pt-2">
                            <p className="text-accent-100/30 text-xs">+ 200 more verified advocates across all 47 counties</p>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   FINAL CTA — Rewritten
───────────────────────────────────────────── */
function FinalCTA({ auth }) {
    const [ref, isInView] = useScrollReveal(0.2);

    return (
        <section className="relative py-28 lg:py-40 overflow-hidden">
            <GlowOrb color="#D4AF37" size="700px" top="50%" left="50%" opacity={0.12} blur={250} />
            <GlowOrb color="#6366F1" size="400px" top="10%" left="10%" opacity={0.08} blur={200} />
            <FloatingParticles count={12} />
            <GridTexture />

            <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={stagger(0.15)}
                className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                <motion.div variants={scaleIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-secondary-500/30 bg-secondary-500/5 mb-8">
                    <Scale className="w-4 h-4 text-secondary-500" />
                    <span className="text-secondary-500 text-xs font-bold uppercase tracking-widest">You Have Rights. We Help You Use Them.</span>
                </motion.div>

                <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-white mb-6 leading-tight">
                    Don't Navigate the Law<br />
                    <span className="text-gradient">Alone — and Don't Have To.</span>
                </motion.h2>

                <motion.p variants={fadeUp} className="text-accent-100/50 text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
                    Whether you're a first-generation litigant facing a landlord, a business owner chasing unpaid debt, or a family navigating a painful dispute —
                    you deserve competent legal support. <span className="text-accent-100/80 font-medium">Start with the AI. Escalate if you need to. Your first analysis is free.</span>
                </motion.p>

                <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                    <Link href={route('register')}
                        className="group flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-secondary-500 hover:bg-secondary-600 text-darkbg-300 font-black text-base transition-all shadow-2xl shadow-secondary-500/25 hover:shadow-secondary-500/45">
                        Get Free Legal Analysis
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link href={route('register')}
                        className="flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/10 text-accent-100/70 hover:text-white hover:border-white/20 font-medium text-base transition-all backdrop-blur-sm">
                        <Phone className="w-4 h-4" />
                        Speak to a Lawyer
                    </Link>
                </motion.div>

                {/* Trust micro-copy */}
                <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-6">
                    {[
                        { icon: Lock, text: 'End-to-End Encrypted' },
                        { icon: BadgeCheck, text: 'LSK-Verified Advocates' },
                        { icon: Clock, text: 'First Response in 5 min' },
                        { icon: Phone, text: '🆘 Emergency Line Always Free' },
                    ].map(({ icon: Icon, text }, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-accent-100/35">
                            <Icon className="w-3.5 h-3.5 text-secondary-500/50" />
                            <span>{text}</span>
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function Footer() {
    return (
        <footer className="border-t border-white/5 bg-darkbg-300 py-12">
            <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2.5">
                    <img src="/Logo/icon.png" alt="Veritex Icon" className="w-8 h-8 object-contain rounded-xl" />
                    <img src="/Logo/logo.png" alt="Veritex" className="h-5 object-contain" />
                    <span className="text-accent-100/20 text-xs ml-2">Kenyan Legal Rights & Justice Platform</span>
                </div>
                <div className="flex flex-wrap justify-center gap-6 text-xs text-accent-100/30">
                    {['Practice Areas', 'AI Engine', 'For Advocates', 'Privacy Policy', 'Terms of Service', 'LSK Compliance'].map(l => (
                        <a key={l} href="#" className="hover:text-accent-100/70 transition-colors">{l}</a>
                    ))}
                </div>
                <p className="text-xs text-accent-100/20">© 2026 Veritex. Built in Nairobi 🇰🇪</p>
            </div>
        </footer>
    );
}

/* ─────────────────────────────────────────────
   ROOT COMPONENT
───────────────────────────────────────────── */
export default function Home({ auth }) {
    return (
        <>
            <Head title="Veritex — Your Legal Problem Has an Answer." />
            <div className="min-h-screen bg-darkbg-300 text-accent-100 font-sans selection:bg-secondary-500 selection:text-darkbg-300 overflow-x-hidden">
                <Nav auth={auth} />
                <Hero auth={auth} />
                <StatsBar />
                <PracticeAreas />
                <HowItWorks />
                <PlatformModules />
                <AIEngine />
                <TrustLayer />
                <CaseOutcomes />
                <LawyerSection />
                <FinalCTA auth={auth} />
                <Footer />
            </div>
        </>
    );
}