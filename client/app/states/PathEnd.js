System.register([], function (exports_1, context_1) {
    "use strict";
    var PathEnd;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            PathEnd = class PathEnd {
                constructor(state) {
                    this.instructions = "done!";
                    this.stateType = "GameState.PATHEND";
                    this.gameState = state;
                }
                update() {
                }
            };
            exports_1("PathEnd", PathEnd);
        }
    };
});
