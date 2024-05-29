import fetchMock from 'jest-fetch-mock';
import { API_URL } from './src/constants';
import mockData from './src/test/mock-api-responses.json';

fetchMock.enableMocks();

beforeAll(() => {
	fetchMock.mockResponse((req: Request) => {
		const username = req.headers.get('username');
		const token = req.headers.get('Auth-Token');

		if(username !== 'valid-username' || token !== 'valid-token') {
			return Promise.reject(JSON.stringify({
				status: 419,
				statusText: 'Unauthorized',
				body: {
					error: 'Could not authenticate with token. Username or Token invalid.'
				}
			}));
		}

		// Unit overviews - what you get when you first log into OnTrack
		if (req.url === `${API_URL}/projects/?include_inactive=false`) {
			return Promise.resolve({
				status: 200,
				statusText: 'OK',
				body: JSON.stringify(mockData.overviews)
			});
		}

		// An individual student's enrolment in a unit (called a "project" in the OnTrack API)
		else if(req.url.startsWith(`${API_URL}/projects/`)) {
			const id = req.url.split('/').pop();

			if(Number.isNaN(Number(id))) {
				return Promise.reject({
					status: 400,
					statusText: 'Bad Request',
					body: JSON.stringify({ message: 'Invalid project ID' })
				});
			}

			const project = mockData.projects.find((project) => project.id.toString() === id);
			if (project) {
				return Promise.resolve({
					status: 200,
					statusText: 'OK',
					body: JSON.stringify(project),
				});
			}

			return Promise.reject({
				status: 404,
				statusText: 'Not Found',
				message: JSON.stringify({ message: 'Enrolment not found' })
			});
		}

		// The overall details of a unit as applicable to everybody
		else if(req.url.startsWith(`${API_URL}/units/`)) {
			const id = req.url.split('/').pop();

			const unit = mockData.units.find((unit) => unit.id.toString() === id);
			if (unit) {
				return Promise.resolve({
					status: 200,
					statusText: 'OK',
					body: JSON.stringify(unit),
				});
			}

			return Promise.reject({
				status: 404,
				statusText: 'Not Found',
				body: JSON.stringify({ message: 'Unit not found' })
			});
		}

		// If the URL does not match any of the above, return 418 because it's fun
		return Promise.reject({
			status: 418,
			statusText: 'I\'m a teapot',
			body: JSON.stringify({ message: 'I\'m a teapot' })
		});
	});
});
