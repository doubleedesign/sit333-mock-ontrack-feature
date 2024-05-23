import { TaskTableRow } from '../types.ts';
import sortBy from 'lodash/sortBy';

export const dataWrangler = {
	sort: (tasks: TaskTableRow[], field: string): TaskTableRow[] => {
		return sortBy(tasks, field);
	},
};