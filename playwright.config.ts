import { defineConfig, devices } from '@playwright/test';
import { API_URL, FRONTEND_URL } from './src/constants';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: './src/components',
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: 'html',
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL: FRONTEND_URL,
		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: 'on-first-retry',
	},
	projects: [
		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
		},
	],
	// webServer: [
	// 	{
	// 		command: 'npm run mockapi',
	// 		url: API_URL,
	// 	},
	// 	{
	// 		command: 'npm run dev',
	// 		url: FRONTEND_URL,
	// 	}
	// ],
});
