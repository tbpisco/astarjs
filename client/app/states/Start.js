System.register(["./End"], function (exports_1, context_1) {
    "use strict";
    var End_1, Start;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (End_1_1) {
                End_1 = End_1_1;
            }
        ],
        execute: function () {
            Start = class Start {
                constructor(state) {
                    this.instructions = "Select start position";
                    this.stateType = "GameState.START";
                    this.gameState = state;
                }
                update() {
                    this.gameState.change(new End_1.End(this.gameState));
                }
            };
            exports_1("Start", Start);
        }
    };
});
