'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/app/actions';
import { toast } from 'sonner';

export default function LoginForm() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);

        const res = await login(formData);
        setLoading(false);

        if (res.success) {
            toast.success(res.message);
            router.push('/');
        } else {
            toast.error(typeof res.message === 'string' ? res.message : JSON.stringify(res));
            console.error("Login Action Failed:", res);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-[#888] font-bold">Registration / Username</label>
                <input name="username" type="text" placeholder="ENTER IDENTIFIER" required className="w-full" />
            </div>

            <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-[#888] font-bold">Passcode</label>
                <input name="password" type="password" placeholder="ENTER SECURE KEY" required className="w-full" />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full pulse-neon mt-4">
                {loading ? 'AUTHENTICATING...' : 'ESTABLISH LINK'}
            </button>
        </form>
    );
}
