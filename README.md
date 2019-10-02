# A*

Pathfinding algorithm library.

#Install

npm install astarjs --save-dev

# Usage

import { PathFinding, Types } from 'astarjs';

let map = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 23, 1, 1, 23, 23, 0, 3, 0, 0, 0, 0],
            [0, 0, 0, 23, 23, 13, 23, 23, 1, 23, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 4, 23, 23, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 23, 23, 0, 0, 0, 0, 0]];

let pathFindingManager = new PathFinding();
this.pathFindingManager.setWalkable(0).setEnd(4).setStart(3);

this.pathFindingManager.find(map);

or

let pathFindingManager = new PathFinding();
this.pathFindingManager.setWalkable(0);
this.pathFindingManager.setEnd(4);
this.pathFindingManager.setStart(3);

this.pathFindingManager.find(map);