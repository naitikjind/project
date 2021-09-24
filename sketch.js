var bg,bgimg
var aeroplane,aeroplaneimg
var building1,building2,building3;
var obstacle,birdimg,bird
var topGround,bottomGround;
var PLAY=1,END=0;
var gameState=PLAY;
var fuel,fuelimg,score=0
function preload(){
  bgimg = loadImage("assets/runway.jpg")
  aeroplaneimg = loadImage("assets/aeroplane.jpg.png");
  birdimg=loadAnimation("assets/bird1animation.png","assets/b2imageanimation.png");
  building1=loadImage("assets/burj.png")
  building2=loadImage("assets/3-2-eiffel-tower-png.png")
  fuelimg = loadImage("assets/fuel.png")
  building3=loadImage("assets/pyramid.png")
} 
function setup() {
  createCanvas(1400,700);
  aeroplane = createSprite(100,600,30,30) 
  aeroplane.addImage(aeroplaneimg)
  aeroplane.scale=0.5
  fuelGroup=new Group();
  topObstaclesGroup=new Group();
  bottomObstaclesGroup=new Group();
 
  topGround = createSprite(700,10,1400,10)
  topGround.visible=false;
  bottomGround = createSprite(700,780,1400,10);
  bottomGround.visible=false;
}
function draw() {
  background(bgimg);  
  if(gameState===PLAY){

  
  if(keyDown("UP_ARROW")){
  //aeroplane.velocityX=+3
        aeroplane.velocityY=-7
  
  }
  aeroplane.velocityY=aeroplane.velocityY+5
 
  
spawnBuildingsBottom();
  spawnObstaclesTop();
  spawnFuel();
  if(topObstaclesGroup.isTouching(aeroplane)||bottomObstaclesGroup.isTouching(aeroplane)||
  bottomGround.isTouching(aeroplane)||topGround.isTouching(aeroplane)){
    gameState===END;
  }}
  if(gameState===END){
    aeroplane.velocityY=0
    aeroplane.velocityX=0
    topObstaclesGroup.setVelocityXEach(0)
    bottomObstaclesGroup.setVelocityXEach(0)
    aeroplane.y=650
  
  }
  drawSprites();
}
  
function spawnFuel(){
  if (frameCount%250===0){
    fuel = createSprite(1400,500,20,20)
    fuel.y=Math.random(random(20,140))
    fuel.addImage(fuelimg);
    fuel.velocityX=-5
    fuel.lifetime=675
    fuel.scale=0.25
    fuelGroup.add(fuel)
    }
}
function spawnObstaclesTop(){
  if(frameCount%200===0){
    bird = createSprite(1200,200,20,20);
    bird.y=Math.round(random(10,150))
    bird.addAnimation("bird1",birdimg);
    bird.velocityX=-4
    bird.lifetime=675
    topObstaclesGroup.add(bird);
      }
}
function spawnBuildingsBottom(){
  if(frameCount%200===0){
    buildings = createSprite(1200,750,20,20);
    buildings.velocityX=-2
   buildings.scale=0.3
    var rand = Math.round(random(1,3));
    switch(rand){ 
      case 1:buildings.addImage(building1)
        break;
      case 2:buildings.addImage(building2)
        break;
      case 3:buildings.addImage(building3)    
      break;
    default:break;
    }
    bottomObstaclesGroup.add(buildings)
  }
}