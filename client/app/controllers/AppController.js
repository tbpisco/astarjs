System.register(["../views/MapView", "../models/Map", "../models/Node"], function (exports_1, context_1) {
    "use strict";
    var MapView_1, Map_1, Node_1, AppController;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (MapView_1_1) {
                MapView_1 = MapView_1_1;
            },
            function (Map_1_1) {
                Map_1 = Map_1_1;
            },
            function (Node_1_1) {
                Node_1 = Node_1_1;
            }
        ],
        execute: function () {
            AppController = class AppController {
                constructor() {
                    this.mapView = new MapView_1.MapView("#map");
                    this.map = new Map_1.Map([[0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, "e", 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
                        [1, 1, 1, 1, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0],
                        [0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0],
                        [0, 0, 0, 1, 1, 0, 0, 0, 0, 2, 2, 0, 0, 0],
                        [1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 0, 0, 0],
                        [0, 0, 0, 0, 2, 0, 0, 1, 1, 1, 1, 0, "s", 0],
                        [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0]]);
                    this.closedList = [];
                    this.openList = [];
                    this.firstElement = this.findStart(this.map);
                    this.lastElement = this.findEnd(this.map);
                    this.mapView.createStage(this.map);
                    this.findBestPath(this.firstElement, this.lastElement, this.map);
                }
                findBestPath(firstElement, lastElement, map) {
                    this.closedList.push(firstElement);
                    this.openList = this.findValidAdjacents(map, this.closedList[this.closedList.length - 1], this.closedList, this.openList);
                    if (this.openList.length > 0)
                        this.closedList.push(this.openList.pop());
                    var isFinished = false;
                    while (!isFinished) {
                        this.openList = this.findValidAdjacents(map, this.closedList[this.closedList.length - 1], this.closedList, this.openList);
                        if (this.openList.length > 0)
                            this.closedList.push(this.openList.pop());
                        isFinished = this.isObjectEqual(this.closedList[this.closedList.length - 1], lastElement) || this.openList.length == 0;
                    }
                    if (this.openList.length > 0) {
                        this.showNodes(this.closedList[this.closedList.length - 1]);
                    }
                    else {
                        console.log("There is no solution.");
                    }
                }
                findEnd(map) {
                    return this.findElement(map, "e");
                }
                findStart(map) {
                    return this.findElement(map, "s");
                }
                findElement(map, value) {
                    let el = new Node_1.Node(0, 0);
                    map.get().forEach((element, indexRow) => {
                        element.forEach((element, indexCol) => {
                            if (element == value) {
                                el = new Node_1.Node(indexRow, indexCol);
                            }
                        });
                    });
                    return el;
                }
                getValueMove(node, nodeNew) {
                    if (node.getRow() != nodeNew.getRow() && node.getCol() != nodeNew.getCol())
                        return 14;
                    else
                        return 10;
                }
                distanceBetweenNodes(nodeInitial, nodeFinal, val) {
                    let col = Math.abs(nodeFinal.getCol() - nodeInitial.getCol());
                    let row = Math.abs(nodeFinal.getRow() - nodeInitial.getRow());
                    return col * val + row * val;
                }
                isObjectEqual(element, element0) {
                    return (element.getRow() == element0.getRow() && element.getCol() == element0.getCol());
                }
                showNodes(node) {
                    this.mapView.highlightRectangule(node.getRow(), node.getCol());
                    console.log(node.getRow() + " - " + node.getCol());
                    if (node.getParent()) {
                        this.showNodes(node.getParent());
                    }
                }
                findAdjacents(map, node) {
                    let adjacents = [];
                    let verify = [[-1, -1], [-1, 0], [-1, 1],
                        [0, -1], [0, 1],
                        [1, -1], [1, 0], [1, 1]];
                    let mapElements = map.get();
                    for (let v = 0; v < verify.length; v++) {
                        var x = node.getRow() + verify[v][0];
                        var y = node.getCol() + verify[v][1];
                        if (x > -1 && y > -1 && x < mapElements.length && y < mapElements[x].length
                            && (mapElements[x][y] == 0 || mapElements[x][y] == "e")) {
                            adjacents.push(new Node_1.Node(x, y));
                        }
                    }
                    return adjacents;
                }
                findValidAdjacents(map, node, closedList, openList) {
                    let validAdjacents = this.findAdjacents(map, node).filter((elementAdjacent) => {
                        return closedList.some((element) => {
                            return !(element.getRow() == elementAdjacent.getRow() && element.getCol() == elementAdjacent.getCol());
                        });
                    });
                    let validAdjacentsOpenList = validAdjacents.filter((elementAdjacent) => {
                        return openList.some((element) => {
                            return (element.getRow() == elementAdjacent.getRow() && element.getCol() == elementAdjacent.getCol());
                        });
                    });
                    validAdjacentsOpenList.map((elementAdjacent) => {
                        let validElement = openList.filter((element) => (element.getRow() == elementAdjacent.getRow() && element.getCol() == elementAdjacent.getCol()))[0];
                        if (validElement.getG() < (node.getG() + this.getValueMove(validElement, node))) {
                            validElement.setG(this.getValueMove(validElement, node));
                            validElement.setParent(node);
                        }
                    });
                    let validAdjacentsNewOpenList = validAdjacents.filter((elementAdjacent) => {
                        return !openList.some((element) => {
                            return (element.getRow() == elementAdjacent.getRow() && element.getCol() == elementAdjacent.getCol());
                        });
                    });
                    validAdjacentsNewOpenList.forEach((element) => {
                        element.setParent(node);
                        element.setH(this.distanceBetweenNodes(element, this.lastElement, 10));
                        element.setG(this.getValueMove(node, element));
                        element.setValue(element.getG() + element.getH());
                        openList.push(element);
                    });
                    openList.sort((a, b) => b.getValue() - a.getValue());
                    return openList;
                }
            };
            exports_1("AppController", AppController);
        }
    };
});
