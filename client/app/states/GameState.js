System.register(["./Build"], function (exports_1, context_1) {
    "use strict";
    var Build_1, GameState;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Build_1_1) {
                Build_1 = Build_1_1;
            }
        ],
        execute: function () {
            GameState = class GameState {
                constructor() {
                    this.currentState = new Build_1.Build(this);
                }
                change(state) {
                    this.currentState = state;
                    this.currentState;
                }
                start() {
                    this.currentState.update();
                }
            };
            exports_1("GameState", GameState);
        }
    };
});
