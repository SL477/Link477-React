import React from 'react';
import { Link } from 'react-router-dom';
//import '../myStyle.css';

function Navigation() {
    return (
        <div className="container-fluid">
            <nav className="navbar navbar-default navbar-static-top">
                <div className="navbar-header">
                    <Link to="/" className="navbar-brand">Link477</Link>
                </div>
                <ul className="nav navbar-nav">
                    <li><a href="./ColorGridGame/Index.html">Colour Grid Game</a></li>
                    <li><a href="./PongGame/index.html">Pong Game</a></li>
                    <li><Link to="/modelrail">Model Railway</Link></li>
                </ul>
            </nav>
        </div>
    );
}
/*<button className="dropbtn">Manu</button>
                    <div className="dropdown-content">*/
export default Navigation;