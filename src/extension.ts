import * as vscode from 'vscode'
import { displayName as moduleName } from '../package.json'

export function activate (context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
    vscode.window.showInformationMessage('Hello World!')
  })

  context.subscriptions.push(disposable)

  console.log(`plugin ${moduleName} loaded.`)
}

export function deactivate () {
}
