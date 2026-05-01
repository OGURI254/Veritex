import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { Scale, Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-darkbg-300 font-sans text-accent-100">
            <nav className="border-b border-white/5 bg-darkbg-200/80 backdrop-blur-md sticky top-0 z-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/" className="flex items-center gap-2 group">
                                    <Scale className="h-8 w-8 text-secondary-500 group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.4)] transition-all" />
                                    <span className="font-heading font-bold text-xl tracking-tight hidden sm:block">Veritex</span>
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                    className="text-accent-100/70 hover:text-white"
                                >
                                    Dashboard
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-darkbg-100 px-4 py-2 text-sm font-medium text-accent-100/80 transition hover:text-white hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-secondary-500/50"
                                            >
                                                {user.name}
                                                <ChevronDown className="h-4 w-4" />
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content contentClasses="py-1 bg-darkbg-100 border border-white/10 ring-1 ring-black ring-opacity-5">
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                            className="text-accent-100/80 hover:bg-white/5 hover:text-white"
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((prev) => !prev)}
                                className="inline-flex items-center justify-center rounded-md p-2 text-accent-100/50 transition hover:bg-white/5 hover:text-white focus:bg-white/5 focus:text-white focus:outline-none"
                            >
                                {showingNavigationDropdown ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden bg-darkbg-200 border-b border-white/5'}>
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                            className="text-accent-100/80 hover:bg-white/5 hover:text-white focus:bg-white/5 focus:text-white"
                        >
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-white/5 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-white">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-accent-100/50">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink 
                                href={route('profile.edit')}
                                className="text-accent-100/80 hover:bg-white/5 hover:text-white"
                            >
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                                className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-darkbg-200/50 shadow border-b border-white/5">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 text-white">
                        {header}
                    </div>
                </header>
            )}

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    );
}
