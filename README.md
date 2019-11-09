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
this.pathFindingManager.setWalkable(0) // or this.pathFindingManager.setWalkable(0, 10, 11); 
                       .setEnd(4)
                       .setStart(3);

let bestPath: {col:number,row:number}[] = this.pathFindingManager.find(map);
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
this.pathFindingManager.setWalkable(0); // or this.pathFindingManager.setWalkable(0, 10, 11); 
this.pathFindingManager.setEnd({col: 5, row: 7});
this.pathFindingManager.setStart({col: 5, row: 4});

let bestPath: {col:number,row:number}[] = this.pathFindingManager.find(map);
/*
returns
0: {col: 5, row: 4}
1: {col: 5, row: 5}
2: {col: 5, row: 6}
3: {col: 5, row: 7}*/
```
Options
---

From version **1.0.0** on, user can choose the algorithm Heuristic between **MANHATTAN** and **DIAGONAL**. See the differences and how to configure it bellow.

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
this.pathFindingManager.setWalkable(0)
                        .setEnd({col: 5, row: 2})
                        .setStart({col: 2, row: 6});
let bestPath = this.pathFindingManager.find(map);

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
this.pathFindingManager.setWalkable(0)
                        .setEnd({col: 5, row: 2})
                        .setStart({col: 2, row: 6});
let bestPath = this.pathFindingManager.find(map);

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
this.pathFindingManager.setWalkable(0)
                        .setEnd({col: 5, row: 2})
                        .setStart({col: 2, row: 6});
let bestPath = this.pathFindingManager.find(map);

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