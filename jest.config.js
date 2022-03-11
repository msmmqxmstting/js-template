/**
 * Created by xun on  2021/9/3 9:30.
 * description: jest.config
 */
const path = require('path');
module.exports = {
	verbose: true,
	rootDir: path.join(__dirname),
	silent: true,
	moduleDirectories: ['node_modules'],
	transform: {
		'^.+\\.jsx?$': 'babel-jest' // if you have jsx tests too
	},
	setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
	testMatch: [
		'<rootDir>/tests/__tests__/**/*.[jt]s?(x)',
		'<rootDir>/tests/?(*.)+(spec|test).[jt]s?(x)'
	],
	moduleFileExtensions: ['js', 'jsx'],
	moduleNameMapper: {
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/tests/__mocks__/fileMock.js',
		'\\.(css|less)$': '<rootDir>/tests/__mocks__/styleMock.js',
		'\\.worker.entry.js': '<rootDir>/tests/__mocks__/workerMock.js',
		'^constants(.*)$': '<rootDir>/src/constants$1',
		'^components(.*)$': '<rootDir>/src/components$1',
		'^services(.*)$': '<rootDir>/src/services$1',
		'^pages(.*)$': '<rootDir>/src/pages$1',
		'^db(.*)$': '<rootDir>/src/db$1',
		'^stores(.*)$': '<rootDir>/src/stores$1',
		'^utils(.*)$': '<rootDir>/src/utils$1',
		'^assets(.*)$': '<rootDir>/src/assets$1'
	},
	testEnvironment: 'jsdom',
	collectCoverageFrom: ['src/*.js'],
	testPathIgnorePatterns: ['<rootDir>/node_modules/'],
	transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\](?!lodash-es/).+\\.js$']
};
