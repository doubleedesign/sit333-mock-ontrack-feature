# TDD & CI using a mock OnTrack feature

## UI development 

For UI development and integration tests, a mock API using [JSON Server](https://www.npmjs.com/package/json-server) is used. This uses the same `test/mock-api-responses.json` file as the unit tests, so the mock data is consistent between both.

To run the UI: 
```bash
npm run dev
```

To run the mock API:
```bash
npm run mockapi
```
Or use the included WebStorm run configuration (updating your project Node path as needed).

---

## Unit tests

For unit tests, [jest-fetch-mock](https://www.npmjs.com/package/jest-fetch-mock) is used. The responses are setup in `jest.setup.ts` and use the `test/mock-api-responses.json` file (the same file as is used for UI development and integration tests). No need to run the UI or the mock API server, just run the tests:

```bash
npm run test:unit
```
Or with the included WebStorm run config.

---

## Integration tests

I use WSL, and these instructions are written with future me in mind.

If Playwright isn't already installed in your WSL environment:

```bash
npm init playwright@latest
```

Then run the mock API and UI:
```bash
npm run mockapi
```
```bash
npm run dev
```

You should also be able to run all tests via the WSL terminal:

```bash
npx playwright test
```

This will just give you the CLI feedback and HTML report when done.

### Running in UI mode

Use Windows's Node installation to run Playwright in UI mode.

This also means you need to install Playwright in Windows and install the browsers. From CMD/Powershell:

1. Install Playwright globally in Windows

```powershell
npm install playwright -g
```

2. Install default browsers for Playwright
```powershell
npx playwright install
```
3. Run the UI and mock API:
```powershell
npm run dev
```
```powershell
npm run mockapi
```

4. Then you should be able to run the Playwright UI:
```powershell
npx playwright test --ui
```
...or via WebStorm run config that specifies your Windows Node installation and the --ui flag in the Playwright options.

### Running individual tests in WebStorm

Once you have WebStorm's run config template for Playwright set to use Windows Node and have started the mock API and UI, you should be able to run individual tests/suites/files from the gutter icon. (Theoretically that should work with WSL Node too, but at the time of writing I was having an issue where it was confused about the config file location and I couldn't fix that.)

Adding the `--headed` flag to the Playwright options in the run config will open a browser window for each test, and close it when done. (Definitely need to use Windows Node for that unless you've set up whatever XServer is.)

