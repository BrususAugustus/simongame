//Arrays
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];

var started=false;
var level=0;

$(".btn").on("click", function(event) { //On click, check which button was clicked and add it to the array
  var userChosenColour = event.currentTarget.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});




$(document).keypress(function()
{
  if(started!=true)
  {
    $("#level-title").text("Level "+level);
    nextSequence();
    started=true;

  }

});



function nextSequence() {


  level++;
  $("#level-title").text("Level "+level);
  var randomNumber = Math.round((Math.random() * 3));
  // console.log(randomNumber);
  //Choose a colour from given options
  var randomChosenColour = buttonColours[randomNumber];
  //Add this colour to pattern
  gamePattern.push(randomChosenColour);
  //animation
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

function nextSequence() {

  //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}


function playSound(name) {
  var colour_sound = new Audio("sounds/" + name + ".mp3");
  colour_sound.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100)
}

function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {
      startOver()
      var wrong_audio= new Audio("sounds/wrong.mp3");
      wrong_audio.play();
     $("h1").text("Game Over, Press Any Key to Restart");
     $("body").addClass("game-over");
     setTimeout(function(){
       $("body").removeClass("game-over");}
       ,200);
     };

}


function startOver()
{
  level=0;
  gamePattern=[];
  started=false;
}
