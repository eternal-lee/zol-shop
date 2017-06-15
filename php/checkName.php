<?php
	header('Content-Type:text/html;charset=utf-8');
	header("Access-Control-Allow-Origin:*"); //允许任何访问(包括ajax跨域) 
	include_once "conn.php";
	
	$name = $_GET['username']?$_GET['username']:"";
//	$name = "13465465465";
//	echo $name;
	$sql = "select * from register where user='".$name."'";
	$res = @mysqli_query($conn, $sql);
	$query = @mysqli_fetch_array($res);
//	print_r($query);
	if($query){
		$ret = array(
			"status"=>0,
			"msg"=>"用户已经存在，请重新输入"
		);
		echo json_encode($ret);
		exit();
	}
	else{
		$ret = array(
			"status"=>1,
			"msg"=>"用户不存在，可以继续注册"
		);
		echo json_encode($ret);
		exit();
	}
	
?>