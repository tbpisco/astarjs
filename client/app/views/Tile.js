System.register(["pixi.js"], function (exports_1, context_1) {
    "use strict";
    var pixi_js_1, Tile;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (pixi_js_1_1) {
                pixi_js_1 = pixi_js_1_1;
            }
        ],
        execute: function () {
            Tile = class Tile extends PIXI.Sprite {
                constructor(type, col, row, size, resources) {
                    super();
                    this.typePos = 0;
                    this.availableTypes = [0, 1, 2, 14, 15];
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
                changeTileType() {
                    this.typePos = (this.typePos + 1) % 5;
                    this.type = this.availableTypes[this.typePos];
                }
                update() {
                    let background = [1, 2, 3, 4, 13, 14, 15];
                    if (background.indexOf(this.type) > -1)
                        this.background.visible = true;
                    else
                        this.background.visible = false;
                    this.element.texture = new PIXI.Texture(this.tex, this.getFrameByType(this.type), new pixi_js_1.Rectangle(0, 0, this.texSize, this.texSize), new pixi_js_1.Rectangle(0, 0, this.size, this.size));
                }
                highlight() {
                    if (this.type == 3 || this.type == 4)
                        return;
                    this.type = 13;
                    this.update();
                }
                getFrameByType(type) {
                    switch (type) {
                        case 15:
                            return new pixi_js_1.Rectangle(6 * 16, 28 * 16, this.texSize, this.texSize);
                            break;
                        case 14:
                            return new pixi_js_1.Rectangle(6 * 16, 3 * 16, this.texSize, this.texSize);
                            break;
                        case 13:
                            return new pixi_js_1.Rectangle(6 * 16, 42 * 16, this.texSize, this.texSize);
                            break;
                        case 12:
                            return new pixi_js_1.Rectangle(2 * 16, 30 * 16, this.texSize, this.texSize);
                            break;
                        case 11:
                            return new pixi_js_1.Rectangle(2 * 16, 29 * 16, this.texSize, this.texSize);
                            break;
                        case 10:
                            return new pixi_js_1.Rectangle(2 * 16, 28 * 16, this.texSize, this.texSize);
                            break;
                        case 9:
                            return new pixi_js_1.Rectangle(1 * 16, 30 * 16, this.texSize, this.texSize);
                            break;
                        case 8:
                            return new pixi_js_1.Rectangle(1 * 16, 28 * 16, this.texSize, this.texSize);
                            break;
                        case 7:
                            return new pixi_js_1.Rectangle(0 * 16, 30 * 16, this.texSize, this.texSize);
                            break;
                        case 6:
                            return new pixi_js_1.Rectangle(0 * 16, 29 * 16, this.texSize, this.texSize);
                            break;
                        case 5:
                            return new pixi_js_1.Rectangle(0 * 16, 28 * 16, this.texSize, this.texSize);
                            break;
                        case 4:
                            return new pixi_js_1.Rectangle(2 * 16, 6 * 16, this.texSize, this.texSize);
                            break;
                        case 3:
                            return new pixi_js_1.Rectangle(3 * 16, 6 * 16, this.texSize, this.texSize);
                            break;
                        case 0:
                            return new pixi_js_1.Rectangle(16, 0, this.texSize, this.texSize);
                            break;
                        case 1:
                            return new pixi_js_1.Rectangle(2 * 16, 1 * 16, this.texSize, this.texSize);
                            break;
                        case 2:
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
