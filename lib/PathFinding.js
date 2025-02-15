"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathFinding = exports.Heuristic = exports.Types = void 0;
var Node_1 = require("./Node");
var Types;
(function (Types) {
    Types["START"] = "s";
    Types["END"] = "e";
    Types["WALKABLE"] = "w";
    Types["NON_WALKABLE"] = "nw";
})(Types || (exports.Types = Types = {}));
var Heuristic;
(function (Heuristic) {
    Heuristic[Heuristic["MANHATTAN"] = 0] = "MANHATTAN";
    Heuristic[Heuristic["DIAGONAL"] = 1] = "DIAGONAL";
})(Heuristic || (exports.Heuristic = Heuristic = {}));
var PathFinding = (function () {
    function PathFinding(options) {
        this.DEFAULT_DISTANCE = 10;
        this.DIAGONAL_DISTANCE = 14;
        this.heuristic = Heuristic.MANHATTAN;
        this.allowDiagonal = false;
        this.walkableTypes = [];
        if (options && options.heuristic) {
            this.heuristic = options.heuristic;
            this.allowDiagonal = options.allowDiagonal || false;
        }
    }
    PathFinding.prototype.setWalkable = function () {
        var _a;
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.walkableTypes = (_a = this.walkableTypes).concat.apply(_a, args).map(function (tileType) {
            if (_this.isNumber(tileType)) {
                return { type: tileType, weight: 1 };
            }
            else {
                var walkableData = {
                    type: tileType.type,
                    weight: tileType.weight ? tileType.weight : 1,
                };
                return walkableData;
            }
        });
        return this;
    };
    PathFinding.prototype.setStart = function (start) {
        this.start = start;
        return this;
    };
    PathFinding.prototype.setEnd = function (end) {
        this.end = end;
        return this;
    };
    PathFinding.prototype.gameMapToPathfind = function (map) {
        var _this = this;
        var isStartObject = typeof this.start === 'number';
        var isEndObject = typeof this.end === 'number';
        return map.map(function (row, rowIndex) {
            return row.map(function (id, colIndex) {
                if ((isStartObject && _this.start == id) ||
                    (!isStartObject &&
                        _this.start.row == rowIndex &&
                        _this.start.col == colIndex)) {
                    return Types.START;
                }
                else if ((isEndObject && _this.end == id) ||
                    (!isEndObject &&
                        _this.end.row == rowIndex &&
                        _this.end.col == colIndex)) {
                    return Types.END;
                }
                else if (_this.isTileWalkable(id)) {
                    var item = _this.getTileWalkable(id);
                    return item.weight ? item.weight : 0;
                }
                else {
                    return Types.NON_WALKABLE;
                }
            });
        });
    };
    PathFinding.prototype.isTileWalkable = function (mapItem) {
        var _this = this;
        return this.walkableTypes.some(function (type) {
            if (_this.isNumber(type)) {
                return type == mapItem;
            }
            else {
                return type.type == mapItem;
            }
        });
    };
    PathFinding.prototype.getTileWalkable = function (mapItem) {
        var _this = this;
        return this.walkableTypes.filter(function (type) {
            if (_this.isNumber(type)) {
                return type === mapItem;
            }
            else {
                return type.type === mapItem;
            }
        })[0];
    };
    PathFinding.prototype.find = function (map) {
        if (this.start == undefined || this.start == null) {
            throw new Error("There is no start point. Please, use setStart() to configure the path's start point.");
        }
        if (this.end == undefined || this.end == null) {
            throw new Error("There is no end point. Please, use setEnd() to configure the path's end point.");
        }
        var finalMap = this.gameMapToPathfind(map);
        var firstElement = typeof this.start !== 'number'
            ? new Node_1.Node(this.start.row, this.start.col, 0)
            : this.findStartElement(finalMap);
        var lastElement = typeof this.end !== 'number' ? new Node_1.Node(this.end.row, this.end.col, 0) : this.findEndElement(finalMap);
        return this.findBestPath(firstElement, lastElement, finalMap);
    };
    PathFinding.prototype.findStartElement = function (map) {
        var startPoint = this.findElement(map, Types.START);
        if (startPoint == null) {
            throw new Error("Couldn't find a start point.");
        }
        return startPoint;
    };
    PathFinding.prototype.findEndElement = function (map) {
        var endPoint = this.findElement(map, Types.END);
        if (endPoint == null) {
            throw new Error("Couldn't find a end point.");
        }
        return endPoint;
    };
    PathFinding.prototype.findElement = function (map, value) {
        var el = null;
        map.forEach(function (element, indexRow) {
            element.forEach(function (element, indexCol) {
                if (element == value) {
                    el = new Node_1.Node(indexRow, indexCol, 0);
                }
            });
        });
        return el;
    };
    PathFinding.prototype.findBestPath = function (firstElement, lastElement, map) {
        var _this = this;
        var closedList = [];
        var openList = [];
        var isFinished = false;
        var lastNode = firstElement;
        var lastNodeAdjacents;
        closedList.push(firstElement);
        while (!isFinished) {
            this.updateLists(map, lastNode, closedList, openList, lastElement);
            if (openList.length > 0)
                closedList.push(openList.pop());
            lastNode = closedList[closedList.length - 1];
            lastNodeAdjacents = this.findAdjacents(map, lastNode).filter(function (elementAdjacent) {
                return _this.elementNotExistsInside(openList, elementAdjacent) &&
                    _this.elementNotExistsInside(closedList, elementAdjacent);
            });
            isFinished =
                this.isNodeEqual(closedList[closedList.length - 1], lastElement) ||
                    (openList.length == 0 && !lastNodeAdjacents.length);
        }
        return openList.length > 0 ? this.getPath(closedList[closedList.length - 1]) : [];
    };
    PathFinding.prototype.updateLists = function (map, currentNode, closedList, openList, lastElement) {
        var _this = this;
        var validAdjacents = this.findAdjacents(map, currentNode).filter(function (elementAdjacent) {
            return _this.elementNotExistsInside(closedList, elementAdjacent);
        });
        var validAdjacentsOpenList = validAdjacents.filter(function (elementAdjacent) {
            return _this.elementExistsInside(openList, elementAdjacent);
        });
        validAdjacentsOpenList.forEach(function (elementAdjacent) {
            var validElement = openList.filter(function (element) { return _this.isNodeEqual(element, elementAdjacent); })[0];
            if (currentNode.getG() + _this.getMoveValue(validElement, currentNode) < validElement.getG()) {
                validElement.setG(_this.getMoveValue(validElement, currentNode));
                validElement.setParent(currentNode);
            }
        });
        var validAdjacentsNewOpenList = validAdjacents.filter(function (elementAdjacent) {
            return _this.elementNotExistsInside(openList, elementAdjacent);
        });
        validAdjacentsNewOpenList.forEach(function (element) {
            element.setParent(currentNode);
            element.setH(_this.distanceBetweenNodes(element, lastElement));
            element.setG(_this.getMoveValue(currentNode, element));
            openList.push(element);
        });
        openList.sort(function (a, b) { return b.getValue() - a.getValue(); });
    };
    PathFinding.prototype.elementNotExistsInside = function (list, element) {
        return !this.elementExistsInside(list, element);
    };
    PathFinding.prototype.elementExistsInside = function (list, element) {
        var _this = this;
        return list.some(function (el) {
            return _this.isNodeEqual(el, element);
        });
    };
    PathFinding.prototype.distanceBetweenNodes = function (initialNode, finalNode) {
        var col = Math.abs(finalNode.getCol() - initialNode.getCol());
        var row = Math.abs(finalNode.getRow() - initialNode.getRow());
        if (this.heuristic === Heuristic.MANHATTAN) {
            return this.DEFAULT_DISTANCE * (col + row);
        }
        else {
            return (this.DEFAULT_DISTANCE * (col + row) +
                (this.DIAGONAL_DISTANCE - 2 * this.DEFAULT_DISTANCE) * Math.min(col, row));
        }
    };
    PathFinding.prototype.getMoveValue = function (node, newNode) {
        if (node.getRow() != newNode.getRow() && node.getCol() != newNode.getCol())
            return this.DIAGONAL_DISTANCE * (1 + newNode.getWeight());
        else
            return this.DEFAULT_DISTANCE * (1 + newNode.getWeight());
    };
    PathFinding.prototype.findAdjacents = function (map, node) {
        var adjacents = [];
        var diagonal = [
            [-1, -1],
            [-1, 1],
            [1, -1],
            [1, 1],
        ];
        var square = [
            [-1, 0],
            [0, -1],
            [0, 1],
            [1, 0],
        ];
        var mapElements = map;
        var x, y = 0;
        for (var v = 0; v < square.length; v++) {
            x = node.getRow() + square[v][0];
            y = node.getCol() + square[v][1];
            if (x > -1 &&
                y > -1 &&
                x < mapElements.length &&
                y < mapElements[x].length &&
                (this.isNumber(mapElements[x][y]) || mapElements[x][y] == Types.END)) {
                adjacents.push(new Node_1.Node(x, y, mapElements[x][y]));
            }
        }
        var addAdjacents = false;
        if (this.heuristic === Heuristic.DIAGONAL) {
            for (var v = 0; v < diagonal.length; v++) {
                x = node.getRow() + diagonal[v][0];
                y = node.getCol() + diagonal[v][1];
                if (x > -1 &&
                    y > -1 &&
                    x < mapElements.length &&
                    y < mapElements[x].length &&
                    (this.isNumber(mapElements[x][y]) || mapElements[x][y] == Types.END)) {
                    if (!this.allowDiagonal) {
                        addAdjacents = false;
                        for (var index = 0; index < diagonal.length; index++) {
                            if (index == v &&
                                this.isNumber(mapElements[x - diagonal[v][0]][y]) &&
                                this.isNumber(mapElements[x][y - diagonal[v][1]])) {
                                addAdjacents = true;
                            }
                        }
                        if (addAdjacents) {
                            adjacents.push(new Node_1.Node(x, y, mapElements[x][y]));
                        }
                    }
                    else {
                        adjacents.push(new Node_1.Node(x, y, mapElements[x][y]));
                    }
                }
            }
        }
        return adjacents;
    };
    PathFinding.prototype.isNumber = function (item) {
        return Object.prototype.toString.apply(item).indexOf('Number') > -1;
    };
    PathFinding.prototype.getPath = function (node) {
        var currentNode = node;
        var listPath = [];
        while (currentNode) {
            listPath.push(this.nodeToObject(currentNode));
            currentNode = currentNode.getParent();
        }
        return listPath.reverse();
    };
    PathFinding.prototype.nodeToObject = function (node) {
        return { col: node.getCol(), row: node.getRow() };
    };
    PathFinding.prototype.isNodeEqual = function (element, element0) {
        return element.getRow() == element0.getRow() && element.getCol() == element0.getCol();
    };
    return PathFinding;
}());
exports.PathFinding = PathFinding;
//# sourceMappingURL=PathFinding.js.map