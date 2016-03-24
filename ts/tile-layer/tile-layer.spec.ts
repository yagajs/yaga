/// <reference path="../declarations/mocha.d.ts" />
/// <reference path="../abstraction/test-factory.ts" />

/// <reference path="tile-layer.ts" />
/// <reference path="../layer/layer.ts" />
/// <reference path="../layer/layer.spec.ts" />

module org.yagajs.tileLayerTest {
    'use strict';

    import IAbstractApiDescription = org.yagajs.abstractionTest.IAbstractApiDescription;
    import simpleApiTestFactory = org.yagajs.abstractionTest.simpleApiTestFactory;
    import cloneApiDescription = org.yagajs.abstractionTest.cloneApiDescription;

    import TileLayerAbstraction = org.yagajs.tileLayer.TileLayer;
    import layerApi = org.yagajs.layerTest.layerApi;

    export var tileLayerApi: IAbstractApiDescription = cloneApiDescription(layerApi);

    /* tslint:disable:no-string-literal */
    tileLayerApi['type'] = {
        methodTypes: ['get'],
        testData: ['tile', 'tile']
    };
    tileLayerApi['url'] = {
        methodTypes: ['get', 'set'],
        testData: ['http://{s}.tile.osm.org/{z}/{x}/{y}.png?{foo}', 'http://{s}.somedomain.com/blabla/{z}/{x}/{y}.png']
    };
    /* tslint:enable:no-string-literal */

    simpleApiTestFactory('TileLayer', TileLayerAbstraction, tileLayerApi);

}
