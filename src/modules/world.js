export default class World {
    constructor(scene) {
        this._scene = scene;
        this.score = 0;
        let context = new AudioContext();
        context.resume();
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

    runTimer() {

        this.score = this._scene.add.text(16, 16, this._scene.config.custom.gameData.scoreText
            + this._scene.config.custom.gameData.userScore,
            { fontSize: '32px', fill: '#000' });

        let self = this;
        this._scene.time.addEvent({
            delay: 250,
            callback: function() {
                self.updateScore();
            },
            loop: true
        });
    }

    updateScore() {
        this._scene.config.custom.gameData.userScore++;
        this.score.setText(this._scene.config.custom.gameData.scoreText
            + this._scene.config.custom.gameData.userScore);
        if (this._scene.config.custom.gameData.userScore % 50 == 0) {
            this._scene.sound.play("tick");
            // Emit event here
        }

        return this;
    }
}

