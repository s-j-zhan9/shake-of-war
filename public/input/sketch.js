// Open and connect input socket
let socket = io('/input');

// HOW HARD IT WOULD BE, contribution ++, hard level ++
let contribution = 5;
let personal_contribution = 2000;

// Keep track of when last shaken
let lastShaken = 0;
let interval = 30;
// Number of shakes
let num = 0;
let totalForce= 0;

let button_red;
let button_blue;

let team_red = false;
let team_blue = false;
let r = 255;
let g = 255;
let b = 255;
let a = 0;

// Listen for confirmation of connection
  socket.on('connect', function() {
  console.log("Connected");
});

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight/2);
  canvas.parent('teamContainer');
  setShakeThreshold(10);
  textAlign(CENTER);
}

function draw() {
  //background(r,g,b);
  fill(0);
  textSize(32);
  text(floor(totalForce/personal_contribution), width/2, height/2+50);
}

// Send data
function deviceShaken() {
  let force = abs(accelerationX-pAccelerationX) + abs(accelerationY-pAccelerationY);

  if (team_blue == true){
  socket.emit('blue', force/contribution);
  totalForce += force;
 }

 if (team_red == true){
 socket.emit('red', force/contribution);
 totalForce += force;
  }
}

function redSelected() {

  $("#teamContainer").css("background-color", "#FFC8C8");
  totalForce = 0;
  team_red = true;
  team_blue = false;
}

function blueSelected() {
  $("#teamContainer").css("background-color", "#C8C8FF");
  totalForce = 0;
  team_blue = true;
  team_red = false;
}


function goToTeam(){
  $("#startScreen").css("display", "none");
  $(".teamContainer").css("display", "inline-block");
}
