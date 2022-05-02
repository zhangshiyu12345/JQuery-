$(function(){
    $(".color_change ul li img").click(function(){
        $(this).addClass("hover").parent().siblings().find("img").removeClass("hover");
        var imgSrc=$(this).attr("src");
        // alert(imgSrc);
        var i=imgSrc.lastIndexOf(".");
        var unit=imgSrc.substring(i);
        imgSrc=imgSrc.substring(0,i);
        var imgSrc_big=imgSrc+"_one_big"+unit;  //图片的命名要规范
        var imgSrc_small=imgSrc+"_one_small"+unit;
        // alert(imgSrc_big);
        // alert(imgSrc_small);
        $("#bigImg").attr({"src":imgSrc_small});
        $("#thickImg").attr("href",imgSrc_big);

        var alt=$(this).attr("alt");
        $(".color_change strong").text(alt);    //各种路径或者样式的切换
        var newImgSrc=imgSrc.replace("images/pro_img/","");
        $("#jnProitem .imgList li").hide();
        $("#jnProitem .imgList").find(".imgList_"+newImgSrc).show();
    });
});