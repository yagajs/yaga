/// <reference path="../abstraction/abstraction.ts" />
/// <reference path="../latlng/latlng.ts" />

module org.yagajs.map {
    'use strict';

    import Abstraction = org.yagajs.abstraction.Abstraction;
    import getterHelper = org.yagajs.abstraction.getterHelper;
    import setterHelper = org.yagajs.abstraction.setterHelper;
    // import adderHelper = org.yagajs.abstraction.adderHelper;
    // import removerHelper = org.yagajs.abstraction.removerHelper;

    import LatLngAbstraction = org.yagajs.latlng.LatLng;
    import ILatLngOptions = org.yagajs.latlng.ILatLngOptions;

    export interface IMapOptions {
        center: ILatLngOptions;
        zoom: number;
        domRoot?: HTMLElement;
    }
    export interface IMap extends IMapOptions {
        center: LatLngAbstraction;
        domRoot: HTMLElement;

        setCenter(centerLatLng: ILatLngOptions, origin?: any[]): void;
        getCenter(): LatLngAbstraction;

        setZoom(level: number, origin?: any[]): void;
        getZoom(): number;

        getDomRoot(): HTMLElement;

    }

    export class Map extends Abstraction implements IMap {
        public center: LatLngAbstraction;
        public zoom: number;
        public domRoot: HTMLElement;

        public setCenter(value: ILatLngOptions, origin: any[] = []): void {
            if (!LatLngAbstraction.prototype.isPrototypeOf(value)) { // make an abstraction if it is none
                value = new LatLngAbstraction(value);
            }
            setterHelper(this, 'center', value, origin);
        }
        public getCenter(): LatLngAbstraction {
            return getterHelper(this, 'center');
        }

        public setZoom(value: number, origin: any[] = []): void {
            setterHelper(this, 'zoom', value, origin);
        }
        public getZoom(): number {
            return getterHelper(this, 'zoom');
        }

        public getDomRoot(): HTMLElement {
            return getterHelper(this, 'domRoot');
        }
    }

}
