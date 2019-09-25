import { Node } from "./Node";
export declare enum Types {
    START = 0,
    END = 1,
    WALKABLE = 2,
    NON_WALKABLE = 3
}
export declare class PathFinding {
    constructor();
    static find(map: number[][]): {
        col: number;
        row: number;
    }[];
    static findBestPath(firstElement: Node, lastElement: Node, map: number[][]): {
        col: number;
        row: number;
    }[];
    static nodeToObject(node: Node): {
        col: number;
        row: number;
    };
    static getPath(node: Node): {
        col: number;
        row: number;
    }[];
    static findEnd(map: number[][]): Node;
    static findStart(map: number[][]): Node;
    static findElement(map: number[][], value: number): Node;
    static getValueMove(node: Node, nodeNew: Node): 14 | 10;
    static distanceBetweenNodes(nodeInitial: Node, nodeFinal: Node, val: number): number;
    static isObjectEqual(element: Node, element0: Node): boolean;
    static findAdjacents(map: number[][], node: Node): Node[];
    static findValidAdjacents(map: number[][], node: Node, closedList: Node[], openList: Node[], lastElement: Node): Node[];
}
