//declaring variables,
var bg , bgImg;

var player, playerImg, player_ShootingImg;

var heart1, heart1_img;
var heart2, heart2_img;
var heart3, heart3_img;
var life = 3;

var zombie, zombieImg, zombieGroup;

var bullets = 70;
var bulletGroup, bullet;

var gameState = "fight";

var score = 0;

function preload(){
  //loading all the images;
  bgImg = loadImage("assets/bg1.png");
  playerImg = loadImage("assets/shooter_2.png");
  player_ShootingImg = loadImage("assets/shooter_3.png");
  zombieImg = loadImage("assets/zombie1.png");
  heart1_img = loadImage("assets/heart_1.png");
  heart2_img = loadImage("assets/heart_2.png");
  heart3_img = loadImage("assets/heart_3.png");
}

function setup(){
  var canvas = createCanvas(1300,600);

  //creating all sprites
  bg = createSprite(width/2, height/2.5, 20, 20);
  bg.addImage(bgImg);
  bg.scale = 1.5;

  player = createSprite(200, 500,30,30);
  player.addImage(playerImg);
  player.scale = 0.4;
  player.debug = true;
  player.setCollider("rectangle", 0, 0, 300, 500);

  heart1 = createSprite(1120, 50, 20, 20);
  heart1.addImage(heart1_img);
  heart1.scale = 0.2;
  
  heart2 = createSprite(1140, 50, 20, 20);
  heart2.addImage(heart2_img);
  heart2.scale = 0.2;
  
  heart3 = createSprite(1160, 50, 20, 20);
  heart3.addImage(heart3_img);
  heart3.scale = 0.2;

  //creating groups
  bulletGroup = new Group();
  zombieGroup = new Group();

}

function draw(){
  //adding background
  background(9);

  //gamestate fight
  if(gameState === "fight"){

    //Moving player
    if(keyDown("UP_ARROW") || touches.length > 0 && player.position.y != 300){
      player.position.y -= 3;  
    }

    if(keyDown("DOWN_ARROW")  || touches.length > 0){
      player.position.y += 3;
    }

    if(keyDown("RIGHT_ARROW")){
      player.position.x += 3; 
    }
    
    if(keyDown("LEFT_ARROW")){
      player.position.x -= 3;
    }
    
    //changing images
    if(keyWentDown("space")){    
      player.addImage(player_ShootingImg)
      //player.depht = bullet.depht;
      //player.depht = player.depht + 2;

      bullet = createSprite(player.position.x + 80, player.position.y - 30, 20, 10);
      bullet.velocity.x = 20;
      bullets -= 1;
      bullet.shapeColor = "red";    
      bulletGroup.add(bullet);     
    }
    //changing to normal image
    else if(keyWentUp("space")){
      player.addImage(playerImg);
    }

    //collision between player and zombieGroup 
    if(zombieGroup.isTouching(player)){
      for(var i=0;i<zombieGroup.length;i++){      
        if(zombieGroup[i].isTouching(player)){
          zombieGroup[i].destroy();

          life -= 1;
        } 
      }
    }

    //collision between zombieGroup and bullets
    if(zombieGroup.isTouching(bulletGroup)){
      for(var i=0;i<zombieGroup.length;i++){      
        if(zombieGroup[i].isTouching(bulletGroup)){
          zombieGroup[i].destroy();
          bulletGroup.destroyEach();

          score += 2;
        } 
      }
    }

    //heart`s visiblity
    if(life == 3){
      heart3.visible = true;
      heart2.visible = false;
      heart1.visible = false;
    }
    if(life == 2){
      heart2.visible = true;
      heart3.visible = false;
      heart1.visible = false;
    }
    if(life == 1){
      heart1.visible = true;
      heart2.visible = false;
      heart3.visible = false;
    }

    //changing gamestate lost
    if(life == 0){
      heart1.visible = false;
      gameState = "lost";
    }

    //changing gamestate bullet
    if(bullets == 0){
      gameState = "bullet";
    }

    //changing gamestate won
    if(score == 100){
      gameState = "won";
    }

    //calling enemy function
    enemy();
  }

  //displaying all the sprites
  drawSprites();

  //gamestate lost
  if(gameState == 'lost'){
    textSize(30);
    fill("red")
    text("YOU LOST THE GAME....!", width/2 - 170, height/2);
    player.destroy();
    zombieGroup.destroyEach();
    bulletGroup.destroyEach();    
  }

  //gamestate won
  else if(gameState == 'won'){
    textSize(35);
    fill("green");
    text("YOU WON THE GAME", width/2, height/2);
    player.destroy();
    zombieGroup.destroyEach();
    bulletGroup.destroyEach();
  }

  //gamestate bullet
  else if(gameState == "bullet"){
    textSize(30);
    fill("red")
    text("YOU RAN OUT OF BULLETS....!", width/2, height/2);
    player.destroy();
    zombieGroup.destroyEach();
    bulletGroup.destroyEach();
  }

  //live feedback
  textSize(30);
  fill("green");
  text("score: " + score, 60, 100);

  textSize(30);
  fill("purple");
  text("bullets: " + bullets, 60, 150);
}

function enemy(){
  if(frameCount % 50 === 0){
    zombie = createSprite(random(1200, 1500), random(350, 500), 50, 50);
    zombie.addImage(zombieImg);
    zombie.velocity.x = -10;
    zombie.scale = 0.3;
    zombie.lifetime = 400;

    zombieGroup.add(zombie);
  }
}
