// var loadLevel = function(game, n) {
//     n = n - 1
//     var level = levels[n]
//     var blocks = []
//     for (var i = 0; i < level.length; i++) {
//         var p = level[i]
//         var b = Block(game, p)
//         blocks.push(b)
//     }
//     return blocks
// }

var enableDebugMode = function(game, enable) {
    if(!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event){
        var k = event.key
        if (k == 'p') {
            // 暂停功能
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            // 为了 debug 临时加的载入关卡功能
            // blocks = loadLevel(game, Number(k))
        }
    })
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        // log(event, input.value)
        window.fps = Number(input.value)
    })
}

var __main = function() {
    var images = {
        bg: 'img/bg.png',
        // 小鸟
        bird1: 'img/bird1.png',
        bird2: 'img/bird2.png',
        bird3: 'img/bird3.png',
        ground: 'img/fg.png',
        pipe: 'img/p1.png',
        score0: 'img/source/source1.png',
        score1: 'img/source/source2.png',
        score2: 'img/source/source3.png',
        score3: 'img/source/source4.png',
        gameover: 'img/gameover.png',
        message: 'img/message.png',
    }
    var game = BoGame.instance(30, images, function(g){
        // var s = Scene.new(g)
        var s = SceneStart.new(g)
        g.runWithScene(s)
    })

    enableDebugMode(game, true)
}

__main()
