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

describe('Test POST media', () => {
  describe('Given right payload of images', () => {
    it('Returns 201 and return media data', async () => {
      const token = await login()

      const response = await request(app)
        .post('/medias')
        .attach('medias', '__test__/media/assets/image-1.png')
        .attach('medias', '__test__/media/assets/image-2.png')
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'multipart/form-data')

      expect(response.statusCode).toBe(201)
      expect(response.body.data[0]).toHaveProperty('path')
      expect(response.body.data[1]).toHaveProperty('path')
    })
  })
})

describe('Test POST media', () => {
  describe('Given right payload of videos', () => {
    it('Returns 201 and return media data', async () => {
      const token = await login()

      const response = await request(app)
        .post('/medias')
        .attach('medias', '__test__/media/assets/video-1.mp4')
        .field('title', 'video-1')
        .set('Content-Type', 'multipart/form-data')
        .set('Authorization', `Bearer ${token}`)

      expect(response.statusCode).toBe(201)
      expect(response.body.data[0]).toHaveProperty('path')
    })
  })
})
