const input = require("readline-sync");
const Minesweeper = require("./Minesweeper");


const minesweeper = new Minesweeper();
while (!minesweeper.isGameOver()) {
    console.log();
    minesweeper.displayGrids();
    let row = input.questionInt("Enter row: ");
    let col = input.questionInt("Enter col: ");
    minesweeper.uncoverCell(row, col);
}

this.displayAnswers();
console.log("The game is over");
