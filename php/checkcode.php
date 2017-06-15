<?php
	header("content-type:text/html;charset=utf8");
	header("Access-Control-Allow-Origin:*"); //允许任何访问(包括ajax跨域) 
	session_start();
	$code = $_SESSION['code'];
	$newCode = $_GET['code']?$_GET['code']:"";
	if(strtolower($code)==$newCode || strtoupper($code)==$newCode){
		$res = array(
			"status" =>0,
			"msg"	   =>"验证码正确"
		);
		echo json_encode($res);
		exit();
	}else{
		$res = array(
			"status" =>1,
			"msg"	   =>"验证码不正确"
		);
		echo json_encode($res);
		exit();
	}
?>