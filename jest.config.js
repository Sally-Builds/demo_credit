module.exports = {

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  coverageDirectory: 'coverage',

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/(?!@foo)'
  ],

  // globals: {
  //   'ts-jest': {
  //     tsConfigFile: 'tsconfig.json',
  //     enableTsDiagnostics: true
  //   }
  // },

  // A map from regular expressions to module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
    // database: '<rootDir>/src/lib/database'
  },

  testEnvironment: 'node',

  roots: [
    '<rootDir>/tests/',
    '<rootDir>/src/'
  ],

  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },

  testMatch: [
    '**/*.spec.ts',
    '**/*.test.ts'
  ],

  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!@foo)'
  ]
}
