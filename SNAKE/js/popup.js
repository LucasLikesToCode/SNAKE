
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 50);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const snakeBox = new THREE.BoxGeometry( 1, 1, 3 );
const appleShape = new THREE.IcosahedronGeometry(0.5, 0);
const snakeMat = new THREE.MeshMatcapMaterial({color: 0x00ff00});
const appleMat = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});

camera.position.z = 18;

let boxList = [];
let pBoxList = [];

function draw(x, y, z) {
	if (z.wireframe) {
		boxList.push(new THREE.Mesh(appleShape, z));
		boxList[boxList.length-1].rotation.z = Date.now() * -0.001;
		boxList[boxList.length-1].rotation.y = Date.now() * 0.001;
		boxList[boxList.length-1].position.z = -2;
		boxList[boxList.length-1].scale.z = 1;
	} else {
		boxList.push(new THREE.Mesh(snakeBox, z));
		boxList[boxList.length-1].position.z = -1.5;
	}
	boxList[boxList.length-1].position.x = x-9.5;
	boxList[boxList.length-1].position.y = y-9.5;
	
}

function updateSnake() {
	for (let i = 0; i < pBoxList.length; i++) {
		scene.remove(pBoxList[i]);
	}
	pBoxList = [];
	for (let i = 0; i < boxList.length; i++) {
		scene.add(boxList[i]);
		pBoxList.push(boxList[i]);
	}
	boxList = [];
}

var scale = 25;

var x = 50;
var y = 225;
var prevX;
var prevY;

var tailX;
var tailY;
var prevTailX;
var prevTailY;
var snakeBody = [];

var xVel = 0;
var yVel = 0;

var apples = [[250, 225]];

var score = 0;
//-----------------------------Game Loop
function drawGame(){
  moveSnake();
  checkColision();
  drawApple();
  drawSnake();
}

//--------------------------------movement and drawing
function drawSnake(){
  for (let i = 0; i < snakeBody.length; i++){
    draw(snakeBody[i][0]/scale, snakeBody[i][1]/scale, snakeMat)
  }
  draw(x/scale, y/scale, snakeMat)
  
}
function moveSnake(){
  prevX = x;
  prevY = y;
  x += xVel * scale;
  y += yVel * scale;
  tailX = prevX;
  tailY = prevY;
  for(let i = 0; i < snakeBody.length; i++){
    prevTailX = snakeBody[i][0];
    prevTailY = snakeBody[i][1];
    snakeBody[i][0] = tailX;
    snakeBody[i][1] = tailY;
    tailX = prevTailX;
    tailY = prevTailY;
  }
}
function drawApple(){
  draw(apples[0][0]/scale, apples[0][1]/scale, appleMat)
}
function checkApple(x, y) {
  for(let i = 0; i < snakeBody.length; i++){
    if (x == snakeBody[i][0] && y == snakeBody[i][1]) {
      return false;
    }
  }
  return true;
}
//-----------------------------------Collision Detection
function checkColision(){
  if(x < 0){
    x = prevX;
    death();
  }
  if(x > 500 - scale){
    x = prevX;
    death();
  }
  if(y < 0){
    y = prevY;
    death();
  }
  if(y > 500 - scale){
    y = prevY;
    death();
  }
  for(let i = 0; i < snakeBody.length; i++){
    if(x == snakeBody[i][0] && y == snakeBody[i][1]){
      death();
    }
  }
  for(let i = 0; i < apples.length; i++){
    if(x == apples[i][0] && y == apples[i][1]){


      apples[i][0] = Math.floor(Math.random() * 20) * scale;
      apples[i][1] = Math.floor(Math.random() * 20) * scale;

      while (checkApple(apples[i][0], apples[i][1]) == false) {
        apples[i][0] = Math.floor(Math.random() * 20) * scale;
        apples[i][1] = Math.floor(Math.random() * 20) * scale;
      }
      
      snakeBody.push([tailX, tailY]);
      score++;
    }
  }
}
function death(){
  snakeBody = [];
  xVel = 0;
  yVel = 0;
  score = 0;
  x = 50;
  y = 225;
  apples[0] = [250, 225];
}






document.body.addEventListener('keydown', keydown);
function keydown(event){
  if(event.keyCode == 38 && yVel != -1){
    yVel = 1;
    xVel = 0;
  }
  if(event.keyCode == 40 && yVel != 1){
    yVel = -1;
    xVel = 0;
  }
  if(event.keyCode == 37 && xVel != 1){
    yVel = 0;
    xVel = -1;
  }
  if(event.keyCode == 39 && xVel != -1){
    yVel = 0;
    xVel = 1;
  }
}


let nDate = Date.now() + 1000;
let date = Date.now();
function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
	
	for (let i = 0; i < pBoxList.length; i++) {
		if (pBoxList[i].material.wireframe) {
			pBoxList[i].rotation.z = Date.now() * -0.001;
			pBoxList[i].rotation.y = Date.now() * 0.001;
		}
	}
	
	
	
	
	
	
	
	
	
	
	date = Date.now();
	if (nDate - date < 0) {
		nDate = Date.now() + 120;
		//---------------------------------------------------------
		
		
		
		
		moveSnake();
		checkColision();
		drawApple();
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		drawSnake();
		
		
		
		//---------------------------------------------------------
		updateSnake();
	}
}

animate();














