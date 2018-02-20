var currMode = 6;
var mainBgColor = "#232323"
var defaultBgColor = "steelblue";
var colors = [];
var pickedColor;
var game = {};
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeBtn = document.querySelectorAll(".mode");

game.init = function(){
	// Initialise mode buttons
	for(var i=0; i<modeBtn.length; i++){
		modeBtn[i].addEventListener("click",function(){
			for(var j=0; j<modeBtn.length; j++){
				modeBtn[j].classList.remove("selected");
			}
			this.classList.add("selected");
			this.textContent === "Easy" ? currMode = 3 : currMode = 6;
			reset()
		})
	}

	// Initalise square buttons
	for(var i = 0; i<squares.length; i++){
		// Add click listeners to squares
		squares[i].addEventListener("click", function(){
			// grab colour of clicked square and compare color to the picked colour
			var clickedColor = this.style.backgroundColor;
			if(clickedColor === pickedColor){
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play again";
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
			} else {
				this.style.backgroundColor = mainBgColor;
				messageDisplay.textContent = "Try Again";
			}
		})
	}
	reset();
}

game.init();

function reset(){
	colors = generateRandomColors(currMode);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	for(var i=0; i<squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	h1.style.backgroundColor = defaultBgColor;
	messageDisplay.textContent = "";
	resetButton.textContent = "New Colors";
}

// reset button that regenerate all colors on the square and the answer color
resetButton.addEventListener("click", function(){
	reset();
})

// Function to go through all squares and change it to that color
function changeColors(color){
	for(var i=0; i<squares.length; i++){
		squares[i].style.backgroundColor = color;
	}
}

function pickColor(){
	return colors[Math.floor(Math.random()*colors.length)];
}

// Function to generate random color
function randomColor(){
	var red = Math.floor(Math.random()*256);
	var green = Math.floor(Math.random()*256);
	var blue = Math.floor(Math.random()*256);
	return "rgb(" + red + ", " + green + ", " + blue + ")";
}

// Create an array of size num and return it
function generateRandomColors(num){
	var arr = [];
	for(var i=0; i<num; i++){
		arr.push(randomColor());
	}
	return arr;
}