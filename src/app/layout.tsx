import '../styles/globals.css';
import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { Toaster } from 'sonner';
import { cookies } from 'next/headers';
import NavLinks from '@/components/NavLinks';

export const metadata: Metadata = {
    title: 'HostelGenius AI | Neon Era',
    description: 'Intelligent Room Allocation System with Weighted AI Matching.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies();
    const session = cookieStore.get('session')?.value;
    const loggedIn = !!session;

    return (
        <html lang="en">
            <body className="antialiased">
                <div className="container">
                    <Toaster theme="dark" position="top-right" duration={4000} richColors />
                    <header className="navbar neon-border-glass">
                        <div className="logo neon-text-cyan flex items-center gap-2">
                            <Building2 size={32} />
                            <span>HOSTEL GENIUS <span className="neon-text-purple">AI</span></span>
                        </div>
                        <nav>
                            <NavLinks loggedIn={loggedIn} />
                        </nav>
                    </header>

                    <main style={{ minHeight: 'calc(100vh - 200px)' }}>
                        {children}
                    </main>

                    <footer className="neon-border-glass mt-12 py-8 text-center text-sm text-[var(--text-muted)] tracking-widest uppercase">
                        &copy; 2026 HOSTELGENIUS <span className="neon-text-cyan">NEON</span> SYSTEMS. POWERED BY AI.
                    </footer>
                </div>
            </body>
        </html>
    );
}
