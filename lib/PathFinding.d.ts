export declare enum Types {
    START = 0,
    END = 1,
    WALKABLE = 2,
    NON_WALKABLE = 3
}
export declare enum Heuristic {
    MANHATTAN = 0,
    DIAGONAL = 1
}
export declare class PathFinding {
    private DEFAULT_DISTANCE;
    private DIAGONAL_DISTANCE;
    private heuristic;
    private allowDiagonal;
    private walkableTypes;
    private start;
    private end;
    constructor(options?: {
        heuristic: Heuristic;
        allowDiagonal?: boolean;
    });
    setWalkable(...args: number[]): this;
    setStart(start: number | {
        row: number;
        col: number;
    }): this;
    setEnd(end: number | {
        row: number;
        col: number;
    }): this;
    private gameMapToPathfind;
    find(map: number[][]): {
        col: number;
        row: number;
    }[];
    private findStartElement;
    private findEndElement;
    private findElement;
    private findBestPath;
    private updateLists;
    private elementNotExistsInside;
    private elementExistsInside;
    private distanceBetweenNodes;
    private getMoveValue;
    private findAdjacents;
    private getPath;
    private nodeToObject;
    private isNodeEqual;
}
