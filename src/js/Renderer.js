export default class Renderer{
    constructor(width, height){
        this.width = width;
        this.height = height;
    }

    init(){
        this.canvas = document.createElement('canvas');
        this.canvas.height = this.height;
        this.canvas.width = this.width;
        this.context = this.canvas.getContext('2d');
        this.canvas.style.background = "black";
        document.body.appendChild(this.canvas);
    }

    clear(){
        this.context.clearRect(0, 0, this.width, this.height);
    }
}