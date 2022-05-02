$(function(){
    var $li = $("#skin li");
    // alert("1");
    $li.click(function(){
        // alert("1");
        switchSkin(this.id);
    });

    var cookie_skin=$.cookie("MyCssSkin");
    if(cookie_skin){
        switchSkin(cookie_skin);
    }
});
function switchSkin(skinName){
    // alert(skinName);
    $("#"+skinName).addClass("selected").siblings().removeClass("selected");/*单选框样式切换*/
    $("#cssfile").attr("href","./styles/skin/"+skinName+".css");//设置不同的皮肤
    $.cookie("MyCssSkin",skinName,{path:"/",expires:10});/*记录到cookie中*/
}