/* eslint-disable */
import Physical from './Physical';

export default class Player extends Physical {

    constructor(sprite, x, y, animator, animation) {
        super(x, y, 16, 32);

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
        this.animator = animator;
    }

    kick() {

    }

    jump() {
        let start = Date.now();

        if (this.collisions.bottom) {

            let timer = setInterval(() => {
                let timePassed = Date.now() - start;

                if (timePassed > 250) {
                    clearInterval(timer);
                    return;
                }

                this.y -= timePassed/100;
                this.updateHitBox();
                
            },10)
        }
    }


    move(direction) {
        switch (direction) {
            case 'right':
                if (!this.collisions.right) {
                    this.x += this.speed; this.updateHitBox(); this.animator.play(this, this.animation);
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
        ctx.save();
        ctx.fillStyle = this.sprite;
        // ctx.fillRect(this.x, this.y, this.width, this.heigh);
        ctx.drawImage(this.sprite, this.x, this.y);
        ctx.restore();
    }
}