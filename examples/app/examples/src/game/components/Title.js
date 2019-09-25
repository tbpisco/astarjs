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
var Title = (function (_super) {
    __extends(Title, _super);
    function Title(text, width) {
        var _this = this;
        var style = new PIXI.TextStyle({
            fontFamily: 'FuturaHandwritten',
            fontSize: 36,
            fontWeight: 'bold',
            fill: '#c3087e',
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 3,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 2,
            wordWrap: true,
            align: 'center',
            wordWrapWidth: width
        });
        _this = _super.call(this, text, style) || this;
        return _this;
    }
    return Title;
}(PIXI.Text));
exports.Title = Title;
//# sourceMappingURL=Title.js.map