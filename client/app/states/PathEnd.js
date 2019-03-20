System.register(["./Initial"], function (exports_1, context_1) {
    "use strict";
    var Initial_1, PathEnd;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Initial_1_1) {
                Initial_1 = Initial_1_1;
            }
        ],
        execute: function () {
            PathEnd = class PathEnd {
                constructor(state) {
                    this.instructions = "done!";
                    this.stateType = "GameState.PATHEND";
                    this.gameStateManager = state;
                    this.gameStateManager.controller.findPath();
                    this.gameStateManager.controller.resetView();
                    this.gameStateManager.controller.removeButtonView();
                }
                update() {
                    this.gameStateManager.change(new Initial_1.Initial(this.gameStateManager));
                }
            };
            exports_1("PathEnd", PathEnd);
        }
    };
});
