$(function(){
    $("html, body").animate({ "scrollTop": 0 }, "slow");

    var flag_T = true;
    $("body>nav").click(function(){
        if(flag_T){
            $(this).css({"overflow":"visible","box-shadow":"none","top":"35%"});
            flag_T = !flag_T;
        }else{
            $(this).css({"overflow":"hidden","box-shadow":"1rem 1rem 1rem rgba(18, 18, 18, .5)","top":"90%"});
            flag_T = !flag_T;
        }
    });//서브메뉴 클릭시 이벤트

    var flag_v = true;
    $(".mainVideo").click(function(){
        if(flag_v){
            $(this).children("video").get(0).pause();
            flag_v =!flag_v;
        }else{
            $(this).children("video").get(0).play();
            flag_v =!flag_v;
        }
    });//비디오 재생 클릭

    $(".masterOrigin").mouseenter(function(){
        $(this).css("animation-play-state","running");
    }).mouseleave(function(){
        $(this).css("animation-play-state","paused");
    });//마스터오리진 배경 흐름

    $(window).on("scroll",function(){
        var sct = $(window).scrollTop();

        if(sct>=120){
            $(".masterOrigin").children("div").css("opacity",1);
        }
        if(sct>=320){
            $(".original").css("opacity",1);
        }
        if(sct>=3000){
            $(".vertuo").css("opacity",1);
        }

    });//스크롤 반응
});