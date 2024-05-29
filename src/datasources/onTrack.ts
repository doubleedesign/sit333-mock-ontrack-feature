import { API_URL, getAuthToken, getUsername, TargetGrades } from '../constants.ts';
import { TaskDefinition, TaskSubmission, TaskTableRow, UnitEnrolment } from '../types.ts';
import _ from 'lodash';

export const onTrack = {
	/**
	 * Fetches the overviews of the current units that the user is enrolled in.
	 * This is what is used when you first land on the OnTrack homepage.
	 *
	 * @return Promise<UnitEnrolment[]>
	 */
	fetchCurrentEnrolments: async(): Promise<UnitEnrolment[]> => {
		const username = getUsername();
		const token = getAuthToken();

		try {
			const response = await fetch(`${API_URL}/projects/?include_inactive=false`, {
				method: 'GET',
				headers: {
					username,
					'Auth-Token': token
				},
				redirect: 'follow'
			});

			const result = await response.json();

			return result.filter((unit: UnitEnrolment) => {
				const end_date = new Date(unit.unit.end_date);
				const today = new Date();
				return end_date >= today;
			});
		}
		catch (error) {
			console.error(error);
			return [];
		}
	},

	/**
	 * Fetches the details of the current user's participation in a unit, including task submissions.
	 * The OnTrack API calls this a "project".
	 * @param projectId
	 *
	 * @return Promise<UnitEnrolment>
	 */
	fetchProject: async(projectId: number): Promise<UnitEnrolment | null> => {
		const username = getUsername();
		const token = getAuthToken();

		try {
			const response = await fetch(`${API_URL}/projects/${projectId}`, {
				method: 'GET',
				headers: {
					username,
					'Auth-Token': token
				},
				redirect: 'follow'
			});

			return await response.json();
		}
		catch (error) {
			console.error(error);
			return null;
		}
	},

	/**
	 * Fetches the task definitions for a unit.
	 * This is the overall list of tasks that the user can complete for a unit, and is the same for everyone.
	 * @param unitId
	 *
	 * @return Promise<TaskDefinition[]>
	 */
	fetchTaskDefinitionsForUnit: async(unitId: number): Promise<TaskDefinition[]> => {
		const username = getUsername();
		const token = getAuthToken();

		try {
			const response = await fetch(`${API_URL}/units/${unitId}`, {
				method: 'GET',
				headers: {
					username,
					'Auth-Token': token
				},
				redirect: 'follow'
			});

			const result = await response.json();

			return result?.task_definitions || [];
		}
		catch (error) {
			console.error(error);
			return [];
		}
	},


	/**
	 * Combine task definition and task submission data for the current student.
	 * This is the main function that the frontend will call
	 * to get the data it needs to display a table of all tasks for the current user.
	 * @param projectId
	 *
	 * @return Promise<TaskTableRow[]>
	 */
	fetchTaskParticipationForUnitWithDetails: async(projectId: number): Promise<TaskTableRow[]> => {
		try {
			const enrolment = await onTrack.fetchProject(projectId);
			if(enrolment) {
				const taskDefinitions = await onTrack.fetchTaskDefinitionsForUnit(Number(enrolment.unit.id));

				if(taskDefinitions.length === 0) {
					throw new Error('No task definitions found');
				}

				return enrolment.tasks.map((task: TaskSubmission) => {
					const taskDefinition = taskDefinitions.find((definition: TaskDefinition) => {
						return definition.id === task.task_definition_id;
					});
					if(!taskDefinition) {
						throw new Error('Task definition not found');
					}

					return {
						unitCode: enrolment.unit.code,
						unitName: enrolment.unit.name,
						unitId: enrolment.unit.id, // OnTrack API unit ID
						taskName: `${taskDefinition.abbreviation} - ${taskDefinition.name}`,
						taskTargetGrade: TargetGrades[taskDefinition.target_grade],
						..._.pick(task, ['id', 'task_definition_id', 'status', 'due_date'])
					};
				});
			}
			else {
				throw new Error('No enrolment found');
			}
		}
		catch(error) {
			console.error(error);
			return [];
		}
	},


	/**
	 * Fetch all the tasks for a group of project/enrolment IDs
	 * @param projectIds
	 */
	fetchTaskRowsForProjects: async(projectIds: number[]): Promise<TaskTableRow[]> => {
		const tasksForProject = await Promise.all(projectIds.map(async (projectId) => {
			return await onTrack.fetchTaskParticipationForUnitWithDetails(projectId);
		}));

		return tasksForProject.flat();
	}
};
