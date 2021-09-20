import React, { Component } from 'react';
import Cell from './Cell';
import Minesweeper from '../logic/Minesweeper';
import styles from "../stylesheets/main.module.css";
import { Button } from "react-bootstrap";
import Timer from "./Timer";

let timerInterval;

class Main extends Component {
    state = {
        size: [10, 10],
        firstClick: true,
        minesweeper: "",
        grids: [],
        timer: 0,
        isGameOver: false,
    }

    componentDidMount() {
        this.initGame();
    }

    initGame = () => {
        const [row, col] = this.state.size;
        const minesweeper = new Minesweeper(row, col);
        this.setState({minesweeper, grids: minesweeper.grids, isGameOver: false, firstClick: true});
    }

    restart = e => {
        e.preventDefault();
        this.initGame();

        if (timerInterval) {
            clearInterval(timerInterval);
            this.setState({timer: 0});
        }
    }

    startTimer = () => {
        timerInterval = setInterval(() => {
            if (this.state.timer === 60 * 10 - 1) {
                clearInterval(timerInterval);
                this.gameOver("You lose, the time is out!");
            } else if (this.state.isGameOver) {
                clearInterval(timerInterval);
            } else {
                this.setState({timer: this.state.timer + 1});
            }
        }, 1000);
    }

    uncoverCell = (row, col, e) => {
        e.preventDefault();
        const {minesweeper, firstClick} = this.state;
        if (firstClick) {
            this.setState({firstClick: false});
            this.startTimer();
        }

        minesweeper.uncoverCell(row, col);
        this.setState({grids: minesweeper.grids});

        if (minesweeper.isLost) this.gameOver("You lose, the game is over!");
        else if (minesweeper.isWon) this.gameOver("Congratulations! You win the game!");
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

    gameOver(msg) {
        alert(msg);
        let grids = this.state.minesweeper.getAnswersGrids();
        this.setState({isGameOver: true});
        this.setState({grids});
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.innerContainer}>
                    <div className={"d-flex justify-content-between mb-2"}>
                        <Timer timer={this.state.timer}/>
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

