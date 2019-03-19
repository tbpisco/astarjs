System.register(["./Build"], function (exports_1, context_1) {
    "use strict";
    var Build_1, PathEnd;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Build_1_1) {
                Build_1 = Build_1_1;
            }
        ],
        execute: function () {
            PathEnd = class PathEnd {
                constructor(state) {
                    this.instructions = "done!";
                    this.stateType = "GameState.PATHEND";
                    this.gameState = state;
                }
                update() {
                    this.gameState.change(new Build_1.Build(this.gameState));
                }
            };
            exports_1("PathEnd", PathEnd);
        }
    };
});
