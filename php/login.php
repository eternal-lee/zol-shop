<?php
	header('Content-Type:text/html;charset=utf-8');
	header("Access-Control-Allow-Origin:*"); //允许任何访问(包括ajax跨域) 
	include_once "conn.php";
	
	$username = $_GET['username']?$_GET['username']:"";
	$password = $_GET['password']?$_GET['password']:"";
//	$username = "13222222222";
//	$password = "123456";
	
	$sql = "select * from register where user='".$username."' and pwd='".$password."'";
	$query = @mysqli_query($conn, $sql);
	$rows = @mysqli_fetch_array($query);
	//print_r($rows);
	if($rows){
		$ret = array(
			"status" => 0,
			"msg"    => "用户和密码输入正确"
		);
		echo json_encode($ret);
		exit();
	}else{
		$ret = array(
			"status" => 1,
			"msg"    => "用户和密码输入不正确"
		);
		echo json_encode($ret);
		exit();
	}
	
?>