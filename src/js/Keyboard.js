export default class Keyboard {

    constructor() {
        this.leftButton = false;
        this.rightButton = false;
        this.upButton = false;
        this.downButton = false;

        this.init();
    }

    init() {
        window.document.addEventListener('keydown', this.keyDown.bind(this));
        window.document.addEventListener('keyup', this.keyUp.bind(this));
    }

    keyDown(e) {
        switch (e.keyCode) {
            case 37:
                this.leftButton = true;
                break;
            case 39:
                this.rightButton = true;
                break;
            case 38:
                this.upButton = true;
                break;
            case 40:
                this.downButton = true;
                break;
        }
    }

    keyUp(e) {
        switch (e.keyCode) {
            case 37:
                this.leftButton = false;
            case 39:
                this.rightButton = false;
            case 38:
                this.upButton = false;
            case 40:
                this.downButton = false;
        }
    }
}