System.register(["pixi.js", "./Tile", "../states/Start", "../states/End", "../states/Build", "../states/Initial"], function (exports_1, context_1) {
    "use strict";
    var PIXI, Tile_1, Start_1, End_1, Build_1, Initial_1, MapView;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (PIXI_1) {
                PIXI = PIXI_1;
            },
            function (Tile_1_1) {
                Tile_1 = Tile_1_1;
            },
            function (Start_1_1) {
                Start_1 = Start_1_1;
            },
            function (End_1_1) {
                End_1 = End_1_1;
            },
            function (Build_1_1) {
                Build_1 = Build_1_1;
            },
            function (Initial_1_1) {
                Initial_1 = Initial_1_1;
            }
        ],
        execute: function () {
            MapView = class MapView {
                constructor(size) {
                    this.tiles = new Map();
                    this.container = new PIXI.Container();
                    this.saveTimeout = [];
                    this.size = size;
                }
                setState(gameStateManager) {
                    this.gameStateManager = gameStateManager;
                }
                createStage(map, resources) {
                    this.map = map;
                    this.map.get().forEach((elementRow, indexRow) => {
                        elementRow.forEach((elementCol, indexCol) => {
                            let button = new Tile_1.Tile(elementCol, indexCol, indexRow, this.size, resources);
                            button.interactive = true;
                            button.buttonMode = true;
                            button.on("mousedown", this.onClick.bind(this, button), this);
                            let trapFunction = this.update.bind(this);
                            let tile = new Proxy(button, {
                                set(target, key, value) {
                                    if (key === "_textureID") {
                                        trapFunction(target);
                                    }
                                    return Reflect.set(target, key, value);
                                }
                            });
                            this.tiles.set(`${indexCol}-${indexRow}`, button);
                            tile.x = indexCol * this.size;
                            tile.y = indexRow * this.size;
                            this.container.addChild(tile);
                        });
                    });
                    this.createBorder(resources, this.map.getCol(), this.map.getRow());
                    return this.container;
                }
                createBorder(resources, col, row) {
                    this.createElementBorder(Tile_1.TILE.BORDER_TOP_LEFT, -1, -1, resources);
                    for (let index = 0; index < row; index++) {
                        this.createElementBorder(Tile_1.TILE.BORDER_MIDDLE_LEFT, -1, index, resources);
                    }
                    this.createElementBorder(Tile_1.TILE.BORDER_BOTTOM_LEFT, -1, row, resources);
                    for (let index = 0; index < row; index++) {
                        this.createElementBorder(Tile_1.TILE.BORDER_MIDDLE_RIGHT, col, index, resources);
                    }
                    this.createElementBorder(Tile_1.TILE.BORDER_TOP_RIGHT, col, -1, resources);
                    for (let index = 0; index < col; index++) {
                        this.createElementBorder(Tile_1.TILE.BORDER_TOP_MIDDLE, index, -1, resources);
                    }
                    this.createElementBorder(Tile_1.TILE.BORDER_BOTTOM_RIGHT, col, row, resources);
                    for (let index = 0; index < col; index++) {
                        this.createElementBorder(Tile_1.TILE.BORDER_BOTTOM_MIDDLE, index, row, resources);
                    }
                }
                createElementBorder(type, x, y, resources) {
                    let border = new Tile_1.Tile(type, 0, 0, this.size, resources);
                    border.x = x * this.size;
                    border.y = y * this.size;
                    this.container.addChild(border);
                }
                setMap(map) {
                    this.map = map;
                }
                update(tile) {
                    this.map.get()[tile.getRow()][tile.getCol()] = tile.type;
                }
                onClick(button) {
                    if (this.gameStateManager.currentState instanceof Initial_1.Initial) {
                        this.gameStateManager.update();
                        button.changeTileType();
                        this.update(button);
                    }
                    else if (this.gameStateManager.currentState instanceof Build_1.Build) {
                        button.changeTileType();
                        this.update(button);
                    }
                    else if (this.gameStateManager.currentState instanceof Start_1.Start) {
                        button.changeTileType(Tile_1.TILE.START);
                        this.update(button);
                        this.gameStateManager.update();
                    }
                    else if (this.gameStateManager.currentState instanceof End_1.End) {
                        button.changeTileType(Tile_1.TILE.END);
                        this.update(button);
                        this.gameStateManager.update();
                    }
                }
                disableTiles() {
                }
                clearTimeoutList() {
                    this.saveTimeout.map((t) => { clearTimeout(t); });
                    this.saveTimeout = [];
                }
                highlightRectangule(index, row, col, parentRow, parentCol) {
                    let tile = this.tiles.get(`${col}-${row}`);
                    let direction = Tile_1.TILE.RIGHT;
                    if (col > parentCol && row === parentRow) {
                        direction = Tile_1.TILE.LEFT;
                    }
                    else if (col < parentCol && row === parentRow) {
                        direction = Tile_1.TILE.RIGHT;
                    }
                    else if (col == parentCol && row < parentRow) {
                        direction = Tile_1.TILE.BOTTOM;
                    }
                    else if (col == parentCol && row > parentRow) {
                        direction = Tile_1.TILE.TOP;
                    }
                    else if (col < parentCol && row > parentRow) {
                        direction = Tile_1.TILE.TOP_RIGHT;
                    }
                    else if (col < parentCol && row < parentRow) {
                        direction = Tile_1.TILE.BOTTOM_RIGHT;
                    }
                    else if (col > parentCol && row < parentRow) {
                        direction = Tile_1.TILE.BOTTOM_LEFT;
                    }
                    else if (col > parentCol && row > parentRow) {
                        direction = Tile_1.TILE.TOP_LEFT;
                    }
                    if (index === 0)
                        this.clearTimeoutList();
                    this.saveTimeout.push(setTimeout(() => { tile.highlight(direction); }, 200 * index));
                }
            };
            exports_1("MapView", MapView);
        }
    };
});
