<?php
session_start();
$img = imagecreatetruecolor(100, 50);
$black = imagecolorallocate($img, 0x00, 0x00, 0x00);
$green = imagecolorallocate($img, 0x00, 0xFF, 0x00);
$white = imagecolorallocate($img, 0xFF, 0xFF, 0xFF);
imagefilledrectangle($img, 0, 0, 100, 50, $white);
//生成随机的验证码
$str = join("",array_merge(range("a", "z"),range(0, 9),range("A", "Z")));
$newStr = "";
for($i = 0; $i < 4; $i++) {
	$angle = rand(-20, 20);
	$x = 10+$i*20;
	$y = 35;
	$color = imagecolorallocate($img, rand(0, 255), rand(0, 255), rand(0, 255));
	$fontfile = "trebucbd.ttf";
	// 中文截取时 用mb_substr
   	$text = substr($str, rand(0, strlen($str)),1);
	imagettftext($img, 20, $angle, $x, $y, $color, $fontfile, $text);
	$newStr .= $text;
}
$_SESSION['code'] = $newStr;
//加入噪点干扰
for($i=0;$i<50;$i++) {
  imagesetpixel($img, rand(0, 100) , rand(0, 100) , $black); 
  imagesetpixel($img, rand(0, 100) , rand(0, 100) , $green);
}
//输出验证码
header("content-type: image/png");
imagepng($img);
imagedestroy($img);
?>