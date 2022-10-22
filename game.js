// Search for index position to insert or remove a cell.
function findIndex(array, value) {
	let startIndex = 0;
	let endIndex = array.length;
	while (startIndex < endIndex) {
		let midIndex = (startIndex + endIndex) >>> 1;
		if (array[midIndex] < value) startIndex = midIndex + 1;
		else endIndex = midIndex;
	}
	return startIndex;
}

// Update status of a cell based on rules of the game.
function updateCellStatus(row, col, inputBoard, outputBoard) {
	let livingCells = 0;
	const cellNeighborhood = [
		[row - 1, col - 1],
		[row - 1, col],
		[row - 1, col + 1],
		[row, col - 1],
		[row, col],
		[row, col + 1],
		[row + 1, col - 1],
		[row + 1, col],
		[row + 1, col + 1],
	];
	// Count number of living cells in specific cellNeighborhood.
	for (
		let cellLocation = 0;
		cellLocation < cellNeighborhood.length;
		cellLocation++
	) {
		if (
			inputBoard[cellNeighborhood[cellLocation][0]] &&
			inputBoard[cellNeighborhood[cellLocation][0]].includes(
				cellNeighborhood[cellLocation][1]
			)
		) {
			livingCells++;
		}
	}
	// Update status of center cell if necessary.
	if (livingCells === 3 && !outputBoard[row].includes(col)) {
		const index = findIndex(outputBoard[row], col);
		outputBoard[row].splice(index, 0, col);
	}
	if ((livingCells < 3 || livingCells > 4) && outputBoard[row].includes(col)) {
		const index = findIndex(outputBoard[row], col);
		outputBoard[row].splice(index, 1);
	}
}

// Implement the Game of Life here to transform the inputBoard into the outputBoard!
function getNextGeneration(inputBoard) {
	const outputBoard = JSON.parse(JSON.stringify(inputBoard));
	const rowsArray = Object.keys(inputBoard);
	const firstRow = Math.min(...rowsArray);
	const lastRow = Math.max(...rowsArray);
	let firstRowWithCells, lastRowWithCells;

	// Loop over each row.
	for (let currentRow = firstRow - 1; currentRow <= lastRow + 1; currentRow++) {
		if (inputBoard[currentRow] && inputBoard[currentRow].length > 0) {
			// Define first and last rows with data so we can check cells above and below those points.
			if (!firstRowWithCells && firstRowWithCells !== 0)
				firstRowWithCells = currentRow;
			lastRowWithCells = currentRow;
			// Add next key and empty array value to input and output if absent
			if (inputBoard[currentRow + 1] === undefined) {
				inputBoard[currentRow + 1] = [];
				outputBoard[currentRow + 1] = [];
			}
			if (inputBoard[currentRow - 1] === undefined) {
				inputBoard[currentRow - 1] = [];
				outputBoard[currentRow - 1] = [];
			}
			// Determine how many columns to loop through
			let columnStart = Math.min(
				inputBoard[currentRow - 1][0] || Infinity,
				inputBoard[currentRow][0] || Infinity,
				inputBoard[currentRow + 1][0] || Infinity
			);
			let columnEnd = Math.max(
				inputBoard[currentRow - 1][inputBoard[currentRow - 1].length - 1] ||
					-Infinity,
				inputBoard[currentRow][inputBoard[currentRow].length - 1] || -Infinity,
				inputBoard[currentRow + 1][inputBoard[currentRow + 1].length - 1] ||
					-Infinity
			);
			// Loop through each cell in the row.
			for (
				let currentColumn = columnStart - 1;
				currentColumn <= columnEnd + 1;
				currentColumn++
			) {
				updateCellStatus(currentRow, currentColumn, inputBoard, outputBoard);
			}
		}
	}
	// Check cells above and below the living cells to search full perimeter
	for (
		let currentColumn = inputBoard[firstRowWithCells][0] - 1;
		currentColumn <=
		inputBoard[firstRowWithCells][inputBoard[firstRowWithCells].length - 1] + 1;
		currentColumn++
	) {
		updateCellStatus(
			firstRowWithCells - 1,
			currentColumn,
			inputBoard,
			outputBoard
		);
	}
	for (
		let currentColumn = inputBoard[lastRowWithCells][0] - 1;
		currentColumn <=
		inputBoard[lastRowWithCells][inputBoard[lastRowWithCells].length - 1] + 1;
		currentColumn++
	) {
		updateCellStatus(
			lastRowWithCells + 1,
			currentColumn,
			inputBoard,
			outputBoard
		);
	}
	return outputBoard;
}

module.exports = getNextGeneration