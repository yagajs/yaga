/// <reference path="../declarations/mocha.d.ts" />
/// <reference path="../abstraction/test-factory.ts" />

/// <reference path="geojson-layer.ts" />
/// <reference path="../layer/layer.ts" />
/// <reference path="../layer/layer.spec.ts" />

module org.yagajs.geojsonLayerTest {
    'use strict';

    import IAbstractApiDescription = org.yagajs.abstractionTest.IAbstractApiDescription;
    import simpleApiTestFactory = org.yagajs.abstractionTest.simpleApiTestFactory;
    import cloneApiDescription = org.yagajs.abstractionTest.cloneApiDescription;

    import GeojsonLayerAbstraction = org.yagajs.geojsonLayer.GeojsonLayer;
    import layerApi = org.yagajs.layerTest.layerApi;

    import ITestData = org.yagajs.abstractionTest.ITestData;

    export var geojsonLayerApi: IAbstractApiDescription = cloneApiDescription(layerApi);

    /* tslint:disable:no-string-literal */
    geojsonLayerApi['type'] = {
        methodTypes: ['get'],
        testData: ['geojson', 'geojson']
    };
    geojsonLayerApi['data'] = {
        callbacks: {
            initial: (data: ITestData, done: MochaDone): void => {
                if (data.value.type !== 'FeatureCollection' || data.value.features.length !== data.expectedValue.features.length) {
                    return done(new Error('Incorrect geojson data'));
                }
                return done();
            }
        },
        methodTypes: ['get', 'set'],
        testData: [
            {
                features: [
                    {
                        geometry: {coordinates: [102.0, 0.5], type: 'Point'},
                        properties: {test: 'a'},
                        type: 'Feature'
                    }
                ],
                type: 'FeatureCollection'
            },
            {
                features: [
                    {
                        geometry: {coordinates: [101.0, 111.0], type: 'Point'},
                        properties: {test: 'b'},
                        type: 'Feature'
                    },
                    {
                        geometry: {coordinates: [12.0, 5], type: 'Point'},
                        properties: {test: 'c'},
                        type: 'Feature'
                    }
                ],
                type: 'FeatureCollection'
            }
        ]
    };
    /* tslint:enable:no-string-literal */

    simpleApiTestFactory('GeoJSONLayer', GeojsonLayerAbstraction, geojsonLayerApi);

}
