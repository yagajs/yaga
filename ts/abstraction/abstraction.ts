/// <reference path="../libs/event-emitter/event-emitter.ts" />

module org.yagajs.abstraction {
    'use strict';
    import EventEmitter = com.atdSchubert.eventEmitter.EventEmitter;

    export interface IAbstraction {
        // [/^set/: string]: setterFn
        // [/^get/: string]: getterFn
        // [/^add/: string]: adderFn
        // [/^remove/: string]: removererFn
        // [propertyName: string]: any
        // no target (reserved for driver)
    }

    export interface IDriver extends IAbstraction, Abstraction {
        target: any;
    }

    export class Abstraction extends EventEmitter implements IAbstraction {
        constructor(opts: any) {
            super();
            var hash: string;
            // set option values to abstraction
            if (typeof opts === 'object' && !Array.prototype.isPrototypeOf(opts)) {
                for (hash in opts) {
                    let upperHash: string = hash.substr(0, 1).toUpperCase() + hash.substr(1);
                    if (opts.hasOwnProperty(hash)) {
                        if (typeof this['set' + upperHash] === 'function') { // should prefer setter!
                            this['set' + upperHash](opts[hash]);
                        } else {
                            this[hash] = opts[hash];
                        }
                    }
                }
            }
        }
    }

    export function getterHelper(self: Abstraction, attribute: string): any {
        return self[attribute];
    }
    export function setterHelper(self: Abstraction, attribute: string, value: any, origin: any[] = []): void {
        if (origin.indexOf(self) !== -1) {
            return;
        }
        origin.push(self);

        self.emit('set', attribute, value, origin);
        self.emit('watch', attribute, value, origin);
        self.emit('set:' + attribute, value, origin);
        self.emit('watch:' + attribute, value, origin);

        self[attribute] = value;
    }

    export function adderHelper(self: Abstraction, attribute: string, value: any, origin: any[] = []): void {
        if (origin.indexOf(self) !== -1) {
            return;
        }
        origin.push(self);

        self.emit('add', attribute, value, origin);
        self.emit('watch', attribute, value, origin);
        self.emit('add:' + attribute, value, origin);
        self.emit('watch:' + attribute, value, origin);

        self[attribute].push(value);
    }

    export function removerHelper(self: Abstraction, attribute: string, value: any, origin: any[] = []): void {
        if (origin.indexOf(self) !== -1) {
            return;
        }
        origin.push(self);

        self.emit('remove', attribute, value, origin);
        self.emit('watch', attribute, value, origin);
        self.emit('remove:' + attribute, value, origin);
        self.emit('watch:' + attribute, value, origin);

        self[attribute].splice(self[attribute].indexOf(value), 1);
    }

    export function enableHelper(self: Abstraction, attribute: string, origin: any[] = []): void {
        if (origin.indexOf(self) !== -1) {
            return;
        }
        origin.push(self);

        self.emit('enable', attribute, origin);
        self.emit('watch', attribute, true, origin);
        self.emit('enable:' + attribute, origin);
        self.emit('watch:' + attribute, true, origin);
    }
    export function disableHelper(self: Abstraction, attribute: string, origin: any[] = []): void {
        if (origin.indexOf(self) !== -1) {
            return;
        }
        origin.push(self);

        self.emit('disable', attribute, origin);
        self.emit('watch', attribute, false, origin);
        self.emit('disable:' + attribute, origin);
        self.emit('watch:' + attribute, false, origin);
    }
}
