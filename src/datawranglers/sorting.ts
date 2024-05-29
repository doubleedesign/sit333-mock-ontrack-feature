import { TaskTableRow } from '../types.ts';

export default {
	sortBy: (tasks: TaskTableRow[], field: string, order: 'asc' | 'desc'): TaskTableRow[] => {
		if(order === 'desc') {
			return tasks.sort((a, b) => {
				if (a[field] > b[field]) {
					return -1;
				}
				if (a[field] < b[field]) {
					return 1;
				}
				return 0;
			});
		}

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
