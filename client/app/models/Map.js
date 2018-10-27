System.register([], function (exports_1, context_1) {
    "use strict";
    var Map;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Map = class Map {
                constructor(values) {
                    this.map = values;
                }
                get() {
                    return this.map;
                }
            };
            exports_1("Map", Map);
        }
    };
});
