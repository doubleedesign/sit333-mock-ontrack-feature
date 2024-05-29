import { onTrack } from '../datasources/onTrack.ts';
import { datawranglers } from './index.ts';
import * as constants from '../constants.ts';
import _ from 'lodash';

describe('filtering', () => {
	let rawData = [];
	const usernameSpy = jest.spyOn(constants, 'getUsername');
	const tokenSpy = jest.spyOn(constants, 'getAuthToken');

	// Arrange
	beforeAll(async () => {
		usernameSpy.mockReturnValue('valid-username');
		tokenSpy.mockReturnValue('valid-token');
		rawData = await onTrack.fetchTaskRowsForProjects([57972, 25781, 77057, 24488]);
	});

	describe('filtering by status', () => {
		test('no filter', () => {
			// Act
			const result = datawranglers.filter(rawData, 'status', '');

			// Assert
			expect(result).toHaveLength(39);
		});

		test('complete', () => {
			// Act
			const result = datawranglers.filter(rawData, 'status', 'complete');

			// Assert
			expect(result).toHaveLength(15);
			// BI[C]EP - Cross-check using lodash library
			expect(result).toEqual(_.filter(rawData, { status: 'complete' }));
		});

		test('ready_for_feedback', () => {
			const result = datawranglers.filter(rawData, 'status', 'ready_for_feedback');

			expect(result).toHaveLength(5);
			expect(result).toEqual(_.filter(rawData, { status: 'ready_for_feedback' }));
		});

		test('not_started', () => {
			const result = datawranglers.filter(rawData, 'status', 'not_started');

			expect(result).toHaveLength(14);
			expect(result).toEqual(_.filter(rawData, { status: 'not_started' }));
		});

		test('need_help', () => {
			const result = datawranglers.filter(rawData, 'status', 'need_help');

			expect(result).toHaveLength(0);
			expect(result).toEqual(_.filter(rawData, { status: 'need_help' }));
		});

		test('discuss', () => {
			const result = datawranglers.filter(rawData, 'status', 'discuss');

			expect(result).toHaveLength(1);
			expect(result).toEqual(_.filter(rawData, { status: 'discuss' }));
		});

		test('working_on_it', () => {
			const result = datawranglers.filter(rawData, 'status', 'working_on_it');

			expect(result).toHaveLength(2);
			expect(result).toEqual(_.filter(rawData, { status: 'working_on_it' }));
		});

		test('time_exceeded', () => {
			const result = datawranglers.filter(rawData, 'status', 'time_exceeded');

			expect(result).toHaveLength(2);
			expect(result).toEqual(_.filter(rawData, { status: 'time_exceeded' }));
		});
	});

	describe('filtering by unit code', () => {
		test('no filter', () => {
			const result = datawranglers.filter(rawData, 'unit', '');

			expect(result).toHaveLength(39);
		});

		test('Unit OWD276', () => {
			const result = datawranglers.filter(rawData, 'unitCode', 'OWD276');

			expect(result).toHaveLength(10);
			expect(result).toEqual(_.filter(rawData, { unitCode: 'OWD276' }));
		});
	});

	describe('filtering by target grade', () => {
		test('no filter', () => {
			const result = datawranglers.filter(rawData, 'taskTargetGrade', '');

			expect(result).toHaveLength(39);
		});

		test('Pass', () => {
			const result = datawranglers.filter(rawData, 'taskTargetGrade', 0);

			expect(result).toHaveLength(18);
			expect(result).toEqual(_.filter(rawData, { taskTargetGrade: 0 }));
		});

		test('Credit', () => {
			const result = datawranglers.filter(rawData, 'taskTargetGrade', 1);

			expect(result).toHaveLength(11);
			expect(result).toEqual(_.filter(rawData, { taskTargetGrade: 1 }));
		});

		test('Distinction', () => {
			const result = datawranglers.filter(rawData, 'taskTargetGrade', 2);

			expect(result).toHaveLength(8);
			expect(result).toEqual(_.filter(rawData, { taskTargetGrade: 2 }));
		});

		test('High Distinction', () => {
			const result = datawranglers.filter(rawData, 'taskTargetGrade', 3);

			expect(result).toHaveLength(2);
			expect(result).toEqual(_.filter(rawData, { taskTargetGrade: 3 }));
		});
	});
});
