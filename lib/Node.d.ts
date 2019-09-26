export declare class Node {
    private row;
    private col;
    private h;
    private g;
    private parent;
    constructor(row: number, col: number);
    getRow(): number;
    getCol(): number;
    setH(value: number): void;
    getH(): number;
    setG(value: number): void;
    getG(): number;
    getValue(): number;
    setParent(node: Node): void;
    getParent(): Node;
}
