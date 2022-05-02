(function(window,undefined){
    var njQuery=function(selector){
        return new njQuery.prototype.init(selector);
    }
    njQuery.prototype={
        //jQuery原型上的属性
        constructor:njQuery,
        init:function(selector){
            //利用四条规律
            //1
            selector=njQuery.trim(selector);//去掉字符串两端的空格
            if(!selector){
                return this;//空的jQuery对象
            }
            else if(njQuery.isFunction(selector)){
                //函数
                // console.log("函数");
                njQuery.ready(selector);
            }
            else if(njQuery.isString(selector)){
                //判断是否是代码片段 <a>
                //console.log("字符串");
                if(njQuery.isHTML(selector)){
                       console.log("代码片段");
                       //根据代码片段创建所有的元素
                       var temp=document.createElement("div");
                       temp.innerHTML=selector;
                       //console.log(temp);
                       //将创建好的一级元素添加到jQuery当中
                    //    for(var i=0;i<temp.children.length;i++)
                    //    {
                            // this[i]=temp.children[i];
                    //    }
                       //给我们的jQuery对象添加Length属性
                    //    this.length=temp.children.length
                    [].push.apply(this,temp.children);
                       //返回加工好的this(jQuery)
                    return this;
                       
                }
                //判断是否是选择器
                else{
                   // 1.根据传入的选择器找到对应的元素
                   //alert("1");
                   var res = document.querySelectorAll(selector);
                   // 2.将找到的元素添加到njQuery上
                   [].push.apply(this, res);
                   // 3.返回加工上的this
                   return this;
                }
            }
            //数组
            else if(njQuery.isArray(selector)){
                //1真数组
                //alert("1");
                // console.log("是数组");
                if(({}).toString.apply(selector) == "[object Array]"){
                    //console.log("真数组");
                    [].push.apply(this,selector); //真数组转伪数组
                    return this;
                }else{
                    ////console.log("伪数组");
                    var arr=[].slice.call(selector);//将自定义的伪数组转为真数组
                    [].push.apply(this,arr); //真数组转伪数组
                    return this;
                }
                //2伪数组
            }else{
                //alert("1");
                //除上述类型以外
                this[0]=selector;
                this.length=1;
                return this;
            }
        },
        jquery:"1.1.0", //获取jQuery的版本号
        selector:"",
        length:0,
        //[].push找到数组的push方法
        //冒号前面的push由jQuery调用
        //相当于[].push.apply(this)
        push:[].push,
        sort:[].sort,
        splice:[].splice,
        //jQuery原型对象上的核心方法
        toArray:function(){
            return [].splice.call(this);
        },
        get:function(num){
            //没有传参
            //传递的实参在argunments类数组对象中保存
            if(arguments.length == 0)
            {
                return this.toArray();
            }
            else if(num>=0)
            {
                return this[num];
            }
            else{
                return this[this.length+num];
            }
        },
        eq:function(num){
            //没有传递参数
            if(arguments.length == 0){
                return new njQuery();
            }else{
                return njQuery(this.get(num));
            }
        },
        first:function(){
            return this.eq(0);
        },
        last:function(){
            return this.eq(-1);
        },
        each:function(fn){
           njQuery.each(this,fn);
        }

    };
    njQuery.extend=njQuery.prototype.extend=function(obj){
        for(var key in obj){
            this[key]=obj[key];
        }
    }
    //改为key-value格式
    //工具方法
    njQuery.extend({
     isString:function(str){
            return typeof str == "string";
        },
        isHTML:function(str){
            return str.charAt(0) == "<" &&str.charAt(str.length-1) == '>'&&str.length >=3;
        },
        trim:function(str){
            //看他支不支持trim这个方法
            if(!njQuery.isString(str)){
                return str;
            }
            if(str.trim){
                return str.trim();
            }else{
                return str.replace(/^\s+|\s+$/g,"");//\s:查找空白字符 |:或 g:全局匹配
            }
        },
        isObject : function(sele){
            return typeof sele == "object";
        },
        isWindow:function(sele){
            return sele == window;
        },
        isArray:function(sele){
            if(njQuery.isObject(sele)&&!njQuery.isWindow(sele)&&"length" in sele)
            {
                return true;
            }
        },
        isFunction:function(sele){
            return typeof sele == "function";
        },
        ready:function(fn){
            //判断DOM是否加载完毕
            if(document.readyState == "complete"){
                fn();
            }else if(document.addEventListener){
                document.addEventListener("DOMContentLoaded",function(){
                    fn();
                });
            }else{
                //专门用于监听document.readyState
                document.attachEvent("onreadystatechange",function(){
                    if(document.readyState == "complete"){
                        fn();
                    }
                })
            }
            
        },
        each:function(obj,fn){
             //判断是否是数组
             if(njQuery.isArray(obj)){
                 for(var i=0;i<obj.length;i++)
                 {
                     //var res=fn(i,obj[i]);
                     var res=fn.call(obj[i],i,obj[i]); //修改函数内部的this
                     if(res == true) continue;
                     else if(res == false){
                         break;
                     } 
                 }
             }
             //是否是对象
             else if(njQuery.isObject(obj))
             {
                 for(var key in obj){
                    //var res=fn(key,obj);
                    var res=fn.call(obj[key],key,obj[key]);
                 }
             }
             return obj;
        },
        map:function(obj,fn){
            var res=[];
            if(njQuery.isArray(obj)){
                for(var i=0;i<obg.length;i++){
                    var temp = fn(obj[i],i);
                    if(temp){
                        res.push(temp);
                    }
                    //有值才添加
                }
            }else if(njQuery.isObject(obj)){
                for(var key in obj){
                   var temp = fn(obj[key],key);
                   if(temp){
                        res.push(temp);
                   }
                  
                }
            }
            return res;
        },
    }),
    njQuery.prototype.init.prototype=njQuery.prototype;
    window.njQuery=window.$ =njQuery;
})(window);