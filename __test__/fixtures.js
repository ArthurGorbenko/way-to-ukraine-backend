const request = require('supertest')
const app = require('../src/app')
const { TEST_USER } = require('./config')

const login = async () => {
  const responseRegister = await request(app)
    .post('/user/register')
    .send(TEST_USER)
  expect(responseRegister.statusCode).toBe(201)
  const responseLogin = await request(app)
    .post('/auth/login')
    .send({ email: TEST_USER.email, password: TEST_USER.password })
  expect(responseLogin.statusCode).toBe(201)
  return responseLogin.body.token
}

module.exports = { login }
