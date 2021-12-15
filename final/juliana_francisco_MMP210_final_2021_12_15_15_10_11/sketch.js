//may not work on safari
// Declare a "SerialPort" object
var serial;

// fill in the name of your serial port here:
//copy this from the serial control app
var portName = "/dev/tty.usbmodem14701";

//this array will hold transmitted dacar inMessage = [0, 3];

let carX;
let carY;

let numLines = 5;
let lines = [];
let totalSpeed = 0;

let obstacles = [];
let numObstacles = 2;

let inMessage = [0, 3];

let soundFile;

function preload() {
  soundFormats("mp3", "ogg");
  soundFile = loadSound("beep.mp3");
}

function setup() {
  createCanvas(400, 400);
  carX = width / 2;
  carY = height / 2;

  // make an instance of the SerialPort object
  serial = new p5.SerialPort();

  // Get a list the ports available
  // You should have a callback defined to see the results. See gotList, below:
  serial.list();

  // Assuming our Arduino is connected,  open the connection to it
  serial.open(portName);

  // When you get a list of serial ports that are available
  serial.on("list", gotList);

  // When you some data from the serial port
  serial.on("data", gotData);

  rectMode(CENTER);
  for (let i = 0; i < 5; i++) {
    lines[i] = new roadLine(
      (i * (height + height / (numLines * 2))) / numLines
    );
  }
  for (let i = 0; i < 5; i++) {
    obstacles[i] = new roadObstacles();
  }
}

// Got the list of ports
function gotList(thelist) {
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    console.log(i + " " + thelist[i]);
  }
}

// Called when there is data available from the serial port
function gotData() {
  var currentString = serial.readLine(); // read the incoming data
  trim(currentString); // trim off trailing whitespace
  if (!currentString) return; // if the incoming string is empty, do no more
  // console.log(currentString);
  inMessage = split(currentString, "&"); // save the currentString to use for the text
}

function draw() {
  inMessage[0] = map(
    inMessage[0],
    -512,
    512,
    width / 2 - 100,
    width / 2 + 100,
    1
  );

  inMessage[1] = map(inMessage[1], -512, 0, height / 2 - 200, height / 2, 1);

  // if (inMessage[2] == 0){
  // console.log("beep");
  // }
  if (inMessage[2] == 0) {
    soundFile.play();
  }

  inMessage[3] = map(inMessage[3], 0, 500, 0, 500);

  background(100);
  noStroke();
  fill(0, 255, 0);
  fill(0, 220, 0);
  rect(width / 10, height, width / 4, height * 2);
  rect(width - 15, height, width / 3, height * 2);
  if (inMessage[3] > 5) {
    carY = inMessage[1];
    carX = inMessage[0];
  }

  for (let i = 0; i < 5; i++) {
    lines[i].display();
    if (inMessage[3] > 10) {
      totalSpeed = inMessage[3];
    } else {
      totalSpeed = 0;
    }
    lines[i].update();
  }

  //car
  fill(0, 0, 200);
  ellipse(inMessage[0], inMessage[1] - 10, 50, 50);

  fill("blue");
  rect(inMessage[0], inMessage[1], 50, 30, 5);

  fill("white");
  rect(inMessage[0], inMessage[1] - 20, 20, 10, 10, 10, 5, 5);

  fill("black");
  ellipse(inMessage[0] + 25, inMessage[1] + 10, 7, 12);
  ellipse(inMessage[0] + 25, inMessage[1] - 8, 7, 12);
  ellipse(inMessage[0] - 25, inMessage[1] + 10, 7, 12);
  ellipse(inMessage[0] - 25, inMessage[1] - 8, 7, 12);

  for (let i = 0; i < numObstacles; i++) {
    obstacles[i].display();
    obstacles[i].update();
  }
}

class roadLine {
  constructor(yPos) {
    this.y = yPos;
  }

  display() {
    noStroke();
    fill("yellow");
    rect(width / 2, this.y, 10, height / (numLines * 2));
  }
  update() {
    if (this.y < height + height / (numLines * 4)) {
      this.y += totalSpeed / 150;
    } else {
      this.y = -height / (numLines * 4);
    }
  }
}

class roadObstacles {
  constructor(x, y) {
    this.x = random(100, 300);
    this.y = random(0, 400);
  }

  display() {
    fill(200, 0, 0);
    ellipse(this.x, this.y + 10, 50, 50);

    fill("red");
    rect(this.x, this.y, 50, 30, 5);

    fill("white");
    rect(this.x, this.y + 20, 20, 10, 10, 10, 5, 5);

    fill("black");
    ellipse(this.x + 25, this.y + 10, 7, 12);
    ellipse(this.x + 25, this.y - 8, 7, 12);
    ellipse(this.x - 25, this.y + 10, 7, 12);
    ellipse(this.x - 25, this.y - 8, 7, 12);
  }

  update() {
    if (this.y < height) {
      this.y += totalSpeed / 150;
    } else {
      this.y = -10;
      this.x = random(100, 300);
    }
  }
}
