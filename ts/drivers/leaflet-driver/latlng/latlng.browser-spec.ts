/// <reference path="../../../declarations/mocha.d.ts" />
/// <reference path="../../../abstraction/test-factory.ts" />

/// <reference path="../../../latlng/latlng.spec.ts" />
/// <reference path="latlng.ts" />

module org.yagajs.drivers.leafletDriver.latlngTest {
    'use strict';

    // import IAbstractApiDescription = org.yagajs.abstractionTest.IAbstractApiDescription;
    import simpleApiTestFactory = org.yagajs.abstractionTest.simpleApiTestFactory;

    import LatLng = org.yagajs.drivers.leafletDriver.latlng.LatLng;

    import latlngApi = org.yagajs.latlngTest.latlngApi;

    describe('Leaflet LatLng abstraction', (): void => {

        simpleApiTestFactory('Leaflet LatLng abstraction', LatLng, latlngApi);

        describe('Target', (): void => {
            var target: LatLng = new LatLng({lat: 12, lng: 34});
            it('should have stored initial data', (): void => {
                if (target.target.lat !== 12) {
                    throw new Error('Stored lat is not valid');
                }
                if (target.target.lng !== 34) {
                    throw new Error('Stored lng is not valid');
                }
            });
            it('should set other data', (): void => {
                target.setLat(56);
                target.setLng(78);

                if (target.target.lat !== 56) {
                    throw new Error('Stored lat is not valid');
                }
                if (target.target.lng !== 78) {
                    throw new Error('Stored lng is not valid');
                }
            });
        });
    });

}





