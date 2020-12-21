$(function(){
    //main 스크롤 반응

    $(window).on("scroll",function(){
        //$("html, body").animate({"scrollTop":0},1);
        var sct = $(window).scrollTop();
        //$(".none").text(sct);

        if(sct>=70){
            $(".scroll1").fadeIn(1000);
            $(".line").fadeIn(1000);
        }
        if(sct>=380){
            $(".scroll2").fadeIn(1000);
        }
        if(sct>=650){
            $(".scroll3").fadeIn(1000);
        }
        if(sct>=1070){
            $(".scroll4").fadeIn(1000);
        }
        if(sct>=1600){
            $(".scroll5").fadeIn(1000);
        }
        if(sct>=1760){
            $(".scroll6").fadeIn(1000);
        }
        if(sct>=1900){
            $(".scroll7").fadeIn(1000);
        }
        if(sct>=1920){
            $(".scroll8").fadeIn(1000);
        }
        if(sct>=2200){
            $(".scroll9").fadeIn(1000);
        }
        if(sct>=2210){
            $(".scroll9").children("p").fadeIn(1000);
        }
        if(sct>=2300){
            $(".scroll9").children("ul").children("li").eq(0).fadeIn(1000);
        }
        if(sct>=2400){
            $(".scroll9").children("ul").children("li").eq(1).fadeIn(1000);
        }
        if(sct>=2450){
            $(".scroll9").children("ul").children("li").eq(2).fadeIn(1000);
        }
    });

    // $(".point").children("li").mouseenter(function(){
    //     $(this).addClass("on");
    // }).mouseleave(function(){
    //     $(this).removeClass("on");
    // });

});//제이쿼리 레디 끝