import * as constants from '../constants';
import { onTrack } from './onTrack.ts';

describe('Fetching OnTrack data', () => {

	describe('with valid credentials', () => {

		beforeEach(() => {
			jest.spyOn(constants, 'getUsername').mockReturnValue('valid-username');
			jest.spyOn(constants, 'getAuthToken').mockReturnValue('valid-token');
		});

		afterEach(() => {
			jest.clearAllMocks();
		});

		it('fetches the user\'s current unit enrolments', async () => {
			const result = await onTrack.fetchCurrentEnrolments();

			expect(result).toHaveLength(4);
		});

		it('fetches user participation details for a unit', async () => {
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

		it('fetches task definitions for a unit', async () => {
			const result = await onTrack.fetchTaskDefinitionsForUnit(804);

			expect(result).toHaveLength(13);
		});

		it('fetches combined task definition and submission data for a unit', async () => {
			const result = await onTrack.fetchTaskParticipationForUnitWithDetails(57972);

			expect(Object.keys(result[0])).toEqual(expect.arrayContaining(['unitCode', 'unitName', 'unitId', 'taskName', 'taskTargetGrade', 'status', 'due_date']));
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

		});

		it('fails to fetch task definitions for a unit and logs an error', async () => {

		});

		it('fails to fetch combined task definition and submission data for a unit and logs an error', async () => {

		});
	});
});
