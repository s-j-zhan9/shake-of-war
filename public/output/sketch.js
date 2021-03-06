// Open and connect input socket
let socket = io('/output');

// Listen for confirmation of connection
socket.on('connect', function () {
  console.log("Connected");
});

// Keep track of users
let users = {};
let totalForce;

var currentRedForce = 0;
var newRedForce = 0;

var currentBlueForce = 0;
var newBlueForce = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Listen for force data
  socket.on('red', function (message) {
    let id = message.id;
    let force = message.data;
    newRedForce = force
  });

  socket.on('blue', function (message) {
    let id = message.id;
    let force = message.data;
    newBlueForce = force
  });
  // Listen for disconnection to remove user
  socket.on('disconnected', function (id) {
    delete users[id];
  });


  // Peg frameRate to 30
  frameRate(60);
}

function draw() {
  background(255);

  ////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////
  ////////////////////////// GROUP EFFORT ////////////////////////////
  ////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////

  // Find the mean average interval
  // let meanInterval = 0;
  // Count number of users
  // let numUsers = 0;
  // for (let u in users) {
  //   meanInterval += users[u];
  //   numUsers++;
  // }
  // meanInterval /= numUsers;
  //
  // // Find the midpoint average interval
  // let maxInterval = 0;
  // let minInterval = 1000000000;
  // for (let u in users) {
  //   let interval = users[u];
  //   if (interval < minInterval) minInterval = interval;
  //   if (interval > maxInterval) maxInterval = interval;
  // }
  //
  // // Calculate the mid-point between the smallest and largest interval
  // let midpointInterval = (maxInterval + minInterval) / 2;
  //
  // // Decide which interval will represent the group
  // let interval = meanInterval || MAX_INTERVAL;
  //let interval = midpointInterval;
  //let interval = maxInterval;


  ////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////
  //////////////// Draw the users and averages ///////////////////////
  ////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////
  //console.log(users[0].force)
  // console.log(shakeforce);

  let userNum = 0;
  let m = width/2;
  let scl = height / 150;
  noStroke();
  // for (let u in users) {
  //   totalForce = users[u].force + users[u+1].force;
  //   userNum++;
  // }
  // if(force){
    currentRedForce += newRedForce;
    currentBlueForce += newBlueForce;

  // }


  //clear for next frame
  newRedForce = 0;
  newBlueForce = 0

  //draw performance
  textAlign(CENTER);

    //red performance
    stroke(255,0,0);
    line(currentRedForce, 0, currentRedForce, height);
    noFill();
    ellipse(currentRedForce, height/2-100,80)
    noStroke()
    fill(255,0,0)
    text(currentRedForce, currentRedForce, height/2-100);

    //blue performance
    stroke(0,0,255);
    line(currentBlueForce, 0, currentBlueForce, height);
    noFill();
    ellipse(currentBlueForce, height/2+100,80)
    noStroke()
    fill(0,0,255)
    text(currentBlueForce, currentBlueForce, height/2+100);


    //goal line
    let goal = m
    stroke(0,10);

    line(goal, 0, goal, height);

    //show result
      ellipseMode(CENTER)
    if (currentBlueForce > goal){
      fill(0,0,255)
      ellipse(m, height/2,160)
      noStroke()
      text("Blue Win!", m, height/2);
    }

    if (currentRedForce > goal){
      fill(255,0,0)
      ellipse(m, height/2,160)
      noStroke()
      text("Red Win!", m, height/2);
    }


}
