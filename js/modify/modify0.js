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
	var phoneCodeBtn = document.getElementById("phoneCodeBtn");
	var passWord = document.getElementById("password");
	var copyPassWord = document.getElementById("copyPassword");

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
		}
	}

//  修改密码 执行上面的 验证	
	$("#btn1").click(function(){
		if(checkPhoneNum()&&checkPassWord()&&checkCopyPassWord()){ //加上 checkCode()不执行后面的
			$.ajax({
				type:"get",
				url:"../php/modify.php",
				async:true,
				data:{
					"username":$("#phoneNum").val(),
					"password":$("#password").val()
				},
				success:function(data){
					console.log(data)
					var data = JSON.parse(data)
					if(data.status==0){
						alert(data.msg);
					}else{
						alert(data.msg);
					}
				}
			});
			return true;
		}
	})
// 注销账号
	$("#btn2").click(function(){
		if(checkPhoneNum()){
			$.ajax({
				type:"get",
				url:"../php/delete.php",
				async:true,
				data:{
					"username":$("#phoneNum").val()
				},
				success:function(data){
					var data = JSON.parse(data)
					if(data.status==0){
						alert(data.msg);
					}else{
						alert(data.msg)
					}
				}
			});
		}
	})

	
//判断用户是否存在  存在则 修改密码 不存在则注册
	$("#phoneNum").blur(function(){
		if($("#phoneNum").val()!=""){	
			$.ajax({
				type:"get",
				url:"../php/checkName.php",
				async:true,
				data:{
					"username":$("#phoneNum").val()
				},
				success:function(data){
					var data = JSON.parse(data)
					if(data.status==1){
						alert("用户不存在，请重新注册！");
						$("#phoneNum").val("");
						window.location.href="regist.html";
					}
				}
			})
		}else{
			return false;
		}
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

