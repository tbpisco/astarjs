export declare class Node {
    private _row;
    private _col;
    private _h;
    private _g;
    private _weight;
    private _parent;
    constructor(row: number, col: number, weight?: number);
    getRow(): number;
    getCol(): number;
    getWeight(): number;
    setH(value: number): void;
    getH(): number;
    setG(value: number): void;
    getG(): number;
    getValue(): number;
    setParent(node: Node): void;
    getParent(): Node;
}
