/// <reference path="../abstraction/abstraction.ts" />
/// <reference path="../latlng/latlng.ts" />
/// <reference path="../layer/layer.ts" />
/// <reference path="interface.ts" />

module org.yagajs.map {
    'use strict';

    import Abstraction = org.yagajs.abstraction.Abstraction;
    import getterHelper = org.yagajs.abstraction.getterHelper;
    import setterHelper = org.yagajs.abstraction.setterHelper;
    import adderHelper = org.yagajs.abstraction.adderHelper;
    import removerHelper = org.yagajs.abstraction.removerHelper;

    import LatLngAbstraction = org.yagajs.latlng.LatLng;
    import ILatLngOptions = org.yagajs.latlng.ILatLngOptions;

    import LayerAbstraction = org.yagajs.layer.Layer;
    import ILayerOptions = org.yagajs.layer.ILayerOptions;
    import createLayer = org.yagajs.layer.createLayer;

    // get interface from interface.ts because we need the interface also in layer etc.
    // We do not want to have loop dependencies
    import IMap = org.yagajs.map.IMap;

    export class Map extends Abstraction implements IMap {
        public center: LatLngAbstraction;
        public zoom: number;
        public domRoot: HTMLElement;
        public layers: LayerAbstraction[];

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

        public addLayer(value: ILayerOptions, origin: any[] = []): void {
            adderHelper(this, 'layers', createLayer(value, this), origin);
        };
        public removeLayer(value: ILayerOptions, origin: any[] = []): void {
            removerHelper(this, 'layers', value, origin);
        };
        public getLayers(): LayerAbstraction[] {
            return getterHelper(this, 'layers');
        };
        public setLayers(value: ILayerOptions[] = [], origin: any[] = []): void {
            var i: number,
                attribute: string = 'layers';
            this.layers = [];
            for (i = 0; i < value.length; i += 1) {
                this.addLayer(value[i], origin);
                while (origin.indexOf(this) !== -1) {
                    origin.splice(origin.indexOf(this), 1);
                }
            }

            origin.push(this);

            this.emit('set', attribute, this.layers, origin);
            this.emit('watch', attribute, this.layers, origin);
            this.emit('set:' + attribute, this.layers, origin);
            this.emit('watch:' + attribute, this.layers, origin);

        };
    }

}
