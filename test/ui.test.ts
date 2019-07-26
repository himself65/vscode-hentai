import * as assert from 'assert'
import { DialogType, promptForOpenOutputChannel } from '../src/utils'

suite('UI Test', () => {
  test('function promptForOpenOutputChannel', async () => {
    assert.doesNotThrow(async () => {
      await promptForOpenOutputChannel('foo', DialogType.info)
    })
  })
})
