import * as vscode from 'vscode'
import { Observable } from 'rxjs'
import { throttleTime } from 'rxjs/operators'

export const moduleName = 'vscode-hentai'
export const observable = new Observable<vscode.TextDocumentChangeEvent>(subscriber => {
  vscode.workspace.onDidChangeTextDocument((event) => subscriber.next(event))
  console.log('workspace event onDidChangeTextDocument registered')
}).pipe(throttleTime(1000))

observable.subscribe(function onDidChangeTextDocument (event) {
  // todo
})

export function activate (context: vscode.ExtensionContext) {
  console.log(`plugin ${moduleName} loaded.`)
}

export function deactivate () {
  // todo
}
