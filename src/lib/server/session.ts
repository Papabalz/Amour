import jwt from 'jsonwebtoken';
import type { Cookies } from '@sveltejs/kit';
import { JWT_SECRET } from '$env/static/private';
const COOKIE_NAME = 'amour_auth_token';

// The user payload we'll store in the JWT
export interface UserPayload {
	id: number;
	email: string;
	name: string;
	// Add other non-sensitive data you might want quick access to
}

/**
 * Creates a session token and sets it as a secure, HTTP-only cookie.
 */
export function createSession(cookies: Cookies, userPayload: UserPayload) {
	const token = jwt.sign(userPayload, JWT_SECRET, {
		expiresIn: '30d'
	});

	cookies.set(COOKIE_NAME, token, {
		path: '/',
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		maxAge: 60 * 60 * 24 * 30 // 30 days in seconds
	});
	// Optional: Store in sessionStorage for client-side access (unavailable on server-side)
}

/**
 * Destroys the session cookie upon logout.
 */
export function destroySession(cookies: Cookies) {
	cookies.delete(COOKIE_NAME, { path: '/' });
}

/**
 * Reads and verifies the session token from the cookie.
 * @returns The user payload if the token is valid, otherwise null.
 */
export function getSession(cookies: Cookies): UserPayload | null {
	const token = cookies.get(COOKIE_NAME);
	if (!token) return null;

	try {
		return jwt.verify(token, JWT_SECRET) as UserPayload;
	} catch {
		return null;
	}
}

