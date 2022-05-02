(function(window,undefined){
    var jQuery=function(){
        return new jQuery.prototype.init();
    };
    jQuery.prototype={
        constructor:jQuery
    }
    jQuery.prototype.init.prototype=jQuery.prototype;
    window.jQuery=window.$=jQuery;
})(window);