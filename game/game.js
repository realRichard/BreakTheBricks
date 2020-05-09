var Game = function(images, runCallback) {
    var g = {
        actions: {},
        keydowns: {},
        images: {},
    }

    var canvas =  document.querySelector('#id-canvas')  
    var context = canvas.getContext('2d')
    g.canvas = canvas
    g.context = context
    // draw
    g.drawImage = function(Image) {
        g.context.drawImage(Image.image, Image.x, Image.y)
    }
    // events
    window.addEventListener('keydown', function(event) {
        g.keydowns[event.key] = true
    })
    window.addEventListener('keyup', function(event) {
        g.keydowns[event.key] = false
    })
    g.registerAction = function(key, callback) {
        g.actions[key] = callback
    }

    window.fps = 30

    g.imageByName = function(name) {
        // log('game.images', g.images[name])
        var img = {
            image: g.images[name],
        }
        return img
    }

    var runloop = function() {
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
        context.clearRect(0, 0, canvas.width, canvas.height)
        // draw
        g.draw()
        // next run lopp
        setTimeout(function() {
            runloop()
        }, 1000 / window.fps)
    }

    // load images before run
    // fetch object' key, and genarate an array
    var imageNames = Object.keys(images)
    // use to detect whether images loaded completely
    var count = 0
    for(let i = 0; i < imageNames.length; i++) {
        let name = imageNames[i]
        let img = new Image()
        img.src = images[name]
        img.onload = function() {
            g.images[name] = img
            count++
            if(count == imageNames.length) {
                // log('images onload', g.images)
                g.run()
            }
        }
    }

    g.replaceScene = function(scene) {
        g.scene = scene
    }

    g.runWithScene = function(scene) {
        g.scene = scene

        // timer
        setTimeout(function() {
            runloop()
        }, 1000 / window.fps)
    }

    g.update = function() {
        g.scene.update()
    }

    g.draw = function() {
        g.scene.draw()
    }

    g.run = function() {
        runCallback(g)
    }

    return g
}
