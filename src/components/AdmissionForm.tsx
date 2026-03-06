'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, ClipboardList, Activity, Home, Users, ArrowRight } from 'lucide-react';
import { submitAdmission } from '@/app/actions';
import { toast } from 'sonner';

export default function AdmissionForm() {
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const promise = submitAdmission(data).then(result => {
            if (!result.success) throw new Error(result.message);
            form.reset();
            return result.message;
        });

        toast.promise(promise, {
            loading: 'AI is calculating optimal room allocation...',
            success: (msg) => `${msg}`,
            error: (err) => `Admission Failed: ${err.message}`
        });

        promise.finally(() => setSubmitting(false)).catch(() => { });
    };

    return (
        <div className="max-w-4xl mx-auto py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card"
            >
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-[#00f2ff]/10 rounded-lg">
                        <User className="neon-text-cyan" size={32} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold uppercase tracking-tight">Student <span className="neon-text-cyan">Admission</span></h2>
                        <p className="text-sm text-[#888] uppercase tracking-widest font-semibold">AI-Powered Room Matching Era</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Academic Details */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#555] flex items-center gap-2">
                                <ClipboardList size={14} /> Academic Profile
                            </h3>
                            <input name="name" placeholder="FULL LEGAL NAME" required />
                            <input name="regNo" placeholder="REGISTRATION NUMBER" required />
                            <input name="school" placeholder="SCHOOL / INSTITUTE" required />
                            <input name="department" placeholder="DEPARTMENT" required />
                            <select name="yearOfStudy" required defaultValue="">
                                <option value="" disabled>SELECT YEAR OF STUDY</option>
                                <option value="1">1ST YEAR</option>
                                <option value="2">2ND YEAR</option>
                                <option value="3">3RD YEAR</option>
                                <option value="4">4TH YEAR</option>
                            </select>
                        </div>

                        {/* Lifestyle & Needs */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#555] flex items-center gap-2">
                                <Activity size={14} /> Lifestyle & Needs
                            </h3>
                            <select name="medicalNeeds" required defaultValue="none">
                                <option value="none">NO MEDICAL PRIORITY</option>
                                <option value="low">LOW (MINOR CONCERNS)</option>
                                <option value="high">HIGH (URGENT / GROUND FLOOR)</option>
                            </select>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-[#888] font-bold">Preferences</label>
                                    <select name="preferredRoomType" required defaultValue="AC">
                                        <option value="AC">AC ROOM</option>
                                        <option value="Non-AC">NON-AC</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-[#888] font-bold">Sharing Type</label>
                                    <select name="preferredSharing" required defaultValue="4">
                                        <option value="3">TRIPLE (3)</option>
                                        <option value="4">FOUR (4)</option>
                                    </select>
                                </div>
                            </div>

                            <input name="language" placeholder="PRIMARY LANGUAGE" required />
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                        <p className="text-sm text-white/60">
                            AI calculation happens instantly upon submission.
                        </p>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="btn-primary flex items-center gap-2 group"
                        >
                            {submitting ? 'PROCESSING...' : 'INITIALIZE ALLOCATION'}
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
