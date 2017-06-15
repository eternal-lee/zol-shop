<!DOCTYPE html>
<html>
	<head>
		<title>后台管理登录界面</title>
		<meta content="text/html" charset="utf-8"/>
		<link rel="shortcut icon" type="image/icon" href="../../img/title.ico"/>
		<style>
			*{margin:0;padding:0;}
			/*html,body{height:100%;width:100%;}*/
			body{
				background:url(../../img/php/bg_2.jpg) no-repeat;
				background-size:cover;
			}
			a{text-decoration:none;color:#0ff;}
			#box{
				margin:200px auto 0;
				width:400px;
				height:380px ;
				background:#fff;
			}
			header{
				color:#fff;
				text-align:center;
				border-bottom:1px dashed #0074D9;
				padding-bottom:15px;
				background:#0a4dab;
			}
			form{text-align: center;}
			label{
				display:inline-block;
				padding:15px 0 6px 0;
				font-size:22px;
				vertical-align:middle;
			}
			label input{
				height:30px;
				outline:none;
				padding:6px;
			}
			.btn{margin-top:10px;}
			.btn input{
				height:30px;
				width:60px;
				margin-right:15px;
			}
			.clear label{
				display:inline;
				vertical-align:middle;
			}
			.clear label input{
				height:13px;
			}
		</style>
	</head>
	<body>
		<div id="box">
			<header>
				<img src="../../img/php/admin.png"/>
				<h1>欢迎admin登录网站后台</h1>
			</header>
			<form action="doLogin.php" method="post">
				<label>用户名：<input type="text" name="username" id="username" /></label><br/>
				<label>密&emsp;码：<input type="password" name="password" id="password" /></label><br/>
				<div class="clear">
					<label>admin <input type="radio" name="user" value="admin" checked/></label>
					<label>游客 <input type="radio" name="user" value="游客"/></label>
				</div>	
				<div class="btn">
					<input type="submit" value="登&emsp;录" id="loginBtn"/>
					<input type="reset" value="重&emsp;置"/>
				</div>
				<div>
					管理员不存在，<a href="addAdmin.php">添加管理员</a>
				</div>	
			</form>
		</div>	
	</body>
</html>