"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Node = (function () {
    function Node(row, col) {
        this.row = row;
        this.col = col;
        this.h = 0;
        this.g = 0;
        this.parent = null;
    }
    Node.prototype.getRow = function () {
        return this.row;
    };
    Node.prototype.getCol = function () {
        return this.col;
    };
    Node.prototype.setH = function (value) {
        this.h = value;
    };
    Node.prototype.getH = function () {
        return this.h;
    };
    Node.prototype.setG = function (value) {
        this.g = value;
    };
    Node.prototype.getG = function () {
        return this.g + ((this.parent) ? this.parent.getG() : 0);
    };
    Node.prototype.getValue = function () {
        return this.getH() + this.getG();
    };
    Node.prototype.setParent = function (node) {
        this.parent = node;
    };
    Node.prototype.getParent = function () {
        return this.parent;
    };
    return Node;
}());
exports.Node = Node;
//# sourceMappingURL=Node.js.map