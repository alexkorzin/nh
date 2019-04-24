
function isBetween(o, a, b) {
    if (o >= a && o <= b) {
        return true;
    }
    else {
        return false;
    }
}

export default class Collider {
    constructor(renderer) {
        this.collides = [];
        this.renderer = renderer
    }

    runCollides() {
        this.collides.forEach(c => {
            c();
        })
    }

    addColider(object1, object2, callback) {
        if (object2 === 'Screen') {
            let checkColide = () => {
                // Left
                if (object1.hitBox.left <= 0) {
                    object1.collisions.left = true
                }
                else {
                    object1.collisions.left = false
                }

                // Top
                if (object1.hitBox.top <= 0) {
                    object1.collisions.top = true
                }
                else {
                    object1.collisions.top = false
                }

                // Right
                if (object1.hitBox.right >= this.renderer.width) {
                    object1.collisions.right = true
                }
                else {
                    object1.collisions.right = false
                }

                // Bottom
                if (object1.hitBox.bottom >= this.renderer.height) {
                    object1.collisions.bottom = true
                }
                else {
                    object1.collisions.bottom = false
                }
            }
            this.collides.push(checkColide);
        }
        else {
            let checkColide = () => {
                // Left and Right side collisions
                if (isBetween(object2.hitBox.top, object1.hitBox.top, object1.hitBox.bottom) ||
                    isBetween(object2.hitBox.bottom, object1.hitBox.top, object1.hitBox.bottom)) {
                    if (object1.hitBox.right === object2.hitBox.left) {
                        object1.collisions.right = true;
                        object2.collisions.left = true;
                    }
                    if (object1.hitBox.left === object2.hitBox.right) {
                        object1.collisions.left = true;
                        object2.collisions.right = true;
                    }
                }

                // Top and bottom side collisions
                if (isBetween(object2.hitBox.right, object1.hitBox.left, object1.hitBox.right) ||
                    isBetween(object2.hitBox.left, object1.hitBox.left, object1.hitBox.right)) {
                    if (object1.hitBox.top === object2.hitBox.bottom) {
                        object1.collisions.top = true;
                        object2.collisions.bottom = true;
                    }
                    if (object1.hitBox.bottom === object2.hitBox.top) {
                        object1.collisions.bottom = true;
                        object2.collisions.top = true;
                    }
                }
            }
            this.collides.push(checkColide);
        }
    }
}