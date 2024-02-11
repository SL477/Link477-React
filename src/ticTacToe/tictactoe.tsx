import React from "react";

export default class TicTacToe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentGrid: [0,1,2,3,4,5,6,7,8],//["X", 1, "O", "X", 4, "X", "O", "O", 8],
            aiMark: '',
            humanMark: '',
            block: false,
            message: '',
            humanScore: 0,
            aiScore: 0,
        };

        this.displayValue = this.displayValue.bind(this);
        this.getAllEmptyCellsIndexes = this.getAllEmptyCellsIndexes.bind(this);
        this.checkIfWinnerFound = this.checkIfWinnerFound.bind(this);
        this.minimax = this.minimax.bind(this);
        this.humanMove = this.humanMove.bind(this);
        this.resetGame = this.resetGame.bind(this);
    }

    displayValue(index) {
        if (this.state.currentGrid[index] === 'X' || this.state.currentGrid[index] === 'O') {
            return this.state.currentGrid[index];
        }
        else {
            return ' ';
        }
    }

    getAllEmptyCellsIndexes(currBdSt) {
        //Step 4
        return currBdSt.filter(i => i !== 'X' && i !== 'O');
    }

    checkIfWinnerFound(currBdSt, currMark) {
        //Step 5
        if (
            (currBdSt[0] === currMark && currBdSt[1] === currMark && currBdSt[2] === currMark) ||
            (currBdSt[3] === currMark && currBdSt[4] === currMark && currBdSt[5] === currMark) ||
            (currBdSt[6] === currMark && currBdSt[7] === currMark && currBdSt[8] === currMark) ||
            (currBdSt[0] === currMark && currBdSt[3] === currMark && currBdSt[6] === currMark) ||
            (currBdSt[1] === currMark && currBdSt[4] === currMark && currBdSt[7] === currMark) ||
            (currBdSt[2] === currMark && currBdSt[5] === currMark && currBdSt[8] === currMark) ||
            (currBdSt[0] === currMark && currBdSt[4] === currMark && currBdSt[8] === currMark) ||
            (currBdSt[2] === currMark && currBdSt[4] === currMark && currBdSt[6] === currMark) 
        ) {
            return true;
        }
        else {
            return false;
        }
    }

    minimax(currBdSt, currMark) {
        //Step 8
        const availCellsIndexes = this.getAllEmptyCellsIndexes(currBdSt);

        //Step 9, check if terminal state
        if (this.checkIfWinnerFound(currBdSt, this.state.humanMark)) {
            return {score: -1};
        }
        else if (this.checkIfWinnerFound(currBdSt, this.state.aiMark)) {
            return {score: 1};
        }
        else if (availCellsIndexes.length === 0) {
            return {score: 0};
        }

        //Step 10
        const allTestPlayInfos = [];

        //Step 11
        for (let i = 0; i < availCellsIndexes.length; i++) {
            const currentTestPlayInfo = {};
            currentTestPlayInfo['index'] = currBdSt[availCellsIndexes[i]];
            currBdSt[availCellsIndexes[i]] = currMark;

            if (currMark === this.state.aiMark) {
                const result = this.minimax(currBdSt, this.state.humanMark);
                currentTestPlayInfo['score'] = result['score'];
            }
            else {
                const result = this.minimax(currBdSt, this.state.aiMark);
                currentTestPlayInfo['score'] = result['score'];
            }

            //Step 12
            currBdSt[availCellsIndexes[i]] = currentTestPlayInfo.index;

            allTestPlayInfos.push(currentTestPlayInfo);
        }

        //Step 14

        //Step 15
        let bestTestPlay = null;

        //Step 16
        if (currMark === this.state.aiMark) {
            let bestScore = -Infinity;
            for (let i = 0; i < allTestPlayInfos.length; i++) {
                if (allTestPlayInfos[i].score > bestScore) {
                    bestScore = allTestPlayInfos[i].score;
                    bestTestPlay = i;
                }
            }
        }
        else {
            let bestScore = Infinity;
            for (let i = 0; i < allTestPlayInfos.length; i++) {
                if (allTestPlayInfos[i].score < bestScore) {
                    bestScore = allTestPlayInfos[i].score;
                    bestTestPlay = i;
                }
            }
        }

        //Step 17
        return allTestPlayInfos[bestTestPlay];
    }

    resetGame() {
        //delay 5 seconds and then restart
        this.setState({block: true});
        setTimeout(() => {
            this.setState({currentGrid: [0,1,2,3,4,5,6,7,8], block: false, message: ''});
        }, 3000);
    }

    humanMove(index) {
        if (this.state.block) {
            //waiting for the computer to move
            return;
        }
        console.log('test', index);
        if (this.displayValue(index) === ' ') {
            let currBdSt = [...this.state.currentGrid];
            currBdSt[index] = this.state.humanMark;
            this.setState({currentGrid: currBdSt, block: true});
            if (this.checkIfWinnerFound(currBdSt, this.state.humanMark)) {
                //alert('You won!');
                this.setState({message: 'You won!', humanScore: (this.state.humanScore + 1)});
                this.resetGame();
            }
            else if (this.getAllEmptyCellsIndexes(currBdSt).length === 0) {
                //alert('Draw!');
                this.setState({message: 'Draw!'});
                this.resetGame();
            }
            else {
                //console.log(this.minimax(currBdSt, this.state.aiMark));
                setTimeout(() => {
                    let aiMove = this.minimax(currBdSt, this.state.aiMark);
                    console.log(aiMove);
                    currBdSt[aiMove.index] = this.state.aiMark;
                    this.setState({currentGrid: currBdSt, block: false});
                    if (this.checkIfWinnerFound(currBdSt, this.state.aiMark)) {
                        //alert('You lost!');
                        this.setState({message: 'You lost!', aiScore: (this.state.aiScore + 1)});
                        this.resetGame();
                    }
                    else if (this.getAllEmptyCellsIndexes(currBdSt).length === 0) {
                        //alert('Draw!');
                        this.setState({message: 'Draw!'});
                        this.resetGame();
                    }
                }, 1000);
            }
        }
        else {
            console.log('Position filled');
        }
    }

    render() {
        let disp;
        if (this.state.humanMark === '') {
            disp = (
                <div className="centre">
                    <p className="choose">Choose your side:</p>
                    <button className="btn btn-primary" onClick={() =>this.setState({aiMark: 'O', humanMark: 'X'})}>X</button>
                    <button className="btn btn-primary" onClick={() =>this.setState({aiMark: 'X', humanMark: 'O'})}>O</button>
                </div>
            );
        }
        else {
            disp = (
                <div className="centre">
                    <div className="tbl">
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <td className="td" onClick={() =>{this.humanMove(0);}}>{this.displayValue(0)}</td>
                                    <td className="td" onClick={() =>{this.humanMove(1);}}>{this.displayValue(1)}</td>
                                    <td className="td" onClick={() =>{this.humanMove(2);}}>{this.displayValue(2)}</td>
                                </tr>
                                <tr>
                                    <td className="td" onClick={() =>{this.humanMove(3);}}>{this.displayValue(3)}</td>
                                    <td className="td" onClick={() =>{this.humanMove(4);}}>{this.displayValue(4)}</td>
                                    <td className="td" onClick={() =>{this.humanMove(5);}}>{this.displayValue(5)}</td>
                                </tr>
                                <tr>
                                    <td className="td" onClick={() =>{this.humanMove(6);}}>{this.displayValue(6)}</td>
                                    <td className="td" onClick={() =>{this.humanMove(7);}}>{this.displayValue(7)}</td>
                                    <td className="td" onClick={() =>{this.humanMove(8);}}>{this.displayValue(8)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/*Step 7*/}
                    {/*<button className="btn btn-primary" onClick={ () => console.log(this.minimax(this.state.currentGrid, this.state.aiMark))}>MiniMax</button>*/}
                    <br/>
                    <div className="scoresTbl">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th className="centre">Your Score</th>
                                    <th className="centre">Computer Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{this.state.humanScore}</td>
                                    <td>{this.state.aiScore}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>{this.state.message}</p>
                </div>
            );
        }

        return (<div>{disp}</div>);
    }
}