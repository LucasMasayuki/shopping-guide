module.exports = {
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  bail: 1,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['components/**/*.tsx', 'components/**/*.ts', 'pages/**/*.tsx', 'pages/**/*.ts'],
  coverageReporters: ['lcov', 'text'],
  transform: {
    '^.+\\.tsx$': 'babel-jest',
    '^.+\\.ts$': 'babel-jest',
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/$1',
  },
  testEnvironment: 'jsdom',
}
