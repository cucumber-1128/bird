class BoParticle extends BoImage{
    constructor(game) {
        super(game, 'fire')
        this.setup()
    }
    setup() {
        this.life = 10
    }
    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }
    update() {
        this.life--
        this.x += this.vx
        this.y += this.vy
        var factor = 0.01
        this.vx += factor * this.vx
        this.vy += factor * this.vy
    }
}

class BoParticlesSystem {
    constructor(game, x, y) {
        this.game = game
        this.x = x
        this.y = y
        this.setup()
    }
    static new(game, x, y) {
        return new this(game, x, y)
    }
    setup() {
        this.duration = 30
        this.numberOfParticles = 100
        this.particles = []
    }
    update() {
        this.duration--
        if (this.duration < 0) {
            // 删除掉火花
           this.die()
        }
        // 添加小火花
        // 更新所有的小火花
        if (this.particles.length < this.numberOfParticles) {
            var p = BoParticle.new(this.game)
            // 设置初始化坐标
            var speed = 1
            var vx = randomBetween(-speed, speed)
            var vy = randomBetween(-speed, speed)
            p.init(this.x, this.y, vx, vy)
            this.particles.push(p)
        }
        for (var p of this.particles) {
            p.update()
        }
        // 删除死掉的小火花
        this.particles = this.particles.filter(p => p.life > 0)
    }
    draw() {
        for (var p of this.particles) {
            p.draw()
        }
    }
    die() {
        this.particles = []
        this.numberOfParticles = 0
    }
}