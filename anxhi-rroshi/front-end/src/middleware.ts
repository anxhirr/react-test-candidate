import { cookies } from 'next/headers';
import { NextResponse, NextRequest } from 'next/server';
import { validateToken } from './query/login';

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const cookiesStore = await cookies();
	const token = cookiesStore.get('token');

	const isAuthenticated = await validateToken(token?.value);

	if (!isAuthenticated && pathname !== '/login') {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	if (isAuthenticated && pathname === '/login') {
		return NextResponse.redirect(new URL('/', request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - /api (API routes)
		 * - /_next/static (Next.js static files)
		 * - /_next/image (Next.js image optimization files)
		 * - /favicon.ico (favicon file)
		 * - Other static assets like sitemap.xml, robots.txt, etc.
		 */
		'/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
	],
};
