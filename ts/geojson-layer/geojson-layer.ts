/// <reference path="../declarations/geojson.d.ts" />
/// <reference path="../abstraction/abstraction.ts" />
/// <reference path="../layer/layer.ts" />

module org.yagajs.geojsonLayer {
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

    import IFeatureCollection = GeoJSON.FeatureCollection;

    export interface IGeojsonLayerOptions extends ILayerOptions {
        data: IFeatureCollection;
    }

    export interface IGeojsonLayer extends ILayer, IGeojsonLayerOptions {
        setData(data: IFeatureCollection, origin?: any[]): void;
        addData(data: IFeatureCollection, origin?: any[]): void;
        getData(): IFeatureCollection;
    }

    export class GeojsonLayer extends Layer implements IGeojsonLayer {
        public data: IFeatureCollection;

        constructor(opts: IGeojsonLayerOptions) {
            opts.type = 'geojson';
            super(opts);
        }

        public setData(data: IFeatureCollection, origin: any[] = []): void {
            setterHelper(this, 'data', data, origin);
        }
        public addData(data: IFeatureCollection, origin: any[] = []): void {
            // If you have this Error maybe you should not call super.addData()!
            throw new Error('Adding data to geojson layer is not implemented within the abstraction!');
        }
        public getData(): IFeatureCollection {
            return getterHelper(this, 'data');
        }
    }

    registerLayerType('geojson', GeojsonLayer);
}
