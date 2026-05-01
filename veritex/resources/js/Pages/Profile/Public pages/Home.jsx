import { Head, Link } from '@inertiajs/react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import {
    Scale, ShieldCheck, Zap, ArrowRight, FileText, Globe, Users,
    BookOpen, Lock, Brain, AlertTriangle, TrendingUp, Star,
    ChevronDown, CheckCircle, Landmark, BadgeCheck, Coins,
    MessageSquare, MapPin, BarChart2, Gavel, Phone, Menu, X
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
                    style={{
                        left: `${p.x}%`, top: `${p.y}%`,
                        width: p.size, height: p.size,
                        background: p.color,
                    }}
                    animate={{
                        y: [0, -40, 0],
                        x: [0, Math.random() * 20 - 10, 0],
                        opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
}

/* ─────────────────────────────────────────────
   GRID NOISE TEXTURE
───────────────────────────────────────────── */
function GridTexture() {
    return (
        <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
                backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px',
            }}
        />
    );
}

/* ─────────────────────────────────────────────
   GLOW ORB
───────────────────────────────────────────── */
function GlowOrb({ color, size, top, left, blur = 180, opacity = 0.15 }) {
    return (
        <div
            className="absolute rounded-full pointer-events-none"
            style={{
                background: color,
                width: size, height: size,
                top, left,
                filter: `blur(${blur}px)`,
                opacity,
            }}
        />
    );
}

/* ─────────────────────────────────────────────
   SECTION WRAPPER
───────────────────────────────────────────── */
function Section({ children, className = '' }) {
    const [ref, isInView] = useScrollReveal();
    return (
        <motion.section
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className={className}
        >
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

    const links = ['Platform', 'AI Engine', 'Pricing', 'Impact'];

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-darkbg-300/90 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/40' : ''
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2.5 group cursor-pointer"
                >
                    <div className="relative">
                        <div className="absolute inset-0 rounded-xl bg-secondary-500/30 blur-md group-hover:blur-lg transition-all" />
                        <div className="relative p-2 rounded-xl bg-darkbg-200 border border-secondary-500/30">
                            <Scale className="w-5 h-5 text-secondary-500" />
                        </div>
                    </div>
                    <span className="font-heading font-bold text-xl tracking-tight text-white">Veritex</span>
                </motion.div>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-8">
                    {links.map((link, i) => (
                        <motion.a
                            key={link}
                            href={`#${link.toLowerCase().replace(' ', '-')}`}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * i + 0.2 }}
                            className="text-sm text-accent-100/60 hover:text-white transition-colors font-medium tracking-wide"
                        >
                            {link}
                        </motion.a>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="hidden md:flex items-center gap-3"
                >
                    {auth?.user ? (
                        <Link href={route('dashboard')}
                            className="px-5 py-2.5 rounded-full bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold transition-all shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50">
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link href={route('login')}
                                className="px-4 py-2 rounded-full text-accent-100/70 hover:text-white text-sm font-medium transition-colors">
                                Log in
                            </Link>
                            <Link href={route('register')}
                                className="px-5 py-2.5 rounded-full bg-secondary-500 hover:bg-secondary-600 text-darkbg-300 text-sm font-bold transition-all shadow-lg shadow-secondary-500/20 hover:shadow-secondary-500/40">
                                Get Started →
                            </Link>
                        </>
                    )}
                </motion.div>

                {/* Mobile menu btn */}
                <button className="md:hidden text-white" onClick={() => setMobileOpen(v => !v)}>
                    {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile dropdown */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-darkbg-200/95 backdrop-blur-xl border-t border-white/5 px-6 py-4 flex flex-col gap-4"
                    >
                        {links.map(link => (
                            <a key={link} href={`#${link.toLowerCase()}`}
                                className="text-accent-100/70 hover:text-white transition-colors py-1" onClick={() => setMobileOpen(false)}>
                                {link}
                            </a>
                        ))}
                        <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
                            <Link href={route('login')} className="text-center py-2.5 rounded-full border border-white/10 text-sm font-medium text-accent-100/70">Log in</Link>
                            <Link href={route('register')} className="text-center py-2.5 rounded-full bg-secondary-500 text-darkbg-300 text-sm font-bold">Get Started</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}

/* ─────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────── */
function Hero({ auth }) {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, -80]);
    const y2 = useTransform(scrollY, [0, 500], [0, -40]);
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);

    const words = ['Justice,', 'Engineered.'];

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
            {/* Ambient glow orbs */}
            <GlowOrb color="#D4AF37" size="600px" top="-10%" left="-15%" opacity={0.12} blur={200} />
            <GlowOrb color="#6366F1" size="500px" top="20%" left="55%" opacity={0.1} blur={180} />
            <GlowOrb color="#D4AF37" size="300px" top="60%" left="70%" opacity={0.08} blur={160} />
            <GridTexture />
            <FloatingParticles count={22} />

            {/* Scroll parallax hero content */}
            <motion.div style={{ y: y1, opacity }} className="relative z-10 max-w-7xl mx-auto px-6 w-full">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

                    {/* Left: Text */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={stagger(0.14)}
                        className="flex-1 text-center lg:text-left"
                    >
                        {/* Badge */}
                        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-secondary-500/30 bg-secondary-500/5 backdrop-blur-sm">
                            <div className="w-2 h-2 rounded-full bg-secondary-500 animate-pulse" />
                            <span className="text-secondary-500 text-xs font-semibold uppercase tracking-widest">Kenya · East Africa · Global</span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-[5.5rem] font-heading font-black leading-[1.04] tracking-tight mb-6">
                            {words.map((word, i) => (
                                <span key={i} className="block overflow-hidden">
                                    <motion.span
                                        className={`block ${i === 1 ? 'text-gradient' : 'text-white'}`}
                                        initial={{ y: '110%' }}
                                        animate={{ y: 0 }}
                                        transition={{ duration: 0.9, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        {word}
                                    </motion.span>
                                </span>
                            ))}
                        </motion.h1>

                        <motion.p variants={fadeUp}
                            className="text-base lg:text-lg text-accent-100/60 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            An AI-powered legal ecosystem bridging citizens, lawyers, and courts — making justice
                            <span className="text-accent-100/90 font-medium"> affordable, multilingual, and accessible 24/7</span>.
                            Built on Kenya's 2010 Constitution. Designed for the world.
                        </motion.p>

                        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                            <Link href={route('register')}
                                className="group relative flex items-center gap-2 px-8 py-4 rounded-full bg-secondary-500 hover:bg-secondary-600 text-darkbg-300 font-bold text-sm tracking-wide transition-all shadow-xl shadow-secondary-500/20 hover:shadow-secondary-500/40">
                                <span>Start Your Case</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                            <a href="#platform"
                                className="flex items-center gap-2 px-6 py-4 rounded-full border border-white/10 text-accent-100/70 hover:text-white hover:border-white/20 text-sm font-medium transition-all backdrop-blur-sm">
                                <Globe className="w-4 h-4" />
                                Explore Platform
                            </a>
                        </motion.div>

                        {/* Social proof */}
                        <motion.div variants={fadeUp} className="mt-10 flex items-center gap-6 justify-center lg:justify-start">
                            <div className="flex -space-x-2">
                                {['#6366F1', '#D4AF37', '#10B981', '#F59E0B'].map((c, i) => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-darkbg-300 flex items-center justify-center text-xs font-bold"
                                        style={{ background: c + '40', borderColor: c + '60', color: c }}>
                                        {['C', 'L', 'A', 'G'][i]}
                                    </div>
                                ))}
                            </div>
                            <div>
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-secondary-500 text-secondary-500" />)}
                                </div>
                                <p className="text-xs text-accent-100/40 mt-0.5">Trusted by citizens, lawyers & courts</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right: Evidence card */}
                    <motion.div
                        style={{ y: y2 }}
                        initial={{ opacity: 0, scale: 0.88 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="flex-1 w-full max-w-md lg:max-w-xl"
                    >
                        <div className="relative">
                            {/* Card glow */}
                            <div className="absolute -inset-4 rounded-[2rem] bg-secondary-500/10 blur-2xl" />

                            {/* Main card */}
                            <div className="relative rounded-3xl border border-white/8 bg-darkbg-200/80 backdrop-blur-2xl overflow-hidden p-6 shadow-2xl shadow-black/50">

                                {/* Card header */}
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 rounded-xl bg-primary-500/20 border border-primary-500/20">
                                            <ShieldCheck className="w-5 h-5 text-primary-100" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-accent-100/40 uppercase tracking-widest">Evidence Vault</p>
                                            <p className="text-sm font-semibold text-white">Case #KE-2026-4902</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                        <span className="text-green-400 text-[10px] font-bold uppercase tracking-wider">Verified</span>
                                    </div>
                                </div>

                                {/* Hash block */}
                                <div className="mb-5 p-4 rounded-2xl bg-darkbg-300/80 border border-primary-500/15">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Lock className="w-3.5 h-3.5 text-secondary-500" />
                                        <span className="text-[10px] text-secondary-500 font-bold uppercase tracking-wider">SHA-256 Immutable Hash</span>
                                    </div>
                                    <code className="font-mono text-[11px] text-primary-100/80 break-all leading-relaxed">
                                        8d969eef6ecad3c29a3a629280e686cf<br />0c3f5d5a86aff3ca12020c923adc6c92
                                    </code>
                                </div>

                                {/* Progress milestones */}
                                <div className="space-y-3 mb-5">
                                    <p className="text-[10px] text-accent-100/30 uppercase tracking-widest font-semibold">Payment Milestones</p>
                                    {[
                                        { label: 'Consultation', pct: 20, done: true },
                                        { label: 'Case Filing', pct: 30, done: true },
                                        { label: 'Hearing', pct: 30, done: false, active: true },
                                        { label: 'Judgment', pct: 20, done: false },
                                    ].map((m, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${m.done ? 'bg-green-500/20 border border-green-500/40' :
                                                m.active ? 'bg-secondary-500/20 border border-secondary-500/40' :
                                                    'bg-white/5 border border-white/10'
                                                }`}>
                                                {m.done ? <CheckCircle className="w-3 h-3 text-green-400" /> :
                                                    m.active ? <div className="w-2 h-2 rounded-full bg-secondary-500 animate-pulse" /> :
                                                        <div className="w-2 h-2 rounded-full bg-white/20" />}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between mb-1">
                                                    <span className={`text-xs font-medium ${m.done ? 'text-green-400' : m.active ? 'text-secondary-500' : 'text-accent-100/30'}`}>{m.label}</span>
                                                    <span className="text-[10px] text-accent-100/30">{m.pct}%</span>
                                                </div>
                                                <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                                                    <motion.div
                                                        className={`h-full rounded-full ${m.done ? 'bg-green-400' : m.active ? 'bg-secondary-500' : 'bg-white/10'}`}
                                                        initial={{ width: 0 }}
                                                        animate={{ width: m.done ? '100%' : m.active ? '45%' : '0%' }}
                                                        transition={{ duration: 1.2, delay: 0.8 + i * 0.15, ease: 'easeOut' }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Bottom mini stats */}
                                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/5">
                                    {[
                                        { label: 'AI Confidence', value: '94%', color: 'text-green-400' },
                                        { label: 'Days Elapsed', value: '12', color: 'text-secondary-500' },
                                        { label: 'Evidence Items', value: '7', color: 'text-primary-100' },
                                    ].map((s, i) => (
                                        <div key={i} className="text-center">
                                            <p className={`text-base font-bold font-mono ${s.color}`}>{s.value}</p>
                                            <p className="text-[10px] text-accent-100/30">{s.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Floating badge — AI Active */}
                            <motion.div
                                initial={{ opacity: 0, x: 30, y: -10 }}
                                animate={{ opacity: 1, x: 0, y: 0 }}
                                transition={{ delay: 1.1, duration: 0.6 }}
                                className="absolute -top-4 -right-4 px-3 py-2 rounded-xl bg-primary-500/20 border border-primary-500/30 backdrop-blur-md flex items-center gap-2"
                            >
                                <Brain className="w-4 h-4 text-primary-100" />
                                <span className="text-xs text-primary-100 font-semibold">AI Active</span>
                            </motion.div>

                            {/* Floating badge — Emergency */}
                            <motion.div
                                initial={{ opacity: 0, x: -30, y: 10 }}
                                animate={{ opacity: 1, x: 0, y: 0 }}
                                transition={{ delay: 1.3, duration: 0.6 }}
                                className="absolute -bottom-4 -left-4 px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/20 backdrop-blur-md flex items-center gap-2"
                            >
                                <Phone className="w-4 h-4 text-red-400" />
                                <span className="text-xs text-red-400 font-semibold">Emergency Ready</span>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                style={{ opacity }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
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
        { value: '$950', suffix: 'B', label: 'Global Legal Market', icon: Globe },
        { value: '120', suffix: 'M', label: 'Unresolved Cases/Year', icon: Gavel },
        { value: '80', suffix: '%', label: 'Denied Legal Aid Access', icon: AlertTriangle },
        { value: '2.13', suffix: 'M', label: 'Active Kenyan Cases', icon: FileText },
    ];

    return (
        <div ref={ref} className="relative z-10 py-8 border-y border-white/5 bg-darkbg-200/50 backdrop-blur-sm overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary-500/3 via-transparent to-primary-500/3" />
            <motion.div
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                variants={stagger(0.1)}
                className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x divide-white/5"
            >
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
   JUSTICE CRISIS SECTION
───────────────────────────────────────────── */
function JusticeCrisis() {
    const [ref, isInView] = useScrollReveal();
    const problems = [
        { icon: Coins, title: 'Cost Barrier', desc: 'A single legal consultation in Kenya costs KES 5,000–50,000+, placing justice out of reach for 80% of citizens.' },
        { icon: Landmark, title: 'Court Backlogs', desc: "Kenya's courts carry 2.13 million active cases. Developing nations face decades-long delays." },
        { icon: BookOpen, title: 'Legal Illiteracy', desc: 'Most citizens cannot exercise rights they do not know they have. The Constitution exists — but is inaccessible.' },
        { icon: MapPin, title: 'Geographic Barriers', desc: 'Rural communities travel hundreds of kilometers to reach a courthouse, at prohibitive cost.' },
        { icon: AlertTriangle, title: 'Corruption & Opacity', desc: 'Paper-based systems create opportunities for file manipulation, bribery, and evidence destruction.' },
        { icon: Users, title: 'Legal Aid Gap', desc: 'Providers turn away more than half of qualified applicants due to resource constraints.' },
    ];

    return (
        <section id="platform" className="relative py-28 lg:py-36 overflow-hidden">
            <GlowOrb color="#EF4444" size="400px" top="10%" left="-5%" opacity={0.06} blur={200} />
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={stagger(0.1)}
                    className="text-center mb-16"
                >
                    <motion.span variants={fadeUp} className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-secondary-500 mb-4">
                        The Problem
                    </motion.span>
                    <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-heading font-black text-white mb-5 leading-tight">
                        The Global Justice Gap<br />
                        <span className="text-gradient">is a Human Rights Crisis</span>
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-accent-100/50 max-w-2xl mx-auto text-base leading-relaxed">
                        Despite Article 10 of the Universal Declaration of Human Rights, billions are denied justice
                        due to cost, geography, language, and systemic opacity. Veritex closes this gap.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={stagger(0.08)}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
                >
                    {problems.map(({ icon: Icon, title, desc }, i) => (
                        <motion.div
                            key={i}
                            variants={scaleIn}
                            whileHover={{ y: -6, transition: { duration: 0.3 } }}
                            className="group relative p-6 rounded-2xl border border-white/6 bg-darkbg-200/50 backdrop-blur-sm overflow-hidden cursor-default"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-secondary-500/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute inset-0 rounded-2xl border border-secondary-500/0 group-hover:border-secondary-500/15 transition-colors duration-500" />
                            <div className="relative">
                                <div className="w-10 h-10 rounded-xl bg-secondary-500/10 border border-secondary-500/20 flex items-center justify-center mb-4 group-hover:bg-secondary-500/20 transition-colors">
                                    <Icon className="w-5 h-5 text-secondary-500" />
                                </div>
                                <h3 className="text-white font-semibold mb-2 text-sm">{title}</h3>
                                <p className="text-accent-100/50 text-sm leading-relaxed">{desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   PLATFORM MODULES
───────────────────────────────────────────── */
function PlatformModules() {
    const [ref, isInView] = useScrollReveal();
    const [active, setActive] = useState(0);

    const modules = [
        {
            icon: Users,
            color: 'text-secondary-500',
            bg: 'bg-secondary-500/10',
            border: 'border-secondary-500/20',
            title: 'Citizens Module',
            subtitle: "Every Person's Legal Companion",
            desc: 'A 24/7 AI-powered guide to rights, case filing, real-time tracking, and encrypted evidence storage — in Swahili, English, and local languages.',
            features: [
                'Know Your Rights — plain-language constitutional guidance',
                'AI Legal Assistant with instant escalation to a lawyer',
                'Guided case filing — the AI determines the right court',
                'Real-time case tracking & hearing notifications',
                'Encrypted Personal Legal Vault for all documents',
                '🆘 Emergency Legal Button — one tap, lawyer + police + GPS',
            ],
        },
        {
            icon: Gavel,
            color: 'text-primary-100',
            bg: 'bg-primary-500/10',
            border: 'border-primary-500/20',
            title: 'Lawyer Module',
            subtitle: 'A Digital Law Practice',
            desc: 'Verified advocates get a complete practice suite — case marketplace, secure communication, milestone escrow, and reputation analytics.',
            features: [
                'Case Marketplace — browse, bid, and accept by specialization',
                'Secure encrypted messaging with clients',
                'Phased escrow payments tied to case milestones',
                'AI-assisted document drafting and version control',
                'Public reputation score, reviews & success rates',
                'Integrated CPD modules for LSK accreditation',
            ],
        },
        {
            icon: Landmark,
            color: 'text-green-400',
            bg: 'bg-green-500/10',
            border: 'border-green-500/20',
            title: 'Court System Module',
            subtitle: 'Digital Justice Delivery',
            desc: 'A citizen-facing layer on top of JICMS — e-filing, virtual hearings, digital evidence submission, and judgment repositories.',
            features: [
                'Electronic case filing integrated with JICMS',
                'Virtual hearing links via secure video conferencing',
                'Automatic hearing date & adjournment notifications',
                'Digital evidence submission into case files',
                'Full judgment repository with AI plain-language summaries',
                'Integration across all 6 tiers of Kenya\'s court system',
            ],
        },
        {
            icon: Globe,
            color: 'text-purple-400',
            bg: 'bg-purple-500/10',
            border: 'border-purple-500/20',
            title: 'Government Integration',
            subtitle: 'National Registry APIs',
            desc: 'Real-time API connections to Kenya\'s core government registries — land, business, identity, tax, and vital records.',
            features: [
                'Land Registry — title deed verification & tracking',
                'Business Registry — company search & directorships',
                'IPRS — KYC via national identity verification',
                'Kenya Revenue Authority — tax compliance certificates',
                'Births & Deaths — succession and probate support',
                'Built to replicate for any country\'s registry systems',
            ],
        },
        {
            icon: Lock,
            color: 'text-red-400',
            bg: 'bg-red-500/10',
            border: 'border-red-500/20',
            title: 'Security Architecture',
            subtitle: 'Military-Grade Trust Layer',
            desc: 'AES-256 encryption, biometric KYC, blockchain evidence chains, and strict role-based access — for a system where trust is justice.',
            features: [
                'End-to-end AES-256 encryption — all data in transit & at rest',
                'National ID + biometric KYC for lawyers and court users',
                'Blockchain-ready immutable audit trail for all evidence',
                'Kenya Data Protection Act 2019 + GDPR compliance',
                'Role-based access: citizen / lawyer / judiciary / admin',
                'Multi-factor authentication at every sensitive action',
            ],
        },
    ];

    const active_m = modules[active];

    return (
        <section className="relative py-28 lg:py-36 bg-darkbg-200/40">
            <GlowOrb color="#6366F1" size="500px" top="30%" left="60%" opacity={0.08} blur={200} />
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={stagger(0.12)}
                    className="text-center mb-16"
                >
                    <motion.span variants={fadeUp} className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-secondary-500 mb-4">
                        Platform Architecture
                    </motion.span>
                    <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-heading font-black text-white mb-4">
                        Five Deeply Integrated<br />
                        <span className="text-gradient">Modules</span>
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-accent-100/50 max-w-xl mx-auto">
                        From rural farmer with a land dispute to a Nairobi commercial attorney managing 50 cases — every user type is served seamlessly.
                    </motion.p>
                </motion.div>

                {/* Tab pills */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={stagger(0.06)}
                    className="flex flex-wrap justify-center gap-2 mb-10"
                >
                    {modules.map(({ icon: Icon, title, color }, i) => (
                        <motion.button
                            key={i}
                            variants={fadeUp}
                            onClick={() => setActive(i)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-300 ${active === i
                                ? `${color} border-current bg-current/10`
                                : 'text-accent-100/40 border-white/8 hover:border-white/15 hover:text-accent-100/70'
                                }`}
                        >
                            <Icon className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">{title}</span>
                        </motion.button>
                    ))}
                </motion.div>

                {/* Active module display */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.45 }}
                        className="grid lg:grid-cols-2 gap-8 items-center"
                    >
                        {/* Info */}
                        <div className="p-8 lg:p-10 rounded-3xl border border-white/6 bg-darkbg-200/70 backdrop-blur-sm">
                            <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-xl ${active_m.bg} border ${active_m.border} mb-6`}>
                                <active_m.icon className={`w-5 h-5 ${active_m.color}`} />
                                <span className={`text-sm font-bold ${active_m.color}`}>{active_m.subtitle}</span>
                            </div>
                            <h3 className="text-2xl lg:text-3xl font-heading font-black text-white mb-3">{active_m.title}</h3>
                            <p className="text-accent-100/55 mb-6 leading-relaxed">{active_m.desc}</p>
                            <Link href={route('register')}
                                className={`inline-flex items-center gap-2 text-sm font-semibold ${active_m.color} hover:underline underline-offset-4`}>
                                Explore Module <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        {/* Features list */}
                        <div className="space-y-3">
                            {active_m.features.map((f, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.06 }}
                                    className="flex items-start gap-3 p-4 rounded-xl border border-white/5 bg-darkbg-300/50 group hover:border-white/10 transition-colors"
                                >
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
   AI ENGINE
───────────────────────────────────────────── */
function AIEngine() {
    const [ref, isInView] = useScrollReveal();
    const engines = [
        {
            icon: MessageSquare,
            title: 'AI Legal Assistant',
            label: 'Available 24/7',
            color: 'secondary',
            desc: 'Ask in plain English or Swahili. Get instant constitutional guidance, then escalate to a human lawyer with one tap.',
            stat: '99ms avg response',
        },
        {
            icon: FileText,
            title: 'AI Document Generator',
            label: 'Instant Drafting',
            color: 'primary',
            desc: 'Contracts, affidavits, demand letters, court pleadings, probate documents — generated at a fraction of traditional cost.',
            stat: '30–100 Legal Credits',
        },
        {
            icon: TrendingUp,
            title: 'AI Case Prediction',
            label: 'Data-Driven Strategy',
            color: 'green',
            desc: 'Trained on decades of Kenyan case law. Predicts outcomes, timelines, and recommends settlement vs. litigation strategy.',
            stat: '94% prediction accuracy',
        },
        {
            icon: BarChart2,
            title: 'Legal Analytics Dashboard',
            label: 'Governance Intelligence',
            color: 'purple',
            desc: 'Crime trend maps, court delay analytics, rights violation heatmaps, and legal aid gap analysis for NGOs and government.',
            stat: '47 counties mapped',
        },
    ];

    const colorMap = {
        secondary: { text: 'text-secondary-500', bg: 'bg-secondary-500/10', border: 'border-secondary-500/20', glow: 'shadow-secondary-500/10' },
        primary: { text: 'text-primary-100', bg: 'bg-primary-500/10', border: 'border-primary-500/20', glow: 'shadow-primary-500/10' },
        green: { text: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20', glow: 'shadow-green-500/10' },
        purple: { text: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', glow: 'shadow-purple-500/10' },
    };

    return (
        <section id="ai-engine" className="relative py-28 lg:py-36 overflow-hidden">
            <GlowOrb color="#D4AF37" size="600px" top="-5%" left="30%" opacity={0.07} blur={250} />
            <GridTexture />
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={stagger(0.12)}
                    className="flex flex-col lg:flex-row gap-16 items-center mb-20"
                >
                    <motion.div variants={slideLeft} className="flex-1">
                        <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-secondary-500 mb-4">
                            AI Legal Engine
                        </span>
                        <h2 className="text-4xl lg:text-5xl font-heading font-black text-white mb-5 leading-tight">
                            Artificial Intelligence<br />
                            <span className="text-gradient">at the Core of Justice</span>
                        </h2>
                        <p className="text-accent-100/50 leading-relaxed mb-6">
                            AI adoption among lawyers rose from 19% in 2023 to 79% in 2024. This platform deploys AI
                            across four critical functions — not as a feature, but as the intelligence layer that makes
                            justice accessible at scale.
                        </p>
                        <div className="flex items-center gap-4 p-4 rounded-xl border border-secondary-500/20 bg-secondary-500/5">
                            <Brain className="w-8 h-8 text-secondary-500 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-semibold text-white">FastAPI + Constitution  Integration</p>
                                <p className="text-xs text-accent-100/40">Instant retrieval of Kenyan legal precedents — Constitution, all Acts, 10+ years of case law</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div variants={slideRight} className="flex-1 grid grid-cols-2 gap-4">
                        {[
                            { value: '79%', label: 'Lawyer AI Adoption 2024' },
                            { value: '26%', label: 'Orgs Using Gen AI' },
                            { value: '$5B+', label: 'Legal Tech Investment' },
                            { value: '100+', label: 'Languages Supported' },
                        ].map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: 0.4 + i * 0.1 }}
                                className="p-5 rounded-2xl border border-white/6 bg-darkbg-200/60 text-center"
                            >
                                <p className="text-3xl font-heading font-black text-secondary-500 mb-1">{s.value}</p>
                                <p className="text-[11px] text-accent-100/40">{s.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Engine cards */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={stagger(0.1)}
                    className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
                >
                    {engines.map(({ icon: Icon, title, label, color, desc, stat }, i) => {
                        const c = colorMap[color];
                        return (
                            <motion.div
                                key={i}
                                variants={fadeUp}
                                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                className={`group relative p-6 rounded-2xl border ${c.border} ${c.bg} overflow-hidden cursor-default shadow-xl ${c.glow}`}
                            >
                                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full ${c.bg} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-1/2 translate-x-1/2`} />
                                <div className="relative">
                                    <div className={`w-10 h-10 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center mb-4`}>
                                        <Icon className={`w-5 h-5 ${c.text}`} />
                                    </div>
                                    <div className={`text-[10px] font-bold uppercase tracking-widest ${c.text} mb-2`}>{label}</div>
                                    <h3 className="text-white font-bold text-sm mb-3">{title}</h3>
                                    <p className="text-accent-100/50 text-xs leading-relaxed mb-4">{desc}</p>
                                    <div className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${c.text} ${c.bg} border ${c.border}`}>
                                        {stat}
                                    </div>
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
   PAYMENT MODEL
───────────────────────────────────────────── */
function PaymentModel() {
    const [ref, isInView] = useScrollReveal();
    const phases = [
        { phase: '01', label: 'Consultation', pct: '20%', color: 'bg-secondary-500', desc: 'Lawyer accepts the case' },
        { phase: '02', label: 'Case Filing', pct: '30%', color: 'bg-primary-100', desc: 'Documents filed successfully' },
        { phase: '03', label: 'Hearing', pct: '30%', color: 'bg-green-400', desc: 'Before the hearing date' },
        { phase: '04', label: 'Judgment', pct: '20%', color: 'bg-purple-400', desc: 'Upon case conclusion' },
    ];

    const credits = [
        { service: 'AI Legal Question (Basic)', cost: '5 Credits', approx: '≈ KES 50' },
        { service: 'AI Legal Question (Complex)', cost: '20 Credits', approx: '≈ KES 200' },
        { service: 'AI Document Generation', cost: '30–100 Credits', approx: 'by document type' },
        { service: 'Lawyer Consultation (30 min)', cost: '200–500 Credits', approx: 'set by lawyer' },
        { service: 'Emergency Legal Button', cost: 'FREE', approx: '🆘 Always accessible', free: true },
    ];

    return (
        <section id="pricing" className="relative py-28 lg:py-36 bg-darkbg-200/40">
            <GlowOrb color="#10B981" size="400px" top="20%" left="-5%" opacity={0.07} blur={200} />
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={stagger(0.12)}
                    className="text-center mb-16"
                >
                    <motion.span variants={fadeUp} className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-secondary-500 mb-4">Revenue & Payment</motion.span>
                    <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-heading font-black text-white mb-4">
                        A Credit Economy<br /><span className="text-gradient">Built for Equity</span>
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-accent-100/50 max-w-xl mx-auto">
                        Inspired by M-Pesa — a transparent, credit-based legal economy where fees are phased,
                        protected by escrow, and the Emergency Button is always free.
                    </motion.p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-10 items-start">

                    {/* Phased payment */}
                    <motion.div
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={stagger(0.1)}
                    >
                        <motion.h3 variants={fadeUp} className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <BadgeCheck className="w-5 h-5 text-secondary-500" /> Milestone-Based Payment Protection
                        </motion.h3>
                        <div className="space-y-3">
                            {phases.map(({ phase, label, pct, color, desc }, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeUp}
                                    className="flex items-center gap-4 p-4 rounded-xl border border-white/6 bg-darkbg-200/60"
                                >
                                    <div className={`w-10 h-10 rounded-xl ${color}/20 border border-current/20 flex items-center justify-center flex-shrink-0`} style={{ borderColor: 'currentColor' }}>
                                        <span className="text-xs font-black text-white">{phase}</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm font-semibold text-white">{label}</span>
                                            <span className="text-sm font-black text-secondary-500">{pct}</span>
                                        </div>
                                        <p className="text-xs text-accent-100/40">{desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <motion.div variants={fadeUp} className="mt-4 p-4 rounded-xl border border-green-500/20 bg-green-500/5 flex items-start gap-3">
                            <ShieldCheck className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <p className="text-xs text-accent-100/60">
                                All payments pass through <span className="text-green-400 font-semibold">escrow</span>. Funds released only on milestone confirmation or after a 72-hour dispute window.
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Credit table */}
                    <motion.div
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={stagger(0.08)}
                    >
                        <motion.h3 variants={fadeUp} className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <Coins className="w-5 h-5 text-secondary-500" /> Legal Credit Pricing
                        </motion.h3>
                        <div className="rounded-2xl border border-white/6 overflow-hidden">
                            <div className="px-5 py-3 bg-darkbg-300/80 border-b border-white/5 flex justify-between">
                                <span className="text-xs font-bold uppercase tracking-widest text-accent-100/30">Service</span>
                                <span className="text-xs font-bold uppercase tracking-widest text-accent-100/30">Cost</span>
                            </div>
                            {credits.map(({ service, cost, approx, free }, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeUp}
                                    className={`flex items-center justify-between px-5 py-4 border-b border-white/4 last:border-0 ${free ? 'bg-green-500/5' : 'bg-darkbg-200/40'} hover:bg-darkbg-200/80 transition-colors`}
                                >
                                    <div>
                                        <p className={`text-sm font-medium ${free ? 'text-green-400' : 'text-accent-100/80'}`}>{service}</p>
                                        <p className="text-[11px] text-accent-100/30 mt-0.5">{approx}</p>
                                    </div>
                                    <span className={`text-sm font-black ${free ? 'text-green-400' : 'text-secondary-500'}`}>{cost}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   IMPACT / SDGs
───────────────────────────────────────────── */
function Impact() {
    const [ref, isInView] = useScrollReveal();
    const sdgs = [
        { num: 'SDG 16', title: 'Peace & Justice', desc: 'Digital courts and transparent tracking strengthen institutional integrity.', color: 'text-blue-400', bg: 'bg-blue-500/10' },
        { num: 'SDG 10', title: 'Reduced Inequalities', desc: 'Credit model and mobile access reach the poor, rural, and marginalized.', color: 'text-orange-400', bg: 'bg-orange-500/10' },
        { num: 'SDG 5', title: 'Gender Equality', desc: 'Specialized GBV modules, women\'s property rights, and family law protection.', color: 'text-pink-400', bg: 'bg-pink-500/10' },
        { num: 'SDG 1', title: 'No Poverty', desc: 'Resolving land and labour disputes that trap communities in poverty.', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
    ];

    const metrics = [
        { value: '1M', label: 'Citizens Educated (Yr 3)' },
        { value: '100K', label: 'Cases Filed Digitally' },
        { value: '70%', label: 'Legal Cost Reduction' },
        { value: '500K', label: 'AI Documents Generated' },
        { value: '25K', label: 'Lawyer-Client Matches' },
        { value: '40%+', label: 'Women Users (Target)' },
    ];

    return (
        <section id="impact" className="relative py-28 lg:py-36 overflow-hidden">
            <GlowOrb color="#D4AF37" size="600px" top="10%" left="50%" opacity={0.08} blur={250} />
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={stagger(0.12)}
                    className="text-center mb-16"
                >
                    <motion.span variants={fadeUp} className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-secondary-500 mb-4">Social Impact</motion.span>
                    <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-heading font-black text-white mb-4">
                        Justice as<br /><span className="text-gradient">Infrastructure</span>
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-accent-100/50 max-w-2xl mx-auto">
                        This is not a technology product. It is the digital equivalent of building courthouses in every citizen's pocket —
                        aligned with four UN Sustainable Development Goals.
                    </motion.p>
                </motion.div>

                {/* SDGs */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={stagger(0.1)}
                    className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16"
                >
                    {sdgs.map(({ num, title, desc, color, bg }, i) => (
                        <motion.div key={i} variants={scaleIn} whileHover={{ y: -6 }} className={`p-6 rounded-2xl border border-white/6 ${bg} cursor-default`}>
                            <span className={`text-xs font-black uppercase tracking-widest ${color} mb-2 block`}>{num}</span>
                            <h4 className="text-white font-bold mb-2 text-sm">{title}</h4>
                            <p className="text-accent-100/50 text-xs leading-relaxed">{desc}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Impact metrics */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={stagger(0.06)}
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
                >
                    {metrics.map(({ value, label }, i) => (
                        <motion.div key={i} variants={fadeUp} className="text-center p-4 rounded-xl border border-white/5 bg-darkbg-200/50">
                            <p className="text-2xl font-heading font-black text-secondary-500 mb-1">{value}</p>
                            <p className="text-[11px] text-accent-100/40 leading-tight">{label}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   ROADMAP
───────────────────────────────────────────── */
function Roadmap() {
    const [ref, isInView] = useScrollReveal();
    const phases = [
        { label: 'Phase 1', period: 'Months 1–3', title: 'Foundation', desc: 'Nairobi pilot — 500 citizens, 50 lawyers. Core AI assistant in Swahili & English, JICMS integration, M-Pesa payment rails.', color: 'secondary', active: true },
        { label: 'Phase 2', period: 'Months 4–12', title: 'Scale', desc: 'All 47 Kenya counties. AI Document Generator, Land Registry integration, Emergency Legal Button, mobile app launch.', color: 'primary' },
        { label: 'Phase 3', period: 'Months 13–18', title: 'Regional', desc: 'Uganda, Tanzania, Rwanda, Ethiopia, South Africa. Case Prediction Engine, B2B APIs, government white-label programme.', color: 'green' },
        { label: 'Phase 4', period: 'Year 4+', title: 'Global', desc: '25+ countries, 5 million citizens, 50,000 lawyers. AI Court Assistance module, World Bank partnership, Series B/C.', color: 'purple' },
    ];
    const colorMap = {
        secondary: 'text-secondary-500 bg-secondary-500/10 border-secondary-500/30',
        primary: 'text-primary-100 bg-primary-500/10 border-primary-500/30',
        green: 'text-green-400 bg-green-500/10 border-green-500/30',
        purple: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    };

    return (
        <section className="relative py-28 lg:py-36 bg-darkbg-200/40">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={stagger(0.12)}
                    className="text-center mb-16"
                >
                    <motion.span variants={fadeUp} className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-secondary-500 mb-4">Implementation</motion.span>
                    <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-heading font-black text-white mb-4">
                        Roadmap to<br /><span className="text-gradient">Global Justice</span>
                    </motion.h2>
                </motion.div>

                <div className="relative">
                    {/* Timeline line (desktop) */}
                    <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    <motion.div
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={stagger(0.12)}
                        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {phases.map(({ label, period, title, desc, color, active }, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp}
                                className={`relative p-6 rounded-2xl border ${active ? 'border-secondary-500/30 bg-secondary-500/5' : 'border-white/6 bg-darkbg-200/50'}`}
                            >
                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border mb-4 ${colorMap[color]}`}>
                                    {label} · {period}
                                </div>
                                {active && (
                                    <div className="absolute top-4 right-4 flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-secondary-500 animate-pulse" />
                                        <span className="text-[10px] text-secondary-500 font-bold">Active</span>
                                    </div>
                                )}
                                <h4 className="text-white font-bold mb-2">{title}</h4>
                                <p className="text-accent-100/50 text-xs leading-relaxed">{desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   FINAL CTA
───────────────────────────────────────────── */
function FinalCTA({ auth }) {
    const [ref, isInView] = useScrollReveal(0.2);
    return (
        <section className="relative py-28 lg:py-40 overflow-hidden">
            <GlowOrb color="#D4AF37" size="700px" top="50%" left="50%" opacity={0.12} blur={250} />
            <GlowOrb color="#6366F1" size="400px" top="10%" left="10%" opacity={0.08} blur={200} />
            <FloatingParticles count={12} />
            <GridTexture />

            <motion.div
                ref={ref}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                variants={stagger(0.15)}
                className="relative z-10 max-w-3xl mx-auto px-6 text-center"
            >
                <motion.div variants={scaleIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-secondary-500/30 bg-secondary-500/5 mb-8">
                    <Scale className="w-4 h-4 text-secondary-500" />
                    <span className="text-secondary-500 text-xs font-bold uppercase tracking-widest">Veritex Platform</span>
                </motion.div>

                <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-white mb-6 leading-tight">
                    Justice is no longer delayed.<br />
                    <span className="text-gradient">It is delivered.</span>
                </motion.h2>

                <motion.p variants={fadeUp} className="text-accent-100/50 text-lg mb-10 leading-relaxed">
                    Legal technology raised nearly $5 billion in 2024 — almost none reached Africa's 1.4 billion people.
                    Veritex closes that gap, starting today.
                </motion.p>

                <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href={route('register')}
                        className="group flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-secondary-500 hover:bg-secondary-600 text-darkbg-300 font-black text-base transition-all shadow-2xl shadow-secondary-500/25 hover:shadow-secondary-500/45">
                        Start Your Case Free
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link href={route('login')}
                        className="flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/10 text-accent-100/70 hover:text-white hover:border-white/20 font-medium text-base transition-all backdrop-blur-sm">
                        Sign In
                    </Link>
                </motion.div>

                <motion.p variants={fadeUp} className="text-accent-100/25 text-xs mt-6">
                    Emergency Legal Button is always free · AES-256 Encrypted · Kenya Data Protection Act Compliant
                </motion.p>
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
                    <Scale className="w-5 h-5 text-secondary-500" />
                    <span className="font-heading font-bold text-white">Veritex</span>
                    <span className="text-accent-100/20 text-xs ml-2">Global Legal Rights & Justice Platform</span>
                </div>
                <div className="flex flex-wrap justify-center gap-6 text-xs text-accent-100/30">
                    {['Platform', 'AI Engine', 'Pricing', 'Impact', 'Privacy', 'Terms'].map(l => (
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
            <Head title="Veritex — Justice, Engineered." />

            <div className="min-h-screen bg-darkbg-300 text-accent-100 font-sans selection:bg-secondary-500 selection:text-darkbg-300 overflow-x-hidden">
                <Nav auth={auth} />
                <Hero auth={auth} />
                <StatsBar />
                <JusticeCrisis />
                <PlatformModules />
                <AIEngine />
                <PaymentModel />
                <Impact />
                <Roadmap />
                <FinalCTA auth={auth} />
                <Footer />
            </div>
        </>
    );
}