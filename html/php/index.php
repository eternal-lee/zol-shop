<?php
	header("content-Type:text/html;chartset=utf-8");
	include_once "fn.php";
	session_start();
	if(!isset($_SESSION["loginName"])){
		alertMes("用户未登录，请先登录","login.php");
	}
	
	function Quit(){
		unset($_SESSION["username"]);
	}
	
	
?>
<!DOCTYPE html>
<html>
	<head>
		<title>商城管理系统</title>
		<meta name="" content="text/html" charset="utf-8"/>
		<link rel="shortcut icon" type="image/icon" href="../../img/title.ico"/>
		<link rel="stylesheet" type="text/css" href="../../css/easyui.css"/>
		<style>
			*{margin:0;padding:0;}
			a{text-decoration:none;color:#000;}
			li{list-style:none;cursor:pointer;}
			header{
				height:60px;
				line-height:60px;
				background:#09f;
			}
			header h2{
				text-indent:50px;
				float:left;
				margin-right:80px;
			}
			header span{margin-right:20px;}
			header span b{color:#f00;}
			.main{
				width:100%;
				overflow:hidden;
			}
			.leftSide{
				width:200px;
				height:450px;
				padding:20px;
				background: #6ba1ef;
				float:left;
				margin-right:20px;
			}
			.leftSide ul{margin-bottom:15px;}
			.leftSide ul li{
				padding:6px 12px;
				background:#fef9f9;
			}
			.leftSide ul li ol{
				text-indent:15px;
				display:none;
			}
			.leftSide ul li ol li{
				padding:6px 6px 6px 0;
				color:#09f;
				border-bottom:1px dashed #000;
			}
			.content{
				margin-top:20px;
				min-width:420px;
				/*overflow: auto;*/
				overflow: hidden;
				height:auto;
			}
			.content p.time{
				background:#E0E0E0;
				margin-bottom:10px;
				padding:5px 0;
			}
			.content p.time span:first-child{
				margin-right:120px;
				text-indent:50px;
				display:inline-block;
			}
			.leftSide ul li ol.active{display:block;}
			.leftSide ul li ol li.active{color:#f00;}
			table{
				width:700px;
			}
			table td{padding:6px; text-align: center;}
			table td textarea{
				width:240px;
				height:120px;
			}
			.content .table{display:none;}
			#content div.active{display:block}
			.content .table form{display:none;}
			.content .table form.active{display:block;}
			
			#newSec{display: none;}
		</style>
	</head>
	<body>
		<header>
			<h2>商城管理系统</h2>
			<span>当前用户，<b><?php echo $_SESSION["loginName"]?></b></span>
			<a href="doAction.php?act=quit">退出系统</a>
		</header>
		<div class="main">
			<div class="leftSide">
				<ul id="list">
					<li class="active" dataId="goodsAll">商品管理
						<ol class="ol active">
							<li class="active">商品添加</li>
							<li>商品删除</li>
							<li>商品修改</li>
							<li>商品查询</li>
						</ol>
					</li>
					<li dataId="userAll">用户管理
						<ol class="ol">
							<li class="active">用户添加</li>
							<li>用户修改</li>
						</ol>
					</li>
					<li dataId="adminAll">管理员管理
						<ol class="ol">
							<li class="active">管理员添加</li>
							<li>管理员修改</li>
						</ol>
					</li>
				</ul>
				<!-- 日历 -->
				<div id="dd" class="easyui-calendar" style="width:200px;height:200px;"></div>
			</div>
			<div class="content" id="content">
				<p class="time"><span>欢迎进入网站管理中心</span>当前时间：<?php echo date("Y年m月d日 ")?>&emsp;
					<span id="show"><span>
				</p>
				<!-- 商品管理 开始 -->
				<div class="table goods active" id="goodsAll">
					<form class="active" action="doAction.php?act=addGoods" method="post">
						<table align="center" border="1" cellspacing="0" cellpadding="0">
							<tr>
								<th colspan="3">物品添加</th>
							</tr>
							<tr>
								<td>&emsp;商品ID：<input type="number" name="goodsID" placeholder="填写商品ID(int)"/></td>
								<td colspan="2">商品名称：<input type="text" name="goodsName" placeholder="填写商品名称"/></td>
							</tr>
							<tr>
								<td>商品类型：<input type="text" name="goodsType" placeholder="填写商品类型"/></td>
								<td colspan="2">商品库存：<input type="number" name="goodsNum" placeholder="填写商品库存(int)"/></td>
							</tr>
							<tr>
								<td class="text" colspan="3">详情信息：<textarea name="goodsInfo" placeholder="填写商品信息"></textarea></td>	
							</tr>	
							<tr>
								<td colspan="3">
									<input type="submit" value="添&nbsp;加"/>
								</td>
							</tr>
						</table>
					</form>	
					<form action="doAction.php?act=deleteGoods" method="post">
						<table border="1" cellspacing="0" cellpadding="0">
							<tr><th>删除商品</th></tr>
							<tr>
								<td>商品ID：<input type="number" data-name="goods" name="goodsID" required/></td>
							</tr>
							<tr>
								<td><input type="submit" value="删除"/></td>
							</tr>
						</table>
					</form>
					<hr/>
					<form action="doAction.php?act=updateGoods" method="post">
						<table align="center" border="1" cellspacing="0" cellpadding="0">
							<tr>
								<th colspan="3">物品修改</th>
							</tr>
							<tr>
								<td>&emsp;商品ID：<input type="number" data-name="goods" name="goodsID" placeholder="填写商品ID(int)" required/></td>
								<td>更改商品ID：<input type="number" name="newGoodsID" placeholder="填写商品ID(int)" /></td>
							</tr>
							<tr>
								<td>商品名称：<input type="text" name="goodsName" placeholder="填写商品名称"/></td>
								<td colspan="2">&emsp;商品类型：<input type="text" name="goodsType" placeholder="填写商品类型"/></td>
							</tr>
							<tr>
								<td>商品库存：<input type="number" name="goodsNum" placeholder="填写商品库存(int)"/></td>
								<td class="text" colspan="2">详情信息：<textarea name="goodsInfo" placeholder="填写商品信息"></textarea></td>	
							</tr>
							<tr>
								<td colspan="3">
									<input type="submit" value="修&nbsp;改"/>
								</td>
							</tr>
						</table>
					</form>
					<form>
						<table align="center" border="1" cellspacing="0" cellpadding="0">
							<tr><th>商品查询</th></tr>
							<tr>
								<td>商品ID：<input type="number" id="numId" data-name="goods" name="goodsID" required/></td>
							</tr>
							<tr>
								<td><input type="button" id="select" value="查询"/></td>
							</tr>
						</table>
						<div id="newSec">
							<table>
								<tr><th>商品ID</th><th>商品名称</th><th>商品类型</th><th>商品数量</th><th>商品信息</th></tr>
							</table>
						</div>
					</form>
				</div>	<!-- 商品管理 结束 -->
				<!-- 用户管理 开始 -->
				<div class="table user" id="userAll">
					<form class="active" action="doAction.php?act=addUser" method="post">
						<table border="1" cellspacing="0" cellpadding="0">
							<tr><td colspan="2">用户添加</td></tr>
							<tr><td>用户：</td><td><input type="text" name="userName" required/></td></tr>
							<tr><td>密码：</td><td><input type="password" name="userPwd" required/></td></tr>
							<tr><td colspan="2"><input type="submit" value="添加"/></td></tr>
						</table>
					</form>
					<form action="doAction.php?act=updateUser" method="post">
						<table border="1" cellspacing="0" cellpadding="0">
							<tr><td colspan="2">用户修改</td></tr>
							<tr><td>用户：</td><td><input type="text" name="userName" required/></td></tr>
							<tr><td>密码：</td><td><input type="password" name="userPwd" required/></td></tr>
							<tr><td colspan="2"><input type="submit" value="修改"/></td></tr>
						</table>
					</form>
				</div>	
				<!-- 用户管理 结束 -->
				<!-- 管理员管理 开始 -->
				<div class="table admin" id="adminAll">
					<form class="active" action="doAction.php?act=addAdmin" method="post">
						<table width="600" border="1" cellpadding="0" cellspacing="0">
							<tr>
								<th colspan="3">管理员添加</th>
							</tr>
							<tr>
								<td>管理员字段</td>
								<td>管理员信息</td>
							</tr>
							<tr>
								<td align="right">管理员名称</td>
								<td><input type="text" name="adminName" placeholder="请输入管理员名称" required/></td>
							</tr>
							<tr>
								<td align="right">管理员密码</td>
								<td><input type="password" name="adminPwd" placeholder="请输入密码" required/></td>
							</tr>
							<tr>
								<td align="right">管理员邮箱</td>
								<td><input type="text" name="adminEmail" placeholder="请输入管理员邮箱" required/></td>
							</tr>
							<tr>
								<td colspan="2" align="center"><input type="submit"  value="管理员添加"/></td>
							</tr>
						</table>
					</form>
					<hr/>
					<form action="doAction.php?act=updateAdmin" method="post">
						<table border="1" cellpadding="0" cellspacing="0">
							<tr>
								<th colspan="3">管理员修改</th>
							</tr>
							<tr>
								<td align="right">管理员名称</td>
								<td><input type="text" name="adminName" placeholder="请输入管理员名称" required/></td>
							</tr>
							<tr>
								<td align="right">管理员密码</td>
								<td><input type="password" name="adminPwd" placeholder="请输入密码"/></td>
							</tr>
							<tr>
								<td align="right">管理员邮箱</td>
								<td><input type="text" name="adminEmail" placeholder="请输入管理员邮箱"/></td>
							</tr>
							<tr>
								<td colspan="2" align="center"><input type="submit"  value="管理员修改"/></td>
							</tr>
						</table>	
					</form>
				</div>	
				<!-- 管理员管理 结束 -->
			</div>
		</div>

		<script type="text/javascript" src="../../lib/jquery-1.12.3.js" ></script>
		<script type="text/javascript" src="jquery.easyui.min.js"></script>
		<script type="text/javascript" src="index.js" ></script>		
	</body>
</html>