System.register(["./Start"], function (exports_1, context_1) {
    "use strict";
    var Start_1, Build;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Start_1_1) {
                Start_1 = Start_1_1;
            }
        ],
        execute: function () {
            Build = class Build {
                constructor(state) {
                    this.instructions = "To create your own map CLICK on the SQUARES or switch to RANDOM mode.";
                    this.stateType = "GameState.BUILD";
                    this.gameState = state;
                }
                update() {
                    this.gameState.change(new Start_1.Start(this.gameState));
                }
            };
            exports_1("Build", Build);
        }
    };
});
