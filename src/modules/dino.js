export default class dino {
    constructor(scene) {
        this._scene = scene;

        this.registerListeners()
    }

    registerListeners() {
        this._scene.events.addListener('nextStage', this.increaseAnimationSpeed, this);
    }

    addDino() {
        this.dino = this._scene.physics.add.sprite(100, 100, 'dino');
        this.dino.setBounce(0);
        this.dino.setCollideWorldBounds(true);

        this.addDinoAnimation();

        return this.dino;
    }

    addDinoAnimation() {
        this._scene.anims.create({
            key: 'run',
            frames: this._scene.anims.generateFrameNumbers('dino', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: true
        });
    }

    processJump(cursors) {
        if (cursors.up.isDown && this.dino.body.touching.down)
        {
            this.dino.setVelocityY(-300);
        }
    }

    increaseAnimationSpeed() {
        this.dino.anims.msPerFrame/= 1.05;
    }
}

