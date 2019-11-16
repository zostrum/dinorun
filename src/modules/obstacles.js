export default class Obstacles {

    constructor(scene) {
        this._scene = scene;
        this._obstacles = {
            groundObstacles: this._scene.physics.add.group({
                immovable: false,
                allowGravity: true,
                velocityX: this._scene.config.custom.worldVelocity
            })
        }
        this.init();
        // this._obstacles.groundObstacles.setVelocityX(this._scene.config.custom.worldVelocity);

        this.registerListeners()
    }

    init() {
        this._availableObstacles = [];
        this._addedFromStage = -1;
    }

    registerListeners() {
        this._scene.events.addListener('nextStage', this.increaseObstaclesSpeed, this);
    }

    initObstaclesConfig() {
        if (!this.obstaclesMeta) {
            this.obstaclesMeta = this._scene.cache.json.get('obstacles').meta;
        }

        return this;
    }

    spawnGroundObstacle() {
        this.checkForNewObstacles();

        if (this._obstacles.groundObstacles.countActive() < 1) {
            var cactus = this._scene.physics.add.sprite(this._scene.config.width - 100, 50,
                'obstacles', this.getRandomObstacle());

            this._obstacles.groundObstacles.add(cactus).setVelocityX(this._scene.config.custom.worldVelocity);
        }

        return this;
    }

    getRandomObstacle() {
        let a = this._availableObstacles[Math.floor(Math.random()*this._availableObstacles.length)];
        console.log("random " + a);
        return a;
    }

    checkForNewObstacles() {
        let stage = this._scene.config.custom.gameData.stage;

        if (this.obstaclesMeta.availableOnStage[stage] && this._addedFromStage != stage) {
            this._addedFromStage = stage;
            this._availableObstacles = this._availableObstacles.concat(this.obstaclesMeta.availableOnStage[stage]);
        }
    }

    addCollider(obj) {
        this._scene.physics.add.collider(this._obstacles.groundObstacles, obj);

        return this;
    }

    removeOutbound() {
        for (let obstaclesGroup of Object.values(this._obstacles)) {
            obstaclesGroup.children.iterate(function (obstacle) {
                let obstacleRightPosition = obstacle.getBounds().right;

                if (obstacleRightPosition <= 0) {
                    obstacle.setActive(false);
                }
            });
        }
    }

    increaseObstaclesSpeed() {
        this._obstacles.groundObstacles.setVelocityX(this._scene.config.custom.worldVelocity);
    }
}

