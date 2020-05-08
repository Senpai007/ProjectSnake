// "use strict";
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/app.png";

const foodeImg = new Image();
foodeImg.src = "img/ban.png";

const upImg = new Image();
upImg.src = "img/up.png";

const downImg = new Image();
downImg.src = "img/down.png";

// const ggg = new Image();
// ggg.src = "img/ggg.png";

let box = 32;
let score = 0;

let food = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box
};
let foode = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box
};

let up = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box
};

let down = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box
};

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};
let dir;

document.addEventListener("keydown", direction);
function direction(event) {
    if(event.keyCode == 65 && dir != "right"){
        dir = "left";
    } else if(event.keyCode == 87 && dir != "down"){
        dir = "up";
    } else if(event.keyCode == 68 && dir != "left"){
        dir = "right";
    } else if(event.keyCode == 83 && dir != "up"){
        dir = "down";
    }
}

function eatTail(head, arr) {
    for (let i = 0; i < arr.length; i++) {
       if(head.x == arr[i].x && head.y == arr[i].y){
           clearInterval(game);
       } 
        
    }
}




function drawGame(){
    ctx.drawImage(ground, 0, 0);
    ctx.drawImage(foodImg, food.x, food.y);
    ctx.drawImage(foodeImg, foode.x, foode.y);
    ctx.drawImage(upImg, up.x, up.y);
    ctx.drawImage(downImg, down.x, down.y);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "darkgreen" : "green";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(score, box * 2.5, box * 1.7);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(snakeX == foode.x && snakeY == foode.y){
        score++;
        foode = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box
        };
    } else if(snakeX == food.x && snakeY == food.y){
        score++;
        food = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box
        };
    } else{
        snake.pop();
    }
    
    if(snakeX == up.x && snakeY == up.y){
        clearInterval(game);
        gameTwo = setInterval(drawGame, 80);
        up = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box
        };
        
    }

    if(snakeX == down.x && snakeY == down.y){
        clearInterval(gameTwo);
        gameThree = setInterval(drawGame, 250);
        down = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box
        };
        
    }
    

    if(snakeX < box || snakeX > box * 17 
        || snakeY < 3 * box || snakeY > box * 17){
        clearInterval(game);
        
        alert("game over!");
    }
    

    // snake.pop();

    if(dir == "left") snakeX -= box;
    if(dir == "right") snakeX += box;
    if(dir == "up") snakeY -= box;
    if(dir == "down") snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    eatTail(newHead, snake);

    snake.unshift(newHead);
    
}
const game = setInterval(drawGame, 100);




