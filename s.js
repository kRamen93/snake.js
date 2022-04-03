let score = 0;

let config = {
    step: 0,
    maxStep: 8,

    sizeCell: 16,
    sizeBerry: 16 / 4,
}


const snake = {

    x: 160,
    y:160,


    dx: config.sizeCell,
    dy: 0,
    tails: [],
    maxTalls: 3,
}

const berry = {
    x: 0,
    y: 0,
}

const canvas = document.querySelector('#game-canvas');

const context = canvas.getContext('2d');

const scoreBlock = document.querySelector('.game-score .score-count')

drawScore();
// randompositionBerry();


function gameLoop() {
    
    requestAnimationFrame( gameLoop);

    if(++config.step < config.maxStep){
        return;
    }

    config.step = 0;

    context.clearRect(0,0, canvas.width, canvas.heigth);
    
    drawSnake();
    drawBerry();
}
requestAnimationFrame( gameLoop );

function incScore (){
    score++;
    drawScore();

}

function drawScore() {
    scoreBlock.innerHTML = score; 
}

function getRandomInt(min,max) {
    return Math.floor(Math.random() * (max-min)+min);
    
}

function drawSnake() {
    snake.x += snake.dx;
    snake.y += snake.dy;

    snake.tails.unshift( {x: snake.x, y: snake.y});

    if( snake.tails.length > snake.maxTalls){
        snake.tails.pop();
    }

    snake.tails.forEach(function (el,index) {
        if (index==0) {
            context.fillStyle = "#c90234";
        } else {
            context.fillStyle = "#ab02c9";
        }

        context.fillRect(el.x, el.y, config.sizeCell, config.sizeCell);
        
        if (el.x === berry.x && el.y === berry.y) {
            snake.maxTails++;
        }
        
        if(score === 10) { 
            config.maxStep =7;
        } else if (score === 20) {
            config.maxStep = 6;
        } else if(score === 30) {
             config.maxStep = 5; 
        } else if (score === 50) {
           config.maxStep = 4
        }
        
        for ( let i = index +1; i < snake.tails.length;i++) {
            if ( el.x == snake.tails[i].x && el.y == snake.tails[i].y) {
                refreshGame();
            }
        }
    })
}


function drawBerry() {

    context.beginPath();    
    context.fillStyle = "A00034"
    context.arc(    
       berry.x + (config.sizeCell/2),
       berry.y + (config.sizeCell/2),
       config.sizeBerry,0,2*Math.PI);
    context.fill();
}

function randompositionBerry()  {
    berry.x = getRandomInt( 0, canvas.width/ config.sizeCell ) * config.sizeCell;
    berry.y = getRandomInt( 0, canvas.heigth/ config.sizeCell ) * config.sizeCell;
}




