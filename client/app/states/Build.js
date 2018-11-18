System.register([], function (exports_1, context_1) {
    "use strict";
    var Build;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Build = class Build {
                constructor(state) {
                    this.instructions = "To create your own map CLICK on the SQUARES or switch to RANDOM mode.";
                    this.stateType = "GameState.BUILD";
                    this.gameState = state;
                }
                update() {
                }
            };
            exports_1("Build", Build);
        }
    };
});
