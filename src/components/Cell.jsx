import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import styles from "../stylesheets/cell.module.css";

class Cell extends Component {
    getCell = () => {
        const {row, col, cell, flagCell, uncoverCell} = this.props;

        if (cell.state === "covered") {
            return <Button variant={"secondary"}
                           className={styles.cell}
                           onClick={e => uncoverCell(row, col, e)}
                           onContextMenu={e => flagCell(cell, e)}
            />;
        } else if (cell.state === "flagged") {
            return <Button variant={"secondary"}
                           className={styles.cell}
                           onClick={e => uncoverCell(row, col, e)}
                           onContextMenu={e => flagCell(cell, e)}
            >🚩</Button>;
        } else if (cell.state === "uncovered") {
            if (cell.mine) {
                return "💣";
            } else if (cell.noOfAdjacentMines === 0) {
                return "";
            } else {
                return cell.noOfAdjacentMines;
            }
        }
    }

    render() {
        return (
            <td className={styles.td}>
                {this.getCell()}
            </td>
        )
    }
}

export default Cell;
