"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Build_1 = require("./Build");
var PathEnd_1 = require("./PathEnd");
var Initial = (function () {
    function Initial(state) {
        this.instructions = "To create your own map CLICK on the SQUARES or switch to RANDOM mode.";
        this.stateType = "GameState.BUILD";
        this.gameStateManager = state;
    }
    Initial.prototype.update = function (type) {
        if (type == "random") {
            this.gameStateManager.change(new PathEnd_1.PathEnd(this.gameStateManager));
        }
        else {
            this.gameStateManager.change(new Build_1.Build(this.gameStateManager));
        }
    };
    return Initial;
}());
exports.Initial = Initial;
//# sourceMappingURL=Initial.js.map