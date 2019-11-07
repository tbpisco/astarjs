import {assert, expect} from "chai";

import "../src/PathFinding";
import {Heuristic, PathFinding} from '../src';
import {TILE, Utils} from './entry';

describe("PathFinding MANHATTAN", () => {
	let pfManager: PathFinding;

	beforeEach(() => {
		pfManager = new PathFinding();
	});

	afterEach(() => {
		// @ts-ignore
		pfManager = null;
	});

	it("PathFinding instance has find method ", () => {
		assert.isNotNull(pfManager.find);
		assert.isFunction(pfManager.find);
	});

	it("PathFinding instance has setStart method ", () => {
		assert.isNotNull(pfManager.setStart);
		assert.isFunction(pfManager.setStart);
	});

	it("PathFinding instance has setEnd method ", () => {
		assert.isNotNull(pfManager.setEnd);
		assert.isFunction(pfManager.setEnd);
	});

	it("PathFinding instance has setWalkable method ", () => {
		assert.isNotNull(pfManager.setWalkable);
		assert.isFunction(pfManager.setWalkable);
	});

	it("PathFinding Error - There is no start point ", () => {
		const map = [[0,0,4,0,0,0,0],
					 [3,3,3,0,0,0,0],
					 [3,3,3,3,0,0,0],
					 [0,3,3,3,0,0,0],
					 [0,0,8,3,0,0,0]];
		pfManager.setWalkable(0);
		assert.throws(pfManager.find.bind(pfManager, map),'There is no start point. Please, use setStart() to configure the path\'s start point.');
	});

	it("PathFinding Error - There is no end point ", () => {
		const map = [[0,0,4,0,0,0,0],
			[3,3,3,0,0,0,0],
			[3,3,3,3,0,0,0],
			[0,3,3,3,0,0,0],
			[0,0,0,3,0,0,0]];
		pfManager.setWalkable(0);
		pfManager.setStart(4);
		assert.throws(pfManager.find.bind(pfManager, map),'There is no end point. Please, use setEnd() to configure the path\'s end point.');
	});

	it("PathFinding Error - Couldn't find start point ", () => {
		const map = [[0,0,4,0,0,0,0],
			[3,3,3,0,0,0,0],
			[3,3,3,3,0,0,0],
			[0,3,3,3,0,0,0],
			[0,0,8,3,0,0,0]];
		pfManager.setWalkable(0);
		pfManager.setStart(10);
		pfManager.setEnd(12);
		assert.throws(pfManager.find.bind(pfManager, map),'Couldn\'t find a start point.');
	});

	it("PathFinding Error - Couldn't find end point ", () => {
		const map = [[0,0,4,0,0,0,0],
			[3,3,3,0,0,0,0],
			[3,3,3,3,0,0,0],
			[0,3,3,3,0,0,0],
			[0,0,8,3,0,0,0]];
		pfManager.setWalkable(0);
		pfManager.setStart(4);
		pfManager.setEnd(12);
		assert.throws(pfManager.find.bind(pfManager, map),'Couldn\'t find a end point.');
	});

	it("PathFinding find method returns an array ", () => {
		const map = [[0,0,4,0,0,0,0],
					 [0,0,0,0,0,0,0],
					 [0,0,0,0,0,0,0],
					 [0,0,0,0,0,0,0],
					 [0,0,8,0,0,0,0]];
		pfManager.setWalkable(0);
		pfManager.setStart(4);
		pfManager.setEnd(8);
		let result = pfManager.find(map);
		assert.isArray(result);
		result.forEach(node => {
			expect(node).to.have.property('row');
			expect(node).to.have.property('col');
		})
	});

	it("PathFinding find method returns an empty array ", () => {
		const map = [[0,0,4,0,0,0,0],
					 [3,3,3,0,0,0,0],
					 [3,3,3,3,0,0,0],
					 [0,3,3,3,0,0,0],
					 [0,0,8,3,0,0,0]];
		pfManager.setWalkable(0);
		pfManager.setStart(4);
		pfManager.setEnd(8);
		let result = pfManager.find(map);
		assert.isArray(result);
		assert(result.length == 0);
	});

	it("PathFinding find method returns same result array for the same search ", () => {
		const map0 = [[0,0,4,0,0,0,0],
					  [0,0,0,0,0,0,0],
					  [0,0,0,0,0,0,0],
					  [0,0,0,0,0,0,0],
					  [0,0,8,0,0,0,0]];

		pfManager.setWalkable(0);
		pfManager.setStart(4);
		pfManager.setEnd(8);

		let result0 = pfManager.find(map0);
		assert.isArray(result0);

		const map1 = [[0,0,0,0,0,0,0],
					  [0,0,0,0,0,0,0],
					  [0,0,0,0,0,0,0],
					  [0,0,0,0,0,0,0],
					  [0,0,0,0,0,0,0]];

		pfManager.setWalkable(0);
		pfManager.setStart({row:0, col:2});
		pfManager.setEnd({row:4, col:2});

		let result1 = pfManager.find(map1);
		assert.isArray(result1);

		expect(result1).to.eql(result0);
	});

	it("PathFinding find method return a result", () => {
		const map = [
			[0,0,0,0,8,0,0],
			[0,0,0,0,0,3,0],
			[0,0,3,0,0,0,0],
			[0,0,3,0,3,3,3],
			[0,0,0,0,4,0,3]];
		pfManager.setWalkable(0);
		pfManager.setStart(4);
		pfManager.setEnd(8);
		let result = pfManager.find(map);
		assert.isArray(result);
		assert(result.length > 0);
	});

	it("PathFinding find method always return an array.", () => {
		new Array(60).fill(null).forEach((num, numIndex) =>{
			let map = Utils.createRandomMap(20,20);
			pfManager.setWalkable(0);
			pfManager.setStart(TILE.START);
			pfManager.setEnd(TILE.END);
			let result = pfManager.find(map as number[][]);
			assert.isArray(result);
		})
	});
});

describe("PathFinding DIAGONAL", () => {
	let pfManager: PathFinding;

	beforeEach(() => {
		pfManager = new PathFinding({heuristic:Heuristic.DIAGONAL, allowDiagonal:true});
	});

	afterEach(() => {
		// @ts-ignore
		pfManager = null;
	});

	it("PathFinding find method always return an array.", () => {
		new Array(60).fill(null).forEach((num, numIndex) =>{
			let map = Utils.createRandomMap(20,20);
			pfManager.setWalkable(0);
			pfManager.setStart(TILE.START);
			pfManager.setEnd(TILE.END);
			let result = pfManager.find(map as number[][]);
			assert.isArray(result);
		})
	});
});

describe("PathFinding DIAGONAL, allowDiagonal: false", () => {
	let pfManager: PathFinding;

	beforeEach(() => {
		pfManager = new PathFinding({heuristic:Heuristic.DIAGONAL});
	});

	afterEach(() => {
		// @ts-ignore
		pfManager = null;
	});

	it("PathFinding find method always return an array.", () => {
		new Array(60).fill(null).forEach((num, numIndex) =>{
			let map = Utils.createRandomMap(20,20);
			pfManager.setWalkable(0);
			pfManager.setStart(TILE.START);
			pfManager.setEnd(TILE.END);
			let result = pfManager.find(map as number[][]);
			assert.isArray(result);
		})
	});
});