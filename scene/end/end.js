class EndScene extends Scene {
    constructor(game) {
        super(game)
        game.registerAction('t', function() {
            // resume
            var title = new StartScene(game)
            game.replaceScene(title)
        })
    }

    draw() {
        // draw game over
        this.game.context.font = "20px serif"
        this.game.context.fillText("game over, press t to continue", 100, 150)
    }
}
