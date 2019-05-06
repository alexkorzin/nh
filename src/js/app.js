/* eslint-disable */

import Player from './Player'
import Keyboard from './Keyboard'
import spriteLoader from './SpriteLoader'
import Platform from './Platform'
import Collider from './Collider';
import Decor from './Decor';
import Animator from './Animator';
import Renderer from './Renderer';


class Game {
    constructor() {
        this.state = 'play';
        this.animations = {};
        this.scene = [];

        this.playerSpritePack = {};


        this.loadRes().then(() => {
            this.init();
        });
    }

    loadRes() {
        return new Promise((resolve) => {
            this.sprites = new spriteLoader();
            this.sprites.loadAtlas({
                name: 'main',
                url: 'img/tileset.png'
            }, {
                name: 'player',
                url: 'img/player.png'
            },{
                name: 'background',
                url: 'img/bg.png'
            })
            .then(() => {
                this.createSprites();
                resolve();
            })
        })
    }

    createSprites() {
        this.sprites.createPattern('ground', 16, 16, 0, 0, 'main');
        this.sprites.createPattern('sky', 16, 16, 3 * 16, 21 * 16, 'main');
        this.sprites.createPattern('brick', 16, 16, 32, 0, 'main');
        this.sprites.createSprite('cloud', 40, 32, 0, 20 * 16, 'main');
        let sprite1 = this.sprites.createSprite('playerRight', 16, 32, 0, 0, 'player');
        let sprite2 = this.sprites.createSprite('playerLeft', 16, 32, 0, 0, 'player', true);
        this.playerSpritePack.right = sprite1;
        this.playerSpritePack.left = sprite2;
    }

    initObjects() {
        // Init players
        this.animator = new Animator(this.sprites);
        this.player = new Player(this.playerSpritePack, 0, 0, this.animator);
        this.player.gravitaion = true;

        let platform = new Platform(this.sprites.patterns.ground, 100, 300, 50, 50);
        let platform2 = new Platform(this.sprites.patterns.brick, 180, 300, 50, 50);

        let cloud = new Decor(this.sprites.sprites.cloud, 100, 100, 40, 32)

        // Fill the scene
        this.scene.push(this.player);
        this.scene.push(platform);
        this.scene.push(platform2);
        this.scene.push(cloud);

        // Add coliders
        this.collider.addColider(this.player, 'Screen');
        this.collider.addColider(platform, this.player);
        this.collider.addColider(platform2, this.player);

        // animations
        let MarioRunRight = this.animator.createAnimation('MarioRunRight', 4, 70, 16, 32, 0, 0, 'player')
        let MarioRunLeft = this.animator.createAnimation('MarioRunRight', 4, 70, 16, 32, 0, 0, 'player', true)
        this.player.addAnimation('RunRight', MarioRunRight);
        this.player.addAnimation('RunLeft', MarioRunLeft);
    }

    init() {

        this.renderer = new Renderer(800, 600);
        this.renderer.init();

        this.collider = new Collider(this.renderer);

        this.initObjects();
        // Init Keyboard
        this.keyboard = new Keyboard();

        // Start drawing
        this.render();
    }

    render() {
        this.renderer.clear();

        // Draw here
        this.collider.runCollides();

        if (this.keyboard.rightButton) {
            this.player.move('right')
        }
        if (this.keyboard.leftButton) {
            this.player.move('left')
        }
        if (this.keyboard.upButton) {
            this.player.jump();
            // this.player.move('up');
        }
        if (this.keyboard.downButton) {
            this.player.move('down');
        }

        this.renderer.context.save();
        this.renderer.context.fillStyle = this.sprites.patterns.sky;
        this.renderer.context.fillRect(0, 0, this.renderer.canvas.width, this.renderer.canvas.height);
        this.renderer.context.restore();

        this.scene.forEach(obj => {
            obj.gravity();
            obj.render(this.renderer.context);
        })

        window.requestAnimationFrame(this.render.bind(this))
    }
}

new Game();