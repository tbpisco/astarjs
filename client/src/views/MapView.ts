import * as PIXI from 'pixi.js';
import { Map } from '../models/Map';
import { ButtonElement } from './ButtonElement';

export class MapView {
 
    private domElement : HTMLDivElement;
    private size:number = 40;
    private buttons: ButtonElement[] = [];
    private app:PIXI.Application; 

    constructor(domElementID:string){

        let domElement = document.body.querySelector(domElementID);
        if(domElement)this.domElement = domElement as HTMLDivElement;
        
    }

    createStage(map:Map){

        var row = map.get().length;
        var col = map.get()[0].length;
        this.app = new PIXI.Application(this.size*col, this.size*row, { antialias: true });
        this.domElement.appendChild(this.app.view);

        map.get().forEach((elementRow, indexRow) => {
            elementRow.forEach((elementCol, indexCol) => {
                let button = new ButtonElement(elementCol, indexCol, indexRow);
                this.buttons.push(button);
                button.x = indexCol*this.size;
                button.y =  indexRow*this.size;
                this.app.stage.addChild(button);
            })
        })
    }

    highlightRectangule(row: number, col: number){

        let button;

        for (let index = 0; index < this.buttons.length; index++) {
            const element = this.buttons[index];
            if(this.buttons[index].getRow() == row 
                && this.buttons[index].getCol() == col){
                    button = this.buttons[index];
                    button.highlight();
                    this.app.stage.removeChild(button);
                    this.app.stage.addChildAt(button, this.app.stage.children.length - 1);
                    break;
            }
        }
        
    }

    
    
}