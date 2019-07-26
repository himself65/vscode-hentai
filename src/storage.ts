import { EventEmitter } from 'events'
import 'reflect-metadata'
import { workspace } from 'vscode'
import { configurationObserver } from './utils'

const SAVE_KEY = Symbol('SAVE_KEY')

class Storage extends EventEmitter {
  @Reflect.metadata(SAVE_KEY, 'hentai.style')
  public style = (): object & { [key: string]: string } => this.Lazy('hentai.style')

  @Reflect.metadata(SAVE_KEY, 'hentai.coolingtime')
  public coolingTime = (): number => this.Lazy('hentai.coolingtime')

  @Reflect.metadata(SAVE_KEY, 'hentai.keywords')
  public hentaiKeywords = (): string => this.Lazy('hentai.keywords')

  @Reflect.metadata(SAVE_KEY, 'hentai.enabled')
  public isHentaiMode = (): boolean => !!this.Lazy('hentai.enabled')

  private lazyObj: { [key: string]: any } = {}

  public init (): void {
    configurationObserver.subscribe(() => {
      for (const key in this.lazyObj) {
        const value = workspace.getConfiguration().get(key)
        if (this.lazyObj[key] !== value) {
          this.lazyObj[key] = value
        }
      }
      this.emit('update')
    })
  }

  private Lazy (key: string): any {
    if (this.lazyObj[key]) {
      return this.lazyObj[key]
    } else {
      this.lazyObj[key] = workspace.getConfiguration().get(key)
    }
  }

  public save (...args: [() => any, any]) {
    return this.Save(...args)
  }

  public Save (target: () => any, value: any): void {
    const key = Reflect.getMetadata(SAVE_KEY, target)
    if (typeof this.lazyObj[key] !== typeof value) {
      throw new TypeError(`value is not the same type with ${target}`)
    }
    this.lazyObj[key] = value
    workspace.getConfiguration().update(key, value)
  }
}

const storage = new Storage()

export default {
  register: storage.init,
  style: storage.style,
  coolingTime: storage.coolingTime,
  hentaiKeywords: storage.hentaiKeywords,
  isHentaiMode: storage.isHentaiMode
}
