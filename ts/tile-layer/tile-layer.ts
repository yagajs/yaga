/// <reference path="../abstraction/abstraction.ts" />
/// <reference path="../layer/layer.ts" />

module org.yagajs.tileLayer {
    'use strict';

    // import Abstraction = org.yagajs.abstraction.Abstraction;
    import getterHelper = org.yagajs.abstraction.getterHelper;
    import setterHelper = org.yagajs.abstraction.setterHelper;
    // import adderHelper = org.yagajs.abstraction.adderHelper;
    // import removerHelper = org.yagajs.abstraction.removerHelper;

    import ILayerOptions = org.yagajs.layer.ILayerOptions;
    import ILayer = org.yagajs.layer.ILayer;
    import Layer = org.yagajs.layer.Layer;

    import registerLayerType = org.yagajs.layer.registerLayerType;

    export interface ITileLayerOptions extends ILayerOptions {
        url: string;
    }

    export interface ITileLayer extends ILayer {
        setUrl(url: string, origin?: any[]): void;
        getUrl(): string;
    }

    export class TileLayer extends Layer implements ITileLayer {
        public url: string;

        constructor(opts: ITileLayerOptions) {
            opts.type = 'tile';
            super(opts);
        }

        public setUrl(url: string, origin: any[] = []): void {
            setterHelper(this, 'url', url, origin);
        }
        public getUrl(): string {
            return getterHelper(this, 'url');
        }
    }

    registerLayerType('tile', TileLayer);
}
