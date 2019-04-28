// Open and connect input socket
let socket = io('/output');

// Listen for confirmation of connection
socket.on('connect', function () {
  console.log("Connected");
});

// Keep track of users
let users = {};
let totalForce;

// Min number of users
// let MIN_USERS = 1;
//
// // Number of frames elapsed for song to play 2x
// let MIN_INTERVAL = 5;
// // Number of frames elapsed for song to play 0x
// let MAX_INTERVAL = 60;



function setup() {
  createCanvas(windowWidth, windowHeight);

  // Listen for shake data
  socket.on('shake', function (message) {
    let id = message.id;
    let force = message.data;
    //console.log(interval);
    // Ignore super fast shakes - noisy data
    // if (interval > MIN_INTERVAL) {
    //   users[id] = interval;
    // }

  });

  // Listen for disconnection to remove user
  socket.on('disconnected', function (id) {
    delete users[id];
  });


  // Peg frameRate to 30
  frameRate(30);
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

  let userNum = 0;
  let m = width/2;
  //let colW = (width - (2 * m)) / MIN_USERS;
  let scl = height / 150;
  noStroke();
  for (let u in users) {
    totalForce = users[u].force + users[u+1].force;
    userNum++;
  }

  if(totalForce){

    noStroke();
    fill(0);
    // text("MEAN", m, meanInterval * scl);
    // text("MIDPOINT", m, midpointInterval * scl);
    // text("MIN", m, maxInterval * scl);
    text("TOTAL", m, totalForce * scl);


    stroke(0);
    // line(0, meanInterval * scl, width, meanInterval * scl);
    // line(0, midpointInterval * scl, width, midpointInterval * scl);
    // line(0, maxInterval * scl, width, maxInterval * scl);
    line(0, totalForce * scl, width, totalForce * scl);

  }else{
    console.log("totalForce is null")
  }

}
