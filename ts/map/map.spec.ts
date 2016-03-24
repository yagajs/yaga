/// <reference path="../declarations/mocha.d.ts" />
/// <reference path="../abstraction/test-factory.ts" />

/// <reference path="map.ts" />
/// <reference path="../layer/layer.ts" />
/// <reference path="../latlng/latlng.ts" />

module org.yagajs.mapTest {
    'use strict';

    import IAbstractApiDescription = org.yagajs.abstractionTest.IAbstractApiDescription;
    import simpleApiTestFactory = org.yagajs.abstractionTest.simpleApiTestFactory;

    import MapAbstraction = org.yagajs.map.Map;
    import LatLngAbstraction = org.yagajs.latlng.LatLng;
    import LayerAbstraction = org.yagajs.layer.Layer;
    import registerLayerType = org.yagajs.layer.registerLayerType;

    import ITestData = org.yagajs.abstractionTest.ITestData;

    export var mapApi: IAbstractApiDescription = {
        center: {
            methodTypes: ['get', 'set'],
            testData: [new LatLngAbstraction({lat: 10, lng: 10}), new LatLngAbstraction({lat: 20, lng: 20})]
        },
        layers: {
            callbacks: {
                initial: (data: ITestData, done: MochaDone): void => {
                    return done();
                },
                set: (data: ITestData, done: MochaDone): void => {
                    if (data.expectedValue.length !== data.value.length) {
                        return done(new Error('Invalid layer size'));
                    }
                    return done();
                },
                setEvent: (data: ITestData, done: MochaDone): void => {
                    if (data.expectedValue.length !== data.value.length) {
                        return done(new Error('Invalid layer size'));
                    }
                    return done();
                },
                setWatchEvent: (data: ITestData, done: MochaDone): void => {
                    return done(); // Not testable here because watch is fired multiple
                },
                setEventS: (data: ITestData, done: MochaDone): void => {
                    if (data.expectedValue.length !== data.value.length) {
                        return done(new Error('Invalid layer size'));
                    }
                    return done();
                },
                setWatchEventS: (data: ITestData, done: MochaDone): void => {
                    return done(); // Not testable here because watch is fired multiple
                },
                get: (data: ITestData, done: MochaDone): void => {
                    if (data.expectedValue.length !== data.value.length) {
                        return done(new Error('Invalid layer size'));
                    }
                    return done();
                },
            },
            methodTypes: ['get', 'set', 'add', 'remove'],
            testData: [
                [{attribution: 'Just a test', name: 'test', type: 'layer-test'}],
                [{attribution: 'Another test', name: 'test2', type: 'layer-test'}]
            ]
        },
        zoom: {
            methodTypes: ['get', 'set'],
            testData: [12, 17]
        }
    };

    class TestLayerAbstraction extends LayerAbstraction {
        public type: string = 'layer-test';
    }
    registerLayerType('layer-test', TestLayerAbstraction);

    simpleApiTestFactory('Map', MapAbstraction, mapApi);

}
