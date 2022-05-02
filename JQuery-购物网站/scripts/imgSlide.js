$(function(){
    $("#jnBrandTab li a").click(function(){
        $(this).parent().addClass("chos")
               .siblings().removeClass("chos");
        var idx=$("#jnBrandTab li a").index(this);
        ShowBrandList(idx);
        return false;   //取消默认行为
    }).eq(0).click();    //与切换背景颜色的写法是一样的
});

function ShowBrandList(index){
    var $rollboj=$('#jnBrandList');
    var rollWidth=$rollboj.find("li").outerWidth();
    rollWidth=rollWidth*4; //一个版面的宽度
    $rollboj.stop(true,false).animate({left:-rollWidth*index},1000);
}