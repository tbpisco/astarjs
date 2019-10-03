import { Node } from "./Node";

export enum Types {
    START,
    END,
    WALKABLE,
    NON_WALKABLE
}

export class PathFinding {

	private DEFAULT_DISTANCE:number = 10;
	private DIAGONAL_DISTANCE:number = 14;
	private walkableTypes:number[] = [];
	private start:number;
	private end:number;

    constructor(){

	}
	
	public setWalkable(...args:number[]){
		this.walkableTypes = this.walkableTypes.concat(...args);
		return this;
	}

	public setStart(start:number){
		this.start = start;
		return this;
	}

	public setEnd(end:number){
		this.end = end;
		return this;
	}

	private gameMapToPathfind(map: number[][]): number[][] {
        return map.map(row=>{
            return row.map(id => {
				if(this.start == id){
					return Types.START;
				} else if(this.end == id){
					return Types.END;
				} else if(this.walkableTypes.indexOf(id) > -1){
                      return Types.WALKABLE;
                  } else {
                      return Types.NON_WALKABLE;
                  }
             });
        });
    }

    public find(map: number[][]): {col:number,row:number}[]{
		if(!this.start){
			throw new Error('There is no start point. Please, use setStart() to configure the path\'s start point.');
		}

		if(!this.end){
			throw new Error('There is no end point. Please, use setEnd() to configure the path\'s end point.');
		}

		let finalMap:number[][] = this.gameMapToPathfind(map);
        let firstElement = this.findStartElement(finalMap);
		let lastElement = this.findEndElement(finalMap);
        return this.findBestPath(firstElement, lastElement, finalMap);
    }

	private findStartElement(map:number[][]): Node {
		return this.findElement(map, Types.START);
	}

	private findEndElement(map:number[][]): Node {
		return this.findElement(map, Types.END);
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

    private findBestPath(firstElement: Node, lastElement:Node, map: number[][]): {col:number,row:number}[]{

		let closedList: Node[] = [];
		let openList: Node[]= [];
		let isFinished: boolean = false;

        closedList.push(firstElement);

        while(!isFinished){
            openList = this.findValidAdjacents(map, closedList[closedList.length -1], closedList, openList, lastElement);
			if(openList.length > 0)closedList.push(openList.pop() as Node);
            isFinished = this.isNodeEqual(closedList[closedList.length-1],lastElement) || openList.length == 0;
        }

        return (openList.length > 0) ? this.getPath(closedList[closedList.length-1]) : [];
    }

	private findValidAdjacents(map:number[][], currentNode:Node, closedList:Node[], openList: Node[], lastElement:Node){

    	//get all adjacents position possibilities that we don't have in the closed list
		let validAdjacents = this.findAdjacents(map, currentNode).filter(
			(elementAdjacent:Node) => {
				return !closedList.some((element:Node) => {
					return this.isNodeEqual(element, elementAdjacent)
				})
			});

		//get all adjacents position possibilities that we have in the open list and don't have inside the closed list
		let validAdjacentsOpenList = validAdjacents.filter(
			(elementAdjacent:Node) => {
				return openList.some((element:Node) => {
					return this.isNodeEqual(element, elementAdjacent)
				})
			});

		//update distance values if the new potencial Node position on the path is longer than the current one
		validAdjacentsOpenList.forEach((elementAdjacent:Node) => {
			let validElement = openList.filter((element:Node) => this.isNodeEqual(element, elementAdjacent))[0];
			if( currentNode.getG() + this.getMoveValue(validElement, currentNode) < validElement.getG()){
				validElement.setG(this.getMoveValue(validElement, currentNode));
				validElement.setParent(currentNode);
			}
		});

		//get all adjacents posiiton possibilities that we don't have in the open list and don't have inside the closed list
		let validAdjacentsNewOpenList = validAdjacents.filter(
			(elementAdjacent:Node) => {
				return !openList.some((element:Node) => {
					return this.isNodeEqual(element, elementAdjacent)
				})
			});

		//update distance values for the potencial new positions in the open list
		validAdjacentsNewOpenList.forEach((element) => {
			element.setParent(currentNode);
			element.setH(this.distanceBetweenNodes(element, lastElement, this.DEFAULT_DISTANCE));
			element.setG(this.getMoveValue(currentNode, element));
			openList.push(element);
		});

		openList.sort((a,b) => b.getValue() - a.getValue());

		return openList;
	}

	private distanceBetweenNodes(initialNode:Node, finalNode:Node, val:number){
		let col = Math.abs(finalNode.getCol() - initialNode.getCol());
		let row = Math.abs(finalNode.getRow() - initialNode.getRow());
		return col*val + row*val;
	}

	private getMoveValue(node:Node, newNode:Node){
		if(node.getRow() != newNode.getRow() && node.getCol() != newNode.getCol()) return this.DIAGONAL_DISTANCE;
		else return this.DEFAULT_DISTANCE;
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

	private nodeToObject(node:Node){
		return {col: node.getCol(), row: node.getRow()};
	}

	private isNodeEqual(element:Node, element0:Node):boolean{
        return (element.getRow() == element0.getRow() && element.getCol() == element0.getCol());
	}

}