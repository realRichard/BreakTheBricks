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
    var game =  new Game(images, function(game) {
        var start = new StartScene(game)

        game.runWithScene(start)
    })
}


__main()