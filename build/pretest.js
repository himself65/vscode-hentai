const fs = require('fs')
const path = require('path')
const { rollup } = require('rollup')
const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')
const json = require('rollup-plugin-json')
const typescript = require('rollup-plugin-typescript')

const root = path.resolve(__dirname, '..')
const outputDir = path.join(root, 'out')
const testRoot = path.join(root, 'test')

const tasks = []

function preBuild (dir) {
  fs.readdirSync(dir).forEach(file => {
    if (/.eslintrc/.test(file)) return

    const filePath = path.join(dir, file)
    if (fs.statSync(filePath).isDirectory()) {
      preBuild(filePath)
    } else {
      tasks.push({
        input: filePath,
        output: {
          file: filePath.replace(testRoot, outputDir).replace(/\.ts$/, '.js'),
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
        external: ['vscode', 'supertest', 'jest']
      })
    }
  })
}

preBuild(testRoot);

(async function build () {
  for (const task of tasks) {
    await rollup(task).then(bundle => {
      bundle.write(task.output)
    })
  }
})()
