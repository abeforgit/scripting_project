function mygame() {
    let player;
    let cursors;
    let graphics;
    let beams;
    let spider;
    let spiders = [];
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
        beams = this.physics.add.staticGroup();

        player = this.physics.add.sprite(100, 450, 'player');
        player.setOrigin(0.5, 0.6);

        this.input.on("pointermove", function (pointer) {
            let angle = Math.atan2(pointer.y - player.y, pointer.x - player.x) * 180 / Math.PI;
            player.angle = angle + 90;
        }, this);


        this.input.on("pointerdown", shoot.bind(this), this);

        cursors = this.input.keyboard.createCursorKeys();

        // spiders

        spider = this.physics.add.sprite(100, 100, 'spooder');
        let spider2 = this.physics.add.sprite(200, 100, 'spooder');
        let spider3 = this.physics.add.sprite(100, 200, 'spooder');
        let spider4 = this.physics.add.sprite(600, 100, 'spooder');
        let spider5 = this.physics.add.sprite(600, 400, 'spooder');

        spiders.push(spider);
        spiders.push(spider2);
        spiders.push(spider3);
        spiders.push(spider4);
        spiders.push(spider5);

        graphics = this.add.graphics();
    }


    function destroy(spider) {
        spider.destroy();
    }

    function update() {
        keyboardPoll();
    }

    function keyboardPoll() {

        if (cursors.left.isDown) {
            player.setVelocityX(-PLAYERSPEED);
        }
        else if (cursors.right.isDown) {
            player.setVelocityX(PLAYERSPEED);
        }
        else {
            player.setVelocityX(0);
        }
        if (cursors.up.isDown) {
            player.setVelocityY(-PLAYERSPEED);
        }
        else if (cursors.down.isDown) {
            player.setVelocityY(PLAYERSPEED);
        }
        else {
            player.setVelocityY(0);
        }
    }

    function shoot(pointer) {

        let beam = this.add.sprite(player.x, player.y, 'beam');
        beam.setOrigin(0, 0.5);

        beam.setScale(3, 1);

        let angle = Math.atan2(pointer.y - player.y, pointer.x - player.x) * 180 / Math.PI;
        beam.setAngle(angle);

        let timedEvent = this.time.delayedCall(40, () => {
            beam.destroy();
        }, [], this);

        checkSpiderCollision(player.x, player.y, pointer.x, pointer.y)
    }

    function checkSpiderCollision(originx, originy, rdirx, rdiry) {
        let line = new Phaser.Geom.Line(originx, originy, rdirx, rdiry);
        console.log(line);
        let nx = Phaser.Geom.Line.NormalX(line) * 5000;
        let ny = Phaser.Geom.Line.NormalY(line) * 5000;
        line.x2 -= ny;
        line.y2 += nx;

        // graphics.clear();
        // graphics.lineStyle(2, 0x00ff00);
        // graphics.strokeLineShape(line);

        spiders.forEach((spider) => {
            let bbox = spider.getBounds();
            let rect = new Phaser.Geom.Rectangle(bbox.x, bbox.y, bbox.width, bbox.height)
            // graphics.strokeRectShape(rect);

            if (Phaser.Geom.Intersects.LineToRectangle(line, rect)) {
                destroy(spider);
            }
        })
    }
}

