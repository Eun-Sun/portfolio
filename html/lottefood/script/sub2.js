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
        if(sct>=1000){
            $(".scroll2").fadeIn(1000);
        }
        if(sct>=2000){
            $(".scroll3").fadeIn(1000);
        }
    });


});//제이쿼리 레디 끝