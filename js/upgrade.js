var data = 0;

var timer=setInterval(function () {
    if(data<100){
        data++
        var prog=$(".progrs");
        var percge=$(".percentage");
        var li=$('.pro');
        var margin=data*3.6;
        li.css("marginLeft",margin-16);
        percge.html(data+"%");
        prog.css("width",data+"%")
    }else{
        clearInterval(timer);
    }
}, 100);


