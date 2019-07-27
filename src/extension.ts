import { debounceTime } from 'rxjs/operators'
import { ExtensionContext } from 'vscode'
import { backgroundInstance } from './background'
import hentaiInstance from './hentai'
import Storage from './storage'
import { promptForOpenOutputChannel, textChangeObserver } from './utils'

export const moduleName = 'vscode-hentai'

export function activate (context: ExtensionContext) {
  Storage.register()
  textChangeObserver.pipe(debounceTime(Storage.coolingTime() * 60 * 1000))

  textChangeObserver.subscribe(function onDidChangeTextDocument (event) {
    // todo
    // when text change
  })

  hentaiInstance.on('image_update', async (message: string, urls: string | string[]) => {
    await promptForOpenOutputChannel(message)
    await backgroundInstance.install(urls)
  })

  console.log(`plugin ${moduleName} loaded.`)
}

export function deactivate () {
  // todo
}
