"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Initial_1 = require("./Initial");
var PathEnd = (function () {
    function PathEnd(state) {
        this.instructions = "done!";
        this.stateType = "GameState.PATHEND";
        this.gameStateManager = state;
        this.gameStateManager.controller.findPath();
        this.gameStateManager.controller.resetView();
        this.gameStateManager.controller.removeButtonView();
    }
    PathEnd.prototype.update = function () {
        this.gameStateManager.change(new Initial_1.Initial(this.gameStateManager));
    };
    return PathEnd;
}());
exports.PathEnd = PathEnd;
//# sourceMappingURL=PathEnd.js.map