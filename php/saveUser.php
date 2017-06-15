<?php
	header('Content-Type:text/html;charset=utf-8');
	header("Access-Control-Allow-Origin:*"); //允许任何访问(包括ajax跨域) 
	include_once "conn.php";
	
	session_start();
	$username = $_POST['username']?$_POST['username']:"";
	$password = $_POST['password']?$_POST['password']:"";
//	$username = "18381306207";
//	$password = "123456";
	// 先查询是否存在条件 $username  $password  若存在则更新里面的number 否则 重新插入新数据
	$sqlSec = "select * from loginuser where username='".$username."' and pwd='".$password."'";
	$query = @mysqli_query($conn,$sqlSec);
	//$rows = @mysqli_num_rows($query);  //条数 
	$rows = @mysqli_fetch_array($query);
	if(isset($rows)){    //若存在则更新里面的number 
		$sql = "update loginuser set number=number+1 where username='".$username."' and pwd='".$password."'";
	}else{    //否则 重新插入新数据
		$sql = "insert into loginuser(username,pwd) values('".$username."','".$password."')";
	}
	$res = @mysqli_query($conn,$sql);
	$_SESSION['username'] = $username;
	if($res) { //成功
	    $ret = array(
	        'status' => 0, // 0成功，1失败
	        'msg'   => '登录成功！'
	    );
	    echo json_encode($ret);
	    exit();
	} else { //失败
	    $ret = array(
	        'status' => 1, // 0成功，1失败
	        'msg'   => '登录失败！'
	    );
	    echo json_encode($ret);
	    exit();
	}
	session_destroy();
	
?>