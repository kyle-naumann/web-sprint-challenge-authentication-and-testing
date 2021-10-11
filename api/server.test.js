const request = require('supertest')
const db = require('../data/dbConfig')
const server = require('./server.js')

describe('Jokes Auth', () => {

  beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
  })

  afterAll(async () => {
    await db.destroy();
  })

  describe('[POST] /register', () => {

    it(`returns error if no username in body`, async () => {

      const res = await request(server).post('/api/auth/register').send({ username: "Charlie"})

      expect(res.body).toMatchObject({message: "username and password required"})
    })

    it(`adds new user to databse`, async () => {

      const res = await request(server).post('/api/auth/register').send({ username: "Charlie", password: "Clown"})

      expect(res.body).toMatchObject({id: 1, username: "Charlie", password: expect.any(String)})
    })

  })

  describe('[POST] /login', () => {

    it('does not login if password does not match', async () => {

      const userLogin = await request(server).post('/api/auth/login').send({ username: "Charlie", password: "cown"})

      expect(userLogin.body).toMatchObject({ message: "invalid credentials" })

    })

    it('logs user in and sends back welcome message', async () => {

      const userLogin = await request(server).post('/api/auth/login').send({ username: "Charlie", password: "Clown"})

      expect(userLogin.body).toHaveProperty('message', "welcome, Charlie")

    })

  })


})