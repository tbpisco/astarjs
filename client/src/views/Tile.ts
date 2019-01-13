import { Rectangle, Texture } from "pixi.js";

export class Tile extends PIXI.Sprite {

    private size : number;
    private col : number;
    private row : number;
    public type : number;
    public typePos : number = 0;
    public availableTypes : number[] = [0, 1, 2, 14, 15]; 
    public background : PIXI.Sprite; 
    public element : PIXI.Sprite;
    private tex : any;
    private texSize : number = 16;

    constructor(type: number, col: number, row: number, size: number, resources: PIXI.loaders.Resource){
        super();
        this.tex = resources.texture;
        this.col = col;
        this.row = row;
        this.size = this.texSize;
        this.type = type;

        this.setTypePos(this.type);
        this.scale.set(size/this.texSize);

        this.background = new PIXI.Sprite();
        this.background.anchor.set(0.5,0.5);
        this.background.texture = new PIXI.Texture(this.tex, 
            this.getFrameByType(0), 
            new Rectangle(0, 0, this.texSize, this.texSize), 
            new Rectangle(0, 0, this.size, this.size));
        this.addChild(this.background);

        this.element = new PIXI.Sprite();
        this.element.anchor.set(0.5,0.5);
        this.element.texture = new PIXI.Texture(this.tex, 
            this.getFrameByType(0), 
            new Rectangle(0, 0, this.texSize,this.texSize), 
            new Rectangle(0, 0, this.size, this.size));
        this.addChild(this.element);
            
        this.tex.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        this.update();
    }

    setTypePos(type: number){
        this.typePos = this.availableTypes.indexOf(type);
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

    changeTileType(){
        this.typePos = (this.typePos + 1 ) % 5;
        this.type = this.availableTypes[this.typePos];
    }

    update(){
        let background = [1, 2, 3, 4, 13, 14, 15];
        if(background.indexOf(this.type) > -1)this.background.visible = true;
            else this.background.visible = false;

        this.element.texture = new PIXI.Texture(this.tex, 
            this.getFrameByType(this.type), 
            new Rectangle(0, 0, this.texSize, this.texSize), 
            new Rectangle(0, 0, this.size, this.size));
}

    highlight(){
        if(this.type == 3 || this.type == 4)return;
        this.type = 13;
        this.update();
    }

    getFrameByType(type: number) : PIXI.Rectangle {
        switch(type){
            case 15:
                /* mountain brown*/
                return new Rectangle(6*16,28*16,this.texSize,this.texSize);
            break;
            case 14:
                /* mountain */
                return new Rectangle(6*16,3*16,this.texSize,this.texSize);
            break;
            case 13:
                /* select */
                return new Rectangle(6*16,42*16,this.texSize,this.texSize);
            break;
            case 12:
                /* bottom right */
                return new Rectangle(2*16,30*16,this.texSize,this.texSize);
            break;
            case 11:
                /* middle right */
                return new Rectangle(2*16,29*16,this.texSize,this.texSize);
            break;
            case 10:
                /* top right */
                return new Rectangle(2*16,28*16,this.texSize,this.texSize);
            break;
            case 9:
                /* bottom middle */
                return new Rectangle(1*16,30*16,this.texSize,this.texSize);
            break;
            case 8:
                /* top middle */
                return new Rectangle(1*16,28*16,this.texSize,this.texSize);
            break;
            case 7:
                /* bottom left */
                return new Rectangle(0*16,30*16,this.texSize,this.texSize);
            break;
            case 6:
                /* middle left */
                return new Rectangle(0*16,29*16,this.texSize,this.texSize);
            break;
            case 5:
                /* top left */
                return new Rectangle(0*16,28*16,this.texSize,this.texSize);
            break;
            case 4:
                /* start */
                return new Rectangle(2*16,6*16,this.texSize,this.texSize);
            break;
            case 3:
                /* start */
                return new Rectangle(3*16,6*16,this.texSize,this.texSize);
            break;
            case 0:
                /* green */
                return new Rectangle(16,0,this.texSize,this.texSize);
            break;
            case 1:
                /* water */
                return new Rectangle(2*16,1*16,this.texSize,this.texSize);
            break;
            case 2:
                /* trees */
                return new Rectangle(5*16,0,this.texSize,this.texSize);
            break;
            default:
                /* green */
                return new Rectangle(0,0,this.texSize,this.texSize);
            break;
        }
    }

}