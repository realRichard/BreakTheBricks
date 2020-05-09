var endScene = function(game) {
    var s = {
        game: game,
    }

    s.update = function() {
    }

    game.registerAction('t', function() {
        var title = startScene(game)
        // turn to game over scene
        game.replaceScene(title)
    })

    s.draw = function() {
        // draw game over
        game.context.font = "20px serif"
        game.context.fillText("game over, press t to continue", 100, 150)
    }
    return s
}