import { workspace, TextDocumentChangeEvent, ConfigurationChangeEvent, ExtensionContext } from 'vscode'
import { Observable } from 'rxjs'
import { debounceTime } from 'rxjs/operators'

export const moduleName = 'vscode-hentai'

export let textChangeObserver: Observable<TextDocumentChangeEvent>
export let configurationObserver: Observable<ConfigurationChangeEvent>

export function activate (context: ExtensionContext) {
  textChangeObserver = new Observable<TextDocumentChangeEvent>(subscriber => {
    workspace.onDidChangeTextDocument((event) => subscriber.next(event))
  }).pipe(debounceTime(500))
  configurationObserver = new Observable<ConfigurationChangeEvent>(subscriber => {
    workspace.onDidChangeConfiguration(event => subscriber.next(event))
  })

  textChangeObserver.subscribe(function onDidChangeTextDocument (event) {

  })

  console.log(`plugin ${moduleName} loaded.`)
}

export function deactivate () {
  // todo
}
