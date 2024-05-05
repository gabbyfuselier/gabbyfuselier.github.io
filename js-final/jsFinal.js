const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight - 125);


let repeater = 0;

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

function loop(){
    ctx.fillStyle = ("rgb(250 250 250 / 25%)");
    ctx.fillRect(0, 0, width, height);

    for(const ball of balls){
        ball.draw();
        ball.update();
    }
    requestHelper();

    // const myReq = requestAnimationFrame(loop);

    // if(repeater == 2){
    //     cancelAnimationFrame(myReq);
    // }
}

function requestHelper(){
    const myReq = requestAnimationFrame(loop);

    if(repeater == 2 || repeater == 3){
        cancelAnimationFrame(myReq);
    }
}

class Ball {
    constructor(x, y, velX, velY, color, size) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
    }

    draw(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    update(){
        if((this.x + this.size) >= width){
            this.velX = -(this.velX);
        }
        if((this.x - this.size) <= 0){
            this.velX = -(this.velX);
        }

        if((this.y + this.size) >= height){
            this.velY = -(this.velY);
        }
        if((this.y - this.size) <= 0){
            this.velY = -(this.velY);
        }

        this.x += this.velX;
        this.y += this.velY;
    }
}

const balls = [];

const startButton = document.querySelector('#button1');
startButton.addEventListener('click', () =>{
    if(repeater == 0 || repeater == 3){
        repeater = 1;
        const size = 20;
        let min = random(-100,-95);
        let max = random(95,100);
        const ball = new Ball(random(0 + size, width - size), random(0 + size, height - size), random(min,max), random(min, max), randomRGB(), size);
        balls.push(ball);
        loop();
    }
    if(repeater == 2){
        repeater = 1;
        loop();
    }
});

let percent = 0;

const stopButton = document.querySelector('#button2');
stopButton.addEventListener('click', () =>{
    if(repeater == 1){
        repeater = 2;
        findPercent();
        alert('Congratulations! Your volume is now at ' + percent + '%! Try again?');
        document.getElementById('percent').innerHTML = percent;
        
        let m = random(1,5);
        let n = random(1,6);
        document.getElementById('num' + m + n).innerHTML = 3;
        arrTable[m][n] = 3;

        let l = random(1,5);
        let p = random(1,6);
        document.getElementById('num' + l + p).innerHTML = 99;
        arrTable[l][p] = 99;
        
    }
});

const resetButton = document.querySelector('#button3');
resetButton.addEventListener('click', () =>{
    repeater = 3;
    balls.pop();

    for (let i = 1; i < 6; i++){
        for (let j = 1; j < 7; j++){
            let number = random(0,99);
            document.getElementById('num' + i + j).innerHTML = number;
            arrTable[i-1][j-1] = number;
        }
    }

});

document.getElementById('percent').innerHTML = percent;

//if I make a new array of numbers and add them to each slot of the grid and then use random for each

let arrTable = [[78, 17, 88, 3, 42, 21], [52, 94, 0, 76, 100, 67], [16, 60, 87, 68, 1, 22], [12, 44, 64, 72, 92, 31], [98, 71, 86, 8, 10, 9]];

function findPercent(){
    let arrX = [0];
    arrX.push(width/6);
    arrX.push((width/6)*2);
    arrX.push((width/6)*3);
    arrX.push((width/6)*4);
    arrX.push((width/6)*5);
    arrX.push(width);

    let arrY = [0];
    arrY.push(height/5);
    arrY.push((height/5)*2);
    arrY.push((height/5)*3);
    arrY.push((height/5)*4);
    arrY.push(height);

    for(let i = 0; i < arrX.length-1; i++){
        if(balls[0].x > arrX[i] && balls[0].x < arrX[i+1]){
            for (let j = 0; j < arrY.length - 1; j++){
                if(balls[0].y > arrY[j] && balls[0].y < arrY[j+1]){
                    percent = arrTable[j][i];
                    break;
                }
            }
        }
    }
}

for (let i = 1; i < 6; i++){
    for (let j = 1; j < 7; j++){
        let number = random(0,100);
        document.getElementById('num' + i + j).innerHTML = number;
        arrTable[i-1][j-1] = number;
    }
}

console.log(arrTable);