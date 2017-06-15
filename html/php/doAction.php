<?php
	include_once "conn.php";
	include_once "fn.php";
	session_start();
	$act = $_REQUEST["act"];
	/*---商品信息---*/
	$goodsID = $_POST["goodsID"];
	$newGoodsID = $_POST["newGoodsID"];
	$goodsName = $_POST["goodsName"];
	$goodsType = $_POST["goodsType"];
	$goodsNum = $_POST["goodsNum"];
	$goodsInfo = $_POST["goodsInfo"];
	/*--用户信息--*/
	$userName = $_POST['userName'];
	$userPwd = $_POST['userPwd'];
	/*--管理员信息--*/
	$adminName = $_POST['adminName'];
	$adminPwd = $_POST['adminPwd'];
	$adminEmail = $_POST['adminEmail'];
	/*--act 判断--*/
	if($act=="quit"){
		unset($_SESSION["loginName"]);
		alertMes("已退出", "login.php");
	}else if($act=="addGoods"){
		if($goodsID!=""&&$goodsName!=""&&$goodsType!=""&&$goodsNum!=""&&$goodsInfo!=""){
			$sql = "insert into product(goodsID,goodsName,goodsType,goodsNum,goodsInfo) values('".$goodsID."','".$goodsName."','".$goodsType."','".$goodsNum."','".$goodsInfo."')";
			$query = @mysqli_query($conn,$sql);
			if($query){
				alertMes("添加成功", "index.php");
			}else{
				alertMes("添加失败", "index.php");
			}
		}else{
			alertMes("填写完整", "index.php");
		}	
	}else if($act=="deleteGoods"){
		$sql = "delete from product where goodsID='".$goodsID."'";
		$query = @mysqli_query($conn, $sql);
		if($query){
			alertMes("删除成功", "index.php");
		}	
	}else if($act=="updateGoods"){
		if($goodsID!=""){
			if($newGoodsID==""&&$goodsName==""&&$goodsType==""&&$goodsNum==""&&$goodsInfo==""){
				alertMes("请填写需要修改的内容", "index.php");
			}else{
				if($goodsName!=""){
					$sql0 = "update product set goodsName='".$goodsName."' where goodsID='".$goodsID."'";
				}
				if($goodsType!=""){
					$sql1 = "update product set goodsType='".$goodsType."' where goodsID='".$goodsID."'";
				}
				if($goodsNum!=""){
					$sql2 = "update product set goodsNum='".$goodsNum."' where goodsID='".$goodsID."'";
				}
				if($goodsInfo!=""){
					$sql3 = "update product set goodsInfo='".$goodsInfo."' where goodsID='".$goodsID."'";
				}
				if($newGoodsID!=""){
					$sql4 = "update product set goodsID='".$newGoodsID."' where goodsID='".$goodsID."'";
				}
				$query0 = @mysqli_query($conn, $sql0);
				$query1 = @mysqli_query($conn, $sql1);
				$query2 = @mysqli_query($conn, $sql2);
				$query3 = @mysqli_query($conn, $sql3);
				$query4 = @mysqli_query($conn, $sql4);
				if($query0||$query1||$query2||$query3||$query4){
					alertMes("修改成功", "index.php");
				}
			}
		}
	}else if($act=="addUser"){
		$sqlSec = "select * from register where user='".$userName."'";
		$querySec = @mysqli_query($conn,$sqlSec);
		$row = @mysqli_fetch_array($querySec);
		if(!isset($row)){
			$sql = "insert into register(user,pwd) values('".$userName."','".$userPwd."')";
			$query = @mysqli_query($conn, $sql);
			if($query){
				alertMes("添加成功", "index.php");
			}
		}else{
			alertMes("用户名已存在","index.php");
		}	
	}else if($act=="updateUser"){
		$sqlSec = "select * from register where user='".$userName."'";
		$querySec = @mysqli_query($conn,$sqlSec);
		$row = @mysqli_fetch_array($querySec);
		if(!isset($row)){
			alertMes("用户名不存在","index.php");
		}else{
			$sql = "update register set pwd='".$userPwd."' where user='".$userName."'";
			$query = @mysqli_query($conn, $sql);
			if($query){
				alertMes("修改成功", "index.php");
			}
		}
		
	}else if($act=="addAdmin"){
		$sqlSec = "select * from admin where username='".$adminName."'";
		$querySec = @mysqli_query($conn, $sqlSec);
		$row = @mysqli_fetch_array($querySec);
		if(isset($row)){
			alertMes("管理员存在", "index.php");
		}else{
			$sql = "insert into admin(username,password,email) values('".$adminName."','".$adminPwd."','".$adminEmail."')";
			$query = @mysqli_query($conn, $sql);
			if($query){
				alertMes("添加成功", "index.php");
			}
		}
	}else if($act=="updateAdmin"){
		$sqlSec = "select * from admin where username='".$adminName."'";
		$query = @mysqli_query($conn, $sqlSec);
		$row = @mysqli_fetch_array($query);
		if(!isset($row)){
			alertMes("管理员不存在", "index.php");
		}else{
			if($adminPwd!=""){
				$sql0 = "update admin set password='".$adminPwd."' where username='".$adminName."'";
			}
			if($adminEmail!=""){
				$sql1 = "update admin set email='".$adminEmail."' where username='".$adminName."'";
			}
			$query0 = @mysqli_query($conn, $sql0);
			$query1 = @mysqli_query($conn, $sql1);
			if($query0||$query1){
				alertMes("管理员修改成功", "index.php");
			}
		}
	}
?>
