import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSession } from './lib/auth';

export async function middleware(request: NextRequest) {
    // 1. Update session if it exists (extend expiration)
    await updateSession(request);

    // 2. Check for protected routes
    const isAuthPage = request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/signup');

    // We get the session from the cookie directly in the middleware
    const currentUser = request.cookies.get('session')?.value;

    if (!currentUser && !isAuthPage) {
        // Redirect to login if unauthenticated and trying to access a protected route
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (currentUser && isAuthPage) {
        // Redirect to dashboard if logged in and trying to access login/signup
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
