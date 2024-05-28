import { TaskTableRow } from '../types.ts';

export default {
	groupBy: (tasks: TaskTableRow[], field: string) => {
		return tasks.reduce((acc, task) => {
			const key = task[field];
			if (!acc[key]) {
				acc[key] = [];
			}
			acc[key].push(task);
			return acc;
		}, {} as Record<string, TaskTableRow[]>);
	}
};
