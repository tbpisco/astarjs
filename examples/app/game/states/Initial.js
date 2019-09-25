System.register(["./Build", "./PathEnd"], function (exports_1, context_1) {
    "use strict";
    var Build_1, PathEnd_1, Initial;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Build_1_1) {
                Build_1 = Build_1_1;
            },
            function (PathEnd_1_1) {
                PathEnd_1 = PathEnd_1_1;
            }
        ],
        execute: function () {
            Initial = class Initial {
                constructor(state) {
                    this.instructions = "To create your own map CLICK on the SQUARES or switch to RANDOM mode.";
                    this.stateType = "GameState.BUILD";
                    this.gameStateManager = state;
                }
                update(type) {
                    if (type == "random") {
                        this.gameStateManager.change(new PathEnd_1.PathEnd(this.gameStateManager));
                    }
                    else {
                        this.gameStateManager.change(new Build_1.Build(this.gameStateManager));
                    }
                }
            };
            exports_1("Initial", Initial);
        }
    };
});
