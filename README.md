# TDD & CI using a mock OnTrack feature

## UI development and integration tests

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

### Integration tests

Run the UI and mock API as per above, then to run the integration tests:
 
// TODO.

## Unit tests

For unit tests, [jest-fetch-mock](https://www.npmjs.com/package/jest-fetch-mock) is used. The responses are setup in `jest.setup.ts` and use the `test/mock-api-responses.json` file (the same file as is used for UI development and integration tests). No need to run the UI or the mock API server, just run the tests:

```bash
npm run test:unit
```
Or with the included WebStorm run config.
