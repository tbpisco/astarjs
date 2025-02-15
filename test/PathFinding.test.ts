import { afterEach, beforeEach, describe, expect, test } from '@jest/globals';
import '../src/PathFinding';
import { Heuristic, PathFinding } from '../src';
import { TILE, Utils } from './entry';

describe('PathFinding MANHATTAN', () => {
	let pfManager: PathFinding;

	beforeEach(() => {
		pfManager = new PathFinding();
	});

	afterEach(() => {
		// @ts-expect-error to cleanup object for the next case
		pfManager = null;
	});

	test('PathFinding instance has find method ', () => {
		expect(pfManager.find).not.toBeNull();
		expect(pfManager.find).toBeInstanceOf(Function);
	});

	test('PathFinding instance has setStart method ', () => {
		expect(pfManager.setStart).not.toBeNull();
		expect(pfManager.setStart).toBeInstanceOf(Function);
	});

	test('PathFinding instance has setEnd method ', () => {
		expect(pfManager.setEnd).not.toBeNull();
		expect(pfManager.setEnd).toBeInstanceOf(Function);
	});

	test('PathFinding instance has setWalkable method ', () => {
		expect(pfManager.setWalkable).not.toBeNull();
		expect(pfManager.setWalkable).toBeInstanceOf(Function);
	});

	test('PathFinding Error - There is no start point ', () => {
		const map = [
			[0, 0, 4, 0, 0, 0, 0],
			[3, 3, 3, 0, 0, 0, 0],
			[3, 3, 3, 3, 0, 0, 0],
			[0, 3, 3, 3, 0, 0, 0],
			[0, 0, 8, 3, 0, 0, 0],
		];
		pfManager.setWalkable(0);
		expect(pfManager.find.bind(pfManager, map)).toThrow(
			"There is no start point. Please, use setStart() to configure the path's start point.",
		);
	});

	test('PathFinding Error - There is no end point ', () => {
		const map = [
			[0, 0, 4, 0, 0, 0, 0],
			[3, 3, 3, 0, 0, 0, 0],
			[3, 3, 3, 3, 0, 0, 0],
			[0, 3, 3, 3, 0, 0, 0],
			[0, 0, 0, 3, 0, 0, 0],
		];
		pfManager.setWalkable(0);
		pfManager.setStart(4);
		expect(pfManager.find.bind(pfManager, map)).toThrow(
			"There is no end point. Please, use setEnd() to configure the path's end point.",
		);
	});

	test("PathFinding Error - Couldn't find start point ", () => {
		const map = [
			[0, 0, 4, 0, 0, 0, 0],
			[3, 3, 3, 0, 0, 0, 0],
			[3, 3, 3, 3, 0, 0, 0],
			[0, 3, 3, 3, 0, 0, 0],
			[0, 0, 8, 3, 0, 0, 0],
		];
		pfManager.setWalkable(0);
		pfManager.setStart(10);
		pfManager.setEnd(12);
		expect(pfManager.find.bind(pfManager, map)).toThrow("Couldn't find a start point.");
	});

	test("PathFinding Error - Couldn't find end point ", () => {
		const map = [
			[0, 0, 4, 0, 0, 0, 0],
			[3, 3, 3, 0, 0, 0, 0],
			[3, 3, 3, 3, 0, 0, 0],
			[0, 3, 3, 3, 0, 0, 0],
			[0, 0, 8, 3, 0, 0, 0],
		];
		pfManager.setWalkable(0);
		pfManager.setStart(4);
		pfManager.setEnd(12);
		expect(pfManager.find.bind(pfManager, map)).toThrow("Couldn't find a end point.");
	});

	test('PathFinding find method returns an array ', () => {
		const map = [
			[0, 0, 4, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0],
			[0, 0, 8, 0, 0, 0, 0],
		];
		pfManager.setWalkable(0);
		pfManager.setStart(4);
		pfManager.setEnd(8);
		const result = pfManager.find(map);
		expect(result).toBeInstanceOf(Array);
		result.forEach((node) => {
			expect(node).toHaveProperty('row');
			expect(node).toHaveProperty('col');
		});
	});

	test('PathFinding find method returns an empty array ', () => {
		const map = [
			[0, 0, 4, 0, 0, 0, 0],
			[3, 3, 3, 0, 0, 0, 0],
			[3, 3, 3, 3, 0, 0, 0],
			[0, 3, 3, 3, 0, 0, 0],
			[0, 0, 8, 3, 0, 0, 0],
		];
		pfManager.setWalkable(0);
		pfManager.setStart(4);
		pfManager.setEnd(8);
		const result = pfManager.find(map);
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(0);
	});

	test('PathFinding find method returns same result array for the same search ', () => {
		const map0 = [
			[0, 0, 4, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0],
			[0, 0, 8, 0, 0, 0, 0],
		];

		pfManager.setWalkable(0);
		pfManager.setStart(4);
		pfManager.setEnd(8);

		const result0 = pfManager.find(map0);
		expect(result0).toBeInstanceOf(Array);

		const map1 = [
			[0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0],
		];

		pfManager.setWalkable(0);
		pfManager.setStart({ row: 0, col: 2 });
		pfManager.setEnd({ row: 4, col: 2 });

		const result1 = pfManager.find(map1);
		expect(result1).toBeInstanceOf(Array);

		expect(result1).toStrictEqual(result0);
	});

	test('PathFinding find method return a result', () => {
		const map = [
			[0, 0, 0, 0, 8, 0, 0],
			[0, 0, 0, 0, 0, 3, 0],
			[0, 0, 3, 0, 0, 0, 0],
			[0, 0, 3, 0, 3, 3, 3],
			[0, 0, 0, 0, 4, 0, 3],
		];
		pfManager.setWalkable(0);
		pfManager.setStart(4);
		pfManager.setEnd(8);
		const result = pfManager.find(map);
		expect(result).toBeInstanceOf(Array);
		expect(result.length).toBeGreaterThan(0);
	});

	test('PathFinding find method always return an array.', () => {
		new Array(60).fill(null).forEach(() => {
			const map = Utils.createRandomMap(20, 20);
			pfManager.setWalkable(0);
			pfManager.setStart(TILE.START);
			pfManager.setEnd(TILE.END);
			const result = pfManager.find(map as number[][]);
			expect(result).toBeInstanceOf(Array);
		});
	});
});

describe('PathFinding DIAGONAL', () => {
	let pfManager: PathFinding;

	beforeEach(() => {
		pfManager = new PathFinding({ heuristic: Heuristic.DIAGONAL, allowDiagonal: true });
	});

	afterEach(() => {
		// @ts-expect-error to cleanup object for the next case
		pfManager = null;
	});

	test('PathFinding find method always return an array.', () => {
		new Array(60).fill(null).forEach(() => {
			const map = Utils.createRandomMap(20, 20);
			pfManager.setWalkable(0);
			pfManager.setStart(TILE.START);
			pfManager.setEnd(TILE.END);
			const result = pfManager.find(map as number[][]);
			expect(result).toBeInstanceOf(Array);
		});
	});
});

describe('PathFinding DIAGONAL, allowDiagonal: false', () => {
	let pfManager: PathFinding;

	beforeEach(() => {
		pfManager = new PathFinding({ heuristic: Heuristic.DIAGONAL });
	});

	afterEach(() => {
		// @ts-expect-error to cleanup object for the next case
		pfManager = null;
	});

	test('PathFinding find method always return an array.', () => {
		new Array(60).fill(null).forEach(() => {
			const map = Utils.createRandomMap(20, 20);
			pfManager.setWalkable(0);
			pfManager.setStart(TILE.START);
			pfManager.setEnd(TILE.END);
			const result = pfManager.find(map as number[][]);
			expect(result).toBeInstanceOf(Array);
		});
	});
});

describe('PathFinding using walkable tiles weight', () => {
	let pfManager: PathFinding;

	beforeEach(() => {
		pfManager = new PathFinding({ heuristic: Heuristic.DIAGONAL });
	});

	afterEach(() => {
		// @ts-expect-error to cleanup object for the next case
		pfManager = null;
	});

	test('PathFinding find method always return an array.', () => {
		new Array(20).fill(null).forEach(() => {
			const map = Utils.createRandomMap(20, 20);
			pfManager
				.setWalkable({ type: TILE.GREEN }, { type: TILE.GRASS, weight: 2 })
				.setEnd(TILE.END)
				.setStart(TILE.START);
			const result = pfManager.find(map as number[][]);
			expect(result).toBeInstanceOf(Array);
		});
	});

	test('PathFinding find method always return an array.', () => {
		new Array(20).fill(null).forEach(() => {
			const map = Utils.createRandomMap(20, 20);
			pfManager.setWalkable(TILE.GREEN, { type: TILE.GRASS, weight: 2 }).setEnd(TILE.END).setStart(TILE.START);
			const result = pfManager.find(map as number[][]);
			expect(result).toBeInstanceOf(Array);
		});
	});
});
