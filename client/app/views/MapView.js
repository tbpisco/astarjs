System.register(["pixi.js", "./ButtonElement"], function (exports_1, context_1) {
    "use strict";
    var PIXI, ButtonElement_1, MapView;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (PIXI_1) {
                PIXI = PIXI_1;
            },
            function (ButtonElement_1_1) {
                ButtonElement_1 = ButtonElement_1_1;
            }
        ],
        execute: function () {
            MapView = class MapView {
                constructor(domElementID) {
                    this.size = 40;
                    this.buttons = [];
                    let domElement = document.body.querySelector(domElementID);
                    if (domElement)
                        this.domElement = domElement;
                }
                createStage(map) {
                    var row = map.get().length;
                    var col = map.get()[0].length;
                    this.app = new PIXI.Application(this.size * col, this.size * row, { antialias: true });
                    this.domElement.appendChild(this.app.view);
                    map.get().forEach((elementRow, indexRow) => {
                        elementRow.forEach((elementCol, indexCol) => {
                            let button = new ButtonElement_1.ButtonElement(elementCol, indexCol, indexRow);
                            this.buttons.push(button);
                            button.x = indexCol * this.size;
                            button.y = indexRow * this.size;
                            this.app.stage.addChild(button);
                        });
                    });
                }
                highlightRectangule(row, col) {
                    let button;
                    for (let index = 0; index < this.buttons.length; index++) {
                        const element = this.buttons[index];
                        if (this.buttons[index].getRow() == row
                            && this.buttons[index].getCol() == col) {
                            button = this.buttons[index];
                            button.highlight();
                            this.app.stage.removeChild(button);
                            this.app.stage.addChildAt(button, this.app.stage.children.length - 1);
                            break;
                        }
                    }
                }
            };
            exports_1("MapView", MapView);
        }
    };
});
