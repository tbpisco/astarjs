System.register(["./controllers/AppController"], function (exports_1, context_1) {
    "use strict";
    var AppController_1, controller;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (AppController_1_1) {
                AppController_1 = AppController_1_1;
            }
        ],
        execute: function () {
            controller = new AppController_1.AppController();
        }
    };
});
