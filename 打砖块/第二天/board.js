/*
        * 挡板部分：横纵坐标、移动速度、关于移动的函数、碰撞条件判断
        */
var Board = function(){
    var img = imgPath('board.png');
    var imgObj = {
        image:img,
        x:175,
        y:420,
        width:180,
        height:50,
        speed:15,
    }
    imgObj.moveLeft = function(){
        if(this.x <= 0){
            this.x = 0
        }
        this.x -= this.speed;
    }
    imgObj.moveRight = function(){
        if(this.x + imgObj.width >1000-imgObj.width){
            this.x = 1000-imgObj.width
        }
        this.x += this.speed;
    }
    //判断碰撞的条件：球的下边缘大于等于挡板的上边缘、球的左边缘大于挡板的左边缘以及球的右边缘小于挡板的右边缘
    imgObj.crash = function(ball) {
        if (ball.y + ball.height >= imgObj.y) {
        if (ball.x > imgObj.x && ball.x + ball.width < imgObj.x + imgObj.width) {
            return true
            }
        }
        return false
    }
    return imgObj
}