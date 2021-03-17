class Score extends BoImage {
    constructor(game, score) {
        var name = 'score' + score
        super(game, name)
        this.game = game
        this.x = 150 - this.w / 2
        this.y = 100
    }
}