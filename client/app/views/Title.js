System.register([], function (exports_1, context_1) {
    "use strict";
    var Title;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Title = class Title extends PIXI.Text {
                constructor(text, width) {
                    var style = new PIXI.TextStyle({
                        fontFamily: 'Arial',
                        fontSize: 36,
                        fontWeight: 'bold',
                        fill: ['#c3087e', '#e2961b'],
                        stroke: '#000',
                        strokeThickness: 5,
                        dropShadow: true,
                        dropShadowColor: '#000000',
                        dropShadowBlur: 4,
                        dropShadowAngle: Math.PI / 6,
                        dropShadowDistance: 6,
                        wordWrap: true,
                        align: 'center',
                        wordWrapWidth: width
                    });
                    super(text, style);
                }
            };
            exports_1("Title", Title);
        }
    };
});
