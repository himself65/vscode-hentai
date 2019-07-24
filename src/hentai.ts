import { EventEmitter } from 'events'
import { hentaiKeywords, On } from './utils'
import { getImages, TInfoItem } from './utils/api'

@On('update', async (instance: ImageSaver) => instance.update())
class ImageSaver extends EventEmitter {
  private lastInfo?: TInfoItem[]
  private page: number = 0
  public ImagesUrls?: string[]

  public async update () {
    const { message, items } = await getImages(hentaiKeywords(), this.page)
    // fixme: alert to show message
    if (items != null) {
      this.lastInfo = items
    }
  }
}

@On('update', (instance: Hentai): void => {
  // todo
})
export class Hentai extends EventEmitter {
  constructor () {
    super()
  }
}

const hentaiInstance = new Hentai()

export default hentaiInstance
