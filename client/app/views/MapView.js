System.register(["pixi.js"], function (exports_1, context_1) {
    "use strict";
    var PIXI, MapView;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (PIXI_1) {
                PIXI = PIXI_1;
            }
        ],
        execute: function () {
            MapView = class MapView {
                constructor(domElementID) {
                    this.size = 40;
                    this.graphics = new PIXI.Graphics();
                    let domElement = document.body.querySelector(domElementID);
                    if (domElement)
                        this.domElement = domElement;
                }
                createStage(map) {
                    var row = map.get().length;
                    var col = map.get()[0].length;
                    var app = new PIXI.Application(this.size * col, this.size * row, { antialias: true });
                    this.domElement.appendChild(app.view);
                    map.get().forEach((elementRow, indexRow) => {
                        elementRow.forEach((elementCol, indexCol) => {
                            this.drawRectangle(this.graphics, elementCol, indexCol, indexRow);
                        });
                    });
                    app.stage.addChild(this.graphics);
                }
                highlightRectangule(row, col) {
                    this.graphics.lineStyle(4, 0x00FF00, 1);
                    this.graphics.fillAlpha = 0;
                    this.graphics.drawRect(col * this.size, row * this.size, this.size, this.size);
                    this.graphics.fillAlpha = 1;
                }
                drawRectangle(graphics, element, col, row) {
                    graphics.lineStyle(2, 0x333333, 1);
                    graphics.beginFill(this.getColourByType(element), 1);
                    graphics.drawRect(col * this.size, row * this.size, this.size, this.size);
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
            };
            exports_1("MapView", MapView);
        }
    };
});
