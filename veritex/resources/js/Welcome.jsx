import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Scale, ShieldCheck, Zap, ArrowRight, FileText } from 'lucide-react';

export default function Welcome({ auth }) {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <>
            <Head title="Welcome to Veritex" />

            <div className="min-h-screen bg-darkbg-300 text-accent-100 font-sans selection:bg-secondary-500 selection:text-white overflow-hidden relative">

                {/* Background ambient glows */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-500/20 blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary-500/10 blur-[120px] pointer-events-none" />

                {/* Navigation */}
                <nav className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2"
                    >
                        <Scale className="w-8 h-8 text-secondary-500" />
                        <span className="font-heading font-bold text-2xl tracking-tight">Veritex</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex gap-4"
                    >
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="px-5 py-2.5 rounded-full bg-primary-500 hover:bg-primary-600 text-white font-medium transition-all shadow-lg shadow-primary-500/30"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="px-5 py-2.5 rounded-full text-accent-100 hover:text-white font-medium transition-colors"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="px-5 py-2.5 rounded-full bg-secondary-500 hover:bg-secondary-600 text-darkbg-300 font-semibold transition-all shadow-lg shadow-secondary-500/20"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </motion.div>
                </nav>

                {/* Hero Section */}
                <main className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col lg:flex-row items-center gap-12">
                    <div className="flex-1 text-center lg:text-left">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                        >
                            <motion.div variants={fadeIn} className="inline-block mb-4 px-4 py-1.5 rounded-full glass border-primary-500/30 text-primary-100 text-sm font-medium tracking-wide">
                                The Future of Legal Tech
                            </motion.div>

                            <motion.h1 variants={fadeIn} className="text-5xl lg:text-7xl font-heading font-extrabold leading-tight mb-6">
                                Justice, <br />
                                <span className="text-gradient">Engineered.</span>
                            </motion.h1>

                            <motion.p variants={fadeIn} className="text-lg lg:text-xl text-accent-100/70 mb-10 max-w-2xl mx-auto lg:mx-0">
                                Veritex seamlessly integrates AI-powered legal analysis, cryptographic evidence hashing, and milestone-based escrow to deliver unparalleled trust and efficiency.
                            </motion.p>

                            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link
                                    href={route('register')}
                                    className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary-500 hover:bg-primary-600 text-white font-semibold text-lg transition-all shadow-xl shadow-primary-500/20 hover:shadow-primary-500/40 group"
                                >
                                    Start Building Cases
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex-1 w-full max-w-lg"
                    >
                        <div className="relative aspect-square rounded-3xl glass-card overflow-hidden p-8 flex flex-col justify-between border-secondary-500/20">
                            <div className="flex justify-between items-start">
                                <div className="p-3 rounded-2xl bg-primary-500/20 text-primary-100">
                                    <ShieldCheck className="w-8 h-8" />
                                </div>
                                <div className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-semibold uppercase tracking-wider border border-green-500/20">
                                    System Active
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="h-2 w-1/3 bg-white/10 rounded-full"></div>
                                <div className="h-2 w-3/4 bg-white/10 rounded-full"></div>
                                <div className="h-2 w-1/2 bg-white/10 rounded-full"></div>
                            </div>

                            <div className="mt-8 p-6 rounded-2xl bg-darkbg-200/80 border border-white/5 backdrop-blur-md">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-secondary-500/20 flex items-center justify-center text-secondary-500">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-white">SHA-256 Validated</div>
                                        <div className="text-xs text-white/50">Evidence Log #4902</div>
                                    </div>
                                </div>
                                <div className="font-mono text-xs text-primary-100 break-all bg-darkbg-300 p-3 rounded-lg border border-primary-500/20">
                                    8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </main>

                {/* Features Section */}
                <section className="relative z-10 w-full bg-darkbg-200 py-24 border-t border-white/5">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-heading font-bold mb-4">A Multi-Tenant Ecosystem</h2>
                            <p className="text-accent-100/60 max-w-2xl mx-auto">Built for citizens, lawyers, and administrators, Veritex provides tailored interfaces securely backed by cutting-edge architecture.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="glass-card p-8 rounded-2xl"
                            >
                                <Zap className="w-10 h-10 text-secondary-500 mb-6" />
                                <h3 className="text-xl font-semibold mb-3">AI Engine</h3>
                                <p className="text-accent-100/60 text-sm leading-relaxed">FastAPI-powered Constitution  Integration allows instant contextual retrieval of Kenyan legal precedents for rapid case assessment.</p>
                            </motion.div>

                            <motion.div
                                whileHover={{ y: -5 }}
                                className="glass-card p-8 rounded-2xl"
                            >
                                <ShieldCheck className="w-10 h-10 text-primary-100 mb-6" />
                                <h3 className="text-xl font-semibold mb-3">Immutable Evidence</h3>
                                <p className="text-accent-100/60 text-sm leading-relaxed">Cryptographic SHA-256 hashing ensures all uploaded documents are tamper-proof and court-admissible.</p>
                            </motion.div>

                            <motion.div
                                whileHover={{ y: -5 }}
                                className="glass-card p-8 rounded-2xl"
                            >
                                <Scale className="w-10 h-10 text-secondary-500 mb-6" />
                                <h3 className="text-xl font-semibold mb-3">Escrow Automation</h3>
                                <p className="text-accent-100/60 text-sm leading-relaxed">Milestone-based payment rails protect both clients and advocates, ensuring funds are released only upon agreed deliverables.</p>
                            </motion.div>
                        </div>
                    </div>
                </section>

            </div>
        </>
    );
}
