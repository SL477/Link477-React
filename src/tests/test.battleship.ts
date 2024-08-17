// /* eslint-disable no-undef */

// $( document ).ready(function() {
//     let position = new Position(4,1);
//     console.log('position',position);
//     let bs = new Ship(position,5,directions.UP);
//     console.log('position',position);

//     //test creation
//     if (!(bs.positions[0].x == position.x &&
//     bs.positions[4].x == position.x &&
//     bs.positions[0].y == position.y &&
//     bs.positions[4].y == position.y + 4)) {
//         console.error('Battleship didnt create properly');
//     }

//     let bsDown = new Ship(position, 5, directions.DOWN);
//     if (!(bsDown.positions[0].x == position.x &&
//         bsDown.positions[4].x == position.x &&
//         bsDown.positions[0].y == position.y &&
//         bsDown.positions[4].y == position.y - 4)) {
//         console.error('Battleship down didnt create properly');
//     }

//     let bsLeft = new Ship(position, 5, directions.LEFT);
//     if (!(bsLeft.positions[0].x == position.x &&
//         bsLeft.positions[4].x == position.x - 4 &&
//         bsLeft.positions[0].y == position.y &&
//         bsLeft.positions[4].y == position.y)) {
//         console.error('Battleship left didnt create properly');
//     }

//     let bsRight= new Ship(position, 5, directions.RIGHT);
//     if (!(bsRight.positions[0].x == position.x &&
//         bsRight.positions[4].x == position.x + 4 &&
//         bsRight.positions[0].y == position.y &&
//         bsRight.positions[4].y == position.y)) {
//         console.error('Battleship right didnt create properly');
//     }

//     //Test hit
//     if (!bs.hit(4,2)) {
//         console.error('Battle ship hit didn\'t work');
//     }
//     if (!bs.positions[1].hit) {
//         console.error('Battleship didn\'t store the hit');
//     }
//     if (bs.hit(7,7)) {
//         console.error('Battle ship hit didn\'t work');
//     }

//     if (bs.isSunk()) {
//         console.error('Battleship isSunk didn\'t work');
//     }
//     bs.hit(4,1);
//     bs.hit(4,3);
//     bs.hit(4,4);
//     bs.hit(4,5);
//     if (!bs.isSunk()) {
//         console.error('Battleship isSunk didn\'t work');
//     }
//     console.log('Battleship',bs);

//     //Test gameboard
//     let gb = new Gameboard();
//     if (!gb.placeShip(position,5,directions.UP)) {
//         console.error('Failed to place battleship on gameboard');
//     }
//     if (gb.placeShip(new Position(4,2),5, directions.UP)) {
//         console.error('Placed ship over another ship');
//     }

//     if (gb.receiveAttack(4,1).result != 'HIT') {
//         console.error('Gameboard receive attack not working');
//     }
//     if (gb.receiveAttack(1,2).result != 'MISS') {
//         console.error('Gameboard receive attack not working');
//     }
//     if (gb.misses.length <= 0) {
//         console.error('Gameboard should record misses');
//     }

//     console.log('Gameboard', gb);
//     console.log('Gameboard stats', gb.getStats());
//     console.log('Gameboard allowed moves', gb.getLegalMovesAgainstThisGameboard());

//     //Players
//     let p = new Player(playerType.AI);
//     p.setupBoard();
//     console.log('Player',p);
//     console.log('Random move against player',p.getRandomMoveAgainstPlayer());
// });
