$(function(){

    var flag_img = true;

    $("header>div>nav").mouseenter(function(){
        $("header").css("border","none");
        $("header>div").css("background-color","rgba(18,18,18,.9)");
        $("nav>ul>li>ul").css("display","block");

    }).mouseleave(function(){
        $("header").css("border-bottom",".1rem solid rgba(255, 255, 255, .2)");
        $("header>div").css("background-color","transparent");
        $("nav>ul>li>ul").css("display","none");
    });//네브 여닫기 end

    $(".imgS").click(function(e){
        e.preventDefault();
        if(flag_img){
            $(this).prev().css("opacity",1);
            flag_img =!flag_img;
        }else{
            $(this).prev().css("opacity",0);
            flag_img =!flag_img;
        }
    });//검색 온오프

    var sideT = $("body>nav");
    $(window).scroll(function(){
        if($(window).scrollTop()>1){
            $("header").addClass("sticky");
            sideT.addClass("sticky");
            if(sideT.css("overflow")=="visible"){
                $(sideT).css({"overflow":"hidden","box-shadow":"1rem 1rem 1rem rgba(18, 18, 18, .5)","top":"90%"});
            }
        }else{
            $("header").removeClass("sticky");
            sideT.removeClass("sticky");
            if(sideT.css("overflow")=="hidden"){
                $(sideT).css({"overflow":"visible","box-shadow":"none","top":"35%"});
            }
        }        
    });//header sticky
    
});