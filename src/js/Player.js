/* eslint-disable */
import Physical from './Physical';

export default class Player extends Physical {

    constructor(sprite, x, y, animator) {
        super(x, y, 16, 32);

        this.x = x || 0;
        this.y = y || 0;
        this.height = 32;
        this.width = 16;

        this.sprites = sprite;
        this.originalSprite = this.sprites.right;
        this.sprite = this.sprites.right || 'orange';

        this.speed = 2;
        this.weight = 6;
        this.health = 100;
        this.gravity;

        this.animations = {};
        this.animator = animator;
        this.isAnimating = false;

        this.state = {
            direction: 'right',
            doing: 'stay'
        }

    }

    addAnimation(name, animation){
        this.animations[name] = animation;
    }

    playAnimation(name){
        if(!this.isAnimating){
            this.animator.play(this, name);
        }
    }

    kick() {

    }

    jump() {
        
    }


    move(direction) {
        switch (direction) {
            case 'right':
            this.originalSprite = this.sprites.right;
                if (!this.collisions.right) {
                    this.x += this.speed; this.updateHitBox(); 
                    if(this.collisions.bottom){
                        this.playAnimation('RunRight')
                    }
                }
                break;

            case 'left':
            this.originalSprite = this.sprites.left;
                if (!this.collisions.left) {
                    this.x -= this.speed; this.updateHitBox();
                    if(this.collisions.bottom){
                        this.playAnimation('RunLeft')
                    }
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
        if(!this.isAnimating){
            this.sprite = this.originalSprite;
        }
        ctx.fillStyle = this.sprite;
        // ctx.fillRect(this.x, this.y, this.width, this.heigh);
        // ctx.drawImage(this.sprite, this.x, this.y);

        
        

        ctx.drawImage(this.sprite, this.x, this.y);
        ctx.restore();
    }
}