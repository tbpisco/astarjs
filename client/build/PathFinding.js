System.register(["./Node"], function (exports_1, context_1) {
    "use strict";
    var Node_1, Types, PathFinding;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Node_1_1) {
                Node_1 = Node_1_1;
            }
        ],
        execute: function () {
            (function (Types) {
                Types[Types["START"] = 0] = "START";
                Types[Types["END"] = 1] = "END";
                Types[Types["WALKABLE"] = 2] = "WALKABLE";
                Types[Types["NON_WALKABLE"] = 3] = "NON_WALKABLE";
            })(Types || (Types = {}));
            exports_1("Types", Types);
            PathFinding = class PathFinding {
                constructor() {
                }
                static find(map) {
                    let firstElement = PathFinding.findStart(map);
                    let lastElement = PathFinding.findEnd(map);
                    return PathFinding.findBestPath(firstElement, lastElement, map);
                }
                static findBestPath(firstElement, lastElement, map) {
                    var closedList = [];
                    var openList = [];
                    var isFinished = false;
                    closedList.push(firstElement);
                    while (!isFinished) {
                        openList = PathFinding.findValidAdjacents(map, closedList[closedList.length - 1], closedList, openList, lastElement);
                        if (openList.length > 0)
                            closedList.push(openList.pop());
                        isFinished = PathFinding.isObjectEqual(closedList[closedList.length - 1], lastElement) || openList.length == 0;
                    }
                    if (openList.length > 0) {
                        return PathFinding.getPath(closedList[closedList.length - 1]);
                    }
                    else {
                        return [];
                    }
                }
                static nodeToObject(node) {
                    return { col: node.getCol(), row: node.getRow() };
                }
                static getPath(node) {
                    let currentNode = node;
                    let listPath = [];
                    while (currentNode) {
                        listPath.push(this.nodeToObject(currentNode));
                        currentNode = currentNode.getParent();
                        if (!currentNode)
                            return listPath.reverse();
                    }
                    return [];
                }
                static findEnd(map) {
                    return PathFinding.findElement(map, Types.END);
                }
                static findStart(map) {
                    return PathFinding.findElement(map, Types.START);
                }
                static findElement(map, value) {
                    let el = new Node_1.Node(0, 0);
                    map.forEach((element, indexRow) => {
                        element.forEach((element, indexCol) => {
                            if (element == value) {
                                el = new Node_1.Node(indexRow, indexCol);
                            }
                        });
                    });
                    return el;
                }
                static getValueMove(node, nodeNew) {
                    if (node.getRow() != nodeNew.getRow() && node.getCol() != nodeNew.getCol())
                        return 14;
                    else
                        return 10;
                }
                static distanceBetweenNodes(nodeInitial, nodeFinal, val) {
                    let col = Math.abs(nodeFinal.getCol() - nodeInitial.getCol());
                    let row = Math.abs(nodeFinal.getRow() - nodeInitial.getRow());
                    return col * val + row * val;
                }
                static isObjectEqual(element, element0) {
                    return (element.getRow() == element0.getRow() && element.getCol() == element0.getCol());
                }
                static findAdjacents(map, node) {
                    let adjacents = [];
                    let verify = [[-1, -1], [-1, 0], [-1, 1], [0, -1],
                        [0, 1], [1, -1], [1, 0], [1, 1]];
                    let mapElements = map;
                    for (let v = 0; v < verify.length; v++) {
                        var x = node.getRow() + verify[v][0];
                        var y = node.getCol() + verify[v][1];
                        if (x > -1 && y > -1 && x < mapElements.length && y < mapElements[x].length
                            && (mapElements[x][y] == Types.WALKABLE || mapElements[x][y] == Types.END)) {
                            adjacents.push(new Node_1.Node(x, y));
                        }
                    }
                    return adjacents;
                }
                static findValidAdjacents(map, node, closedList, openList, lastElement) {
                    let validAdjacents = PathFinding.findAdjacents(map, node).filter((elementAdjacent) => {
                        return closedList.some((element) => {
                            return !(PathFinding.isObjectEqual(element, elementAdjacent));
                        });
                    });
                    let validAdjacentsOpenList = validAdjacents.filter((elementAdjacent) => {
                        return openList.some((element) => {
                            return (PathFinding.isObjectEqual(element, elementAdjacent));
                        });
                    });
                    validAdjacentsOpenList.map((elementAdjacent) => {
                        let validElement = openList.filter((element) => (PathFinding.isObjectEqual(element, elementAdjacent)))[0];
                        if ((node.getG() + PathFinding.getValueMove(validElement, node)) < validElement.getG()) {
                            validElement.setG(PathFinding.getValueMove(validElement, node));
                            validElement.setParent(node);
                        }
                    });
                    let validAdjacentsNewOpenList = validAdjacents.filter((elementAdjacent) => {
                        return !openList.some((element) => {
                            return (PathFinding.isObjectEqual(element, elementAdjacent));
                        });
                    });
                    validAdjacentsNewOpenList.forEach((element) => {
                        element.setParent(node);
                        element.setH(PathFinding.distanceBetweenNodes(element, lastElement, 10));
                        element.setG(PathFinding.getValueMove(node, element));
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
