import Sprite = PIXI.Sprite;
import Text = PIXI.Text;
import TextStyle = PIXI.TextStyle;
import Graphics = PIXI.Graphics;
import ObservablePoint = PIXI.ObservablePoint;

export default class Button extends Sprite {

    private _text: Text;

    private _cb: Function;
    private _id:string;
    private _selected:boolean;

    public get id():string{
        return this._id;
    }

    public set id(id:string){
        this._id = id;
    }

    constructor(x: number, y: number, width: number, height: number, selected:boolean = false) {
        super();
        this._selected = selected;
        this.create(x, y, width, height);
    }

    create(x: number, y: number, width: number, height: number) {

        let gfx = new Graphics();
        gfx.beginFill(0xffffff, 1);
        gfx.drawRoundedRect(0, 0, width, height, height / 5);
        gfx.endFill();
        this.texture = gfx.generateCanvasTexture();

        if(this._selected){
            this.tint = 0x333333;
        } 

        this.x = x;
        this.y = y;
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;

        let style = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 16,
            fontWeight: 'bold',
            fill: ['#000'],
            wordWrap: true,
            align : 'center',
            wordWrapWidth: width
        });

        this._text = new Text("", style);
        this._text.anchor = new ObservablePoint(()=>{},this, 0.5, 0.5);
        this.addChild(this._text);

        this.interactive = true;

        this.on("mousedown", () => {
            this.onDown();
        }, this);

        this.on("mouseup", () => {
            this.onUp();
        }, this);

        this.on("mouseover", () => {
            if(this._selected)return;
            this.onHover();
        }, this);

        this.on("mouseout", () => {
            if(this._selected)return;
            this.onOut();
        }, this);
    }

    public setText(val: string, style?: TextStyle) {
        this._text.text = val;
        if(style)this._text.style = style;
    }

    private onDown() {
        this.tint = 0xffffff;
        this._selected = true;
    }

    private onUp() {
        if(typeof(this._cb) === 'function') {
            this._cb();
        }
        this.tint = 0x333333;
    }

    private onHover() {
        this.tint = 0x333333;
    }

    private onOut() {
        this.tint = 0xffffff;
    }

    public get clicked() {
        return this._cb;
    }

    public set clicked(cb: Function) {
        this._cb = cb;
    }

    public reset(){
        this._selected = false;
        this.tint = 0xffffff;
    }
}