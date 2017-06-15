$(function(){
	$("#list li").click(function(){
		$(this).addClass("active").siblings().removeClass("active")
		$(this).find("ol").addClass("active").parent().siblings().find("ol").removeClass("active")
		$("#content div.table").eq($(this).index()).addClass("active").siblings().removeClass("active")
	})
	
	$("#list li ol.ol li").click(function(){
		var dataId = $(this).parent().closest("li").attr("dataId");
		$("#content").find("div#"+dataId).find("form").eq($(this).index()).addClass("active").siblings().removeClass("active")
	})
	
	setInterval(function() {
		var show = document.getElementById("show");
	    var time = new Date();
	    // 程序计时的月从0开始取值后+1
	    var t = num(time.getHours()) + ":" + num(time.getMinutes()) + ":" + num(time.getSeconds());
	    $("#show").html(t)
	}, 1000);
	function num(num){
		if(num<10){
			num = "0"+num
		}
		return num;
	}
	
	$("input[type=number]").keyup(function(){
		if($(this).val()<0){
			$(this).val("0");
		}
	})
	
	$("input[data-name=goods]").blur(function(){
		if($(this).val()!=""){
			$.ajax({
				type:"post",
				url:"doGoodsID.php",
				async:true,
				data:{
					"goodsID":$(this).val()
				},
				success:function(data){
					var data = JSON.parse(data)
					if(data.status==1){
						alert("商品名不存在，请重新输入")
						$("input[name=goodsID]").val("")
					}
				}
			});
		}
	})
	
	$("#select").click(function(){
			goodsSec();
	})
	$("#numId").keyup(function(e){
		if(e.keyCode==13){
			goodsSec()
		}
	})
	function goodsSec(){
		if($("#numId").val()!=""){
			$.ajax({
				type:"post",
				url:"doSelect.php",
				async:true,
				data:{
					"goodsID":$("#numId").val()
				},
				success:function(data){
					$("#newSec").show();
					var data = (JSON.parse(data)).msg
					var table = "<tr>"+
									"<td>"+data.goodsID+"</td>"+
									"<td>"+data.goodsName+"</td>"+
									"<td>"+data.goodsType+"</td>"+
									"<td>"+data.goodsNum+"</td>"+
									"<td>"+data.goodsInfo+"</td>"+
								 "</tr>";
					$("#newSec table").append(table);
				}
			});
		}
	}
})
