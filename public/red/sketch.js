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

// Listen for confirmation of connection
socket.on('connect', function() {
  console.log("Connected");
});

function setup() {
  createCanvas(windowWidth, windowHeight);
  setShakeThreshold(10);
  textAlign(CENTER);
}

function draw() {
  background(255,200,200);

  fill(0);
  textSize(32);
  text(floor(totalForce/contribution), width/2, height/2-100);
}

// Calculate size of shake
// Send data
function deviceShaken() {

  let force = abs(accelerationX-pAccelerationX) + abs(accelerationY-pAccelerationY);
  // let c = color('rgb(255,0,0)');
  // fill(c);
  // rect(width/2, height/2, force, force);
  // textSize(32);
  // text("shaken", width/2, height/2-100);
  socket.emit('red', force/contribution);
  totalForce++
}
// function mousePressed(){
//   socket.emit('red', 3);
//   totalForce++
// }
