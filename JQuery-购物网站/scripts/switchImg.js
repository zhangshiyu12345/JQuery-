$(function(){
    $("#jnProitem ul.imgList li a").bind("click",function(){
        // alert("1");
        var imgSrc=$(this).find("img").attr("src");
        var i=imgSrc.lastIndexOf(".");
        var unit=imgSrc.substring(i);
        // alert(unit);
        imgSrc=imgSrc.substring(0,i);
        // alert(imgSrc);
        var imgSrc_big=imgSrc+"_big"+unit;
        $("#thickImg").attr("href",imgSrc_big);
        var imgSrc_change=imgSrc+"_small"+unit;
        // alert(imgSrc_change);
        $("#bigImg").attr("src",imgSrc_change);
    });
});