System.register(["./Build", "./PathEnd"], function (exports_1, context_1) {
    "use strict";
    var Build_1, PathEnd_1, GameState;
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
            GameState = class GameState {
                constructor(controller) {
                    this.currentState = new Build_1.Build(this);
                    this.previousState = [];
                    this.controller = controller;
                }
                change(state) {
                    this.previousState.push(this.currentState);
                    this.currentState = state;
                    this.controller.updateInstructions(this.currentState.instructions);
                    if (this.currentState instanceof PathEnd_1.PathEnd) {
                        this.controller.findPath();
                        this.controller.resetView();
                    }
                }
                start() {
                    this.currentState.update();
                }
                update() {
                    this.currentState.update();
                }
            };
            exports_1("GameState", GameState);
        }
    };
});
