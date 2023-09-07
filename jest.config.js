/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
module.exports = {
    roots: ['<rootDir>/src'],
    collectCoverage: true,
    collectCoverageFrom: [
        '<rootDir>/**/*.ts',
        '!<rootDir>/src/main/**',
        '!<rootDir>/src/**/*-protocols.ts',
        '!<rootDir>/src/**/*-model.ts',
        '!<rootDir>/src/domain/usecases/**/*.ts',
        '!**/protocols/**',
        '!<rootDir>/tests/**'
    ],
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    testEnvironment: 'node',
    transform: {
        '.+\\.ts$': 'ts-jest'
    },
    preset: '@shelf/jest-mongodb'
};
