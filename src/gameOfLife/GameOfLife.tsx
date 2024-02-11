import classes from './GameOfLife.module.css';
import React from 'react';
let timer;

// eslint-disable-next-line no-undef
export default class GameOfLife extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            rows: 16,
            cols: 16,
            started: false,
            generation: 0,
            isDebug: false
        };

        this.createGrid = this.createGrid.bind(this);
        this.toggleLive = this.toggleLive.bind(this);
        this.calcNeighbors = this.calcNeighbors.bind(this);
        this.incrementGeneration = this.incrementGeneration.bind(this);
        this.start = this.start.bind(this);
        this.setGenerations = this.setGenerations.bind(this);
        this.stop = this.stop.bind(this);
        this.clearGrid = this.clearGrid.bind(this);
    }

    createGrid(isRandom) {
        let newGrid = [];
        for (let i = 0; i < this.state.rows; i++) {
            let newRow = [];
            for (let j = 0; j < this.state.cols; j++) {
                if (isRandom) {
                    if (Math.floor(Math.random() * 10) > 7) {
                        newRow.push(1);
                    }
                    else {
                        newRow.push(0);
                    }
                }
                else {
                    newRow.push(0);
                }
            }
            newGrid.push(newRow);
        }
        this.setState({grid: newGrid});
    }

    componentDidMount() {
        this.createGrid(true);
        this.start();
    }

    toggleLive(row, col, current) {
        if (!this.state.started) {
            let newGrid = this.state.grid;
            newGrid[row][col] = current == 0? 1 : 0;
            this.setState({grid: newGrid});
        }
    }

    calcNeighbors(row, col) {
        let ret = 0;
        // check all of the neighbouring cells and see if they are live or dead and return the number of live cells
        let hasLeft = col > 0;
        let hasRight = col < this.state.cols - 1;
        if (row > 0) {
            // has cells above
            if (this.state.grid[row - 1][col] === 1) {
                ret += 1;
            }
            if (hasLeft && this.state.grid[row - 1][col - 1] === 1) {
                ret += 1;
            }
            if (hasRight && this.state.grid[row - 1][col + 1] === 1) {
                ret += 1;
            }
        }

        if (hasLeft && this.state.grid[row][col - 1] === 1) {
            ret += 1;
        }

        if (hasRight && this.state.grid[row][col + 1] === 1) {
            ret += 1;
        }

        //below row
        if (row < this.state.rows - 1) {
            if (this.state.grid[row + 1][col] === 1) {
                ret += 1;
            }
            if (hasLeft && this.state.grid[row + 1][col - 1] === 1) {
                ret += 1;
            }
            if (hasRight && this.state.grid[row + 1][col + 1] === 1) {
                ret += 1;
            }
        }

        return ret;
    }

    incrementGeneration() {
        if (this.state.started) {
            //console.log("generation");
            let newGrid = [...this.state.grid];
            for (let i = 0; i < this.state.rows; i++) {
                for (let j = 0; j < this.state.cols; j++) {
                    let numNeighbours = this.calcNeighbors(i, j);
                    if (this.state.grid[i][j] === 1) {
                        // live cell
                        if (numNeighbours === 2 || numNeighbours === 3) {
                            newGrid[i][j] = 1;
                        }
                        else {
                            newGrid[i][j] = 0;
                        }
                    }
                    else {
                        // dead cell
                        if (numNeighbours === 3) {
                            newGrid[i][j] = 1;
                        }
                        else {
                            newGrid[i][j] = 0;
                        }
                    }
                }
            }
            this.setState({
                grid: newGrid,
                generation: this.state.generation + 1
            });
        }
    }

    start() {
        this.setState({started: true}, this.setGenerations());
    }

    setGenerations() {
        //console.log("called");
        timer = setInterval(this.incrementGeneration, 1000);
    }

    stop() {
        clearInterval(timer);
        this.setState({started: false});
    }

    clearGrid() {
        this.stop();
        this.createGrid(false);
        this.setState({started: false, generation: 0});
    }

    render() {
        let grid = this.state.grid.map((row, i) => {return (
            <div key={i} className={classes.row}>
                {row.map((col, ind) => {return (
                    <div key={ind} className={col === 1? `${classes.col} ${classes.hovered}` : classes.col} onClick={() => this.toggleLive(i, ind, col)}>{this.state.isDebug? this.calcNeighbors(i, ind) : null}</div>
                );})}
            </div>
        );});
        return (
            <div>
                <div className="flex-container">
                    {grid}
                </div>
                <p>Generation: {this.state.generation}</p>
                {/*<p>Started: {this.state.started.toString()}</p>
                <button className="btn btn-primary" onClick={this.incrementGeneration}>Increment</button>*/}
                <button className="btn btn-primary" onClick={this.state.started? this.stop : this.start}>Start/Pause</button>
                <button className="btn btn-danger" onClick={this.clearGrid}>Clear</button>
            </div>
        );
    }
}