import * as constants from '../constants';
import { onTrack } from './onTrack.ts';

describe('Fetching OnTrack data', () => {

	describe('with valid credentials', () => {

		beforeAll(() => {
			jest.spyOn(constants, 'getUsername').mockReturnValue('valid-username');
			jest.spyOn(constants, 'getAuthToken').mockReturnValue('valid-token');
		});

		it('fetches the user\'s current unit enrolments', async () => {

		});

		it('fetches user participation details for a unit', async () => {

		});

		it('fetches task definitions for a unit', async () => {

		});

		it('fetches combined task definition and submission data for a unit', async () => {

		});
	});

	describe('with invalid credentials', () => {
		const consoleSpy = jest.spyOn(console, 'error');

		beforeAll(() => {
			jest.spyOn(constants, 'getUsername').mockReturnValue('invalid-username');
			jest.spyOn(constants, 'getAuthToken').mockReturnValue('invalid-token');
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
