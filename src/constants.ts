import { USERNAME, TOKEN } from './credentials.ts';

// TODO: Differentiate prod and dev/test environments automatically
//export const API_URL = 'https://ontrack.deakin.edu.au/api';
export const API_URL = 'http://localhost:6001/api';

export const getUsername = () => USERNAME;
export const getAuthToken = () => TOKEN;

export const TargetGrades = ['P', 'C', 'D', 'HD'] as const; // as const is required to use this as a type in types.ts
