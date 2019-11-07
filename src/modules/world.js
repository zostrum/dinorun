export default class World {
    constructor(scene) {
        this._scene = scene;
    }

    addPlatforms (count = 2) {

        let platforms = this._scene.physics.add.group({
            immovable: true,
            allowGravity: false,
            velocityX: this._scene.config.custom.worldVelocity
        });

        for (let i = 0; i < count; i++) {
            platforms.create(this._scene.config.custom.platformSprite.w * i,
                this._scene.config.height - 50, 'ground').setOrigin(0);
        }

        return platforms;
    };

    addDino() {
        let dino = this._scene.physics.add.sprite(100, 100, 'dino');
        dino.setBounce(0);
        dino.setCollideWorldBounds(true);

        this.addDinoAnimation();

        return dino;
    }

    addDinoAnimation() {
        this._scene.anims.create({
            key: 'run',
            frames: this._scene.anims.generateFrameNumbers('dino', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: true
        });
    }

    rotatePlatforms(platforms) {
        platforms.children.iterate(function (platform) {
            let platformRightPosition = platform.getBounds().right;

            if (platformRightPosition <= 0) {
                // player.anims.msPerFrame = 100;
                platform.setX(platform.width + platformRightPosition);
            }
        });
    }
}

