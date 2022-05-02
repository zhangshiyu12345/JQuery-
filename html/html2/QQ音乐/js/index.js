$(function(){
    //自定义滚动条
     $(".content_list").mCustomScrollbar();
     //1.加载歌曲列表
     getPlayList();
     var $audio=$("audio");
     var player=new Player($audio);
     var progress;
     var voiceProgress;
     var lyric;
   
    function getPlayList(){
         $.ajax({
             url:"./source/musiclist.json",//从什么地方加载文件
             dataType:"json",
             success:function(data){
                 player.$musicList=data;
                //console.log(data);
                //便利获取到的数据，创建每一条音乐 
                var $musicList=$(".content_list ul");//放在循环外边只会查找一次
                $.each(data,function(index,music){
                      var $item=createMusicItem(index,music);
                      //动态创建的事件元素的事件只可以通过事件委托来绑定事件
                      $musicList.append($item);
                });
                initMusicInfo(data[0]);
                initMusicLyric(data[0]);

             },
             error:function(data){
                 console.log(data);
             }

         });
    }
     // 初始化歌曲信息
     function initMusicInfo(music){
        // 获取对应的元素
        var $musicImage = $(".song_info_pic img");
        var $musicName = $(".song_info_name a");
        var $musicSinger = $(".song_info_singer a");
        var $musicAblum = $(".song_info_ablum a");
        var $musicProgressName = $(".music_progress_name");
        var $musicProgressTime = $(".music_progress_time");
        var $musicBg = $(".mask_bg");

        // 给获取到的元素赋值
        $musicImage.attr("src", music.cover);
        $musicName.text(music.name);
        $musicSinger.text(music.singer);
        $musicAblum.text(music.album);
        $musicProgressName.text(music.name +" / "+ music.singer);
        $musicProgressTime.text("00:00 / "+ music.time);
        $musicBg.css("background", "url('"+music.cover+"')");
    }
    //初始化歌曲信息
     function initMusicLyric(music){
        lyric=new Lyric(music.link_lrc);
        var $lryicContainer=$(".song_lyric");
        //清空上一首音乐的歌词
        $lryicContainer.html("");
        lyric.loadLyric(function(){
            //创建歌词列表
            $.each(lyric.lyrics,function(index,ele){
                 var $item = $('<li>'+ele+'</li>');
                 $lryicContainer.append($item);
            });
        });
        
     }
    initProgress();
    //3.初始化进度条
    function initProgress(){
        var $progressBar=$(".music_progress_bar");//music_progress_bar
     var $progressLine=$(".music_progress_line");
     var $progressDot=$(".music_progress_dot");
     progress=Progress($progressBar,$progressLine,$progressDot);
     progress.progressClick(function(value){
           player.musicSeekTo(value);//这里我们只需要调用函数就行
     });
     progress.progressMove(function(value){
           player.musicSeekTo(value);
     });
   

     var $voiceBar=$(".music_voice_bar");//music_progress_bar
     var $voiceLine=$(".music_voice_line");
     var $voiceDot=$(".music_voice_dot");
     voiceProgress=Progress($voiceBar,$voiceLine,$voiceDot);
     voiceProgress.progressClick(function(value){
        //这里我们只需要调用函数就行
        player.musicVoiceSeekTo(value);
     });
     voiceProgress.progressMove(function(value){
        player.musicVoiceSeekTo(value);
     });


    }
    //初始化事件的监听
    initEvent();
    function initEvent(){
         //js中最好不要出现css代码，否则会难以维护
   
    $(".content_list").delegate(".list_music","mouseenter",function(){
        //显示子菜单
         //alert("1");
         $(this).find(".list_menu").stop().fadeIn(100);
         $(this).find(".list_time a").stop().fadeIn(100);
         //隐藏时长
         $(this).find('.list_time span').stop().fadeOut(100);
    });
    $(".content_list").delegate(".list_music","mouseleave",function(){
        //隐藏子菜单
        //显示时长
        $(this).find(".list_menu").stop().fadeOut(100);
        $(this).find(".list_time a").stop().fadeOut(100);
        $(this).find(".list_time span").stop().fadeIn(100);
    });
    //监听歌曲的移入移出事件
    //监听复选框的点击事件
    $('.content_list').delegate('.list_check',"click",function(){
        $(this).toggleClass("list_checked");
    });
    var $musicPlay=$(".music_play");
    //添加子菜单播放按钮的监听
    $('.content_list').delegate(".list_menu_play","click",function(){
        var $item=$(this).parents(".list_music");
        $(this).toggleClass('list_menu_play2');
        //复原其他播放图标
        $item.siblings().find('.list_menu_play').removeClass("list_menu_play2");
        //判断当前是播放还是暂停
        if($(this).attr("class").indexOf("list_menu_play2") != -1){
            //当前是播放的状态
             $musicPlay.addClass("music_play2");
             //让文字高亮
            $item.find("div").css("color","#fff"); 
            $item.siblings().find('div').css("color","rgba(255,255,255,0.5)");
        }else{
            //不是播放状态
             $musicPlay.removeClass("music_play2");
             //让文字不高亮
             $item.find("div").css("color","rgba(255,255,255,0.5)");

        }
        //注意排他
        $item.find(".list_number").toggleClass("list_number2");
        $item.siblings().find(".list_number").removeClass('list_number2');
       
        //播放音乐
        player.playMusic($item.get(0).index,$item.get(0).music);
        //切换歌曲信息
        initMusicInfo($item.get(0).music);
        //切换歌词信息
        initMusicLyric($item.get(0).music);
    });
    //监听底部控制区域播放按钮的点击
    $musicPlay.click(function(){
        //判断有没有播放过音乐,没有默认从第一首音乐开始播放
        if(player.currentIndex == -1)
        {
            //没有播放过音乐
            $(".list_music").eq(0).find(".list_menu_play").trigger("click");
        }else{
            //已经播放过音乐
            $(".list_music").eq(player.currentIndex).find(".list_menu_play").trigger("click");
        }
    });
    //监听底部控制区域播放上一个按钮的点击
    $(".music_pre").click(function(){
        $(".list_music").eq(player.preIndex()).find(".list_menu_play").trigger("click");
    });
    //监听底部控制区域播放下一个按钮的点击
    $(".music_next").click(function(){
        $(".list_music").eq(player.nextIndex()).find(".list_menu_play").trigger("click");
    });
    //监听删除按钮点击
    $(".content_list").delegate(".list_menu_del","click",function(){
        //找到被点击的音乐
        var $item=$(this).parents(".list_music");
        //判断当前播放的音乐是不是正在播放的音乐，如果是则自动跳到下一首
        if($item.get(0).index == player.currentIndex){
              $('.music_next').trigger("click");
        }

        $item.remove();
        player.changeMusic($item.get(0).index);

        //重新排序
        $(".list_music").each(function(index,ele){
            ele.index=index;
            $(ele).find(".list_number").text(index+1);
        });
    });
       
      //监听播放的进度
      player.musicTimeUpdate(function(currentTime,duration,timeStr){
            //同步时间
            $('.music_progress_time').text(timeStr);
            //同步进度条
            //计算播放的比例
            var value=currentTime/duration * 100;
            progress.setProgress(value);
            //实现歌词的同步
            var index = lyric.currentIndex(currentTime);
            var $item =  $('.song_lyric li').eq(index);
            $item.addClass("cur");
            $item.siblings().removeClass("cur");
            if(index<=2) return;
            $('.song_lyric').css({
                marginTop:((-index+2)*30),
            })
      });

      //监听声音按钮的点击
      //切换图标一般都是切换类
      $(".music_voice_icon").click(function(){
          //图标的切换
          $(this).toggleClass("music_voice_icon2");
          //声音的切换
          //indexOf用来查找
          if($(this).attr("class").indexOf("music_voice_icon2") != -1){
            //变为没有我们的声音
            player.musicVoiceSeekTo(0);
          }else{
            //改变声音
            player.musicVoiceSeekTo(1);
          }
      });

    }
   
    //定义一个方法创建一个音乐
    function createMusicItem(index,music){
        var $item=$(" <li class=\"list_music\"><div class=\"list_check\"><i></i></div>"+"<div class=\"list_number\">"+(index+1)+"</div>"+"<div class=\"list_name\">"+music.name+
            "<div class=\"list_menu\">"+
                "<a href=\"javascript:;\" title=\"播放\" class=\"list_menu_play\"></a>"+
                "<a href=\"javascript:;\" title=\"添加\"></a>"+
                "<a href=\"javascript:;\" title=\"下载\"></a>"+
                "<a href=\"javascript:;\" title=\"分享\"></a>"+
            "</div>"+
        "</div>"+
        "<div class=\"list_singer\">"+music.singer+"</div>"+
        "<div class=\"list_time\">"+
            "<span>"+music.time+"</span>"+
            "<a href=\"javascript:;\" title=\"删除\" class=\"list_menu_del\"></a>"+
        "</div>"+
    "</li>");
     $item.get(0).index=index;
     $item.get(0).music=music;
     //将相关信息保存到li中
    return $item;
    }

    //定义一个格式化时间的方法
    function formatData(currentTime,duration){
       
    }
});