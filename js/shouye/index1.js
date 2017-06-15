window.onload = function(){
	//  搜索框   文本搜索
//	var oSearchTxt = document.getElementById("searchTxt");
//	var oSearchInput = document.getElementById("search_input");
//	search(oSearchInput,oSearchTxt);  //  js搜索框封装调用
	
	
	
// 返回顶部		
	var backTop = document.getElementById("backTop");  
	var isTop = true,timer=null;
//  滚动条滚动时触发	
	window.onscroll = function(evt){
		var e = evt || window.event;
		var st = document.documentElement.scrollTop || document.body.scrollTop;
		st = Math.floor(st);
	//	console.log(st)
	// 滚动条 
		if(st>600){
			backTop.style.display = "block";
		}else{
			backTop.style.display = "none";
		}
		if(!isTop){
			clearInterval(timer);
		}
		isTop = false;
	// 搜索框	吸顶
		if(st>64){  //  直接改变 搜索框的position值 
			$("#search").css({
				"padding-bottom":"0",
				"position":"fixed",
				"width":"1230px",
				"top":"0",
				"z-index":"10",
				"background-color":"rgba(255,255,255,.8)"
			});
			$(".moreLink").css("display","none");
			$(".img0").css("display","none");
		}else{
			$("#search").css("position","relative");
			$("#search").css("padding-bottom","40px");
			$(".moreLink").css("display","block");
			$(".img0").css("display","block");
		}	
	// 楼梯层 
		if(st>400&&st<3250){
			$("#float-side").css("display","block");
		}else{
			$("#float-side").css("display","none");
		}
	}
// 返回顶部	
	backTop.onclick = function(){
		timer = setInterval(function(){
			var st = document.documentElement.scrollTop || document.body.scrollTop;
			var iSpeed = Math.floor(-st/8);
			document.documentElement.scrollTop = document.body.scrollTop = st + iSpeed;
			isTop = true;
			if(st==0){
				clearInterval(timer);
			}
		},50);
	}

	// ajax 加载
	$.ajax({
		type:"get",
		url:"../data/shouye/banner.json",
		async:false,
		success:function(data){
			for(var i in data){
				var aLi = '<li>'+
							'<a href='+data[i].href+'>'+
								'<img src='+data[i].src+'>'+
							'</a>'+
						  '</li>';
			//	$("#ul_box").append(aLi);		  
			}
		}
	});
	$.ajax({
		type:"get",
		url:"../data/shouye/te-list.json",
		async:true,
		success:function(data){
			for(var i in data){
				var aLi = '<li>'+
							'<a href='+data[i].href+'>'	+
								'<img src='+data[i].src+' width='+data[i].width+' height='+data[i].height+'/>'+
							'</a>'+
						  '</li>';
				$(".te-list ul").append(aLi);		  
			}
		}
	});
//  手机通讯  加载	  其他几个同这几个一样加载
	$.ajax({
		type:"get",
		url:"../data/shouye/mobile.json",
		async:false,
		success:function(data){
			for(var i in data){
				var aLi = '<li>'+
							'<a href='+data[i].href+'>'+
								'<img src='+data[i].src+'>'+
							'</a>'+
						  '</li>';
				$("#focusOne .mobileFocus").append(aLi);		  
			}
		}
	});
	$.ajax({
		type:"get",
		url:"../data/shouye/yilou.json",
		async:true,
		success:function(data){
			for(var i in data){
				var aLi = '<li class="item">'+
							'<div class="title">'+
								'<a href='+data[i].href+'>'+data[i].txt+'</a>'+
							'</div>'+	
							'<p>'+data[i].p+'</p>'+
							'<a href='+data[i].href+' class="pic">'+
								'<img src='+data[i].src+'/>'+
							'</a>'+
						  '</li>';
//				$("#ul_three").append(aLi);		  
			}
		}
	});
	
// banner 轮播团	
	var oBox = document.getElementById("box");
	var oInner = document.getElementById("inner");
	var oUl = getByClass(oInner,"ul_box")[0];
	var aLi = oUl.getElementsByTagName("li");
	var oPrev = document.getElementById("prev");
	var oNext = document.getElementById("next");
	var oTab = document.getElementById("tab");
	var aDiv = oTab.getElementsByTagName("div");
	var len = aLi.length;
	var iLiWidth = aLi[0].offsetWidth;
	var oFisrt = aLi[0].cloneNode(true);
	var oLast = aLi[len-1].cloneNode(true);
	oUl.appendChild(oFisrt);
	oUl.insertBefore(oLast,aLi[0]);
	len +=2;
	oUl.style.width = iLiWidth*len + "px";
	oUl.style.left = -iLiWidth +"px";
	
	var iNow = 1;
	autoPlay();
	function autoPlay(){
		clearInterval(oBox.timer);
		oBox.timer = setInterval(function(){
			iNow++;
			if(iNow==len){
				oUl.style.left = -iLiWidth+"px";
				iNow = 2;
			}
			tab();
		},2000);
	}
	oNext.onclick = function(){
		iNow++
		if(iNow==len){
			oUl.style.left = -iLiWidth+"px";
			iNow = 2;
		}
		tab();
	}
	oPrev.onclick = function(){
		iNow--;
		if(iNow == 0){
			oUl.style.left = -(len-1)*iLiWidth + "px";
			iNow = len-2;
		}
		tab();
	}
	oBox.onmouseover = function(){
		clearInterval(oBox.timer);
		oPrev.style.display = "block";
		oNext.style.display = "block";
	}
	oPrev.onmouseover = function(){
		oPrev.style.background = "rgba("+0+","+0+","+0+","+0.6+")";
	}
	oPrev.onmouseout = function(){
		oPrev.style.background = "";
	}
	oNext.onmouseover = function(){
		oNext.style.background = "rgba("+0+","+0+","+0+","+0.6+")";
	}
	oNext.onmouseout = function(){
		oNext.style.background = "";
	}
	oBox.onmouseout = function(){
		autoPlay();
		oPrev.style.display = "none";
		oNext.style.display = "none";
	}
	for(var i=0; i<aDiv.length; i++){
		aDiv[i].index = i;
		aDiv[i].onmouseover = function(){
			iNow = this.index+1;
			tab();
		}
	}
	function tab() {
		for(var i=0; i<aDiv.length; i++) {
			aDiv[i].className = "";
		}
		//iNow 0 1 2 3 4 5 6 7 ... len-2 len-1
    //liIndex   0 1 2 3 4 5 6 ... len-3
    //		  len-3
    	var liIndex = 0;//小圆点下标
		if(iNow==0) {
			liIndex = len-2;
		} else if(iNow==len-1) {
			liIndex = 0;
		} else {
			liIndex = iNow-1;
		}
		aDiv[liIndex].className = "active";
		var iLeft = -iNow*iLiWidth;  // 图片ul 移动的宽度
		startMove(oUl, {left: iLeft})
	}
	
//  楼层轮播图
	var oBox1 = document.getElementById("focusOne");
	var oPrev1 = document.getElementById("prev1");
	var oNext1 = document.getElementById("next1");
	var oDiv1 = document.getElementById("tab1");
	var aDiv1 = oDiv1.getElementsByTagName("div");
	lunBo(oBox1,oPrev1,oNext1,aDiv1,2000); // 一楼
	var oBox2 = document.getElementById("focusTwo");
	var oPrev2 = document.getElementById("prev2");
	var oNext2 = document.getElementById("next2");
	var oDiv2 = document.getElementById("tab2");
	var aDiv2 = oDiv2.getElementsByTagName("div");
	lunBo(oBox2,oPrev2,oNext2,aDiv2,1600); // 二楼
	var oBox3 = document.getElementById("focusThree");
	var oPrev3 = document.getElementById("prev3");
	var oNext3 = document.getElementById("next3");
	var oDiv3 = document.getElementById("tab3");
	var aDiv3 = oDiv3.getElementsByTagName("div");
	lunBo(oBox3,oPrev3,oNext3,aDiv3,1800);  // 三楼
	var oBox4 = document.getElementById("focusFour");
	var oPrev4 = document.getElementById("prev4");
	var oNext4 = document.getElementById("next4");
	var oDiv4 = document.getElementById("tab4");
	var aDiv4 = oDiv4.getElementsByTagName("div");
	lunBo(oBox4,oPrev4,oNext4,aDiv4,1500);  // 四楼
// 楼层无缝轮播	

    //  楼梯效果
	var isClick = false;	
	$("#float-side ul li").click(function(){
		isClick = true;
		$(this).find("span").addClass("active").parent().siblings().find("span").removeClass("active");
		var iTop = $(".section").eq($(this).index()).offset().top;
		$("html body").stop().animate({scrollTop:iTop-100},1000,function(){
			isClick = false;
		});
	})
	$(window).scroll(function(){
		if(!isClick){
			var scrollTop = $(this).scrollTop();
			$(".section").each(function(){
				if(scrollTop>$(this).offset().top-$(this).prev().outerHeight()/2){
					$("#float-side ul li").eq($(this).index(".section")).find("span").addClass("active").parent().siblings().find("span").removeClass("active");
				}
			})
			
		}
	})

}// window.onload 结束

