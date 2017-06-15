<?php
	header('content-Type:text/html;chartset=utf8');
	header("Access-Control-Allow-Origin:*"); //允许任何访问(包括ajax跨域) 
	session_start();
//	echo $_SESSION['username'];
	if(!isset($_SESSION['username'])){
		$res = array(
			'status' => 0,
			'msg'    => "销毁成功！"
		);
		echo json_encode($res);
		exit();
	}
	session_destroy();
?>