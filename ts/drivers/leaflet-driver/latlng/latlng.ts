/// <reference path="../../../latlng/latlng.ts" />
/// <reference path="../../../abstraction/abstraction.ts" />
/// <reference path="../declarations/leaflet.d.ts" />

module org.yagajs.drivers.leafletDriver.latlng {
    'use strict';

    import LatLngAbstraction = org.yagajs.latlng.LatLng;
    import IDriver = org.yagajs.abstraction.IDriver;
    import LeafletLatLng = L.LatLng;
    import leafletLatLngFactory = L.latLng;

    import ILatLngOptions = org.yagajs.latlng.ILatLngOptions;

    export class LatLng extends LatLngAbstraction implements IDriver {
        public target: LeafletLatLng;

        constructor(opts: ILatLngOptions) {
            this.target = leafletLatLngFactory({lat: opts.lat, lng: opts.lng});
            super(opts);
        }

        public setLat(value: number, origin: any[] = []): void {
            this.target.lat = value;
            super.setLat(value, origin);
        }
        public setLng(value: number, origin: any[] = []): void {
            this.target.lng = value;
            super.setLng(value, origin);
        }

    }

}
