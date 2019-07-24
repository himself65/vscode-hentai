import { Observable } from 'rxjs'
import { debounceTime, throttleTime } from 'rxjs/operators'
import { ConfigurationChangeEvent, ExtensionContext, TextDocumentChangeEvent, workspace } from 'vscode'
import hentaiInstance from './hentai'
import Storage from './storage'

export const moduleName = 'vscode-hentai'

export let textChangeObserver: Observable<TextDocumentChangeEvent>
export let configurationObserver: Observable<ConfigurationChangeEvent>

export function activate (context: ExtensionContext) {
  textChangeObserver = new Observable<TextDocumentChangeEvent>(subscriber => {
    workspace.onDidChangeTextDocument((event) => subscriber.next(event))
  }).pipe(debounceTime(Storage.coolingTime() * 1000))
  configurationObserver = new Observable<ConfigurationChangeEvent>(subscriber => {
    workspace.onDidChangeConfiguration(event => subscriber.next(event))
  }).pipe(throttleTime(5000))

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
