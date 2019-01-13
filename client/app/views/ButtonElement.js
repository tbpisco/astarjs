System.register([], function (exports_1, context_1) {
    "use strict";
    var ButtonElement;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            ButtonElement = class ButtonElement extends PIXI.Sprite {
                constructor(element, col, row) {
                    super();
                    this.size = 40;
                    this.col = col;
                    this.row = row;
                    this.element = element;
                    this.create(element, col, row);
                }
                getCol() {
                    return this.col;
                }
                getRow() {
                    return this.row;
                }
                create(element, col, row) {
                    this.texture = this.drawRectangle(element, col, row);
                    this.on("mousedown", () => {
                        this.onClick();
                    }, this);
                    this.interactive = true;
                    this.buttonMode = true;
                }
                drawRectangle(element, col, row) {
                    let graphics = new PIXI.Graphics();
                    graphics.lineStyle(2, 0x333333, 1, 0);
                    graphics.beginFill(this.getColourByType(element), 1);
                    graphics.drawRect(0, 0, this.size - 2, this.size - 2);
                    return graphics.generateCanvasTexture();
                }
                highlight() {
                    let graphics = new PIXI.Graphics();
                    graphics.lineStyle(4, 0x00FF00, 1, 0);
                    graphics.beginFill(this.getColourByType(this.element), 1);
                    graphics.drawRect(0, 0, this.size - 4, this.size - 4);
                    this.texture = graphics.generateCanvasTexture();
                }
                getColourByType(type) {
                    switch (type) {
                        case "e":
                            return 0xFF0000;
                            break;
                        case "s":
                            return 0x00FF00;
                            break;
                        case 0:
                            return 0xFFFFFF;
                            break;
                        case 1:
                            return 0x0000FF;
                            break;
                        case 2:
                            return 0xa52a2a;
                            break;
                        default:
                            return 0x000000;
                            break;
                    }
                }
                onClick() {
                    alert(`col:${this.col}- row:${this.row}`);
                }
            };
            exports_1("ButtonElement", ButtonElement);
        }
    };
});
