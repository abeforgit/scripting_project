function mygame() {
    let config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
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
    let player;


    function preload() {
        this.load.image('sky', './assets/sky.png');
        this.load.image('ground', './assets/platform.png');
        this.load.image('bomb', './assets/bomb.png');
        this.load.image('star', './assets/star.png');
        this.load.image('player', './assets/player.png')
    }

    function create() {
        this.add.image(400, 300, 'sky');

        player = this.physics.add.sprite(100, 450, 'player');
        player = playerConfig(player);

        this.input.on("pointermove", function (pointer) {
            let angle = Math.atan2(pointer.y - player.y, pointer.x - player.x) * 180 / Math.PI;
            console.log(angle);
            player.angle = angle + 90;
        }, this);


    }

    function update() {
    }

    function render() {

        game.debug.spriteInfo(sprite, 32, 32);

    }
}
