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
import { PathFinding, Types } from 'astarjs';

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

import { PathFinding, Types } from 'astarjs';

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