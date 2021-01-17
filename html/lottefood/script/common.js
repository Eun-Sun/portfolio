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



    //main banner
    var banner = { idx:0,
                    len:$(".bannerB").children("li").length,
                    auto:setInterval(middle,3000)
                }
    function middle(){
        banner.idx++;
        if(banner.idx>banner.len-1){
            banner.idx = 0;
        }
        make();
    }

    function make(){
        $(".bannerB").children("li").eq(banner.idx).fadeIn(500).siblings("li").fadeOut(500);
        $(".banner").children("li").eq(banner.idx).addClass("on").siblings("li").removeClass("on");
    }

    $(".prev").click(function(){
        clearInterval(banner.auto);
        banner.idx--;
        if(banner.idx<0){
            banner.idx = banner.len-1;
        }
        make();
        banner.auto = setInterval(middle,3000);
        stopB();
    });
    
    $(".next").click(function(){
        clearInterval(banner.auto);
        banner.idx++;
        if(banner.idx>banner.len-1){
            banner.idx = 0;
        }
        make();
        banner.auto = setInterval(middle,3000);
        stopB();
    });

    //배너스크롤 눌렀을때 반응
    $(".banner").children("li").click(function(){
        clearInterval(banner.auto);
        banner.idx = $(this).index();
        make();
        banner.auto = setInterval(middle,3000);
        stopB();
    });

    //정지이미지로 변환
    function stopB(){
        $(".controll_btn").css({"background-image":"url(imgs/SVG/stop-b.svg)"});
    }
    //정지,재생버튼
    var controll = true;
    $(".controll_btn").click(function(){
        if(controll){
            clearInterval(banner.auto);
            $(".controll_btn").css({"background-image":"url(imgs/SVG/play-b.svg)"});
            controll = !controll;
        }else{
            clearInterval(banner.auto);
            stopB();
            banner.auto = setInterval(middle,3000);
            controll = !controll;
            
        }
    });

    //위로가기버튼########### 질문
    // $(window).scroll(function(){
    //     if($(this).scrollTop()>0){
    //         $(".bannerF").children(".scroll").addClass("fixed");
    //     }else{
    //         $(".bannerF").children(".scroll").removeClass("fixed");
    //     }
    // });

    /* 밑에 선택 바 만들기
        $('li').click(function(){
            var url1 = $(this).css(background-image);
            //bg_01_off.jpg ---> 
            url1 = url1.replace("_off","_on");
            $(this).css("background-image",url1);

            $("li").not(this).children("img").each(function(i,v){

            var url = $(v).css("background-image");
            //bg_01_off.jpg ---> 
            url = url.replace("_on","_off");
            $(v).css("background-image",url);

        });

        })
    
    */

    //신제품 메뉴바 만들기
    $(".prod").click(function(){
            var url1 = $(this).css("background-image");
            //bg_01_off.jpg ---> 
            url1 = url1.replace("-off","-on");
            $(this).css("background-image",url1);

            $(".prod").not(this).each(function(i,v){

            var url = $(v).css("background-image");
            //bg_01_off.jpg ---> 
            url = url.replace("-on","-off");
            $(v).css("background-image",url);
        });

    });    

    //신제품 사진
    var product = {idx:0};
    $(".productUl").children(".on1").children("span").css("color","#e30013");
    $(".productUl").children(".on1").siblings().children("ul").css("display","none");
    $(".productUl").children("li").click(function(){
        product.idx = $(this).index();                
        $(".productUl").children("li").eq(product.idx).children("ul").fadeIn(500).parent("li").siblings().children("ul").fadeOut(500);
        $(".productUl").children("li").eq(product.idx).children("span").css("color","#e30013").parent("li").siblings().children("span").css("color","#606060");
    });

    //sns 메뉴바
    $(".snsPage").click(function(){
            var url1 = $(this).css("background-image");
            //bg_01_off.jpg ---> 
            url1 = url1.replace("-off","-on");
            $(this).css({"background-image":url1});

            $(".snsPage").not(this).each(function(i,v){

            var url = $(v).css("background-image");
            //bg_01_off.jpg ---> 
            url = url.replace("-on","-off");
            $(v).css({"background-image":url});
        });
    });   

    //sns 이미지이동

    var sns = {idx:0, 
        child : $(".snsUl").children("li"),
        select : $(".snsSelect").children("li")        
    };

    $(".snsUl").children(".on2").children("span").css("color","#e30013");
    $(".snsUl").children(".on2").siblings().children("ul").css("display","none");
    
    $(".snsUl").children("li").click(function(){
        sns.idx = $(this).index();                
        sns.child.eq(sns.idx).children("ul").fadeIn(500).parent("li").siblings().children("ul").fadeOut(500);
        sns.child.eq(sns.idx).children("span").css("color","#e30013").parent("li").siblings().children("span").css("color","#606060");
    });
    
    //유튜브 링크이동
    sns.select.eq(0).children("span").css({"background-color":"#fff","border-color":"#E30013"});
    sns.select.children("span").click(function(){
        $(this).css({"background-color":"#fff","border-color":"#E30013"}).parents("li").siblings().children("span").css({"background-color":"transparent","border-color":"#A5A5A5"});
        $(this).next().fadeIn(500).parents("li").siblings().children("ul").fadeOut(500);
    });
});