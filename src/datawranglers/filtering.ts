import { TaskTableRow } from '../types.ts';
import { TargetGrades } from '../constants.ts';

export default {
	filterBy: (tasks: TaskTableRow[], field: string, value: string | number | typeof TargetGrades[number]) => {
		if(field === '' || value === '') {
			return tasks;
		}

		return tasks.filter(task => task[field] === value);
	},
};
