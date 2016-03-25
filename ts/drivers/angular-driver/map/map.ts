/// <reference path="../declarations/angular.d.ts" />

/// <reference path="../../../map/map.ts" />
/// <reference path="../../../latlng/latlng.ts" />


module org.yagajs.drivers.angularDriver.map {
    'use strict';

    import MapAbstraction = org.yagajs.map.Map;
    // import IMapOptions = org.yagajs.map.IMapOptions;

    import LatLng = org.yagajs.latlng.LatLng;

    import IScope = angular.IScope;
    import IDirectivePrePost = angular.IDirectivePrePost;
    import IAugmentedJQuery = angular.IAugmentedJQuery;
    import IAttributes = angular.IAttributes;
    import ITimeoutService = angular.ITimeoutService;

    export class MapDirectiveController {
        public static $inject: string[] = ['$scope', '$timeout', '$yagaDriver'];

        public scope: IMapDirectiveScope;
        public map: MapAbstraction;
        public timeoutServiceHelper: ITimeoutService;
        public yagaDriverService: any;

        constructor($scope: IMapDirectiveScope, $timeout: ITimeoutService, $yagaDriver: any) {
            this.scope = $scope;
            this.timeoutServiceHelper = $timeout;
            this.yagaDriverService = $yagaDriver;
        }
    }

    interface ICenter {
        lat: number;
        lng: number;
    }

    export interface IMapDirectiveScope extends IScope {
        center: ICenter;
        zoom: number;
        yagaMap: MapAbstraction;
    }

    interface IMapControllerStatic {
        new  (): MapDirectiveController;
    }

    export class MapDirective {
        public controller: Function; // class of MapController
        public restrict: string = 'E';
        public require: string = 'yagaMap';
        public replace: boolean = true;
        public scope: Object = {
            center: '=?',
            yagaMap: '=?',
            zoom: '=?'
        };
        public template: string = `<div data-yaga-map><span style="display: none" ng-transclude></span></div>`;
        public transclude: boolean = true;

        public static factory(): MapDirective {
            return new MapDirective();
        }

        constructor() {
            this.controller = MapDirectiveController;
        }

        public compile(): IDirectivePrePost {
            return {
                pre: (scope: IMapDirectiveScope,
                      element: IAugmentedJQuery,
                      attributes: IAttributes,
                      mapController: MapDirectiveController): void => {
                    var map: MapAbstraction,
                        center: ICenter;

                    if (scope.hasOwnProperty('center')) {
                        center = scope.center;
                    } else {
                        center = {
                            lat: 0,
                            lng: 0
                        };
                        scope.center = center;
                    }

                    if (scope.hasOwnProperty('yagaMap') && scope.yagaMap) {
                        map = scope.yagaMap;
                    } else {
                        map = new mapController.yagaDriverService.map.Map({
                            center: scope.center,
                            domRoot: element[0],
                            layers: [],
                            zoom: scope.zoom
                        });
                    }

                    /* tslint:disable:align */
                    map.on('watch:center', (value: LatLng, origin: any[]): void => {
                        if (origin.indexOf(scope) === -1) {
                            mapController.timeoutServiceHelper((): void => {
                                scope.$apply((): void => {
                                    scope.center.lat = value.lat;
                                    scope.center.lng = value.lng;
                                });
                            }, 0);
                        }

                    });
                    map.on('watch:zoom', (value: number, origin: any[]): void => {
                        if (origin.indexOf(scope) === -1) {
                            mapController.timeoutServiceHelper((): void => {
                                scope.$apply((): void => {
                                    scope.zoom = value;
                                });
                            }, 0);
                        }
                    });
                    /* tslint:enable:align */

                    scope.$watchCollection('center', (): void => {
                        map.setCenter(scope.center, [scope]);
                    });
                    scope.$watch('zoom', (): void => {
                        map.setZoom(scope.zoom, [scope]);
                    });

                    mapController.map = map;
                    scope.yagaMap = map;
                }
            };
        }
    }

    angular.module('org.yagajs.map', [])
        .directive('yagaMap', MapDirective.factory);

}
