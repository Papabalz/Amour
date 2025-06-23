// src/stores/user.ts
import { writable } from 'svelte/store';

export const user = writable({ id: null, name: '', email: '' });