export default class SpriteLoader {
    constructor() {

        this.sheets = {};
        this.patterns = {};
        this.sprites = {};
    }

    loadAtlas(...obj) {
        return new Promise((resolve, reject) => {
            Promise.all(obj.map(o => {
                return new Promise((resolve, reject) => {
                    let image = new Image();
                    image.src = o.url;
                    image.onload = () => {
                        this.sheets[o.name] = image;
                        resolve();
                    }
                })
            })).then(() => {
                resolve();
            })
        })
    }

    createPattern(name, width, height, xOffset, yOffset, sheet) {
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        canvas.height = height;
        canvas.width = width;
        ctx.drawImage(this.sheets[sheet], xOffset, yOffset, height, width, 0, 0, height, width);
        let pattern = ctx.createPattern(canvas, 'repeat')
        this.patterns[name] = pattern;
        return canvas;
    }

    createSprite(name, width, height, xOffset, yOffset, sheet, isReverse) {
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        canvas.height = height;
        canvas.width = width;

        if(isReverse){
            ctx.save();
            ctx.scale(-1,1);
            ctx.drawImage(this.sheets[sheet], xOffset, yOffset, width, height, 0, 0, width*-1, height);
            ctx.restore();
        }

        else{
            ctx.drawImage(this.sheets[sheet], xOffset, yOffset, width, height, 0, 0, width, height);
        }
     
        this.sprites[name] = canvas;

        return canvas;
    }
}