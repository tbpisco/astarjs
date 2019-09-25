"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Start_1 = require("./Start");
var Build = (function () {
    function Build(state) {
        this.instructions = "Click DONE once you have finished adding elements to your map.";
        this.stateType = "GameState.BUILD";
        this.gameStateManager = state;
        this.gameStateManager.controller.buildView();
    }
    Build.prototype.update = function () {
        this.gameStateManager.change(new Start_1.Start(this.gameStateManager));
    };
    return Build;
}());
exports.Build = Build;
//# sourceMappingURL=Build.js.map