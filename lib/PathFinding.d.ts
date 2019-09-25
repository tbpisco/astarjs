export declare enum Types {
    START = 0,
    END = 1,
    WALKABLE = 2,
    NON_WALKABLE = 3
}
export declare class PathFinding {
    constructor();
    find(map: number[][]): {
        col: number;
        row: number;
    }[];
    private findBestPath;
    private nodeToObject;
    private getPath;
    private findEnd;
    private findStart;
    private findElement;
    private getValueMove;
    private distanceBetweenNodes;
    private isObjectEqual;
    private findAdjacents;
    private findValidAdjacents;
}
