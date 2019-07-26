import { runCLI } from 'jest'
import * as path from 'path'
// @ts-ignore
const config = require('../jest.config.js')

export function run (): Promise<any> {
  const testsRoot = path.resolve(__dirname, './')

  return new Promise<any>((resolve, reject) => {
    runCLI(config as any, [testsRoot])
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}
