<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>添加管理员</title>
	<style>
		*{margin: 0;padding:0;}
		body{
			background:url(../../img/php/img2.png) no-repeat right top;
			background-size:100%;
		}
		a{text-decoration:none;}
		h1{
			line-height:2.5em;
		}
		h1 span{
			font-size:16px;
		}
		table tr td{
			padding:6px 15px 6px 6px;
		}
		table tr td input{
			height:30px;
		}
	</style>
</head>
<body>
	<h1>添加管理员 <span>已存在管理员，直接登录<a href="login.php">登&nbsp;录</a></span></h1>
	<form action="doAddAdmin.php" method="post">
		<table width="600" border="1" cellpadding="0" cellspacing="0" bgcolor="#cccccc">
			<tr>
				<td align="right">管理员名称</td>
				<td><input type="text" name="username" placeholder="请输入管理员名称"/></td>
			</tr>
			<tr>
				<td align="right">管理员密码</td>
				<td><input type="password" name="password" placeholder="请输入管理员密码"/></td>
			</tr>
			<tr>
				<td align="right">管理员邮箱</td>
				<td><input type="text" name="email" placeholder="请输入管理员邮箱"/></td>
			</tr>
			<tr>
				<td colspan="2" align="center"><input type="submit"  value="添加管理员"/></td>
			</tr>
		</table>
	</form>
</body>
</html>