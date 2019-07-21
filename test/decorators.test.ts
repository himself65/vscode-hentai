import { EventEmitter } from 'events'
import { On } from '../src/utils'

describe('Decorators Test', () => {
  it('Decorator - @On', () => {
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
      expect(obj.foo).toBe(1)
      expect(obj.goo).toBe(true)
      obj.emit('foo')
      expect(a).toBe(true)
    }
    {
      const obj = { foo: 1 }
      A.call(obj)
      expect(obj.foo).toBe(1)
    }
  })
})
