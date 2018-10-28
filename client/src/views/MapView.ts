import * as PIXI from 'pixi.js';
import { Map } from '../models/Map';

export class MapView {

    private domElement : HTMLDivElement;
    private size:number = 40;
    private graphics = new PIXI.Graphics();

    constructor(domElementID:string){

        let domElement = document.body.querySelector(domElementID);
        if(domElement)this.domElement = domElement as HTMLDivElement;

    }

    createStage(map:Map){

        var row = map.get().length;
        var col = map.get()[0].length;
        var app = new PIXI.Application(this.size*col, this.size*row, { antialias: true });
        this.domElement.appendChild(app.view);

        map.get().forEach((elementRow, indexRow) => {
            elementRow.forEach((elementCol, indexCol) => {
               this.drawRectangle(this.graphics, elementCol, indexCol, indexRow);
            })
        })

        app.stage.addChild(this.graphics);
    }

    highlightRectangule(row: number, col: number){
        this.graphics.lineStyle(4, 0x00FF00, 1);
        this.graphics.fillAlpha = 0;
        this.graphics.drawRect(col*this.size, row*this.size, this.size, this.size);
        this.graphics.fillAlpha = 1;
    }

    drawRectangle(graphics: PIXI.Graphics, element: number | string, col: number, row: number){
        graphics.lineStyle(2, 0x333333, 1);
        graphics.beginFill(this.getColourByType(element), 1);
        graphics.drawRect(col*this.size, row*this.size, this.size, this.size);
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
    
}