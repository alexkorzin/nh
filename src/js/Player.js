/* eslint-disable */
import Physical from './Physical';

export default class Player extends Physical {
    constructor(sprite, x, y, animation) {
        
        super(x,y, 16, 32);

        this.x = x || 0;
        this.y = y || 0;
        this.heigh = 32;
        this.width = 16;
        this.sprite = sprite || 'orange';

        this.speed = 1;
        this.weight = 10;
        this.health = 100;
        this.state = 'stay';
        this.gravity;

        this.animation = animation;
    }

    kick() {

    }

    jump() {
        this.move('up')
    }

    move(direction) {
        switch (direction) {
            case 'right':
                if (!this.collisions.right) {
                    this.x += this.speed; this.updateHitBox(); this.animate();
                }
                break;

            case 'left':
                if (!this.collisions.left) {
                    this.x -= this.speed; this.updateHitBox();
                }
                break;

            case 'up':
                if (!this.collisions.top) {
                    this.y -= this.speed; this.updateHitBox();
                }
                break;

            case 'down':
                if (!this.collisions.bottom) {
                    this.y += this.speed; this.updateHitBox();
                }
                break;
        }
    }

    render(ctx) {
        // console.log(this.sprite)
        ctx.save();
        ctx.fillStyle = this.sprite;
        // ctx.fillRect(this.x, this.y, this.width, this.heigh);
        ctx.drawImage(this.sprite, this.x, this.y);
        ctx.restore();
    }

    animate(){
        // this.sprite = this.animation.frame2
        console.log(this.animation)
    }
}