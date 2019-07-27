import { EventEmitter } from 'events'
import Storage from './storage'
import { On } from './utils'
import { getImages, TInfoItem } from './utils/api'

class ImageSaver extends EventEmitter {
  private lastInfo?: TInfoItem[]
  private page: number = 0
  public ImagesUrls?: string[]

  private getImgUrls (): string[] | string {
    if (this.lastInfo == null) {
      return ''
    }

    return this.lastInfo
      .splice(0, 3)
      .map(item => `https://img.pixivic.com:23334/get/${item.meta_single_page.original_image_url}`)
  }

  public async update () {
    if (this.lastInfo != null && this.lastInfo.length > 0) {
      this.emit('update', '加载完成', this.getImgUrls())
      return
    }
    const { message, items } = await getImages(Storage.hentaiKeywords(), this.page)
    if (items != null) {
      this.lastInfo = items
    }
    this.emit('update', message, this.getImgUrls())
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
