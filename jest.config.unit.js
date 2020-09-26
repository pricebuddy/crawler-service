// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/(src)/**/*.test.js'],
  collectCoverageFrom: ['src/**/*.js', '!src/index.js'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 65,
      functions: 80,
      lines: 80,
    },
  },
};
