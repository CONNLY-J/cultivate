 /*
        * 砖块（小球）部分：默认位置横纵坐标、移动坐标
        */
       var Ball = function(game){
        // var img = imgPath('ball.png');
        var imgObj = game.imageByName('ball')
        // var imgObj = {
        //     image:img,
        //     x:400,
        //     y:200,
        //     width:60,
        //     height:60,
        //     speedX:10,
        //     speedY:10,
        //     moved:false,//默认小球不动
        // }
        imgObj.x = 400
        imgObj.y = 200
        imgObj.width = 60
        imgObj.height = 60
        imgObj.speedX = 10
        imgObj.speedY = 10
        imgObj.moved = false
        imgObj.move = function(){
            imgObj.moved = true
        }
        imgObj.play = function(){
            //检测小球与四周碰撞
           if(imgObj.moved){
               if(imgObj.x <= 0 || imgObj.x + imgObj.image.width >= 1000){
                   imgObj.speedX = -imgObj.speedX
               }
               if(imgObj.y <= 0 || imgObj.y + imgObj.image.height >= 480){
                   imgObj.speedY = -imgObj.speedY
               }
               imgObj.x += imgObj.speedX;
               imgObj.y += imgObj.speedY
           }
        }
        imgObj.rev = function(){
            imgObj.speedY *= -1
        }
        return imgObj
    }