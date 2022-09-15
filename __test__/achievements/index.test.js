const request = require('supertest')
const app = require('../../src/app')
const { connectDB, dropDB, dropCollections } = require('../db-test')
const { TEST_USER } = require('../config')
const { login } = require('../fixtures')

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

describe('Test POST achievements', () => {
  describe('Given right payload', () => {
    it('Returns 200 and return achievement data', async () => {
      const token = await login()
      const response = await request(app)
        .post('/achievements')
        .send({
          body: 'test',
        })
        .set('Authorization', `Bearer ${token}`)

      expect(response.statusCode).toBe(201)
      expect(response.body).toHaveProperty('_id')
      expect(response.body).toHaveProperty('body', 'test')
    })
  })
})
