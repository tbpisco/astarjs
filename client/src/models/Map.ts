export class Map{

    private map:(string | number)[][];

    constructor(values:(string | number)[][]){
        this.map = values;
    }

    get():(string | number)[][]{
        return this.map;
    }
}