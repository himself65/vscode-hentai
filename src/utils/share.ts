import { dirname, join, resolve } from 'path'
import { Observable } from 'rxjs'
import { debounceTime, throttleTime } from 'rxjs/operators'
import { ConfigurationChangeEvent, TextDocumentChangeEvent, workspace } from 'vscode'

export const configurationObserver = new Observable<ConfigurationChangeEvent>(subscriber => {
  workspace.onDidChangeConfiguration(event => subscriber.next(event))
}).pipe(throttleTime(5 * 1000))
export const textChangeObserver = new Observable<TextDocumentChangeEvent>(subscriber => {
  workspace.onDidChangeTextDocument((event) => subscriber.next(event))
}).pipe(debounceTime(30 * 60 * 1000))

// @ts-ignore
const basePath = dirname(require.main.filename)

export const cssPath = join(basePath, 'vs', 'workbench', 'workbench.main.css')
