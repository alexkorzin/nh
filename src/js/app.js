/* eslint-disable */

import Player from './Player'
import Keyboard from './Keyboard'
import spriteLoader from './SpriteLoader'
import Platform from './Platform'
import Collider from './Collider';
import Decor from './Decor';


class Game {
    constructor() {
        this.state = 'play';
        this.renderer = {
            canvas: undefined,
            context: undefined,
            height: 600,
            width: 800
        };
        this.time;
        this.keyboard;

        this.animations = {};

        this.scene = [];

        this.loadRes().then(() => {
            this.init();
        });
    }

    initRenderer() {
        // Init renderer
        this.renderer.canvas = document.createElement('canvas');
        this.renderer.canvas.height = this.renderer.height;
        this.renderer.canvas.width = this.renderer.width;
        this.renderer.context = this.renderer.canvas.getContext('2d');
        this.renderer.canvas.style.background = "black";
        document.body.appendChild(this.renderer.canvas);

        // console.log(this.sprites.patterns.sky)

    }

    loadRes() {
        return new Promise((resolve, reject) => {
            this.sprites = new spriteLoader();
            this.sprites.loadAtlas('main', 'img/tileset.png').then(() => {
                this.sprites.createPattern('ground', 16, 16, 0, 0, 'main');
                this.sprites.createPattern('sky', 16, 16, 3 * 16, 21 * 16, 'main');
                this.sprites.createPattern('brick', 16, 16, 32, 0, 'main');
                this.sprites.createSprite('cloud', 40, 32, 0, 20*16, 'main');

                this.sprites.loadAtlas('mario', 'img/mario.png').then(() => {
                    let Aframe1 = this.sprites.createSprite('marioBig', 16, 32, 16 * 5, 1, 'mario');
                    let Aframe2 = this.sprites.createSprite('marioBig2', 16, 32, 16 * 6+1, 1, 'mario');
                    let Aframe3 = this.sprites.createSprite('marioBig3', 16, 32, 16 * 7+2, 1, 'mario');
                    let Aframe4 = this.sprites.createSprite('marioBig4', 16, 32, 16 * 8+3, 1, 'mario');
                    this.animations.marioRun = {
                        frame1: Aframe1,
                        frame2: Aframe2,
                        frame3: Aframe3,
                        frame4: Aframe4,
                    }
                    resolve();
                })
            })
        })
    }

    initObjects() {
        // Init players
        let player2 = new Player(this.sprites.sprites.marioBig, 0, 0, this.animations.marioRun);
        let player3 = new Player(this.sprites.sprites.marioBig, 10, 50);
        player2.gravitaion = true;

        let platform = new Platform(this.sprites.patterns.ground, 100, 300, 50, 50);
        let platform2 = new Platform(this.sprites.patterns.ground, 180, 300, 50, 50);

        let cloud = new Decor(this.sprites.sprites.cloud,100,100,40,32)

        // Fill the scene
        this.scene.push(player2);
        this.scene.push(player3);
        this.scene.push(platform);
        this.scene.push(platform2);
        this.scene.push(cloud);

        // Add coliders
        this.collider.addColider(player2, 'Screen');
        this.collider.addColider(player2, player3);
        this.collider.addColider(platform, player2);
        this.collider.addColider(platform2, player2);
        this.collider.addColider(platform, player3);
    }

    init() {
        this.initRenderer();
        this.collider = new Collider(this.renderer);

        this.initObjects();
        // Init Keyboard
        this.keyboard = new Keyboard();

        // Start drawing
        this.render();
    }

    loop() {
        // console.log(1);
    }

    render() {
        this.renderer.context.clearRect(0, 0, this.renderer.width, this.renderer.height);

        // Draw here
        this.collider.runCollides();

        if (this.keyboard.rightButton) {
            this.scene[0].move('right')
        }
        if (this.keyboard.leftButton) {
            this.scene[0].move('left')
        }
        if (this.keyboard.upButton) {
            this.scene[0].move('up');
        }
        if (this.keyboard.downButton) {
            this.scene[0].move('down');
        }

        // console.log(this.scene[0].collisions)

        this.renderer.context.save();
        this.renderer.context.fillStyle = this.sprites.patterns.sky;
        this.renderer.context.fillRect(0, 0, this.renderer.canvas.width, this.renderer.canvas.height);
        this.renderer.context.restore();


        this.scene.forEach(obj => {
            obj.gravity();
            obj.render(this.renderer.context);
            // obj.debugHitBox(this.renderer.context);
        })

        window.requestAnimationFrame(this.render.bind(this))
    }
}

new Game();