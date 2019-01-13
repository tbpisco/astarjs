System.register([], function (exports_1, context_1) {
    "use strict";
    var Button;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Button = class Button extends PIXI.Sprite {
                constructor(x, y, width, height) {
                    super();
                    this.create(x, y, width, height);
                }
                create(x, y, width, height) {
                    let gfx = new PIXI.Graphics();
                    gfx.beginFill(0xffffff, 1);
                    gfx.drawRoundedRect(0, 0, width, height, height / 5);
                    gfx.endFill();
                    this.texture = gfx.generateCanvasTexture();
                    this.x = x;
                    this.y = y;
                    this.anchor.x = 0.5;
                    this.anchor.y = 0.5;
                    var style = new PIXI.TextStyle({
                        fontFamily: 'Arial',
                        fontSize: 16,
                        fontWeight: 'bold',
                        fill: ['#000'],
                        wordWrap: true,
                        align: 'center',
                        wordWrapWidth: width
                    });
                    this._text = new PIXI.Text("", style);
                    this._text.anchor = new PIXI.ObservablePoint(() => { }, this, 0.5, 0.5);
                    this.addChild(this._text);
                    this.interactive = true;
                    this.on("mousedown", () => {
                        this.onDown();
                    }, this);
                    this.on("mouseup", () => {
                        this.onUp();
                    }, this);
                    this.on("mouseover", () => {
                        this.onHover();
                    }, this);
                    this.on("mouseout", () => {
                        this.onOut();
                    }, this);
                }
                setText(val, style) {
                    this._text.text = val;
                    if (style)
                        this._text.style = style;
                }
                onDown() {
                    console.log('Clicked');
                    this.y += 5;
                    this.tint = 0xffffff;
                }
                onUp() {
                    console.log('onup');
                    if (typeof (this._cb) === 'function') {
                        this._cb();
                    }
                    this.y -= 5;
                    this.tint = 0xF8A9F9;
                }
                onHover() {
                    console.log('On Hover');
                    this.tint = 0xF8A9F9;
                    this.scale.x = 1.2;
                    this.scale.y = 1.2;
                }
                onOut() {
                    console.log('On Out');
                    this.tint = 0xffffff;
                    this.scale.x = 1;
                    this.scale.y = 1;
                }
                get clicked() {
                    return this._cb;
                }
                set clicked(cb) {
                    this._cb = cb;
                }
            };
            exports_1("default", Button);
        }
    };
});
