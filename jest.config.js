/** @type {import('ts-jest').JestConfigWithTsJest} */

export default {
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
    'tests/(.*)': '<rootDir>/__tests__/$1',
  },
  resolver: "jest-ts-webcompat-resolver",
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ["**/*/*.test.ts"],
  verbose: true,
  forceExit: true,
  /*clearMocks: true*/
}