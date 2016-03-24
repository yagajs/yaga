
module org.yagajs.map {
    'use strict';

    export interface IMapOptions {
        center: any; // ILatLngOptions;
        zoom: number;
        domRoot?: HTMLElement;
        layers?: any; // ILayerOptions[];
    }
    export interface IMap extends IMapOptions {
        center: any; // LatLngAbstraction;
        domRoot: HTMLElement;
        layers: any[]; // LayerAbstraction[];

        setCenter(centerLatLng: any, origin?: any[]): void; // ILatLngOptions
        getCenter(): any; // LatLngAbstraction

        setZoom(level: number, origin?: any[]): void;
        getZoom(): number;

        getDomRoot(): HTMLElement;

        addLayer(layer: any, origin?: any[]): void; // ILayerOptions
        setLayers(layers: any[], origin?: any[]): void; // ILayerOptions[]
        removeLayer(layer: any, origin?: any[]): void; // ILayerOptions
        getLayers(): any[]; // LayerAbstraction

    }
}
