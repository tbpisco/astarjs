"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PIXI = require("pixi.js");
var Tile_1 = require("./Tile");
var Start_1 = require("../states/Start");
var End_1 = require("../states/End");
var Build_1 = require("../states/Build");
var Initial_1 = require("../states/Initial");
var MapView = (function () {
    function MapView(size) {
        this.tiles = new Map();
        this.container = new PIXI.Container();
        this.saveTimeout = [];
        this.size = size;
    }
    MapView.prototype.setState = function (gameStateManager) {
        this.gameStateManager = gameStateManager;
    };
    MapView.prototype.createStage = function (map, resources) {
        var _this = this;
        this.map = map;
        this.map.get().forEach(function (elementRow, indexRow) {
            elementRow.forEach(function (elementCol, indexCol) {
                var button = new Tile_1.Tile(elementCol, indexCol, indexRow, _this.size, resources);
                button.interactive = true;
                button.buttonMode = true;
                button.on("mousedown", _this.onClick.bind(_this, button), _this);
                var trapFunction = _this.update.bind(_this);
                var tile = new Proxy(button, {
                    set: function (target, key, value) {
                        if (key === "_textureID") {
                            trapFunction(target);
                        }
                        return Reflect.set(target, key, value);
                    }
                });
                _this.tiles.set(indexCol + "-" + indexRow, button);
                tile.x = indexCol * _this.size;
                tile.y = indexRow * _this.size;
                _this.container.addChild(tile);
            });
        });
        this.createBorder(resources, this.map.getCol(), this.map.getRow());
        return this.container;
    };
    MapView.prototype.createBorder = function (resources, col, row) {
        this.createElementBorder(Tile_1.TILE.BORDER_TOP_LEFT, -1, -1, resources);
        for (var index = 0; index < row; index++) {
            this.createElementBorder(Tile_1.TILE.BORDER_MIDDLE_LEFT, -1, index, resources);
        }
        this.createElementBorder(Tile_1.TILE.BORDER_BOTTOM_LEFT, -1, row, resources);
        for (var index = 0; index < row; index++) {
            this.createElementBorder(Tile_1.TILE.BORDER_MIDDLE_RIGHT, col, index, resources);
        }
        this.createElementBorder(Tile_1.TILE.BORDER_TOP_RIGHT, col, -1, resources);
        for (var index = 0; index < col; index++) {
            this.createElementBorder(Tile_1.TILE.BORDER_TOP_MIDDLE, index, -1, resources);
        }
        this.createElementBorder(Tile_1.TILE.BORDER_BOTTOM_RIGHT, col, row, resources);
        for (var index = 0; index < col; index++) {
            this.createElementBorder(Tile_1.TILE.BORDER_BOTTOM_MIDDLE, index, row, resources);
        }
    };
    MapView.prototype.createElementBorder = function (type, x, y, resources) {
        var border = new Tile_1.Tile(type, 0, 0, this.size, resources);
        border.x = x * this.size;
        border.y = y * this.size;
        this.container.addChild(border);
    };
    MapView.prototype.setMap = function (map) {
        this.map = map;
    };
    MapView.prototype.update = function (tile) {
        this.map.get()[tile.getRow()][tile.getCol()] = tile.type;
    };
    MapView.prototype.onClick = function (button) {
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
    };
    MapView.prototype.disableTiles = function () {
    };
    MapView.prototype.clearTimeoutList = function () {
        this.saveTimeout.map(function (t) { clearTimeout(t); });
        this.saveTimeout = [];
    };
    MapView.prototype.highlightRectangule = function (index, row, col, parentRow, parentCol) {
        var tile = this.tiles.get(col + "-" + row);
        var direction = Tile_1.TILE.RIGHT;
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
        this.saveTimeout.push(setTimeout(function () { tile.highlight(direction); }, 200 * index));
    };
    return MapView;
}());
exports.MapView = MapView;
//# sourceMappingURL=MapView.js.map