(function(window){
   function Progress($progressBar,$progressLine,$progressDot){
       return new Progress.prototype.init($progressBar,$progressLine,$progressDot);
   }
   Progress.prototype={
       constructor:Progress,
       init:function($progressBar,$progressLine,$progressDot){
           this.$progressBar=$progressBar;
           this.$progressLine=$progressLine;
           this.$progressDot=$progressDot;
       },
       isMove:false,
       progressClick:function(callBack){
        var $this=this;
        //监听背景的点击
        this.$progressBar.click(function(event){
             //获取背景距离窗口默认的位置
             //alert("1");
             //监听鼠标的移动事件 
            var normalLeft=$(this).offset().left;
                 
            //console.log(normalLeft);
            //获取点击的位置距离窗口默认的位置
            var eventLeft=event.pageX;
            //设置前景的宽度
            //$this 为了获取init函数的值
            //alert(eventLeft);
            $this.$progressLine.css("width",eventLeft-normalLeft);
            $this.$progressDot.css("left",eventLeft-normalLeft);  
            //计算进度条的比例
            var value=(eventLeft-normalLeft) / $(this).width();//善用this
            callBack(value);
        });
     },
     progressMove:function(callBack){
           var $this=this;
          //监听鼠标的按下事件 
           var normalLeft=this.$progressBar.offset().left;
           var barWidth = this.$progressBar.width();
           var eventLeft;
           this.$progressBar.mousedown(function(){ 
              $this.isMove=true;
              $(document).mousemove(function(event){
                   //监听鼠标的移动事件
                  
                 
            //console.log(normalLeft);
            //获取点击的位置距离窗口默认的位置
            eventLeft=event.pageX;
            //设置前景的宽度
            //$this 为了获取init函数的值
            //alert(eventLeft);
            var offset=eventLeft-normalLeft;
            if(offset>=0 && offset<=barWidth){
                //设置宽度
                $this.$progressLine.css("width",eventLeft-normalLeft);
                $this.$progressDot.css("left",eventLeft-normalLeft); 
            }
           
              
          });
        
         //监听鼠标的抬起事件
         $(document).mouseup(function(){
               $(document).off("mousemove");
               this.isMove=false;
               //计算进度条的比例
               var value=(eventLeft-normalLeft) / $this.$progressBar.width();//善用this
               callBack(value);
              });
         });
     },
     setProgress:function(value){
           if(this.isMove) return;
           if(value<0||value>100) return;
           this.$progressLine.css({
               width:value+'%',
           });
           this.$progressDot.css({
               left:value+'%',
           });
     },
    }
   Progress.prototype.init.prototype=Progress.prototype;
   window.Progress=Progress;
})(window);