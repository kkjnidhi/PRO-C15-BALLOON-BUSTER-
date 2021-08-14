var bow , arrow,  scene;
var bowImage, arrowImage, green_balloonImage, red_balloonImage, pink_balloonImage ,blue_balloonImage,
 backgroundImage,rb,gb,bb,pb,ag,Line;
 var PLAY=1
 var END=0
 var gameState=PLAY

var score=0;

function preload(){
  
  backgroundImage = loadImage("background0.png");
  arrowImage = loadImage("arrow0.png");
  bowImage = loadImage("bow0.png");
  red_balloonImage = loadImage("red_balloon0.png");
  green_balloonImage = loadImage("green_balloon0.png");
  pink_balloonImage = loadImage("pink_balloon0.png");
  blue_balloonImage = loadImage("blue_balloon0.png");
  
}



function setup() {
  createCanvas(400, 400);
  
  //creating background
  scene = createSprite(0,0,400,400);
  scene.addImage(backgroundImage);
  scene.scale = 2.5
  
  // creating bow to shoot arrow
  bow = createSprite(380,220,20,50);
  bow.addImage(bowImage); 
  bow.scale = 1;
  
  score = 0  
  rb=new Group();
  bb=new Group();
  gb=new Group();
  pb=new Group();
  ag=new Group();
  Line=createSprite(384,200,30,400)
  Line.visible=false

}

function draw() {
 background(0);
 if(gameState===PLAY){
  // moving ground
    scene.velocityX = -3 
    if (scene.x < 0){
      scene.x = scene.width/2;
    }
  
  //moving bow
  bow.y = World.mouseY
  
   // release arrow when space key is pressed
  if (keyDown("space")) {
    createArrow();}

    
    
   //creating continous enemies
  var select_balloon = Math.round(random(1,4));
  
  if (World.frameCount % 100 == 0) {
    if (select_balloon == 1) {
      redBalloon();
    } else if (select_balloon == 2) {
      greenBalloon();
    } else if (select_balloon == 3) {
      blueBalloon();
    } else {
      pinkBalloon();
    }
  
  } 
  text("Score: "+ score, 300,50);
  if(ag.isTouching(rb)){
 rb.destroyEach();
 ag.destroyEach();
 score=score+2
  }
  if(ag.isTouching(bb)){
    bb.destroyEach();
    ag.destroyEach();
  score=score+4
 }
 if(ag.isTouching(gb)){
 gb.destroyEach();
 ag.destroyEach();
 score=score+1
 }
  if(ag.isTouching(pb)){
 pb.destroyEach();
  ag.destroyEach();
   score=score+3
 }
 if(rb.isTouching(Line)){
  gameState=END
}
 if(gb.isTouching(Line)){
  gameState=END
}
 if(bb.isTouching(Line)){
  gameState=END
}
if(pb.isTouching(Line)){
  gameState=END
}
}
else if(gameState===END){
  console.log="hey"
  rb.setLifetimeEach(-1);
  bb.setLifetimeEach(-1);
  pb.setLifetimeEach(-1);
  gb.setLifetimeEach(-1);
  scene.velocityX = 0;
  rb.setVelocityXEach(0);
  bb.setVelocityXEach(0);
  pb.setVelocityXEach(0);
  gb.setVelocityXEach(0);
  ag.setVelocityXEach(0);
  
  
}
   
  
  
  drawSprites();

}


// Creating  arrows for bow
 function createArrow() {
  var arrow= createSprite(100, 100, 60, 10);
  arrow.addImage(arrowImage);
  arrow.x = 360;
  arrow.y=bow.y;
  arrow.velocityX = -4;
  arrow.lifetime = 100;
  arrow.scale = 0.3;
  ag.add(arrow)
}

function redBalloon() {
  var red = createSprite(0,Math.round(random(20, 370)), 10, 10);
  red.addImage(red_balloonImage);
  red.velocityX = 3;
  red.lifetime = 250;
  red.scale = 0.1;
rb.add(red);
}

function blueBalloon() {
  var blue = createSprite(0,Math.round(random(20, 370)), 10, 10);
  blue.addImage(blue_balloonImage);
  blue.velocityX = 5;
  blue.lifetime = 250;
  blue.scale = 0.1;
  bb.add(blue);
}

function greenBalloon() {
  var green = createSprite(0,Math.round(random(20, 370)), 10, 10);
  green.addImage(green_balloonImage);
  green.velocityX = 2;
  green.lifetime = 250;
  green.scale = 0.1;
  gb.add(green);
}

function pinkBalloon() {
  var pink = createSprite(0,Math.round(random(20, 370)), 10, 10);
  pink.addImage(pink_balloonImage);
  pink.velocityX = 4;
  pink.lifetime = 250;
  pink.scale = 1
  pb.add(pink);
}
