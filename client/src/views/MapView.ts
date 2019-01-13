import * as PIXI from 'pixi.js';
import { MapModel } from '../models/MapModel';
import { Tile } from './Tile';

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

        this.createElementBorder(5, -1, -1, resources);

        for (let index = 0; index < row; index++) {
            this.createElementBorder(6, -1, index, resources);
        }

        this.createElementBorder(7, -1, row, resources);

        for (let index = 0; index < row; index++) {
            this.createElementBorder(11, col, index, resources);
        }

        this.createElementBorder(10, col, -1, resources);
        
        for (let index = 0; index < col; index++) {
            this.createElementBorder(8, index, -1, resources);
        }

        this.createElementBorder(12, col, row, resources);

        for (let index = 0; index < col; index++) {
            this.createElementBorder(9, index, row, resources);
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

    highlightRectangule(row: number, col: number){
        let tile = this.tiles.get(`${col}-${row}`);
        tile.highlight();        
    }

    
    
}