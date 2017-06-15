
$(function(){
	// 二级菜单 移入移出
	$(".nav-container").mouseover(function(){
		$(".nav-container .menu,.nav-container .nav-time").css("display","block");
	})
	$(".nav-container").mouseout(function(){
		$(".nav-container .menu,.nav-container .nav-time").css("display","none");
	})
//  详情信息加载
	var detail = $.cookie("details")?JSON.parse($.cookie("details")):{};
	
	
// 倒计时
	showTime();
	function showTime(){
		var endTime = new Date("2017/07/01,00:00:00");
		var curTime = new Date();
		var leftTime = parseInt((endTime.getTime()-curTime.getTime())/1000); //获取秒
		var day = num(Math.floor(leftTime/24/3600));
		var hour = num(Math.floor(leftTime/60/60%24));
		var minute = num(Math.floor(leftTime/60%60));
		var second = num(Math.floor(leftTime%60));
		$(".price_show .price2 .time").html("仅剩 "+day+"天"+hour+"小时"+minute+"分"+second+"秒");	
		function num(i){
			if(i<10){
				i = "0"+i;
			}
			return i;
		}
		if(day==0&&hour==00&minute==00&&second==00){
			clearTimeout(showTime())
		}
		setTimeout(showTime,500);
	}	
//  选择样式
	$("#ul0 li span").click(function(){
		$(this).addClass("active").parent().siblings().find("span").removeClass("active");
		$(this).find(".icon-ok").show().closest("li").siblings().find(".icon-ok").hide();
	})

//  店铺热卖 加载	
	$.ajax({
		type:"get",
		url:"../data/goodDetail/mozbox0.json",
		async:true,
		success:function(data){
			for(var i in data){
				var aLi = '<li>'+
								'<a href='+data[i].href+'>'+
									'<span class="pic">'+
										'<img src='+data[i].src+'>'+
									'</span>'+	
									'<span class="pic_title">'+data[i].name+'</span>'+
							  	'</a>'+
							  	'<div class="zc_price">'+data[i].price+'</div>'+
					  	   '</li>';
				$(".mozbox .product_list").append(aLi);	  	   
			}
		}	
	});
//  地址 选项
	$(".address .area").mouseover(function(){
		$(".address .area_select").css("display","block");
		$(this).find(".area_name").css({
			"background":"#CC0000",
			"color":"#fff",
		})
	//	$(".address .area_name").find("em").html("&and;");
	})
	$(".address .area").mouseout(function(){
		$(".address .area_select").css("display","none");
		$(this).find(".area_name").css({
			"background":"#fff",
			"color":"#999",
		})
	})
	
//  side_left  ajax 加载
	$.ajax({
		type:"get",
		url:"../data/goodDetail/mozbox.json",
		async:true,
		success:function(data){
			for(var i in data){
				var oLi = '<li>'+
								'<a href='+data[i].href+'>'+
									'<img src='+data[i].src+'>'+
									'<span class="title">'+data[i].name+'</span>'+
							  	'</a>'+
							  	'<div class="sale_price">'+data[i].price+'</div>'+
					  	   '</li>';
				$("#sale_new1").append(oLi);
			}
		}	
	});
	$.ajax({
		type:"get",
		url:"../data/goodDetail/mozbox1.json",
		async:true,
		success:function(data){
			for(var i in data){
				var oLi = '<li>'+
								'<a href='+data[i].href+'>'+
									'<img src='+data[i].src+'>'+
									'<span class="title">'+data[i].name+'</span>'+
							  	'</a>'+
							  	'<div class="sale_price">'+data[i].price1+
							  		'<span class="shan">'+data[i].price2+'<span>'+
							  	'</div>'+
					  	   '</li>';
				$("#sale_new2").append(oLi);
			}
		}
	});
	$.ajax({
		type:"get",
		url:"../data/goodDetail/side-nav.json",
		async:false,
		success:function(data){
			for(var i in data){
				var a = '<li>'+
							'<a href="javascript:">'+data[i].a+'</a>'+
						'</li>';
				$(".side-menu ul").append(a);		
			}
		}
	});
	var isClick = false;
	$("#side-menu ul li").click(function(){
		$(this).find("a").addClass("active").parent().siblings().find("a").removeClass("active");
		var iTop = $(".center-container .service-title").eq($(this).index()).offset().top;
		$("html body").stop().animate({scrollTop:iTop-100},1000,function(){
		//	isClick = false;
		});
	})
	$(window).scroll(function(){
		if(!isClick){
			var scrollTop = $(this).scrollTop();
			$(".center-container .service-title").each(function(){
				if(scrollTop>$(this).offset().top-200){
					$("#side-menu ul li").eq($(this).index(".center-container .service-title")).find("a").addClass("active").parent().siblings().find("a").removeClass("active");
				}
			})
		}
		
		var st = Math.floor($(this).scrollTop());
		if(st>=1323){
			$(".center_ol").css({
				"position":"fixed",
				"top":"0",
				"width":"1100px",
				"z-index":"50",
				"padding":"0 0 0 322px",
				"margin":"0 0 0 -324px"
			});
			$(".side-nav").css({
				"position":"fixed",
				"top":"50px",
				"right":"100px",
				"display":"block"
			})
			$(".center #buyNow").show();
		}else{
			$(".center_ol").css({
				"position":"static",
				"padding":"0 0 2px",
				"margin-left":"0",
				"width":"100%"
			})
			$(".side-nav").css({
				"position":"fixed",
				"display":"none"
			})
			$(".center #buyNow").hide()
		}
	})
	
	$(".all dt").click(function(){
		if($(this).find(".iconfont").html()=="-"){
			$(this).find(".iconfont").html("+");
		}else{
			$(this).find(".iconfont").html("-");
		}
		$(this).siblings().toggle(500);
	})

// 宝贝促销榜 切换
	$(".mozbox .tab li").mouseover(function(){
		$(this).addClass("active").siblings().removeClass("active");
		$(".tab_ul ul").eq($(this).index()).show().siblings().hide();
	})
//  中间 部分
	$(".center_ol li").click(function(){
		$(this).addClass("active").siblings().removeClass("active");
		$(".center-container").eq($(this).index()).show().siblings().hide();
		if($(window).scrollTop()>1323){
			$(window).scrollTop(1323)
		}
	})
	$(".center_ol li").eq(0).click(function(){
		$(".side-nav").show()
	})
//返回顶部
	var backTop = document.getElementById("backTop");  
	var isTop = true,timer=null;
	$(window).scroll(function(){
		var st = document.documentElement.scrollTop || document.body.scrollTop;
		st = Math.floor(st);
		if(st>600){
			backTop.style.display = "block";
		}else{
			backTop.style.display = "none";
		}
		if(!isTop){
			clearInterval(timer);
		}
		isTop = false;
	})
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
	
// 商品数量增加减少
$(".span1").click(function(){
	var num = $(this).siblings("input").val()-1;
	//console.log(num);
	if(num==0){
		$(".mask1").show();		
	}else{
		//改变input框
		$(this).siblings("input").val(num);
		$(".mask1").hide();
	}	
})
//数量增加1件
$(".span2").click(function(){
	var num =parseInt($(this).siblings("input").val());
	num=num+1;
	$(this).siblings("input").val(num);
	$(".mask1").hide();
})

//  立即购买 
	$("#buyNow").click(function(){
		success();
		$.ajax({
			type:"get",
			url:"../php/checkLogin.php",
			async:true,
			success:function(data){
				var data = JSON.parse(data);
				if(data.user!=false){
					if($("#txt").val()!=0){
						window.location.href="shopCar.html";
					}
				}else{
					if(confirm("是否登录")){
						window.location.href="login.html";
					}
				}
			}
		});
	})

//   加入购物车 
	$("#addCar").click(function(){
		var product = $(".innerBox .box").find("img")[0].id;
		var src = $(".innerBox .box").find("img")[0].src;
		var name = $(".shopDeal h3").html();
		var price = $(".price_show .zc_price").find("em").html();
		var goods = $.cookie("carts")?JSON.parse($.cookie("carts")):{};
		var num = $(".addNum .span1").siblings("input").val()
		if(product in goods){
			goods[product].proNum =""+(Number(goods[product].proNum) + Number(num));
		}else{
			goods[product] = {
				id:product,
				src:src,
				proName:name,
				proPrice:price,
				proNum:num
			}
		}
		$.cookie("carts",JSON.stringify(goods),{expires:7,path:"/"})
		//alert("成功加入"+num+"件物品")
		$(".tipBox .con").append("成功加入"+num+"件物品").parent().show();
		$(".tipBox .close").click(function(){
			$(".tipBox").hide();
		})
	})
	$(".tipBox .close").click(function(){
		$(".tipBox .con").html("");
		$(this).parent().hide();
	})
	function success(){
		var product = $(".innerBox .box").find("img")[0].id;
		var src = $(".innerBox .box").find("img")[0].src;
		var name = $(".shopDeal h3").html();
		var price = $(".price_show .zc_price").find("em").html();
		var goods = $.cookie("carts")?JSON.parse($.cookie("carts")):{};
		var num = $(".addNum .span1").siblings("input").val()
		if(product in goods){
			goods[product].proNum =""+(Number(goods[product].proNum) + Number(num));
		}else{
			goods[product] = {
				id:product,
				src:src,
				proName:name,
				proPrice:price,
				proNum:num
			}
		}
		$.cookie("carts",JSON.stringify(goods),{expires:7,path:"/"})
	}
})
function loadHtml(url,target){
	$.ajax({
		url:url,
		async:false,
		success:function(data){
			$(target).html(data);
		}
	});
}