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
                name: 'mario',
                url: 'img/mario.png'
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
        this.sprites.createSprite('marioBig', 16, 32, 16 * 5, 1, 'mario');
    }

    initObjects() {
        // Init players
        this.player = new Player(this.sprites.sprites.marioBig, 0, 0, this.animator, 'marioRunnigRight');
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
    }

    init() {
        this.animator = new Animator();
        this.animator.createAnimation('marioRunnigRight', 4, 70, 16, 32, 16 * 5, 1, 'mario', this.sprites);

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