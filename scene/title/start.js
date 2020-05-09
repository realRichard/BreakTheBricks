class StartScene extends Scene {
    constructor(game) {
        super(game)
        game.registerAction('s', function() {
            // start game
            var scene = new MainScene(game)
            game.replaceScene(scene)
        })
    }

    draw() {
        // draw start scene
        this.game.context.font = "20px serif"
        this.game.context.fillText("press s to start game", 100, 150)
    }
}