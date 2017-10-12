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
// $("#register").click(function(){
//     $(".regt").addClass("hidden");
//     $(".complate").removeClass("hidden");
// });
// $(".regis").click(function(){
//     location.href="register.html"
 
// });
//获取验证码
$(".getbtn").click(function () {
    //首先判断是否输入了手机号，如果未输入，则禁用按钮，不倒计时
    var phonenumber = $("#phonenumber").val();
    var reg = /^1[3|4|5|7|8][0-9]{9}$/;
    if (!reg.test($("#phonenumber").val())) {
        document.getElementById("getVerifyCode").disabled = true;
        return false;
    }
    if (phonenumber == "" || phonenumber == null) {
        document.getElementById("getVerifyCode").disabled = true;
        return false;
    }
    $(this).addClass("active");
    var html = $(this).html();
    if (html == "获取" || html == "重新发送") {
        var sum = 59;
        var timer = setInterval(function () {
            $(this).removeAttr("style");
            $(this).html(sum + "'");
            if (sum === 0) {
                clearInterval(timer);
                $(this).html("重新发送").css("fontSize", "16px");
            } else {
                sum--
            }
            ;
        }.bind(this), 1000);
    }
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

//var baseUrl="http://139.199.62.80:8181/channel-system";
var baseUrl="http://localhost:8081/";
//开始使用
// $("#startUse,#land").click(function(){
//     location.href="../../main.html"
// });
