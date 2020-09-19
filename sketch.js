var trex,treximage,trexcollided;
var ground,invisibleGround,groundimage;
var cloudImage, cloudsGroup;
var obstacleImage1,obstacleImage2,obstacleImage3,obstacleImage4,
    obstacleImage5,obstacleImage6,obstaclesGroup;
var count;
var PLAY = 1;
var END = 0;
var Gamestate = PLAY;
var gameover, restart, gameoverimg1,restartimg1;
function preload() {
treximage=loadAnimation("trex1.png","trex3.png","trex4.png");
groundimage=loadImage("ground2.png");
cloudImage=loadImage("cloud.png");
obstacleImage1=loadImage("obstacle1.png");
obstacleImage2=loadImage("obstacle2.png");
obstacleImage3=loadImage("obstacle3.png");
obstacleImage4=loadImage("obstacle4.png");
obstacleImage5=loadImage("obstacle5.png");
obstacleImage6=loadImage("obstacle6.png");
trexcollided=loadAnimation("trex_collided.png");
gameoverimg1=loadImage("gameOver.png");
restartimg1=loadImage("restart.png");
} 


function setup() {
createCanvas(600,200);
trex = createSprite(180,158,20,50);
trex.addAnimation("kajdjdk",treximage);
trex.addAnimation("wow",trexcollided);
//scale and position the trex
trex.scale = 0.5;
trex.x = 50;
//create a ground sprite
ground = createSprite(200,180,400,20);
ground.addImage(groundimage);
ground.x = ground.width /2;

//invisible Ground to support Trex
invisibleGround = createSprite(200,185,400,5);
invisibleGround.visible = false;
  
//creating Groups
cloudsGroup=new Group();
count=0;

obstaclesGroup = new Group(); 
gameover= createSprite(300,100);
gameover.addImage(gameoverimg1);
gameover.scale= 0.5;
gameover.visible = false;
restart= createSprite(300,140);
restart.addImage(restartimg1);
restart.scale= 0.5;
restart.visible = false;
}



function draw() {
background(180);
text("Score: "+ count, 450, 100);

if (Gamestate==PLAY) {
  
//jump when the space key is pressed
if(keyDown("space") && trex.y >= 158){
trex.velocityY = -12 ;
//("jump.mp3");
}
  
// adds gravity
trex.velocityY = trex.velocityY + 1;
  
spawnClouds();  
spawnObstacles();
  
ground.velocityX = -6;
if (ground.x<0) {
ground.x = ground.width/2;
}

if (trex.isTouching(obstaclesGroup)) {
Gamestate = END;
}
count = count+Math.round(getFrameRate()/60);
}
else if (Gamestate== END) {

ground.velocityX = 0;
trex.velocityY = 0;

//set lifetime of the game objects so that they are never destroyed
obstaclesGroup.setLifetimeEach(-1);
cloudsGroup.setLifetimeEach(-1);
obstaclesGroup.setVelocityXEach(0);
cloudsGroup.setVelocityXEach(0);

trex.changeAnimation("wow",trexcollided);
gameover.visible = true;
restart.visible = true;
}
  
//console.log(trex.y);


//for not making the trex fall off the ground
trex.collide(invisibleGround);
//calling the functon,

if(mousePressedOver(restart)) {
    reset();
}
drawSprites();  
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = random(80,120);
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
    //assign lifetime to the variable
    cloud.lifetime = 183;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = - (6 + 3*count/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    
    switch(rand) {
      case 1: obstacle.addImage(obstacleImage1);
      break;
      case 2: obstacle.addImage(obstacleImage2);
      break;
      case 3: obstacle.addImage(obstacleImage3);
      break;
      case 4: obstacle.addImage(obstacleImage4);
      break;
      case 5: obstacle.addImage(obstacleImage5);
      break;
      case 6: obstacle.addImage(obstacleImage6);
      break;
      default:break;
    }
    
    
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 121;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
function reset(){
  gameState= PLAY;
  gameover.visible = false;
  restart.visible = false;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.addAnimation("kajdjdk",treximage);
  count=0;
}
