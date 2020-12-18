$(function(){
    var flag = {nav:true, x:true, form:true}
    
    $(".btnB").click(function(){
        if(flag.nav){
            $("nav").css("left",0);
            flag.nav = false;
        }else{
            $("nav").css("left","-70vw");
            flag.nav = true;
        }
    });
    
    $(".mobileX").click(function(){
        if(flag.x){
            $("nav").css("left","-70vw");
            flag.x = true;
        }
    });
    $(window).resize(function(){
        if($(window).width()<1200){
            var $form = $(".form").children();
            $(".img").click(function(e){
                e.preventDefault();
                if(flag.form){
                    $("#proD").css("display","block");
                    flag.form = false;
                }else{
                    $("#proD").css("display","none");
                    flag.form = true;
                }
            });

            //모바일 브랜드 이미지 자동함수
            var brand = {idx:0,len:$(".mobile").children("li").length,list:$(".mobile").children("li"),
            auto:setInterval(brandMiddle,3000)}
            function brandMiddle(){
                brand.idx++;
                if(brand.idx>brand.len-1){
                    brand.idx = 0;
                }
                brandMake();
            }

            function brandMake(){
                brand.list.eq(brand.idx).fadeIn(500).siblings("li").fadeOut(500);
                brand.list.eq(brand.idx).addClass("on").siblings("li").removeClass("on");
            }
            $(window).scroll(function(){
                clearInterval(brand.auto);
                brand.auto = setInterval(brandMiddle,3000);
            });
        }

    });
    
});