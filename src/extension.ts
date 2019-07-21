import * as vscode from 'vscode'
export const moduleName = 'vscode-hentai'

export function activate (context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
    vscode.window.showInformationMessage('Hello World!')
  })

  context.subscriptions.push(disposable)

  console.log(`plugin ${moduleName} loaded.`)
}

export function deactivate () {
}
