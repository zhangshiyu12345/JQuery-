$(function(){
    //监听游戏柜子的点击
    $(".rules").click(function(){
        $(".rule").stop().fadeIn(100);
    });

    $(".close").click(function(){
        $(".rule").stop().fadeOut(100);
    });

    $(".start").click(function(){
        $(this).stop().fadeOut(100);
        //处理进度条的方法
        progressHandle();
        //处理灰太狼动画的方法
        wolfAinmation();

    });

    //监听从新开始点击
    $('.reStart').click(function(){
        $(".mask").stop().fadeOut(100);
        progressHandle();
        wolfAinmation();
    });

    function progressHandle(){
        $('.progress').css({width:180});
        //开启定时器
        var timer=setInterval(function(){
            //拿到进度条当前的宽度
            var progressWidth=$('.progress').width();
            progressWidth -=10;
            $('.progress').css({width:progressWidth});
            //监听进度条是否走完
            if(progressWidth<=0)
            {
                //已经走完了
                clearInterval(timer);
                $('.mask').stop().fadeIn(100);
                //停止灰太狼的动画
                stopWolfAnimation();
            }
        },1000);
    }
    var wolfTimer;
    function wolfAinmation(){
        var wolf_1=['./image/h0.png','./image/h1.png','./image/h2.png','./image/h3.png','./image/h4.png','./image/h5.png','./image/h6.png','./image/h7.png','./image/h8.png','./image/h9.png'];
        var wolf_2=['./image/x0.png','./image/x1.png','./image/x2.png','./image/x3.png','./image/x4.png','./image/x5.png','./image/x6.png','./image/x7.png','./image/x8.png','./image/x9.png'];
        // 2.定义一个数组保存所有可能出现的位置
        var arrPos = [
            {left:"100px",top:"115px"},
            {left:"20px",top:"160px"},
            {left:"190px",top:"142px"},
            {left:"105px",top:"193px"},
            {left:"19px",top:"221px"},
            {left:"202px",top:"212px"},
            {left:"120px",top:"275px"},
            {left:"30px",top:"295px"},
            {left:"209px",top:"297px"}]
        //创建一个图片
        var $wolfImage=$("<img src='' class='wolfImage'>");
        //随机获取图片的位置
        var posIndex=Math.round(Math.random()*8);

        //设置图片显示的位置
        $wolfImage.css({
            position:"absolute",
            left:arrPos[posIndex].left,
            top:arrPos[posIndex].top,

        });
        //随机获取数组类型
        var wolfType=Math.round(Math.random())==0?wolf_1:wolf_2;

        //设置图片的内容
        window.wolfIndex=0;
        window.wolfIndexEnd=5;
        wolfTimer=setInterval(function(){
            if(wolfIndex>wolfIndexEnd)
            {
                $wolfImage.remove();
                clearInterval(wolfTimer);
                wolfAinmation();
            }
            $wolfImage.attr("src",wolfType[wolfIndex]);
            wolfIndex++;
        },300);
        $('.container').append($wolfImage);
        //调用处理游戏规则的方法
        gameRules($wolfImage);

    }

    function stopWolfAnimation(){
         $('.wolfImage').remove();
         clearInterval(wolfTimer);
    }

    function gameRules($wolfImage){
        $wolfImage.one("click",function(){
            window.wolfIndex=5;
            window.wolfIndexEnd=9;
            var $src=$(this).attr('src');
            //根据图片的地址判断是否是我们的灰太狼
            var flag=$src.indexOf("h")>=0;
            if(flag){
                $('.score').text(parseInt($('.score').text())+10);
            }
            else{
                $('.score').text(parseInt($('.score').text())-10);
            }

        });
    }

});