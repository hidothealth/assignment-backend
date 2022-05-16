const path = require('path');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  moduleDirectories: [
    'node_modules',
    // __dirname,
    path.join(__dirname, './src'),
    path.join(__dirname, './test'),
  ],
  testPathIgnorePatterns: ['./build'],
};
