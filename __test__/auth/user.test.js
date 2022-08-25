const request = require('supertest');
const app = require('../../src/app');
const { connectDB, dropDB, dropCollections } = require('../db-test');

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await dropDB();
});

afterEach(async () => {
  await dropCollections();
});

describe('Test post registration route', () => {
  describe('Given empty fields payload', () => {
    it('Returns 400 and names of missing fields', async () => {
      const response = await request(app).post('/user/register').send({});
      expect(response.statusCode).toBe(400);
      expect(response.body.errorMessage).toMatch(
        /email | password | firstName | lastName/,
      );
    });
  });
  describe('Given password less then 6 characters', () => {
    it('Returns 400 and tells that password is less then 6 characters', async () => {
      const response = await request(app).post('/user/register').send({
        email: 'test@test.com',
        password: '12345',
        firstName: 'TestName',
        lastName: 'TestName',
      });
      expect(response.statusCode).toBe(400);
      expect(response.body.errorMessage).toMatch('password');
    });
  });
  describe('Given wrong email format', () => {
    it('Returns 400 and tells that email has wrong format', async () => {
      const response = await request(app)
        .post('/user/register')
        .send({
          email: 'test',
          password: '123456',
          firstName: 'TestName',
          lastName: 'TestName',
        })
        .set('Accept', 'application/json');
      expect(response.statusCode).toBe(400);
      expect(response.body.errorMessage).toMatch('email');
    });
  });
  describe('Given the right payload', () => {
    it('Returns 201 and return created user', async () => {
      const payload = {
        email: 'test@test.com',
        password: '123456',
        firstName: 'TestName',
        lastName: 'TestName',
      };
      const response = await request(app).post('/user/register').send(payload);
      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual(expect.objectContaining(payload));
    });
  });
});
