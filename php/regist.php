<?php
	header('Content-Type:text/html;charset=utf-8');
	header("Access-Control-Allow-Origin:*"); //允许任何访问(包括ajax跨域) 
	include_once "conn.php";

	$username = $_POST['username'];
	$pwd = $_POST['pwd'];
	$sql = "insert into register(user,pwd) values('".$username."', '".$pwd."')";
	$res = @mysqli_query($conn, $sql);
	
	if($res) { //成功
	    $ret = array(
	        'status' => 0, // 0成功，1失败
	        'msg'   => 'success'
	    );
	    echo json_encode($ret);
	    exit();
	} else { //失败
	    $ret = array(
	        'status' => 1, // 0成功，1失败
	        'msg'   => 'failed'
	    );
	    echo json_encode($ret);
	    exit();
	}
?>