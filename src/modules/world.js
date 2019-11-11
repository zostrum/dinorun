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

