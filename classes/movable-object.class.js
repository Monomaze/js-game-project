class MovableObject {
    x = 0;
    y = 0;
    img;
    width;
    height;
    imageCache = [];
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    sizeMultiplier = 1;
    speedY = 0;
    acceleration = 3;
    health = 100;
    lastHit = 0;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    playAnimation(images) {
        let index = this.currentImage % images.length;
        let path = images[index];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawRect(ctx, color) {
        if (this instanceof Player || this instanceof Mushroom || this instanceof Boss) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = color;
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                if (this.y > 410 - this.height) {
                    this.y = 410 - this.height;
                }
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 410 - this.height;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    moveRight() {
        this.x += this.speed;
    }

    jump() {
        return this.speedY = 25;
    }

    isColliding(obj) {
        return  (this.x + this.width) >= obj.x && 
                this.x <= (obj.x + obj.width) && 
                (this.y + this.height) >= obj.y &&
                this.y <= (obj.y + obj.height);
    }

    hit() {
        this.health -= 5;
        if (this.health < 0) {
            this.health = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 0.2;
    }

    isDead() {
        return this.health == 0;
    }
}