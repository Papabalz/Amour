// src/stores/user.ts
import { writable, type Writable } from 'svelte/store';
import { browser } from '$app/environment';

/**
 * Creates a Svelte writable store that automatically persists its value
 * to the browser's sessionStorage.
 *
 * On the server, it returns a regular writable store that does not persist.
 *
 * @template T The type of the value in the store.
 * @param {string} key The key to use for storing the value in sessionStorage.
 * @param {T} initialValue The initial value of the store if nothing is found in sessionStorage.
 * @returns {Writable<T>} A Svelte writable store.
 */
export function sessionStore<T>(key: string, initialValue: T): Writable<T> {
	// On the server, sessionStorage is not available.
	// We return a simple writable store that doesn't persist.
	if (!browser) {
		return writable<T>(initialValue);
	}

	// Get the value from sessionStorage if it exists, otherwise use the initial value.
	const storedValue = sessionStorage.getItem("userToken");
	const data = storedValue ? (JSON.parse(storedValue) as T) : initialValue;

	const store = writable<T>(data);

	// Subscribe to the store and update sessionStorage on changes.
	store.subscribe((value) => {
		sessionStorage.setItem(key, JSON.stringify(value));
	});

	return store;
}

export const user =  writable<any>(null);