<?php
	header("content-Type:text/html;chartset=utf-8");
	header("Access-Control-Allow-Oringin:*");
	include_once "conn.php";
	$goodsID = $_POST['goodsID']?$_POST['goodsID']:"";
	if($goodsID!=""){
		$sql = "select * from product where goodsID='".$goodsID."'";
	}
	$query = @mysqli_query($conn, $sql);
	$row = @mysqli_fetch_array($query);
	if(isset($row)) {
		$arr = array(
			"msg"=>$row
		);			
		echo json_encode($arr);
	}
?>