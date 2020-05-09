class Game {
    constructor(images, runCallback) {
        // global frame per second
        window.fps = 30
        // images like this
        // name: path
        // images = {
        //     paddle: 'img/paddle.png',
        //     ball: 'img/ball.png',
        //     block: 'img/block.png',
        // }
        this.images = images
        // callback
        this.runCallback = runCallback
        // use to save img referrence
        // name: imgReferrence
        this.img = {}
        // could be change scene
        this.scene = null
        // key with action
        // key: function
        this.actions = {}
        // key with status
        // key: bool
        this.keydowns = {}
        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')

        var self = this
        // events
        window.addEventListener('keydown', function(event) {
            self.keydowns[event.key] = true
        })
        window.addEventListener('keyup', function(event) {
            self.keydowns[event.key] = false
        })

        this.init()
    }

    registerAction = function(key, callback) {
        this.actions[key] = callback
    }

    // draw
    drawImage (Image) {
        this.context.drawImage(Image.image, Image.x, Image.y)
    }

    imageByName = function(name) {
        // log('game.images', g.images[name])
        var img = {
            image: this.img[name],
        }
        return img
    }

    init() {
        var g = this
        var imageNames = Object.keys(g.images)
        // use to detect whether images loaded completely
        var count = 0
        for(let i = 0; i < imageNames.length; i++) {
            let name = imageNames[i]
            let img = new Image()
            img.src = images[name]
            img.onload = function() {
                g.img[name] = img
                count++
                if(count == imageNames.length) {
                    // log('images onload', g.images)
                    g.run()
                }
            }
        }
    }

    runloop() {
        var g = this
        // events
        // log('fps', window.fps)
        var actions = Object.keys(g.actions)
        // log('actions key', actions)
        for(var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if(g.keydowns[key]) {
                // if keydown is true, call action
                // log('actions', g.actions[key])
                g.actions[key]()
            }
        }
        // update
        g.update()
        // clear
        g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)
        // draw
        g.draw()
        // next run lopp
        setTimeout(function() {
            g.runloop()
        }, 1000 / window.fps)
    }

    replaceScene(scene) {
        this.scene = scene
    }

    runWithScene(scene) {
        var g = this
        g.scene = scene

        // timer
        setTimeout(function() {
            g.runloop()
        }, 1000 / window.fps)
    }

    update() {
        this.scene.update()
    }

    draw() {
        this.scene.draw()
    }

    run() {
        var g = this
        g.runCallback(g)
    }
}