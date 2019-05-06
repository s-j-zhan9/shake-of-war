let socket = io('/output');


// HOW HARD IT WOULD BE, contribution ++, hard level ++
let contribution = 20;

// Listen for confirmation of connection
socket.on('connect', function () {
  console.log("Connected");
});


// Keep track of users
let users = {};
let totalForce;

var currentRedForce = 3000;
var newRedForce = 0;

var currentBlueForce = 0;
var newBlueForce = 0;

let blueWin = false;
let redWin = false;

function setup() {
  createCanvas(windowWidth, windowHeight-200);

  // Listen for force data
  socket.on('red', function (message) {
    let id = message.id;
    let force = message.data;
    newRedForce = force;
    //console.log(force);
  });

  socket.on('blue', function (message) {
    let id = message.id;
    let force = message.data;
    newBlueForce = force;
  });
  // Listen for disconnection to remove user
  socket.on('disconnected', function (id) {
    delete users[id];
  });



//get user num from html form
let redNum;
let blueNum;

  // Peg frameRate to 30
  frameRate(60);
}

function draw() {
  background(250);
  redNum = document.getElementById("numRed").value;
  blueNum = document.getElementById("numBlue").value;

  let userNum = 0;
  let scl = height / 150;
  noStroke();
  // for (let u in users) {
  //   totalForce = users[u].force + users[u+1].force;
  //   userNum++;
  // }
  if(redNum){
    currentRedForce += newRedForce/redNum;
  }
  if (blueNum){
    currentBlueForce += newBlueForce/blueNum;
  }


  //clear for next frame
  newRedForce = 0;
  newBlueForce = 0

  //draw performance
  textAlign(CENTER);

  let indent = width/6;


    strokeWeight(4);
    //red performance
    stroke(255,0,0);
    // line(currentRedForce/contribution, 0, currentRedForce/contribution, height);
    noFill();
    ellipse(currentRedForce/contribution+indent, height/2-100,80)
    ellipse(currentRedForce/contribution+indent, height/2-100,4)

    noStroke()
    fill(255,0,0)
    // text(floor(currentRedForce/contribution), floor(currentRedForce/contribution), height/2-100);
    text(("2X Your Point"), 70, height/2-100);


    //blue performance
    stroke(0,0,255);
    // line(currentBlueForce/contribution, 0, currentBlueForce/contribution, height);
    noFill();
    ellipse(currentBlueForce/contribution+indent, height/2+100,80)
    ellipse(currentBlueForce/contribution+indent, height/2+100,4)

    noStroke()
    fill(0,0,255)
    // text(floor(currentBlueForce/contribution), floor(currentBlueForce/contribution), height/2+100);
    
    text(("3X Your Point"), 70, height/2+100);


    //goal line
    let goal = width/5*4;
    strokeWeight(12);
    stroke(0);
      for (let i=0; i<6; i++){
        line(goal+i*24, 0, goal+i*24, height);
      }
      for (let i=0; i<80; i++){
        line(goal, 0+i*24, goal+5*24, 0+i*24);
      }

    //show result
      ellipseMode(CENTER)

  if (redWin === false && currentBlueForce/contribution > goal){
      fill(0,0,255)
      ellipse(n, height/2,100)
      noStroke()
      text("Blue Win!", n, height/2 + 200);
      blueWin = true;
    }
    else if (blueWin === false && currentRedForce/contribution > goal){
      fill(255,0,0)
      ellipse(m, height/2,100)
      noStroke()
      text("Red Win!", m, height/2 + 200);
      redWin = true;
    }
}
