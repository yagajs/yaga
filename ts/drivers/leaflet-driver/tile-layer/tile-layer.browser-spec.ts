/// <reference path="../../../declarations/mocha.d.ts" />
/// <reference path="../../../abstraction/test-factory.ts" />

/// <reference path="../../../latlng/latlng.spec.ts" />
/// <reference path="tile-layer.ts" />

module org.yagajs.drivers.leafletDriver.tileLayerTest {
    'use strict';

    // import IAbstractApiDescription = org.yagajs.abstractionTest.IAbstractApiDescription;
    import simpleApiTestFactory = org.yagajs.abstractionTest.simpleApiTestFactory;

    import TileLayer = org.yagajs.drivers.leafletDriver.tileLayer.TileLayer;

    import tileLayerApi = org.yagajs.tileLayerTest.tileLayerApi;

    describe('Leaflet LatLng abstraction', (): void => {

        simpleApiTestFactory('Leaflet LatLng abstraction', TileLayer, tileLayerApi);

        describe('Target', (): void => {
            var target: TileLayer = new TileLayer({
                attribution: 'just a test',
                name: 'test',
                type: 'tile',
                url: 'http://just.a/test/{z}/(x)/{y}.png'
            });
            /* tslint:disable:no-string-literal */
            it('should have stored initial data', (): void => {
                if (target.target['_url'] !== 'http://just.a/test/{z}/(x)/{y}.png') {
                    throw new Error('Stored url is not valid');
                }
            });
            it('should set other data', (): void => {
                target.setUrl('http://just.another');

                if (target.target['_url'] !== 'http://just.another') {
                    throw new Error('Stored url is not valid');
                }
            });
            /* tslint:enable:no-string-literal */
        });
    });

}
