export const world = {
    addPlatforms: function (count = 2) {
        let platforms = this.physics.add.group({
            immovable: true,
            allowGravity: false,
            velocityX: this.config.custom.worldVelocity
        });

        for (let i = 0; i < count; i++) {
            platforms.create(this.config.custom.platformSprite.w * i, 100, 'ground').setOrigin(0);
        }

        return platforms;
    }
};


