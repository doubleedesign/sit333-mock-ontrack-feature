import { test, expect } from '@playwright/test';
import { FRONTEND_URL } from '../../constants.ts';

test.describe.configure({ retries: 3, timeout: 20_000 });

test.describe('Filter Bar', () => {

	test('Field and value dropdowns are visible', async ({ page }) => {
		await page.goto(FRONTEND_URL);
		const fieldDropdown = page.getByTestId('filter-bar.field');
		const valueDropdown = page.getByTestId('filter-bar.value');

		await expect(fieldDropdown).toBeVisible();
		await expect(valueDropdown).toBeVisible();
	});

	test('Value dropdown is disabled when no field is selected', async ({ page }) => {
		await page.goto(FRONTEND_URL);
		const valueDropdown = page.getByTestId('filter-bar.value');

		await expect(valueDropdown).toBeDisabled();
	});

	test('The value dropdown is enabled when a field is selected', async ({ page }) => {
		await page.goto(FRONTEND_URL);
		const fieldDropdown = page.getByTestId('filter-bar.field');
		const valueDropdown = page.getByTestId('filter-bar.value');
		await fieldDropdown.selectOption('Status');

		await expect(valueDropdown).not.toBeDisabled();
	});

	test('Filter by "ready for feedback" shows 5 rows', async({ page }) => {
		await page.goto(FRONTEND_URL);
		const fieldDropdown = page.getByTestId('filter-bar.field');
		const valueDropdown = page.getByTestId('filter-bar.value');

		await fieldDropdown.selectOption('status');
		await valueDropdown.selectOption('ready_for_feedback');

		const rows = page.locator('[data-testid^="row."]');

		await expect(rows).toHaveCount(5);
	});


	test('The value dropdown is disabled and all rows are shown after resetting', async ({ page }) => {
		await page.goto(FRONTEND_URL);
		const fieldDropdown = page.getByTestId('filter-bar.field');
		const valueDropdown = page.getByTestId('filter-bar.value');

		await fieldDropdown.selectOption('Status');
		await valueDropdown.selectOption('Complete');

		const rows = page.locator('[data-testid^="row."]');
		await expect(rows).toHaveCount(15);

		await fieldDropdown.selectOption('');
		await expect(valueDropdown).toBeDisabled();

		const rows2 = page.locator('[data-testid^="row."]');
		await expect(rows2).toHaveCount(39);
	});
});
