"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Initial_1 = require("./Initial");
var GameStateManager = (function () {
    function GameStateManager(controller) {
        this.currentState = new Initial_1.Initial(this);
        this.previousState = [];
        this.controller = controller;
    }
    GameStateManager.prototype.change = function (state) {
        this.previousState.push(this.currentState);
        this.currentState = state;
        this.controller.updateInstructions(this.currentState.instructions);
    };
    GameStateManager.prototype.start = function () {
        this.currentState.update();
    };
    GameStateManager.prototype.update = function (type) {
        this.currentState.update(type);
    };
    return GameStateManager;
}());
exports.GameStateManager = GameStateManager;
//# sourceMappingURL=GameStateManager.js.map