class BoScene {
    constructor(game) {
        this.game = game
        this.elements = []
        this.debugModeEnable = true
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    addElement(boImage) {
        boImage.scene = this
        boImage.code = this.elements.length
        this.elements.push(boImage)
    }
    removeElement(boImage) {
        for (let i = 0; i < this.elements.length; i++) {
            let e = this.elements[i]
            if (boImage.code === e.code) {
                this.elements.splice(i, 1)
            }
        }
    }
    draw() {
        for (var i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
            // this.game.drawImage(e)
            e.draw()
        }
    }
    update() {
        if (this.debugModeEnable) {
            for (var i = 0; i < this.elements.length; i++) {
                var e = this.elements[i]
                e.debug && e.debug()
            }
        }
        for (var i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
            e.update()
        }
    }
}
