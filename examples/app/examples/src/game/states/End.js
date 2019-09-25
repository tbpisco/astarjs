"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PathEnd_1 = require("./PathEnd");
var End = (function () {
    function End(state) {
        this.instructions = "Select end position";
        this.stateType = "GameState.END";
        this.gameStateManager = state;
        this.gameStateManager.controller.removeButtonView();
    }
    End.prototype.update = function () {
        this.gameStateManager.change(new PathEnd_1.PathEnd(this.gameStateManager));
    };
    return End;
}());
exports.End = End;
//# sourceMappingURL=End.js.map