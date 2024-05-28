import { TaskTableRow } from '../types.ts';

export default {
	sortBy: (tasks: TaskTableRow[], field: string): TaskTableRow[] => {
		return tasks.sort((a, b) => {
			if (a[field] < b[field]) {
				return -1;
			}
			if (a[field] > b[field]) {
				return 1;
			}
			return 0;
		});
	},
};
