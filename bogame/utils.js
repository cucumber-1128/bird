var e = sel => document.querySelector(sel)

var log = console.log.bind(console)

var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

var rectIntersects = function(a, b) {
    var o = a
    if (b.y > o.y && b.y < o.y + o.h) {
        if (b.x > o.x && b.x < o.x + o.w) {
            return true
        }
    }
    return false
}

const randomBetween = function (start, end) {
    var n = Math.random()*(end - start + 1)
    return Math.floor(n + start)
}

const arrayRemoveOne = function (array, target) {
    for (let i = 0; i < array.length; i++) {
        let t = JSON.stringify(target)
        let o = JSON.stringify(array[i])
        if (t === o) {
            array.splice(i, 1)
        }
    }
}