export const config = {
    type: Phaser.AUTO,
    width: 1400,
    height: 300,
    backgroundColor: 'ffffff',
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
    }
}