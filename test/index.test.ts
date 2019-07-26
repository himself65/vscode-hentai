import request from 'supertest'

suite('Base Test', () => {
  test('server init', done => {
    const port = process.env.PORT
    request('../mock')
      .get('/illusts/keywords=saber')
      .expect(200)
      .expect(/{.+}/, () => done())
  })
})
