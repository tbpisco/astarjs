# A*

Pathfinding algorithm library.

# Usage

import { PathFinding, Types } from 'astarjs';

let pathFindingManager = new PathFinding();

let map = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 23, 1, 1, 23, 23, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 23, 23, 13, 23, 23, 1, 23, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 23, 23, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 23, 23, 0, 0, 0, 0, 0]];

this.pathFindingManager.find(map);