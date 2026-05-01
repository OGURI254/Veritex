import { Link } from '@inertiajs/react';
import { Scale } from 'lucide-react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0 bg-darkbg-300 text-white relative overflow-hidden">
            
            {/* Ambient Backgrounds */}
            <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary-500/20 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary-500/10 blur-[120px] pointer-events-none" />

            <div className="relative z-10">
                <Link href="/" className="flex flex-col items-center gap-3">
                    <Scale className="w-16 h-16 text-secondary-500 drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]" />
                    <span className="font-heading font-bold text-3xl tracking-tight">Veritex</span>
                </Link>
            </div>

            <div className="relative z-10 mt-8 w-full overflow-hidden px-8 py-10 sm:max-w-md glass-card rounded-2xl border border-white/10 shadow-2xl">
                {children}
            </div>
            
            <div className="relative z-10 mt-8 text-center text-sm text-accent-100/50">
                &copy; {new Date().getFullYear()} Veritex. Built for Justice.
            </div>
        </div>
    );
}
