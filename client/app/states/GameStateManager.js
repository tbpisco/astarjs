System.register(["./Initial"], function (exports_1, context_1) {
    "use strict";
    var Initial_1, GameStateManager;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Initial_1_1) {
                Initial_1 = Initial_1_1;
            }
        ],
        execute: function () {
            GameStateManager = class GameStateManager {
                constructor(controller) {
                    this.currentState = new Initial_1.Initial(this);
                    this.previousState = [];
                    this.controller = controller;
                }
                change(state) {
                    this.previousState.push(this.currentState);
                    this.currentState = state;
                    this.controller.updateInstructions(this.currentState.instructions);
                }
                start() {
                    this.currentState.update();
                }
                update(type) {
                    this.currentState.update(type);
                }
            };
            exports_1("GameStateManager", GameStateManager);
        }
    };
});
