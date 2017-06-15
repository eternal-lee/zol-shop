var regs = {
	userNameReg:/^(([\u4e00-\u9fa5])|[a-zA-Z0-9-_]){4,20}$/,
	pwdReg:/^[a-zA-Z0-9]{6,16}$/,
	numReg:/\d/,
	strReg:/^[a-zA-Z]$/,
	tsReg:/^[^\u4e00-\u9fa5a-zA-Z0-9]$/,
	emailReg:/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/,
	mobileReg:/^1[3|4|5|7|8]\d{9}$/
}
window.onload = function(){
	var oForm = document.getElementsByTagName("form")[0];
	var phoneNum = document.getElementById("phoneNum");
	var oCode = document.getElementById("code");
	var oCodeBtn = document.getElementById("codeBtn");
	var phoneCode = document.getElementById("phoneCode");
	var phoneCodeBtn = document.getElementById("phoneCodeBtn");
	var passWord = document.getElementById("password");
	var copyPassWord = document.getElementById("copyPassword");
	var checkBox = document.getElementById("checkbox");
	var oBtn = document.getElementById("btn");
//					var errorTip = document.getElementById("error_tip");
//  手机号 验证	
	phoneNum.onkeyup = phoneNum.onfocus = phoneNum.onblur = function(evt){
		var e = evt || window.event;
		checkPhoneNum(e);
	}
	function checkPhoneNum(_e){
		var type;
		if(_e){
			type = _e.type;
		}
		var errorTip = document.getElementById("error_tip1");
		var value = phoneNum.value;
		if(type == "blur"){
			if(value == ""){
				errorTip.className = "error_tip hide";
				return false;
			}
		}
		if(type == "focus"){
			if(value == ""){
				errorTip.className = "error_tip show";
				errorTip.innerHTML = "请输入手机号";
				return false;
			}
		}	
		if(value == ""){
			errorTip.className = "error_tip show";
			errorTip.innerHTML = "请输入手机号";
			return false;
		}else if(regs.mobileReg.test(value)){
			errorTip.className = "right_tip";
			errorTip.innerHTML = "";
			return true;
		}else{
			errorTip.className = "error_tip show";
			errorTip.innerHTML = "请输入正确的11位手机号";
			return false;
		}
	}
//  验证码	
	oCode.onkeyup = oCode.onfocus = oCode.onblur = function(evt){
		var e = evt || window.event;
		checkCode(e);
	}
	function checkCode(_e){
		var type;
		if(_e){
			type = _e.type;
		}
		var errorTip = document.getElementById("error_tip2");
		var value = oCode.value;
		if(type == "blur"){
			if(value == ""){
				errorTip.className = "error_tip hide";
				return false;
			}
		}
		if(type == "focus"){
			if(value == ""){
				errorTip.className = "error_tip error_tip2 show";
				errorTip.innerHTML = "请输入验证码";
				return false;
			}
		}
		if(value == ""){
			errorTip.className = "error_tip show";
			errorTip.innerHTML = "请输入验证码";
			return false;
		}else{
			$.ajax({
				type:"get",
				url:"../php/checkcode.php",
				async:true,
				data:{
					"code":$("#code").val()
				},
				success:function(data){
					var data = JSON.parse(data)
					if(data.status==0){
						errorTip.className = "right_tip";
						errorTip.innerHTML = "";
						return true;
					}else{
						errorTip.className = "error_tip show";
						errorTip.innerHTML = "请输入正确的验证码";
						return false;
					}
				}
			});
		}
	}
//  密码	
	passWord.onkeyup = passWord.onfocus = passWord.onblur = function(evt){
		var e = evt || window.event;
		checkPassWord(e);
	}
	function checkPassWord(_e){
		var type;
		if(_e){
			type = _e.type;
		}
		var errorTip = document.getElementById("error_tip4");
		var value = passWord.value;
		if(type == "blur"){
			if(value == ""){
				errorTip.className = "error_tip hide";
				return false;
			}
		}
		if(type == "focus"){
			if(value == ""){
				errorTip.className = "error_tip show";
				errorTip.innerHTML = "请输入密码";
				return false;
			}
		}	
		if(value == ""){
			errorTip.className = "error_tip show";
			errorTip.innerHTML = "请输入密码";
			return false;
		}else if(regs.pwdReg.test(value)){
			errorTip.className = "right_tip";
			errorTip.innerHTML = "";
			return true;
		}else{
			errorTip.className = "error_tip show";
			errorTip.innerHTML = "按提示输入正确的密码";
			return false;
		}
	}
// 再次输入密码
	copyPassWord.onkeyup = copyPassWord.onfocus = copyPassWord.onblur = function(evt){
		var e = evt || window.event;
		checkCopyPassWord(e);
	}
	function checkCopyPassWord(_e){
		var type;
		if(_e){
			type = _e.type;
		}
		var errorTip = document.getElementById("error_tip5");
		var value = copyPassWord.value;
		var _value = passWord.value;
		if(type == "blur"){
			if(value==""){
				errorTip.className = "error_tip hide";
				return false;
			}
		}
		if(type == "focus"){
			if(value==""){
				errorTip.className = "error_tip show";
				errorTip.innerHTML = "请再次输入密码";
				return false;
			}
		}
		if(value == ""){
			errorTip.className = "error_tip show";
			errorTip.innerHTML = "请再次输入密码";
			return false;
		}else if(value==_value){
			errorTip.className = "right_tip";
			errorTip.innerHTML = "";
			return true;
		}else{
			errorTip.className = "error_tip show";
			errorTip.innerHTML = "请输入正确的密码"
			return false;
		}
	}

//  点击注册 执行上面的 验证	
	var ck = document.getElementById("checkbox");
	var errorTip6 = document.getElementById("error_tip6");
	var oBtn = document.getElementById("btn");
	oBtn.onclick = function(){
		var ck = document.getElementById("checkbox");
		if(ck.checked){
			if(checkPhoneNum()&&checkPassWord()){
				$.ajax({
					type:"post",
					url:"../php/regist.php",
					async:true,
					dataType:"json",
					data:{
						"username":$("#phoneNum").val(),
						"pwd":$("#password").val()
					},
					success:function(data){
						if(data.status==0){
							alert(data.msg);
							window.location.href="login.html";
						}else{
							alert(data.msg);
						}
					}
				});
				return true;
			}else{
				return false;
			}
			errorTip6.className = "error_tip hide";
			return true;
		}else{
			errorTip6.className = "error_tip show";
			return false;
		}
	}
	ck.onclick = function(){
		if(!ck.checked){
			errorTip6.className = "error_tip show";
		}else{
			errorTip6.className = "error_tip hide";
		}
	}
	
//  注册时如果用户名存在则直接登录
	$("#phoneNum").keyup(function(){
		var errorTip = document.getElementById("error_tip1");
		var phoneValue = $(this).val();
		$.ajax({
			type:"get",
			url:"../php/checkName.php",
			async:true,
			data:{
				"username":$("#phoneNum").val()
			},
			success:function(data){
				var data = JSON.parse(data)
				if(data.status==0){
					alert(data.msg);
					$("#phoneNum").val("");
				}
			}
		});
	})	
	
// 查看密码
	$("#eye").mousedown(function(){
		$("#password").attr("type","text")
		$(this).attr("src","../img/regist/eye1.png")
	})
	$("#eye").mouseup(function(){
		$("#password").attr("type","password")
		$(this).attr("src","../img/regist/eye.png")
	})
} // window.onload  结束

