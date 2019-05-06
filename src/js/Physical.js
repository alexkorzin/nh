export default class Physical{
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.heigh = height;
        this.width = width;
        this.gravitaion = false;
        
        this.hitBox = {
            top: this.y,
            right: this.x + this.width,
            bottom: this.y + this.heigh,
            left: this.x
        }
        this.collisions = {
            top: false,
            left: false,
            bottom: false,
            top: false
        }
        this.gravitaion = false;
    }

    updateHitBox() {
        this.hitBox = {
            top: this.y,
            right: this.x + this.width,
            bottom: this.y + this.heigh,
            left: this.x
        }
    }

    gravity() {
        if (this.gravitaion){
            if (!this.collisions.bottom) {
                this.y += this.weight; 
                this.updateHitBox();
            }
        }
    }

    debugHitBox(ctx) {
        ctx.save();
        ctx.strokeStyle = 'green';
        ctx.lineWidth = 2;
        ctx.beginPath();

        // From left top conner
        ctx.moveTo(this.hitBox.left, this.hitBox.top);
        ctx.lineTo(this.hitBox.right, this.hitBox.top);
        ctx.lineTo(this.hitBox.right, this.hitBox.bottom);
        ctx.lineTo(this.hitBox.left, this.hitBox.bottom);
        ctx.lineTo(this.hitBox.left, this.hitBox.top);
        ctx.stroke();

        // console.log(`bottom: ${this.hitBox.bottom}, right: ${this.hitBox.right}`)

        ctx.closePath();

        // console.log(this.collisions)
    }
}