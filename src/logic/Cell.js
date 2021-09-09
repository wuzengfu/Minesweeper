class Cell {
    constructor() {
        /**
         * There are three states for a cell:
         * <ul>
         *     <li>covered</li>
         *     <li>uncovered</li>
         *     <li>flagged</li>
         * </ul>
         * @type {string}
         */
        this.state = "covered";
        this.mine = false;
        this.noOfAdjacentMines = 0;
    }
}

module.exports = Cell;
