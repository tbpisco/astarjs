import * as PIXI from 'pixi.js';
import { Map } from '../models/Map';
import { Tile } from './Tile';

export class MapView {
 
    private size:number;
    private tiles: Tile[] = [];
    private container: PIXI.Container = new PIXI.Container();

    constructor(size: number){

        this.size = size;
        
    }

    createStage(map:Map): PIXI.Container {

        map.get().forEach((elementRow, indexRow) => {
            elementRow.forEach((elementCol, indexCol) => {
                let tile = new Tile(elementCol, indexCol, indexRow, this.size);
                this.tiles.push(tile);
                tile.x = indexCol*this.size;
                tile.y =  indexRow*this.size;
                this.container.addChild(tile);
            })
        })

        return this.container;
    }

    highlightRectangule(row: number, col: number){

        let button;

        for (let index = 0; index < this.tiles.length; index++) {
            const element = this.tiles[index];
            if(element.getRow() == row 
                && element.getCol() == col){
                    button = element;
                    button.highlight();
                    this.container.removeChild(button);
                    this.container.addChildAt(button, this.container.children.length - 1);
                    break;
            }
        }
        
    }

    
    
}