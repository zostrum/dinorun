export default class dino {
    constructor(scene) {
        this._scene = scene;
    }

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

    processJump(cursors, dino) {
        if (cursors.up.isDown && dino.body.touching.down)
        {
            dino.setVelocityY(-300);
        }
    }

}

