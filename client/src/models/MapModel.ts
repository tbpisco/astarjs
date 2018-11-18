export class MapModel{

    private map: number[][];
    private row: number;
    private col: number;

    constructor(col: number, row: number, isRandom: boolean){
        this.map = (isRandom) ? this.createRandomMap(col, row) : this.createEmptyMap(col, row);
        this.row = row;
        this.col = col;
    }

    get():number[][] {
        return this.map;
    }

    getCol(): number {
        return this.col;
    }

    getRow(): number {
        return this.row;
    }

    createEmptyMap(col: number, row: number): number[][] {
        let array: number[][] = [];
        for (let index = 0; index < row; index++) {
            array.push(new Array(col+1).join("0").split("").map((element) => 0));
        }
        return array;
    }

    createRandomMap(col: number, row: number): number[][] {
        let array: number[][] = [];
        for (let index = 0; index < row; index++) {
            array.push(new Array(col+1).join("0").split("").map((element) => {
                let num = Math.floor(Math.random()*10);
                if(num < 8){
                    return 0;
                } else if(num == 8){
                    return 1;
                } else {
                    return 2;
                }
            }));
        }

        let r = Math.floor(Math.random()*row);
        let c = Math.floor(Math.random()*col);

        array[r][c] = 3;

        let r0 = Math.floor(Math.random()*row);
        let c0 = Math.floor(Math.random()*col);

        while(r0 == r && c0 == c){
            r0 = Math.floor(Math.random()*row);
            c0 = Math.floor(Math.random()*col);
        }
        array[r0][c0] = 4;

        return array;
    }

    
}