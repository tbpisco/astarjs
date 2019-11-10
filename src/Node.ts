export class Node {

   private _row: number; //row position on the map
   private _col: number; // column position on the map
   private _h: number;//distance to the end of the path
   private _g: number;//distance traveled since the start of the path
   private _weight:number;
   private _parent: Node | null;

   constructor(row:number, col:number, weight:number = 0){
      this._row = row;
      this._col = col;
      this._weight = weight;
      this._h = 0;
      this._g = 0;
      this._parent = null;
   }

   public getRow():number{
      return this._row;
   }

   public getCol():number{
      return this._col;
   }

   public getWeight():number{
      return this._weight;
   }
     
   public setH(value: number){
      this._h = value;
   }
     
   public  getH(): number{
      return this._h;
   }
     
   public setG(value: number){
      this._g = value;
   }
    
   public  getG(): number{
      return this._g + (this._parent? this._parent.getG() : 0);
   }
     
   public  getValue():number{
      return this.getH() + this.getG();
   }
     
   public setParent(node:Node){
      this._parent = node;
   }

   public getParent(): Node {
      return this._parent as Node;
   }
}