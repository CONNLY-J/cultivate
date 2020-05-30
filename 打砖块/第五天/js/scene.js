var Scene = function(game){
    var g = {
        game:game
    }
    var board = Board(game)
    var ball = Ball(game);
    var score = 0
    // var block = Blocks()
    var blocks = loadLevel(game,1)
    game.action('a', function(){
    board.moveLeft()
})
    game.action('d', function(){
    board.moveRight()
})
    game.action('f', function(){
    ball.move()
})
g.draw = function() {
    game.drawImage(board)
    game.drawImage(ball)
    
    //通过循环遍历，话砖块
    for (var i = 0; i < blocks.length; i++) {
        var block = blocks[i]
        if (block.alive) {
            game.drawImage(block)
        }
    }
    game.context.fillText('分数:'+score,10,10)
    }

    g.update = function() {
        if(window.paused){
        return
    }
        ball.play()

        //gameOver
        if(ball.y > board.y){
            var over = gameOver(game)
            game.replace(over)
        }

    //挡板和小球碰撞的处理
        if (board.crash(ball)) {
         ball.rev()
     }
     //砖块和小球的碰撞处理
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.crash(ball)) {
            block.kill()
            ball.rev()
            score += 200
    }
}

}
var enableDrag = false
        game.canvas.addEventListener('mousedown', function(event) {
            var x = event.offsetX
            var y = event.offsetY
            // 检查是否点中了小球
            if (ball.hasPoint(x, y)) {
                enableDrag = true
            }
        })
        game.canvas.addEventListener('mousemove', function(event) {
            var x = event.offsetX
            var y = event.offsetY
            if (enableDrag) {
                ball.x = x
                ball.y = y
            }
        })
        game.canvas.addEventListener('mouseup', function(event) {
            var x = event.offsetX
            var y = event.offsetY
            enableDrag = false
        })
        return g
}