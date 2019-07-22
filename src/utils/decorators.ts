import { EventEmitter } from 'events'

export function On (name: string | symbol, event: (...args: any[]) => void) {
  return function <T extends { new (...args: any[]): {} }> (constructor: T): any {
    const newConstr = function (...args: any[]) {
      const F: any = function (this: any) {
        if (!(this instanceof EventEmitter)) {
          throw new Error('class is not instance of EventEmitter')
        }
        return new constructor(args)
      }
      F.prototype = constructor.prototype
      return (new F()).on(name, event)
    }
    newConstr.prototype = constructor.prototype
    return newConstr
  }
}
