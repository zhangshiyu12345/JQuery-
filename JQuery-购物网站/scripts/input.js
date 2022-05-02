$(function(){
    //搜索框
    $("#inputSearch").focus(function(){
        $(this).addClass("focus");
        if($(this).val() == this.defaultValue){
            //$(this)就是#inputSearch
            $(this).val("");
        }
    }).blur(function(){
        $(this).removeClass("focus");
        if($(this).val() == ""){
            $(this).val(this.defaultValue);
        }
    }).keyup(function(e){ //e事件对象的属性
        if(e.which == 13){
           alert("回车提交表单");
        }
    });//链式结构
    
});