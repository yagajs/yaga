/// <reference path="../abstraction/abstraction.ts" />
/// <reference path="../map/map.ts" />

module org.yagajs.layer {
    'use strict';

    import Abstraction = org.yagajs.abstraction.Abstraction;
    import getterHelper = org.yagajs.abstraction.getterHelper;
    import setterHelper = org.yagajs.abstraction.setterHelper;
    // import adderHelper = org.yagajs.abstraction.adderHelper;
    // import removerHelper = org.yagajs.abstraction.removerHelper;

    import Map = org.yagajs.map.Map;

    export interface ILayerOptions {
        type: string;
        name: string;
        attribution: string;

        opacity?: number;
        minZoom?: number;
        maxZoom?: number;
        // maxNativeZoom?: number;
    }

    export interface ILayer extends ILayerOptions {
        opacity: number;
        minZoom: number;
        maxZoom: number;
        // maxNativeZoom: number;

        setName(value: string, origin?: any[]): void;
        setAttribution(value: string, origin?: any[]): void;
        setOpacity(value: number, origin?: any[]): void;
        setMaxZoom(value: number, origin?: any[]): void;
        setMinZoom(value: number, origin?: any[]): void;
        // setMaxNativeZoom(value: string, origin?: any[]): void;

        getName(): string;
        getAttribution(): string;
        getOpacity(): number;
        getMaxZoom(): number;
        getMinZoom(): number;
        // getMaxNativeZoom(): number;

        getType(): string;

    }

    export class Layer extends Abstraction implements ILayer {
        public type: string;
        public name: string;
        public attribution: string;
        public opacity: number;
        public maxZoom: number;
        public minZoom: number;
        // public maxNativeZoom: number

        public map: Map;

        public setName(value: string, origin: any[] = []): void {
            setterHelper(this, 'name', value, origin);
        }
        public setAttribution(value: string, origin: any[] = []): void {
            setterHelper(this, 'attribution', value, origin);
        }
        public setOpacity(value: number, origin: any[] = []): void {
            setterHelper(this, 'opacity', value, origin);
        }
        public setMaxZoom(value: number, origin: any[] = []): void {
            setterHelper(this, 'maxZoom', value, origin);
        }
        public setMinZoom(value: number, origin: any[] = []): void {
            setterHelper(this, 'minZoom', value, origin);
        }

        public getName(): string {
            return getterHelper(this, 'name');
        }
        public getAttribution(): string {
            return getterHelper(this, 'attribution');
        }
        public getOpacity(): number {
            return getterHelper(this, 'opacity');
        }
        public getMaxZoom(): number {
            return getterHelper(this, 'maxZoom');
        }
        public getMinZoom(): number {
            return getterHelper(this, 'minZoom');
        }
        public getType(): string {
            return getterHelper(this, 'type');
        }
    }

    // Layer registry

    interface ILayerStatic {
        new (opts: ILayerOptions): Layer;
    }

    export interface ILayerDictionary {
        [name: string]: ILayerStatic;
    }

    var layerDict: ILayerDictionary = {};

    export function createLayer(opts: ILayerOptions): Layer {
        var tmp: any; // type helper

        if (!layerDict[opts.type]) {
            console.log(opts, layerDict);
            throw new Error('There is no registered layer for type "' + opts.type + '"');
        }
        if (layerDict[opts.type].prototype.isPrototypeOf(opts)) {
            tmp = opts;
            return tmp;
        }
        return new layerDict[opts.type](opts);
    }
    export function registerLayerType(type: string, driver: ILayerStatic): void {
        layerDict[type] = driver;
    }
    export function hasLayerType(type: string): boolean {
        return !!layerDict[type];
    }
    export function getLayerType(type: string): ILayerStatic {
        return layerDict[type];
    }
}
