import React, { Component } from 'react';
import Cell from './Cell';
import Minesweeper from '../logic/Minesweeper';
import styles from "../stylesheets/main.module.css";
import { Button } from "react-bootstrap";


class Main extends Component {
    state = {
        minesweeper: "",
        grids: [],
    }

    componentDidMount() {
        this.initGame();
    }

    initGame = () => {
        const minesweeper = new Minesweeper();
        this.setState({minesweeper, grids: minesweeper.grids});
    }

    restart = e => {
        e.preventDefault();
        this.initGame();
    }

    uncoverCell = (row, col, e) => {
        e.preventDefault();
        const {minesweeper} = this.state;

        minesweeper.uncoverCell(row, col);
        this.setState({grids: minesweeper.grids});

        if (minesweeper.isLost) {
            alert("You lose, the game is over!");
            let grids = minesweeper.getAnswersGrids();
            this.setState({grids});
        } else if (minesweeper.isWon) {
            alert("Congratulations! You win the game!");
            let grids = minesweeper.getAnswersGrids();
            this.setState({grids});
        }

    }

    flagCell = (cell, e) => {
        e.preventDefault();

        if (cell.state === "flagged") {
            cell.state = "covered";
        } else if (cell.state === "covered") {
            cell.state = "flagged";
        }

        this.setState({grids: this.state.minesweeper.grids});
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.innerContainer}>
                    <div className={"d-flex justify-content-end mb-2"}>
                        <Button variant={"success"} size={"sm"} onClick={e => this.restart(e)}>Restart</Button>
                    </div>

                    <table className={styles.table}>
                        <tbody>
                        {this.state.grids.map((row, i) =>
                            <tr key={i}>
                                {row.map((cell, j) =>
                                    <Cell
                                        row={i}
                                        col={j}
                                        cell={cell}
                                        uncoverCell={this.uncoverCell}
                                        flagCell={this.flagCell}
                                        key={j}
                                    />
                                )}
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Main;

