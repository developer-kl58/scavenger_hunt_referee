var clues = [
    "This is clue 1",
    "This is clue 2",
    "This is clue 3",
    "This is clue 4",
    "This is clue 5",
    "This is clue 6",
    "This is clue 7",
    "This is clue 8",
    "This is clue 9",
    "This is clue 10"
];

var players = [
    "player1",
    "player2",
    "player3",
    "player4",
    "player5",
    "player6",
    "player7",
    "player8",
]

var points = [0,0,0,0,0,0,0,0];

var homeMessage = "Welcome to Scavenger Hunt";
var endMessage = "Good Game Guys!!!"
var cluePosition = -1;
var clueWordElement = document.getElementById("clue-word");
var timerElement = document.getElementById("timer");
var timerButtonElement = document.getElementById("timer-button");
var nextButtonElement = document.getElementById("next-button");
var pointTableElement = document.getElementById("point-table");
var announceButtonElement = document.getElementById("announce-button");
var winnerElement = document.getElementById("winner");
const maxTime = 15;
var myfunc;
var timerOnFlag=false;
var startpageFlag = true;
var endPageFlag = false;
var pointTableVisibleFlag = false;



const getNextClue = () => {
    return clues[++cluePosition];
}

const isNextClueAvailable = () => {
    if(cluePosition<clues.length-1){
        return true;
    }
    return false;
}

const displayHomeMessage = () => {
    clueWordElement.innerHTML = homeMessage;
    timerButtonElement.style.visibility = "hidden";
    nextButtonElement.innerHTML = "Play";
    announceButtonElement.style.visibility = "hidden";
}

const displayNextClue = () => {
    startpageFlag = false;
    if(isNextClueAvailable()){
        clearInterval(myfunc);
        timerElement.innerHTML = "";
        timerOnFlag = false;
        timerElement.style.visibility="hidden";
        clueWordElement.innerHTML = getNextClue();
        timerButtonElement.style.visibility = "visible";
        nextButtonElement.innerHTML = "Next Round"
        pointTableVisibleFlag = false;
        nextButtonElement.style.visibility = "hidden";
    }
    else{
        clearInterval(myfunc);
        clueWordElement.innerHTML = endMessage;
        endPageFlag = true;
        timerButtonElement.style.visibility = "hidden";
        nextButtonElement.style.visibility = "hidden";
        timerElement.innerHTML = "";
        getWinner();
    }
    announceButtonElement.style.visibility = "hidden";
}

const startTimer = () => {
    if(timerOnFlag==false && startpageFlag==false && endPageFlag==false){
        timerOnFlag = true;
        timerElement.style.visibility="visible";
        announceButtonElement.style.visibility = "visible";
        
    let remTime = maxTime-1;
    myfunc = setInterval(function() {
        if(remTime<10){
            timerElement.style.color = "red";
        }
        else{
            timerElement.style.color = "blanchedalmond";
        }
        timerElement.innerHTML = remTime;
        remTime--;
        if(remTime<0){
            timerElement.innerHTML = "TIME UP!!";
        }
        }, 1000)
    }
    
}

const announceRoundWinner = () => {
    if(pointTableVisibleFlag==false){
        createPlayerList();
        pointTableVisibleFlag = true;
    }
    
    pointTableElement.style.visibility = "visible";
    
} 

const createPlayerList = () => {
    var newline = document.createElement('br');
    players.forEach((player,index)=>{
        var radiobox = document.createElement('input');
        radiobox.type = 'radio';
        radiobox.id = 'player'+(index+1);
        radiobox.name = 'players';
        radiobox.value = index;
        radiobox.style.marginLeft = "20px";
        radiobox.style.marginBottom = "20px";
        var label = document.createElement('label');
        label.innerHTML = player+"("+points[index]+")";
        pointTableElement.appendChild(radiobox);
        pointTableElement.appendChild(label);
    })

    var button = document.createElement("button");
    button.className = "button-40";
    button.innerHTML = "Submit";
    button.id = "point-submit-button";
    button.onclick = updatePoints;
    pointTableElement.appendChild(newline);
    pointTableElement.appendChild(button);
}

const updatePoints = () => {
    roundWinner = document.querySelector('input[name="players"]:checked').value;
    points[roundWinner] = points[roundWinner]+1;
    pointTableElement.style.visibility = "hidden";
    pointTableElement.innerHTML = "";
    nextButtonElement.style.visibility = "visible";
    announceButtonElement.style.visibility = "hidden";
    timerButtonElement.style.visibility = "hidden";
}

const getWinner = () => {
    let index = points.indexOf(Math.max(...points));
    console.log("Winner index:"+index);
    winnerElement.innerHTML = "Winner is "+players[index]+ " with "+points[index]+" Points!"
}
