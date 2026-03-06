'use client';

import React, { useState } from 'react';
import { triggerAIReallocation, exportMigrationData } from '@/app/actions';
import { toast } from 'sonner';
import { Share, Database } from 'lucide-react';

export default function DashboardActions() {
    const [reallocating, setReallocating] = useState(false);

    const handleReallocate = async () => {
        setReallocating(true);
        const promise = triggerAIReallocation().then(res => {
            if (!res.success) throw new Error(res.message);
            return res.message;
        });

        toast.promise(promise, {
            loading: 'Re-evaluating global room configurations with AI...',
            success: (msg) => `${msg}`,
            error: 'Reallocation failed'
        });

        promise.finally(() => setReallocating(false)).catch(() => { });
    };

    const handleExport = async () => {
        const res = await exportMigrationData();
        toast.success(res.message);
    };

    return (
        <div className="flex flex-col gap-4">
            <button
                onClick={handleReallocate}
                disabled={reallocating}
                className="btn-primary w-full pulse-neon flex items-center justify-center gap-2"
            >
                <Share size={18} />
                {reallocating ? 'PROCESSING...' : 'TRIGGER AI RE-ALLOCATION'}
            </button>
            <button
                onClick={handleExport}
                className="text-xs text-white/40 uppercase tracking-widest hover:text-white transition-colors flex items-center justify-center gap-2 py-2"
            >
                <Database size={14} />
                Export Migration Data (SQL)
            </button>
        </div>
    );
}
