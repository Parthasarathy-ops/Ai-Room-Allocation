import React from 'react';

// Shared layout for auth pages (login/signup) - no navbar/footer
export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="auth-wrapper">
            {children}
        </div>
    );
}
