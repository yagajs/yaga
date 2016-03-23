/// <reference path="../declarations/mocha.d.ts" />
/// <reference path="../abstraction/test-factory.ts" />

/// <reference path="map.ts" />
/// <reference path="../latlng/latlng.ts" />

module org.yagajs.mapTest {
    'use strict';

    import IAbstractApiDescription = org.yagajs.abstractionTest.IAbstractApiDescription;
    import simpleApiTestFactory = org.yagajs.abstractionTest.simpleApiTestFactory;

    import MapAbstraction = org.yagajs.map.Map;
    import LatLngAbstraction = org.yagajs.latlng.LatLng;

    export var mapApi: IAbstractApiDescription = {
        center: {
            methodTypes: ['get', 'set'],
            testData: [new LatLngAbstraction({lat: 10, lng: 10}), new LatLngAbstraction({lat: 20, lng: 20})]
        },
        zoom: {
            methodTypes: ['get', 'set'],
            testData: [12, 17]
        }
    };

    simpleApiTestFactory('Map', MapAbstraction, mapApi);

}
