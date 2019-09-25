"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var End_1 = require("./End");
var Start = (function () {
    function Start(state) {
        this.instructions = "Select start position";
        this.stateType = "GameState.START";
        this.gameStateManager = state;
        this.gameStateManager.controller.removeButtonView();
    }
    Start.prototype.update = function () {
        this.gameStateManager.change(new End_1.End(this.gameStateManager));
    };
    return Start;
}());
exports.Start = Start;
//# sourceMappingURL=Start.js.map