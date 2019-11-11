# A*

Pathfinding algorithm library.

Install
---

```bash
npm install astarjs --save
```

Usage
---

```typescript
import { PathFinding } from 'astarjs';

let map = [ [0,  0,  14, 23, 23, 0,  0,  23, 0,  0,  0,  2,  0,  0],
            [0,  0,  0,  0,  0,  0,  13, 1,  0,  0,  0,  0,  0,  13],
            [1,  23, 0,  14, 23, 0,  13, 0,  2,  0,  1,  0,  23, 2],
            [14, 0,  0,  0,  0,  23, 0,  0,  0,  2,  2,  2,  0,  0],
            [13, 0,  0,  0,  0,  3,  0,  0,  0,  0,  0,  14, 0,  0],
            [13, 0,  0,  0,  23, 0,  0,  23, 0,  0,  0,  0,  0,  0],
            [0,  0,  0,  0,  0,  0,  0,  0,  23, 0,  0,  0,  0,  0],
            [0,  0,  0,  23, 0,  4,  0,  0,  0,  1,  0,  23, 0,  2]];

let pathFindingManager = new PathFinding();
pathFindingManager.setWalkable(0) // or this.pathFindingManager.setWalkable(0, 10, 11); 
                    .setEnd(4)
                    .setStart(3);

let bestPath: {col:number,row:number}[] = pathFindingManager.find(map);
/*
returns
0: {col: 5, row: 4}
1: {col: 5, row: 5}
2: {col: 5, row: 6}
3: {col: 5, row: 7}*/

```

or

```typescript

import { PathFinding } from 'astarjs';

let map = [ [0,  0,  14, 23, 23, 0,  0,  23, 0,  0,  0,  2,  0,  0],
            [0,  0,  0,  0,  0,  0,  13, 1,  0,  0,  0,  0,  0,  13],
            [1,  23, 0,  14, 23, 0,  13, 0,  2,  0,  1,  0,  23, 2],
            [14, 0,  0,  0,  0,  23, 0,  0,  0,  2,  2,  2,  0,  0],
            [13, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  14, 0,  0],
            [13, 0,  0,  0,  23, 0,  0,  23, 0,  0,  0,  0,  0,  0],
            [0,  0,  0,  0,  0,  0,  0,  0,  23, 0,  0,  0,  0,  0],
            [0,  0,  0,  23, 0,  0,  0,  0,  0,  1,  0,  23, 0,  2]];

let pathFindingManager = new PathFinding();
pathFindingManager.setWalkable(0); // or this.pathFindingManager.setWalkable(0, 10, 11); 
pathFindingManager.setEnd({col: 5, row: 7});
pathFindingManager.setStart({col: 5, row: 4});

let bestPath: {col:number,row:number}[] = pathFindingManager.find(map);
/*
returns
0: {col: 5, row: 4}
1: {col: 5, row: 5}
2: {col: 5, row: 6}
3: {col: 5, row: 7}*/
```
# Options

From version **1.0.0** on, user can choose the algorithm Heuristic between **MANHATTAN** and **DIAGONAL**. See the differences and how to configure it bellow.

# Heuristic

## Heuristic.MANHATTAN

```typescript

import { PathFinding, Heuristic } from 'astarjs';

let map = [ [0,  0,  2,  2,  2,  0],
            [0,  0,  0,  0,  0,  0],
            [0,  0,  0,  0,  0,  0],
            [0,  0,  0,  0,  0,  0],
            [0,  3,  0,  0,  0,  0],
            [1,  2,  0,  0,  2,  0],
            [2,  0,  0,  0,  0,  2]];

let pathFindingManager = new PathFinding({heuristic: Heuristic.MANHATTAN});
pathFindingManager.setWalkable(0)
                    .setEnd({col: 5, row: 2})
                    .setStart({col: 2, row: 6});
let bestPath = pathFindingManager.find(map);

/*
* bestPath = {col: 2, row: 6}, {col: 3, row: 6}, {col: 3, row: 5}, {col: 3, row: 4},
*  {col: 4, row: 4}, {col: 5, row: 4}, {col: 5, row: 3}, {col: 5, row: 2}]
*
* E -> End
* S -> Start
* # -> Path
* 
* [[0,  0,  2,  2,  2,  0],
*  [0,  0,  0,  0,  0,  0],
*  [0,  0,  0,  0,  0,  E],
*  [0,  0,  0,  0,  0,  #],
*  [0,  3,  0,  #,  #,  #],
*  [1,  2,  0,  #,  2,  0],
*  [2,  0,  S,  #,  0,  2]];
* 
* */
```
## Heuristic.DIAGONAL 

### DO NOT allow diagonal

```typescript

import { PathFinding, Heuristic } from 'astarjs';

let map = [ [0,  0,  2,  2,  2,  0],
            [0,  0,  0,  0,  0,  0],
            [0,  0,  0,  0,  0,  0],
            [0,  0,  0,  0,  0,  0],
            [0,  3,  0,  0,  0,  0],
            [1,  2,  0,  0,  2,  0],
            [2,  0,  0,  0,  0,  2]];

let pathFindingManager = new PathFinding({heuristic:Heuristic.DIAGONAL});
pathFindingManager.setWalkable(0)
                    .setEnd({col: 5, row: 2})
                    .setStart({col: 2, row: 6});
let bestPath = pathFindingManager.find(map);

/*
* bestPath = [{col: 2, row: 6}, {col: 3, row: 5}, {col: 3, row: 4},
*             {col: 4, row: 3}, {col: 5, row: 2}]
*
* E -> End
* S -> Start
* # -> Path
* 
* [[0,  0,  2,  2,  2,  0],
*  [0,  0,  0,  0,  0,  0],
*  [0,  0,  0,  0,  0,  E],
*  [0,  0,  0,  0,  #,  0],
*  [0,  3,  0,  #,  0,  0],
*  [1,  2,  0,  #,  2,  0],
*  [2,  0,  S,  0,  0,  2]];
* 
* */
```
### Allow diagonal

```typescript

import { PathFinding, Heuristic } from 'astarjs';

let map = [ [0,  0,  2,  2,  2,  0],
            [0,  0,  0,  0,  0,  0],
            [0,  0,  0,  0,  0,  0],
            [0,  0,  0,  0,  0,  0],
            [0,  3,  0,  0,  0,  0],
            [1,  2,  0,  0,  2,  0],
            [2,  0,  0,  0,  0,  2]];

let pathFindingManager = new PathFinding({heuristic:Heuristic.DIAGONAL, allowDiagonal:true});
pathFindingManager.setWalkable(0)
                    .setEnd({col: 5, row: 2})
                    .setStart({col: 2, row: 6});
let bestPath = pathFindingManager.find(map);

/*
* bestPath = [{col: 2, row: 6}, {col: 3, row: 5}, {col: 4, row: 4},
*             {col: 5, row: 3}, {col: 5, row: 2}]
*
* E -> End
* S -> Start
* # -> Path
* 
* [[0,  0,  2,  2,  2,  0],
*  [0,  0,  0,  0,  0,  0],
*  [0,  0,  0,  0,  0,  E],
*  [0,  0,  0,  0,  0,  #],
*  [0,  3,  0,  0,  #,  0],
*  [1,  2,  0,  #,  2,  0],
*  [2,  0,  S,  0,  0,  2]];
* 
* */
```

# Weight

From version **1.1.0** on, user can setup weight for walkable tiles.
To setup walkable tiles weight use setWalkable function as bellow:

```typescript
.setWalkable(0,{type: 1, weight:0.5},{type: 2, weight:2});
```
Tiles with unspecified weight will use the default value of 0.

## Example with walkable tiles weight

```typescript

import { PathFinding } from 'astarjs';

let map = [ [2,  0,  0,  0,  0,  0],
			[0,  0,  1,  1,  0,  0],
			[0,  0,  1,  1,  0,  0],
			[0,  0,  1,  1,  0,  0],
			[0,  0,  1,  1,  0,  0],
			[0,  0,  0,  0,  0,  0],
			[0,  0,  0,  0,  0,  3]];
            
let pfManager = new PathFinding();            
pfManager.setWalkable({type: 0},{type: 1, weight:2}).setEnd(3).setStart(2);
let bestPath = pfManager.find(map);
```
or 

```typescript
pfManager.setWalkable(0,{type: 1, weight:2}).setEnd(3).setStart(2);
```
or

```typescript
pfManager.setWalkable({type: 0, weight:0},{type: 1, weight:2}).setEnd(3).setStart(2);

/*
* bestPath = [{col: 0, row: 0}, {col: 1, row: 0}, {col: 2, row: 0}, {col: 3, row: 0},
 {col: 4, row: 0}, {col: 4, row: 1}, {col: 4, row: 2}, {col: 4, row: 3}, {col: 4, row: 4},
 {col: 4, row: 5}, {col: 5, row: 5}, {col: 5, row: 6}]
*
* E -> End
* S -> Start
* # -> Path
* 
*  [[2,  #,  #,  #,  #,  0],
*	[0,  0,  1,  1,  #,  0],
*	[0,  0,  1,  1,  #,  0],
*	[0,  0,  1,  1,  #,  0],
*	[0,  0,  1,  1,  #,  0],
*	[0,  0,  0,  0,  #,  0],
*	[0,  0,  0,  0,  #,  3]];
* 
* */
```

## Example with same map as bellow but without walkable tiles weight

```typescript

import { PathFinding } from 'astarjs';

let map = [ [2,  0,  0,  0,  0,  0],
			[0,  0,  1,  1,  0,  0],
			[0,  0,  1,  1,  0,  0],
			[0,  0,  1,  1,  0,  0],
			[0,  0,  1,  1,  0,  0],
			[0,  0,  0,  0,  0,  0],
			[0,  0,  0,  0,  0,  3]];
            
let pfManager = new PathFinding();            
pfManager.setWalkable(0,1).setEnd(3).setStart(2);
let bestPath = pfManager.find(map);

/*
* bestPath =  [{col: 0, row: 0}, {col: 0, row: 1}, {col: 0, row: 2}, {col: 1, row: 2},
                {col: 2, row: 2}, {col: 2, row: 3}, {col: 3, row: 3}, {col: 3, row: 4},
                {col: 4, row: 4}, {col: 4, row: 5}, {col: 5, row: 5}, {col: 5, row: 6}]
*
* E -> End
* S -> Start
* # -> Path
* 
*  [[2,  0,  0,  0,  0,  0],
*	[#,  0,  1,  1,  0,  0],
*	[#,  #,  #,  1,  0,  0],
*	[0,  0,  #,  #,  0,  0],
*	[0,  0,  1,  #,  #,  0],
*	[0,  0,  0,  0,  #,  #],
*	[0,  0,  0,  0,  0,  3]];
* 
* */
```

# Documentation

## PathFinding

**new PathFinding(options)**

| *Name*        | *Type*        | *Description*                                                                                             |
| ------------- |:-------------:| ----------------------------------------------------------------------------------------------------------|
| options       | Object        | `Optional` The optional pathfinding options                                                               |


| new Pathfinding(options)      | *Name*        | *Type*      | *Default*            | *Description*                                        |
|-------------------------------| ----------------------------------------------------------------------------------------------------------|
|                               | heuristic     | Heuristic   | Heuristic.MANHATTAN  | `Optional` Type of heuristic used on the pathfinding algorithm. Choose between Heuristic.MANHATTAN and Heuristic.DIAGONAL.| 
|                               | allowDiagonal | boolean     | false                | `Optional` When using Heuristic.DIAGONAL, user can force path on the diagonal direction even if the adjacents tiles are non-walkable.|  


**setWalkable(...args:(number|WalkableTile)[])**

| *Name*        | *Type*        | *Description*                                                                                             |
| ------------- |:-------------:| ----------------------------------------------------------------------------------------------------------|
| arg           | Array         | An array of numbers and/or WalkableTile type. WalkableTile{type:number, weight:number}, weight is the percentage that a tile is "heaviest" than the default weight.|          


**setStart(start:number|{row:number, col:number})**

| *Name*        | *Type*        | *Description*                                                                                             |
| ------------- |:-------------:| ----------------------------------------------------------------------------------------------------------|
| start         | Object/number | A number that represents the start point or the start point row/col position.                             |


**setEnd(end:number|{row:number, col:number})**

| *Name*        | *Type*        | *Description*                                                                                             |
| ------------- |:-------------:| ----------------------------------------------------------------------------------------------------------|
| end           | Object/number | A number that represents the start point or the start point row/col position.                             |


**find(map: number[][]): {col:number,row:number}[]**

| *Name*        | *Type*        | *Description*                                                                                             |
| ------------- |:-------------:| ----------------------------------------------------------------------------------------------------------|
| map           | Array         | An two dimensional Array of numbers. Returns an array of {col:number,row:number}, where the first array position is the start point and the last array position is the end point.|


[See full example here](https://github.com/tbpisco/astarjs/tree/master/examples)

Running the example
---

Run the following commands to run the example:

```bash
npm install
npm start
```

License
---

[MIT](https://github.com/tbpisco/astarjs/blob/master/LICENSE)