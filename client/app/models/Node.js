System.register([], function (exports_1, context_1) {
    "use strict";
    var Node;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Node = class Node {
                constructor(row, col) {
                    this.row = row;
                    this.col = col;
                    this.value = 0;
                    this.h = 0;
                    this.g = 0;
                    this.parent = null;
                }
                getRow() {
                    return this.row;
                }
                getCol() {
                    return this.col;
                }
                setH(value) {
                    this.h = value;
                }
                getH() {
                    return this.h;
                }
                setG(value) {
                    this.g = value;
                }
                getG() {
                    return this.g + ((this.parent) ? this.parent.getG() : 0);
                }
                setValue(value) {
                    this.value = value;
                }
                getValue() {
                    return this.getH() + this.getG();
                }
                setParent(node) {
                    this.parent = node;
                }
                getParent() {
                    return this.parent;
                }
            };
            exports_1("Node", Node);
        }
    };
});
