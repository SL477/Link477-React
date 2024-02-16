import { Link } from "react-router-dom";

export default function Home() {
    const routes = [
        ["/arrays", "Arrays"],
        ["/battleship", "Battleship"],
        ["/gameoflife", "Game Of Life"],
        ["/rockPaperScissors", "Rock Paper Scissors"],
        ["/tictactoe", "Tic Tac Toe"],
        ["/weather", "Weather"]
    ]

    return (
        <ul>
            {routes.map((r, idx)=> <li key={idx}><Link to={r[0]}>{r[1]}</Link></li>)}
        </ul>
    );
}
