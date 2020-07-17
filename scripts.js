let order = []; //tracks order of pattern
let playerOrder = []; //tracks order of patter player repeat
let flash; //interger of falshes that have appreared in the game
let turn; // indiciates what turn we are on
let good; //boolean idicating if player has matched pattern
let compTurn; //tracks whether computer or users turn
let intervalId; //
let on = false; //tracks if game is turned on or not
let strict = false; //track if strict mode is checked or unchecked
let noise = true; //
let win; //tracks if player has won or not


// create variables for all interactive HTML elements
const turnCounter = document.querySelector("#turn");
const zoe = document.querySelector("#zoe");
const olivia = document.querySelector("#olivia");
const leslie = document.querySelector("#leslie");
const peyton = document.querySelector("#peyton");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");

//addEventListeners to make it interactive (listens to even happening on THAT SPECIFIC ELEMENT)
//adding the function (in this case the event bracket which is an arrow function), shows what should happen when the change occurs
//if else statements: specify what should happen when one or another situation occurs
strictButton.addEventListener('click', (event) => {
  if (strictButton.checked == true) {
    strict = true;
  } else {
    strict = false;
  }
});


//the even is a click, if it is clicked, then the power is on (true)
//turnCounter: the innerHTML function puts a dash in the turn counter when the game is turned on
//clearColor is a function, we want all the colors of the buttons should turn off
//clearInterval:
onButton.addEventListener('click' , (event) => {
if (onButton.checked == true) {
  on = true;
  turnCounter.innerHTML = "-";
} else {
  on = false;
  turnCounter.innerHTMl = "";
  clearColor();
  clearInterval(intervalId);
  }
});

startButton.addEventListener('click', (event) => {
if(on || win) {
  play();
}
});

//after we press the on button we need to reset all variables,
//then use a for loop to fill up the order in which the flashes are going to happen (need 3 values in the for loop), set i=0 (1st value), then for how many rounds it should run (like i<20 -> 20 loops => 2nd value)
//3rd value at end of the loop: increment i (with i++)
function play() {
  win = false;
  order = [];
  playerOrder = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  turnCounter.innerHTML = 1;
  good = true;
  for (var i = 0; i < 20; i++) {
    order.push(Math.floor(Math.random()*4) + 1);//order is the array, we are going to push something onto the array (.push), we are pushing a random decimal (Math.random), when we *4 and +1 it gives 20 random numbers between 1 and 4  (Math.floor rounds it down)
                                                //shows order in which the lights will flash
  }
  console.log (order);

  compTurn = true;
  intervalId = setInterval(gameTurn, 800);
}


function gameTurn() {
  on = false;

  if (flash == turn) {
    clearInterval (intervalId);
    compTurn = false;
    clearColor();
    on = true;
  }


  if (compTurn) {
    clearColor();
    setTimeout(() => {
      if (order[flash] == 1) zoef();
      if (order[flash] == 2) oliviaf();
      if (order[flash] == 3) leslief();
      if (order[flash] == 4) peytonf();
      flash++;
    }, 200);
  }
}

////we reference the video, then audio.play plays the sound
//.style accesses the style of the top left button, backgroundImage is the image change when function zoef is run
  function zoef() {
    if (noise){
      let audio = document.getElementById("soundzoe");
      audio.play();
    }
    noise = true;
    document.getElementById("zoe").style.backgroundImage = "url('cat.jpg')";
  }

  function oliviaf() {
    if (noise){
      let audio = document.getElementById("soundolivia");
      audio.play();
    }
    noise = true;
    document.getElementById("olivia").style.backgroundImage = "url('horse.jpg')";
  }

  function leslief() {
    if (noise){
      let audio = document.getElementById("soundleslie");
      audio.play();
    }
    noise = true;
    document.getElementById("leslie").style.backgroundImage = "url('goat.jpg')";
  }
  function peytonf() {
    if (noise){
      let audio = document.getElementById("soundpeyton");
      audio.play();
    }
    noise = true;
    document.getElementById("peyton").style.backgroundImage = "url('https://static.bangkokpost.com/media/content/20190530/c1_1686224_190530122737.jpg')";
  }
//
  function clearColor() {
    document.getElementById("zoe").style.backgroundImage = "url('grouppictureZoe.png')";
    document.getElementById("olivia").style.backgroundImage = "url('grouppictureOlivia.png')";
    document.getElementById("leslie").style.backgroundImage = "url('grouppictureLeslie.png')";
    document.getElementById("peyton").style.backgroundImage = "url('grouppicturePeyton.png')";
  }

  function flashColor() {
    document.getElementById("zoe").style.backgroundImage = "url('cat.jpg')";
    document.getElementById("olivia").style.backgroundImage = "url('horse.jpg')";
    document.getElementById("leslie").style.backgroundImage = "url('goat.jpg')";
    document.getElementById("peyton").style.backgroundImage = "url('https://static.bangkokpost.com/media/content/20190530/c1_1686224_190530122737.jpg')";
  }

//can only click on the buttons when the device is on
//playerorder is an array of what the user has pressed, so if the user clicks on the zoe button, then that number is going to be put on the playerOrder array
//check() checks if player was right
//if player has NOT won (!win) yet, the color is cleared after 300 ms (makes it "light up" only a short amount of time)
  zoe.addEventListener('click', (event) => {
    if (on) {
      playerOrder.push(1);
      check();
      zoef();
      if(!win) {
        setTimeout(() => {
          clearColor();
        }, 300);
      }
    }
  })

  olivia.addEventListener('click', (event) => {
    if (on) {
      playerOrder.push(2);
      check();
      oliviaf();
      if(!win) {
        setTimeout(() => {
          clearColor();
        }, 300);
      }
    }
  })

  leslie.addEventListener('click', (event) => {
    if (on) {
      playerOrder.push(3);
      check();
      leslief();
      if(!win) {
        setTimeout(() => {
          clearColor();
        }, 300);
      }
    }
  })

  peyton.addEventListener('click', (event) => {
    if (on) {
      playerOrder.push(4);
      check();
      peytonf();
      if(!win) {
        setTimeout(() => {
          clearColor();
        }, 300);
      }
    }
  })

  //check function: checks if
  function check() {
    if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
      good = false;

    if (playerOrder.length == 6 && good == true) {
      winGame();
    }

    if (good == false) {
      flashColor();
      turnCounter.innerHTML = "LAME!";
      let audio = document.getElementById("soundwrong");
      audio.play();
      setTimeout(() => {
        turnCounter.innerHTML = turn;
        clearColor();

        if (strict) {
        play();
        } else {
          compTurn = true;
          flash = 0;
          playerOrder = [];
          good = true;
          intervalId = setInterval(gameTurn, 800);
      }
    }, 800);

    noise = false;
    }


    //if the player has matched the patter and not won yet. They proceed to the next turn and the game continues
    if (turn == playerOrder.length && good && !win) {
      turn++;
      playerOrder = [];
      compTurn = true;
      flash = 0;
      turnCounter.innerHTML = turn;
      intervalId = setInterval(gameTurn,800);
    }
  }

    function winGame() {
      flashColor();
      turnCounter.innerHTML = "WIN!";
      on = false;
      win = true;
    }
