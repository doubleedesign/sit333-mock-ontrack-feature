export default {
	testEnvironment: 'jsdom',
	rootDir: './',
	automock: false, // requires jest-fetch-mock
	setupFilesAfterEnv: ['./jest.setup.ts'],
	coverageThreshold: {
		'./src/datasources': {
			branches: 75,
			functions: 90,
			lines: 90,
			statements: 90,
		},
		'./src/datawranglers': {
			branches: 75,
			functions: 90,
			lines: 90,
			statements: 90,
		},
	},
	transform: {
		'^.+\\.(ts|tsx)?$': ['babel-jest', {
			presets: [
				['@babel/preset-env', {
					targets: { node: 'current' },
					// Do not transform modules if Jest is handling ESM
					modules: 'auto'
				}],
				'@babel/preset-typescript',
			],
		}],
	},
	transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
