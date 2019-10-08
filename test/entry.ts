export enum TILE{
	GREEN,
	HOUSE,
	MOUNTAIN_BROWN,
	MOUNTAIN,
	WATER,
	TREES,
	START,
	END
}

export class Utils {

	public static createRandomMap(col: number, row: number): (string|number)[][] {
		let array: number[][] = [];
		for (let index = 0; index < row; index++) {
			array.push(new Array(col + 1).join("0").split("").map((element) => {
				let num = Math.floor(Math.random() * 20);
				if (num < 15) {
					return TILE.GREEN;
				} else if (num == 16) {
					return TILE.HOUSE;
				} else if (num == 17) {
					return TILE.MOUNTAIN_BROWN;
				} else if (num == 18) {
					return TILE.MOUNTAIN;
				} else if (num == 19) {
					return TILE.WATER;
				} else {
					return TILE.TREES;
				}
			}));
		}

		let r = Math.floor(Math.random() * row);
		let c = Math.floor(Math.random() * col);

		array[r][c] = TILE.START;

		let r0 = Math.floor(Math.random() * row);
		let c0 = Math.floor(Math.random() * col);

		while (r0 == r && c0 == c) {
			r0 = Math.floor(Math.random() * row);
			c0 = Math.floor(Math.random() * col);
		}
		array[r0][c0] = TILE.END;

		return array;
	}
}