<?php
	header('Content-Type:text/html;charset=utf-8');
	header("Access-Control-Allow-Origin:*"); //允许任何访问(包括ajax跨域) 
	include_once "conn.php";
	
	$username = $_GET['username']?$_GET['username']:"";
//	$username = 123;
//	$password = 123456;
	$sql = "delete from register where user='".$username."'";
	$sql1 = "delete from loginuser where username='".$username."'";
	$query = @mysqli_query($conn, $sql);
	$query1 = @mysqli_query($conn, $sql1);
	if($query&&$query1){
		$res = array(
			"status"=>0,
			"msg"=>"注销成功"
		);
		echo json_encode($res);
	}else{
		$res = array(
			"status"=>1,
			"msg"=>"注销失败"
		);
		echo json_encode($res);
	}
?>