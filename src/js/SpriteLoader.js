export default class SpriteLoader {
    constructor() {

        this.sheets = {};
        this.patterns = {};
        this.sprites = {};
    }

    // loadAtlas(name, url) {
    //     return new Promise((resolve, reject) => {
    //         let image = new Image();
    //         image.src = url;
    //         image.onload = () => {
    //             this.sheets[name] = image;
    //             resolve();
    //         }
    //     })
    // }

    loadAtlas(...obj) {
        return new Promise((resolve, reject) => {

            obj.forEach(o => {
                return new Promise((resolve, reject) => {
                    let image = new Image();
                    image.src = o.url;
                    image.onload = () => {
                        this.sheets[o.name] = image;
                    }
                    resolve();
                })

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
    }

    createSprite(name, width, height, xOffset, yOffset, sheet) {
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        canvas.height = height;
        canvas.width = width;
        ctx.drawImage(this.sheets[sheet], xOffset, yOffset, width, height, 0, 0, width, height);
        this.sprites[name] = canvas;

        return canvas;
    }
}