import "../node_modules/phaser/dist/phaser.js"
import World from "./modules/world"
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
                gravity: {y: 100},
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
    let platforms;
    var dino;
    let world;

    function preload ()
    {
        this.load.image('ground', '../assets/platform.png');
        this.load.image('star', '../assets/star.png');
        this.load.spritesheet('dino', '../assets/dino_sprite.png', { frameWidth: 44, frameHeight: 46 });

        this.config = config;
        world = new World(this);
        // this.load.image('sky', '../assets/sky.png');
        // this.load.image('bomb', '../assets/bomb.png');
    }


    function create ()
    {
        platforms = world.addPlatforms();
        dino = world.addDino();

        this.physics.add.collider(dino, platforms);
    }

    function update ()
    {
        dino.anims.play('run', true);
        world.rotatePlatforms(platforms);
    }
}

