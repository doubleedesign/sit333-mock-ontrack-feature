export default {
	testEnvironment: 'jsdom',
	rootDir: './',
	automock: false, // requires jest-fetch-mock
	setupFilesAfterEnv: ['./jest.setup.ts'],
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
