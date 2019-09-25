"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tile_1 = require("../views/Tile");
var MapModel = (function () {
    function MapModel(col, row, isRandom) {
        this.map = (isRandom) ? this.createRandomMap(col, row) : this.createEmptyMap(col, row);
        this.row = row;
        this.col = col;
    }
    MapModel.prototype.get = function () {
        return this.map;
    };
    MapModel.prototype.getCol = function () {
        return this.col;
    };
    MapModel.prototype.getRow = function () {
        return this.row;
    };
    MapModel.prototype.createEmptyMap = function (col, row) {
        var array = [];
        for (var index = 0; index < row; index++) {
            array.push(new Array(col + 1).join("0").split("").map(function (element) { return 0; }));
        }
        return array;
    };
    MapModel.prototype.createRandomMap = function (col, row) {
        var array = [];
        for (var index = 0; index < row; index++) {
            array.push(new Array(col + 1).join("0").split("").map(function (element) {
                var num = Math.floor(Math.random() * 20);
                if (num < 15) {
                    return Tile_1.TILE.GREEN;
                }
                else if (num == 16) {
                    return Tile_1.TILE.HOUSE;
                }
                else if (num == 17) {
                    return Tile_1.TILE.MOUNTAIN_BROWN;
                }
                else if (num == 18) {
                    return Tile_1.TILE.MOUNTAIN;
                }
                else if (num == 19) {
                    return Tile_1.TILE.WATER;
                }
                else {
                    return Tile_1.TILE.TREES;
                }
            }));
        }
        var r = Math.floor(Math.random() * row);
        var c = Math.floor(Math.random() * col);
        array[r][c] = Tile_1.TILE.START;
        var r0 = Math.floor(Math.random() * row);
        var c0 = Math.floor(Math.random() * col);
        while (r0 == r && c0 == c) {
            r0 = Math.floor(Math.random() * row);
            c0 = Math.floor(Math.random() * col);
        }
        array[r0][c0] = Tile_1.TILE.END;
        return array;
    };
    return MapModel;
}());
exports.MapModel = MapModel;
//# sourceMappingURL=MapModel.js.map