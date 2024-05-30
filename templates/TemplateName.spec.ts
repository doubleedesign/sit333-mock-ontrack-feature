import { test, expect } from '@playwright/test';
import { FRONTEND_URL } from '../../constants.ts';

test.describe('TemplateName', () => {

	test.beforeEach(async ({ page }) => {
		await page.goto(FRONTEND_URL);
	});

	test('', async ({ page }) => {
		// ...
	});
});
