// setup canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

function loop(){
    ctx.fillStyle = ("rgb(0 0 0 / 25%)");
    ctx.fillRect(0, 0, width, height);

    for(const ball of balls){
        ball.draw();
        ball.update();
        ball.collisionDetect();
    }

    requestAnimationFrame(loop);
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

    collisionDetect(){
        for(const ball of balls){
            if(this !== ball){
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx*dx + dy*dy);

                if(distance < this.size + ball.size){
                    // ball.color = this.color = randomRGB();
                    ball.velX = -(ball.velX);
                    ball.velY = -(ball.velY);
                    this.velX = -(this.velX);
                    this.velY = -(this.velY);

                    // let tempBallX = ball.velX;
                    // ball.velX = (ball.velY);
                    // ball.velY = (tempBallX);

                    // let tempThisX = this.velX;
                    // this.velX = (this.velY);
                    // this.velY = (tempThisX);
                }
            }
        }
    }
}

const balls = [];

while (balls.length < 10){
    const size = random(1,20);
    const ball = new Ball(random(0 + size, width - size), random(0 + size, height - size), random(-10, 10), random(-10, 10), randomRGB(), size);
    balls.push(ball);
}

loop();