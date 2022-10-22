const getNextGeneration = require('./game');
const BLOCK_BOARD = {
	0: [],
	1: [1, 2],
	2: [1, 2],
	3: [],
};
const BEEHIVE_BOARD = {
	0: [],
	1: [2, 3],
	2: [1, 4],
	3: [2, 3],
	4: [],
};
const BLINKER_BOARD = {
	0: [],
	1: [2],
	2: [2],
	3: [2],
	4: [],
};
const TOAD_BOARD = {
	0: [],
	1: [],
	2: [2, 3, 4],
	3: [1, 2, 3],
	4: [],
	5: [],
};
const GLIDER_BOARD = {
	0: [],
	1: [3],
	2: [4],
	3: [2, 3, 4],
	4: [],
	5: [],
};

describe('Game of Life - getNextGeneration', () => {
	it('a still life should not change across multiple generations', () => {
		const generationOne = BLOCK_BOARD;
		const generationTwo = getNextGeneration(generationOne);
		const generationThree = getNextGeneration(generationTwo);

		expect(generationOne).toEqual(generationTwo);
		expect(generationTwo).toEqual(generationThree);
		expect(generationThree).toEqual(BLOCK_BOARD);
	});
	it('the BEEHIVE_BOARD should not change across multiple generations', () => {
		const generationOne = BEEHIVE_BOARD;
		const generationTwo = getNextGeneration(generationOne);
		const generationThree = getNextGeneration(generationTwo);

		expect(generationOne).toEqual(generationTwo);
		expect(generationTwo).toEqual(generationThree);
		expect(generationThree).toEqual(BEEHIVE_BOARD);
	});
	it('the BLINKER_BOARD should oscillate between two configurations', () => {
		const generationOne = BLINKER_BOARD;
		const generationTwo = getNextGeneration(generationOne);
		const generationThree = getNextGeneration(generationTwo);
		const generationFour = getNextGeneration(generationThree);

		expect(generationOne).toEqual(generationThree);
		expect(generationTwo).toEqual(generationFour);
		expect(generationThree).toEqual(BLINKER_BOARD);
	});
	it('the TOAD_BOARD should oscillate between two configurations', () => {
		const generationOne = TOAD_BOARD;
		const generationTwo = getNextGeneration(generationOne);
		const generationThree = getNextGeneration(generationTwo);
		const generationFour = getNextGeneration(generationThree);

		expect(generationOne).toEqual(generationThree);
		expect(generationTwo).toEqual(generationFour);
		expect(generationThree).toEqual(TOAD_BOARD);
	});
	it('the GLIDER_BOARD should change over several generations', () => {
		const generationOne = GLIDER_BOARD;
		const generationTwo = getNextGeneration(generationOne);
		const generationThree = getNextGeneration(generationTwo);
		const generationFour = getNextGeneration(generationThree);

		expect(generationTwo).toEqual({
			'0': [],
			'1': [],
			'2': [2, 4],
			'3': [3, 4],
			'4': [3],
			'5': [],
		});
		expect(generationThree).toEqual({
			'0': [],
			'1': [],
			'2': [4],
			'3': [2, 4],
			'4': [3, 4],
			'5': [],
		});
		expect(generationFour).toEqual({
			'0': [],
			'1': [],
			'2': [3],
			'3': [4, 5],
			'4': [3, 4],
			'5': [],
		});
	});
});
