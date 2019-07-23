// @ts-ignore
import * as mockServer from '../mock'
import * as request from 'supertest'

describe('Base Test', () => {
  it('server init', done => {
    const port = process.env.PORT
    const app = mockServer
    request(app)
      .get('/illusts/keywords=saber')
      .expect(200)
      .expect(/{.+}/, () => done())
  })
})
