import { Node } from "./Node";

export enum Types {
    START,
    END,
    WALKABLE,
    NON_WALKABLE
}

export class PathFinding {
    
    constructor(){

    }

    public find(map: number[][]): {col:number,row:number}[]{
        let firstElement = this.findStart(map);
        let lastElement = this.findEnd(map);
        return this.findBestPath(firstElement, lastElement, map);
    }

    private findBestPath(firstElement: Node, lastElement:Node, map: number[][]): {col:number,row:number}[]{

		let closedList: Node[] = [];
		let openList: Node[]= [];
		let isFinished: boolean = false;

        closedList.push(firstElement);

        while(!isFinished){
            
            openList = this.findValidAdjacents(map, closedList[closedList.length -1], closedList, openList, lastElement);
            if(openList.length > 0)closedList.push(openList.pop() as Node);
            isFinished = this.isObjectEqual(closedList[closedList.length-1],lastElement) || openList.length == 0;
        }

        if(openList.length > 0){
            return this.getPath(closedList[closedList.length-1]);
        } else {
            return [];
        }
    }

	private nodeToObject(node:Node){
        return {col: node.getCol(), row: node.getRow()};
    }

	private getPath(node:Node):{col:number,row:number}[] {
        let currentNode = node;
        let listPath = [];
        while(currentNode){
            listPath.push(this.nodeToObject(currentNode));
            currentNode = currentNode.getParent();
            if(!currentNode)return listPath.reverse();
        }
        return [];
    }

	private findEnd(map:number[][]): Node {
        return this.findElement(map, Types.END);
    }

	private findStart(map:number[][]): Node {
        return this.findElement(map, Types.START);
    }

	private findElement(map:number[][], value:number): Node {

        let el = new Node(0,0);
        map.forEach((element, indexRow) => {
            element.forEach((element, indexCol) => {
                if(element == value){
                    el = new Node(indexRow, indexCol);
                }
            });
        });
        return el;
        
    }

	private getValueMove(node:Node, nodeNew:Node){
        if(node.getRow() != nodeNew.getRow() && node.getCol() != nodeNew.getCol()) return 14;
            else return 10;
    }

	private distanceBetweenNodes(nodeInitial:Node, nodeFinal:Node, val:number){
        let col = Math.abs(nodeFinal.getCol() - nodeInitial.getCol());
        let row = Math.abs(nodeFinal.getRow() - nodeInitial.getRow());
        return col*val + row*val;
    }

	private isObjectEqual(element:Node, element0:Node):boolean{
        return (element.getRow() == element0.getRow() && element.getCol() == element0.getCol());
    }

	private findAdjacents(map:number[][], node:Node) : Node[] {

        let adjacents: Node[] = [];

        let verify = [[-1,-1], [-1,0] , [-1, 1], [0,-1], 
                      [0,1], [1,-1], [1,0] , [1, 1]];

        let mapElements = map;
        
        for(let v = 0; v < verify.length; v++){

          let x = node.getRow() + verify[v][0];
          let y = node.getCol() + verify[v][1];

          if(x > -1 && y > -1 && x < mapElements.length && y < mapElements[x].length 
            && (mapElements[x][y] == Types.WALKABLE || mapElements[x][y] == Types.END )){
                adjacents.push(new Node(x, y));
          }
        }

        return adjacents;
    }


	private findValidAdjacents(map:number[][], node:Node, closedList:Node[], openList: Node[], lastElement:Node){
        
        let validAdjacents = this.findAdjacents(map, node).filter(
            (elementAdjacent) => {
                return closedList.some((element) => {
                    return !(this.isObjectEqual(element, elementAdjacent))
                })
            });

        let validAdjacentsOpenList = validAdjacents.filter(
            (elementAdjacent) => {
                return openList.some((element) => {
                    return (this.isObjectEqual(element, elementAdjacent))
                })
            });

        validAdjacentsOpenList.map((elementAdjacent) => {
            let validElement = openList.filter((element) => (this.isObjectEqual(element, elementAdjacent)))[0];
            if(( node.getG() + this.getValueMove(validElement, node)) < validElement.getG()){
                validElement.setG(this.getValueMove(validElement, node));
                validElement.setParent(node);
            }
        });

        let validAdjacentsNewOpenList = validAdjacents.filter(
            (elementAdjacent) => {
                return !openList.some((element) => {
                    return (this.isObjectEqual(element, elementAdjacent))
                })
            });


        validAdjacentsNewOpenList.forEach((element) => {
            element.setParent(node);
            element.setH(this.distanceBetweenNodes(element, lastElement, 10));
            element.setG(this.getValueMove(node, element));
            element.setValue(element.getG() + element.getH());
            openList.push(element);
            
        });
        
        openList.sort((a,b) => b.getValue() - a.getValue());
        
        return openList;  
      }

}