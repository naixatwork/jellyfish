export default {
    coverageProvider: "v8",
    moduleDirectories: ["node_modules", "applications"],
    "collectCoverageFrom": [
        "!applications/template/index.ts"
    ],
    testEnvironment: "node",
    transform: {
        "^.+\\.ts?$": "ts-jest",
    },
    setupFilesAfterEnv: ["./setup-tests.ts"],
};