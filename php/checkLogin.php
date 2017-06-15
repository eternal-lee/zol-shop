<?php
	header('Content-Type:text/html;charset=utf-8');
	header("Access-Control-Allow-Origin:*"); //允许任何访问(包括ajax跨域) 
	session_start();
	if(isset($_SESSION['username'])){
		$res = array(
			'status' => 0,
			'user'   => $_SESSION['username']
		);
		echo json_encode($res);
		exit();
	}else{
		$res = array(
			'status' => 1,
			'user'   => false
		);
		echo json_encode($res);
		exit();
	}
?>