import { MapView } from '../views/MapView';
import { Map } from '../models/Map';
import { Node } from '../models/Node';

export class AppController {


    private mapView = new MapView("#map");

    private map = new Map([["e", 1 ,0, 0, 0, 0],
                            [0, 1 ,0, 0, 0, 0],
                            [0, 0 ,0, 0, 0, 0],
                            [1, 1 ,1, 1, 0, 0],
                            [0, 0 ,0, 0, 0, 0],
                            [0, 0 ,1, 0, 0, 0],
                            [0, 0 ,0, 1, 1, 0],
                            [1, 0 ,0, 0, "s" ,0]]);

    private closedList: Node[];
    private openList: Node[];
    private firstElement: Node;
    private lastElement: Node;

    constructor(){

        this.closedList = [];
        this.openList = [];
        this.firstElement = this.findStart(this.map);
        this.lastElement = this.findEnd(this.map);
        this.findBestPath(this.firstElement, this.lastElement, this.map);
        
    }

    findBestPath(firstElement: Node, lastElement:Node, map: Map){

        this.closedList.push(firstElement);

        this.openList = this.findValidAdjacents(map, this.closedList[this.closedList.length -1], this.closedList, this.openList);
        if(this.openList.length > 0)this.closedList.push(this.openList.pop() as Node);

        var isFinished: boolean = false;

        while(!isFinished){
            
            this.openList = this.findValidAdjacents(map, this.closedList[this.closedList.length -1], this.closedList, this.openList);
        
            if(this.openList.length > 0)this.closedList.push(this.openList.pop() as Node);

            isFinished = this.isObjectEqual(this.closedList[this.closedList.length-1],lastElement) || this.openList.length == 0;
        }

        if(this.openList.length > 0){
            this.showNodes(this.closedList[this.closedList.length-1])
        } else {
            console.log("There is no solution.");
        }
    }

    findEnd(map:Map): Node {
        return this.findElement(map, "e");
    }

    findStart(map:Map): Node {
        return this.findElement(map, "s");
    }

    findElement(map:Map, value:string): Node {

        let el = new Node(0,0);
        map.get().forEach((element, indexRow) => {
            element.forEach((element, indexCol) => {
                if(element == value){
                    el = new Node(indexRow, indexCol);
                }
            });
        });
        return el;
    }

    getValueMove(node:Node, nodeNew:Node){
        if(node.getRow() != nodeNew.getRow() && node.getCol() != nodeNew.getCol()) return 14;
            else return 10;
    }

    distanceBetweenNodes(nodeInitial:Node, nodeFinal:Node, val:number){
        let col = Math.abs(nodeFinal.getCol() - nodeInitial.getCol());
        let row = Math.abs(nodeFinal.getRow() - nodeInitial.getRow());
        return col*val + row*val;
    }

    isObjectEqual(element:Node, element0:Node):boolean{
        return (element.getRow() == element0.getRow() && element.getCol() == element0.getCol());
    }

    showNodes(node:Node){
        console.log(node.getRow()  + " - " + node.getCol());
        if(node.getParent()){
            this.showNodes(node.getParent());
        }
    }

    findAdjacents(map:Map, node:Node) : Node[] {

        let adjacents: Node[] = [];

        let verify = [[-1,-1], [-1,0] , [-1, 1],
                      [0,-1], [0,1],
                      [1,-1], [1,0] , [1, 1]];

        let mapElements = map.get();
        
        for(let v = 0; v < verify.length; v++){

          var x = node.getRow() + verify[v][0];
          var y = node.getCol() + verify[v][1];

          if(x > -1 && y > -1 && x < mapElements.length && y < mapElements[x].length 
            && (mapElements[x][y] == 0 || mapElements[x][y] == "e" )){
                adjacents.push(new Node(x, y));
          }
        }

        return adjacents;
    }


    findValidAdjacents(map:Map, node:Node, closedList:Node[], openList: Node[]){
        
        let validAdjacents = this.findAdjacents(map, node).filter(
            (elementAdjacent) => {
                return closedList.some((element) => {
                    return !(element.getRow() == elementAdjacent.getRow() && element.getCol() == elementAdjacent.getCol())
                })
            });

        let validAdjacentsOpenList = validAdjacents.filter(
            (elementAdjacent) => {
                return openList.some((element) => {
                    return (element.getRow() == elementAdjacent.getRow() && element.getCol() == elementAdjacent.getCol())
                })
            });

        validAdjacentsOpenList.map((elementAdjacent) => {

            let validElement = openList.filter((element) => (element.getRow() == elementAdjacent.getRow() && element.getCol() == elementAdjacent.getCol()))[0];
            if(validElement.getG() < (node.getG() + this.getValueMove(validElement, node))){
                validElement.setG(this.getValueMove(validElement, node));
                validElement.setParent(node);
            }
        });

        let validAdjacentsNewOpenList = validAdjacents.filter(
            (elementAdjacent) => {
                return !openList.some((element) => {
                    return (element.getRow() == elementAdjacent.getRow() && element.getCol() == elementAdjacent.getCol())
                })
            });


        validAdjacentsNewOpenList.forEach((element) => {
            element.setParent(node);
            element.setH(this.distanceBetweenNodes(element, this.lastElement, 10));
            element.setG(this.getValueMove(node, element));
            element.setValue(element.getG() + element.getH());
            openList.push(element);
            
        });
        
        openList.sort((a,b) => b.getValue() - a.getValue());
        
        return openList;  
      }
}