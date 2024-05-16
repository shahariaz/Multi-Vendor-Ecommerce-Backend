module.exports = {
    preset: 'js-jest',
    testEnvironment: 'node',
    testMatch: ['**/test/**/*.test.js'],
    moduleFileExtensions: ['ts', 'js'],
    coverageDirectory: './coverage',
    collectCoverageFrom: ['test/**/*.js'],
    modulePaths: ['src'],
    moduleDirectories: ['node_modules'],
  };
  