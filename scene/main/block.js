var Block = function(game, position) {
    // positon is seem as [0, 0]
    var img = game.imageByName('block')
    var o = {
        image: img.image,
        x: position[0],
        y: position[1],
        alive: true,
        lives: position[2] || 1,
    }
    // log('block h w', img.image.height, img.image.width)
    o.kill = function() {
        o.lives--
        if(o.lives < 1) {
            o.alive = false
        }
    }
    o.collide = function(ball) {
        return rectIntersects(o, ball) || rectIntersects(ball, o)
    }

    return o
}
