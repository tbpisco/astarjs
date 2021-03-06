import Texture = PIXI.Texture;
import Graphics = PIXI.Graphics;
import Rectangle = PIXI.Rectangle;
import Resource = PIXI.loaders.Resource;
import Sprite = PIXI.Sprite;

export enum TILE {
    GREEN,
    GRASS,
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
    BOTTOM_RIGHT,
    HOUSE
}

export class Tile extends Sprite {

    private size : number;
    private col : number;
    private row : number;
    public type : number;
    public typePos : number = 0;
    public availableTypes : number[] = [TILE.GREEN, TILE.GRASS, TILE.HOUSE, TILE.WATER, TILE.TREES, TILE.MOUNTAIN, TILE.MOUNTAIN_BROWN]; 
    public background : Sprite; 
    public element : Sprite;
    private tex : any;
    private texSize : number = 16;

    constructor(type: number, col: number, row: number, size: number, resources: Resource){
        super();
        this.tex = resources.texture;
        this.col = col;
        this.row = row;
        this.size = this.texSize;
        this.type = type;

        this.setTypePos(this.type);
        this.scale.set(size/this.texSize);

        this.background = new Sprite();
        this.background.anchor.set(0.5);
        this.background.texture = this.getTexture(0);
        this.addChild(this.background);

        this.element = new Sprite();
        this.element.anchor.set(0.5);
        this.element.texture = this.getTexture(0);
        this.addChild(this.element);

        if(type != TILE.BORDER_TOP_LEFT && type != TILE.BORDER_MIDDLE_LEFT &&
            type != TILE.BORDER_BOTTOM_LEFT && type != TILE.BORDER_TOP_MIDDLE &&
            type != TILE.BORDER_BOTTOM_MIDDLE && type != TILE.BORDER_TOP_RIGHT &&
            type != TILE.BORDER_MIDDLE_RIGHT && type != TILE.BORDER_BOTTOM_RIGHT){
                let border = new Graphics();
                let borderWidth = 1;
                border.lineStyle(borderWidth,0xa6f27d,0.5);
                border.moveTo(-this.background.width*0.5, -this.background.height*0.5);
                border.lineTo(this.background.width*0.5, -this.background.height*0.5);
                border.lineTo(this.background.width*0.5, this.background.height*0.5);
                border.lineTo(-this.background.width*0.5, this.background.height*0.5);
                border.lineTo(-this.background.width*0.5, -this.background.height*0.5);
                this.addChild(border);
        }
            
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

    enable(){
        this.interactive = true;
        this.buttonMode = true;
    }

    changeTileType(type?:number){
        if(type){
            this.type = type;
        } else {
            this.typePos = (this.typePos + 1 ) % this.availableTypes.length;
            this.type = this.availableTypes[this.typePos];
        }
        this.update();
    }

    update(){
        let background = [TILE.WATER, TILE.HOUSE, TILE.TREES, TILE.START, TILE.END, 
            TILE.MOUNTAIN, TILE.MOUNTAIN_BROWN, TILE.TOP_RIGHT, TILE.TOP_LEFT, TILE.TOP,
            TILE.BOTTOM, TILE.RIGHT, TILE.LEFT, TILE.BOTTOM_LEFT, TILE.BOTTOM_RIGHT];
        if(background.indexOf(this.type) > -1){
            this.background.visible = true;
            this.background.texture = this.getTexture(0);
        } else {
            this.background.visible = false;
        } 

        this.element.texture = this.getTexture(this.type);
    }

    highlight(direction:number){
        if(this.type == TILE.START || this.type == TILE.END)return;
        if(this.type == TILE.GRASS){
            this.type = direction;
            this.update();
            this.background.visible = true;
            this.background.texture = this.getTexture(TILE.GRASS);
        } else {
            this.type = direction;
            this.update();
        }
    }

    getTexture(type: number): Texture {
        return new Texture(this.tex, 
            this.getFrameByType(type), 
            new Rectangle(0, 0, this.texSize, this.texSize), 
            new Rectangle(0, 0, this.size, this.size));
    }

    getFrameByType(type: number): Rectangle {
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
            case TILE.GRASS:
                return new Rectangle(16*3,0,this.texSize,this.texSize);
            break;
            case TILE.WATER:
                return new Rectangle(4*16,2*16,this.texSize,this.texSize);
            break;
            case TILE.HOUSE:
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