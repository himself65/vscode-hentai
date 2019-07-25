import { EventEmitter } from 'events'
import Storage from './storage'

export class Background extends EventEmitter {
  public install (url: string): void {
    if (Storage.isHentaiMode()) return
    const cssObj = Storage.style()
    // todo
    this.emit('done')
  }
}
