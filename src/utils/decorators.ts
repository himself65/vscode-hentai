import { EventEmitter } from 'events'

export function On (name: string | symbol, event: (...args: any[]) => void) {
  return function <T extends { new (...args: any[]): {} }, U extends EventEmitter> (constructor: T): any {
    const newConstr = function (this: EventEmitter, ...args: any[]) {
      const F: any = function () {
        return new constructor(args)
      }
      F.prototype = constructor.prototype
      return (new F()).on(name, event)
    }
    newConstr.prototype = constructor.prototype
    return newConstr
  }
}
