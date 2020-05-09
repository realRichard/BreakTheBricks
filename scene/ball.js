var Ball = function(game) {
    var img = game.imageByName('ball')
    var o = {
        image: img.image,
        x: 190,
        y: 240,
        speedx: 10,
        speedy: 10,
        fired: false,
    }
    o.fire = function() {
        o.fired = true
    }
    o.move = function() {
        if(o.fired) {
            // log('ball move')
            if(o.x < 0 || o.x > 400) {
                o.speedx = -o.speedx
            }
            if(o.y < 0 || o.y > 300) {
                o.speedy = -o.speedy
            }
            o.x += o.speedx
            o.y += o.speedy
        }
    }
    o.rebound = function() {
        o.speedy *= -1
    }

    o.hasPosition = function(x, y) {
        var xIn = x > o.x && x < o.x + o.image.width
        var yIn = y > o.y && y < o.y + o.image.height
        return xIn && yIn
    }

    return o
}
