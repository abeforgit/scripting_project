function Player(scene, x, y) {
    const PLAYERSPEED = 400;


    let player = scene.physics.add.sprite(x, y, 'player');
    player.setOrigin(0.5, 0.6);
    player.setCollideWorldBounds(true);
    registerMovement();
    registerMouseLook()

    return player;

    function registerMouseLook() {
         scene.input.on("pointermove", function (pointer) {
            let angle = Math.atan2(pointer.y - player.y, pointer.x - player.x) * 180 / Math.PI;
            player.angle = angle + 90;
        }, scene);
    }

    function registerMovement() {
        // Creates object for input with WASD kets
        moveKeys = scene.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'down': Phaser.Input.Keyboard.KeyCodes.S,
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D
        });

        // Enables movement of player with WASD keys
        scene.input.keyboard.on('keydown_W', function (event) {

            player.setVelocityY(-PLAYERSPEED);
        });
        scene.input.keyboard.on('keydown_S', function (event) {
            player.setVelocityY(PLAYERSPEED);
        });
        scene.input.keyboard.on('keydown_A', function (event) {
            player.setVelocityX(-PLAYERSPEED);
        });
        scene.input.keyboard.on('keydown_D', function (event) {
            player.setVelocityX(PLAYERSPEED);
        });

        // Stops player acceleration on uppress of WASD keys
        scene.input.keyboard.on('keyup_W', function (event) {
            if (moveKeys['down'].isUp)
                player.setVelocityY(0);
        });
        scene.input.keyboard.on('keyup_S', function (event) {
            if (moveKeys['up'].isUp)
                player.setVelocityY(0);
        });
        scene.input.keyboard.on('keyup_A', function (event) {
            if (moveKeys['right'].isUp)
                player.setVelocityX(0);
        });
        scene.input.keyboard.on('keyup_D', function (event) {
            if (moveKeys['left'].isUp)
                player.setVelocityX(0);
        });
    }

}