function mygame() {
    let player;
    let cursors;
    let graphics;
    let beams;
    let clock;
    let spiders;
    const PLAYERSPEED = 200;
    const WIDTH = 800;
    const HEIGHT = 600;
    let config = {
        type: Phaser.AUTO,
        width: WIDTH,
        height: HEIGHT,
        scene: {
            preload: preload,
            create: create,
            update: update,
            render: render
        },
        physics: {
            default: 'arcade',
            arcade: {
                debug: false
            }
        }
    };

    let game = new Phaser.Game(config);


    function preload() {
        this.load.image('sky', './assets/sky.png');
        this.load.image('laser', './assets/platform.png');
        this.load.image('bomb', './assets/bomb.png');
        this.load.image('star', './assets/star.png');
        this.load.image('player', './assets/player.png');
        this.load.image('beam', './assets/beam.gif');
        this.load.image('spooder', './assets/spooder.png')
    }

    function create() {
        this.add.image(400, 300, 'sky');
        beams = this.physics.add.group();

        player = this.physics.add.sprite(100, 450, 'player');
        player = playerConfig(player);

        this.input.on("pointermove", function (pointer) {
            let angle = Math.atan2(pointer.y - player.y, pointer.x - player.x) * 180 / Math.PI;
            player.angle = angle + 90;
        }, this);


        this.input.on("pointerdown", shoot.bind(this), this);

        cursors = this.input.keyboard.createCursorKeys();

        //spiders

        spiders = this.physics.add.group();

        spiders.create(100, 100, 'spooder');
        this.physics.add.overlap(spiders, beams, destroy, null, this);










    }


    function destroy(spider, beam) {
        spider.destroy();

    }

    function update() {
        keyboardPoll();


    }

    function render() {


    }


    function keyboardPoll() {

        if (cursors.left.isDown) {
            player.setVelocityY(0);
            player.setVelocityX(-PLAYERSPEED);
        }
        else if (cursors.right.isDown) {
            player.setVelocityY(0);
            player.setVelocityX(PLAYERSPEED);

        } else if (cursors.up.isDown) {
            player.setVelocityX(0);
            player.setVelocityY(-PLAYERSPEED);

        } else if (cursors.down.isDown) {
            player.setVelocityX(0);
            player.setVelocityY(PLAYERSPEED);

        } else {
            player.setVelocityX(0);
            player.setVelocityY(0);
        }


    }

    function shoot(pointer) {

        let beam = this.physics.add.sprite(player.x, player.y, 'beam');
        beams.add(beam);
        beam.setOrigin(0, 0.5);
        beam.setScale(3, 1);
        let angle = Math.atan2(pointer.y - player.y, pointer.x - player.x) * 180 / Math.PI;
        beam.setAngle(angle);
        let timedEvent = this.time.delayedCall(20, () => {
            beam.destroy();
        }, [], this);

    }
}
