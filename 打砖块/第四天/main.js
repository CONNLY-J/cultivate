 /*
        * 定义图片来源路径
        */
       var imgPath = function(path){
        var image = new Image();
        image.src = path;
        return image;
    }

var loadLevel = function(game,n){
    n = n-1
    var level = levels[n]
    var blocks = []
    for (var i=0;i<level.length;i++){
        var p = level[i]
        var b = Blocks(game,p)
        blocks.push(b)
    }
    return blocks
}
        var blocks = []
        var enableDebugMode = function(game,enable) {
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
           //关卡功能
            blocks = loadLevel(game,Number(k))
        }
    })
    // 滑动进度条控制小球移动的速度
    document.querySelector('#id-input').addEventListener('input', function(event) {
        var input = event.target
        console.log(event, input.value)
        window.fps = Number(input.value)
    })
}
var main = function(){
    var images = {
        ball:'ball.png',
        brick:'brick.jpg',
        board:'board.png'
    }
    
    
    var game = PlayGame(30,images,function(g){
        var board = Board(game)
        var ball = Ball(game);
        var score = 0
        // var block = Blocks()
        blocks = loadLevel(game,1)
        var paused = false
        game.action('a', function(){
        board.moveLeft()
    })
        game.action('d', function(){
        board.moveRight()
    })
        game.action('f', function(){
        ball.move()
    })
        game.update = function() {
        if(window.paused){
        return
    }
        ball.play()

    //砖块和小球碰撞的处理
        if (board.crash(ball)) {
         ball.speedY *= -1
     }
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.crash(ball)) {
            block.kill()
            ball.rev()
            score += 200
    }
}

}
//设置小球的拖拽
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

game.draw = function() {
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
    });
    enableDebugMode(game,true)
}
main()