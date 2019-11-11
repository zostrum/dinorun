import "../node_modules/phaser/dist/phaser.js"
import World from "./modules/world"
import Dino from "./modules/dino"
import Obstacles from "./modules/obstacles"
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
        backgroundColor: 'abc',
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {y: 750},
                debug: false
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        },
        custom: {
            worldVelocity: -150,
            platformSprite: {
                w: 1188
            }
        }
    };

    let game = new Phaser.Game(config);
    let gameObjects = {};
    let world, dino, obstacles;

    function preload ()
    {
        this.load.image('ground', '../assets/platform.png');
        this.load.image('star', '../assets/star.png');
        this.load.spritesheet('dino', '../assets/dino_sprite.png', { frameWidth: 44, frameHeight: 46 });
        this.load.atlas('obstacles', 'assets/obstacles.png', 'assets/obstacles_map.json');

        this.config = config;
        world = new World(this);
        dino = new Dino(this);
        obstacles = new Obstacles(this);
        // this.load.image('sky', '../assets/sky.png');
        // this.load.image('bomb', '../assets/bomb.png');
    }


    function create ()
    {
        gameObjects.platforms = world.addPlatforms();
        gameObjects.dino = dino.addDino();

        this.physics.add.collider(gameObjects.dino, gameObjects.platforms);

        gameObjects.cursors = this.input.keyboard.createCursorKeys();

        obstacles.addCollider(gameObjects.platforms);
        // var catctus = this.physics.add.sprite(350, 50, 'obstacles', 'cactus_small_1');
        // catctus.setVelocityX(config.custom.worldVelocity);
        // this.physics.add.collider(catctus, gameObjects.platforms);

    }

    function update ()
    {
        gameObjects.dino.anims.play('run', true);
        world.rotatePlatforms(gameObjects.platforms);
        obstacles.spawnGroundObstacle().removeOutbound();

        dino.processJump(gameObjects.cursors, gameObjects.dino);
    }
}

