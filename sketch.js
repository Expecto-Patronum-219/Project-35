var balloon,balloonImage1,balloonImage2;
var ball;
var database, position
var height

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

function setup(){
    createCanvas(1500,800);
    database=firebase.database();
    balloon = createSprite(250,250,10,10);
    balloon.shapeColor = "red";

    var balloonPosition=database.ref("balloon/height")
    balloonPosition.on("value", readPosition)
}

function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updateHeight(-1,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updateHeight(1,0);
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updateHeight(0,-1)
    balloon.scale=balloon.scale-0.001;
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updateHeight(0,+1);    
    balloon.scale=balloon.scale+0.03;
  }


  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function updateHeight(x,y){

  database.ref('balloon/height').set({
    'x': height.x + x,
    'y': height.y + y
  })
  
  }

  function readPosition(data){

    height=data.val()
    balloon.x=height.x,
    balloon.y=height.y

  }