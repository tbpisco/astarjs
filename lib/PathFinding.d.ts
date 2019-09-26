export declare enum Types {
    START = 0,
    END = 1,
    WALKABLE = 2,
    NON_WALKABLE = 3
}
export declare class PathFinding {
    private DEFAULT_DISTANCE;
    private DIAGONAL_DISTANCE;
    constructor();
    find(map: number[][]): {
        col: number;
        row: number;
    }[];
    private findStartElement;
    private findEndElement;
    private findElement;
    private findBestPath;
    private findValidAdjacents;
    private distanceBetweenNodes;
    private getMoveValue;
    private findAdjacents;
    private getPath;
    private nodeToObject;
    private isNodeEqual;
}
