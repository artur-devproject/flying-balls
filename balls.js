// defining context and screen size
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const width = canvas.width = window.innerWidth
const height = canvas.height = window.innerHeight

// the function is to randomize some numbers
function random(min, max) {
    let num = Math.floor(Math.random()*(max - min + 1)) + min
    return num
}

// creating the Ball object
class Ball {
    constructor(x, y, velX, velY, color, size) {
        this.x = x
        this.y = y
        this.velX = velX
        this.velY = velY
        this.color = color
        this.size = size
    }

    get area() {
        return this.#calcArea()
    }

    #calcArea() {
        return Math.PI * (this.size) ** 2
    }

    draw() {
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI)
        ctx.fill()
    }

    update() {
        if((this.x + this.size) >= width) this.velX = -(this.velX)
        if((this.x - this.size) <= 0) this.velX = -(this.velX)
        if((this.y + this.size) >= height) this.velY = -(this.velY)
        if((this.y - this.size) <= 0) this.velY = -(this.velY)
        this.x += this.velX
        this.y += this.velY
    }

    collisionDetect(items) {
        for(let j = 1; j < items.length; j++) {
            if(!(this === items[j])) {
                let dx = this.x - items[j].x
                let dy = this.y - items[j].y
                let distance = Math.sqrt(dx*dx + dy*dy)

                if(distance < this.size + items[j].size) {
                    if(this.size > items[j].size) {
                        this.size = Math.sqrt((this.area + items[j].area) / Math.PI)
                        items.splice(j, 1)
                    }
                }
            }
        }
        return items
    }
}

// the array is to keep all the instances of the balls
var balls = []

// filling the screen, creating balls, drawing the balls, restarting the loop
function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 1)'
    ctx.fillRect(0, 0, width, height)

    while(balls.length < 25) {
        let ball = new Ball(
            random(0, width),
            random(0, height),
            random(-10, 10),
            random(-10, 10),
            `rgb(${random(0,255)},${random(0,255)},${random(0,255)})`,
            random(5, 20)
        )
        balls.push(ball)
    }

    for(let i = 0; i < balls.length; i++) {
        balls[i].draw()
        balls[i].update()
        if(balls[i].size > 100) {
            balls.splice(i, 1)
        } else {
            balls = balls[i].collisionDetect(balls)
        }
    }

    requestAnimationFrame(loop)
}

// starting the game
loop()