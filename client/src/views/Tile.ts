import { Rectangle, Texture } from "pixi.js";

export class Tile extends PIXI.Sprite {

    private size : number;
    private col : number;
    private row : number;
    public type : number;
    public background : PIXI.Sprite; 
    public element : PIXI.Sprite;
    private tex : any;

    constructor(type: number, col: number, row: number, size: number, resources: PIXI.loaders.Resource){
        super();
        this.tex = resources.texture;
        this.col = col;
        this.row = row;
        this.size = size;
        this.type = type;

        this.background = new PIXI.Sprite();
        this.background.texture = new PIXI.Texture(this.tex, 
            this.getFrameByType(0), 
            new Rectangle(0, 0, this.size, this.size), 
            new Rectangle(0, 0, this.size, this.size));

        this.addChild(this.background);

        this.element = new PIXI.Sprite();
        this.element.texture = new PIXI.Texture(this.tex, 
            this.getFrameByType(0), 
            new Rectangle(0, 0, this.size, this.size), 
            new Rectangle(0, 0, this.size, this.size));

        this.addChild(this.element);
            
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
       this.interactive = false;
       this.buttonMode = false;
    }

    update(){
        let background = [1, 2, 3, 4, 13];
        if(background.indexOf(this.type) > -1)this.background.visible = true;
            else this.background.visible = false;

        this.element.texture = new PIXI.Texture(this.tex, 
            this.getFrameByType(this.type), 
            new Rectangle(0, 0, this.size, this.size), 
            new Rectangle(0, 0, this.size, this.size));

    }

    highlight(){
        if(this.type == 3 || this.type == 4)return;
        this.type = 13;
        this.update();
    }

    getFrameByType(type: number) : PIXI.Rectangle {
        switch(type){
            case 13:
                /* select */
                return new Rectangle(6*16,42*16,16,16);
            break;
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
                return new Rectangle(16,0,16,16);
            break;
            case 1:
                /* water */
                return new Rectangle(2*16,1*16,16,16);
                //return new Rectangle(16,24*16,16,16);
            break;
            case 2:
                /* trees */
                return new Rectangle(5*16,0,16,16);
            break;
            default:
                /* green */
                return new Rectangle(0,0,16,16);
            break;
        }
    }

}