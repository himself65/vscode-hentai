import { debounceTime } from 'rxjs/operators'
import { ExtensionContext } from 'vscode'
import hentaiInstance from './hentai'
import Storage from './storage'
import { textChangeObserver } from './utils'

export const moduleName = 'vscode-hentai'

export function activate (context: ExtensionContext) {
  Storage.register()
  textChangeObserver.pipe(debounceTime(Storage.coolingTime() * 60 * 1000))

  textChangeObserver.subscribe(function onDidChangeTextDocument (event) {
    // todo
    // when text change
  })

  hentaiInstance.on('image_update', async (message: string) => {
    // todo
    // when image update
  })

  console.log(`plugin ${moduleName} loaded.`)
}

export function deactivate () {
  // todo
}
