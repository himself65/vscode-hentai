import { EventEmitter } from 'events'
import * as fs from 'fs'
import Storage from './storage'
import { cssPath } from './utils'

export class Background extends EventEmitter {
  public async install (url: string | string[]) {
    if (Storage.isHentaiMode()) return
    const cssObj = Storage.style()

    const frontContent = Storage.useFront() ? '::after' : '::before'

    let img0: string
    let img1: string
    let img2: string
    if (typeof url === 'string') {
      img0 = img1 = img2 = url
    } else {
      [img0, img1, img2] = url
    }

    let content = `/*vscode-hentai-start*/
        [id="workbench.parts.editor"] .split-view-view:nth-child(1) .editor-container .overflow-guard>.monaco-scrollable-element${frontContent}{background-image: url('${img0}');}
        [id="workbench.parts.editor"] .split-view-view:nth-child(2) .editor-container .overflow-guard>.monaco-scrollable-element${frontContent}{background-image: url('${img1}');}
        [id="workbench.parts.editor"] .split-view-view:nth-child(3) .editor-container .overflow-guard>.monaco-scrollable-element${frontContent}{background-image: url('${img2}');}
        [id="workbench.parts.editor"] .split-view-view .editor-container .overflow-guard>.monaco-scrollable-element>.monaco-editor-background{background: none;}
    /*vscode-hentai-end*/`
    await Background.saveCssContent(`${Background.clearCssContent(Background.loadCssContent())}${content}`)

    this.emit('installed')
  }

  public async uninstall () {
    this.emit('uninstalled')
  }

  /**
   * @private
   */
  private static saveCssContent (content: string): Promise<any> {
    return new Promise((resolve, reject) => {
      fs.writeFile(cssPath, content, 'utf-8', (err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  /**
   * @private
   */
  private static loadCssContent (): string {
    return fs.readFileSync(cssPath, 'utf-8')
  }

  /**
   * @private
   */
  private static clearCssContent (content: string): string {
    return content
      .replace(/\/\*vscode-hentai-start\*\/[\s\S]*?\/\*vscode-hentai-end\*\//g, '')
      .replace(/\s*$/, '')
  }
}

export const backgroundInstance = new Background()

export default backgroundInstance
