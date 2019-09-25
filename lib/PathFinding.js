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
    }
    PathFinding.prototype.find = function (map) {
        var firstElement = this.findStart(map);
        var lastElement = this.findEnd(map);
        return this.findBestPath(firstElement, lastElement, map);
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
            isFinished = this.isObjectEqual(closedList[closedList.length - 1], lastElement) || openList.length == 0;
        }
        if (openList.length > 0) {
            return this.getPath(closedList[closedList.length - 1]);
        }
        else {
            return [];
        }
    };
    PathFinding.prototype.nodeToObject = function (node) {
        return { col: node.getCol(), row: node.getRow() };
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
    PathFinding.prototype.findEnd = function (map) {
        return this.findElement(map, Types.END);
    };
    PathFinding.prototype.findStart = function (map) {
        return this.findElement(map, Types.START);
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
    PathFinding.prototype.getValueMove = function (node, nodeNew) {
        if (node.getRow() != nodeNew.getRow() && node.getCol() != nodeNew.getCol())
            return 14;
        else
            return 10;
    };
    PathFinding.prototype.distanceBetweenNodes = function (nodeInitial, nodeFinal, val) {
        var col = Math.abs(nodeFinal.getCol() - nodeInitial.getCol());
        var row = Math.abs(nodeFinal.getRow() - nodeInitial.getRow());
        return col * val + row * val;
    };
    PathFinding.prototype.isObjectEqual = function (element, element0) {
        return (element.getRow() == element0.getRow() && element.getCol() == element0.getCol());
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
    PathFinding.prototype.findValidAdjacents = function (map, node, closedList, openList, lastElement) {
        var _this = this;
        var validAdjacents = this.findAdjacents(map, node).filter(function (elementAdjacent) {
            return closedList.some(function (element) {
                return !(_this.isObjectEqual(element, elementAdjacent));
            });
        });
        var validAdjacentsOpenList = validAdjacents.filter(function (elementAdjacent) {
            return openList.some(function (element) {
                return (_this.isObjectEqual(element, elementAdjacent));
            });
        });
        validAdjacentsOpenList.map(function (elementAdjacent) {
            var validElement = openList.filter(function (element) { return (_this.isObjectEqual(element, elementAdjacent)); })[0];
            if ((node.getG() + _this.getValueMove(validElement, node)) < validElement.getG()) {
                validElement.setG(_this.getValueMove(validElement, node));
                validElement.setParent(node);
            }
        });
        var validAdjacentsNewOpenList = validAdjacents.filter(function (elementAdjacent) {
            return !openList.some(function (element) {
                return (_this.isObjectEqual(element, elementAdjacent));
            });
        });
        validAdjacentsNewOpenList.forEach(function (element) {
            element.setParent(node);
            element.setH(_this.distanceBetweenNodes(element, lastElement, 10));
            element.setG(_this.getValueMove(node, element));
            element.setValue(element.getG() + element.getH());
            openList.push(element);
        });
        openList.sort(function (a, b) { return b.getValue() - a.getValue(); });
        return openList;
    };
    return PathFinding;
}());
exports.PathFinding = PathFinding;
//# sourceMappingURL=PathFinding.js.map