import { useState } from 'react';

export default function RockPaperScissors() {
    const [humanScore, setHumanScore] = useState(0);
    const [computerScore, setComputerScore] = useState(0);
    const [roundNumber, setRoundNumber] = useState(0);
    const [lastPC, setLastPC] = useState('');
    const [lastHuman, setLastHuman] = useState('');
    const [lastResult, setLastResult] = useState('');
    const RPS = ['ROCK', 'PAPER', 'SCISSORS'];

    const computerPlay = () => RPS[Math.floor(Math.random() * 3)];

    const playRound = (playerSelection: string, computerSelection: string) => {
        // return AI, PLAYER or DRAW
        if (playerSelection === computerSelection) {
            return 'DRAW';
        }
        // scissors beats paper, paper beats rock, rock beats scissors
        if (playerSelection === 'ROCK') {
            if (computerSelection === 'PAPER') {
                return 'AI';
            }
            else {
                return 'PLAYER';
            }
        }
        else if (playerSelection === 'PAPER') {
            if (computerSelection === 'ROCK') {
                return 'PLAYER';
            }
            else {
                return 'AI';
            }
        }
        else {//scissors
            if (computerSelection === 'ROCK') {
                return 'AI';
            }
            else {
                return 'PLAYER';
            }
        }
    };

    const humanPlay = (selection: string) => {
        const pcPlay = computerPlay();
        const result = playRound(selection, pcPlay);

        if (result === 'AI') {
            setComputerScore(computerScore + 1);
        }
        else if (result === 'PLAYER') {
            setHumanScore(humanScore + 1);
        }
        setRoundNumber(roundNumber + 1);
        setLastPC(pcPlay);
        setLastHuman(selection);
        setLastResult(result);
    };

    return (
        <div>
            <p>My answer to <a target="_blank" rel="noopener" href="https://www.theodinproject.com/paths/foundations/courses/foundations/lessons/rock-paper-scissors">Odin Rock, Paper, Scissors</a></p>
            <p>Round Number: {roundNumber}</p>
            <p>Player Score: {humanScore}</p>
            <p>Computer Score: {computerScore}</p>
            <p>Last Computer Play: {lastPC}</p>
            <p>Last Player Play: {lastHuman}</p>
            <p>Last Result: {lastResult}</p>
            <button type='button' className="btn btn-primary" onClick={() => humanPlay(RPS[0])}>Rock</button>
            <button type='button' className="btn btn-primary" onClick={() => humanPlay(RPS[1])}>Paper</button>
            <button type='button' className="btn btn-primary" onClick={() => humanPlay(RPS[2])}>Scissors</button>
        </div>
    );
}