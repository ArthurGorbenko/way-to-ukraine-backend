const request = require('supertest')
const app = require('../../src/app')
const { connectDB, dropDB, dropCollections } = require('../db-test')
const { login } = require('../fixtures')

beforeAll(async () => {
  await connectDB()
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
        .post('/achievement')
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

// describe('Test GET achievements', () => {
//   describe('Given right payload', () => {
//     it('Returns 200 and return achievement data', async () => {
//       const token = await login()
//       const response = await request(app)
//         .get('/achievement')
//         .set('Authorization', `Bearer ${token}`)

//       expect(response.statusCode).toBe(200)
//     })
//   })
// })
