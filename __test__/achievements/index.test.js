/* eslint-disable no-underscore-dangle */
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

describe('Test GET achievements', () => {
  describe('POST achievement and GET array with 1 element', () => {
    it('Returns 200 and return achievement data', async () => {
      const token = await login()

      const responsePostAchievement = await request(app)
        .post('/achievement')
        .send({
          body: 'test',
        })
        .set('Authorization', `Bearer ${token}`)

      expect(responsePostAchievement.statusCode).toBe(201)

      const response = await request(app)
        .get('/achievement')
        .set('Authorization', `Bearer ${token}`)

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(
        expect.objectContaining({
          data: expect.arrayContaining([
            expect.objectContaining({
              body: 'test',
            }),
          ]),
        })
      )
    })
  })
})

describe('Test GET achievement', () => {
  describe('POST achievement and GET with same body', () => {
    it('Returns 200 and return achievement data', async () => {
      const token = await login()

      const responsePostAchievement = await request(app)
        .post('/achievement')
        .send({
          body: 'test',
        })
        .set('Authorization', `Bearer ${token}`)

      expect(responsePostAchievement.statusCode).toBe(201)

      const response = await request(app)
        .get(`/achievement/${responsePostAchievement.body._id}`)
        .set('Authorization', `Bearer ${token}`)

      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveProperty('body', 'test')
      expect(response.body).toHaveProperty(
        '_id',
        responsePostAchievement.body._id
      )
    })
  })
})

describe('Test DELETE achievement', () => {
  describe('Given right request', () => {
    it('Returns 200 and return ID of deleted achievement', async () => {
      const token = await login()

      const responsePostAchievement = await request(app)
        .post('/achievement')
        .send({
          body: 'test',
        })
        .set('Authorization', `Bearer ${token}`)

      expect(responsePostAchievement.statusCode).toBe(201)

      const response = await request(app)
        .delete(`/achievement/${responsePostAchievement.body._id}`)
        .set('Authorization', `Bearer ${token}`)

      expect(response.statusCode).toBe(200)
    })
  })
})

describe('Test Update achievement', () => {
  describe('Given right payload', () => {
    it('Returns 200 and return updated achievement data', async () => {
      const token = await login()

      const responsePostAchievement = await request(app)
        .post('/achievement')
        .send({
          body: 'test',
        })
        .set('Authorization', `Bearer ${token}`)

      expect(responsePostAchievement.statusCode).toBe(201)

      const response = await request(app)
        .put(`/achievement/${responsePostAchievement.body._id}`)
        .send({
          body: 'test updated',
        })
        .set('Authorization', `Bearer ${token}`)

      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveProperty('body', 'test updated')
      expect(response.body).toHaveProperty(
        '_id',
        responsePostAchievement.body._id
      )
    })
  })
})
