'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signup } from '@/app/actions';
import { toast } from 'sonner';

export default function SignupForm() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);

        const res = await signup(formData);
        setLoading(false);

        if (res.success) {
            toast.success(res.message);
            router.push('/login');
        } else {
            // Force the exact output to render in case object is complex
            toast.error(typeof res.message === 'string' ? res.message : JSON.stringify(res));
            console.error("Signup Action Failed:", res);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-[#888] font-bold">New Identifier</label>
                <input name="username" type="text" placeholder="CHOOSE USERNAME" required className="w-full" />
            </div>

            <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-[#888] font-bold">Secure Passcode</label>
                <input name="password" type="password" placeholder="CREATE SECURE KEY" required className="w-full" />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full shadow-[0_0_15px_rgba(255,0,255,0.4)] hover:shadow-[0_0_25px_rgba(255,0,255,0.6)] border border-[#ff00ff] bg-transparent hover:bg-[#ff00ff]/10 !text-[#ff00ff] mt-4">
                {loading ? 'GENERATING PROFILE...' : 'REGISTER PROFILE'}
            </button>
        </form>
    );
}
