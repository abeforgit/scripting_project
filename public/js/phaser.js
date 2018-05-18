function mygame() {
    let player;
    let cursors;
    let graphics;
    let beams;
    let spider;
    let spiders = [];
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

        player = new Player(this, 100, 250);

        this.input.on("pointerdown", shoot.bind(this), this);

        // spiders

        spider = new Spider(this, 100, 100);


        spiders.push(spider);


        graphics = this.add.graphics();
    }


    function destroy(spider) {
        spider.destroy();
    }

    function update() {
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

