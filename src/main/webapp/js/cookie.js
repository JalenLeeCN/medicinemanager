//获取指定名称的cookie的值
function getCookie(objName){
	//得到分割的cookie键值对
	var arrStr = document.cookie.split(";");
	for(var i=0;i<arrStr.length;i++){
		var temp = arrStr[i].split("=");
		if(temp[0]==objName){
			return unescape(temp[1]);
		}
	}
	return "";
}
//添加cookie
function addCookie(objName,objValue,objHours){
	var str = objName+"="+escape(objValue);
	//objHours为0时,不设定过期时间.浏览器关闭时,cookie自动消失
	if(objHours>0){
		var ms = objHours*3600*1000;//转换为毫秒
		var date = new Date();
		date.setTime(date.getTime()+ms);
		str+="; expires="+date.toGMTString();
	}
	document.cookie = str;
}

//删除cookie
function delCookie(name){
	var exp = new Date();
	exp.setTime(exp.getTime()-1);
	var cval = getCookie(name);
	if(cval!=null){
		document.cookie =  name+"="+cval+";expires="+exp.toGMTString();
	}
}
//设置cookie为30天
function setCookie(name,value){
	var days = 30;
	var exp = new Date();
	exp.setTime(exp.getTime()+days*24*3600*1000);
	document.cookie = name+"="+escape(value)+";expires="+exp.toGMTString();
}

















