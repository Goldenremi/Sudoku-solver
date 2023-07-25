// Javascript Sudoku Solver

// Solving the board

// Testing mode functions
const receiveInput = (RIboard) => {
  for (let i = 0; i < 9; i++) {
    let notCorrectLenght = true;
    do {
      data = prompt(
        "Input cell values for row " + (i + 1) + " seperated by comma's"
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

//testing mode functions end

const createBoard = () => {
  let CBboard = [];
  let row = [];
  for (let i = 0; i < 9; i++) {
    row.push(0);
  }
  for (let i = 0; i < 9; i++) {
    CBboard.push(row);
  }
  return CBboard;
};

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

const makeGameObject = (MGOboard) => {
  let gameObject = {
    cells: [],
    rows: [],
    columns: [],
    boxes: [],
  };

  //Game object cells
  let cells = [];
  let cell = {};
  for (let i = 0; i < 9; i++) {
    let row = [];
    for (let j = 0; j < 9; j++) {
      cell = {
        id: "",
        usefulId: "",
        row: "",
        column: "",
        box: "",
        value: "",
        possibleValues: [],
      };
      cell["value"] = MGOboard[i][j];
      cell["id"] = (i + 1).toString() + (j + 1).toString();
      let converter = Number(i.toString() + j.toString());
      let subtracter = Math.floor(converter / 10);
      cell["usefulId"] = converter - subtracter;
      cell["row"] = i;
      cell["column"] = j;

      //cell possibleValues
      if (cell.value === 0) {
        cell["possibleValues"] = [...[1, 2, 3, 4, 5, 6, 7, 8, 9]];
      } else {
        cell["possibleValues"] = [cell.value];
      }

      //cell box
      if (cell.row < 3) {
        if (cell.column < 3) {
          cell["box"] = 0;
        } else if (3 <= cell.column && cell.column <= 5) {
          cell["box"] = 3;
        } else if (cell.column > 5) {
          cell["box"] = 6;
        }
      } else if (3 <= cell.row && cell.row <= 5) {
        if (cell.column < 3) {
          cell["box"] = 1;
        } else if (3 <= cell.column && cell.column <= 5) {
          cell["box"] = 4;
        } else if (cell.column > 5) {
          cell["box"] = 7;
        }
      } else if (cell.row > 5) {
        if (cell.column < 3) {
          cell["box"] = 2;
        } else if (3 <= cell.column && cell.column <= 5) {
          cell["box"] = 5;
        } else if (cell.column > 5) {
          cell["box"] = 8;
        }
      }
      gameObject["cells"].push({ ...cell });
    }
  }

  // Game object rows and columns

  let rows = [];
  let columns = [];
  let boxes = [];
  for (let i = 0; i < 9; i++) {
    rows.push({
      ...{
        id: (i + 1).toString(),
        name: "row",
        boxes: [],
        cellsId: [],
        knownCellsId: [],
        unknownCellsId: [],
        values: [],
        valuesLeft: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      },
    });

    columns.push({
      ...{
        id: (i + 1).toString(),
        name: "column",
        boxes: [],
        cellsId: [],
        knownCellsId: [],
        unknownCellsId: [],
        values: [],
        valuesLeft: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      },
    });

    boxes.push({
      ...{
        id: (i + 1).toString(),
        name: "box",
        cellsId: [],
        knownCellsId: [],
        unknownCellsId: [],
        rows: [],
        columns: [],
        values: [],
        valuesLeft: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      },
    });
  }
  gameObject.rows.push(...rows);
  gameObject.columns.push(...columns);
  gameObject.boxes.push(...boxes);

  for (let i = 0; i < 81; i++) {
    let id = gameObject.cells[i].usefulId;
    let row = gameObject.cells[i].row;
    let column = gameObject.cells[i].column;
    let box = gameObject.cells[i].box;
    let value = gameObject.cells[i].value;

    gameObject.rows[row].cellsId.push(id);
    if (value === 0) {
      gameObject.rows[row].unknownCellsId.push(id);
    } else {
      gameObject.rows[row].knownCellsId.push(id);
      gameObject.rows[row].values.push(value);
      gameObject.rows[row].valuesLeft.splice(
        gameObject.rows[row].valuesLeft.indexOf(value),
        1
      );
    }
    if (gameObject.rows[row].boxes.indexOf(box) == -1) {
      gameObject.rows[row].boxes.push(box);
    }

    gameObject.columns[column].cellsId.push(id);
    if (value === 0) {
      gameObject.columns[column].unknownCellsId.push(id);
    } else {
      gameObject.columns[column].knownCellsId.push(id);
      gameObject.columns[column].values.push(value);
      gameObject.columns[column].valuesLeft.splice(
        gameObject.columns[column].valuesLeft.indexOf(value),
        1
      );
    }
    if (gameObject.columns[column].boxes.indexOf(box) == -1) {
      gameObject.columns[column].boxes.push(box);
    }

    gameObject.boxes[box].cellsId.push(id);
    if (value === 0) {
      gameObject.boxes[box].unknownCellsId.push(id);
    } else {
      gameObject.boxes[box].knownCellsId.push(id);
      gameObject.boxes[box].values.push(value);
      gameObject.boxes[box].valuesLeft.splice(
        gameObject.boxes[box].valuesLeft.indexOf(value),
        1
      );
    }

    if (gameObject.boxes[box].rows.indexOf(row) == -1) {
      gameObject.boxes[box].rows.push(row);
    }
    if (gameObject.boxes[box].columns.indexOf(column) == -1) {
      gameObject.boxes[box].columns.push(column);
    }
  }
  return gameObject;
};

const copyData = (CDgameBoard) => {
  CDgameBoard = JSON.parse(JSON.stringify(CDgameBoard));
  cells.map((e) => {
    coordinate = e.id.split("");
    if (e.value) {
      CDgameBoard[coordinate[1] - 1][coordinate[2] - 1] = Number(e.value);
    } else CDgameBoard[coordinate[1] - 1][coordinate[2] - 1] = 0;
  });
  return CDgameBoard;
};

const strategyScanning = (SSGameObject) => {
  SSGameObject = JSON.parse(JSON.stringify(SSGameObject));
  for (let i = 0; i < 81; i++) {
    let row = SSGameObject.cells[i].row;
    let column = SSGameObject.cells[i].column;
    let box = SSGameObject.cells[i].box;
    let value = SSGameObject.cells[i].value;

    if (value === 0) {
      SSGameObject.cells[i].possibleValues = [
        ...SSGameObject.cells[i].possibleValues.filter((x) =>
          SSGameObject.rows[row].valuesLeft.includes(x)
        ),
      ];
      SSGameObject.cells[i].possibleValues = [
        ...SSGameObject.cells[i].possibleValues.filter((x) =>
          SSGameObject.columns[column].valuesLeft.includes(x)
        ),
      ];
      SSGameObject.cells[i].possibleValues = [
        ...SSGameObject.cells[i].possibleValues.filter((x) =>
          SSGameObject.boxes[box].valuesLeft.includes(x)
        ),
      ];
      if (SSGameObject.cells[i].possibleValues.length === 1) {
        value = SSGameObject.cells[i].possibleValues[0];
        SSGameObject = JSON.parse(
          JSON.stringify(updater(0, SSGameObject, i, value, undefined))
        );
      }
    }
  }
  return SSGameObject;
};

const stratergyExclusiveCells = (SECGameObject) => {
  let cellsId;
  let possibleValues;
  let value;
  let inIt;

  for (let i = 1; i < 10; i++) {
    for (let j = 0; j < 9; j++) {
      cellsId = [...SECGameObject.boxes[j].cellsId];
      inIt = [];
      for (let k = 0; k < 9; k++) {
        possibleValues = [...SECGameObject.cells[cellsId[k]].possibleValues];
        value = SECGameObject.cells[cellsId[k]].value;
        if (possibleValues.includes(i) && value === 0) {
          inIt.push(
            JSON.parse(JSON.stringify(SECGameObject.cells[cellsId[k]]))
          );
        }
      }

      let a;
      let SECArray;
      if (inIt.length !== 0) {
        a = inIt.reduce((acc, x) => inIt[0].column === x.column && acc, true);
      }
      if (a === true) {
        //console.log(inIt,i)
        SECArray = SECGameObject.columns[inIt[0].column].unknownCellsId.filter(
          (x) =>
            SECGameObject.cells[x].possibleValues.includes(i) &&
            SECGameObject.cells[x].box !== j
        );
        //console.log(SECGameObject.columns[inIt[0].column].unknownCellsId)
        SECGameObject = JSON.parse(
          JSON.stringify(
            updater(1, SECGameObject, undefined, [i], [...SECArray])
          )
        );
      }
    }
  }
  return SECGameObject;
};

const advancedScanning = (ASgameObject) => {
  //Slow, Notcompleted
  /*for (let i = 0; i < 9; i++) {
		ASgameObject.boxes[i].cellsId.forEach((value_one) => {
			ASgameObject.cells[value_one].possibleValues.((value_two)=>{
				for (let j = 0; j < 9; j++) {
					ASgameObject.boxes[i].cellsId.forEach((value) => {
			ASgameObject.cells[value].possibleValues.((value)=>{
			})
			})
		})*/

  ASgameObject = JSON.parse(JSON.stringify(ASgameObject));
  let cellsId;
  let possibleValues;
  let value;
  let inIt;

  const repeat = (x) => {
    for (let i = 1; i < 10; i++) {
      for (let j = 0; j < 9; j++) {
        cellsId = [...x[j].cellsId];
        inIt = [];
        for (let k = 0; k < 9; k++) {
          possibleValues = [...ASgameObject.cells[cellsId[k]].possibleValues];
          value = ASgameObject.cells[cellsId[k]].value;
          if (possibleValues.includes(i) && value === 0) {
            inIt.push(
              JSON.parse(JSON.stringify(ASgameObject.cells[cellsId[k]]))
            );
          }
        }

        if (inIt.length === 1) {
          let id = ASgameObject.cells[inIt[0].usefulId].usefulId;
          let value = i;
          ASgameObject = JSON.parse(
            JSON.stringify(updater(0, ASgameObject, id, value, undefined))
          );
        } else if (inIt.length > 1) {
          const repeatTwo = (a, b) => {
            let ASgameArray = [];
            let ASIgnore = [];
            for (let l = 0; l < b.length; l++) {
              ASgameArray.push(b[l].usefulId);
            }
            for (let m = 0; m < a.length; m++) {
              ASIgnore.push(a[m].usefulId);
            }
            if (ASgameArray.length !== ASIgnore.length) {
              ASgameArray = ASgameArray.filter((x) => !ASIgnore.includes(x));
              ASgameObject = JSON.parse(
                JSON.stringify(
                  updater(
                    1,
                    ASgameObject,
                    undefined,
                    [...ASgameObject.cells[ASIgnore[0]].possibleValues],
                    ASgameArray
                  )
                )
              );
              if (a.length === 2) {
                console.log("2");
              }
              if (a.length === 3) {
                console.log("3");
              }
            }
          };
          let caseInit = JSON.parse(JSON.stringify(inIt));
          caseTwoInit = caseInit.filter((x) => x.possibleValues.length === 2);
          caseThreeInit = caseInit.filter((x) => x.possibleValues.length === 3);
          caseFourInit = caseInit.filter((x) => x.possibleValues.length === 4);

          if (
            caseTwoInit.length === 2 &&
            JSON.stringify(caseTwoInit[0].possibleValues) ===
              JSON.stringify(caseTwoInit[1].possibleValues) &&
            caseTwoInit[0].possibleValues.length === 2
          ) {
            repeatTwo(caseTwoInit, inIt);
          }

          if (
            caseThreeInit.length === 3 &&
            (JSON.stringify(caseThreeInit[0].possibleValues) ===
              JSON.stringify(caseThreeInit[1].possibleValues)) ===
              JSON.stringify(caseThreeInit[2].possibleValues) &&
            caseThreeInit[0].possibleValues.length === 3
          ) {
            console.log(3);
            repeatTwo(caseThreeInit, inIt);
          }
        }
      }
    }
    return ASgameObject;
  };
  return repeat(repeat(repeat(ASgameObject.boxes).rows).columns);
};

// const stratergyTunboTunbo = (STTgameBoard) => {
// 	STTgameBoard = JSON.parse(JSON.stringify(STTgameBoard));
// 	//or startergyGuessWork
// 	let STTguessWorkBoardOld
// 	let STTguessWorkBoardNew = [];
// 	let i =0;
// 	do {
// 		console.log("guessing ",i);
// 		i++
// 		STTguessWorkBoardOld = JSON.parse(JSON.stringify(STTguessWorkBoardNew))

// 		for (let i = 0; i < STTgameBoard.cells.length; i++) {
// 			for (
// 				let j = 0;
// 				j < STTgameBoard.cells[i].possibleValues.length &&
// 				STTgameBoard.cells[i].possibleValues.length !== 1;
// 				j++
// 			) {
// 				STTguessWorkBoardNew = STTgameBoard = JSON.parse(
// 					JSON.stringify(
// 						solver(
// 							JSON.parse(
// 								JSON.stringify(
// 									updater(
// 										0,
// 										STTgameBoard,
// 										STTgameBoard.cells[i].usefulId,
// 										STTgameBoard.cells[i].possibleValues[j],
// 										undefined
// 									)
// 								)
// 							),
// 							[
// 								strategyScanning,
// 								stratergyExclusiveCells,
// 								advancedScanning,
// 							]
// 						)
// 					)
// 				);
// 			}
// 		}
// 	} while ( JSON.stringify(STTguessWorkBoardOld) !== JSON.stringify(STTguessWorkBoardNew) && i<2);

// 	return STTguessWorkBoardNew;
// };

const updater = (UMode, UObject, UId, UValue, UArray) => {
  UObject = JSON.parse(JSON.stringify(UObject));
  if (UMode === 0) {
    let Urow = UObject.cells[UId].row;
    let Ucolumn = UObject.cells[UId].column;
    let Ubox = UObject.cells[UId].box;
    let UpossibleValues = [...UObject.cells[UId].possibleValues];

    if (
      UpossibleValues.indexOf(UValue) !== -1 &&
      UObject.rows[Urow].valuesLeft.indexOf(UValue) !== -1 &&
      UObject.columns[Ucolumn].valuesLeft.indexOf(UValue) !== -1 &&
      UObject.boxes[Ubox].valuesLeft.indexOf(UValue) !== -1
    ) {
      UObject.cells[UId].value = UValue;
      UObject.cells[UId].possibleValues = [UValue];

      UObject.columns[Ucolumn].unknownCellsId = [
        ...UObject.columns[Ucolumn].unknownCellsId.filter((x) => x !== UId),
      ];
      UObject.columns[Ucolumn].knownCellsId.push(UId);
      UObject.columns[Ucolumn].values.push(UValue);
      UObject.columns[Ucolumn].valuesLeft.splice(
        UObject.columns[Ucolumn].valuesLeft.indexOf(UValue),
        1
      );

      UObject.rows[Urow].unknownCellsId = [
        ...UObject.rows[Urow].unknownCellsId.filter((x) => x !== UId),
      ];
      UObject.rows[Urow].knownCellsId.push(UId);
      UObject.rows[Urow].values.push(UValue);
      UObject.rows[Urow].valuesLeft.splice(
        UObject.rows[Urow].valuesLeft.indexOf(UValue),
        1
      );

      UObject.boxes[Ubox].unknownCellsId = [
        ...UObject.boxes[Ubox].unknownCellsId.filter((x) => x !== UId),
      ];
      UObject.boxes[Ubox].knownCellsId.push(UId);
      UObject.boxes[Ubox].values.push(UValue);
      UObject.boxes[Ubox].valuesLeft.splice(
        UObject.boxes[Ubox].valuesLeft.indexOf(UValue),
        1
      );

      for (let i = 0; i < 9; i++) {
        let boxCells = [...UObject.boxes[Ubox].cellsId];
        y = UObject.cells[boxCells[i]].value;
        let z = UObject.cells[boxCells[i]].possibleValues.indexOf(UValue);
        if (z !== -1 && y !== UValue) {
          UObject.cells[boxCells[i]].possibleValues.splice(z, 1);
        }
      }

      for (let i = 0; i < 9; i++) {
        let rowCells = [...UObject.rows[Urow].cellsId];
        y = UObject.cells[rowCells[i]].value;
        let z = UObject.cells[rowCells[i]].possibleValues.indexOf(UValue);
        if (z !== -1 && y !== UValue) {
          UObject.cells[rowCells[i]].possibleValues.splice(z, 1);
        }
      }

      for (let i = 0; i < 9; i++) {
        let columnCells = [...UObject.columns[Ucolumn].cellsId];
        y = UObject.cells[columnCells[i]].value;
        let z = UObject.cells[columnCells[i]].possibleValues.indexOf(UValue);
        if (z !== -1 && y !== UValue) {
          UObject.cells[columnCells[i]].possibleValues.splice(z, 1);
        }
      }
    } else {
      console.log(UObject.cells[UId], UValue);
      console.log("is a possible value", UpossibleValues.indexOf(UValue));
      console.log(
        "is a possible value in the row",
        UObject.rows[Urow].valuesLeft.indexOf(UValue)
      );
      console.log(
        "is a possible value in the column",
        UObject.columns[Ucolumn].valuesLeft.indexOf(UValue)
      );
      console.log(
        "is a possible value in the box",
        UObject.boxes[Ubox].valuesLeft.indexOf(UValue)
      );
      console.log("Invalid Update", UId, UValue);
      console.log(UObject);
    }
  } else if (UMode === 1) {
    for (let i = 0; i < UArray.length; i++) {
      //console.log(UObject.cells[UArray[i]].possibleValues,UValue)
      UObject.cells[UArray[i]].possibleValues = [
        ...UObject.cells[UArray[i]].possibleValues.filter(
          (x) => !UValue.includes(x)
        ),
      ];
      //console.log(UObject.cells[UArray[i]].possibleValues,UValue)
    }
  }

  return UObject;
};

const solver = (SObject, Stratergies) => {
  let doneBoard_old;
  let doneBoard_new = {};
  let i = 0;
  do {
    // console.log("solving ", i);
    i++;
    doneBoard_old = JSON.parse(JSON.stringify(doneBoard_new));
    doneBoard_new = SObject = Stratergies.reduce(
      (acc, x) => JSON.parse(JSON.stringify(x(acc))),
      JSON.parse(JSON.stringify(SObject))
    );
  } while (
    JSON.stringify(doneBoard_old) !== JSON.stringify(doneBoard_new) &&
    i < 100
  );

  return doneBoard_new;
};

const displaySolution = () => {
  DSgameObject = JSON.parse(JSON.stringify(solvedGameObject));
  for (let i = 0; i < 81; i++) {
    if (DSgameObject.cells[i].value) {
      id = "#c" + DSgameObject.cells[i].id;

      document.querySelector(id).value = DSgameObject.cells[i].value;
    }
  }

  if (
    boardate(DSgameObject).reduce((acc, e) => e.includes(0) || acc, false) &&
    boardate(DSgameObject).reduce((acc, e) => {
      let isNotZero = e.filter((e) => e !== 0);
      return Boolean(isNotZero.length) || acc;
    }, false)
  ) {
    // console.log(Array.from(document.querySelectorAll('.error-message').classList))
    if (
      Array.from(
        document.querySelectorAll(".error-message")[1].classList
      ).includes("hide-cannot-solve")
    ) {
      document
        .querySelectorAll(".error-message")[1]
        .classList.remove("hide-cannot-solve");
    }
  }
};

const inputHandler = (e) => {
  IHid = e.target.id;
  IHvalue = e.target.value;
  let theClass = e.target.classList[0];

  if (
    !Array.from(
      document.querySelectorAll(".error-message")[1].classList
    ).includes("hide-cannot-solve")
  ) {
    document
      .querySelectorAll(".error-message")[1]
      .classList.add("hide-cannot-solve");
  }
  const verification = (Vvalue) => {
    // console.log(makeGameObject(copyData(createBoard())))
    //ateempt to make 1&1 in same row throw error
    // let errorObject = JSON.parse(JSON.stringify(copyData(createBoard)))
    let trimmedValue = Vvalue.trim();
    if (false) {
    } else if (isNaN(trimmedValue)) {
      return [false, "Value must be a number"];
    } else if (trimmedValue === "") {
      return [true, ""];
    } else if (!Number.isInteger(Number(trimmedValue))) {
      return [false, "Value must be a whole Number"];
    } else if (Number(trimmedValue) >= 1 && Number(trimmedValue) <= 9) {
      return [true, Number(trimmedValue)];
    } else return [false, "Value must be between 1 - 9"];
  };

  const validInput = (VIid, VIreturn, e) => {
    let popIndexTwo = errorId.indexOf(e.target.id);
    if (popIndexTwo !== -1) {
      errorId.splice(popIndexTwo, 1);
      errorValue.splice(popIndexTwo, 1);
    }

    if (Array.from(e.target.classList).includes("invalid")) {
      e.target.classList.remove("invalid", theClass);
      e.target.classList.add(theClass);
    }

    if (!errorId.length) {
      if (
        !Array.from(
          document.querySelector(".error-message").classList
        ).includes("hide-error-message")
      ) {
        document
          .querySelector(".error-message")
          .classList.add("hide-error-message");
      }

      if (!document.querySelector("#solve").getAttribute("disabled")) {
        document.querySelector("#solve").disabled = false;
      } else {
        document.querySelector(".error-message").textContent = errorValue[-1];
      }
    }

    document.querySelector("#" + VIid).value = VIreturn[1];
  };

  const invalidInput = (e, IIvalue) => {
    if (errorId.includes(e.target.id)) {
      let popIndex = errorId.indexOf(e.target.id);

      errorId.splice(popIndex, 1);
      errorValue.splice(popIndex, 1);
    }
    errorId.push(e.target.id);
    errorValue.push(IIvalue[1]);

    if (document.querySelector(".error-message").dataset.show) {
      document.querySelector(".error-message").textContent = IIvalue[1];
    }

    if (!Array.from(e.target.classList).includes("invalid")) {
      e.target.classList.add("invalid", theClass);
    }
    if (
      Array.from(document.querySelector(".error-message").classList).includes(
        "hide-error-message"
      )
    ) {
      document.querySelector(".error-message").textContent = IIvalue[1];
      document
        .querySelector(".error-message")
        .classList.remove("hide-error-message");
    }

    if (!document.querySelector("#solve").getAttribute("disabled")) {
      document.querySelector("#solve").setAttribute("disabled", "");
    }
  };

  verification(IHvalue)[0]
    ? validInput(IHid, verification(IHvalue), e)
    : invalidInput(e, verification(IHvalue));
};

const newestCellHandler = (e) => {
  now = new Date();
  cellClicks[now.getTime()] = e.target.id;
};

const movementHandler = (e) => {
  let id = e.target.id;
  let newId;
  let changing;
  switch (e.key) {
    case "ArrowDown":
      changing = Number(id.slice(1, 2));
      changing =
        (changing + 1) % 10 ? (changing + 1) % 10 : ((changing + 1) % 10) + 1;
      newId = `#c${changing}${id.split("")[2]}`;
      break;
    case "ArrowUp":
      changing = Number(id.slice(1, 2));
      changing =
        (changing - 1) % 10 ? (changing - 1) % 10 : ((changing - 1) % 10) + 9;
      newId = `#c${changing}${id.split("")[2]}`;
      break;
    case "ArrowLeft":
      changing = Number(id.slice(2));
      changing =
        (changing - 1) % 10 ? (changing - 1) % 10 : ((changing - 1) % 10) + 9;
      newId = `#c${id.split("")[1]}${changing}`;
      break;
    case "ArrowRight":
      changing = Number(id.slice(2));
      changing =
        (changing + 1) % 10 ? (changing + 1) % 10 : ((changing + 1) % 10) + 1;
      newId = `#c${id.split("")[1]}${changing}`;
      break;
    case "Enter":
      changing = Number(id.slice(1, 3));
      changing =
        (changing + 1) % 10
          ? changing + 1
          : changing === 99
          ? 11
          : changing + 2;
      console.log(changing);
      newId = `#c${changing}`;
      break;
    case " ":
      changing = Number(id.slice(1, 3));
      changing =
        (changing - 1) % 10
          ? changing - 1
          : changing === 11
          ? 99
          : changing - 2;
      console.log(changing);
      newId = `#c${changing}`;
      break;
  }
  document.querySelector(newId).focus();
};

const buttonsHandler = (e) => {
  if (
    !Array.from(
      document.querySelectorAll(".error-message")[1].classList
    ).includes("hide-cannot-solve")
  ) {
    document
      .querySelectorAll(".error-message")[1]
      .classList.add("hide-cannot-solve");
  }
  if (e.target.textContent === "Clear") {
    document.querySelector(
      "#" +
        cellClicks[Object.keys(cellClicks)[Object.keys(cellClicks).length - 1]]
    ).value = "";
    delete cellClicks[
      Object.keys(cellClicks)[Object.keys(cellClicks).length - 1]
    ];
  } else if (e.target.textContent === "Reset") {
    cells.map((e) => (e.value = ""));
  } else if (e.target.textContent === "Solve") {
    gameObject = JSON.parse(
      JSON.stringify(makeGameObject(copyData(createBoard())))
    );

    // solvedGameObject = stratergyTunboTunbo(
    // 	solver(gameObject, [
    // 		strategyScanning,
    // 		stratergyExclusiveCells,
    // 		advancedScanning,
    // 	])
    // );

    solvedGameObject = solver(gameObject, [
      strategyScanning,
      stratergyExclusiveCells,
      advancedScanning,
    ]);

    displaySolution();
  } else {
    document.querySelector(
      "#" +
        cellClicks[Object.keys(cellClicks)[Object.keys(cellClicks).length - 1]]
    ).value = e.target.textContent;
  }
};

let errorId = [];
let errorValue = [];
let cellClicks = {};
let gameObject = {};
let solvedGameObject;

let gameBox = document.querySelector(".section__game-box");
for (let i = 11; i < 100; i++) {
  i % 10
    ? gameBox.insertAdjacentHTML(
        "beforeend",
        `<input type="text" id="c${i}" class="cell${i}" />`
      )
    : null;
}

let inputButtons = document.querySelector(".section__input-buttons");
for (let i = 9; i > 0; i--) {
  inputButtons.insertAdjacentHTML(
    "afterbegin",
    `<button id="input${i}" class="input-button">${i}</button>`
  );
}

const cells = Array.from(document.querySelectorAll('[class^="cell"]'));

cells.map((e) => e.addEventListener("input", inputHandler));
cells.map((e) => e.addEventListener("click", newestCellHandler));
cells.map((e) => e.addEventListener("keydown", movementHandler));
const buttons = Array.from(document.querySelectorAll('[class$="button"]'));
buttons.map((e) => e.addEventListener("click", buttonsHandler));

// let b = true
// for (let i=0; i<9 && ;i++){
// 	console.log('hi')
// 	b = false
// }
