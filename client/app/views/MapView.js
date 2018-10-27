System.register([], function (exports_1, context_1) {
    "use strict";
    var MapView;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            MapView = class MapView {
                constructor(domElementID) {
                    let domElement = document.body.querySelector(domElementID);
                    if (domElement)
                        this.domElement = domElement;
                }
            };
            exports_1("MapView", MapView);
        }
    };
});
