export class Node {

    private row: number; //row position on the map
    private col: number; // column position on the map
    private h: number;//distance to the end of the path
    private g: number;//distance traveled since the start of the path
    private parent: Node | null;

    constructor(row:number , col:number){
    
        this.row = row;
        this.col = col;
        this.h = 0;
        this.g = 0;
        this.parent = null;
       
    }

    getRow():number{
        return this.row;
    }

    getCol():number{
        return this.col;
    }
     
    setH(value: number){
       this.h = value;
    }
     
    getH(): number{
       return this.h;
    }
     
    setG(value: number){
       this.g = value;
    }
     
    getG(): number{
       return this.g + ((this.parent)? this.parent.getG() : 0);
    }
     
    getValue():number{
       return this.getH() + this.getG();
    }
     
    setParent(node:Node){
       this.parent = node;
    }

    getParent(): Node {
        return this.parent as Node;
    }
}