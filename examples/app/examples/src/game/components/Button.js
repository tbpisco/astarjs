"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(x, y, width, height) {
        var _this = _super.call(this) || this;
        _this.create(x, y, width, height);
        return _this;
    }
    Button.prototype.create = function (x, y, width, height) {
        var _this = this;
        var gfx = new PIXI.Graphics();
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
        this._text.anchor = new PIXI.ObservablePoint(function () { }, this, 0.5, 0.5);
        this.addChild(this._text);
        this.interactive = true;
        this.on("mousedown", function () {
            _this.onDown();
        }, this);
        this.on("mouseup", function () {
            _this.onUp();
        }, this);
        this.on("mouseover", function () {
            _this.onHover();
        }, this);
        this.on("mouseout", function () {
            _this.onOut();
        }, this);
    };
    Button.prototype.setText = function (val, style) {
        this._text.text = val;
        if (style)
            this._text.style = style;
    };
    Button.prototype.onDown = function () {
        this.tint = 0xffffff;
    };
    Button.prototype.onUp = function () {
        if (typeof (this._cb) === 'function') {
            this._cb();
        }
        this.tint = 0x333333;
    };
    Button.prototype.onHover = function () {
        this.tint = 0x333333;
        this.scale.x = 1.2;
        this.scale.y = 1.2;
    };
    Button.prototype.onOut = function () {
        this.tint = 0xffffff;
        this.scale.x = 1;
        this.scale.y = 1;
    };
    Object.defineProperty(Button.prototype, "clicked", {
        get: function () {
            return this._cb;
        },
        set: function (cb) {
            this._cb = cb;
        },
        enumerable: true,
        configurable: true
    });
    return Button;
}(PIXI.Sprite));
exports.default = Button;
//# sourceMappingURL=Button.js.map