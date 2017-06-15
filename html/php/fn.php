<?php
	header("content-Type:text/html;chartset=utf-8");
	function alertMes($mes,$url){
		echo "<script>alert('{$mes}');</script>";
		echo "<script>window.location='{$url}';</script>";
	}
?>