import request from 'supertest'

describe('Base Test', () => {
  it('server init', done => {
    const port = process.env.PORT
    request('../mock')
      .get('/illusts/keywords=saber')
      .expect(200)
      .expect(/{.+}/, () => done())
  })
})
