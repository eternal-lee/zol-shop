
//  搜索框
$(function(){
	//访问量
	$.ajax({
		type:"get",
		url:"../php/count.php",
		async:true,
		success:function(data){
			var data = JSON.parse(data)
			$("#countNum i").html(data.num)
		}
	});
//  搜索框   文本搜索	
	$("#searchTxt").keyup(function(){
		if($(this).val()!=""){
			$("#tip").css("display","block")
		}else{
			$("#tip").css("display","none");
		}
		$.ajax({
			url:"https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+$("#searchTxt").val(),
			dataType:"jsonp",
			jsonp:"cb",
			success:function(data){
				var arr = data.s;
				$("#tipList").html("");
				for(var i in arr){
					var li = $("<li></li>");
					li.html(arr[i]);
					$("#tipList").append(li);
				}
				$("#tipList li").click(function(){
					$("#searchTxt").val($(this).html());
					$("#tip").hide();
				})
			}
		});
	})
	
	
	$("#shopCar").click(function(){
		var value = Number($("#shopCar .number").html())
			
		$.ajax({
			type:"get",
			url:"../php/checkLogin.php",
			async:true,
			success:function(data){
				var data = JSON.parse(data);
				if(data.user!=false){
					if(value!=0){
						$(".side-bar").animate({right:"0"},1000)
					}else{
						alert("购物车为空，请先购物！")
						return false;
					}
				}else{
					if(confirm("是否登录")){
						window.location.href="login.html";
					}
				}
			}
		});
	})
//  右侧购物车
	$(".goodsBar .close").click(function(){
		$(".side-bar").animate({right:"-200px"},1000)
	})
	var shuliang = 0
	var goods = $.cookie("carts")? JSON.parse($.cookie("carts")):{};
	var id = goods.id;
	for(var i in goods){
		if(goods[i]){
			var a = '<a href="shopCar.html" target="_blank">'+
					'<dl>'+
						'<dt>'+
							'<img src='+goods[i].src+'>'+
						'</dt>'+
						'<dd>'+
							'<p>'+goods[i].proName+'</p>'+
							'<p>'+goods[i].proPrice+'</p>'+
							'<p>'+goods[i].proNum+'</p>'+
						'</dd>'+
					'</dl>'+
				'</a>';
			$(".goodsBar .xian").after(a);
			shuliang++;
		}
	}
	$("#shopCar .number").html(shuliang);
	$(".goodsBar .jiesuan").click(function(){
		window.location.href = "shopCar.html";
	})	
})	
	
 //  楼层轮播封装
function lunBo(obj,oPrev,oNext,aDiv,iTime){
	var oUl = getByClass(obj,"mobileFocus")[0];
	var aLi = oUl.getElementsByTagName("li");
	var oLiWidth = aLi[0].offsetWidth;
	var len = aLi.length;
	
	var iNow = 0;
	autoplay();
	function autoplay(){
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			iNow++;
			if(iNow == len){
				iNow = 0;
			}
			tab();
		},iTime);
	}
	if(oPrev!=""&&oNext!=""){
		oNext.onclick = function(){
			iNow++;
			if(iNow==len){
				iNow=0;
			}
			tab();
		}
		oPrev.onclick = function(){
			iNow--;
			if(iNow==-1){
				iNow = 2;
			}
			tab();
		}
	}
	obj.onmouseover = function(){
		clearInterval(obj.timer);
		oPrev.style.display = "block";
		oNext.style.display = "block";
	}
	obj.onmouseout = function(){
		autoplay();
		oPrev.style.display = "none";
		oNext.style.display = "none";
	}
	oPrev.onmouseover = function(){
		oPrev.style.background = "rgba("+160+","+157+","+157+","+0.8+")";
		oPrev.style.color = "#fff";
	}
	oPrev.onmouseout = function(){
		oPrev.style.background = "";
		oPrev.style.color = "#c0bbbb";
	}
	oNext.onmouseover = function(){
		oNext.style.background = "rgba("+160+","+157+","+157+","+0.8+")";
		oNext.style.color = "#fff";
	}
	oNext.onmouseout = function(){
		oNext.style.background = "";
		oNext.style.color = "#c0bbbb";
	}
	for(var i=0;i<aDiv.length;i++){
		aDiv[i].index = i;
		aDiv[i].onmouseover = function(){
			iNow = this.index;
			tab();
		}
	}
	function tab(){
		for(var i=0;i<aDiv.length;i++){
			aDiv[i].className = "";
		}
		aDiv[iNow].className = "active";
		var iLeft = -iNow*oLiWidth;  // 图片ul 移动的宽度
		startMove(oUl, {left: iLeft})
	}
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


