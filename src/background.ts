import { EventEmitter } from 'events'
import * as fs from 'fs'
import Storage from './storage'
import { cssPath } from './utils'

export class Background extends EventEmitter {
  public async install (url: string | string[]) {
    // todo: 使用 'vscode-background' 插件来设置背景
    this.emit('installed')
  }

  public async uninstall () {
    this.emit('uninstalled')
  }
}

export const backgroundInstance = new Background()

export default backgroundInstance
