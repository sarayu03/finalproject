var bg, bgImg
var bottomGround
var topGround
var balloon, balloongImg
var birdImg, bird, birdsGroup
var planeImg, plane, planesGroup
var starImg, star, starsGroup
var gameState="play"
var score = 0
var gameOver, gameOverImg
var restart, restartImg

function preload(){
  bgImg = loadImage("bg.png")
  balloonImg = loadAnimation("balloon1.png", "balloon2.png", "balloon3.png")
  birdImg = loadImage("bird.png")
  planeImg = loadImage("plane.png")
  starImg = loadImage("star.png")
gameOverImg = loadImage("gmeOver.png")
restartImg = loadImage("restart.png")

}

function setup() 
{
  createCanvas(500,700);
  bg = createSprite(165,485,1,1)
  bg.addImage(bgImg)
  bg.scale = 1.3

  bottomGround = createSprite(100,700,800,20)
  bottomGround.visible = false

  topGround = createSprite(200,10,800,20)
  topGround.visible = false

  balloon = createSprite(100,200,50,50)
  balloon.addAnimation("balloon", balloonImg)
  balloon.scale = 0.4 

  restart = createSprite (250, 100, 100, 100)
    restart.addImage(restartImg)

   
  


  obstaclesGroup = createGroup()
  starsGroup = createGroup()

  gameOver = createSprite(250,400, 100,400)
  gameOver.addImage(gameOverImg)
  gameOver.scale = 0.7
  
}

function obstacles(){
if(frameCount%180===0){
  obstacle = createSprite(500,Math.round(random(100,500)))
  obstacle.velocityX = -5
  obstaclesGroup.add(obstacle)
  rand = Math.round(random(1,2))
  switch(rand){
    case 1: obstacle.addImage(birdImg);
    obstacle.scale = 0.04
    break;
    case 2: obstacle.addImage(planeImg);
    obstacle.scale = 0.3
    break;
    default:break;
  }
}
}


function stars(){
  if(frameCount%90===0){
  star = createSprite(50,Math.round(random(300,500)))
  star.velocityX = 5
  star.addImage(starImg)
  starsGroup.add(star)
  star.scale = 0.15}
}

function reset(){
gameState = "play"
score = 0
balloon.y = 200
gameOver.visible = false
restart.visible = false
}

function draw() 
{
  background(51);

  

  if(gameState==="play"){
    stars()
    obstacles()
    if(keyDown("space")){
      balloon.velocityY = -6
    }
    balloon.velocityY = balloon.velocityY+2
  
    if(keyDown("left")){
      balloon.x-= 4
    }
    if(keyDown("right")){
      balloon.x += 4
    }

    if(balloon.isTouching(starsGroup)){
      starsGroup.destroyEach()
      score=score+1
    }
    

      if(obstaclesGroup.isTouching(balloon)){
        gameState = "end"

        

      }
      if(balloon.isTouching(bottomGround)){
        gameState="end"}
    
        gameOver.visible = false
        restart.visible = false
   }
  if(gameState==="end"){
    obstaclesGroup.destroyEach()
    obstaclesGroup.setVelocityXEach(0)
    starsGroup.setVelocityXEach(0)

    balloon.velocityY=0

  

    

    if(mousePressedOver(restart)){
      reset()
    }
    gameOver.visible = true
    restart.visible=true
  }
  

 drawSprites()

 textSize(20)
 text("score:" +score,50,50)
 
  }
