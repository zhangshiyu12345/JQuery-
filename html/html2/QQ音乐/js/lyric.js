(function(window){
     function Lyric(path){
         return new Lyric.prototype.init(path);
     }

     Lyric.prototype={
         constructor:Lyric,
         init:function(path){
            this.path=path;
         },
         times:[],//保存时间
         lyrics:[],//保存歌词
         index:-1,
         loadLyric:function(callBack){
            var $this=this;
            $.ajax({
                url:$this.path,//从什么地方加载文件
                dataType:"text",
                success:function(data){
                    //console.log(data)
                    $this.parseLyric(data);
                    callBack();
                },
                error:function(data){
                    console.log(data);
                }
   
            });
         },
         parseLyric:function(data){
             var $this=this;
             $this.times=[];//清空上一首歌的信息(歌词和时间)
             $this.lyrics=[];
             var array=data.split('\n');
             //console.log(array);
             //便利取出每一条歌词
             $.each(array, function(index,ele){
                 //console.log(ele);
                 //利用正则表达式
                 //[00:00:92]
                 var timeReg = /\[(\d*:\d*\.\d*)\]/
                 $.each(array,function(index,ele){
                     //处理歌词
                      var lrc=ele.split("]")[1];
                      if(lrc == "") return true;
                      $this.lyrics.push(lrc);
                     var res=timeReg.exec(ele);
                     //console.log(res);
                     if(res == null)
                     {
                         return true;
                     }
                     var timeStr = res[1];//00:00:92
                     var res2=timeStr.split(':');
                     var min=parseInt(res2[0])*60;
                     var sec=parseFloat(res2[1]);
                     var time=parseFloat(Number(min+sec).toFixed(2));//保留两位小数
                     $this.times.push(time);

                    
                    
                 });
                 //console.log($this.times);
                 //console.log($this.lyrics);
             });
         },
         currentIndex:function(currentTime){
                   // console.log(currentTime);
                if(currentTime>=this.times[0])
                {
                    this.index++;
                    this.times.shift();//删除数组最前前面的元素
                }
                return this.index;
         },
     }
     Lyric.prototype.init.prototype=Lyric.prototype;
     window.Lyric=Lyric;
})(window);