   //   getByClass
function getByClass(oParent,sClass){
	var aEle = oParent.getElementsByTagName("*");
	var aResult = [];
	for(var i in aEle){
		if(aEle[i].className == sClass){
			aResult.push(aEle[i]);
		}
	} 
	return aResult;
}

   //   getStyle
//、 获取 内联样式 的属性 :属性值	
function getStyle(obj, name) {   //  传入参数name加引号
	if(window.getComputedStyle) {
		return getComputedStyle(obj, null)[name];
	} else {
		return obj.currentStyle[name];
	}
}

    //  ajax  封装
function urlParamsHandler(o){
	var arr=[];
	for(var key in o){
		arr.push(encodeURIComponent(key)+"="+encodeURIComponent(o[key]));
	}
	return arr.join("&");
}
function ajax(o){
	var xhr=null;
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}else{
		xhr=new ActiveXObject("Microsoft.XMLHTTP");
	}
	o.method = o.method || "get";
	o.isAsync = (typeof o.isAsync) == "boolean"? o.isAsync : true;
	if(o.method.toLowerCase()=="get"){
		if(o.data){
			o.url+="?t="+new Date().getTime()+"&"+urlParamsHandler(o.data);
		}else{
			o.url+="?t="+new Date().getTime();
		}
		xhr.open("get",o.url,o.isAsync);
		if(o.headerData) {
			for(var key in o.headerData) {
				xhr.setRequestHeader(key, o.headerData[key]);
			}
		}
		xhr.send();
	}else{
		xhr.open("post",o.url,o.isAsync);
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		if(o.headerData) {
			for(var key in o.headerData) {
				xhr.setRequestHeader(key, o.headerData[key]);
			}
		}
		xhr.send(urlParamsHandler(o.data));
	}
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4){
			if(xhr.status==200){
				o.success && o.success(xhr.responseText);

			}else{
				o.error && o.error(xhr.responseText);

			}
		}
	}
}
// GET请求
function get(url, data, fn) {
	ajax({
		"url" : url,
		"method" : "get",
		"data" : data,
		"success" : fn
	});
}
// POST 请求
function post(url, data, fn) {
	ajax({
		"url" : url,
		"method" : "post",
		"data" : data,
		"success" : fn
	});
}

	//  cookie
function setCookie(name, value, expiresNum) {
	var cookieTxt = encodeURIComponent(name)+"="+encodeURIComponent(value);
	var date = new Date();
	date.setDate(date.getDate()+expiresNum);
	cookieTxt += "; expires="+date;
	document.cookie = cookieTxt;
}

function getCookie(name) {
	var str = decodeURIComponent(document.cookie);
	var arr = str.split("; ");
	for(var i=0; i<arr.length; i++) {
		var arr1 = arr[i].split("=");
		if(name == arr1[0]) {
			return arr1[1];
		}
	}
	return "";
}

function removeCookie(name) {
	setCookie(name, "", -1);
}
 
	//  startMove
//、 获取 内联样式 的属性 :属性值	
function getStyle(obj, name) {   //  传入参数name加引号
	if(window.getComputedStyle) {
		return getComputedStyle(obj, null)[name];
	} else {
		return obj.currentStyle[name];
	}
}

//多物体，任意值运动
function startMove(obj, json, fn) {   //对象 , json{ "属性"(加引号传参时):目标位置  }, 回归函数
	clearInterval(obj.timer);   //清除 前面的定时器 防止反复调用
	obj.timer = setInterval(function() {
	// bStop 是进行  开 关	
		var bStop = true;//默认到齐了
		for(var attr in json) {
			var iCur = 0;
			if(attr=="opacity") {
				iCur = parseInt(parseFloat(getStyle(obj, attr))*100);
			} else {
				iCur = parseInt(getStyle(obj, attr));
			}

			var iSpeed = (json[attr]-iCur)/8;
			iSpeed = iSpeed>0? Math.ceil(iSpeed) : Math.floor(iSpeed);
			if(iCur!=json[attr]) {
				bStop = false;
			}
			if(attr=="opacity") {
				obj.style.filter = "alpha(opacity:"+(iCur+iSpeed)+")"
				obj.style.opacity = (iCur + iSpeed)/100;
			} else {
				obj.style[attr] = iCur + iSpeed + "px";
			}
		}
		if(bStop) {//bStop都到齐了吗
			clearInterval(obj.timer);
			if(fn) {
				fn();
			}
		}
	}, 30)
}



