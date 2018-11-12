export class Map{

    private map:(string | number)[][];
    private row: number;
    private col: number;

    constructor(values:(string | number)[][]){
        this.map = values;
        this.row = this.map.length;
        this.col = this.map[0].length;
    }

    get():(string | number)[][]{
        return this.map;
    }

    getCol(): number{
        return this.col;
    }

    getRow(): number{
        return this.row;
    }

    
}