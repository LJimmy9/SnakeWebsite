const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

class SnakePart{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
}

let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;

let headX = 10;
let headY = 10;
const snakeParts=[];
let tailLength=2;
let appleX=5;
let appleY=5;

let xVelocity = 0;
let yVelocity = 0;



let score = 0;

const gulpsound = new Audio("gulp.wav");
const laughsound = new Audio("laugh.wav")



//gameloop //requestAnimationFrame //setInterval xtimes per second //setTimeOut 
function drawGame() {
    changeSnakePosition();
    let result=isGameOver();
    if(result){
        return;
    }
    clearScreen();
    checkAppleCollision();
    drawSnake();
    drawApple();
    drawScore();
    if(score>2){
        speed=11;

    }
    if(score>2){
        speed=15;
    }
    setTimeout(drawGame, 1000 / speed);
}

function isGameOver(){
    let gameOver=false;
    if(yVelocity === 0 && xVelocity === 0){
        return false;
    }
    //walls
    if(headX < 0){
        gameOver=true;
    }
    else if (headX==tileCount){
        gameOver=true
    }
    else if(headY<0){
        gameOver=true
    }
    else if (headY==tileCount){
        gameOver=true
    }

    for(let i =0; i<snakeParts.length; i++){
        let part=snakeParts[i];
        if(part.x===headX && part.y===headY)
            gameOver=true;
            break;
        }



    if (gameOver){
        ctx.fillStyle='White';
        ctx.font='40px Verdan';
        ctx.fillText('Game Over!', canvas.width/5.5,canvas.height/2);
        laughsound.play()
        return gameOver;
        
    }
}
function drawScore(){
    ctx.fillStyle='white';
    ctx.font='10px Verdana'
    ctx.fillText("Score " + score,canvas.width-50, 10)
}

function clearScreen() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

function drawSnake() {


ctx.fillStyle ='green';
for(let i=0; i<snakeParts.length;i++){
    let part=snakeParts[i];
    ctx.fillRect(part.x*tileCount,part.y*tileCount,tileSize,tileSize)
}

snakeParts.push(new SnakePart(headX,headY)) //puts an item at the end of the list to the front
if(snakeParts.length>tailLength){
    snakeParts.shift(); // removes the furthest item if longer than tail
}

ctx.fillStyle = "orange";
ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);

}

function changeSnakePosition() {
    headX = headX + xVelocity;
    headY = headY + yVelocity;
  }


function drawApple(){
    ctx.fillStyle = 'red'
    ctx.fillRect(appleX*tileCount, appleY*tileCount, tileSize, tileSize)
}

function checkAppleCollision(){ //Add item after successful result - after apple is eaten, increase length+score
    if(appleX == headX && appleY == headY){
        appleX=Math.floor(Math.random()*tileCount);
        appleY=Math.floor(Math.random()*tileCount);
        tailLength++;
        score++;
        gulpsound.play();
    }
}

document.body.addEventListener("keydown", keyDown);

function keyDown(event) {
    //up key
    if (event.keyCode == 38) {
        if(yVelocity ==1) //prevents moving up after moving down
            return;
        yVelocity = -1;
        xVelocity = 0;
    }
    //down key
        if (event.keyCode == 40) {
            if(yVelocity==-1)
                return;
            yVelocity = 1;
            xVelocity = 0;
        }
    //left key
    if (event.keyCode == 37) {
            if(xVelocity==1)
                return;
        yVelocity = 0;
        xVelocity = -1;
    }      
    //right key yVelocity = -1; xVelocity = 1; diagonal movement
    if (event.keyCode == 39) {
            if(xVelocity==1)
                return;
        yVelocity = 0;
        xVelocity = 1;
    }  
}


drawGame();