System.register([], function (exports_1, context_1) {
    "use strict";
    var Instructions;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Instructions = class Instructions extends PIXI.Text {
                constructor(text, width) {
                    var style = new PIXI.TextStyle({
                        fontFamily: 'Arial',
                        fontSize: 16,
                        fontWeight: 'bold',
                        fill: ['#000'],
                        wordWrap: true,
                        align: 'center',
                        wordWrapWidth: width
                    });
                    super(text, style);
                }
            };
            exports_1("Instructions", Instructions);
        }
    };
});
