/// <reference path="../../../tile-layer/tile-layer.ts" />
/// <reference path="../../../abstraction/abstraction.ts" />
/// <reference path="../declarations/leaflet.d.ts" />
/// <reference path="../latlng/latlng.ts" />
/// <reference path="../layer/layer.ts" />

module org.yagajs.drivers.leafletDriver.tileLayer {
    'use strict';

    import TileLayerAbstraction = org.yagajs.tileLayer.TileLayer;
    import IYagaLeafletLayer = org.yagajs.drivers.leafletDriver.layer.ILeafletLayer;
    import LeafletTileLayer = L.TileLayer;
    import leafletTileLayerFactory = L.tileLayer;
    import ITileLayerOptions = org.yagajs.tileLayer.ITileLayerOptions;
    import registerLayerType = org.yagajs.drivers.leafletDriver.layer.registerLayerType;

    import LeafletMapAbstraction = org.yagajs.drivers.leafletDriver.map.Map;

    export class TileLayer extends TileLayerAbstraction implements IYagaLeafletLayer {
        public target: LeafletTileLayer;
        public map: LeafletMapAbstraction;

        constructor(opts: ITileLayerOptions) {
            this.target = leafletTileLayerFactory(this.getUrl(), {
                attribution: opts.attribution
            });
            super(opts);
        }

        // attribution has to watch on change event!

        public setOpacity(value: number, origin: any[] = []): void {
            super.setOpacity(value, origin);
            this.target.setOpacity(value);
        }
        public setUrl(value: string, origin: any[] = []): void {
            super.setUrl(value, origin);
            this.target.setUrl(value);
        }
        public setAttribution(value: string, origin: any[] = []): void {
            var oldAttribution: string = this.getAttribution(),
                num: number;
            super.setAttribution(value, origin);

            if (!this.map) {
                console.warn('There is no map!');
                return;
            }

            /* tslint:disable:no-string-literal */
            num = this.map.target.attributionControl['_attributions'][oldAttribution];
            delete this.map.target.attributionControl['_attributions'][oldAttribution];
            this.map.target.attributionControl['_attributions'][value] = num;
            this.map.target.attributionControl['_update']();
            /* tslint:enable:no-string-literal */
        }
    }
    registerLayerType('tile', TileLayer);
}
