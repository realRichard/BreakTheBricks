var SceneEnd = function(game) {
    var s = {
        game: game,
    }

    s.update = function() {
    }

    s.draw = function() {
        // draw game over
        game.context.fillText("game over", 10, 290)
    }
    return s
}