const request = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig');

const testingData = {username: 'name', password: 'pass'}

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
})

afterAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
})


test('sanity', () => {
  expect(true).toBe(true)
})

describe('server.js', () => {

  describe('[GET]/api/jokes', () => {

    it('should return 401', async () => {
      const res = await request(server).get('/api/jokes')
    expect(res.status).toBe(401);
    });

  });
})

describe('[POST] /api/auth/register', () => {

  it('valid request returning status: 201', async () => {
    await db('users').truncate()
    const res = await request(server)
      .post('/api/auth/register')
      .send(testingData);
    expect(res.status).toBe(201)
  })

  it('invalid request returning status: 422', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send(testingData);
    expect(res.status).toBe(422)
  })
});

describe('[POST]/api/auth/login', () => {

  it('returns status: 200 when valid credentials are provided', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send(testingData);
    expect(res.status).toBe(200)
  })

  it('invalid payload with error message of : Invalid credentials', async () => {
    const res = await request(server)
    .post('/api/auth/login')
    .send({ username: 'Candace', password: 'n/a' })
    expect(res.status).toBe(422)
  })
})