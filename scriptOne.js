/*The sudoku board was represented by an array with respect to of rows only,
which was useful for one stratergy only. 
In future, i'll learn all about the problems to be solved before solving them. 


Most function varibles were prefixed with an abbreviation of the board,
even though their scope is within the function only.

Also,part of the code below might be modified, 
as they were not moved to this seperate file until much later,
and parts were copied and pasted from the main file 
*/

/*
//Creation of the empty board, a 9 by 9 array of empty strings
const createBoard = () => {
	let CBboard = [];
	let row = [];
	for (let i = 0; i < 9; i++) {
		row.push("");
	}
	for (let j = 0; j < 9; j++) {
		CBboard.push(row);
	}
	return CBboard;
};

// Receiving input via prompt during development, later updated
const receiveInput = (RIboard) => {
	for (let i = 0; i < 9; i++) {
		let notCorrectLenght = true;
		do {
			data = prompt(
				"Input data for row " + (i + 1) + " seperated by comma's"
			);
			data = data.split(",");
			if (data.length === 9) {
				notCorrectLenght = false;
			}
		} while (notCorrectLenght);
	}

	RIboard[i] = data;
	for (i = 0; i < 9; i++) {
		for (j = 0; j < 9; j++) {
			if (RIboard[i][j] === "") {
				RIboard[i][j] = 0;
			}
		}
	}
	return RIboard;
};


//Used in main script file to sort needed values in order
const boardate = (BboardObject) => {
	board = [];
	for (i = 0; i < 9; i++) {
		row = [];
		board.push(row);
	}

	for (j = 0; j < 81; j++) {
		board[BboardObject.cells[j].row].push(BboardObject.cells[j].value);
	}
	return board;
};

//Logging in a suitable view to the console,used in main script file during development
const displayBoard = (DBboard) => {
	for (let i = 0; i < 9; i++) {
		string = " ";
		for (let j = 0; j < 9; j++) {
			if (DBboard[i][j] === 0) {
				string = string + "- ";
			} else {
				string = string + DBboard[i][j].toString() + " ";
			}
		}
		console.log(string);
	}
};

//Derivation of rows and columns, as 9 by 9 array
function representation (Rboard){
	let rows = Rboard
	let columns = []
	for (let i = 0; i < 9 ; i++){
		columns.push([])
	}

	for (let i = 0; i < 9 ; i++){
		for (let j = 0; j < 9 ; j++){
			columns[i].push(Rboard[j][i])
		}
	}
	return([rows,columns])
}

//Derivation of boxes, also as 9 by 9 array
function makeBoxes(MBboard){
	let boxes=[]
	for (i=0; i<9; i++){
		boxes.push([])
	}
	
	for (let i=0; i<9; i=i+3){
		for (let j=0; j<3; j++){
			boxes[i].push(MBboard[i][j])
			boxes[i].push(MBboard[i+1][j])
			boxes[i].push(MBboard[i+2][j])
			boxes[i+1].push(MBboard[i][j+3])
			boxes[i+1].push(MBboard[i+1][j+3])
			boxes[i+1].push(MBboard[i+2][j+3])
			boxes[i+2].push(MBboard[i][j+6])
			boxes[i+2].push(MBboard[i+1][j+6])
			boxes[i+2].push(MBboard[i+2][j+6])
		}
	}

	return(boxes) }

//Initial solution function
function solution(common){
	for(i=0; i<9 ;i++){
		for (j = 0 ; j<9 ; j++){
			if (common[i][j]['value'] !==0){
			 	 for (k=0; k<9; k++){
			 	 	let index = common[i][k]['possibleValues'].indexOf(common[i][j]['value'])
			 	 	if (common[i][k] !== common[i][j] && index !==-1 ){	
						common[i][k]['possibleValues'].splice(index,1)	
			 	}
				else if(common[i][k] === common[i][j]){common[i][k]['possibleValues'] = [common[i][j]['value']]
				}
				}
			}

			if (common[i][j]['possibleValues'].length === 1){
				common[i][j]['value'] = common[i][j]['possibleValues'][0]}
		}
	}
	return (common)
}

function runner(solution,Rrows,Rcolumns,Rboxes,RboardArray){
	let newBoardArray 
	let oldboardArray
	do{
		newBoardArray = RboardArray
		oldboardArray = JSON.parse(JSON.stringify(newBoardArray))
		solution(Rrows)
		solution(Rcolumns)
		solution(Rboxes)
		newBoardArray = RboardArray
		i++
	}
	while(JSON.stringify(newBoardArray) !== JSON.stringify(oldboardArray))
	return RboardArray
}

// boardArray = dictionate(board)
// let [rows,columns] = representation(boardArray)
// let boxes = makeBoxes(boardArray)
// displayBoard(boardate(boardArray))
// boardArray = runner(solutionScanning, rows, columns, boxes, boardArray)
// displayBoard(boardate(boardArray))

*/