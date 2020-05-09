var paused = false
var blocks = []
var score = 0
var enableDrag = false

var images = {
    paddle: 'img/paddle.png',
    ball: 'img/ball.png',
    block: 'img/block.png',
}


var __main = function() {
    var game = Game(images, function(game) {
        var scene = Scene(game)

        game.runWithScene(scene)
        
    })
}

__main()