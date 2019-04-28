// Open and connect input socket
let socket = io('/input');

// Keep track of when last shaken
let lastShaken = 0;
let interval = 30;
// Number of shakes
let num = 0;

// Listen for confirmation of connection
socket.on('connect', function() {
  console.log("Connected");
});

function setup() {
  createCanvas(windowWidth, windowHeight);
  setShakeThreshold(10);
  background(0);
  frameRate(30);
  textAlign(CENTER);
}

function draw() {
  background(0);
  if (force) {
    force += force
  }
  //
  // let movement = dist(accelerationX, accelerationY, accelerationZ, pAccelerationX, pAccelerationY, pAccelerationZ);
  // // Test with mouse
  // //let movement = dist(pmouseX, pmouseY, mouseX, mouseY);
  // fill(255, 10);
  // ellipse(width / 2, height / 2, movement, movement);
  // socket.emit('move', movement);
  // fill(255);
  // textSize(32);
  // text(movement, width / 2, (height / 2) - 100);
  // textSize(64);
  // text(num, width / 2, height / 2);
  //
  // // Check once a second if user has slowed down
  // if (frameCount % 30 == 0) {
  //   let newInterval = frameCount - lastShaken;
  //   if (newInterval > interval) {
  //     interval = newInterval;
  //     socket.emit('shake', interval);
  //   }
  // }
}

// Calculate size of shake
// Send data
function deviceShaken() {

  let force = abs(accelerationX-pAccelerationX) + abs(accelerationY-pAccelerationY);
  let c = color('rgb(255,0,0)');
  fill(c);
  rect(width/2, height/2, force, force);
  textSize(32);
  text("shaken", width/2, height/2-100);
  socket.emit('shake', force);

  // if (frameCount - lastShaken < 5) return;
  // num++;
  // background('red');
  // interval = frameCount - lastShaken;
  // socket.emit('shake', interval);
  // lastShaken = frameCount;
}
