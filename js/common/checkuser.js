//  头部用户名
$(function(){
	$.ajax({
		type:"get",
		url:"../php/checkLogin.php",
		async:true,
		success:function(data){
			var data = JSON.parse(data);
			console.log(data)
			if(data.user!=false){
				$(".h_left .span1").hide();
				$(".h_left .span2").show();
				$(".h_left .span2").find("a:first-child").html(data.user)
			}else{
				$(".h_left .span1").show();
				$(".h_left .span2").hide();
				$(".h_left .span2").find("a:first-child").html("")
			}
		}
	});
	//  点击退出
	$(".h_left .span2").find("a:last-child").click(function(){
		$.ajax({
			type:"get",
			url:"../php/destroy.php",
			async:true,
			success:function(data){
				$(".h_left .span2").find("a:first-child").html("");
				$(".h_left .span1").show();
				$(".h_left .span2").hide();
			}
		});
	})
})