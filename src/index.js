import "../node_modules/phaser/dist/phaser.js"
import World from "./modules/world"
import Dino from "./modules/dino"
// import {config} from "./modules/config"
// import AppService from "./modules/app.service"
// import {world} from "./modules/world"


// var service = new AppService('lol-kek');
// service.log();

window.onload = function() {

    let config = {
        type: Phaser.AUTO,
        width: 1400,
        height: 300,
        backgroundColor: 'fff',
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {y: 500},
                debug: true
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        },
        custom: {
            worldVelocity: -100,
            platformSprite: {
                w: 1188
            }
        }
    };

    let game = new Phaser.Game(config);
    let gameObjects = {};
    let world, dino;

    function preload ()
    {
        this.load.image('ground', '../assets/platform.png');
        this.load.image('star', '../assets/star.png');
        this.load.spritesheet('dino', '../assets/dino_sprite.png', { frameWidth: 44, frameHeight: 46 });

        this.config = config;
        world = new World(this);
        dino = new Dino(this);
        // this.load.image('sky', '../assets/sky.png');
        // this.load.image('bomb', '../assets/bomb.png');
    }


    function create ()
    {
        gameObjects.platforms = world.addPlatforms();
        gameObjects.dino = dino.addDino();

        this.physics.add.collider(gameObjects.dino, gameObjects.platforms);

        gameObjects.cursors = this.input.keyboard.createCursorKeys();
    }

    function update ()
    {
        gameObjects.dino.anims.play('run', true);
        world.rotatePlatforms(gameObjects.platforms);

        dino.processJump(gameObjects.cursors, gameObjects.dino);

    }
}

