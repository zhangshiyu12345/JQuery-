$(function(){
    var index=0;
    // alert("1");  //多用函数封装功能
    var len = $("#jnImageroll div a").length;
    $("#jnImageroll div a").mouseover(function(){
        index=$("#jnImageroll div a").index(this);
        showImg(index);
    }).eq(0).mouseover();//初始化

    var adTimer=null;
    $('#jnImageroll').hover(function(){
        if(adTimer){
            clearInterval(adTimer);
        }
    },function(){
        adTimer=setInterval(function(){
            showImg(index);
            index++;
            if(index == len){
                index=0;
            }
        }, 5000);
    }).trigger("mouseleave");
});
function showImg(index){
    var $rollobj=$("#jnImageroll");
    var $rolllist=$rollobj.find("div a");
    var newhref=$rolllist.eq(index).attr("href");
    $("#JS_imgWrap").attr("href",newhref)
                    .find("img").eq(index).stop(true,true).fadeIn()//stop(true,true):停止当前的动画(即第一个动画队列)，并移除其余的动画队列
                    .siblings().fadeOut();//通过改变透明度来切换图片，不用向以前那样通过改变位置来切换图片
    $rolllist.removeClass("chos").css("opacity","0.7")
             .eq(index).addClass("chos").css("opacity","1");
}