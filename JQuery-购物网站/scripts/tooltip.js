$(function(){
    var x=10;
    var y=20;
    $("a.tooltip").mouseover(function(e){  //鼠标移入
        this.myTitle=this.title;
        this.title='';
        var tooltip="<div id=\"tooltip\">"+this.myTitle+"</div>";
        $("body").append(tooltip);
        $("#tooltip").css({    
            "top":(e.pageY+y)+"px",
            "left":(e.pageX+x)+"px"   //设置显示位置，并显示出来
        }).show("fast");
    }).mousemove(function(e){  //鼠标移动
        $("#tooltip").css({
            "top":(e.pageY+y)+"px",
            "left":(e.pageX+x)+"px"
        });
    }).mouseout(function(){    //鼠标移除
        this.title=this.myTitle;
        $("#tooltip").remove();  //移除
    });
});