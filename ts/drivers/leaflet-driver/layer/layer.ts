
module org.yagajs.drivers.leafletDriver.layer {
    'use strict';
    // import ILayerDictionary = org.yagajs.layer.ILayerDictionary;
    import ILayerOptions = org.yagajs.layer.ILayerOptions;
    import LayerAbstraction = org.yagajs.layer.Layer;
    import IDriver = org.yagajs.abstraction.IDriver;

    export interface ILeafletLayer extends LayerAbstraction, IDriver {}

    export interface ILeafletLayerStatic {
        new (opts: ILayerOptions): ILeafletLayer;
    }

    export interface ILeafletLayerDictionary {
        [name: string]: ILeafletLayerStatic;
    }

    var layerDict: ILeafletLayerDictionary = {};

    export function createLayer(opts: ILayerOptions): ILeafletLayer {
        var tmp: any; // type helper

        if (!layerDict[opts.type]) {
            throw new Error('There is no registered layer for type "' + opts.type + '"');
        }
        if (layerDict[opts.type].prototype.isPrototypeOf(opts)) {
            tmp = opts;
            return tmp;
        }
        return new layerDict[opts.type](opts);
    }
    export function registerLayerType(type: string, driver: ILeafletLayerStatic): void {
        layerDict[type] = driver;
    }
    export function hasLayerType(type: string): boolean {
        return !!layerDict[type];
    }
    export function getLayerType(type: string): ILeafletLayerStatic {
        return layerDict[type];
    }
}
