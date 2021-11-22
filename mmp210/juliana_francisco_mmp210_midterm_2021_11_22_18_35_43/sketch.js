let gravity = 0.2;

let ground;

let platform;
let platform2;
let platform3;

let portal;

// let portalActivate = false

//initialize starfield
let star = [];
let starNum = 300;

let pageNum = 1;
let pagesLength = 6;

let walls = [];

var player;
var skeleton;

let timerStart = 0; //variable to hold the start time of each iteration of the timer
let timerLength = 5000; //length of the timer (in milliseconds)
let timerCount = 0; //number of times the timer has reset
let timerBool = false;
let attack = false;
let timeout = false;
let timeoutLength = 5000;
let timeoutStart = 0;

function setup() {
  createCanvas(400, 400);

  portal = createSprite(340, 277, 200, 200);
  portal.scale = 3;

  portal.addAnimation(
    "portal",
    "portal/portal_01.png",
    "portal/portal_02.png",
    "portal/portal_03.png",
    "portal/portal_04.png",
    "portal/portal_05.png"
  );

  //create and animate player sprite
  player = createSprite(100, -100, 200, 200);

  player.scale = 2.5;

  player.addAnimation(
    "idle",
    "assets/player_idle_01.png",
    "assets/player_idle_02.png",
    "assets/player_idle_03.png",
    "assets/player_idle_04.png",
    "assets/player_idle_05.png",
    "assets/player_idle_06.png",
    "assets/player_idle_07.png",
    "assets/player_idle_08.png",
    "assets/player_idle_09.png",
    "assets/player_idle_10.png"
  );

  player.addAnimation(
    "walking",
    "assets/player_walk_01.png",
    "assets/player_walk_02.png",
    "assets/player_walk_03.png",
    "assets/player_walk_04.png",
    "assets/player_walk_05.png",
    "assets/player_walk_06.png",
    "assets/player_walk_07.png",
    // "assets/player_walk_08.png",
    "assets/player_walk_09.png",
    "assets/player_walk_10.png"
  );

  player.addAnimation(
    "attack",
    "assets/player_attack_01.png",
    "assets/player_attack_02.png",
    "assets/player_attack_03.png",
    "assets/player_attack_04.png",
    "assets/player_attack_05.png",
    "assets/player_attack_06.png",
    "assets/player_attack_07.png",
    "assets/player_attack_08.png",
    "assets/player_attack_09.png",
    "assets/player_attack_10.png"
  );

  skeleton = createSprite(300, 220, 100, 100);
  skeleton.scale = 2.5;
  skeleton.mirrorX(-1);

  skeleton.addAnimation(
    "attack",
    "skeleton/skeleton_attack_01.png",
    "skeleton/skeleton_attack_02.png",
    "skeleton/skeleton_attack_03.png",
    "skeleton/skeleton_attack_04.png",
    "skeleton/skeleton_attack_05.png",
    "skeleton/skeleton_attack_06.png",
    "skeleton/skeleton_attack_07.png",
    "skeleton/skeleton_attack_08.png",
    "skeleton/skeleton_attack_09.png",
    "skeleton/skeleton_attack_10.png"
  );

  skeleton.addAnimation(
    "death",
    "skeleton/skeleton_death_01.png",
    "skeleton/skeleton_death_02.png",
    "skeleton/skeleton_death_03.png",
    "skeleton/skeleton_death_04.png",
    "skeleton/skeleton_death_05.png",
    "skeleton/skeleton_death_06.png",
    "skeleton/skeleton_death_07.png",
    "skeleton/skeleton_death_08.png",
    "skeleton/skeleton_death_09.png",
    "skeleton/skeleton_death_10.png"
  );

  //create ground
  ground = createSprite(width / 2, height, width * 2, 150);
  ground.shapeColor = color(200, 150, 100);

  platform = createSprite(200, 306, width / 4, height / 10);
  platform2 = createSprite(50, 286, width / 2, height / 5);
  platform3 = createSprite(200, 286, width, height / 5);
  platform3.shapeColor = color(0, 10, 60);

  walls.push(createSprite(0, height / 2, 1, height)); //left wall
  walls.push(createSprite(width, height / 2, 1, height)); //right wall
  // walls.push(createSprite(0, 0, width * 2, 1)); //top wall

  //starfield
  star = new Star();
  for (let i = 0; i < starNum; i++) {
    star[i] = new Star(
      this.x,
      this.y,
      random(0, 255),
      random(0, 255),
      random(0, 255)
    );
  }
}

function draw() {
  switch (pageNum) {
    case 1:
      background(0);

      //starfield
      for (let i = 0; i < starNum; i++) {
        star[i].show();
      }
      for (let i = 0; i < starNum; i++) {
        star[i].y -= 1.5;
        if (star[i].y < -5) {
          star[i].y = height + 5;
        }
      }

      drawSprite(player);
      // player.position= 200;

      textSize(16);
      fill(150);
      text(
        "The galaxy's life force is being drained.",
        width / 7 + 1,
        height / 3 + 1
      );
      fill(255);
      text("The galaxy's life force is being drained.", width / 7, height / 3);
      textSize(16);
      fill(150);
      text(
        "As you fall from the sky, you know",
        width / 5 + 1,
        height / 2.3 + 1
      );
      fill(255);
      text("As you fall from the sky, you know", width / 5, height / 2.3);
      textSize(16);
      fill(150);
      text("you are destined to save it...", width / 4 + 1, height / 1.9 + 1);
      fill(255);
      text("you are destined to save it...", width / 4, height / 1.9);

      console.log("Right Arrow to continue.");

      break;
    case 2:
      background(0);

      noStroke();
      //starfield
      for (let i = 0; i < starNum; i++) {
        star[i].show();
      }

      fill(255);
      ellipse(0, 0, 200, 200);

      //background hills
      fill(100, 50, 0);
      ellipse(340, 390, 600, 300);

      fill(130, 80, 30);
      ellipse(50, 330, 200, 100);

      for (let i = 0; i < walls.length; i++) {
        player.collide(walls[i]);
      }

      //gravity pulls player and to the ground
      player.velocity.y += gravity;

      if (player.collide(ground)) {
        player.velocity.y = 0;
      }

      player.collide(ground);
      ground.shapeColor = color(200, 150, 100);

      //walking, idle, and attack animations
      if (mouseX < player.position.x - 10) {
        player.changeAnimation("walking");
        //flip horizontally
        player.mirrorX(-1);
        //negative x velocity: move left
        player.velocity.x = -2;
      } else if (mouseX > player.position.x + 10) {
        player.changeAnimation("walking");
        //unflip
        player.mirrorX(1);
        player.velocity.x = 2;
      } else {
        //if close to the mouse, don't move
        player.changeAnimation("idle");
        player.velocity.x = 0;
      }

      if (player.position.x >= 350) {
        pageNum++;
      }

      if (mouseIsPressed) {
        player.changeAnimation("attack");
        skeleton.changeAnimation("attack");
      }

      if (keyWentDown(" ")) {
        player.velocity.y = -5;
      }

      //       //draw randomized star field
      //       for (let i = 0; i < numStars; i++) {
      //         fill(starField[i].z);
      //         ellipse(starField[i].x, starField[i].y, 1, 1);
      //       }

      drawSprite(portal);
      drawSprite(player);
      drawSprite(ground);

      textSize(16);
      fill(150);
      text("Somehow you survive the impact...", width / 5 + 1, height / 4 + 1);
      fill(255);
      text("Somehow you survive the impact...", width / 5, height / 4);

      textSize(16);
      fill(150);
      text(
        "You find a mysterious portal in a desert",
        width / 6 + 1,
        height / 3.3 + 1
      );
      fill(255);
      text("You find a mysterious portal in a desert", width / 6, height / 3.3);
      console.log("Walk to the portal to continue.");

      break;

    case 3:
      background(150, 150, 150);

      for (let i = 0; i < walls.length; i++) {
        player.collide(walls[i]);
      }

      //gravity pulls player and to the ground
      player.velocity.y += gravity;

      if (player.collide(ground)) {
        player.velocity.y = 0;
      }

      player.collide(ground);
      ground.shapeColor = color(100, 100, 100);

      player.collide(platform);
      platform.shapeColor = color("black");

      player.collide(platform2);
      platform2.shapeColor = color(0, 10, 60);

      //walking, idle, and attack animations
      if (mouseX < player.position.x - 10) {
        player.changeAnimation("walking");
        //flip horizontally
        player.mirrorX(-1);
        //negative x velocity: move left
        player.velocity.x = -2;
      } else if (mouseX > player.position.x + 10) {
        player.changeAnimation("walking");
        //unflip
        player.mirrorX(1);
        player.velocity.x = 2;
      } else {
        //if close to the mouse, don't move
        player.changeAnimation("idle");
        player.velocity.x = 0;
      }

      if (mouseIsPressed) {
        player.changeAnimation("attack");
      }

      if (keyWentDown(" ")) {
        player.velocity.y = -5;
      }

      // //draw sprites
      drawSprite(player);
      drawSprite(ground);
      drawSprite(platform);
      drawSprite(platform2);

      textSize(16);
      fill(0);
      text("Where do these platforms lead?", width / 6, height / 4 + 1);
      fill(255);
      text("Where do these platforms lead?", width / 6, height / 4);

      if (player.position.x <= 50) {
        pageNum++;
      }

      console.log("Press Space Bar to jump. Go to the left to continue.");

      break;
    case 4:
      background(150, 150, 150);

      if (attack == true) {
        textSize(16);
        fill(0);
        text("YOU DID IT! That was easy.", width / 4, height / 3 + 1);
        fill(255);
        text("YOU DID IT! That was easy.", width / 4, height / 3);

        skeleton.changeAnimation("death");
        skeleton.animation.looping = false;

        portal.position.x = 50;
        portal.position.y = 200;

        drawSprite(portal);
        if (player.position.x <= 50) {
          pageNum++;
        }
        //       if (timeout) {
        //         if (millis() - timeoutStart > timeoutLength) {
        //           portal.position.x = 50;
        //           portal.position.y = 200;

        //           drawSprite(portal);
        //         }
      }

      if (mouseIsPressed) {
        //mouseIsPressed is TRUE as long as mouse button is pressed
        if (millis() - timerStart > timerLength) {
          //compare timer start time to current time
          console.log("timer complete");
          timerBool = true;
        } else {
          //if mouse is pressed, but timer hasn't triggered
          console.log(
            "timer counting up" + floor((millis() - timerStart) / 1000)
          );
        }
      }

      for (let i = 0; i < walls.length; i++) {
        player.collide(walls[i]);
      }

      //gravity pulls player and to the ground
      player.velocity.y += gravity;

      if (player.collide(ground)) {
        player.velocity.y = 0;
      }

      // player.collide(platform2);
      skeleton.collide(platform3);
      player.collide(platform3);

      platform2.shapeColor = color(0, 10, 60);

      //walking, idle, and attack animations
      if (mouseX < player.position.x - 10) {
        player.changeAnimation("walking");
        //flip horizontally
        player.mirrorX(-1);
        //negative x velocity: move left
        player.velocity.x = -2;
      } else if (mouseX > player.position.x + 10) {
        player.changeAnimation("walking");
        //unflip
        player.mirrorX(1);
        player.velocity.x = 2;
      } else {
        //if close to the mouse, don't move
        player.changeAnimation("idle");
        player.velocity.x = 0;
      }

      if (mouseIsPressed) {
        player.changeAnimation("attack");
      }

      if (keyWentDown(" ")) {
        player.velocity.y = -5;
      }

      drawSprite(ground);
      // drawSprite(platform2);
      drawSprite(platform3);
      drawSprite(player);
      // player.position.x = 390;
      drawSprite(skeleton);

      textSize(16);
      fill(0);
      text(
        "Defeat the evil Skeleton to save the galaxy!",
        width / 8,
        height / 4 + 1
      );
      fill(255);
      text(
        "Defeat the evil Skeleton to save the galaxy!",
        width / 8,
        height / 4
      );

      console.log("Press and hold mouse to attack.");

      break;

    case 5:
      background(0);

      noStroke();
      //starfield
      for (let i = 0; i < starNum; i++) {
        star[i].show();
      }


      fill(255);
      ellipse(0, 0, 200, 200);

      //background hills
      fill(0, 80, 0);
      ellipse(340, 390, 600, 300);

      fill(0, 100, 0);
      ellipse(50, 330, 200, 100);

      if (mouseX < player.position.x - 10) {
        player.changeAnimation("walking");
        //flip horizontally
        player.mirrorX(-1);
        //negative x velocity: move left
        player.velocity.x = -2;
      } else if (mouseX > player.position.x + 10) {
        player.changeAnimation("walking");
        //unflip
        player.mirrorX(1);
        player.velocity.x = 2;
      } else {
        //if close to the mouse, don't move
        player.changeAnimation("idle");
        player.velocity.x = 0;
      }

      // drawSprite(walls);
      player.collide(ground);
      ground.shapeColor = color(0, 150, 0);
      drawSprite(ground);
      drawSprite(player);
      
            textSize(16);
      fill(0);
      text(
        "Everything is back to normal.",
        width / 4,
        height / 3 + 1
      );
      fill(255);
      text(
        "Everything is back to normal.",
        width / 4,
        height / 3
      );
      
                  textSize(16);
      fill(0);
      text(
        "Go out and explore!",
        width / 3,
        height / 2.5 + 1
      );
      fill(255);
      text(
        "Go out and explore!",
        width / 3,
        height / 2.5
      );
      
      if(player.position.x >= 400){
        pageNum = 6;
      }
      
      console.log("Mission complete! Thank you for playing!");
      
      break;
      
      case 6:
      background(0);
      
       textSize(26);
      fill(0);
      text(
        "The End.",
        width / 2.5,
        height / 2
      );
      fill(255);
      text(
        "The End.",
        width / 2.5,
        height / 2 +1
      );
      
      if(player.position.x >= 400){
        pageNum = 6;
      }
      
      console.log("Portal, skeleton, and player sprites from Calciumtrice at opengameart.org","Thank you for all your help, professor!")
      
  }
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    pageNum++;
  }
}

class Star {
  constructor(x, y, r, g, b) {
    this.x = random(0, 400);
    this.y = random(0, 400);
    this.color = color(r, g, b);
  }

  show() {
    noStroke();
    ellipse(this.x, this.y, 2, 2);
    fill(this.color);
  }
}

function mousePressed() {
  //reset timer start time when mouse is pressed
  timerStart = millis();
  attack = false;
}

function mouseReleased() {
  if (timerBool) {
    attack = true;
    timeout = true;
    timeoutStart = millis();
  }
  timerBool = false;
}
