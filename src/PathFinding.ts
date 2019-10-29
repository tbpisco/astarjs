import { Node } from "./Node";

export enum Types {
    START,
    END,
    WALKABLE,
    NON_WALKABLE
}

export enum Heuristic {
	MANHATTAN,
	DIAGONAL
}

export class PathFinding {

	private DEFAULT_DISTANCE:number = 10;
	private DIAGONAL_DISTANCE:number = 14;

	private heuristic:Heuristic = Heuristic.MANHATTAN;
	private allowDiagonal:boolean = false;
	private walkableTypes:number[] = [];
	private start:number|{row:number, col:number};
	private end:number|{row:number, col:number};

    constructor(options?:{heuristic:Heuristic, allowDiagonal?:boolean}){
		if(options && options.heuristic){
			this.heuristic = options.heuristic;
			this.allowDiagonal = options.allowDiagonal || false;
		}
	}
	
	public setWalkable(...args:number[]){
		this.walkableTypes = this.walkableTypes.concat(...args);
		return this;
	}

	public setStart(start:number|{row:number, col:number}){
		this.start = start;
		return this;
	}

	public setEnd(end:number|{row:number, col:number}){
		this.end = end;
		return this;
	}

	private gameMapToPathfind(map: number[][]): number[][] {
		const isStartObject:boolean = typeof this.start === "number";
		const isEndObject:boolean = typeof this.end === "number";
        return map.map((row, rowIndex)=>{
            return row.map((id, colIndex) => {
				if(isStartObject && this.start == id ||
					!isStartObject && (this.start as {row:number, col:number}).row == rowIndex && 
					(this.start as {row:number, col:number}).col == colIndex){
					return Types.START;
				} else if(isEndObject && this.end == id ||
					!isEndObject && (this.end as {row:number, col:number}).row == rowIndex && 
					(this.end as {row:number, col:number}).col == colIndex){
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
		if(this.start == undefined || this.start == null){
			throw new Error('There is no start point. Please, use setStart() to configure the path\'s start point.');
		}

		if(this.end == undefined || this.end == null){
			throw new Error('There is no end point. Please, use setEnd() to configure the path\'s end point.');
		}

		let finalMap:number[][] = this.gameMapToPathfind(map);
		let firstElement = (typeof this.start !== "number") ? new Node(this.start.row, this.start.col) : this.findStartElement(finalMap);
		let lastElement = (typeof this.end !== "number") ? new Node(this.end.row, this.end.col) : this.findEndElement(finalMap);
        return this.findBestPath(firstElement, lastElement, finalMap);
    }

	private findStartElement(map:number[][]): Node {
    	let startPoint:Node = this.findElement(map, Types.START) as Node;
    	if(startPoint == null){
    		throw new Error('Couldn\'t find a start point.');
		}
		return startPoint;
	}

	private findEndElement(map:number[][]): Node {
		let endPoint:Node = this.findElement(map, Types.END) as Node;
		if(endPoint == null){
			throw new Error('Couldn\'t find a end point.');
		}
		return endPoint;
	}

	private findElement(map:number[][], value:number): Node | null {
		let el = null;
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
			element.setH(this.distanceBetweenNodes(element, lastElement));
			element.setG(this.getMoveValue(currentNode, element));
			openList.push(element);
		});

		openList.sort((a,b) => b.getValue() - a.getValue());

		return openList;
	}

	private distanceBetweenNodes(initialNode:Node, finalNode:Node){
		let col = Math.abs(finalNode.getCol() - initialNode.getCol());
		let row = Math.abs(finalNode.getRow() - initialNode.getRow());

		if(this.heuristic === Heuristic.MANHATTAN){
			return this.DEFAULT_DISTANCE*(col + row);
		} else {
			return this.DEFAULT_DISTANCE*(col + row) + (this.DIAGONAL_DISTANCE -2*this.DEFAULT_DISTANCE)*Math.min(col,row);
		}
	}

	private getMoveValue(node:Node, newNode:Node){
		if(node.getRow() != newNode.getRow() && node.getCol() != newNode.getCol()) return this.DIAGONAL_DISTANCE;
		else return this.DEFAULT_DISTANCE;
	}

	private findAdjacents(map:number[][], node:Node) : Node[] {

		let adjacents: Node[] = [];
		let diagonal = [[-1,-1], [-1,1], [1,-1], [1,1]];
		let manhattan = [[-1,0], [0,-1], [0,1], [1,0]];

		let mapElements = map;
		let x, y = 0;

		for(let v = 0; v < manhattan.length; v++){
			x = node.getRow() + manhattan[v][0];
			y = node.getCol() + manhattan[v][1];

			if(x > -1 && y > -1 && x < mapElements.length && y < mapElements[x].length
				&& (mapElements[x][y] == Types.WALKABLE || mapElements[x][y] == Types.END )){
				adjacents.push(new Node(x, y));
			}
		}

		if(this.heuristic === Heuristic.DIAGONAL){
			for(let v = 0; v < diagonal.length; v++){
				x = node.getRow() + diagonal[v][0];
				y = node.getCol() + diagonal[v][1];
	
				if(x > -1 && y > -1 && x < mapElements.length && y < mapElements[x].length
					&& (mapElements[x][y] == Types.WALKABLE || mapElements[x][y] == Types.END )){
					if(!this.allowDiagonal){
						if(diagonal[v][0] == -1 && diagonal[v][1] == -1 && (mapElements[x+1][y] == Types.WALKABLE && mapElements[x][y+1] == Types.WALKABLE)
						|| diagonal[v][0] == -1 && diagonal[v][1] == 1 && (mapElements[x][y-1] == Types.WALKABLE && mapElements[x+1][y] == Types.WALKABLE)
						|| diagonal[v][0] == 1 && diagonal[v][1] == -1 && (mapElements[x-1][y] == Types.WALKABLE && mapElements[x][y+1] == Types.WALKABLE)
						|| diagonal[v][0] == 1 && diagonal[v][1] == 1 && (mapElements[x][y-1] == Types.WALKABLE && mapElements[x-1][y] == Types.WALKABLE)){
							adjacents.push(new Node(x, y));
						}
					} else { 
						adjacents.push(new Node(x, y));
					}
				}
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
        }
        return listPath.reverse();
    }

	private nodeToObject(node:Node){
		return {col: node.getCol(), row: node.getRow()};
	}

	private isNodeEqual(element:Node, element0:Node):boolean{
        return (element.getRow() == element0.getRow() && element.getCol() == element0.getCol());
	}

}