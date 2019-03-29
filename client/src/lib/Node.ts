export class Node {

    private row: number;
    private col: number;
    private value: number;
    private h: number;
    private g: number;
    private parent: Node | null;

    constructor(row:number , col:number){
    
        this.row = row;
        this.col = col;
        this.value = 0;
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
     
    setValue(value:number){
       this.value =  value;
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