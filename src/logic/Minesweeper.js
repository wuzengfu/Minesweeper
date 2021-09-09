import Cell from './Cell.js';

export default class Minesweeper {
    constructor(rows, cols) {
        this.rows = rows || 9;
        this.cols = cols || 9;
        this.mines = Math.floor(this.rows * this.cols * 0.25);
        this.noOfUncovered = 0;
        this.firstUncover = false;
        this.isLost = false;
        this.isWon = false;
        this.grids = this.initGrids();
    }

    initGrids() {
        let grids = [];

        for (let i = 0; i < this.rows; i++) {
            grids.push([]);
            for (let j = 0; j < this.cols; j++) {
                grids[i][j] = new Cell();
            }
        }

        return grids;
    }

    getAnswersGrids() {
        for (let i = 0; i < this.grids.length; i++) {
            for (let j = 0; j < this.grids[0].length; j++) {
                this.grids[i][j].state = "uncovered";
            }
        }

        return this.grids;
    }

    displayAnswers() {
        let output = "";

        for (let i = 0; i < this.grids.length; i++) {
            output += "\n";
            for (let j = 0; j < this.grids[0].length; j++) {
                if (this.grids[i][j].mine) {
                    output += "X";
                } else if (this.grids[i][j].noOfAdjacentMines === 0) {
                    output += "-";
                } else {
                    output += this.grids[i][j].noOfAdjacentMines;
                }
                output += "  ";
            }
        }

        console.log(output);
    }

    displayGrids() {
        let output = "";

        for (let i = 0; i < this.grids[0].length; i++) {
            output += "  ";
        }
        for (let i = 0; i < this.grids.length; i++) {
            output += "\n";
            for (let j = 0; j < this.grids[0].length; j++) {
                let cell = this.grids[i][j];

                if (cell.state === "covered") {
                    output += "?";
                } else if (cell.mine) {
                    output += "X";
                } else if (cell.noOfAdjacentMines === 0) {
                    output += "-";
                } else {
                    output += cell.noOfAdjacentMines;
                }
                output += "  ";
            }
            output += ""+i;
        }

        console.log(output);
    }

    generateStates(row, col) {
        this.generateMines(row, col);
        this.generateAdjacentMines();
    }

    generateMines(row, col) {
        let tables = [];

        while (tables.length !== this.mines) {
            let y = Math.floor(Math.random() * this.rows);
            let x = Math.floor(Math.random() * this.cols);
            let coordinate = y + "," + x;

            if (y !== row && x !== col && !tables.includes(coordinate)) {
                tables.push(coordinate);
                this.grids[y][x].mine = true;
            }
        }
    }

    generateAdjacentMines() {
        for (let i = 0; i < this.grids.length; i++) {
            for (let j = 0; j < this.grids[0].length; j++) {
                if (!this.grids[i][j].mine) {
                    let coordinates = [
                        [i - 1, j - 1], [i - 1, j], [i - 1, j + 1],
                        [i, j - 1], [i, j + 1],
                        [i + 1, j - 1], [i + 1, j], [i + 1, j + 1]
                    ];

                    let noOfAdjacentMines = 0;
                    for (let k = 0; k < coordinates.length; k++) {
                        if (coordinates[k][0] !== -1 && coordinates[k][0] !== this.rows && coordinates[k][1] !== -1 && coordinates[k][1] !== this.cols && this.grids[coordinates[k][0]][coordinates[k][1]].mine) {
                            noOfAdjacentMines++;
                        }
                    }

                    this.grids[i][j].noOfAdjacentMines = noOfAdjacentMines;
                }
            }
        }
    }

    uncoverCell(row, col) {
        let cell = this.grids[row][col];

        if (!this.firstUncover) {
            this.firstUncover = true;
            this.generateStates(row, col);
            this.displayAnswers();
            this.uncoverCell(row, col);
        } else if (cell.mine) {
            console.log("You lose, the game is over");
            cell.state = "uncovered";
            this.displayAnswers();
            this.isLost = true;
        } else if (cell.noOfAdjacentMines === 0) {
            this.uncoverBlankCells(row, col);
            this.checkIsWon();
        } else {
            cell.state = "uncovered";
            this.noOfUncovered++;
            this.checkIsWon();
        }
    }

    checkIsWon() {
        this.isWon = this.noOfUncovered === (this.rows * this.cols - this.mines);
    }

    uncoverBlankCells(row, col, memos = []) {
        let coordinate = row + "," + col;

        if (row < 0 || row === this.rows || col < 0 || col === this.cols || memos.includes(coordinate)) return "";

        let cell = this.grids[row][col];
        if (cell.mine || cell.state === "uncovered") return "";

        if (cell.noOfAdjacentMines > 0) {
            if ([(row + 1) + "," + col, row + "," + (col - 1), row + "," + (col + 1), (row - 1) + "," + col].some(ele => memos.includes(ele))) {
                memos.push(coordinate);
                cell.state = "uncovered";
                this.noOfUncovered++;
            }
            return "";
        }

        memos.push(coordinate);
        cell.state = "uncovered";
        this.noOfUncovered++;

        return this.uncoverBlankCells(row + 1, col, memos) + this.uncoverBlankCells(row, col - 1, memos) + this.uncoverBlankCells(row, col + 1, memos) + this.uncoverBlankCells(row - 1, col, memos);
    }

}
