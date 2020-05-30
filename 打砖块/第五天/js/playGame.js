var PlayGame = function(fps,images,runCallback){
    var gameObj = {
        actions:{},
        keys:{},
        images:{},
        scene:null
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

    gameObj.update = function(){
        gameObj.scene.update()
    }

    gameObj.draw = function(){
        gameObj.scene.draw()
    }

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
    gameObj.draw ()
    setTimeout(function(){
        runloop()
    },1000/window.fps)

   }
   var loads = []
   var names = Object.keys(images)
   for(var i = 0;i<names.length;i++){
       let name = names[i]
       var path = images[name]
       let img = new Image()
       img.src = path
       img.onload = function(){
           gameObj.images[name] = img
           loads.push(1)
           if (loads.length == names.length) {
            gameObj.start()
        }
       }
   }
   gameObj.imageByName = function(name) {
    var img = gameObj.images[name]
    var image = {
        w: img.width,
        h: img.height,
        image: img,
    }
    return image
}
gameObj.run = function(scene){
    gameObj.scene = scene
    setTimeout(function(){
        runloop()
  },1000/fps)
}
gameObj.replace = function(scene){
    gameObj.scene = scene
}
gameObj.start = function(scene){
    runCallback(gameObj)
}

   return gameObj
}