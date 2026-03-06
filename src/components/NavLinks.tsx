'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { LayoutDashboard, UserPlus, LogIn, LogOut, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { logout } from '@/app/actions';

export default function NavLinks({ loggedIn }: { loggedIn: boolean }) {
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.refresh();
        router.push('/login');
    };

    if (loggedIn) {
        return (
            <ul className="flex list-none gap-6 items-center uppercase text-sm font-semibold tracking-widest text-[#888]">
                <li className="hover:text-[#00f2ff] transition-colors">
                    <Link href="/" className="flex items-center gap-2 px-2 py-1">
                        <LayoutDashboard size={18} />
                        <span className="hidden sm:inline">Dashboard</span>
                    </Link>
                </li>
                <li className="hover:text-[#00f2ff] transition-colors">
                    <Link href="/admission" className="flex items-center gap-2 px-2 py-1">
                        <FileText size={18} />
                        <span className="hidden sm:inline">Admission</span>
                    </Link>
                </li>
                <li className="hover:text-[#ff003c] transition-colors cursor-pointer" onClick={handleLogout}>
                    <div className="flex items-center gap-2 px-2 py-1">
                        <LogOut size={18} />
                        <span className="hidden sm:inline">Sign Out</span>
                    </div>
                </li>
            </ul>
        );
    }

    return (
        <ul className="flex list-none gap-6 items-center uppercase text-sm font-semibold tracking-widest text-[#888]">
            <li className="hover:text-[#00f2ff] transition-colors">
                <Link href="/login" className="flex items-center gap-2 px-2 py-1">
                    <LogIn size={18} />
                    <span className="hidden sm:inline">Log In</span>
                </Link>
            </li>
            <li className="hover:text-[#ff00ff] transition-colors">
                <Link href="/signup" className="flex items-center gap-2 px-2 py-1">
                    <UserPlus size={18} />
                    <span className="hidden sm:inline">Sign Up</span>
                </Link>
            </li>
        </ul>
    );
}
