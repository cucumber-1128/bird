class SceneStart extends BoScene {
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
        // 背景
        var bg = BoImage.new(game, 'bg')
        var message = BoImage.new(this.game, 'message')
        message.x = 150 - message.w / 2
        message.y = 550 / 2 - message.h / 2
        var label = BoLabel.new(this.game, '按k开始游戏')
        this.addElement(bg)
        this.addElement(message)
        this.addElement(label)
        this.setupInput()
    }
    setupInput() {
        var self = this
        self.game.registerAction('k', function (keystatus) {
            self.gameStart()
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
    }
    gameStart() {
        var s = SceneBird.new(this.game)
        this.game.replaceScene(s)
    }


    // draw() {
    //     // draw labels
    //     // this.game.context.fillText('按 k 开始游戏', 100, 190)
    // }
}