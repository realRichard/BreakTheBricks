class MainScene extends Scene {
    constructor(game) {
        super(game)
        this.init()
    }

    enableDebugMode(mode=false) {
        var self = this
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
                self.blocks = loadLevel(self.game, Number(k))
            }
        })

        // change fps
        document.querySelector('#id-input-speed').addEventListener('input', function(event) {
            var input = event.target
            window.fps = Number(input.value)
        })

        // dynamic drag ball
        self.game.canvas.addEventListener('mousedown', function(event) {
            var x = event.offsetX
            var y = event.offsetY
            if(self.ball.hasPosition(x, y)) {
                log('mousedown', x, y)
                enableDrag = true
            }
        })
        self.game.canvas.addEventListener('mousemove', function(event) {
            var x = event.offsetX
            var y = event.offsetY
            if(enableDrag) {
                log('mousemove drag')
                self.ball.x = x
                self.ball.y = y
            }
        })
        self.game.canvas.addEventListener('mouseup', function(event) {
            var x = event.offsetX
            var y = event.offsetY
            // log('mouseup', event)
            enableDrag = false
        })
    }

    init() {
        var self=  this
        self.paddle = Paddle(self.game)

        self.ball = Ball(self.game)

        self.blocks = loadLevel(self.game, 1)

        self.enableDebugMode(true)

        self.game.registerAction('a', function() {
            self.paddle.moveLeft()
        })
    
        self.game.registerAction('d', function() {
            self.paddle.moveRight()
        })
    
        self.game.registerAction('f', function() {
            self.ball.fire()
        })
    }

    update() {
        var self = this
        // log('paused', paused)
        if(paused) {
            return 
        }

        // check game over
        if(self.ball.y > self.paddle.y) {
            var end = new EndScene(self.game)
            // turn to game over scene
            self.game.replaceScene(end)
        }

        self.ball.move()
        if(self.paddle.collide(self.ball)) {
            self.ball.reboundy()
        }

        for(var i = 0; i < self.blocks.length; i++) {
            var block = self.blocks[i]
            // log('block', self.blocks)
            if(block.alive && block.collide(self.ball)) {
                block.kill()
                self.ball.reboundy()
                score += 100
            }
        }
    }

    draw() {
        var self = this
        // draw color
        self.game.context.fillStyle = '#8c8c8c';
        self.game.context.fillRect(0, 0, 400, 300);
        // draw
        self.game.drawImage(self.paddle)
        self.game.drawImage(self.ball)

        // draw blocks
        for(var i = 0; i < self.blocks.length; i++) {
            var block = self.blocks[i]
            if(block.alive) {
                self.game.drawImage(block)
            }
        }
        // draw score
        self.game.context.fillText("socre: " + score, 10, 290)
    }
}