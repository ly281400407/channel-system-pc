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
$(".regis").click(function(){
    location.href="register.html"
});

