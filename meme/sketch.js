let guyImg;
let shelfImg;

let trans = 255;

let prompt = false;
let text1 = "Boss - Can you work";
let text2 = "overtime without pay?";
let text3 = "Me - ";
let meme = false;

function preload() {
  guyImg = loadImage("guy.png");
  shelfImg = loadImage("shelf.png");
}
function setup() {
  createCanvas(400, 400);
}

function draw() {
  if (prompt) {
    background(0, 200, 200);
    textSize(30);
    fill(150);
    text(text1, width / 7, height / 4);
    text(text2, width / 7, height / 4 + 40);
    text(text3, width / 7, height / 2 + 40);

    fill(0);
    text(text1, width / 7 - 2, height / 4 - 2);
    text(text2, width / 7 - 2, height / 4 + 38);
    text(text3, width / 7 - 2, height / 2 + 38);
  } else {
    background(0, 200, 200);
  }

  if (meme) {
    background(0);
    image(shelfImg, 0, 0);

    push();
    tint(255, trans);
    image(guyImg, 0, 100);
    pop();
  }

  if (dist(mouseX, mouseY, 250, 325) < 50 && trans > 0) {
    trans--;
  }
}

function mousePressed() {

  if (prompt) {
    meme = true;
  } else prompt = true;
}
