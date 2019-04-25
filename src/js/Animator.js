export default class Animator {
    constructor() {
        this.animations = {
            runExample: {
                frames: [1, 2, 3],
                frameRate: 1000 / 60
            }
        }
    }

    createAnimation(name, framesCount, frameRate, width, height, xStart, yStart, spriteSheet, spriteLoader) {
        this.animations[name] = {
            frames: [],
            frameRate: frameRate,
            isAnimating: false,
            currentFrame: 1
        }

        for (let i = 0; i < framesCount; i++) {
            this.animations[name].frames.push(
                spriteLoader.createSprite(`${name}`, width, height, xStart + i * width + i, yStart, `${spriteSheet}`)
            )
        }
    }

    play(obj, animationName){
        if (this.animations[animationName].isAnimating) {
            return false;
        } else {
            this.animations[animationName].isAnimating = true;
            this.animations[animationName].currentFrame++;

            obj.sprite = this.animations[animationName].frames[this.animations[animationName].currentFrame];

            if(this.animations[animationName].currentFrame === this.animations[animationName].frames.length-1){
                this.animations[animationName].currentFrame = 0;
            }

            setTimeout(()=>{
                this.animations[animationName].isAnimating = false;
            }, this.animations[animationName].frameRate)
        }
    }

}