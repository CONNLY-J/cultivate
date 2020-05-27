/*
*砖块部分：定义kill和life
*/

var Blocks = function(position){
    var p =position
    var img = imgPath('brick.jpg');
    var blocksObj = {
        image:img,
        x:p[0],
        y:p[0],
        width:30,
        height:20,
        life:1,//砖块生命值
        alive:true //是否存活，默认存活
    }
    //kill：生命值为零时清楚砖块
    blocksObj.kill = function(){
        this.life --
        if(this.life < 1){
            this.alive = false
        }
    }
    //检测小球与砖块的碰撞，碰撞之后kill
    blocksObj.crash = function(ball) {
        if (ball.y > blocksObj.y && ball.y < blocksObj.y + blocksObj.height) {
        if (ball.x > blocksObj.x && ball.x < blocksObj.x + blocksObj.width) {
            console.log("相撞")
            this.kill()
            // ball.speedY *= -1
            // ball.rev()
            return true
            }
        }

    }
    return blocksObj
}