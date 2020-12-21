$(function(){
            
    //언어유틸메뉴
    var flag_lang = true;
    $(".lang").children("dd").eq(0).click(function(){
        if(flag_lang){
            $(this).siblings().slideDown(500);
            flag_lang =!flag_lang;
        }else{
            $(this).siblings().slideUp(500);
            flag_lang =!flag_lang;
        }   
    });

    //nav
    $(".being").children("ul").css("display","none");
    $(".navUl").children("li").mouseenter(function(){
            $(this).children("div").addClass("on").slideDown(500).parents("li").siblings().children("div").removeClass("on").slideUp(500);
            $(".being").mouseenter(function(){
                $(this).children("ul").slideDown(300);
            }).mouseleave(function(){
                $(this).children("ul").slideUp(100);
            });
            }).mouseleave(function(){
                $(this).children("div").css("display","none");
            });

    //스크롤 이동시 상단메뉴 고정
    var $header = $("header");
    var $img = $(".head").children("h1").find("img");
    $(window).scroll(function(){                
        var src = $(".head").children("h1").find("img").attr("src");;
        if( $(window).scrollTop()>2 ){
            $header.addClass("sticky");
            src = src.replace("e-w","e-r");
            $img.attr("src",src);
            if($(window).width>=1200){
                $img.css({"width":'80%',"margin-top":".8rem"});
            }else{
                $img.css({"width":'15rem',"margin-top":".8rem"});
            }
            
            //스크롤버튼에서 탑버튼으로 변경
            $(".banner_F").children("p").last().addClass("fixed").text("").append("<a href='#top'>TOP</a>");
        }else{
            $header.removeClass("sticky");
            src = src.replace("e-r","e-w");
            $img.attr("src",src);
            if($(window).width>=1200){
                $img.css({"width":'100%',"margin-top":0});
            }else{
                $img.css({"width":'15rem',"margin-top":0});
            }
            //탑버튼에서 스크롤버튼으로 변경
            $(".banner_F").children("p").last().removeClass("fixed").text("SCROLL"); 
        }
    });
    
});