import { EventEmitter } from 'events'

export class Hentai extends EventEmitter {
  constructor () {
    super()
  }
}

const hentaiInstance = new Hentai()

export default hentaiInstance
