export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'],
  testTimeout: 60000,
  maxWorkers: 1,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/config/seed.ts',
    '!src/**/*.d.ts',
  ],
};