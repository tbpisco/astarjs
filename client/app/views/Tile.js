System.register(["pixi.js"], function (exports_1, context_1) {
    "use strict";
    var pixi_js_1, TILE, Tile;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (pixi_js_1_1) {
                pixi_js_1 = pixi_js_1_1;
            }
        ],
        execute: function () {
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
            })(TILE || (TILE = {}));
            exports_1("TILE", TILE);
            Tile = class Tile extends PIXI.Sprite {
                constructor(type, col, row, size, resources) {
                    super();
                    this.typePos = 0;
                    this.availableTypes = [TILE.GREEN, TILE.HOUSE, TILE.WATER, TILE.TREES, TILE.MOUNTAIN, TILE.MOUNTAIN_BROWN];
                    this.texSize = 16;
                    this.tex = resources.texture;
                    this.col = col;
                    this.row = row;
                    this.size = this.texSize;
                    this.type = type;
                    this.setTypePos(this.type);
                    this.scale.set(size / this.texSize);
                    this.background = new PIXI.Sprite();
                    this.background.anchor.set(0.5, 0.5);
                    this.background.texture = new PIXI.Texture(this.tex, this.getFrameByType(0), new pixi_js_1.Rectangle(0, 0, this.texSize, this.texSize), new pixi_js_1.Rectangle(0, 0, this.size, this.size));
                    this.addChild(this.background);
                    this.element = new PIXI.Sprite();
                    this.element.anchor.set(0.5, 0.5);
                    this.element.texture = new PIXI.Texture(this.tex, this.getFrameByType(0), new pixi_js_1.Rectangle(0, 0, this.texSize, this.texSize), new pixi_js_1.Rectangle(0, 0, this.size, this.size));
                    this.addChild(this.element);
                    this.tex.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
                    this.update();
                }
                setTypePos(type) {
                    this.typePos = this.availableTypes.indexOf(type);
                }
                getCol() {
                    return this.col;
                }
                getRow() {
                    return this.row;
                }
                disable() {
                    this.interactive = false;
                    this.buttonMode = false;
                }
                enable() {
                    this.interactive = true;
                    this.buttonMode = true;
                }
                changeTileType(type) {
                    if (type) {
                        this.type = type;
                    }
                    else {
                        this.typePos = (this.typePos + 1) % 6;
                        this.type = this.availableTypes[this.typePos];
                    }
                    this.update();
                }
                update() {
                    let background = [TILE.WATER, TILE.HOUSE, TILE.TREES, TILE.START, TILE.END,
                        TILE.MOUNTAIN, TILE.MOUNTAIN_BROWN, TILE.TOP_RIGHT, TILE.TOP_LEFT, TILE.TOP,
                        TILE.BOTTOM, TILE.RIGHT, TILE.LEFT, TILE.BOTTOM_LEFT, TILE.BOTTOM_RIGHT];
                    if (background.indexOf(this.type) > -1)
                        this.background.visible = true;
                    else
                        this.background.visible = false;
                    this.element.texture = new PIXI.Texture(this.tex, this.getFrameByType(this.type), new pixi_js_1.Rectangle(0, 0, this.texSize, this.texSize), new pixi_js_1.Rectangle(0, 0, this.size, this.size));
                }
                highlight(direction) {
                    if (this.type == TILE.START || this.type == TILE.END)
                        return;
                    this.type = direction;
                    this.update();
                }
                getFrameByType(type) {
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
                }
            };
            exports_1("Tile", Tile);
        }
    };
});
