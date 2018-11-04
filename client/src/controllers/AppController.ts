import { MapView } from '../views/MapView';
import { PathFinding } from '../utils/PathFinding';
import { Node } from '../models/Node';
import { Map } from '../models/Map';


export class AppController {

    private bestPath: PathFinding;

    private mapView: MapView = new MapView("#map");

    private map: Map;/*= new Map([["e", 1 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            ["s", 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0 ,0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
                            [1, 1 ,1, 1, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0],
                            [0, 1 ,1, 1, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0],
                            [0, 1 ,1, 1, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0],
                            [0, 0 ,1, 1, 1, 0, 0, 0, 0, 2, 2, 0, 0, 0],
                            [1, 0 ,1, 0, 0, 0, 0, 0, 1, 2, 2, 0, 0, 0],
                            [0, 0 ,0 , 0, 2, 0, 0, 1, 1, 1, 1, 0, 0, 0],
                            [0, 0 ,0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0]]);*/

    constructor(){

        this.map = this.createRandomMap();
        this.mapView.createStage(this.map);
        let bestPath = PathFinding.find(this.map);
        if(bestPath)this.showResult(bestPath, this.showNodes);

    }

    createRandomMap(): Map{
        let array: (string | number)[][] = [];
        for (let index = 0; index < 10; index++) {
            array.push(new Array(14+1).join("0").split("").map((element) => {
                let num = Math.floor(Math.random()*10);
                if(num < 8){
                    return 0;
                } else if(num == 8){
                    return 1;
                } else {
                    return 2;
                }
            }));
        }

        let r = Math.floor(Math.random()*10);
        let c = Math.floor(Math.random()*14);

        array[r][c] = "s";

        let r0 = Math.floor(Math.random()*10);
        let c0 = Math.floor(Math.random()*14);

        while(r0 == r && c0 == c){
            r0 = Math.floor(Math.random()*10);
            c0 = Math.floor(Math.random()*14);
            console.log("repetiu")
        }
        array[r0][c0] = "e";

        return new Map(array);
        
    }

    showResult(node:Node, draw: Function){

        let currentNode = node;
        while(currentNode){
            draw.apply(this, [currentNode]);
            currentNode = currentNode.getParent();
        }

    }

    showNodes(node:Node){

        this.mapView.highlightRectangule(node.getRow(), node.getCol());

    }

}