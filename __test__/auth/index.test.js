const request = require('supertest')
const app = require('../../src/app')
const { connectDB, dropDB, dropCollections } = require('../db-test')
const { TEST_USER } = require('../config')

beforeAll(async () => {
  await connectDB()
  await request(app).post('/user/register').send(TEST_USER)
})

afterAll(async () => {
  await dropDB()
})

afterEach(async () => {
  await dropCollections()
})

describe('Test login route', () => {
  describe('Given created user credentials', () => {
    it('Returns 200 and return user data + token', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({ email: TEST_USER.email, password: TEST_USER.password })
      expect(response.statusCode).toBe(201)
      expect(response.body).toHaveProperty('token')
      expect(response.body).toHaveProperty('user')
    })
  })
})
