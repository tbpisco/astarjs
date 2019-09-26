"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Node_1 = require("./Node");
var Types;
(function (Types) {
    Types[Types["START"] = 0] = "START";
    Types[Types["END"] = 1] = "END";
    Types[Types["WALKABLE"] = 2] = "WALKABLE";
    Types[Types["NON_WALKABLE"] = 3] = "NON_WALKABLE";
})(Types = exports.Types || (exports.Types = {}));
var PathFinding = (function () {
    function PathFinding() {
        this.DEFAULT_DISTANCE = 10;
        this.DIAGONAL_DISTANCE = 14;
    }
    PathFinding.prototype.find = function (map) {
        var firstElement = this.findStartElement(map);
        var lastElement = this.findEndElement(map);
        return this.findBestPath(firstElement, lastElement, map);
    };
    PathFinding.prototype.findStartElement = function (map) {
        return this.findElement(map, Types.START);
    };
    PathFinding.prototype.findEndElement = function (map) {
        return this.findElement(map, Types.END);
    };
    PathFinding.prototype.findElement = function (map, value) {
        var el = new Node_1.Node(0, 0);
        map.forEach(function (element, indexRow) {
            element.forEach(function (element, indexCol) {
                if (element == value) {
                    el = new Node_1.Node(indexRow, indexCol);
                }
            });
        });
        return el;
    };
    PathFinding.prototype.findBestPath = function (firstElement, lastElement, map) {
        var closedList = [];
        var openList = [];
        var isFinished = false;
        closedList.push(firstElement);
        while (!isFinished) {
            openList = this.findValidAdjacents(map, closedList[closedList.length - 1], closedList, openList, lastElement);
            if (openList.length > 0)
                closedList.push(openList.pop());
            isFinished = this.isNodeEqual(closedList[closedList.length - 1], lastElement) || openList.length == 0;
        }
        return (openList.length > 0) ? this.getPath(closedList[closedList.length - 1]) : [];
    };
    PathFinding.prototype.findValidAdjacents = function (map, currentNode, closedList, openList, lastElement) {
        var _this = this;
        var validAdjacents = this.findAdjacents(map, currentNode).filter(function (elementAdjacent) {
            return closedList.some(function (element) {
                return !_this.isNodeEqual(element, elementAdjacent);
            });
        });
        var validAdjacentsOpenList = validAdjacents.filter(function (elementAdjacent) {
            return openList.some(function (element) {
                return _this.isNodeEqual(element, elementAdjacent);
            });
        });
        validAdjacentsOpenList.forEach(function (elementAdjacent) {
            var validElement = openList.filter(function (element) { return _this.isNodeEqual(element, elementAdjacent); })[0];
            if (currentNode.getG() + _this.getMoveValue(validElement, currentNode) < validElement.getG()) {
                validElement.setG(_this.getMoveValue(validElement, currentNode));
                validElement.setParent(currentNode);
            }
        });
        var validAdjacentsNewOpenList = validAdjacents.filter(function (elementAdjacent) {
            return !openList.some(function (element) {
                return _this.isNodeEqual(element, elementAdjacent);
            });
        });
        validAdjacentsNewOpenList.forEach(function (element) {
            element.setParent(currentNode);
            element.setH(_this.distanceBetweenNodes(element, lastElement, _this.DEFAULT_DISTANCE));
            element.setG(_this.getMoveValue(currentNode, element));
            openList.push(element);
        });
        openList.sort(function (a, b) { return b.getValue() - a.getValue(); });
        return openList;
    };
    PathFinding.prototype.distanceBetweenNodes = function (initialNode, finalNode, val) {
        var col = Math.abs(finalNode.getCol() - initialNode.getCol());
        var row = Math.abs(finalNode.getRow() - initialNode.getRow());
        return col * val + row * val;
    };
    PathFinding.prototype.getMoveValue = function (node, newNode) {
        if (node.getRow() != newNode.getRow() && node.getCol() != newNode.getCol())
            return this.DIAGONAL_DISTANCE;
        else
            return this.DEFAULT_DISTANCE;
    };
    PathFinding.prototype.findAdjacents = function (map, node) {
        var adjacents = [];
        var verify = [[-1, -1], [-1, 0], [-1, 1], [0, -1],
            [0, 1], [1, -1], [1, 0], [1, 1]];
        var mapElements = map;
        for (var v = 0; v < verify.length; v++) {
            var x = node.getRow() + verify[v][0];
            var y = node.getCol() + verify[v][1];
            if (x > -1 && y > -1 && x < mapElements.length && y < mapElements[x].length
                && (mapElements[x][y] == Types.WALKABLE || mapElements[x][y] == Types.END)) {
                adjacents.push(new Node_1.Node(x, y));
            }
        }
        return adjacents;
    };
    PathFinding.prototype.getPath = function (node) {
        var currentNode = node;
        var listPath = [];
        while (currentNode) {
            listPath.push(this.nodeToObject(currentNode));
            currentNode = currentNode.getParent();
            if (!currentNode)
                return listPath.reverse();
        }
        return [];
    };
    PathFinding.prototype.nodeToObject = function (node) {
        return { col: node.getCol(), row: node.getRow() };
    };
    PathFinding.prototype.isNodeEqual = function (element, element0) {
        return (element.getRow() == element0.getRow() && element.getCol() == element0.getCol());
    };
    return PathFinding;
}());
exports.PathFinding = PathFinding;
//# sourceMappingURL=PathFinding.js.map