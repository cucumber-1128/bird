class BoAnimation {
    constructor(game) {
        this.game = game
        this.animations = {
            idle: [],
            run: [],
        }
        for (var i = 1; i < 4; i++) {
            var name = `bird${i}`
            var t = game.textureByName(name)
            this.animations['idle'].push(t)
        }
        // for (var i = 1; i < 6; i++) {
        //     var name = `idle${i}`
        //     var t = game.textureByName(name)
        //     this.animations['idle'].push(t)
        // }
        this.animationName = 'idle'
        this.texture = this.frames()[0]
        this.w = this.texture.width
        this.h = this.texture.height

        this.frameIndex = 0
        this.frameCount = 3
        this.flipX = false
        this.rotation = 0
        this.alpha = 1
        // 重力加速度
        this.gy = 10
        this.vy = 0
        this.maxHeight = 470
        this.life = true
    }
    static new(game) {
        return new this(game)
    }
    frames() {
        return this.animations[this.animationName]
    }
    jump() {
        this.vy = -10
        this.rotation = -45
    }
    update() {
        // 更新alpha
        if (this.alpha > 0) {
            this.alpha -= 0.05
        }
        // 更新受力
        this.y += this.vy
        this.vy += this.gy * 0.2
        var h = 470
        if (this.y > this.maxHeight) {
            this.y = h
        }
        // 更新角度
        if (this.rotation < 45) {
            this.rotation += 5
        }
        this.frameCount--
        if (this.frameCount === 0 && this.life === true) {
            this.frameCount = 3
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }
    draw() {
        var context = this.game.context
        context.save()

        context.globalAlpha = this.alpha

        var w2 = this.w / 2
        var h2 = this.h / 2
        context.translate(this.x + w2, this.y + h2)
        if (this.flipX) {
            context.scale(-1, 1)
        }
        context.rotate(this.rotation * Math.PI / 180)
        context.translate(-w2, -h2)

        context.drawImage(this.texture, 0, 0)
        context.restore()
    }
    move(x, keystatus) {
        this.flipX = (x < 0)
        this.x += x
        // var animationsName = {
        //     down: 'run',
        //     up: 'idle',
        // }
        // var name = animationsName[keystatus]
        // this.changeAnimation(name)
    }
    die() {
        this.vy = 15
        this.life = false
    }
    changeAnimation(name) {
        this.animationName = name
    }
}