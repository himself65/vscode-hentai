module.exports = {
  verbose: false,
  roots: [
    '<rootDir>/src',
    '<rootDir>/test'
  ],
  moduleFileExtensions: [
    'ts',
    'js',
    'json'
  ],
  moduleDirectories: [
    'node_modules'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '.*\\.(j|t)s$': 'ts-jest'
  },
  collectCoverageFrom: [
    'src/**/*.{js,ts,tsx}',
    '!**/*.d.ts'
  ],
  transformIgnorePatterns: [
    'node_modules'
  ],
  snapshotSerializers: [
    'jest-serializer-html'
  ],
  globals: {
    'ts-jest': {
      babelConfig: true,
      allowJs: true
    }
  }
}
