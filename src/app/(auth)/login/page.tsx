import React from 'react';
import Link from 'next/link';
import { Building2 } from 'lucide-react';
import LoginForm from './LoginForm';

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="glass-card w-full max-w-md p-8 animate-in fade-in zoom-in duration-500">
                <div className="flex flex-col items-center mb-8">
                    <Building2 size={48} className="neon-text-cyan mb-4" />
                    <h1 className="text-3xl font-bold uppercase tracking-tight">Access <span className="neon-text-purple">Portal</span></h1>
                    <p className="text-sm text-[#888] uppercase tracking-widest mt-2">Identify to initialize</p>
                </div>

                <LoginForm />

                <div className="mt-6 text-center text-sm text-[#888]">
                    NO CLEARANCE? <Link href="/signup" className="neon-text-cyan hover:underline hover:text-white transition-colors">REQUEST ACCESS</Link>
                </div>
            </div>
        </div>
    );
}
