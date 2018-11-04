export class ButtonElement extends PIXI.Sprite {

    private size:number = 40;
    private col:number;
    private row:number;
    private element: number | string;

    constructor(element: number | string, col: number, row :number){
        super();
        this.col = col;
        this.row = row;
        this.element = element;
        this.create(element, col, row);
    }

    getCol(){
        return this.col;
    }

    getRow(){
        return this.row;
    }

    create(element: number | string, col: number, row: number){
        
        this.texture = this.drawRectangle(element, col, row);

        this.on("mousedown", () => {
            this.onClick();
        }, this);

        this.interactive = true;
        this.buttonMode = true;
    }

    drawRectangle( element: number | string, col: number, row: number){
        let graphics = new PIXI.Graphics();
        graphics.lineStyle(2, 0x333333, 1, 0);
        graphics.beginFill(this.getColourByType(element), 1);
        graphics.drawRect(0, 0, this.size-2, this.size-2);
        return graphics.generateCanvasTexture();
    }

    highlight(){
        let graphics = new PIXI.Graphics();
        graphics.lineStyle(4, 0x00FF00, 1, 0);
        graphics.beginFill(this.getColourByType(this.element), 1);
        graphics.drawRect(0, 0, this.size-4, this.size-4);
        this.texture = graphics.generateCanvasTexture();
    }

    getColourByType(type: number | string) : number{
        switch(type){
            case "e":
                return 0xFF0000;
            break;
            case "s":
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

    onClick(){
        alert(`col:${this.col}- row:${this.row}`);
    }
}