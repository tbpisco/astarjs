import { Rectangle, Texture } from "pixi.js";

export enum TILE {
    GREEN,
    WATER,
    TREES,
    START,
    END,
    BORDER_TOP_LEFT,
    BORDER_MIDDLE_LEFT,
    BORDER_BOTTOM_LEFT,
    BORDER_TOP_MIDDLE,
    BORDER_BOTTOM_MIDDLE,
    BORDER_TOP_RIGHT,
    BORDER_MIDDLE_RIGHT,
    BORDER_BOTTOM_RIGHT,
    MOUNTAIN,
    MOUNTAIN_BROWN,
    TOP_RIGHT,
    TOP_LEFT,
    TOP,
    BOTTOM,
    RIGHT,
    LEFT,
    BOTTOM_LEFT,
    BOTTOM_RIGHT
}

export class Tile extends PIXI.Sprite {

    private size : number;
    private col : number;
    private row : number;
    public type : number;
    public typePos : number = 0;
    public availableTypes : number[] = [TILE.GREEN, TILE.WATER, TILE.TREES, TILE.MOUNTAIN, TILE.MOUNTAIN_BROWN]; 
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
        let background = [TILE.WATER, TILE.TREES, TILE.START, TILE.END, 
            TILE.MOUNTAIN, TILE.MOUNTAIN_BROWN, TILE.TOP_RIGHT, TILE.TOP_LEFT, TILE.TOP,
            TILE.BOTTOM, TILE.RIGHT, TILE.LEFT, TILE.BOTTOM_LEFT, TILE.BOTTOM_RIGHT];
        if(background.indexOf(this.type) > -1)this.background.visible = true;
            else this.background.visible = false;

        this.element.texture = new PIXI.Texture(this.tex, 
            this.getFrameByType(this.type), 
            new Rectangle(0, 0, this.texSize, this.texSize), 
            new Rectangle(0, 0, this.size, this.size));
    }

    highlight(direction:number){
        if(this.type == TILE.START || this.type == TILE.END)return;
        this.type = direction;
        this.update();
    }

    getFrameByType(type: number) : PIXI.Rectangle {
        switch(type){
            case TILE.BOTTOM_LEFT:
                return new Rectangle(0*16,41*16,this.texSize,this.texSize);
            break;
            case TILE.BOTTOM_RIGHT:
                return new Rectangle(1*16,41*16,this.texSize,this.texSize);
            break;
            case TILE.LEFT:
                return new Rectangle(1*16,40*16,this.texSize,this.texSize);
            break;
            case TILE.RIGHT:
                return new Rectangle(2*16,40*16,this.texSize,this.texSize);
            break;
            case TILE.BOTTOM:
                return new Rectangle(3*16,40*16,this.texSize,this.texSize);
            break;
            case TILE.TOP:
                return new Rectangle(4*16,40*16,this.texSize,this.texSize);
            break;
            case TILE.TOP_LEFT:
                return new Rectangle(5*16,40*16,this.texSize,this.texSize);
            break;
            case TILE.TOP_RIGHT:
                return new Rectangle(6*16,40*16,this.texSize,this.texSize);
            break;
            case TILE.MOUNTAIN_BROWN:
                return new Rectangle(6*16,28*16,this.texSize,this.texSize);
            break;
            case TILE.MOUNTAIN:
                return new Rectangle(6*16,3*16,this.texSize,this.texSize);
            break;
            case TILE.BORDER_BOTTOM_RIGHT:
                return new Rectangle(2*16,30*16,this.texSize,this.texSize);
            break;
            case TILE.BORDER_MIDDLE_RIGHT:
                return new Rectangle(2*16,29*16,this.texSize,this.texSize);
            break;
            case TILE.BORDER_TOP_RIGHT:
                return new Rectangle(2*16,28*16,this.texSize,this.texSize);
            break;
            case TILE.BORDER_BOTTOM_MIDDLE:
                return new Rectangle(1*16,30*16,this.texSize,this.texSize);
            break;
            case TILE.BORDER_TOP_MIDDLE:
                return new Rectangle(1*16,28*16,this.texSize,this.texSize);
            break;
            case TILE.BORDER_BOTTOM_LEFT:
                return new Rectangle(0*16,30*16,this.texSize,this.texSize);
            break;
            case TILE.BORDER_MIDDLE_LEFT:
                return new Rectangle(0*16,29*16,this.texSize,this.texSize);
            break;
            case TILE.BORDER_TOP_LEFT:
                return new Rectangle(0*16,28*16,this.texSize,this.texSize);
            break;
            case TILE.END:
                return new Rectangle(2*16,6*16,this.texSize,this.texSize);
            break;
            case TILE.START:
                return new Rectangle(3*16,6*16,this.texSize,this.texSize);
            break;
            case TILE.GREEN:
                return new Rectangle(16,0,this.texSize,this.texSize);
            break;
            case TILE.WATER:

                return new Rectangle(2*16,1*16,this.texSize,this.texSize);
            break;
            case TILE.TREES:
                return new Rectangle(5*16,0,this.texSize,this.texSize);
            break;
            default:
                return new Rectangle(0,0,this.texSize,this.texSize);
            break;
        }
    }

}