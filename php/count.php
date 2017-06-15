<?php
	header("content-type:text/html;chartset=utf-8");
	header("Access-Control-Allow-Origin:*");
	$fp = fopen("count.txt", "r");
	if(!isset($fp)){
		return true;
	}
	$num = fgets($fp,12);
	if($num==""){
		$num = 0;
	}else{
		$num++;
	}
	fclose($fp);
	$fp = fopen("count.txt", "w"); //以只写入方式打开count.txt文件
	fwrite($fp, $num);
	fclose($fp);
	$arr = array(
		"num"=>$num
	);
	echo json_encode($arr);
?>