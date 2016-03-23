/// <reference path="../abstraction/abstraction.ts" />

module org.yagajs.latlng {
    'use strict';

    import Abstraction = org.yagajs.abstraction.Abstraction;
    import getterHelper = org.yagajs.abstraction.getterHelper;
    import setterHelper = org.yagajs.abstraction.setterHelper;
    // import adderHelper = org.yagajs.abstraction.adderHelper;
    // import removerHelper = org.yagajs.abstraction.removerHelper;
    import IDriver = org.yagajs.abstraction.IDriver;

    export interface ILatLngOptions {
        lat: number;
        lng: number;
    }
    export interface ILatLng extends ILatLngOptions {
        setLat(value: number, origin?: any[]): void;
        getLat(): number;
        setLng(value: number, origin?: any[]): void;
        getLng(): number;
    }

    export interface ILatLngDriver extends ILatLng, IDriver {}

    export class LatLng extends Abstraction implements ILatLng {
        public lat: number;
        public lng: number;

        public setLat(value: number, origin: any[] = []): void {
            setterHelper(this, 'lat', value, origin);
        }
        public getLat(): number {
            return getterHelper(this, 'lat');
        }
        public setLng(value: number, origin: any[] = []): void {
            setterHelper(this, 'lng', value, origin);
        }
        public getLng(): number {
            return getterHelper(this, 'lng');
        }
    }

}
