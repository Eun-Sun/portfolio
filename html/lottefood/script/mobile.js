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
    });//검색창

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
    
    //신제품 사진
    var product = {idx:0};
    $(".productUlM").children(".on").children("span").css("color","#e30013");
    $(".productUlM").children(".on").siblings().children("ul").css("display","none");
    $(".productUlM").children("li").click(function(){
        product.idx = $(this).index();                
        $(".productUlM").children("li").eq(product.idx).children("ul").fadeIn(500).parent("li").siblings().children("ul").fadeOut(500);
        $(".productUlM").children("li").eq(product.idx).css("border-bottom",".2rem solid #E30013").siblings().css("border-bottom",".2rem solid #606060");
        $(".productUlM").children("li").eq(product.idx).children("span").css("color","#e30013").parent("li").siblings().children("span").css("color","#606060");
    });
    
    //sns 이미지이동

    var sns = {idx:0, 
        child : $(".snsUlM").children("li")      
    };

    $(".snsUlM").children(".on").children("span").css("color","#e30013");
    $(".snsUlM").children(".on").siblings().children("ul").css("display","none");
    
    $(".snsUlM").children("li").click(function(){
        sns.idx = $(this).index();                
        sns.child.eq(sns.idx).children("ul").fadeIn(500).parent("li").siblings().children("ul").fadeOut(500);
        sns.child.eq(sns.idx).css("border-bottom",".2rem solid #E30013").siblings().css("border-bottom",".2rem solid #606060");
        sns.child.eq(sns.idx).children("span").css("color","#e30013").parent("li").siblings().children("span").css("color","#606060");
    });
    
    $(".insta").click(function(){
        window.open("https://www.instagram.com/lottefoods/");
    });
    $(".faceB").click(function(){
        window.open("https://www.facebook.com/LOTTEFOODS");
    });
});