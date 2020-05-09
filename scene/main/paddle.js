var Paddle = function(game) {
    var img = game.imageByName('paddle')
    var o = {
        image: img.image,
        x: 100,
        y: 270,
        speed: 15,
    }
    o.move = function() {
        if(o.x < 0) {
            o.x = 0
        } else if(o.x + o.image.width > 400) {
            o.x = 400 - o.image.width
        }
    }
    o.moveLeft = function() {
        o.x -= o.speed
        o.move()
    }
    o.moveRight = function() {
        o.x += o.speed
        o.move()
    }
    o.collide = function(ball) {
        // log('ball image height', ball)
        // javascript load image by async, so mistakes occured below
        // Uncaught TypeError: Cannot read property 'height' of undefined

        // if(o.y < ball.image.height + ball.y) {
        //     if(ball.x > o.x && ball.x + ball.image.width < o.x + o.image.width) {
        //         // log('collide')
        //         return true
        //     }
        // }
        // return false

        return rectIntersects(o, ball) || rectIntersects(ball, o)
    }

    return o
}
