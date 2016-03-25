/// <reference path="../angular-driver/index.ts" />
/// <reference path="../leaflet-driver/index.ts" />

module org.yagajs.drivers.leafletDriver {
    'use strict';

    angular.module('org.yagajs.drivers.leaflet-driver', [])
        .factory('$yagaDriver', () => {
            return org.yagajs.drivers.leafletDriver;
        });
}
