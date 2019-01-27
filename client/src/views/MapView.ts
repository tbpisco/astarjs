import * as PIXI from 'pixi.js';
import { MapModel } from '../models/MapModel';
import { TILE, Tile } from './Tile';

export class MapView {
 
    private size:number;
    public tiles = new Map();
    private map: MapModel;
    private container: PIXI.Container = new PIXI.Container();

    constructor(size: number){
        this.size = size;
    }

    createStage(map:MapModel, resources: PIXI.loaders.Resource): PIXI.Container {

        this.map = map;
        this.map.get().forEach((elementRow, indexRow) => {
            elementRow.forEach((elementCol, indexCol) => {
                let button = new Tile(elementCol, indexCol, indexRow, this.size, resources);
                button.interactive = true;
                button.buttonMode = true;
                button.on("mousedown", this.onClick.bind(this, button), this);
                let trapFunction = this.update.bind(this);
                let tile = new Proxy(button , {
                    set (target, key, value) {
                        if(key === "_textureID"){
                            trapFunction(target);
                        }
                        return Reflect.set(target, key, value);
                    }
                });
                
                this.tiles.set(`${indexCol}-${indexRow}`, button );
                tile.x = indexCol*this.size;
                tile.y =  indexRow*this.size;
                this.container.addChild(tile);
            })
        })

        this.createBorder(resources, this.map.getCol(), this.map.getRow());

        return this.container;
    }

    createBorder(resources:any, col:number, row:number){

        this.createElementBorder(TILE.BORDER_TOP_LEFT, -1, -1, resources);

        for (let index = 0; index < row; index++) {
            this.createElementBorder(TILE.BORDER_MIDDLE_LEFT, -1, index, resources);
        }

        this.createElementBorder(TILE.BORDER_BOTTOM_LEFT, -1, row, resources);

        for (let index = 0; index < row; index++) {
            this.createElementBorder(TILE.BORDER_MIDDLE_RIGHT, col, index, resources);
        }

        this.createElementBorder(TILE.BORDER_TOP_RIGHT, col, -1, resources);
        
        for (let index = 0; index < col; index++) {
            this.createElementBorder(TILE.BORDER_TOP_MIDDLE, index, -1, resources);
        }

        this.createElementBorder(TILE.BORDER_BOTTOM_RIGHT, col, row, resources);

        for (let index = 0; index < col; index++) {
            this.createElementBorder(TILE.BORDER_BOTTOM_MIDDLE, index, row, resources);
        }
    }

    createElementBorder(type : number, x : number, y : number, resources:any){
        let border = new Tile(type, 0, 0, this.size, resources);
        border.x = x*this.size;
        border.y = y*this.size;
        this.container.addChild(border);
    }

    update(tile:Tile){
        this.map.get()[tile.getRow()][tile.getCol()] = tile.type;
    }

    onClick(button:Tile){
        button.changeTileType();
        button.update();
    }

    disableTiles(){
       // this.tiles.forEach((element) => element.disable());
    }

    highlightRectangule(row: number, col: number, parentRow: number, parentCol: number){
        let tile = this.tiles.get(`${col}-${row}`);
        let direction = TILE.RIGHT;
        if(col > parentCol && row === parentRow){
            direction = TILE.RIGHT;
        } else if(col < parentCol && row === parentRow){
            direction = TILE.LEFT;
        } else if(col == parentCol && row < parentRow){
            direction = TILE.TOP;
        } else if(col == parentCol && row > parentRow){
            direction = TILE.BOTTOM;
        } else if(col < parentCol && row > parentRow){
            direction = TILE.BOTTOM_LEFT;
        } else if(col < parentCol && row < parentRow){
            direction = TILE.TOP_LEFT;
        } else if(col > parentCol && row < parentRow){
            direction = TILE.TOP_RIGHT;
        } else if(col > parentCol && row > parentRow){
            direction = TILE.BOTTOM_RIGHT;
        }
        tile.highlight(direction);        
    }

    
    
}