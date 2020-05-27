var PlayGame = function(fps){
    var gameObj = {
        actions:{},
        keys:{},
    }
    //画图，显示图片
    var canvas = document.querySelector('#id-canvas');
    var context = canvas.getContext('2d');
    gameObj.canvas = canvas;
    gameObj.context = context;
    gameObj.drawImage = function(gameImg){
        this.context.drawImage(gameImg.image,gameImg.x,gameImg.y,gameImg.width,gameImg.height);
    }
    //注册按键按下和抬起事件
    window.addEventListener('keydown',function(event){
        gameObj.keys[event.key] = true
    })
    window.addEventListener('keyup',function(event){
        gameObj.keys[event.key] = false
    })
    //将键值和应该要执行的函数对应起来
   gameObj.action = function(key,callback){
       gameObj.actions[key] = callback
   }
   //判断按键状态
   window.fps = 30
   function runloop(){
    var actions = Object.keys(gameObj.actions)
    for (var i = 0; i < actions.length; i++) {
         var key = actions[i]
         if(gameObj.keys[key]) {
             gameObj.actions[key]()
 }
}
gameObj.update()
    //之前画好的图片，污染了画布，要控制其移动，解决办法：改变宽高，清空画布,重画
    //清空：context.clearRect(0,0,canvas.width,canvas.height)
    //该方法实际会出现间隙情况
    context.clearRect(0, 0, canvas.width, canvas.height)
    gameObj.draw()
    setTimeout(function(){
        runloop()
    },1000/window.fps)

   }
   setTimeout(function(){
      runloop()

},1000/fps)
   return gameObj
}