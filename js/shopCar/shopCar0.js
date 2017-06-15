$(function(){
	var goods = $.cookie("carts")? JSON.parse($.cookie("carts")) : {};
	var total = 0;
	var jianshu = 0;
	for(var i in goods){
		if(goods[i]){	
			$(".shopcar-tip").hide();
			$("#form").show();
			var shuliang = Number(goods[i].proNum);
			var danjia = Number(goods[i].proPrice);
			var xiaoji = shuliang*danjia;
			var tr = '<tr rel="goods-order" id="goods-order" data-id='+goods[i].id+'>'+
						'<td colspan="2" class="s-infor">'+
							'<input type="checkbox" checked name="subBox" id="checkbox1">'+
							'<a href="goodDetail.html" class="pic">'+
								'<img src='+goods[i].src+'>'+
							'</a>'+
							'<div class="inforbox">'+
								'<h3 class="tit">'+
									'<a href="##">'+goods[i].proName+'</a>'+
								'</h3>'+
							'</div>'+
						'</td>'+
						'<td class="s-price">'+
							'<em>'+goods[i].proPrice+'</em>'+
						'</td>'+
						'<td class="s-amount">'+
							'<div class="buy-num">'+
								'<a href="javascript:" class="minus">-</a>'+
								'<input type="text" class="text-amount" value='+goods[i].proNum+' readonly="readonly">'+
								'<a href="javascript:" class="plus">+</a>'+
							'</div>'+
						'</td>'+
						'<td class="s-agio">'+
							'<div>--</div>'+
						'</td>'+
						'<td class="s-total">'+
							'<em>'+xiaoji+'</em>'+
						'</td>'+
						'<td class="s-del">'+
							'<div class="s-delbox">'+
								'<a href="javascript:" id="like">移入收藏夹</a>'+
								'<a href="javascript:" id="removeGood">删除</a>'+
							'</div>'+
						'</td>'+			
				  '</tr>'
			$("#tbody").append(tr);
				jianshu++;
				total += xiaoji; 
			$("#jianshu").html(jianshu);
			$("#goods-order #checkbox1").each(function(){
				if($(this).attr("checked")){
					$(".total-cart-price").html(total);
				}else{
					var xiaoji0 = $(this).siblings().find(".s-total em").html();
					console.log(xiaoji0)
					total -= xiaoji0;
					$(".total-cart-price").html(total);
				}
			})	
		}else{
			$(".shopcar-tip").show();
			$("#form").hide();
			return false;
		}
	}
// 购物车 数量
	var goods = $.cookie("carts")?JSON.parse($.cookie("carts")):{};
	if(goods){
		for(var i in goods){
			jianshu++;
		}
		$(".number").html(jianshu);
	}else{
		$(".number").html(0);
	}	
// 数量--	
	$(".minus").click(function(){
		var num = $(this).siblings("input").val();
		num--;
		var goods = JSON.parse($.cookie("carts"));
		var id = $(this).closest("tr").attr("data-id");		
		$(this).siblings("input").val(num);
		
		if(num==0){
			$(this).closest("tr").remove();
			var total1 = Number($(".total-cart-price").html());
			var total2 = total1 - Number(goods[id].proPrice);
			$(".total-cart-price").html(total2);
			
			delete goods[id];
			if(JSON.stringify(goods)!="{}"){
				$.cookie("carts", JSON.stringify(goods), {expires: 7, path: "/"});
				$(".shopcar-tip").hide();
				$("#form").show();
			}else{
				$.cookie("carts", "", {expires: -1, path: "/"})
				$(".shopcar-tip").show();
				$("#form").hide();
			}
			// 件数
			var jianshu = Number($("#jianshu").html())-1;
			$("#jianshu").html(jianshu);
		}else{
			$(this).siblings("input").val(num);
			//  改变 总支付额
			var price = Number(goods[id].proPrice);
			var money1 = $(".s-total em").html();
			var money2 = money1 - price;
			$(this).closest("td").siblings(".s-total").find("em").html(money2);
			var total1 = Number($(".total-cart-price").html());
			var total2 = total1 - Number(goods[id].proPrice);
			$(".total-cart-price").html(total2);
			//改变cookie
			goods[id].proNum=num;		
			$.cookie("carts", JSON.stringify(goods), {expires: 7, path: "/"})
		}
	})
	
// 数量++ 	 
	$(".plus").click(function(){
		var num =parseInt($(this).siblings("input").val());
		num=num+1;
		var goods = JSON.parse($.cookie("carts"));
		var id = $(this).closest("tr").attr("data-id");
		
		$(this).siblings("input").val(num);
		goods[id].proNum=num;		
		$.cookie("carts", JSON.stringify(goods), {expires: 7, path: "/"})
		
		var money1 = $(".total-cart-price").val();
		var money2 = money1 + goods[id].proPrice*num;
		$(this).closest("td").siblings(".s-total").find("em").html(money2);
		var total1 = Number($(".total-cart-price").html());
		var total2 = total1 + Number(goods[id].proPrice);
		$(".total-cart-price").html(total2);
	//  判断 checked 是否被选中
	})
//  移出 单个 购物车物品
	$("tr .s-del").find("#removeGood").click(function(){
		$(this).closest("tr").remove();
		var goods = JSON.parse($.cookie("carts"));
		var id = $(this).closest("tr").attr("data-id");
		var goodPrice = Number(goods[id].proPrice);
		var goodNum = Number(goods[id].proNum);
		// 件数
		var jianshu = Number($("#jianshu").html())-1;
		$("#jianshu").html(jianshu);
		//下面的付款总金额 改变
		var palyMoney1=$('.total-cart-price').html(); 
		var palyMoney2 = Number(palyMoney1)-goodPrice*goodNum;
		$(".total-cart-price").html(palyMoney2);
		//删除cookie
		delete goods[id];
		if(JSON.stringify(goods)!="{}"){
			$.cookie("carts", JSON.stringify(goods), {expires: 7, path: "/"});
			$(".shopcar-tip").hide();
			$("#form").show();
		}else{
			$.cookie("carts", "", {expires: -1, path: "/"})
			$(".shopcar-tip").show();
			$("#form").hide();
		}
	
		$.cookie("carts", JSON.stringify(goods), {expires: 7, path: "/"});
	})
// 加入收藏
	$("tr .s-del").find("#like").click(function(){
		var goods = $.cookie("carts")? JSON.parse($.cookie("carts")) : {};
		var id = $(this).closest("tr").attr("data-id");
		var like = {
			id:id,
			name:goods[id].proName,
			imgSrc:goods[id].src
		}
		$.cookie("like",JSON.stringify(like),{expires:7,path:"/"})
		var likes = $.cookie("like")?JSON.parse($.cookie("like")):{}
		var tr = '<tr rel="goods-order" id="goods-order" data-id='+goods[id].id+'>'+
							'<td colspan="2" class="s-infor">'+
								'<a href="goodDetail.html" class="pic">'+
									'<img src='+goods[id].src+'>'+
								'</a>'+
								'<div class="inforbox">'+
									'<h3 class="tit">'+
										'<a href="##">'+goods[id].proName+'</a>'+
									'</h3>'+
								'</div>'+
							'</td>'
		$(".modgoods-list").append(tr);
		var like = {
			name:goods[id].proName,
			imgSrc:goods[id].src
		}
		$.cookie("like",JSON.stringify(like),{expires:7,path:"/"})
	})
//全选 
	$("#checkAll").click(function(){
		if($(this).prop('checked')){
			$('[name=subBox]:checkbox').prop('checked','true');
			var price = 0;
			$('[name=subBox]:checkbox').closest("tr").each(function(){
				price += Number($(this).find(".s-total em").html());
			})
			$(".total-cart-price").html(price)
		}else{
			$('[name=subBox]:checkbox').prop('checked','');
			$(".total-cart-price").html(0)
		}
	})  
// 单选
	$('[name=subBox]:checkbox').click(function(){
		$("#checkAll").prop("checked","")
		var price = Number($(this).parent().siblings(".s-total").find("em").html());
		if($(this).is(":checked")){
			var total = Number($(".total-cart-price").html());
			$(".total-cart-price").html(total+price)
		}else{
			var total = Number($(".total-cart-price").html());
			$(".total-cart-price").html(total-price)
		}
	})
	$('[name=subBox]:checkbox').each(function(){
		if($('[name=subBox]:checkbox').prop('checked',"true")){
			$("#checkAll").prop("checked","true")
		}else{
			$("#checkAll").prop("checked","")
		}
	})
// 清除购物车	
	$("#allRemove").click(function(){
		$(".shopcar-tip").show();
		$("#form").hide();
		$(".total-cart-price").html("");
		$.cookie("carts",null,{expires:-1,path:"/"})
	})
// 结算	
	$(".accounting-btn").click(function(){
		var value = $(".total-cart-price").html();
		jiesuan = {
			totalPrice:value
		}
		$.cookie("pay",JSON.stringify(jiesuan));
		
		$.ajax({
			type:"get",
			url:"../php/checkLogin.php",
			async:true,
			success:function(data){
				var data = JSON.parse(data);
				if(data.user!=false){
					if(value!=0){
						window.location.href = "pay.html";
					}else{
						alert("请选择所需支付的商品")
					}
				}else{
					if(confirm("是否登录")){
						window.location.href="login.html";
					}
				}
			}
		});
	})
})


