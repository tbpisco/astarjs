System.register(["pixi.js", "./Tile"], function (exports_1, context_1) {
    "use strict";
    var PIXI, Tile_1, MapView;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (PIXI_1) {
                PIXI = PIXI_1;
            },
            function (Tile_1_1) {
                Tile_1 = Tile_1_1;
            }
        ],
        execute: function () {
            MapView = class MapView {
                constructor(size) {
                    this.tiles = [];
                    this.container = new PIXI.Container();
                    this.size = size;
                }
                createStage(map) {
                    map.get().forEach((elementRow, indexRow) => {
                        elementRow.forEach((elementCol, indexCol) => {
                            let tile = new Tile_1.Tile(elementCol, indexCol, indexRow, this.size);
                            this.tiles.push(tile);
                            tile.x = indexCol * this.size;
                            tile.y = indexRow * this.size;
                            this.container.addChild(tile);
                        });
                    });
                    return this.container;
                }
                highlightRectangule(row, col) {
                    let button;
                    for (let index = 0; index < this.tiles.length; index++) {
                        const element = this.tiles[index];
                        if (element.getRow() == row
                            && element.getCol() == col) {
                            button = element;
                            button.highlight();
                            this.container.removeChild(button);
                            this.container.addChildAt(button, this.container.children.length - 1);
                            break;
                        }
                    }
                }
            };
            exports_1("MapView", MapView);
        }
    };
});
