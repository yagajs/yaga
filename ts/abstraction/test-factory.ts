/// <reference path="../declarations/mocha.d.ts" />

/// <reference path="abstraction.ts" />

module org.yagajs.abstractionTest {
    'use strict';
    import Abstraction = org.yagajs.abstraction.Abstraction;

    export interface ITestData {
        target: Abstraction;
        expectedValue: any;
        value: any;
    }

    export interface ITestCallback {
        (data: ITestData, done: MochaDone): void;
    }

    export interface ITestCallbackDictionary {
        initial?: ITestCallback;
        get?: ITestCallback;
        set?: ITestCallback;
        add?: ITestCallback;
        remove?: ITestCallback;

        setEvent?: ITestCallback;
        setEventS?: ITestCallback;
        setWatchEvent?: ITestCallback;
        setWatchEventS?: ITestCallback;
    }

    export interface IAbstractPropertyDescription {
        testData: any[];
        methodTypes: string[];
        callbacks?: ITestCallbackDictionary;
    }
    export interface IAbstractApiDescription {
        [propertyName: string]: IAbstractPropertyDescription;
    }

    interface IAbstractionClass {
        new (opts: any): Abstraction;
    }

    function subTestFactory(target: Abstraction,
                            apiName: string,
                            methodTypes: string[],
                            callbacks: ITestCallbackDictionary,
                            compareData: any, updateData: any): void {
        var upperCaseName: string = apiName.substr(0, 1).toUpperCase() + apiName.substr(1);

        describe('Endpoint ' + apiName, (): void => {


            it('should have stored initial data', (done: MochaDone): void => {
                var data: ITestData = {
                    expectedValue: compareData,
                    target: target,
                    value: target[apiName]
                };
                if (typeof callbacks.initial === 'function') {
                    return callbacks.initial(data, done);
                }
                return defaultTestCallback(data, done);
            });
            if (methodTypes.indexOf('get') !== -1) {
                it('should get initial data', (done: MochaDone): void => {
                    var data: ITestData = {
                        expectedValue: compareData,
                        target: target,
                        value: target['get' + upperCaseName]()
                    };
                    if (typeof callbacks.get === 'function') {
                        return callbacks.get(data, done);
                    }
                    return defaultTestCallback(data, done);
                });
            }

            if (methodTypes.indexOf('set') !== -1) {
                it('should set other data', (done: MochaDone): void => {
                    target['set' + upperCaseName](updateData);
                    var data: ITestData = {
                        expectedValue: updateData,
                        target: target,
                        value: target[apiName]
                    };
                    if (typeof callbacks.set === 'function') {
                        return callbacks.set(data, done);
                    }
                    defaultTestCallback(data, done);
                });
                it('should fire set event on set', (done: MochaDone): void => {
                    target.once('set', (eventName: string, value: any): void => {
                        var data: ITestData = {
                            expectedValue: compareData,
                            target: target,
                            value: value
                        };
                        if (typeof callbacks.setEvent === 'function') {
                            return callbacks.setEvent(data, done);
                        }
                        return defaultTestCallback(data, done);
                    });
                    target['set' + upperCaseName](compareData);
                });
                it('should fire watch event on set', (done: MochaDone): void => {
                    target.once('watch', (eventName: string, value: any): void => {
                        var data: ITestData = {
                            expectedValue: updateData,
                            target: target,
                            value: value
                        };
                        if (typeof callbacks.setWatchEvent === 'function') {
                            return callbacks.setWatchEvent(data, done);
                        }
                        return defaultTestCallback(data, done);
                    });
                    target['set' + upperCaseName](updateData);
                });

                it('should fire specific set event on set', (done: MochaDone): void => {
                    target.once('set:' + apiName, (value: any): void => {
                        var data: ITestData = {
                            expectedValue: compareData,
                            target: target,
                            value: value
                        };
                        if (typeof callbacks.setEventS === 'function') {
                            return callbacks.setEventS(data, done);
                        }
                        return defaultTestCallback(data, done);
                    });
                    target['set' + upperCaseName](compareData);
                });
                it('should fire specific watch event on set', (done: MochaDone): void => {
                    target.once('watch:' + apiName, (value: any): void => {
                        var data: ITestData = {
                            expectedValue: updateData,
                            target: target,
                            value: value
                        };
                        if (typeof callbacks.setWatchEventS === 'function') {
                            return callbacks.setWatchEventS(data, done);
                        }
                        return defaultTestCallback(data, done);
                    });
                    target['set' + upperCaseName](updateData);
                });
            }

            if (methodTypes.indexOf('add') !== -1) {

                it.skip('No tests for adders implemented!');
                // it('should set other data', (): void => {
                //     target['set' + upperCaseName](updateData);
                //     if (target['get' + upperCaseName]() !== updateData || target[apiName] !== updateData ) {
                //         throw new Error('Stored data is not valid');
                //     }
                // });
                // it('should fire an event on set', (done: MochaDone): void => {
                //     target.once('set:' + apiName, (value: any): void => {
                //         if (value !== compareData) {
                //             return done(new Error('Fired data is not valid'));
                //         }
                //         return done();
                //     });
                //     target['set' + upperCaseName](compareData);
                // });
            }
            if (methodTypes.indexOf('remove') !== -1) {
                it.skip('No tests for removers implemented!');
                // it('should set other data', (): void => {
                //     target['set' + upperCaseName](updateData);
                //     if (target['get' + upperCaseName]() !== updateData || target[apiName] !== updateData ) {
                //         throw new Error('Stored data is not valid');
                //     }
                // });
                // it('should fire an event on set', (done: MochaDone): void => {
                //     target.once('set:' + apiName, (value: any): void => {
                //         if (value !== compareData) {
                //             return done(new Error('Fired data is not valid'));
                //         }
                //         return done();
                //     });
                //     target['set' + upperCaseName](compareData);
                // });
            }


        });


    }

    /* tslint:disable:variable-name */
    export function simpleApiTestFactory(name: string, Target: IAbstractionClass, api: IAbstractApiDescription): void {
        /* tslint:enable:variable-name */
        var initialValues: any = {},
            keys: string[] = Object.keys(api);

        for (let i: number = 0; i < keys.length; i += 1) {
            initialValues[keys[i]] = api[keys[i]].testData[0];
        }

        describe('Abstraction API tests for ' + name, (): void => {
            var target: Abstraction = new Target(initialValues);
            for (let i: number = 0; i < keys.length; i += 1) {
                subTestFactory(
                    target,
                    keys[i],
                    api[keys[i]].methodTypes,
                    api[keys[i]].callbacks || {},
                    api[keys[i]].testData[0],
                    api[keys[i]].testData[1]
                );
            }
        });
    }

    export function cloneApiDescription(original: IAbstractApiDescription, exclude: string[] = []): IAbstractApiDescription {
        var result: any = {},
            endpoint: string,
            setting: string;

        for (endpoint in original) {
            if (original.hasOwnProperty(endpoint) && exclude.indexOf(endpoint) === -1) {
                result[endpoint] = {};
                for (setting in original[endpoint]) {
                    if (original[endpoint].hasOwnProperty(setting)) {
                        result[endpoint][setting] = original[endpoint][setting];
                    }
                }
            }
        }
        return result;
    }


    // Callbacks


    export function defaultTestCallback(data: ITestData, done: MochaDone): void {
        if (data.value !== data.expectedValue) {
            return done(new Error('Unexpected data'));
        }
        return done();
    }
}
