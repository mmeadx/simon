// Level Count
var level = 0;

// Game Started - T of F
var gameStatus = false;

// Button Color Array
var buttonColors = ["red", "blue", "green", "yellow"];

// Array to hold Computer's pattern
var gamePattern = [];

// Array to hold User's pattern
var userPattern = [];

// Keypress to start game
$(document).keypress(function () {
  if (!gameStatus) {

    // Change level of game
    $("#level-title").text("Level " + level);

    // Call next sequence
    nextSequence();

    // Change game status to start
    gameStatus = true;
  }
});

// Click Hander for replay button
$("#replay").click(() => {

  console.log("Replay clicked");
  replay();

})

// Click hander to start game via clicking H1
$("h1").click(function () {
  if (!gameStatus) {

    // Change level of game
    $("#level-title").text("Level " + level);

    // Call next sequence
    nextSequence();

    // Change game status to start
    gameStatus = true;
  }
});

// Click Handler for button clicks
$(".btn").click(function () {

  var userChosenColor = $(this).attr("id");
  userPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkPattern(userPattern.length - 1);

});

// For the next button in the computer's sequence
function nextSequence() {

  userPattern = [];

  // Up the level count by 1
  level++;

  // Change Level 
  $("#level-title").text("Level " + level);

  // Chooses random number
  var randomNumber = Math.floor(Math.random() * 4);

  // Uses random number 0-3 to choose golor in "buttonColors" array
  var randomChosenColor = buttonColors[randomNumber];

  // Pushes chosen color to the gamePattern array
  gamePattern.push(randomChosenColor);

  // Animates button chosen
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  // Plays sound of button using random chosen color
  playSound(randomChosenColor);


}

// Play Sound Function
function playSound(colorSound) {

  // Concatenates path to find sound using color name
  var audio = new Audio("sounds/" + colorSound + ".mp3");
  audio.play();
}

// Animate Button Press Function
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");;
  }, 100);
}

// Function to check User input against Computer's
function checkPattern(currentLevel) {

  // Last clicked button
  var userPick = userPattern[currentLevel];
  var compPick = gamePattern[currentLevel];

  // Check against computer
  if (userPick == compPick) {
    // console.log("Correct");
    if (userPattern.length === gamePattern.length) {

      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else {

    // Plays 'wrong' sound effect
    playSound("wrong");

    // Background flashes red
    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over")
    }, 300);

    // h1 sets to "Game over"
    $("h1").text("GAME OVER - Press any key to replay");

    startOver();
  }

}

// Function to reset game

function startOver() {
  gameStatus = false;
  level = 0;
  gamePattern = [];
}

// Function to play back computer pattern
function replay() {

  var color = gamePattern[gamePattern.length - 1];
  // console.log(color);
  playSound(color);
  animatePress(color);

}
