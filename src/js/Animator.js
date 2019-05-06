
export default class Animator {
    constructor(spriteLoader) {
        this.spriteLoader = spriteLoader;
    }

    createAnimation(name, framesCount, frameRate, width, height, xStart, yStart, spriteSheet, isReverse, loop) {
        let animation = {
            frames: [],
            frameRate: frameRate,
            isAnimating: false,
            currentFrame: 1,
            loop: loop
        }

        for (let i = 0; i < framesCount; i++) {

            if(isReverse){
                animation.frames.push(
                    this.spriteLoader.createSprite(`${name}`, width, height, xStart + i * width, yStart, `${spriteSheet}`, true)
                )
            } else{
                animation.frames.push(
                    this.spriteLoader.createSprite(`${name}`, width, height, xStart + i * width, yStart, `${spriteSheet}`, false)
                )
            }

            
        }

        return animation;
    }

    play(obj, animationName) {
        obj.isAnimating = true;
        obj.animations[animationName].currentFrame++;

        obj.sprite = obj.animations[animationName].frames[obj.animations[animationName].currentFrame];

        if (obj.animations[animationName].currentFrame === obj.animations[animationName].frames.length - 1) {
            obj.animations[animationName].currentFrame = 0;
        }

        setTimeout(() => {
            obj.isAnimating = false;
        }, obj.animations[animationName].frameRate)
    }

}