class SceneBird extends BoScene {
    constructor(game) {
        super(game)
        this.game = game
        // 循环移动的地面
        this.grounds = []
        this.groundsStatus = 'scroll'
        this.score = 0
        for (var i = 0; i < 20; i++) {
            var g = BoImage.new(game, 'ground')
            g.x = i * 20
            g.y = 500
            this.addElement(g)
            this.grounds.push(g)
        }
        this.sikpCount = 4
        // 加入水管
        this.pipes = Pipes.new(game)
        // 背景
        var bg = BoImage.new(game, 'bg')
        var b = BoAnimation.new(game)
        this.scoreImg = Score.new(this.game, this.score)
        b.x = 100
        b.y = 200
        this.b = b
        this.addElement(bg)
        this.addElement(this.pipes)
        log(this.pipes)
        this.addElement(b)
        this.addElement(this.scoreImg)
        this.setupInput()
    }
    setupInput() {
        var self = this
        self.game.registerAction('a', function (keystatus) {
            self.b.move(-2, keystatus)
        })
        self.game.registerAction('d', function (keystatus) {
            self.b.move(2, keystatus)
        })
        self.game.registerAction('j', function (keystatus) {
            self.b.jump()
        })
    }
    update() {
        super.update()
        this.sikpCount--
        var offset = -5
        if(this.groundsStatus === 'scroll') {
            if (this.sikpCount === 0) {
                this.sikpCount = 4
                offset = 15
            }
            for (var i = 0; i < 20; i++) {
                var g = this.grounds[i]
                g.x += offset
            }
        }
        if (this.b.y === this.b.maxHeight) {
            this.gameOver()
        } else {
            for(var p of this.pipes.pipes) {
                var bird_x = this.b.x
                var pipe_x = p.x + p.w
                if (bird_x > pipe_x && p.pass === false) {
                    this.score++
                    p.pass = true
                    this.removeElement(this.scoreImg)
                    this.scoreImg = Score.new(this.game, this.score)
                    this.addElement(this.scoreImg)
                    log('分数', this.score)
                }
                if(rectIntersects(p, this.b) ||rectIntersects(this.b, p)){
                    this.gameOver()
                }
            }
        }
    }
    gameOver() {
        var self = this
        log('相撞，游戏结束')
        this.b.die()
        self.game.registerAction('j', function (keystatus) {
            log('quxiao')
        })
        this.groundsStatus = 'stop'
        this.pipes.pipesStatus = 'stop'
        var gameOverTag = BoImage.new(this.game, 'gameover')
        gameOverTag.x = 150 - gameOverTag.w / 2
        gameOverTag.y = 500 / 2  - gameOverTag.h / 2
        this.addElement(gameOverTag)
        var label = BoLabel.new(this.game, '按k从新开始游戏')
        this.addElement(label)
    }
    stopGround() {
        this.groundsStatus
    }

    // draw() {
    //     // draw labels
    //     // this.game.context.fillText('按 k 开始游戏', 100, 190)
    // }
}