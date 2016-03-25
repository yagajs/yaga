/// <reference path="../../../map/map.ts" />
/// <reference path="../../../abstraction/abstraction.ts" />
/// <reference path="../declarations/leaflet.d.ts" />
/// <reference path="../layer/layer.ts" />
/// <reference path="../latlng/latlng.ts" />

module org.yagajs.drivers.leafletDriver.map {
    'use strict';

    import MapAbstraction = org.yagajs.map.Map;
    import IMapOptions = org.yagajs.map.IMapOptions;
    import IDriver = org.yagajs.abstraction.IDriver;
    import LeafletMap = L.Map;
    import leafletMapFactory = L.map;

    import LeafletLatLng = L.LatLng;
    import LatLng = org.yagajs.drivers.leafletDriver.latlng.LatLng;
    import ILatLngOptions = org.yagajs.latlng.ILatLngOptions;

    import ILayerOptions = org.yagajs.layer.ILayerOptions;
    import IYagaLeafletLayer = org.yagajs.drivers.leafletDriver.layer.ILeafletLayer;
    import createLayer = org.yagajs.drivers.leafletDriver.layer.createLayer;
    import ILayer = L.ILayer;


    export class Map extends MapAbstraction implements IDriver {
        public target: LeafletMap;
        public center: LatLng;
        public layers: IYagaLeafletLayer[];

        private settingCenterOrigin: any[];

        constructor(opts: IMapOptions) {
            // we need a target before the super call
            opts.domRoot = opts.domRoot || document.createElement('div');

            this.target = leafletMapFactory(opts.domRoot, {});

            opts.center = opts.center || {lat: 0, lng: 0};
            opts.zoom = opts.zoom || 1;
            this.center = new LatLng({lat: opts.center.lat, lng: opts.center.lng});

            this.layers = [];

            super(opts);

            this.target.setView(this.center.target, this.zoom);

            this.target.on('zoomend', (): void => {
                this.setZoom(this.target.getZoom(), [this.target]);
            });
            this.target.on('move', (): void => {
                var origin: any[],
                    tmpLatLng: LeafletLatLng = this.target.getCenter(),
                    options: ILatLngOptions = {
                        lat: tmpLatLng.lat,
                        lng: tmpLatLng.lng
                    };

                if (this.settingCenterOrigin) {
                    origin = this.settingCenterOrigin;
                    this.settingCenterOrigin = undefined;
                } else {
                    origin = [];
                }
                origin.push(this.target);
                this.setCenter(options, origin);
            });

            this.center.on('watch', (eventName: string, value: number, origin: any[] = []): void => {
                origin.push(this.center);
                this.setCenter(this.center, origin); // mainly to call events
            });

            opts.domRoot.addEventListener('DOMNodeInserted', (): void => {
                this.target.invalidateSize(true);
            });
        }

        public setCenter(value: ILatLngOptions, origin: any[] = []): void {

            if (origin.indexOf(this.center) === -1) {
                this.center.setLat(value.lat, origin);
                while (origin.indexOf(this.center) !== -1) {
                    origin.splice(origin.indexOf(this.center), 1);
                }
                this.center.setLng(value.lng, origin);
            }

            super.setCenter(this.center, origin);

            // change on map if it is not calling from there
            if (origin.indexOf(this.target) === -1) {
                this.settingCenterOrigin = origin;
                this.target.panTo(this.center);
            }
        }
        public getCenter(): LatLng {
            var tmp: any = super.getCenter(); // type change
            return tmp;
        }
        public setZoom(zoom: number, origin: any[] = []): void {
            super.setZoom(zoom, origin);

            // change on map if it is not calling from there
            if (origin.indexOf(this.target) === -1) {
                this.target.setZoom(zoom);
            }
        }

        public addLayer(layer: ILayerOptions, origin: any[] = []): void {
            var drivenLayer: IYagaLeafletLayer = createLayer(layer);
            super.addLayer(drivenLayer, origin);

            drivenLayer.map = this;
            this.target.addLayer(drivenLayer.target);
        }
        public removeLayer(layer: IYagaLeafletLayer, origin: any[] = []): void {
            super.removeLayer(layer, origin);

            this.target.removeLayer(layer.target);
        }
        public setLayers(layers: ILayerOptions[], origin: any[] = []): void {
            this.target.eachLayer((layer: ILayer): void => {
                this.target.removeLayer(layer);
            });
            super.setLayers(layers, origin);
        }
    }

}
