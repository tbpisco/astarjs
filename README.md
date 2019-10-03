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

let map = [ [0, 0, 0, 0,  0,  0,  0,  0,  0,  0,  0, 0, 0, 0],
            [0, 0, 0, 0,  0,  0,  0,  0,  0,  0,  0, 0, 0, 0],
            [0, 0, 0, 0,  0,  0,  2,  0,  0,  0,  0, 0, 0, 0],
            [0, 0, 0, 0,  0,  0,  2,  0,  0,  0,  0, 0, 0, 0],
            [0, 0, 0, 23, 1,  1,  23, 23, 0,  3,  0, 0, 0, 0],
            [0, 0, 0, 23, 23, 13, 23, 23, 0,  23, 0, 0, 0, 0],
            [0, 0, 0, 0,  0,  0,  4,  23, 23, 0,  0, 0, 0, 0],
            [0, 0, 0, 0,  0,  0,  0,  23, 23, 0,  0, 0, 0, 0]];

let pathFindingManager = new PathFinding();
this.pathFindingManager.setWalkable(0,2)
                       .setEnd(4)
                       .setStart(3);

this.pathFindingManager.find(map);
```

or

```typescript
let pathFindingManager = new PathFinding();
this.pathFindingManager.setWalkable(0);
this.pathFindingManager.setEnd(4);
this.pathFindingManager.setStart(3);

this.pathFindingManager.find(map);
```

[See full example here](https://https://github.com/tbpisco/astarjs/tree/master/examples)

Running the example
---

Run the following commands to run the example:

```bash
npm install
npm start
```

License
---