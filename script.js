

window.onload = function(){
    
//Global area
var optimalIDs=[4,0,2,6,8,1,3,5,7];
const O = 'O';
const X = 'X';
var cols = document.getElementsByClassName("col");
var grid=[['','',''],['','',''],['','','']];

var winningPos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]; 
var gameOver = false;

var btn = document.getElementById("reset");
btn.addEventListener("click", ResetGameBoard);
 
//Function declaration area
//
//assign click events to each cell
for(var i=0; i<cols.length;i++) {
    cols[i].addEventListener("click", userTurn);
    
}


//function that deals with user marking X
function userTurn(evt) {
   if(!gameOver) { // user can click only if game is not over yet
    var id = evt.currentTarget.id; 
    var row = Math.floor(id/3);
    var col = id % 3;
    if(grid[row][col] === '') {
         grid[row][col] = X;          
         evt.currentTarget.innerHTML = X;
         evt.currentTarget.style.fontSize = "500%";
         DetermineWinner(X);
         computerTurn();
    }  
   }

   
}

//function that deals with computer marking O
function computerTurn() {
    //randomMove();
    optimalMove();
}

//this is random move, it is like easy mode in game for computer hardness
function randomMove() {
    var done=false;
    for(var i=0;i<3 && !done;i++) {
        for(var k=0;k<3 && !done;k++) {
            if(grid[i][k] === '') {
                grid[i][k]= O;
                done = true;
                cols[i*3+k].innerHTML = O;
                cols[i*3+k].style.fontSize = "500%"; 
                DetermineWinner();
            }
        }
    }
}
//this is medium level for computer
function optimalMove() {
    var done=false;
    for(var i=0;i<optimalIDs.length && !done;i++) {
        var id = optimalIDs[i];
        var row = Math.floor(id/3);
        var col = id % 3;        
        if(grid[row][col] === '') {
            grid[row][col]=O;
            done = true;
            cols[row*3+col].innerHTML = O;
            cols[row*3+col].style.fontSize = "500%"; 
            DetermineWinner(O);
        }
      
    }
}
//reset to new game
function ResetGameBoard() {
    for(var i=0;i<3 ;i++) {
        for(var k=0;k<3;k++) {
            grid[i][k] = '';
            cols[i*3+k].innerHTML = '';            
            }
        }
        document.getElementById("status").innerHTML = "This is a new game!!! Click on any of the squares to start the game";
        document.getElementById("message").innerHTML = "";
        gameOver = false;
  }
  
  //determne the winner
  function DetermineWinner(elem) {
    //loop through each winning positions and check if any winner
    //loop stops if game is over i.e. we have a winner
    for(var i=0;i<winningPos.length && !gameOver;i++) {
        var w = winningPos[i];
        var count = 0;
        for(var k=0;k<w.length && !gameOver;k++) {
            var id = w[k];
            var row = Math.floor(id/3);
            var col = id % 3; 
            if(grid[row][col]==elem) count++;
        }
        if(count==3) {
             gameOver = true;
             document.getElementById("status").innerHTML = "Game Over";
            if(elem=='X') {                
                document.getElementById("message").innerHTML = "User is the winner!!!";               
            } else {                
                document.getElementById("message").innerHTML = "Computer is the winner!!!";    
            }
            break;
        }
        
        
    }
    
  }

}



