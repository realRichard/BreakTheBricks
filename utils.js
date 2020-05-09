var log = function() {
    console.log.apply(console, arguments)
}

var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

var rectIntersects = function(a, b) {
    // fabulous, much better to isolate the passed paremeter from inner of function
    var ball = a
    var o = b
    if(ball.y + ball.image.height > o.y && ball.y < o.y + o.image.height) {
        if(ball.x > o.x && ball.x < o.x + o.image.width) {
            log('collide')
            return true
        }
    }
    return false
}

var loadLevel = function(game, n) {
    // level begin with 1
    // however array index starts with 0
    var n = n -1
    var level = levels[n]
    var blocks = []
    for(var i = 0; i < level.length; i++) {
        var position = level[i]
        var b = Block(game, position)
        blocks.push(b)
    }
    return blocks
}