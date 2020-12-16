$(function(){
    $(".btnB").click(function(){
        $(".navUl").css("display","block")
    });
    $(".mobileX").click(function(){
        $(this).parent().css("display","none");
    });
    // $(window).resize(function(){
    //     if($(window).width()<1200){
            var flag_form = true;
            var $form = $(".form").children();
            $(".img").click(function(e){
                e.preventDefault();
                if(flag_form){
                    $("#proD").css("display","block");
                    flag_form = !flag_form;
                }else{
                    $("#proD").css("display","none");
                    flag_form = !flag_form;
                }
            });

            //모바일 브랜드 이미지 자동함수
            // var brand = {idx:0,len:$(".brandList").children("li").length,list:$(".brandList").children("li"),
            // auto:setInterval(brandMiddle,3000)}
            // function brandMiddle(){
            //     brand.idx++;
            //     if(brand.idx>brand.len-1){
            //         brand.idx = 0;
            //     }
            //     brandMake();
            // }

            // function brandMake(){
            //     brand.list.eq(brand.idx).fadeIn(500).siblings("li").fadeOut(500);
            //     brand.list.eq(brand.idx).addClass("on").siblings("li").removeClass("on");
            // }
            // $(window).scroll(function(){
            //     clearInterval(brand.auto);
            //     brand.auto = setInterval(brandMiddle,3000);
            // });
        // }

    // });
    
});