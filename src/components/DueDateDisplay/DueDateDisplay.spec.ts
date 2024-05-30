import { test, expect } from '@playwright/test';
import { FRONTEND_URL } from '../../constants.ts';

test.describe.configure({ retries: 3, timeout: 20_000 });

test.describe('Due date display', () => {

	test('Due date long passed', async ({ page }) => {
		await page.goto(FRONTEND_URL);
		const row = page.getByTestId('row.43423');
		const dueDate = row.getByTestId('DueDateDisplay');

		await expect(dueDate.locator('span').nth(1)).toHaveText('21 days ago');
	});

	test('Due today', async({ page }) => {
		await page.goto(FRONTEND_URL);
		const row = page.getByTestId('row.82991');
		const dueDate = row.getByTestId('DueDateDisplay');

		await expect(dueDate.locator('span').nth(1)).toHaveText('Today');
	});

	test('Due within a week', async({ page }) => {
		await page.goto(FRONTEND_URL);
		const row = page.getByTestId('row.58501');
		const dueDate = row.getByTestId('DueDateDisplay');

		await expect(dueDate.locator('span').nth(1)).toHaveText('in 6 days');
	});

	test('Due in more than a week but less than a month', async({ page }) => {
		await page.goto(FRONTEND_URL);
		const row = page.getByTestId('row.60740');
		const dueDate = row.getByTestId('DueDateDisplay');

		await expect(dueDate.locator('span').nth(1)).toHaveText('in about 2 weeks');
	});
});
