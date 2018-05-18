const spidernames = [
    'spider1',
    'spider2',
    'spider3',
    'spider4',
    'spider5',
    'spider6',
    'spider7',
    'spider8',
    'spider9',
    'spider10',
    'spider11',
];

const angleOffset = Phaser.Math.DegToRad(90);

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let Spider = new Phaser.Class({
        Extends: Phaser.GameObjects.Sprite,

        initialize:

            function Spider(scene) {
                let randint = getRandomInt(1, 11);
                let spritename = 'spider' + randint;

                Phaser.GameObjects.Sprite.call(this, scene, 100, 100, spritename);
                scene.physics.add.existing(this);

                this.direction = 0;
                this.speed = 0.1;
                this.target = null;
                this.xSpeed = 0;
                this.ySpeed = 0;
                this.scene = scene;
                this.play('spwalk' + randint);


            },

        setTarget(target) {
            this.target = target;

        },

        update: function (time, delta) {
            if (this.target) {
                let angle = Phaser.Math.Angle.Between(this.x, this.y, this.target.x, this.target.y);
                this.setRotation(angle + angleOffset);
                this.direction = angle;


                let vec = this.scene.physics.velocityFromRotation(this.direction, 2);

                this.x += vec.x;
                this.y += vec.y;
            }


        }

    })
;


