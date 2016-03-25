/// <reference path="../../../declarations/mocha.d.ts" />
/// <reference path="../../../abstraction/test-factory.ts" />

/// <reference path="../../../map/map.spec.ts" />
/// <reference path="../tile-layer/tile-layer.ts" />
/// <reference path="map.ts" />

module org.yagajs.drivers.leafletDriver.latlngTest {
    'use strict';

    import ILatLng = org.yagajs.latlng.ILatLng;

    import IAbstractApiDescription = org.yagajs.abstractionTest.IAbstractApiDescription;
    import simpleApiTestFactory = org.yagajs.abstractionTest.simpleApiTestFactory;
    import cloneApiDescription = org.yagajs.abstractionTest.cloneApiDescription;

    import Map = org.yagajs.drivers.leafletDriver.map.Map;
    import LatLng = org.yagajs.drivers.leafletDriver.latlng.LatLng;

    import originalMapApi = org.yagajs.mapTest.mapApi;
    export var mapApi: IAbstractApiDescription = cloneApiDescription(originalMapApi);

    delete mapApi['center']; // has to be tested separately

    mapApi['layers'].testData = [
        [{attribution: 'OSM maps', name: 'osm', type: 'tile', url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}],
        [{attribution: 'Wikimedia maps', name: 'wiki', type: 'tile', url: 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png'}]
    ];

    describe('Leaflet Map abstraction', (): void => {

        simpleApiTestFactory('Leaflet Map abstraction', Map, mapApi);

        describe('Target', (): void => {
            var target: Map = new Map({
                center: new LatLng({lat: 10, lng: 20}),
                layers: [
                    /*{
                        type:'geojson',
                        data: {
                            "type": "FeatureCollection",
                            "features": [
                                {
                                    "type": "Feature",
                                    "geometry": {"type": "Point", "coordinates": [102.0, 0.5]},
                                    "properties": {"prop0": "value0"}
                                },
                                {
                                    "type": "Feature",
                                    "geometry": {
                                        "type": "LineString",
                                        "coordinates": [
                                            [102.0, 0.0], [103.0, 1.0], [104.0, 0.0], [105.0, 1.0]
                                        ]
                                    },
                                    "properties": {
                                        "prop0": "value0",
                                        "prop1": 0.0
                                    }
                                },
                                {
                                    "type": "Feature",
                                    "geometry": {
                                        "type": "Polygon",
                                        "coordinates": [
                                            [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0],
                                                [100.0, 1.0], [100.0, 0.0] ]
                                        ]
                                    },
                                    "properties": {
                                        "prop0": "value0",
                                        "prop1": {"this": "that"}
                                    }
                                }
                            ]
                        },
                        name: 'Geojson Layer',
                        attribution: 'test data from geojson.org'
                    }, */
                    {

                        attribution: '(c) OpenStreetMap and contibutors [osm.org]',
                        name: 'OSM Tile Layer',
                        type: 'tile',
                        url: 'http://a.tile.osm.org/{z}/{x}/{y}.png',
                    }
                ],
                zoom: 13
            });
            target.domRoot.style.minHeight = '1px'; // It has to be shown to in document to test this!
            target.domRoot.style.opacity = '0';

            it('should append map to body', (): void => {
                document.body.appendChild(target.domRoot);
            });
            it('should have stored initial data', (): void => {
                if (target.target.getZoom() !== 13) {
                    throw new Error('Stored zoom is not valid');
                }
                if (Math.round(target.target.getCenter().lat) !== 10) {
                    throw new Error('Stored center-lat is not valid');
                }
                if (Math.round(target.target.getCenter().lng) !== 20) {
                    throw new Error('Stored center-lng is not valid');
                }
                if (!target.getDomRoot()) {
                    throw new Error('No auto created dom root');
                }
                if (target.getDomRoot() !== target.target['_container']) {
                    throw new Error('Inconsistent dom root');
                }
            });

            describe('Endpoint zoom', (): void => {
                it('should set other zoom by abstraction', (done: MochaDone): void => {
                    target.setZoom(10);

                    setTimeout((): void => {
                        if (target.target.getZoom() !== 10) {
                            return done(new Error('Stored value is not valid'));
                        }
                        return done();
                    }, 500);
                });
                it('should set other zoom in leaflet element', (done: MochaDone): void => {
                    target.target.setZoom(12);

                    setTimeout((): void => {
                        if (target.zoom !== 12) {
                            return done(new Error('Stored value is not valid'));
                        }
                        return done();
                    }, 500);
                });
            });

            describe('Endpoint center', (): void => {
                it('should set other center by abstraction', (): void => {
                    target.setCenter({lat: 54, lng: 32});

                    var abstractionCenter = target.getCenter(),
                        leafletCenter = target.target.getCenter();

                    if (abstractionCenter.lat !== Math.round(leafletCenter.lat) || abstractionCenter.lat !== 54) {
                        throw new Error('Stored value is not valid');
                    }
                });
                it('should not change LatLng abstraction', (): void => {
                    var latlng = target.getCenter();

                    target.setCenter({lat: 54, lng: 32});

                    if (target.getCenter() !== latlng) {
                        throw new Error('Stored value is not valid');
                    }
                });

                it('should update on map movement', (): void => {
                    target.target.panTo({lat: 11, lng: 11});

                    var center: ILatLng = target.getCenter();

                    if (center.lat !== 11 || center.lng !== 11) {
                        throw new Error('Stored value is not valid');
                    }
                });
            });

            describe('Layer handling', (): void => {
                it('should have initial layers', (): void => {
                    if (target.layers.length !== 1) {
                        throw new Error('Incorrect length of layers');
                    }
                    // if (target.layers[0].type !== 'geojson') {
                    //     throw new Error('First layer is not a geojson layer');
                    // }
                    // if (target.layers[1].type !== 'tile') {
                    if (target.layers[0].type !== 'tile') {
                        throw new Error('Second layer is not a tile layer');
                    }
                });
                it.skip('should add a layer with leaflet abstraction', (): void => {

                });
                it.skip('should add a layer with abstraction');
                it.skip('should add a layer with options');
                it.skip('should set a layer');
                it.skip('should remove a layer with leaflet abstraction');
                it.skip('should add a layer with leaflet abstraction');
                it.skip('should add a layer with leaflet abstraction');
            });

        });
    });

}

