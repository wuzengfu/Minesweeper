import React, { Component } from 'react';
import styles from '../stylesheets/timer.module.css';

class Timer extends Component {

    getTime = () => {
        const {timer} = this.props;
        const min = Math.floor(timer / 60);
        const sec = timer % 60;
        return `${min}:${sec < 10 ? '0' + sec : sec}`;
    }

    render() {
        return (
            <span className={styles.timer}>{this.getTime()}</span>
        );
    }
}

export default Timer;
