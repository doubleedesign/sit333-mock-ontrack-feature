import { USERNAME, TOKEN } from './credentials.ts';
import { TaskStatus } from './types.ts';

// TODO: Differentiate prod and dev/test environments automatically
//export const API_URL = 'https://ontrack.deakin.edu.au/api';
export const API_URL = 'http://localhost:6001/api';

export const getUsername = () => USERNAME;
export const getAuthToken = () => TOKEN;

export const TargetGrades = ['Pass', 'Credit', 'Distinction', 'High  Distinction'] as const; // as const is required to use this as a type in types.ts

type StatusColours = {
	[K in TaskStatus]?: string;
};
export const statusColours: StatusColours = {
	complete: '#5bb75b',
	ready_for_feedback: '#0079d8',
	discuss: '#31b0d5',
	working_on_it: '#eb8f06',
	not_started: '#CCC',
	fix_and_resubmit: '#f2d85c',
	time_exceeded: '#cc0000',
};
