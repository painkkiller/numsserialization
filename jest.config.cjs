module.exports = {
    preset: 'ts-jest/presets/js-with-ts',
    testEnvironment: "node",
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/test/tsconfig.json',
        },
    },
    transformIgnorePatterns: [
        "node_modules/(?!troublesome-dependency/.*)",
    ],
}