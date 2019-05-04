// Open and connect input socket
let socket = io('/input');

// HOW HARD IT WOULD BE, contribution ++, hard level ++
let contribution = 10;

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

// Listen for confirmation of connection
socket.on('connect', function() {
  console.log("Connected");
});

function setup() {
  createCanvas(windowWidth, windowHeight);
  setShakeThreshold(10);
  textAlign(CENTER);
  button_red = createButton('red');
  button_blue = createButton('blue');
  button_red.position(width/2,100);
  button_blue.position(width/2, 150);
  button_red.mousePressed(bg_red);
  button_blue.mousePressed(bg_blue);
}

function draw() {
  //background(200,200,255);
  fill(0);
  textSize(32);
  text(floor(totalForce/contribution), width/2, height/2-100);
}

// Send data
function deviceShaken() {

  let force = abs(accelerationX-pAccelerationX) + abs(accelerationY-pAccelerationY);

  if (team_blue == true){
  socket.emit('blue', force/contribution);
  totalForce++;
 }

 if (team_red == true){
 socket.emit('red', force/contribution);
 totalForce++;
  }
}

function bg_red() {
  background(255,0,0);
  team_red = true;
  team_blue = false;
}

function bg_blue() {
  background(0,0,255);
  team_blue = true;
  team_red = false;
}
