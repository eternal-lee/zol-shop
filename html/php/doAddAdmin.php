<?php
	include_once "conn.php";
	include_once "fn.php";
	$username = $_POST["username"]?$_POST["username"]:"";
	$password = $_POST["password"]?$_POST["password"]:"";
	$email = $_POST["email"]?$_POST["email"]:"";
	if($username!="" && $password!="" && $email!=""){
		$sqlSec = "select * from admin where username='".$username."'";
		$query = @mysqli_query($conn, $sqlSec);
		$rows = @mysqli_fetch_array($query);
		if(isset($rows)){    //若存在则更新里面的number OK
			alertMes("管理员已存在", "addAdmin.php");
		}else{    //否则 重新插入新数据
			$sql = "insert into admin(username,password,email) values('".$username."','".$password."','".$email."')";
		}
	}else{
		alertMes("不能为空", "addAdmin.php");
	}
	$query = @mysqli_query($conn, $sql);
	if($query){
		alertMes("ok", "login.php");
	}
?>
