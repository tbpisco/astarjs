"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
var Node = (function () {
    function Node(row, col, weight) {
        if (weight === void 0) { weight = 0; }
        this._row = row;
        this._col = col;
        this._weight = weight;
        this._h = 0;
        this._g = 0;
        this._parent = null;
    }
    Node.prototype.getRow = function () {
        return this._row;
    };
    Node.prototype.getCol = function () {
        return this._col;
    };
    Node.prototype.getWeight = function () {
        return this._weight;
    };
    Node.prototype.setH = function (value) {
        this._h = value;
    };
    Node.prototype.getH = function () {
        return this._h;
    };
    Node.prototype.setG = function (value) {
        this._g = value;
    };
    Node.prototype.getG = function () {
        return this._g + (this._parent ? this._parent.getG() : 0);
    };
    Node.prototype.getValue = function () {
        return this.getH() + this.getG();
    };
    Node.prototype.setParent = function (node) {
        this._parent = node;
    };
    Node.prototype.getParent = function () {
        return this._parent;
    };
    return Node;
}());
exports.Node = Node;
//# sourceMappingURL=Node.js.map