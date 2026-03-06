import React from 'react';
import AdmissionForm from '@/components/AdmissionForm';

export default function AdmissionPage() {
    return (
        <div className="py-12 animate-in slide-in-from-bottom-6 duration-1000">
            <div className="text-center mb-16">
                <h1 className="text-5xl font-extrabold uppercase tracking-tighter mb-4">
                    ADVANCED <span className="neon-text-cyan">ADMISSION</span> PORTAL
                </h1>
                <p className="text-[#888] uppercase tracking-[0.4em] font-semibold text-sm">
                    Precision matching. Smart environment. Peer-to-peer harmony.
                </p>
            </div>
            <AdmissionForm />
        </div>
    );
}
