export default class Button extends PIXI.Sprite {

    private _text: PIXI.Text;

    private _cb: Function;

    constructor(x: number, y: number, width: number, height: number) {
        super();
        this.create(x, y, width, height);
    }

    create(x: number, y: number, width: number, height: number) {

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
            align : 'center',
            wordWrapWidth: width
        });

        this._text = new PIXI.Text("", style);
        this._text.anchor = new PIXI.ObservablePoint(()=>{},this, 0.5, 0.5);
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

    public setText(val: string, style?: PIXI.TextStyle) {
        this._text.text = val;
        if(style)this._text.style = style;
    }

    private onDown() {
        this.tint = 0xffffff;
    }

    private onUp() {
        if(typeof(this._cb) === 'function') {
            this._cb();
        }
        this.tint = 0x333333;
    }

    private onHover() {
        this.tint = 0x333333;
        this.scale.x = 1.2;
        this.scale.y = 1.2;
    }

    private onOut() {
        this.tint = 0xffffff;
        this.scale.x = 1;
        this.scale.y = 1;
    }

    public get clicked() {
        return this._cb;
    }

    public set clicked(cb: Function) {
        this._cb = cb;
    }


}