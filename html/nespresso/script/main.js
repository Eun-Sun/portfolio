$(function(){

    $("html, body").animate({ "scrollTop": 0 }, "slow");

    var banner = {  idx:0, 
                    len:$(".box1").children("div").length, 
                    auto:setInterval(middle,4000) }

    function middle(){
        banner.idx++;
        if(banner.idx>banner.len-2){
            banner.idx = 0;
        }
        make();
    }
    function make(){
        $(".box1").children("div").eq(banner.idx).fadeIn(500).siblings("div").not(".banner_btn").fadeOut(500);
        $(".banner_btn").find("span").eq(banner.idx).addClass("on").parent("p").siblings().find("span").removeClass("on");
    }//배너 자동 재생 end

    $(".banner_btn").children("p").click(function(){
        clearInterval(banner.auto);
        banner.idx = $(this).index();
        make();
        banner.auto = setInterval(middle,3000);
    });//배너 버튼 클릭

    $(".box2").children("div").find("p").eq(1).children("img").mouseenter(function(){
        $(this).css("animation-play-state","paused");
    }).mouseleave(function(){
        $(this).css("animation-play-state","running");
    });//컵 애니메이션 호버

    var flag_mechine = true;
    $(".mechineOn").click(function(){
        if(flag_mechine){
            $(".mechine").addClass("on");
            flag_mechine = true;
        }else{
            $(".mechine").removeClass("on");
            flag_mechine = true;
        }
        $(".close").click(function(){
            $(".mechine").removeClass("on");
            flag_mechine = true;
        });

        $(".choice").children("span").click(function(){
            $(this).addClass("on").siblings().removeClass("on");
        });
    });//머신 팝업창오픈

    $("h4").click(function(){
        $(this).addClass("on").next().slideToggle(300,function(){
            if($(this).css("display")=="none"){
                $(this).prev().removeClass("on")
            }
        });

        $("h4").not(this).removeClass("on").next().slideUp(300);
    }); //고객센터 토글 end


    //스크롤 이벤트 시작
    var scrollEvnt = {
        idx : 0,
        count : 0,
        dir : "down",
        waitScroll:false,
        len : $("section"),length,
        scroll : true
    }

    //퀵메뉴 클릭이벤트
    $(".quick").children("ul").find("li").click(function(e){
        clearTimeout(scrollEvnt.waitScroll);
        scrollEvnt.count = $(this).index();
        scrollEvnt.scroll = false;
        moveBox();
    });

    $(window).on("mousewheel DOMMouseScroll", function(e){
        scrollEvnt.scroll = true;
        var boxH = $("section").eq(0).height();

        if(e.deltaY == -1){
            scrollEvnt.dir = "down";
        }else{
            scrollEvnt.dir = "up";
        }
        if(scrollEvnt.waitScroll){
            clearTimeout(scrollEvnt.waitScroll);
        }

        scrollEvnt.waitScroll = setTimeout(function(){
            moveBox();
        },80);
    });
    function moveBox(){
        if(scrollEvnt.scroll){ //scroll할땐 true 클릭할땐 false
            if(scrollEvnt.dir == "down"){
                scrollEvnt.count++;
                if(scrollEvnt.count >=scrollEvnt.len){ //스크롤을 끝까지 내렸다면,
                    scrollEvnt.count = scrollEvnt.len-1; //마지막에 고정한다.
                }
            }else{
                scrollEvnt.count--;
                if(scrollEvnt.count <0){ //스크롤을 처음으로 위치시켰다면,
                    scrollEvnt.count =0; //처음위치에 고정한다.
                }
            }
        }
        var nextTop = $("section").eq(scrollEvnt.count).offset().top;
                $("html,body").animate({"scrollTop":nextTop},300,"linear");
                lightNow();
    }
    var $quickB = $(".quick").children("ul").children("li");

    function lightNow(){
        $quickB.eq(scrollEvnt.count).children().addClass("on").parent().siblings().children().removeClass("on");
    }
    //스크롤 이벤트 끝

    //마우스휠 이미지 시작
    for (var i = 1; i < 107; i++) {
        if (i < 10) {
            i = "00" + i;
        } else if (i < 100) {
            i = "0" + i;
        }
        $("#imgContainer").append(
            "<img src='imgs/sequence1/coffe" + i + ".jpg' alt='" + i + "번째 이미지'>"
        );

    }
    scrollMovie();
    function scrollMovie(){
        //1.필요한 변수 작성
        var container = $("#imgContainer");
        var imgLen = $("#imgContainer").children().length;
        var currentNum = 0;
        var timer = false;
        var speed = 0;
        //이미지의 비율
        var imgRatio = container.children().first().width()/container.children().first().height();

        var currentSpeed = 0;

        $(window).on("mousewheel DOMMouseScroll", function(e){
            //마우스휠 한번에 0.3s
            //0.3s동안에 작게 4번(1번당 0.075s), 많게 12번(0.025s)
            if(e.deltaY<1){//휠을 아래방향으로 하는중
                //console.log("down");
                speed++;
            }else{//휠을 위방향으로 하는중
                //console.log("up");
                speed--;
            }
            startImg();
        });

        function startImg(){
        //스크롤 이벤트가 있을때만 0.016초마다 이미지가 변경될 수 있도록 호출
            if(!timer){
                timer = setInterval(changeImg, 1000/60);
            }   
        }

        function stopImg(){
        //스크롤 이벤트가 없으면 멈추기
            clearInterval(timer);
            timer = false;
        }

        function changeImg(){
            //마우스 이벤트가 진행되다 멈추면 stopImg를 호출하도록 미리만든다.
            //스크롤 내린 속도에 비례해서 조금씩 느려지게한다(감속).
            //0.5를 지정하면 스크롤 속도의 반씩 줄어들게 된다.
            var nextNum = 0;
            
            speed *= 0.9;
            //console.log(speed);
            if(speed<0.00001 && speed > -0.00001){
                //speed 값이 0에 가까워진 값이되면
                stopImg();
            }else{//speed 값이 점점 줄어들고 있는 과정일때 이미지를 변화하게 만들어야 한다.
                //스피드값은 스크롤 할때마다 변화하지만, 수치가 크게 변화하지는 않기때문에 수치를 조금 더 키우기 위해서 값을 계속 합산시키도록 한다.
                currentSpeed = (currentSpeed + speed)%imgLen;
            }
            nextNum = Math.floor(currentSpeed);
            if(currentNum != nextNum){
                container.children("img").eq(nextNum).show();
                container.children("img").eq(currentNum).hide();
                currentNum = nextNum;
            }
        }
        //2. 스크롤 이벤트 전에 브라우저창이 커지거나, 작아졌을 때 이미지를 중앙에 배치시키도록 한다.(화면에 꽉차보이도록)
        //유저가 브라우저 크기를 변경할 때마다 이미지 크기를 변경
        $(window).resize(function(){
            poseImg();
        });
        //처음 로딩시 한번은 이미지 크기변화를 이끌어야한다.                    
        poseImg();
        function poseImg(){
            //1. 필요한 변수 작성
            //윈도우의 크기가 필요하다.
            var w = $(window).width();
            var h = $(window).height();

            //이미지 창이 가로가 긴 경우와 세로가 긴경우로 구분한다.
            //1000/500
            if(imgRatio > w/h){ //브라우저 창이 세로가 긴 경우
                container.css({height:"100%",width:h*imgRatio, left:(w-h*imgRatio)/2})
            }else if(imgRatio< w/h){ //가로가 긴 경우        
                container.css({width:"100%",height:w/imgRatio, top:(h-w/imgRatio)/2})               
            }
        }//fn poseImg end


    }//fn scrollMovie end
    

    


});//jQuery ready end