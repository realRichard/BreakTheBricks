var enableDebugMode = function(game, ball, mode=false) {
    if(!mode) {
        return
    }

    window.addEventListener('keydown', function(event) {
        var k = event.key
        // pause game by press p
        if(k == 'p') {
            paused = !paused
        // switch level
        } else if('123456789'.includes(k)) {
            blocks = loadLevel(game, Number(k))
        }
    })

    // change fps
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        window.fps = Number(input.value)
    })

    // dynamic drag ball
    game.canvas.addEventListener('mousedown', function(event) {
        var x = event.offsetX
        var y = event.offsetY
        if(ball.hasPosition(x, y)) {
            log('mousedown', x, y)
            enableDrag = true
        }
    })
    game.canvas.addEventListener('mousemove', function(event) {
        var x = event.offsetX
        var y = event.offsetY
        if(enableDrag) {
            log('mousemove drag')
            ball.x = x
            ball.y = y
        }
    })
    game.canvas.addEventListener('mouseup', function(event) {
        var x = event.offsetX
        var y = event.offsetY
        // log('mouseup', event)
        enableDrag = false
    })
}

var MainScene = function(game) {
    var s = {
        game: game,
    }

    var paddle = Paddle(game)

    var ball = Ball(game)

    blocks = loadLevel(game, 1)

    enableDebugMode(game, ball, true)

    game.registerAction('a', function() {
        paddle.moveLeft()
    })

    game.registerAction('d', function() {
        paddle.moveRight()
    })

    game.registerAction('f', function() {
        ball.fire()
    })

    s.update = function() {
        // log('paused', paused)
        if(paused) {
            return 
        }

        // check game over
        if(ball.y > paddle.y) {
            var end = new EndScene(game)
            // turn to game over scene
            game.replaceScene(end)
        }

        ball.move()
        if(paddle.collide(ball)) {
            ball.rebound()
        }

        for(var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if(block.alive && block.collide(ball)) {
                block.kill()
                ball.rebound()
                score += 100
            }
        }
    }

    s.draw = function() {
        // draw color
        game.context.fillStyle = '#8c8c8c';
        game.context.fillRect(0, 0, 400, 300);
        // draw
        game.drawImage(paddle)
        game.drawImage(ball)

        // draw blocks
        for(var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if(block.alive) {
                game.drawImage(block)
            }
        }
        // draw score
        game.context.fillText("socre: " + score, 10, 290)
    }
    return s
}