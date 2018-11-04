System.register(["../views/MapView", "../utils/PathFinding", "../models/Map"], function (exports_1, context_1) {
    "use strict";
    var MapView_1, PathFinding_1, Map_1, AppController;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (MapView_1_1) {
                MapView_1 = MapView_1_1;
            },
            function (PathFinding_1_1) {
                PathFinding_1 = PathFinding_1_1;
            },
            function (Map_1_1) {
                Map_1 = Map_1_1;
            }
        ],
        execute: function () {
            AppController = class AppController {
                constructor() {
                    this.mapView = new MapView_1.MapView("#map");
                    this.map = this.createRandomMap();
                    this.mapView.createStage(this.map);
                    let bestPath = PathFinding_1.PathFinding.find(this.map);
                    if (bestPath)
                        this.showResult(bestPath, this.showNodes);
                }
                createRandomMap() {
                    let array = [];
                    for (let index = 0; index < 10; index++) {
                        array.push(new Array(14 + 1).join("0").split("").map((element) => {
                            let num = Math.floor(Math.random() * 10);
                            if (num < 8) {
                                return 0;
                            }
                            else if (num == 8) {
                                return 1;
                            }
                            else {
                                return 2;
                            }
                        }));
                    }
                    let r = Math.floor(Math.random() * 10);
                    let c = Math.floor(Math.random() * 14);
                    array[r][c] = "s";
                    let r0 = Math.floor(Math.random() * 10);
                    let c0 = Math.floor(Math.random() * 14);
                    while (r0 == r && c0 == c) {
                        r0 = Math.floor(Math.random() * 10);
                        c0 = Math.floor(Math.random() * 14);
                        console.log("repetiu");
                    }
                    array[r0][c0] = "e";
                    return new Map_1.Map(array);
                }
                showResult(node, draw) {
                    let currentNode = node;
                    while (currentNode) {
                        draw.apply(this, [currentNode]);
                        currentNode = currentNode.getParent();
                    }
                }
                showNodes(node) {
                    this.mapView.highlightRectangule(node.getRow(), node.getCol());
                }
            };
            exports_1("AppController", AppController);
        }
    };
});
