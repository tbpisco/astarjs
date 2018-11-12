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
                    this.row = this.map.length;
                    this.col = this.map[0].length;
                }
                get() {
                    return this.map;
                }
                getCol() {
                    return this.col;
                }
                getRow() {
                    return this.row;
                }
            };
            exports_1("Map", Map);
        }
    };
});
