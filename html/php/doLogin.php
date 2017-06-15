<?php
	include_once "conn.php";
	include_once "fn.php";
	session_start();
	$username = $_POST["username"]?$_POST["username"]:"";
	$password = $_POST["password"]?$_POST["password"]:"";
	$check = $_POST["user"]?$_POST["user"]:"";
	if($check=="admin"){	
		if($username!="" && $password!=""){
			$sql = "select * from admin where username='".$username."' and password='".$password."'";
		}else{
			alertMes("请填写用户名或密码", "login.php");
		}
	}else{
		alertMes("欢迎你，".$check, "login.php");
	}	
	$query = @mysqli_query($conn, $sql);
	$rows = @mysqli_fetch_array($query);
	if($rows){
		$_SESSION["loginName"] = $username;
		//echo "<br/>".$_SESSION["username"];
		header("location:index.php");
	}else{
		alertMes("用户名或密码错误", "login.php");
	}
	
?>
