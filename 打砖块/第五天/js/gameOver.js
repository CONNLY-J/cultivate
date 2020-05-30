var gameOver = function(game) {
    var g = {
        game: game,
    }
    // 初始化
    g.draw = function() {
        // draw labels
        game.context.fillText('游戏结束', 500, 240)
    }
    g.update = function() {
        
    }
    return g
}