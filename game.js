var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red","blue","green","yellow"];
var level = 0;
var started = false;
$(document).keypress(function(){
  if(!started)
  {
  $("#level-title").text("LEVEL"+level);

  nextSequence();
  started=true;
}
});
$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  //console.log(userChosenColour);
  playsound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

});
function startover()
{
  level=0;
  started=false;
  gamePattern=[];
}
function checkAnswer(currentLevel)
{
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
  {
    console.log("sucess");
    if(userClickedPattern.length===gamePattern.length)
    {
      setTimeout(function(){
        nextSequence()
      },1000);
    }
  }
  else
    {
      console.log("wrong");
      playsound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over")
      },300);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startover();


    }

}
function animatePress(currentColour)
{
   $("#"+currentColour).addClass("pressed");
   setTimeout(function()
 {
   $("#"+currentColour).removeClass("pressed");
 }, 100);
}
function playsound(name)
{
  var audio = new Audio("sounds/" +name+ ".mp3");
  audio.play();
}
function nextSequence()
{
  level++;
  $("#level-title").text("LEVEL"+level);
  var randomnumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColors[randomnumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playsound(randomChosenColour);
}
