/// <reference path="../map/map.ts" />
/// <reference path="tile-layer.ts" />


/// <reference path="../declarations/angular.d.ts" />


module org.yagajs.drivers.angularDriver.tileLayer {
    'use strict';

    import TileAbstraction = org.yagajs.tileLayer.TileLayer;

    import MapDirectiveController = org.yagajs.drivers.angularDriver.map.MapDirectiveController;

    import IScope = angular.IScope;
    import IDirectivePrePost = angular.IDirectivePrePost;
    import IAugmentedJQuery = angular.IAugmentedJQuery;
    import IAttributes = angular.IAttributes;

    export class TileLayerDirectiveController {
        public static $inject: string[] = ['$scope'];

        public scope: ITileLayerDirectiveScope;
    }

    export interface ITileLayerDirectiveScope extends IScope {
        url: string;
        attribution: string;
        name: string;
        opacity: number;
        yagaTileLayer: TileAbstraction;
    }

    export class TileLayerDirective {
        public restrict: string = 'E';
        public require: string = '^^yagaMap';
        public replace: boolean = false;
        public scope: Object = {
            attribution: '=?',
            name: '=?',
            opacity: '=?',
            url: '=?'
        };
        // public template: string = `<div data-yaga-map><span style="display: none" ng-transclude></span></div>`;
        // public transclude: boolean = true;

        public static factory(): TileLayerDirective {
            return new TileLayerDirective();
        }

        constructor() {
            // this.controller = TileLayerDirectiveController;
        }

        public compile(): IDirectivePrePost {
            return {
                pre: (scope: ITileLayerDirectiveScope,
                      element: IAugmentedJQuery,
                      attributes: IAttributes,
                      mapController: MapDirectiveController): void => {
                    var tileLayer: TileAbstraction = new mapController.yagaDriverService.tileLayer.TileLayer({
                        attribution: scope.attribution,
                        name: scope.name,
                        opacity: scope.opacity,
                        type: 'tile',
                        url: scope.url
                    });

                    /* tslint:disable:align */
                    tileLayer.on('watch:url', (value: string, origin: any[]): void => {
                        if (origin.indexOf(scope) === -1) {
                            mapController.timeoutServiceHelper((): void => {
                                scope.$apply((): void => {
                                    scope.url = value;
                                });
                            }, 0);
                        }
                    });
                    tileLayer.on('watch:attribution', (value: string, origin: any[]): void => {
                        if (origin.indexOf(scope) === -1) {
                            mapController.timeoutServiceHelper((): void => {
                                scope.$apply((): void => {
                                    scope.attribution = value;
                                });
                            }, 0);
                        }
                    });
                    tileLayer.on('watch:opacity', (value: number, origin: any[]): void => {
                        if (origin.indexOf(scope) === -1) {
                            mapController.timeoutServiceHelper((): void => {
                                scope.$apply((): void => {
                                    scope.opacity = value;
                                });
                            }, 0);
                        }
                    });
                    /* tslint:enable:align */

                    scope.$watch('url', (): void => {
                        tileLayer.setUrl(scope.url, [scope]);
                    });

                    scope.$watch('attribution', (): void => {
                        tileLayer.setAttribution(scope.attribution, [scope]);
                    });
                    scope.$watch('opacity', (): void => {
                        tileLayer.setOpacity(scope.opacity, [scope]);
                    });

                    scope.$on('$destroy', (): void => {
                        tileLayer.map.removeLayer(tileLayer);
                    });

                    scope.yagaTileLayer = tileLayer;

                    mapController.map.addLayer(tileLayer);

                }
            };
        }
    }

    angular.module('org.yagajs.tile-layer', ['org.yagajs.map'])
        .directive('yagaTileLayer', TileLayerDirective.factory);

}
