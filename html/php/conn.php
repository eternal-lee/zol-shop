<?php
	header('Content-Type:text/html;charset=utf-8');
	header("Access-Control-Allow-Origin:*"); //允许任何访问(包括ajax跨域) 
	$host = "localhost";
	$user = "root";
	$pwd = "";
	$conn = @mysqli_connect($host, $user, $pwd) or die("sql连接失败！");
	@mysqli_query("set names utf8");
	@mysqli_select_db($conn, "regist") or die("数据库链接失败");
?>