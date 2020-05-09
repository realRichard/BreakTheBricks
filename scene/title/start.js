var startScene = function(game) {
    var s = {
        game: game,
    }

    game.registerAction('s', function() {
        var scene = Scene(game)
        // start scene title
        game.replaceScene(scene)
    })

    s.update = function() {
    }

    s.draw = function() {
        // draw start scene
        game.context.font = "20px serif"
        game.context.fillText("press s to start game", 100, 150)
    }
    return s
}