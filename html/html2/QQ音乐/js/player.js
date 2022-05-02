(function(window){
    function Player($audio){
       return new Player.prototype.init($audio);//进行强制初始化
    }
    //自定义原型对象,改为了{}
    Player.prototype={
        constructor:Player,
        musicList:[],
        //初始化函数
        init:function($audio){
            this.$audio=$audio;
            this.audio=$audio.get(0);//jquery对象转换为dow对象
        },
        currentIndex:-1,//记录当前播放的是哪一首
        //编写播放音乐的函数
        playMusic:function(index,music){
          //判断是否是同一首音乐
          if(this.currentIndex == index){
                //同一首音乐
                if(this.audio.paused)
                {
                    this.audio.play();
                }else{
                    this.audio.pause();
                }
          }else{
              //不是同一首
              this.$audio.attr("src",music.link_url);
              this.audio.play();
              this.currentIndex=index;
          }
        },
        preIndex:function(){
            var index=this.currentIndex-1;
            if(index<0)
            {
                index=this.musicList.length-1;
            }
            return index;
        },
        nextIndex: function () {
            var index = this.currentIndex + 1;
            if(index > this.musicList.length - 1){
                index = 0;
            }
            return index;
        },
        changeMusic:function(index){
            //删除对应的数据
            this.musicList.splice(index,1);
            if(index<this.currentIndex){
                this.currentIndex=this.currentIndex-1;
            }
        },
        getMusicDuration:function(){
            return this.audio.duration;
        },
        getMusicCurrentTime:function(){
            return this.audio.currentTime;
        },
        musicTimeUpdate:function(callBack){
           var $this=this;
           //监听播放进度
           this.$audio.on("timeupdate",function(){
           //要拿给外面的函数用
           var duration = $this.audio.duration;
           var currentTime = $this.audio.currentTime;
           var timeStr =$this.formatData(currentTime,duration);//格式化时间
           callBack(currentTime,duration,timeStr);//这样就可以传递给外面的函数
           });
        },
        formatData:function(currentTime,duration){
            var endMin = parseInt(duration/60);//分钟
        var endSec = parseInt(duration%60);
        if(endMin<10){
            endMin="0"+endMin;
        }
        if(endSec<10)
        {
            endSec="0"+endSec;
        }



        var startMin = parseInt(currentTime/60);//分钟
        var startSec = parseInt(currentTime%60);
        if(startMin<10){
            startMin="0"+startMin;
        }
        if(startSec<10)
        {
            startSec="0"+startSec;
        }

        return startMin+":"+startSec+" / "+endMin+":"+endSec;
        },
        musicSeekTo:function(value){
           if(isNaN(value)) return;
           this.audio.currentTime=this.audio.duration*value;
        },
        musicVoiceSeekTo:function(value){
            if(isNaN(value)) return;
            if(value <0 || value<=1) return ;
            //0-1
            this.audio.volume=value;
            
        }
    }
    Player.prototype.init.prototype=Player.prototype;//让init的原型对象指向Player对象的原型对象
    
    window.Player=Player;
})(window);
//背包
//将内部的数据与外部数据隔绝
//window 为了将有些内部的数据作为全局变量暴露给外部
