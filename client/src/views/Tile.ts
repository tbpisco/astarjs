import { Rectangle, Texture } from "pixi.js";

export class Tile extends PIXI.Sprite {

    private size:number;
    private col:number;
    private row:number;
    private _type: number;
    private tex: any;

    constructor(type: number, col: number, row: number, size: number, resources: PIXI.loaders.Resource){
        super();
        this.tex = resources.texture;
        this.col = col;
        this.row = row;
        this.size = size;
        this.type = type;

        this.tex.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

        this.update();
    }

    getCol(){
        return this.col;
    }

    getRow(){
        return this.row;
    }

    disable(){
        //this.off("mousedown", this.onClick, this);
       // this.interactive = false;
       // this.buttonMode = false;
    }

    drawRectangle( type: number, col: number, row: number){
        let graphics = new PIXI.Graphics();
        graphics.lineStyle(2, 0x333333, 1, 0);
        graphics.beginFill(this.getColourByType(type), 1);
        graphics.drawRect(0, 0, this.size-2, this.size-2);
        return graphics.generateCanvasTexture();
    }

    update(){
       /* let graphics = new PIXI.Graphics();
        graphics.lineStyle(2, 0x333333, 1, 0);
        graphics.beginFill(this.getColourByType(this.type), 1);
        graphics.drawRect(0, 0, this.size-2, this.size-2);
        this.texture = graphics.generateCanvasTexture();*/

        this.texture = new PIXI.Texture(this.tex, 
            this.getFrameByType(this.type), 
            new Rectangle(0, 0, this.size, this.size), 
            new Rectangle(0, 0, this.size, this.size));
    }

    highlight(){
        let graphics = new PIXI.Graphics();
        graphics.lineStyle(4, 0x00FF00, 1, 0);
        graphics.beginFill(this.getColourByType(this.type), 1);
        graphics.drawRect(0, 0, this.size-4, this.size-4);
        this.texture = graphics.generateCanvasTexture();
    }

    getFrameByType(type: number) : PIXI.Rectangle {
        switch(type){
            case 12:
                /* bottom right */
                return new Rectangle(2*16,30*16,16,16);
            break;
            case 11:
                /* middle right */
                return new Rectangle(2*16,29*16,16,16);
            break;
            case 10:
                /* top right */
                return new Rectangle(2*16,28*16,16,16);
            break;
            case 9:
                /* bottom middle */
                return new Rectangle(1*16,30*16,16,16);
            break;
            case 8:
                /* top middle */
                return new Rectangle(1*16,28*16,16,16);
            break;
            case 7:
                /* bottom left */
                return new Rectangle(0*16,30*16,16,16);
            break;
            case 6:
                /* middle left */
                return new Rectangle(0*16,29*16,16,16);
            break;
            case 5:
                /* top left */
                return new Rectangle(0*16,28*16,16,16);
            break;
            case 4:
                /* start */
                return new Rectangle(2*16,6*16,16,16);
            break;
            case 3:
                /* start */
                return new Rectangle(3*16,6*16,16,16);
            break;
            case 0:
                /* green */
                return new Rectangle(0,0,16,16);
            break;
            case 1:
                /* water */
                return new Rectangle(16,24*16,16,16);
            break;
            case 2:
                /* trees */
                return new Rectangle(6*16,0,16,16);
            break;
            default:
                /* green */
                return new Rectangle(0,0,16,16);
            break;
        }
    }

    getColourByType(type: number) : number{
        switch(type){
            case 4:
                return 0xFF0000;
            break;
            case 3:
                return 0x00FF00;
            break;
            case 0:
                return 0xFFFFFF;
            break;
            case 1:
                return 0x0000FF;
            break;
            case 2:
                return 0xa52a2a;
            break;
            default:
                return 0x000000;
            break;
        }
    }

    set type(type:number){
        this._type = type;
    }

    get type():number{
        return this._type;
    }

}