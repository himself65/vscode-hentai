import { MessageItem, window } from 'vscode'

export namespace DialogOptions {
  export const open: MessageItem = { title: 'Open' }
  export const yes: MessageItem = { title: 'Yes' }
  export const no: MessageItem = { title: 'No', isCloseAffordance: true }
  export const never: MessageItem = { title: 'Never' }
  export const singUp: MessageItem = { title: 'Sign up' }
}

export async function promptForOpenOutputChannel (message: string, type: DialogType = DialogType.info): Promise<void> {
  let result: MessageItem | undefined
  switch (type) {
    case DialogType.info:
      result = await window.showInformationMessage(message, DialogOptions.open, DialogOptions.no)
      break
    case DialogType.warning:
      result = await window.showWarningMessage(message, DialogOptions.open, DialogOptions.no)
      break
    case DialogType.error:
      result = await window.showErrorMessage(message, DialogOptions.open, DialogOptions.no)
      break
    default:
      break
  }
}

export enum DialogType {
  info = 'info',
  warning = 'warning',
  error = 'error'
}
