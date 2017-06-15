$(function(){
// ajax 加载
	$.ajax({
		type:"get",
		url:"../data/goodList/sigle.json",
		async:false,
		success:function(data){
			for(var i in data){
				var aLi = '<li>'+ 
							'<a href='+data[i].href+' target="_blank">'+
								'<img src='+data[i].src+' id='+data[i].id+'>'+
								'<span class="title">'+data[i].title+'</span>'+
							'</a>'+
							'<div class="subTitle">'+data[i].subTitle+'</div>'+
							'<div class="price">'+
								'<span class="label">'+data[i].label+'</span>'+
								'<span class="sale_price">'+data[i].sale_price+'</span>'+
							'</div>'+
							'<div class="hot">'+data[i].hot+'</div>'+
							'<div class="addCar">加入购物车<i class="iconfont">&#xe603;</i></div>'+
						  '</li>';
				$(".star-list").append(aLi);
			}
		}
	});
//  明星单选加入购物车	
	var number = 0;
	$(".star-list li .addCar").click(function(){
		var id = $(this).siblings().find("img")[0].id;
		var goods = $.cookie("carts")?JSON.parse($.cookie("carts")):{};
		if(id in goods){
			goods[id].proNum++;
		}else{
			var src = $(this).siblings().find("img")[0].src;
			var name = $(this).siblings().find(".title").html();
			var price = $(this).siblings().find(".sale_price b").html();
			goods[id] = {
				id:id,
				src:src,
				proName:name,
				proPrice:price,
				proNum:1
			}
		}
		$.cookie("carts",JSON.stringify(goods),{expires:7,path:"/"});
		//console.log($.cookie("carts"))
		// 购物车 数量  
		var val = $("#shopCar .number").html();
		$("#shopCar .number").html(++val);
		$("#msg").show().animate({width: '200px'}, 200).fadeOut(1000);
	})

	//  明星单选   进入详情页
	$(".star-list li").click(function(){
		var id = $(this).siblings().find("img")[0].id;
		var src = $(this).siblings().find("img")[0].src;
		var name = $(this).siblings().find(".title").html();
		var price = $(this).siblings().find(".sale_price b").html();
		var goods = $.cookie("details")?JSON.parse($.cookie("details")):{};
		goods[id] = {
			id:id,
			src:src,
			proName:name,
			proPrice:price
		}
	//	$.cookie("details",JSON.stringify(goods));
	})
	
	$.ajax({
		type:"get",
		url:"../data/goodList/pinpai.json",
		async:false,
		success:function(data){
			for(var i in data){
				var aLi = '<li>'+
							'<a href='+data[i].href0+'>'+
								'<img src='+data[i].src0+'>'+
							'</a>'+
							'<div class="list">'+
								'<a href='+data[i].href1+'>'+
									'<img src='+data[i].src1+'>'+
									'<span>'+data[i].span1+'</span>'+
								'</a>'+
								'<a href='+data[i].href2+'>'+
									'<img src='+data[i].src2+'>'+
									'<span>'+data[i].span1+'</span>'+
								'</a>'+
								'<a href='+data[i].href3+'>'+
									'<img src='+data[i].src3+'>'+
									'<span>'+data[i].span1+'</span>'+
								'</a>'+
							'</div>'+
						  '</li>';
				$(".brand-choice").append(aLi);		  
			}		  
		}
	});
	$.ajax({
		type:"get",
		url:"../data/goodList/brand1.json",
		async:false,
		success:function(data){
			for(var i in data){
				var aLi = '<li>'+
							'<a href='+data[i].href+'>'+
								'<img src='+data[i].src+'>'+
							'</a>'+
						  '</li>';
				$(".brand-list").append(aLi);		  
			}		  
		}
	});
	$.ajax({
		type:"get",
		url:"../data/goodList/figure1.json",
		async:false,
		success:function(data){
			for(var i in data){
				var aLi = '<li>'+
							'<a href='+data[i].href+'>'+
								'<img src='+data[i].src+'>'+
								'<span class="title">'+data[i].title+'</span>'+
								'<span class="price">'+data[i].price+'</span>'+
								'<div class="mask">'+
									'<h3>'+data[i].h+'</h3>'+
									'<p>'+data[i].p+'</p>'+
									'<div class="btn">'+
										'<span>'+data[i].span+'</span>'+
									'</div>'+	
								'</div>'+	
							'</a>'+
						  '</li>';
				$("#figure-list1").append(aLi);		  
			}		  
		}
	});
	$.ajax({
		type:"get",
		url:"../data/goodList/hotSale.json",
		async:true,
		success:function(data){
			for(var i in data){
				var aLi = '<li>'+
							'<em class="num">'+data[i].num+'</em>'+
							'<a href='+data[i].href+' class="pic">'+
								'<img src='+data[i].src+'>'+
								'<span class="title">'+data[i].title+'</span>'+
							'</a>'+	
							'<span class="price">'+data[i].price+'</span>'+
						  '</li>';
				$("#hot_ul1").append(aLi);		  
			}		  
		}
	});
	$.ajax({
		type:"get",
		url:"../data/goodList/figure2.json",
		async:true,
		success:function(data){
			for(var i in data){
				var aLi = '<li>'+
							'<a href='+data[i].href+'>'+
								'<img src='+data[i].src+'>'+
								'<span class="title">'+data[i].title+'</span>'+
								'<span class="price">'+data[i].price+'</span>'+
								'<div class="mask">'+
									'<h3>'+data[i].h+'</h3>'+
									'<p>'+data[i].p+'</p>'+
									'<div class="btn">'+
										'<span>'+data[i].span+'</span>'+
									'</div>'+	
								'</div>'+	
							'</a>'+
						  '</li>';
				$("#figure-list2").append(aLi);		  
			}		  
		}
	});	
	$.ajax({
		type:"get",
		url:"../data/goodList/hotSale.json",
		async:true,
		success:function(data){
			for(var i in data){
				var aLi = '<li>'+
							'<em class="num">'+data[i].num+'</em>'+
							'<a href='+data[i].href+' class="pic">'+
								'<img src='+data[i].src+'>'+
								'<span class="title">'+data[i].title+'</span>'+
							'</a>'+	
							'<span class="price">'+data[i].price+'</span>'+
						  '</li>';
				$("#hot_ul2").append(aLi);		  
			}		  
		}
	});
//  简单分页效果		
	$.ajax({
		type:"get",
		url:"../data/goodList/phone0.json",
		async:true,
		success:function(data){
			create(data);
		}
	});	
	function create(data){
		for(var i in data){
				var aLi = '<li>'+
							'<a href='+data[i].href+'>'+
								'<span class="pic">'+
									'<img src='+data[i].src+'>'+
								'</span>'+
								'<span class="title">'+data[i].title+'</span>'+
							'</a>'+
							'<div class="price-bar">'+data[i].price+'</span>'+
						  '</li>'	
				$(".phone-ul").append(aLi);
			}
	}
//  简单分页效果	
	$(".page li").click(function(){
		$(window).scrollTop(2731)
		$(".phone-ul").html("");
		$.ajax({
			type:"get",
			url:"../data/goodList/phone"+$(this).index()+".json",
			async:true,
			success:function(data){
				create(data);
			}
		});
		$(this).css({
			"background":"#666",
			"color":"#fff"
		}).siblings().css({
			"background":"#fff",
			"color":"#000"
		})
	})
	// 二级菜单 移入移出
	$(".nav-container").mouseover(function(){
		$(".nav-container .menu,.nav-container .nav-time").css("display","block");
	})
	$(".nav-container").mouseout(function(){
		$(".nav-container .menu,.nav-container .nav-time").css("display","none");
	})
	// 楼层 效果实现 
	$(".louceng ul li").click(function(){
		$(this).addClass("active").siblings().removeClass("active");
		var iTop = $(".wrapper").eq($(this).index()).offset().top;
		$("html body").stop().animate({scrollTop:iTop-100},1000)
	})
	$(window).scroll(function(){
		var scrollTop = $(this).scrollTop();
		$(".wrapper").each(function(){
			if(scrollTop>$(this).offset().top-$(this).prev().outerHeight()/2){
				$(".louceng ul li").eq($(this).index(".wrapper")).addClass("active").siblings().removeClass("active");
			}
		})
		if(scrollTop>=300&&scrollTop<=3200){
			$(".louceng").css("display","block");
		}else{
			$(".louceng").css("display","none")
		}
		//  搜索框吸顶
		if(scrollTop>=63){
			$("#search").css({
				"position":"fixed",
				"z-index":"99",
				"background":"rgba(255,255,255,0.8)",
				"top":0,
				"padding-bottom":0,
				"width":1200
			})
			$(".moreLink").css("display","none");
			$("#search .img0").css("display","none");
		}else{
			$("#search").css({
				"position":"relative",
				"padding-bottom":40,
				"z-index":1
			});
			$(".moreLink").css("display","block");
			$("#search .img0").css("display","block");
		}
	})
	
	//  返回顶部
	$(".backTop").click(function(){
		$("html body").animate({scrollTop:0},1000)
	})
	
	$(window).scroll(function(){
		var scrollTop = $(this).scrollTop();
		if(scrollTop>300){
			$(".backTop").css("display","block");
		}else{
			$(".backTop").css("display","none");
		}
//		if(!isTop){
//			clearInterval(timer);
//		}
//		isTop = false;
	})
//	var isTop = true,timer = null;
//	//  isTop  是否 到顶 如果没有到达顶部  要清除 定时器
//	$(".backTop").click(function(){
//		timer = setInterval(function(){
//			var st = document.documentElement.scrollTop || document.body.scrollTop;
//			var iSpeed = Math.floor(-st/8);
//			document.documentElement.scrollTop = document.body.scrollTop = st + iSpeed;
//			isTop = true;
//			if(st==0){
//				clearInterval(timer);
//			}
//		},50);
//	})
})	

window.onload = function(){
// 轮播图	
	var oFocus= document.getElementById("focus");
	var oUl = getByClass(oFocus,"focus_ul")[0];
	var aLi = oUl.getElementsByTagName("li");
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
	
	var iNow = 0;
	autoPlay();
	function autoPlay(){
		clearInterval(oFocus.timer);
		oFocus.timer = setInterval(function(){
			iNow++;
			if(iNow==len){
				oUl.style.left = -iLiWidth+"px";
				iNow = 1;
			}
			tab();
		},2000);
	}
	oFocus.onmouseover = function(){
		clearInterval(oFocus.timer);
	}
	oFocus.onmouseout = function(){
		autoPlay();
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

		//left -iNow*iLiWidth
		var iLeft = -iNow*iLiWidth;  // 图片ul 移动的宽度
		startMove(oUl, {left: iLeft})
	}
// 无缝轮播
	 
	
}
function loadHtml(url,target){
	$.ajax({
		url:url,
		async:false,
		success:function(data){
			$(target).html(data);
		}
	});
}