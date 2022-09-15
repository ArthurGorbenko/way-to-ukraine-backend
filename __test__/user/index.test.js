const request = require('supertest')
const app = require('../../src/app')
const { connectDB, dropDB, dropCollections } = require('../db-test')
const { TEST_REGISTER_FIELDS } = require('../../src/utils/regexp')
const { TEST_USER } = require('../config')
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

describe('Test post registration route', () => {
  describe('Given empty fields payload', () => {
    it('Returns 400 and names of missing fields', async () => {
      const response = await request(app).post('/user/register').send({})
      expect(response.statusCode).toBe(400)
      expect(response.body.errorMessage).toMatch(TEST_REGISTER_FIELDS)
    })
  })
  describe('Given password less then 6 characters', () => {
    it('Returns 400 and tells that password is less then 6 characters', async () => {
      const response = await request(app)
        .post('/user/register')
        .send({
          ...TEST_USER,
          password: '12345',
        })
      expect(response.statusCode).toBe(400)
      expect(response.body.errorMessage.toLowerCase()).toMatch('password')
    })
  })
  describe('Given wrong email format', () => {
    it('Returns 400 and tells that email has wrong format', async () => {
      const response = await request(app)
        .post('/user/register')
        .send({
          ...TEST_USER,
          email: 'test',
        })
        .set('Accept', 'application/json')
      expect(response.statusCode).toBe(400)
      expect(response.body.errorMessage).toMatch('email')
    })
  })
  describe('Given the right payload', () => {
    it('Returns 201 and return created user', async () => {
      const response = await request(app).post('/user/register').send(TEST_USER)
      expect(response.statusCode).toBe(201)
      expect(response.body).toEqual(
        expect.objectContaining({
          email: TEST_USER.email,
          firstName: TEST_USER.firstName,
          lastName: TEST_USER.lastName,
        })
      )
    })
  })
})

describe('Test get user/me route', () => {
  it('Returns 200 and return user data', async () => {
    const token = await login()
    const response = await request(app)
      .get('/user/me')
      .set('Authorization', `Bearer ${token}`)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        email: TEST_USER.email,
        firstName: TEST_USER.firstName,
        lastName: TEST_USER.lastName,
      })
    )
  })
})
