$(function(){
	var total = $.cookie("pay")?JSON.parse($.cookie("pay")):false;
//	console.log(total)  //{totalPrice: "25348"}
	if(total){
		var price = total.totalPrice
	//	console.log(price)
		$(".goods-total-price").html("￥"+price);
	}else{
		$(".goods-total-price").html("￥0");
	}
	$(".submit-btn").click(function(){
		var value = $(".goods-total-price").html();
	//	console.log(value)
		if(value!="￥0"){
			$(".pay").show();
		}else{
			$(".pay").hide();
		}
	})
	$(".pay .close").click(function(){
		$(".pay").hide();
	})
	
	// 获取地址
	var address = '';
	//   获取省份
	var provice = nc_a[0];
	for(var i=0;i<provice.length;i++){
		var cont = '<option value='+provice[i][0]+'>'+provice[i][1]+'</option>';
		$("#Cont").append(cont);
	}
	
	//  获取  城市
	$("#Cont").change(function(){
		if($("#Cont").val()==0){
			$("#City").attr("disabled",true)
			$("#Sent").attr("disabled",true)
			$("#City").html("<option value='0'>---请选择城市---</option>")
			$("#Sent").html("<option>---请选择区/镇---</option>")
		}else{
			$("#City").html("<option value='0'>---请选择城市---</option>")
			$("#Sent").html("<option>---请选择区/镇---</option>");
			var contVal = $("#Cont").val();
			$("#City").attr("disabled",false)
			$("#Sent").attr("disabled",true)
			var cityArr = nc_a[contVal]
			for(var i=0;i<cityArr.length;i++){
				var city = '<option value='+cityArr[i][0]+'>'+cityArr[i][1]+'</option>';
				$("#City").append(city)
			}
		}
	})
	//  获取市区/镇
	$("#City").change(function(){
		if($("#City").val()==0){
			$("#Sent").attr("disabled",true)
			$("#Sent").html("<option value='0'>---请选择区/镇---</option>");
		}else{
			$("#Sent").html("<option value='0'>---请选择区/镇---</option>");
			var cityVal = $("#City").val();
			$("#Sent").attr("disabled",false);
			var sentArr = nc_a[cityVal];
			if(sentArr==undefined){
				console.log(11)
				$(".label2").addClass("hide");
			}else{
				$(".label2").removeClass("hide");
				for(var i=0;i<sentArr.length;i++){
					var sent = '<option>'+sentArr[i][1]+'</option>'
					$("#Sent").append(sent);
				}
			}
		}
	})
	
})
