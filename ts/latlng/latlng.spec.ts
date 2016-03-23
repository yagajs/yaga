/// <reference path="../abstraction/test-factory.ts" />

/// <reference path="latlng.ts" />

module org.yagajs.latlngTest {
    'use strict';

    import IAbstractApiDescription = org.yagajs.abstractionTest.IAbstractApiDescription;
    import simpleApiTestFactory = org.yagajs.abstractionTest.simpleApiTestFactory;

    import LatLngAbstraction = org.yagajs.latlng.LatLng;

    export var latlngApi: IAbstractApiDescription = {
        lat: {
            methodTypes: ['get', 'set'],
            testData: [12, 56]
        },
        lng: {
            methodTypes: ['get', 'set'],
            testData: [34, 78]
        }
    };

    simpleApiTestFactory('LatLng', LatLngAbstraction, latlngApi);
}
