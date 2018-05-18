function mygame() {

    let player;
    let cursors;
    let graphics;
    let beams;
    let spider;
    let spiders = [];
    let spiderGroup;
    const WIDTH = 1000;
    const HEIGHT = 700;
    let halfwidth = WIDTH / 2;
    let halfheight = HEIGHT / 2;
    let spawn_points = [[0, 0], [WIDTH, 0], [0, HEIGHT], [WIDTH, HEIGHT], [halfwidth, 0], [0, halfheight], [WIDTH, halfheight], [halfwidth, HEIGHT]];
    let score = 0;
    let scoretext;
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
        this.load.image('spooder', './assets/spooder.png');
        this.load.spritesheet('spider1', './assets/spider01.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('spider2', './assets/spider02.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('spider3', './assets/spider03.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('spider4', './assets/spider04.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('spider5', './assets/spider05.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('spider6', './assets/spider06.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('spider7', './assets/spider07.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('spider8', './assets/spider08.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('spider9', './assets/spider09.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('spider10', './assets/spider10.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('spider11', './assets/spider11.png', {frameWidth: 64, frameHeight: 64});
    }

    function create() {
        //general setup
        graphics = this.add.graphics();
        createAnims(this);

        //background
        this.add.image(400, 300, 'sky').setScale(2, 2);

        //player
        player = new Player(this, 100, 250);


        // spiders
        spiderGroup = this.physics.add.group({classType: Spider, runChildUpdate: true});
        this.physics.add.collider(spiderGroup, player, gameOver, null, this);


        //events
        this.input.on("pointerdown", shoot.bind(this), this);
        let timedEvent = this.time.addEvent({delay: 80, callback: spawn_spider, callbackScope: this, loop: true});

        //score
        scoreText = this.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#000'});
    }

    function gameOver() {
        let name = prompt("Game over!\n" + "Your score: " + score, "Enter your name");
        reset(this);
    }


    function destroy(spider) {

        spiderGroup.killAndHide(spider);
        score += 1;
        scoreText.setText('Score: ' + score);

    }

    function update() {
        // drawBbox();
    }

    function reset(scene) {
        spiderGroup.getChildren().forEach((spider) => destroy(spider));
        player.setPosition(150, 150);
        score = 0;
        scoreText.setText('Score: ' + score);
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


        spiderGroup.getChildren().forEach((spider) => {
            // let bbox = spider.getBounds();
            // let rect = new Phaser.Geom.Rectangle(spider);
            // graphics.strokeRectShape(rect);

            if (Phaser.Geom.Intersects.LineToRectangle(line, spider.body)) {
                destroy(spider);
            }
        })
    }

    function drawBbox() {
        spiderGroup.getChildren().forEach((spider) => {
            // graphics.clear();

            // let bbox = spider.getBounds();
            let rect = new Phaser.Geom.Rectangle(spider.x - (spider.displayWidth / 2), spider.y - (spider.displayHeight / 2), spider.displayWidth, spider.displayHeight);
            // graphics.strokeRectShape(rect);
            //
            //
        })

    }

    function spawn_spider() {
        if (spiderGroup.getLength() < 1000) {


            spider = spiderGroup.get().setActive(true).setVisible(true);

            spider.setTarget(player);
            let pos = spawn_points[Math.floor(Math.random() * spawn_points.length)];
            spider.setPosition(pos[0], pos[1]);
            spiders.push(spider);


        }


    }

    function createAnims(scene) {

        for (let i = 1; i <= 11; i += 1) {
            let config = {
                key: 'spwalk' + i,
                frames: scene.anims.generateFrameNumbers('spider' + i, {start: 5, end: 10}),
                frameRate: 10,
                repeat: -1
            };
            scene.anims.create(config);
        }

    }

}

