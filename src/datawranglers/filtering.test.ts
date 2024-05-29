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
		rawData = await onTrack.fetchTaskRowsForProjects([57972, 25781, 77057, 57972]);
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
			expect(result).toHaveLength(16);
			// Right BI[C]EP - Cross-check using lodash library
			expect(result).toEqual(_.filter(rawData, { status: 'complete' }));
		});

		test('waiting_for_feedback', () => {
			const result = datawranglers.filter(rawData, 'status', 'waiting_for_feedback');

			expect(result).toHaveLength(4);
			expect(result).toEqual(_.filter(rawData, { status: 'waiting_for_feedback' }));
		});

		test('not_started', () => {
			const result = datawranglers.filter(rawData, 'status', 'not_started');

			expect(result).toHaveLength(19);
			expect(result).toEqual(_.filter(rawData, { status: 'not_started' }));
		});

		test('need_help', () => {
			const result = datawranglers.filter(rawData, 'status', 'need_help');

			expect(result).toHaveLength(0);
			expect(result).toEqual(_.filter(rawData, { status: 'need_help' }));
		});
	});

	describe('filtering by unit code', () => {
		test('no filter', () => {
			const result = datawranglers.filter(rawData, 'unit', '');

			expect(result).toHaveLength(39);
		});

		test('Unit OWD276', () => {
			const result = datawranglers.filter(rawData, 'unitCode', 'OWD276');

			expect(result).toHaveLength(20);
			expect(result).toEqual(_.filter(rawData, { unitCode: 'OWD276' }));
		});
	});

	describe('filtering by target grade', () => {
		test('no filter', () => {
			const result = datawranglers.filter(rawData, 'taskTargetGrade', '');

			expect(result).toHaveLength(39);
		});

		test('Pass', () => {
			const result = datawranglers.filter(rawData, 'taskTargetGrade', 'P');

			expect(result).toHaveLength(17);
			expect(result).toEqual(_.filter(rawData, { taskTargetGrade: 'P' }));
		});

		test('Credit', () => {
			const result = datawranglers.filter(rawData, 'taskTargetGrade', 'C');

			expect(result).toHaveLength(11);
			expect(result).toEqual(_.filter(rawData, { taskTargetGrade: 'C' }));
		});

		test('Distinction', () => {
			const result = datawranglers.filter(rawData, 'taskTargetGrade', 'D');

			expect(result).toHaveLength(8);
			expect(result).toEqual(_.filter(rawData, { taskTargetGrade: 'D' }));
		});

		test('High Distinction', () => {
			const result = datawranglers.filter(rawData, 'taskTargetGrade', 'HD');

			expect(result).toHaveLength(3);
			expect(result).toEqual(_.filter(rawData, { taskTargetGrade: 'HD' }));
		});
	});
});
