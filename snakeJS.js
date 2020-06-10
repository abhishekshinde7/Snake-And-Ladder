var diceImgSource = ["images/dice/dice1.JPG", "images/dice/dice2.JPG", "images/dice/dice3.JPG", "images/dice/dice4.JPG", "images/dice/dice5.JPG", "images/dice/dice6.JPG"];
var playerImg = ["images/pawn/bluePwan.JPG", "images/pawn/greenPawn.JPG", "images/pawn/redPawn.JPG", "images/pawn/yellowPawn.JPG"];
var winnerArray = [];


PlayerJsonObj = {
    0: 1,
    1: 1,
    2: 1,
    3: 1
}
WinnersObj={
    0: 0,
    1: 0,
    2: 0,
    3: 0
}
SnakeLadderObj = {
     2: 38,
     4: 14,
     9: 31,
    51: 11,
    52: 88,
    56: 15,
    62: 57,
    80: 99,
    92: 53,
    98: 8
}


var winnerCount = 1;
var playerCounter=0;
var totalPlayerCount=4;

function StartGame(){

var elem = document.getElementById("gameMenu");
    elem.setAttribute("class", "hidden");
if(document.getElementById("p1").checked){
totalPlayerCount=1; 
}
else if(document.getElementById("p2").checked){
totalPlayerCount=2; 
}
else if(document.getElementById("p3").checked){
totalPlayerCount=3; 
}
else{
totalPlayerCount=4; 
}

 var elem1 = document.getElementById("gamePage");
    elem1.setAttribute("class", "Visible");
createPlayerPawns();
}

function RollDice() {
    console.log("ttttttttttt=" + playerCounter);
    var elem = document.getElementById("player" + playerCounter + "Display");
    elem.setAttribute("class", "hidden");

    var diceVal = Math.floor(Math.random() * 6) + 1;
    console.log(diceVal);
  
    document.getElementById("DiceImg").src = diceImgSource[diceVal - 1];

    if (SnakeLadderObj.hasOwnProperty(PlayerJsonObj[playerCounter] + diceVal) && (PlayerJsonObj[playerCounter] + diceVal) < 100) {
        console.log("pawn" + playerCounter);
        var elem = document.getElementById("pawn" + playerCounter);

        elem.remove();
        PlayerJsonObj[playerCounter] = SnakeLadderObj[PlayerJsonObj[playerCounter] + diceVal];
        moveThePawn();
    }
    else if (!SnakeLadderObj.hasOwnProperty(PlayerJsonObj[playerCounter] + diceVal) && (PlayerJsonObj[playerCounter] + diceVal) < 100) {
        console.log("pawn" + playerCounter);
        var elem = document.getElementById("pawn" + playerCounter);
        elem.remove();
        PlayerJsonObj[playerCounter] = PlayerJsonObj[playerCounter] + diceVal;
        moveThePawn();
    }
    else if ((PlayerJsonObj[playerCounter] + diceVal) > 100) {

        PlayerJsonObj[playerCounter] = 200 - (PlayerJsonObj[playerCounter] + diceVal);
        if (PlayerJsonObj[playerCounter] === 98) {
            var elem = document.getElementById("pawn" + playerCounter);
            elem.remove();
            PlayerJsonObj[playerCounter] = SnakeLadderObj[PlayerJsonObj[playerCounter]];
            moveThePawn();
        }
        else{
            var elem = document.getElementById("pawn" + playerCounter);
            elem.remove();
            moveThePawn();
        }

    }
    else if ((PlayerJsonObj[playerCounter] + diceVal) === 100) {
        var elem = document.getElementById("pawn" + playerCounter);
        console.log();
        elem.remove();
        PlayerJsonObj[playerCounter] = PlayerJsonObj[playerCounter] + diceVal;
        moveThePawn();
       // winnerArray.push(playerCounter);
        WinnersObj[playerCounter]=1;

WinnerAnnoucement();


    }

    if (diceVal != 6) {
        PlayerCounterFunction();
    }
    
    
}

function createPlayerPawns() {
  
    for (var i = 0; i < totalPlayerCount; i++) {
        var elem = document.createElement("img")
        elem.src= playerImg[i];
        elem.setAttribute("id", "pawn" + i);
        elem.setAttribute("class", "PawnCss" );
        document.getElementById("c1").appendChild(elem);
    }
}
function moveThePawn() {
    var elem = document.createElement("img")
    elem.src = playerImg[playerCounter];
    elem.setAttribute("id", "pawn" + playerCounter);
    elem.setAttribute("class", "PawnCss");
    document.getElementById("c" + PlayerJsonObj[playerCounter]).appendChild(elem);
}
function PlayerCounterFunction() {

   
     CheckWinner();
    
    
    
    console.log("zzzzzzzzzzz=" + playerCounter);
    var elem = document.getElementById("player" + playerCounter + "Display");
    elem.setAttribute("class", "Visible");
}

function CheckWinner(){

 for(;;){
      if(WinnersObj[playerCounter+1]==1 && (playerCounter+1)<totalPlayerCount){
       playerCounter++;
     }
else{
playerCounter++;
if(playerCounter==totalPlayerCount){
playerCounter=-1;
CheckWinner();

}
break;
}
  }

}

function WinnerAnnoucement(){
var elem = document.getElementById("DivWinner" + winnerCount);
    elem.setAttribute("class","Visible");
var elem1 = document.getElementById("winner" + winnerCount);

elem1.innerHTML="Player:"+(playerCounter+1);


winnerCount++;
}



