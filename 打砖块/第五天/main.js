 
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
        // console.log(event, input.value)
        window.fps = Number(input.value)
    })
}
var main = function(){
    var images = {
        ball:'img/ball.png',
        brick:'img/brick.jpg',
        board:'img/board.png'
    }
    var game = PlayGame(30,images,function(g){
        var s = Scene(g)
        g.run(s)
    });
    enableDebugMode(game,true)
}
main()