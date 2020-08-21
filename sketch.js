//Create variables here
var dog,happydog,database,foods = 20,foodstock,d;
var meter = "normal";
var time = 0;
function preload()
{
  //load images here
  d = loadImage("images/dogImg.png")
  happydog=loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500, 500);
  dog = createSprite(250,250,40,40);
  dog.addImage(d);
  dog.scale = 0.2;
  database = firebase.database();
  foodstock = database.ref('food');
  foodstock.on("value",readStock);
}


function draw() {  
  background(46,50,87)
  drawSprites();
  //add styles here
if(keyWentDown(UP_ARROW)){
  writeStock(foods)
  dog.addImage(happydog);
  meter = "happy";
  if(foods<=0){
    foods = 0
  }else{
    foods--
  }
 
}
time++
drawSprites();
fill("white");  
text("Food : "+foods,220,150);
text("Press up arrow key to feed your puppy",150,100);
if(meter === "happy"){
  fill("green");
  text("State : "+meter,100,250);
}else{
  fill("white");
  text("State : "+meter,100,250);
}
if(time%150 === 0){
  meter = "normal";
  dog.addImage(d);
  time = 0;
}
console.log(time);
}

function readStock (data){
  foods=data.val();
}

function writeStock (x){
 
  database.ref('/').update({
    Food:x
  })
}



