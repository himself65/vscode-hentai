import { EventEmitter } from 'events'
import { On } from './utils'

@On('update', () => {
  // todo
})
export class Hentai extends EventEmitter {
  constructor () {
    super()
  }
}

const hentaiInstance = new Hentai()

export default hentaiInstance
