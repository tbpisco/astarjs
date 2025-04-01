import { Node } from './Node';

export enum Types {
	START = 's',
	END = 'e',
	WALKABLE = 'w',
	NON_WALKABLE = 'nw',
}

export interface WalkableTile {
	type: number;
	weight?: number;
}

type AllTypes = number | Types.START | Types.END | Types.NON_WALKABLE | undefined;

export enum Heuristic {
	MANHATTAN,
	DIAGONAL,
}

export class PathFinding {
	private DEFAULT_DISTANCE: number = 1;
	private DIAGONAL_DISTANCE: number = Math.sqrt(2);

	private heuristic: Heuristic = Heuristic.MANHATTAN;
	private allowDiagonal: boolean = false;
	private walkableTypes: (number | WalkableTile)[] = [];
	private start: number | { row: number; col: number };
	private end: number | { row: number; col: number };

	constructor(options?: { heuristic: Heuristic; allowDiagonal?: boolean }) {
		if (options && options.heuristic) {
			this.heuristic = options.heuristic;
			this.allowDiagonal = options.allowDiagonal || false;
		}
	}

	public setWalkable(...args: (number | WalkableTile)[]) {
		this.walkableTypes = this.walkableTypes.concat(...args).map((tileType: number | WalkableTile) => {
			if (this.isNumber(tileType as number)) {
				return { type: tileType as number, weight: 0 };
			} else {
				const walkableData: WalkableTile = {
					type: (tileType as WalkableTile).type,
					weight: (tileType as WalkableTile).weight ? (tileType as WalkableTile).weight : 0,
				};
				return walkableData;
			}
		});
		return this;
	}

	public setStart(start: number | { row: number; col: number }) {
		this.start = start;
		return this;
	}

	public setEnd(end: number | { row: number; col: number }) {
		this.end = end;
		return this;
	}

	private gameMapToPathfind(map: number[][]): AllTypes[][] {
		const isStartObject: boolean = typeof this.start === 'number';
		const isEndObject: boolean = typeof this.end === 'number';
		return map.map((row: number[], rowIndex: number) => {
			return row.map((id: number, colIndex: number) => {
				if (
					(isStartObject && this.start == id) ||
					(!isStartObject &&
						(this.start as { row: number; col: number }).row == rowIndex &&
						(this.start as { row: number; col: number }).col == colIndex)
				) {
					return Types.START;
				} else if (
					(isEndObject && this.end == id) ||
					(!isEndObject &&
						(this.end as { row: number; col: number }).row == rowIndex &&
						(this.end as { row: number; col: number }).col == colIndex)
				) {
					return Types.END;
				} else if (this.isTileWalkable(id)) {
					const item: WalkableTile | number = this.getTileWalkable(id);
					return (item as WalkableTile).weight ? (item as WalkableTile).weight : 0;
				} else {
					return Types.NON_WALKABLE;
				}
			});
		});
	}

	private isTileWalkable(mapItem: number) {
		return this.walkableTypes.some((type: number | WalkableTile) => {
			if (this.isNumber(type as number)) {
				return (type as number) == mapItem;
			} else {
				return (type as WalkableTile).type == mapItem;
			}
		});
	}

	private getTileWalkable(mapItem: number): WalkableTile | number {
		return this.walkableTypes.filter((type: number | WalkableTile) => {
			if (this.isNumber(type as number)) {
				return (type as number) === mapItem;
			} else {
				return (type as WalkableTile).type === mapItem;
			}
		})[0] as WalkableTile | number;
	}

	public find(map: number[][]): { col: number; row: number }[] {
		if (this.start == undefined || this.start == null) {
			throw new Error("There is no start point. Please, use setStart() to configure the path's start point.");
		}

		if (this.end == undefined || this.end == null) {
			throw new Error("There is no end point. Please, use setEnd() to configure the path's end point.");
		}

		const finalMap: AllTypes[][] = this.gameMapToPathfind(map);
		const firstElement =
			typeof this.start !== 'number'
				? new Node(this.start.row, this.start.col, 0)
				: this.findStartElement(finalMap);
		const lastElement =
			typeof this.end !== 'number' ? new Node(this.end.row, this.end.col, 0) : this.findEndElement(finalMap);
		return this.findBestPath(firstElement, lastElement, finalMap);
	}

	private findStartElement(map: AllTypes[][]): Node {
		const startPoint: Node = this.findElement(map, Types.START) as Node;
		if (startPoint == null) {
			throw new Error("Couldn't find a start point.");
		}
		return startPoint;
	}

	private findEndElement(map: AllTypes[][]): Node {
		const endPoint: Node = this.findElement(map, Types.END) as Node;
		if (endPoint == null) {
			throw new Error("Couldn't find a end point.");
		}
		return endPoint;
	}

	private findElement(map: AllTypes[][], value: AllTypes): Node | null {
		let el = null;
		map.forEach((element, indexRow) => {
			element.forEach((element, indexCol) => {
				if (element == value) {
					el = new Node(indexRow, indexCol, 0);
				}
			});
		});
		return el;
	}

	private findBestPath(firstElement: Node, lastElement: Node, map: AllTypes[][]): { col: number; row: number }[] {
		const closedList: Node[] = [];
		const openList: Node[] = [];
		let isFinished: boolean = false;
		let lastNode: Node = firstElement;
		let lastNodeAdjacents;
		closedList.push(firstElement);

		while (!isFinished) {
			this.updateLists(map, lastNode, closedList, openList, lastElement);
			if (openList.length > 0) closedList.push(openList.pop() as Node);

			lastNode = closedList[closedList.length - 1];

			lastNodeAdjacents = this.findAdjacents(map, lastNode).filter(
				(elementAdjacent: Node) =>
					this.elementNotExistsInside(openList, elementAdjacent) &&
					this.elementNotExistsInside(closedList, elementAdjacent),
			);

			isFinished =
				this.isNodeEqual(closedList[closedList.length - 1], lastElement) ||
				(openList.length == 0 && !lastNodeAdjacents.length);
		}

		return openList.length > 0 ? this.getPath(closedList[closedList.length - 1]) : [];
	}

	private updateLists(map: AllTypes[][], currentNode: Node, closedList: Node[], openList: Node[], lastElement: Node) {
		//get all adjacents position possibilities that we don't have in the closed list
		const validAdjacents = this.findAdjacents(map, currentNode).filter((elementAdjacent: Node) =>
			this.elementNotExistsInside(closedList, elementAdjacent),
		);

		//get all adjacents position possibilities that we have in the open list and don't have inside the closed list
		const validAdjacentsOpenList = validAdjacents.filter((elementAdjacent: Node) =>
			this.elementExistsInside(openList, elementAdjacent),
		);

		//update distance values if the new potencial Node position on the path is longer than the current one
		validAdjacentsOpenList.forEach((elementAdjacent: Node) => {
			const validElement = openList.filter((element: Node) => this.isNodeEqual(element, elementAdjacent))[0];
			if (currentNode.getG() + this.getMoveValue(validElement, currentNode) < validElement.getG()) {
				validElement.setG(this.getMoveValue(validElement, currentNode));
				validElement.setParent(currentNode);
			}
		});

		//get all adjacents posiiton possibilities that we don't have in the open list and don't have inside the closed list
		const validAdjacentsNewOpenList = validAdjacents.filter((elementAdjacent: Node) =>
			this.elementNotExistsInside(openList, elementAdjacent),
		);

		//update distance values for the potencial new positions in the open list
		validAdjacentsNewOpenList.forEach((element) => {
			element.setParent(currentNode);
			element.setH(this.distanceBetweenNodes(element, lastElement));
			element.setG(this.getMoveValue(currentNode, element));
			openList.push(element);
		});

		openList.sort((a, b) => b.getValue() - a.getValue());
	}

	private elementNotExistsInside(list: Node[], element: Node) {
		return !this.elementExistsInside(list, element);
	}

	private elementExistsInside(list: Node[], element: Node) {
		return list.some((el: Node) => {
			return this.isNodeEqual(el, element);
		});
	}

	private distanceBetweenNodes(initialNode: Node, finalNode: Node) {
		const col = Math.abs(finalNode.getCol() - initialNode.getCol());
		const row = Math.abs(finalNode.getRow() - initialNode.getRow());

		if (this.heuristic === Heuristic.MANHATTAN) {
			return this.DEFAULT_DISTANCE * (col + row);
		} else {
			return (
				this.DEFAULT_DISTANCE * (col + row) +
				(this.DIAGONAL_DISTANCE - 2 * this.DEFAULT_DISTANCE) * Math.min(col, row)
			);
		}
	}

	private getMoveValue(node: Node, newNode: Node) {
		if (node.getRow() != newNode.getRow() && node.getCol() != newNode.getCol())
			return this.DIAGONAL_DISTANCE * (1 + newNode.getWeight());
		else return this.DEFAULT_DISTANCE * (1 + newNode.getWeight());
	}

	private findAdjacents(map: AllTypes[][], node: Node): Node[] {
		const adjacents: Node[] = [];
		const diagonal = [
			[-1, -1],
			[-1, 1],
			[1, -1],
			[1, 1],
		];
		const square = [
			[-1, 0],
			[0, -1],
			[0, 1],
			[1, 0],
		];

		const mapElements = map;
		let x,
			y = 0;

		for (let v = 0; v < square.length; v++) {
			x = node.getRow() + square[v][0];
			y = node.getCol() + square[v][1];

			if (
				x > -1 &&
				y > -1 &&
				x < mapElements.length &&
				y < mapElements[x].length &&
				(this.isNumber(mapElements[x][y]) || mapElements[x][y] == Types.END)
			) {
				adjacents.push(new Node(x, y, mapElements[x][y] as number));
			}
		}

		let addAdjacents = false;

		if (this.heuristic === Heuristic.DIAGONAL) {
			for (let v = 0; v < diagonal.length; v++) {
				x = node.getRow() + diagonal[v][0];
				y = node.getCol() + diagonal[v][1];

				if (
					x > -1 &&
					y > -1 &&
					x < mapElements.length &&
					y < mapElements[x].length &&
					(this.isNumber(mapElements[x][y]) || mapElements[x][y] == Types.END)
				) {
					if (!this.allowDiagonal) {
						addAdjacents = false;
						for (let index = 0; index < diagonal.length; index++) {
							if (
								index == v &&
								this.isNumber(mapElements[x - diagonal[v][0]][y]) &&
								this.isNumber(mapElements[x][y - diagonal[v][1]])
							) {
								addAdjacents = true;
							}
						}
						if (addAdjacents) {
							adjacents.push(new Node(x, y, mapElements[x][y] as number));
						}
					} else {
						adjacents.push(new Node(x, y, mapElements[x][y] as number));
					}
				}
			}
		}

		return adjacents;
	}

	private isNumber(item: AllTypes): boolean {
		return Object.prototype.toString.apply(item).indexOf('Number') > -1;
	}

	private getPath(node: Node): { col: number; row: number }[] {
		let currentNode = node;
		const listPath = [];
		while (currentNode) {
			listPath.push(this.nodeToObject(currentNode));
			currentNode = currentNode.getParent();
		}
		return listPath.reverse();
	}

	private nodeToObject(node: Node) {
		return { col: node.getCol(), row: node.getRow() };
	}

	private isNodeEqual(element: Node, element0: Node): boolean {
		return element.getRow() == element0.getRow() && element.getCol() == element0.getCol();
	}
}
