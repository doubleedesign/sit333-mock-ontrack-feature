import * as constants from '../constants';
import { onTrack } from './onTrack.ts';

describe('Fetching OnTrack data', () => {

	describe('with valid credentials', () => {

		// Arrange
		beforeEach(() => {
			jest.spyOn(constants, 'getUsername').mockReturnValue('valid-username');
			jest.spyOn(constants, 'getAuthToken').mockReturnValue('valid-token');
		});

		afterEach(() => {
			jest.clearAllMocks();
		});

		describe('Fetch current enrolments', () => {

			it('fetches the user\'s current unit enrolments', async () => {
				// Act
				const result = await onTrack.fetchCurrentEnrolments();

				// Assert
				expect(result).toHaveLength(4);
			});
		});

		describe('Fetch project', () => {

			it('fetches user participation details for a unit by project ID', async () => {
				const result = await onTrack.fetchProject(57972);

				expect(Object.keys(result)).toEqual(expect.arrayContaining([
					'id',
					'unit',
					'tasks'
				]));

				expect(result.unit).toEqual(expect.objectContaining({
					code: 'OWD276',
					name: 'Emotional Consequences of Broadcast Television',
				}));
			});
		});

		describe('Fetch unit details', () => {

			it('fetches task definitions for a unit', async () => {
				const result = await onTrack.fetchTaskDefinitionsForUnit(804);

				expect(result).toHaveLength(13);
			});

			it('returns an empty array if task definitions are empty', async () => {
				const result = await onTrack.fetchTaskDefinitionsForUnit(1404);

				expect(result).toEqual([]);
			});
		});

		describe('Fetch task participation for unit with details', () => {

			it('fetches combined task definition and submission data for a unit', async () => {
				const result = await onTrack.fetchTaskParticipationForUnitWithDetails(57972);

				expect(Object.keys(result[0])).toEqual(expect.arrayContaining(['unitCode', 'unitName', 'unitId', 'taskName', 'taskTargetGrade', 'status', 'due_date']));
			});

			it('logs an error if no task definitions are found', async () => {
				const result = await onTrack.fetchTaskParticipationForUnitWithDetails(24404);

				expect(console.error).toHaveBeenCalledWith(expect.objectContaining({ message: 'No task definitions found' }));
			});
		});

		describe('Fetch task rows for a set of projects', () => {

			it('fetches task rows for all projects/enrolments', async () => {
				const result = await onTrack.fetchTaskRowsForProjects([57972, 25781, 24488, 77057]);

				expect(result).toHaveLength(39);
			});
		});
	});

	describe('with valid credentials but invalid requests', () => {
		beforeEach(() => {
			jest.spyOn(constants, 'getUsername').mockReturnValue('valid-username');
			jest.spyOn(constants, 'getAuthToken').mockReturnValue('valid-token');
		});

		afterEach(() => {
			jest.clearAllMocks();
		});

		describe('fetching user participation details for a unit', () => {

			it('logs a 404 Not Found error and returns null if an invalid enrolment/project ID is provided', async () => {
				const result = await onTrack.fetchProject(101);

				expect(console.error).toHaveBeenCalledWith(expect.objectContaining({
					status: 404,
					statusText: 'Not Found',
				}));

				expect(result).toBeNull();
			});
		});

		describe('fetching task definitions for a unit', () => {

			it('logs a 404 Not Found error and returns an empty array if an invalid unit ID is provided', async () => {
				const result = await onTrack.fetchTaskDefinitionsForUnit(101);

				expect(console.error).toHaveBeenCalledWith(expect.objectContaining({
					status: 404,
					statusText: 'Not Found',
				}));

				expect(result).toEqual([]);
			});
		});

		describe('fetching combined task definition and submission data for a unit', () => {

			it('logs a 404 Not Found error and returns an empty array if an invalid enrolment/project ID is provided', async () => {
				const result = await onTrack.fetchTaskParticipationForUnitWithDetails(101);

				expect(console.error).toHaveBeenCalledWith(expect.objectContaining({
					status: 404,
					statusText: 'Not Found',
				}));

				expect(result).toEqual([]);
			});

		});

		describe('fetching task rows for all projects/enrolments', () => {
			it('returns an empty array if no valid project/enrolment IDs are provided', async () => {
				const result = await onTrack.fetchTaskRowsForProjects([101, 102, 103]);

				expect(result).toEqual([]);
			});

			it('returns results if some valid and some invalid project/enrolment IDs are provided', async () => {
				const result = await onTrack.fetchTaskRowsForProjects([57972, 77057]);

				expect(result).toHaveLength(20);
			});
		});
	});

	describe('with invalid credentials', () => {
		// Mock the console.error method both to check that it was called and to prevent it from actually logging anything in tests
		const consoleSpy = jest.spyOn(console, 'error').mockImplementation((message) => {
			return message;
		});

		beforeEach(() => {
			jest.spyOn(constants, 'getUsername').mockReturnValue('invalid-username');
			jest.spyOn(constants, 'getAuthToken').mockReturnValue('invalid-token');
		});

		afterEach(() => {
			jest.clearAllMocks();
		});

		it('fails to fetch the user\'s current unit enrolments and logs an error', async () => {
			const result = await onTrack.fetchCurrentEnrolments();

			const loggedErrorObject = JSON.parse(consoleSpy.mock.calls[0][0]);

			expect(loggedErrorObject).toEqual(expect.objectContaining({ statusText: 'Unauthorized' }));
			expect(result).toEqual([]);
		});

		it('fails to fetch user participation details for a unit and logs an error', async () => {
			const result = await onTrack.fetchProject(57972);

			const loggedErrorObject = JSON.parse(consoleSpy.mock.calls[0][0]);

			expect(loggedErrorObject).toEqual(expect.objectContaining({ statusText: 'Unauthorized' }));
		});

		it('fails to fetch task definitions for a unit and logs an error', async () => {
			const result = await onTrack.fetchTaskDefinitionsForUnit(804);

			const loggedErrorObject = JSON.parse(consoleSpy.mock.calls[0][0]);

			expect(loggedErrorObject).toEqual(expect.objectContaining({ statusText: 'Unauthorized' }));
		});

		it('fails to fetch combined task definition and submission data for a unit and logs an error', async () => {
			const result = await onTrack.fetchTaskParticipationForUnitWithDetails(57972);

			const loggedErrorObject = JSON.parse(consoleSpy.mock.calls[0][0]);

			expect(loggedErrorObject).toEqual(expect.objectContaining({ statusText: 'Unauthorized' }));
		});
	});
});
