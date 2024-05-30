import { test, expect } from '@playwright/test';
import { FRONTEND_URL } from '../../constants.ts';

test.describe('Due date display', () => {

	test.beforeEach(async ({ page }) => {
		await page.goto(FRONTEND_URL);
	});

	test('Due date long passed', async ({ page }) => {
		const row = page.getByTestId('row-task-def-43423');
		const dueDate = row.getByTestId('DueDateDisplay');

		await expect(dueDate.locator('span').nth(1)).toHaveText('21 days ago');
	});
});
