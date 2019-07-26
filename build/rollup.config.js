import * as path from 'path'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript'
import json from 'rollup-plugin-json'

const root = path.resolve(__dirname, '..')

export default {
  input: path.join(root, 'src', 'extension.ts'),
  output: {
    file: './dist/extension.js',
    format: 'cjs'
  },

  plugins: [
    commonjs({
      include: /node_modules/
    }),
    resolve({
      preferBuiltins: true
    }),
    json(),
    typescript({
      tsconfig: path.resolve(root, 'tsconfig.json')
    })
  ],
  external: (id) => [/^vscode/, /^axios/, /^rxjs/, /^reflect-metadata/].some(r => r.test(id))
}
