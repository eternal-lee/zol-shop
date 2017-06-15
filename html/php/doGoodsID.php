<?php
	include_once "conn.php";
	include_once "fn.php";
	$goodsID = $_POST["goodsID"]?$_POST["goodsID"]:"";
	if($goodsID!=""){
		$sql = "select * from product where goodsID='".$goodsID."'";
	}
	$res = @mysqli_query($conn, $sql);
	$query = @mysqli_fetch_array($res);
	if($query){
		$arr = array(
			"status"=>0,
			"msg"=>"success"
		);
		echo json_encode($arr);
	}else{
		$arr = array(
			"status"=>1,
			"msg"=>"error"
		);
		echo json_encode($arr);
	}
?>