System.register(["./PathEnd"], function (exports_1, context_1) {
    "use strict";
    var PathEnd_1, End;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (PathEnd_1_1) {
                PathEnd_1 = PathEnd_1_1;
            }
        ],
        execute: function () {
            End = class End {
                constructor(state) {
                    this.instructions = "Select end position";
                    this.stateType = "GameState.END";
                    this.gameState = state;
                }
                update() {
                    this.gameState.change(new PathEnd_1.PathEnd(this.gameState));
                }
            };
            exports_1("End", End);
        }
    };
});
