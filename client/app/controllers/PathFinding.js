System.register(["../models/Node"], function (exports_1, context_1) {
    "use strict";
    var Node_1, PathFinding;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Node_1_1) {
                Node_1 = Node_1_1;
            }
        ],
        execute: function () {
            PathFinding = class PathFinding {
                constructor(map) {
                    this.map = map;
                }
                find() {
                    this.closedList = [];
                    this.openList = [];
                    this.firstElement = this.findStart(this.map);
                    this.lastElement = this.findEnd(this.map);
                    return this.findBestPath(this.firstElement, this.lastElement, this.map);
                }
                findBestPath(firstElement, lastElement, map) {
                    var isFinished = false;
                    this.closedList.push(firstElement);
                    this.openList = this.findValidAdjacents(map, this.closedList[this.closedList.length - 1], this.closedList, this.openList);
                    if (this.openList.length > 0)
                        this.closedList.push(this.openList.pop());
                    isFinished = this.isObjectEqual(this.closedList[this.closedList.length - 1], lastElement) || this.openList.length == 0;
                    while (!isFinished) {
                        this.openList = this.findValidAdjacents(map, this.closedList[this.closedList.length - 1], this.closedList, this.openList);
                        if (this.openList.length > 0)
                            this.closedList.push(this.openList.pop());
                        isFinished = this.isObjectEqual(this.closedList[this.closedList.length - 1], lastElement) || this.openList.length == 0;
                    }
                    if (this.openList.length > 0) {
                        return this.closedList[this.closedList.length - 1];
                    }
                    else {
                        return null;
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
                            return !(this.isObjectEqual(element, elementAdjacent));
                        });
                    });
                    let validAdjacentsOpenList = validAdjacents.filter((elementAdjacent) => {
                        return openList.some((element) => {
                            return (this.isObjectEqual(element, elementAdjacent));
                        });
                    });
                    validAdjacentsOpenList.map((elementAdjacent) => {
                        let validElement = openList.filter((element) => (this.isObjectEqual(element, elementAdjacent)))[0];
                        if ((node.getG() + this.getValueMove(validElement, node)) < validElement.getG()) {
                            validElement.setG(this.getValueMove(validElement, node));
                            validElement.setParent(node);
                        }
                    });
                    openList.sort((a, b) => b.getValue() - a.getValue());
                    let validAdjacentsNewOpenList = validAdjacents.filter((elementAdjacent) => {
                        return !openList.some((element) => {
                            return (this.isObjectEqual(element, elementAdjacent));
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
            exports_1("PathFinding", PathFinding);
        }
    };
});
