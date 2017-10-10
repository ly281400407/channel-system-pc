$("#acc").click(function () {
    $(".right").addClass("hidden")
    $(".account").removeClass("hidden")
});
$("#qr_code").click(function () {
    $(".account").addClass("hidden")
    $(".right").removeClass("hidden")
});
var start = 1;
$(".radius").click(function () {
    if (start == 1) {
        $(".radius").addClass("active")
        start = 2;
    } else {
        $(".radius").removeClass("active")
        start = 1;
    }
});
$("#register").click(function(){
    $(".regt").addClass("hidden");
    $(".complate").removeClass("hidden");
});
// $(".regis").click(function(){
//     location.href="register.html"
 
// });
$(".getbtn").click(function(){
    $(this).addClass("active");
    var sum=59;
    var timer=setInterval(function(){
        $(this).html(sum+"'");
        sum===0?clearInterval(timer):sum--;
    }.bind(this),1000);
});


//完善店铺信息页面地址和行业选择事件
$(".adr").click(function(){
    $(".address").removeClass("hidden");
    $(this).val("");
});
$(".industry").click(
    function(){
        $(".indu").removeClass("hidden");
    }
);
$(".indu").on("click","li",function(){
   $(".industry").val($(this).html());
    $(".indu").addClass("hidden");
});
$(".address").on("click","li",function(){
    var adr=$(".adr");
    adr.val(adr.val()+$(this).html());
    $(this).parent().hasClass("area")&&$(".address").addClass("hidden");
});


//开始使用
$("#startUse,#land").click(function(){
    location.href="../../main.html"
});
