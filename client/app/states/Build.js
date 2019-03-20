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
                    this.instructions = "Click DONE once you have finished adding elements to your map.";
                    this.stateType = "GameState.BUILD";
                    this.gameStateManager = state;
                    this.gameStateManager.controller.buildView();
                }
                update() {
                    this.gameStateManager.change(new Start_1.Start(this.gameStateManager));
                }
            };
            exports_1("Build", Build);
        }
    };
});
