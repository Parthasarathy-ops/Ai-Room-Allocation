import React from 'react';
import Link from 'next/link';
import { Building2 } from 'lucide-react';
import SignupForm from './SignupForm';

export default function SignupPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="glass-card w-full max-w-md p-8 animate-in fade-in zoom-in duration-500">
                <div className="flex flex-col items-center mb-8">
                    <Building2 size={48} className="neon-text-purple mb-4" />
                    <h1 className="text-3xl font-bold uppercase tracking-tight">New <span className="neon-text-cyan">Clearance</span></h1>
                    <p className="text-sm text-[#888] uppercase tracking-widest mt-2">Create Security Profile</p>
                </div>

                <SignupForm />

                <div className="mt-6 text-center text-sm text-[#888]">
                    HAVE CLEARANCE? <Link href="/login" className="neon-text-purple hover:underline hover:text-white transition-colors">INITIALIZE LINK</Link>
                </div>
            </div>
        </div>
    );
}
