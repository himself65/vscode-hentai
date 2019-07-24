import { EventEmitter } from 'events'
import Storage from './storage'
import { On } from './utils'
import { getImages, TInfoItem } from './utils/api'

@On('update', async (instance: ImageSaver) => instance.update())
class ImageSaver extends EventEmitter {
  private lastInfo?: TInfoItem[]
  private page: number = 0
  public ImagesUrls?: string[]

  public async update () {
    const { message, items } = await getImages(Storage.hentaiKeywords(), this.page)
    if (items != null) {
      this.lastInfo = items
    }
    this.emit('update', message)
  }
}

@On('update', (instance: Hentai): void => {
  // todo
})
export class Hentai extends EventEmitter {
  private imageSaver = new ImageSaver()
  constructor () {
    super()
    this.imageSaver.on('update', () => this.emit('image_update', ...arguments))
  }
}

const hentaiInstance = new Hentai()

export default hentaiInstance
