module.exports = {
  preset: '@shelf/jest-mongodb',
  testTimeout: 30000,
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
}
