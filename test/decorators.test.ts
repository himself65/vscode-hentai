import * as assert from 'assert'
import { EventEmitter } from 'events'
import { On } from '../src/utils/decorators'

suite('Decorators Test', () => {
  test('Decorator - @On', () => {
    let a = false

    @On('foo', () => a = true)
    class A extends EventEmitter {
      public foo = 1
      public goo = false

      constructor () {
        super()
        this.goo = true
      }
    }

    {
      const obj = new A()
      assert.strictEqual(obj.foo, 1)
      assert.strictEqual(obj.goo, true)
      obj.emit('foo')
      assert.strictEqual(a, true)
    }
    {
      const obj = { foo: 1 }
      A.call(obj)
      assert.strictEqual(obj.foo, 1)
    }
    {
      assert.throws(() => {
        // tslint:disable-next-line:no-empty
        @On('foo', () => {
        })
        class B {

        }

        // tslint:disable-next-line:no-unused-expression
        new B()
      }, Error('class is not instance of EventEmitter'))
    }
  })
})
