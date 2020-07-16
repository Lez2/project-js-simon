//define key variables
var audio = [new Audio("./sounds/green.mp3"), new Audio("./sounds/blue.mp3"), new Audio("./sounds/red.mp3"), new Audio("./sounds/yellow.mp3"), new Audio("./sounds/wrong.mp3")];
//var memoryArray = []; WE WANT TO REPEAT THE PAST SEQUENCE...LATER
//var memoryArrayCounter = 0;
var userArr = [];
var gameArr = [];
//var userArrayCounter = 0;
var level = 0;
var levelCounter = 0;
//var tempo;

//press key to start
$(document).on("keydown", function(e){
  if (e.keycode == 13){
    nextSequence();
  }

});
console.log(nextSequence);

//generate random number and put it in gameArr
function nextSequence() {
  var randNum = Math.floor(Math.random()*4);
  gameArr.push(randNum);
  showSequence(gameArr[gameArr.length -1]);
  changelevel();
  userArr = [];

  console.log(userArr)
};


//display the color and sound of each option
function showSequence(element) {
  switch(element){
    case 0:
      audio[0].play();
      $("#zoe").addClass("dissapear");
      setTimeout(function(){
        $('#zoe').removeClass("dissapear");
      }, 250)
      break;

    case 1:
      audio[2].play();
      $("#olivia").addClass('dissapear');
      setTimeout(function(){
        $("#olivia").removeClass("dissapear");
      }, 250)
      break;

    case 2:
      audio[3].play();
      $("#leslie").addClass("dissapear");
      setTimeout(function(){
          $("#leslie").removeClass("dissapear");
      }, 250)
      break;

    case 3:
      audio[1].play();
      $("#peyton").addClass("dissapear");
      setTimeout(function () {
          $("#peyton").removeClass("dissapear");
        }, 250)
      break;
    }
  };
//level counter
function changeLevel() {
  levelCounter++;
  $("#level-title").text(`Level: ${levelCounter}`)
  console.log(levelCounter);
};

//convert click into numbers and put it in a new array
$(".btn").click(function(e){
  var userClicked= $(this).attr("id");
  switch(userClicked){
      case "zoe":
          userArr.push(0);
          showSequence(0);
          break;

      case "olivia":
          userArr.push(1);
          showSequence(1);
          break;

      case "leslie":
          userArr.push(2);
          showSequence(2);
          break;

      case "peyton":
          userArr.push(3);
          showSequence(3);
          break;
      }
  checkSequence(userArr.length-1);
});

//check if sequences are correct
//This checks if the sequences is correct so far
function checkSequence(indexOfArray)
{

  if(userArr[indexOfArray] === gameArr[indexOfArray]){

    if(userArr.length === gameArr.length) {
         setTimeout(function () {
          nextSequence();
         }, 1000);
      }
  } else {
    launchError();
  }
}
// Launches error sequence
function launchError(){
$("body").css("background-color", "red")
$("h1").text("Game Over");
  setTimeout(function () {
      $("h1").text("Press Enter Key to start");
      $("body").css("background-color", "#011F3F");
  }, 1500)
audio[4].play();
levelCounter=0;
sequenceMade = [];
}
