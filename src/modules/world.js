export default class World {
    constructor(scene) {
        this._scene = scene;
        this.score = 0;
        let context = new AudioContext();
        context.resume();

        this.registerListeners()
    }

    registerListeners() {
        this._scene.events.addListener('nextStage', this.increaseWorldSpeed, this);
    }

    addPlatforms (count = 2) {

        this.platforms = this._scene.physics.add.group({
            immovable: true,
            allowGravity: false,
            velocityX: this._scene.config.custom.worldVelocity
        });

        for (let i = 0; i < count; i++) {
            this.platforms.create(this._scene.config.custom.platformSprite.w * i,
                this._scene.config.height - 50, 'ground').setOrigin(0);
        }

        return this.platforms;
    };

    rotatePlatforms() {
        this.platforms.children.iterate(function (platform) {
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

        // let self = this;
        this._scene.time.addEvent({
            delay: 250,
            callback: function() {
                this.updateScore();

            },
            callbackScope: this,
            loop: true
        });
    }

    updateScore() {
        this._scene.config.custom.gameData.userScore++;
        this.score.setText(this._scene.config.custom.gameData.scoreText
            + this._scene.config.custom.gameData.userScore);

        if (this._scene.config.custom.gameData.userScore
            % this._scene.config.custom.gameData.changeStageEvery == 0) {

            this._scene.sound.play("tick");
            this._scene.config.custom.gameData.stage++;

            this._scene.config.custom.worldVelocity = this.getNewWorldSpeed();
            this._scene.events.emit('nextStage');
        }

        return this;
    }

    increaseWorldSpeed() {
        this.platforms.setVelocityX(this._scene.config.custom.worldVelocity);
    }

    getNewWorldSpeed() {
        // let acceleration = this._scene.config.custom.gameData.speedChange.max -
        //     (this._scene.config.custom.gameData.stage
        //         * this._scene.config.custom.gameData.speedChange.step);
        //
        // if (acceleration < this._scene.config.custom.gameData.speedChange.min) {
        //     acceleration = this._scene.config.custom.gameData.speedChange.min;
        // }
        //
        // // return acceleration;
        // return 1;

        let newSpeed = this._scene.config.custom.worldVelocity
            + this._scene.config.custom.gameData.speedChange;
        console.log(newSpeed);
        return newSpeed;
    }
}

