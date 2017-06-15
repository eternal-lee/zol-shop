var regs = {
	userNameReg:/^(([\u4e00-\u9fa5])|[a-zA-Z0-9-_]){4,20}$/,
	pwdReg:/^.{6,20}$/,
	numReg:/\d/,
	strReg:/^[a-zA-Z]$/,
	tsReg:/^[^\u4e00-\u9fa5a-zA-Z0-9]$/,
	emailReg:/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/,
	mobileReg:/^1[3|4|5|7|8]\d{9}$/,
	userReg:/^([\u4e00-\u9fa5]){4,20}$/
}
window.onload = function(){   

// 实现登录切换
	var oTab1 = document.getElementById("tab1");
	var loginForm = document.getElementById("loginForm");
	var oDiv = getByClass(loginForm,"login_com");
	var J_login_common = document.getElementById("J_login_common");
	var J_login_mobile = document.getElementById("J_login_mobile");

//  普通方式登录
	var oTxt1 = document.getElementById("txt1");
	var oTxt2 = document.getElementById("txt2");
	var error_tip = document.getElementById("error_tip");
	var tip1 = document.getElementById("tip1");
	var tip2 = document.getElementById("tip2");
	var loginBtn1 = document.getElementById("loginBtn1");
	var loginForm = document.getElementById("loginForm");
	//  手机号/邮箱/用户名
	oTxt1.onkeyup=oTxt1.onfocus=oTxt1.onblur = function(evt){
		var e = evt || window.event;
		checkUserName(e);
	}
	function checkUserName(_e){	
		var type;
		if(_e){
			type = _e.type;
		}
		var value = oTxt1.value;
		if(type == "blur"){
			if(oTxt1.value==""){
				error_tip.className = "error_tip hide";
				tip1.className = "tip1 hide";
				return false;
			}
		}
		
		if(value==""){
			error_tip.className = "error_tip hide";
			tip1.className = "tip1 hide";
			return false;
		}else if(regs.userReg.test(value)){
			error_tip.className = "error_tip hide";
			tip1.className = "tip1 show";
			return true;
		}else if(regs.emailReg.test(value)){
			error_tip.className = "error_tip hide";
			tip1.className = "tip1 show";
			return true;
		}else if(regs.mobileReg.test(value)){
			error_tip.className = "error_tip hide";
			tip1.className = "tip1 show";
			return true;
		}else{
			error_tip.className = "error_tip show";
			error_tip.innerHTML = "输入正确的手机号/邮箱/用户名";
			tip1.className = "tip1 hide";
			return false;
		}
	}
	oTxt2.onkeyup=oTxt2.onfocus=oTxt2.onblur = function(evt){
		var e = evt || window.event;
		checkPwd(e);
	}
	function checkPwd(_e){
		var type;
		if(_e){
			type = _e.type;
		}
		var value = oTxt2.value;
		if(type == "blur"){
			if(value==""){
				error_tip.className = "error_tip hide";
				tip2.className = "tip2 hide";
				return false;
			}
		}
		if(value==""){
			error_tip.className = "error_tip hide";
			tip2.className = "tip2 hide";
			return false;
		}else if(regs.pwdReg.test(value)){
			$("#error_tip").hide()
			tip2.className = "tip2 show";
			return true;
		}else{
			tip2.className = "tip2 hide";
			$("#error_tip").show()
			error_tip.innerHTML = "密码不正确";
			return false;
		}
	}
	
//	loginForm.onsubmit = function(){
	$(".txt").keyup(function(evt){
		var e = evt || window.event;
		if(e.which==13){
			var txtValue1 = $("#txt1").val();
			var txtValue2 = $("#txt2").val();
			login();
		}
	})
	loginBtn1.onclick = function(){
		var txtValue1 = $("#txt1").val();
		var txtValue2 = $("#txt2").val();
		login();
	}
	function login(){
		if(checkUserName()&&checkPwd()){
			$.ajax({
				type:"get",
				url:"../php/login.php",
				data:{
					"username":$("#txt1").val(),
					"password":$("#txt2").val()
				},
				beforeSend:function(){
					$("input[type=button]").val("登录中...")
				},
				async:true,
				success:function(data){
					var data = JSON.parse(data)
					if(data.status==0){
						$.ajax({
							type:"post",
							url:"../php/saveUser.php",
							async:true,
							data:{
								"username":$("#txt1").val(),
								"password":$("#txt2").val()
							},
							success:function(data){
								var data = JSON.parse(data);
								if(data.status==0){
									window.location.href="index.html";
									return true;
								}else{
									alert(data.msg);
								}
							}
						});
					}else{
						$("#error_tip").show()
						error_tip.innerHTML = "登陆失败，用户名或密码错误";
						$("#txt1").focus();
						$("#tip1").hide();
						$("#tip2").hide()
						return false;
					}
				},
				complete:function(){
					$("input[type=button]").val("登录")
					$("#txt1").val("");
					$("#txt2").val("");
				}
			});
		}else{
			error_tip.className = "error_tip show";
			error_tip.innerHTML = "登陆失败，用户名或密码错误";
			return false;
		}
	}
	
	$("#txt1").blur(function(){
		var errorTip = document.getElementById("tip1");
		var phoneValue = $(this).val();
		if($(this).val()!=""){
			$.ajax({
				type:"get",
				url:"../php/checkName.php",
				async:true,
				data:{
					"username":$("#txt1").val()
				},
				success:function(data){
					var data = JSON.parse(data)
					if(data.status==1){
						alert("用户不存在，请注册登录！");
						tip1.className = "error_tip hide";
						$("#txt1").val("");
						$("#txt2").val("");
					}
				}
			});
		}
	})	
}	
/**********    普通方式登录结束       ***********/  	
	
