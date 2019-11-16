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
            gameData: {
                scoreText: "Score: ",
                userScore: 0,
                stage: 0,
                changeStageEvery: 15,
                speedChange: -50
            },
            obstacles:{
                map: '../assets/obstacles_map.json',
            },
            sounds: {
                tick: "../assets/click.mp3"
            },
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
        this.load.atlas('obstacles', '../assets/obstacles.png', config.custom.obstacles.map);
        this.load.audio('tick', config.custom.sounds.tick);

        this.config = config;
        world = new World(this);
        dino = new Dino(this);
        obstacles = new Obstacles(this);
    }


    function create ()
    {
        obstacles.initObstaclesConfig();
        world.runTimer();

        gameObjects.platforms = world.addPlatforms();
        gameObjects.dino = dino.addDino();
        gameObjects.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(gameObjects.dino, gameObjects.platforms);
        obstacles.addCollider(gameObjects.platforms);
    }

    function update ()
    {
        gameObjects.dino.anims.play('run', true);
        world.rotatePlatforms();
        obstacles.spawnGroundObstacle().removeOutbound();

        dino.processJump(gameObjects.cursors, gameObjects.dino);
    }
}

