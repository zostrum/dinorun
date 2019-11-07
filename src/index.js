import "../node_modules/phaser/dist/phaser.js"
// import {config} from "./modules/config"
// import AppService from "./modules/app.service"
import {world} from "./modules/world"

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

    function preload ()
    {
        this.load.image('ground', '../assets/platform.png');
        this.load.image('star', '../assets/star.png');

        this.config = config;
        // this.load.image('sky', '../assets/sky.png');
        // this.load.image('bomb', '../assets/bomb.png');
        // this.load.spritesheet('dude', '../assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    }


    function create ()
    {
        platforms = world.addPlatforms.call(this);
    }

    function update ()
    {
        platforms.children.iterate(function (platform) {
            let platformRightPosition = platform.getBounds().right;

            if (platformRightPosition <= 0) {
                platform.setX(platform.width + platformRightPosition);
            }
        });
    }
}

