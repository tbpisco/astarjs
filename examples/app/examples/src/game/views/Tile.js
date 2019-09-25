"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var pixi_js_1 = require("pixi.js");
var TILE;
(function (TILE) {
    TILE[TILE["GREEN"] = 0] = "GREEN";
    TILE[TILE["WATER"] = 1] = "WATER";
    TILE[TILE["TREES"] = 2] = "TREES";
    TILE[TILE["START"] = 3] = "START";
    TILE[TILE["END"] = 4] = "END";
    TILE[TILE["BORDER_TOP_LEFT"] = 5] = "BORDER_TOP_LEFT";
    TILE[TILE["BORDER_MIDDLE_LEFT"] = 6] = "BORDER_MIDDLE_LEFT";
    TILE[TILE["BORDER_BOTTOM_LEFT"] = 7] = "BORDER_BOTTOM_LEFT";
    TILE[TILE["BORDER_TOP_MIDDLE"] = 8] = "BORDER_TOP_MIDDLE";
    TILE[TILE["BORDER_BOTTOM_MIDDLE"] = 9] = "BORDER_BOTTOM_MIDDLE";
    TILE[TILE["BORDER_TOP_RIGHT"] = 10] = "BORDER_TOP_RIGHT";
    TILE[TILE["BORDER_MIDDLE_RIGHT"] = 11] = "BORDER_MIDDLE_RIGHT";
    TILE[TILE["BORDER_BOTTOM_RIGHT"] = 12] = "BORDER_BOTTOM_RIGHT";
    TILE[TILE["MOUNTAIN"] = 13] = "MOUNTAIN";
    TILE[TILE["MOUNTAIN_BROWN"] = 14] = "MOUNTAIN_BROWN";
    TILE[TILE["TOP_RIGHT"] = 15] = "TOP_RIGHT";
    TILE[TILE["TOP_LEFT"] = 16] = "TOP_LEFT";
    TILE[TILE["TOP"] = 17] = "TOP";
    TILE[TILE["BOTTOM"] = 18] = "BOTTOM";
    TILE[TILE["RIGHT"] = 19] = "RIGHT";
    TILE[TILE["LEFT"] = 20] = "LEFT";
    TILE[TILE["BOTTOM_LEFT"] = 21] = "BOTTOM_LEFT";
    TILE[TILE["BOTTOM_RIGHT"] = 22] = "BOTTOM_RIGHT";
    TILE[TILE["HOUSE"] = 23] = "HOUSE";
})(TILE = exports.TILE || (exports.TILE = {}));
var Tile = (function (_super) {
    __extends(Tile, _super);
    function Tile(type, col, row, size, resources) {
        var _this = _super.call(this) || this;
        _this.typePos = 0;
        _this.availableTypes = [TILE.GREEN, TILE.HOUSE, TILE.WATER, TILE.TREES, TILE.MOUNTAIN, TILE.MOUNTAIN_BROWN];
        _this.texSize = 16;
        _this.tex = resources.texture;
        _this.col = col;
        _this.row = row;
        _this.size = _this.texSize;
        _this.type = type;
        _this.setTypePos(_this.type);
        _this.scale.set(size / _this.texSize);
        _this.background = new PIXI.Sprite();
        _this.background.anchor.set(0.5, 0.5);
        _this.background.texture = new PIXI.Texture(_this.tex, _this.getFrameByType(0), new pixi_js_1.Rectangle(0, 0, _this.texSize, _this.texSize), new pixi_js_1.Rectangle(0, 0, _this.size, _this.size));
        _this.addChild(_this.background);
        _this.element = new PIXI.Sprite();
        _this.element.anchor.set(0.5, 0.5);
        _this.element.texture = new PIXI.Texture(_this.tex, _this.getFrameByType(0), new pixi_js_1.Rectangle(0, 0, _this.texSize, _this.texSize), new pixi_js_1.Rectangle(0, 0, _this.size, _this.size));
        _this.addChild(_this.element);
        _this.tex.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        _this.update();
        return _this;
    }
    Tile.prototype.setTypePos = function (type) {
        this.typePos = this.availableTypes.indexOf(type);
    };
    Tile.prototype.getCol = function () {
        return this.col;
    };
    Tile.prototype.getRow = function () {
        return this.row;
    };
    Tile.prototype.disable = function () {
        this.interactive = false;
        this.buttonMode = false;
    };
    Tile.prototype.enable = function () {
        this.interactive = true;
        this.buttonMode = true;
    };
    Tile.prototype.changeTileType = function (type) {
        if (type) {
            this.type = type;
        }
        else {
            this.typePos = (this.typePos + 1) % 6;
            this.type = this.availableTypes[this.typePos];
        }
        this.update();
    };
    Tile.prototype.update = function () {
        var background = [TILE.WATER, TILE.HOUSE, TILE.TREES, TILE.START, TILE.END,
            TILE.MOUNTAIN, TILE.MOUNTAIN_BROWN, TILE.TOP_RIGHT, TILE.TOP_LEFT, TILE.TOP,
            TILE.BOTTOM, TILE.RIGHT, TILE.LEFT, TILE.BOTTOM_LEFT, TILE.BOTTOM_RIGHT];
        if (background.indexOf(this.type) > -1)
            this.background.visible = true;
        else
            this.background.visible = false;
        this.element.texture = new PIXI.Texture(this.tex, this.getFrameByType(this.type), new pixi_js_1.Rectangle(0, 0, this.texSize, this.texSize), new pixi_js_1.Rectangle(0, 0, this.size, this.size));
    };
    Tile.prototype.highlight = function (direction) {
        if (this.type == TILE.START || this.type == TILE.END)
            return;
        this.type = direction;
        this.update();
    };
    Tile.prototype.getFrameByType = function (type) {
        switch (type) {
            case TILE.BOTTOM_LEFT:
                return new pixi_js_1.Rectangle(0 * 16, 41 * 16, this.texSize, this.texSize);
                break;
            case TILE.BOTTOM_RIGHT:
                return new pixi_js_1.Rectangle(1 * 16, 41 * 16, this.texSize, this.texSize);
                break;
            case TILE.LEFT:
                return new pixi_js_1.Rectangle(1 * 16, 40 * 16, this.texSize, this.texSize);
                break;
            case TILE.RIGHT:
                return new pixi_js_1.Rectangle(2 * 16, 40 * 16, this.texSize, this.texSize);
                break;
            case TILE.BOTTOM:
                return new pixi_js_1.Rectangle(3 * 16, 40 * 16, this.texSize, this.texSize);
                break;
            case TILE.TOP:
                return new pixi_js_1.Rectangle(4 * 16, 40 * 16, this.texSize, this.texSize);
                break;
            case TILE.TOP_LEFT:
                return new pixi_js_1.Rectangle(5 * 16, 40 * 16, this.texSize, this.texSize);
                break;
            case TILE.TOP_RIGHT:
                return new pixi_js_1.Rectangle(6 * 16, 40 * 16, this.texSize, this.texSize);
                break;
            case TILE.MOUNTAIN_BROWN:
                return new pixi_js_1.Rectangle(6 * 16, 28 * 16, this.texSize, this.texSize);
                break;
            case TILE.MOUNTAIN:
                return new pixi_js_1.Rectangle(6 * 16, 3 * 16, this.texSize, this.texSize);
                break;
            case TILE.BORDER_BOTTOM_RIGHT:
                return new pixi_js_1.Rectangle(2 * 16, 30 * 16, this.texSize, this.texSize);
                break;
            case TILE.BORDER_MIDDLE_RIGHT:
                return new pixi_js_1.Rectangle(2 * 16, 29 * 16, this.texSize, this.texSize);
                break;
            case TILE.BORDER_TOP_RIGHT:
                return new pixi_js_1.Rectangle(2 * 16, 28 * 16, this.texSize, this.texSize);
                break;
            case TILE.BORDER_BOTTOM_MIDDLE:
                return new pixi_js_1.Rectangle(1 * 16, 30 * 16, this.texSize, this.texSize);
                break;
            case TILE.BORDER_TOP_MIDDLE:
                return new pixi_js_1.Rectangle(1 * 16, 28 * 16, this.texSize, this.texSize);
                break;
            case TILE.BORDER_BOTTOM_LEFT:
                return new pixi_js_1.Rectangle(0 * 16, 30 * 16, this.texSize, this.texSize);
                break;
            case TILE.BORDER_MIDDLE_LEFT:
                return new pixi_js_1.Rectangle(0 * 16, 29 * 16, this.texSize, this.texSize);
                break;
            case TILE.BORDER_TOP_LEFT:
                return new pixi_js_1.Rectangle(0 * 16, 28 * 16, this.texSize, this.texSize);
                break;
            case TILE.END:
                return new pixi_js_1.Rectangle(2 * 16, 6 * 16, this.texSize, this.texSize);
                break;
            case TILE.START:
                return new pixi_js_1.Rectangle(3 * 16, 6 * 16, this.texSize, this.texSize);
                break;
            case TILE.GREEN:
                return new pixi_js_1.Rectangle(16, 0, this.texSize, this.texSize);
                break;
            case TILE.WATER:
                return new pixi_js_1.Rectangle(4 * 16, 2 * 16, this.texSize, this.texSize);
                break;
            case TILE.HOUSE:
                return new pixi_js_1.Rectangle(2 * 16, 1 * 16, this.texSize, this.texSize);
                break;
            case TILE.TREES:
                return new pixi_js_1.Rectangle(5 * 16, 0, this.texSize, this.texSize);
                break;
            default:
                return new pixi_js_1.Rectangle(0, 0, this.texSize, this.texSize);
                break;
        }
    };
    return Tile;
}(PIXI.Sprite));
exports.Tile = Tile;
//# sourceMappingURL=Tile.js.map