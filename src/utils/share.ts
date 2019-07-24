import { workspace } from 'vscode'
import { configurationObserver } from '../extension'

const lazyObj: { [key: string]: any } = {}

configurationObserver.subscribe(() => {
  for (const key in lazyObj) {
    lazyObj[key] = workspace.getConfiguration().get(key)
  }
})

function Lazy (key: string): any {
  if (lazyObj[key]) {
    return lazyObj[key]
  } else {
    lazyObj[key] = !!workspace.getConfiguration().get(key)
  }
}

export const hentaiKeywords = (): string => Lazy('hentai.keywords')
export const isHentaiMode = (): boolean => !!Lazy('hentai.enabled')
