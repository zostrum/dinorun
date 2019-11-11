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

    }

    spawnGroundObstacle() {
        if (this._obstacles.groundObstacles.countActive() < 1) {
            var cactus = this._scene.physics.add.sprite(this._scene.config.width - 100, 50, 'obstacles', 'cactus_small_1');

            this._obstacles.groundObstacles.add(cactus);
        }

        return this;
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
}

