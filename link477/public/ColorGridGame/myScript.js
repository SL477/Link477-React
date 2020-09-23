//need a 14 by 14 grid and 6 colours
var colorGrid = [];
var numMoves = 0;
var hasWon = false;

//when it restarts the new canvas isn't tied to the buttons
var myGameArea = {
    canvas : document.getElementById("canvas"),//document.createElement("canvas"),
    start : function() {
		console.log('canvas',canvas);
        //this.canvas.width = 280;
       // this.canvas.height = 280;
        this.context = this.canvas.getContext("2d");
		var parElement = document.getElementById("wrapper");
		parElement.insertBefore(this.canvas, parElement.childNodes[0]);
        /* this.interval = setInterval(updateGameArea, 20); */
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function startGame() {   
	fillGrid();
	myGameArea.start();
	updateGameArea();
}

function restartGame() {
	numMoves = 0;
	document.getElementById("NumMoves").innerHTML = "Number of Moves: " + numMoves;
	colorGrid = [];
	fillGrid();
	updateGameArea();
 	hasWon = false;
/*	var winBanner = document.getElementById("win")
	winBanner.parentNode.removeChild(winBanner); */
}

function updateGameArea () {
	myGameArea.clear();
 	for (i = 0; i < colorGrid.length; i++) {
		colorGrid[i].update();
	}
	checkGrid()
}

function component(X, Y, color, grouped) {
	this.width = 20;
	this.height = 20;
	this.X = X * 20;
	this.Y = Y * 20;
	this.color = color;
	this.grouped = grouped;
	this.update = function() {
		ctx = myGameArea.context;
		ctx.fillStyle = this.color;
		ctx.fillRect(this.X, this.Y, this.width, this.height);
	}
	this.SetConnected = function () {
		this.grouped = true;
	}
 	this.SetColor = function(code) {
		this.color = code;
	} 
}

function fillGrid () {
	for (i = 0; i < 14; i++){
		for (j = 0; j < 14; j++) {
			var connected
			if (i == 0 && j == 0) {
				connected = true;
			} else {
				connected = false;
			};
			
			var retString
			switch (Math.floor(Math.random() * 7)){
			
			case 0:
				retString = "White";
				break;
			case 1:
				retString = "Blue";
				break;
			case 2:
				retString = "Green";
				break;
			case 3:
				retString = "Purple";
				break;
			case 4:
				retString = "#e6e600";
				break;
			default:
				retString = "Red";
			}
			var newBox = new component(i, j, retString, connected);
			colorGrid.push(newBox);	
		}
	}
}
 
 function checkGrid () {
	 var numConnected = 0
	 for (i = 0; i < 196; i++) {
		 if (colorGrid[i].grouped == true){
			 if ((i + 1) % 14 > 0) {
				 if (colorGrid[i].color == colorGrid[i + 1].color) {
					 //check the one above
					 colorGrid[i + 1].SetConnected()
				 }
			 }
			 if (i < 182) {
				 if (colorGrid[i].color == colorGrid[i + 14].color) {
					 //check the one right
					 colorGrid[i + 14].SetConnected()
				 }
			 }
			 
			 //check the one below
			 if (i % 14 > 0){
				if (colorGrid[i].color == colorGrid[i - 1].color) {
					colorGrid[i - 1].SetConnected()
				}
			 }
			 
			 //check the one left
			 if (i > 13) {
				 if (colorGrid[i].color == colorGrid[i - 14].color) {
					 colorGrid[i - 14].SetConnected()
				 }
			 }
			 numConnected +=1
		 }
	 }
	/* document.getElementById("hi").innerHTML = numConnected */
	if (numConnected == 196) {
		winningFun();
	}
 }
 
 function winningFun() {
	if (hasWon == false) {
	hasWon = true;
	/* var boldBanner = document.createElement.createElement("p")
	boldBanner.id = "Win";
	var winText = "You've won!"
	var winBanner = document.createTextNode(winText)
	boldBanner.appendChild(winBanner)
	var parElement = document.getElementById("wrapper");
	parElement.insertBefore(boldBanner, parElement.lastChild);
	updateGameArea(); */
	}
 }
 
 function changeColor(colorCode){
	 if (hasWon == false) {
	 for (i = 0; i < 196; i++) {
		  if (colorGrid[i].grouped == true){
 			  colorGrid[i].SetColor(colorCode) 
		  }
	 }
	 numMoves += 1;
	 document.getElementById("NumMoves").innerHTML = "Number of Moves: " + numMoves;
	 updateGameArea();
	 }
 }