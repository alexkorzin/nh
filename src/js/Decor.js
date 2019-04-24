export default class Decor {
    constructor(sprite, x, y, width, height) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    render(ctx) {
        // console.log(this.sprite)
        ctx.save();
        ctx.fillStyle = this.sprite;
        ctx.drawImage(this.sprite, this.x, this.y);
        ctx.restore();
    }

    gravity(){
        
    }
}