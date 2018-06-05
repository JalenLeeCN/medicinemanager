$(function(){
	$("#inputName").val(getCookie("loginName"));
	$(".container form").submit(function(e){
		alert("login.js-->submit");
		return login_form();
	});
});
//登录方法
function login_form(){
	//获取表单中的用户名和密码
	var name = $("#inputName").val();
	var pwd = $("#inputVerification").val();
	var remember = $(".container form input[type=checkbox]").get(0).checked;
	console.log(name+"  "+pwd);
	$.ajax({
		url:basePath+"enter/login/"+name+"/"+pwd+"/1",
		type:"get",//使用restful方式
//		data:{"loginName":lName,"loginPwd":lPwd},
		dataType:"json",
		success:function(uv){
			//result是服务端返回的数据
			if(uv.name!=null){
				window.location.href="index.html";
				if(remember){
					addCookie("loginName",name,1);
				}
			}else{
				alert("密码错误");
			}
		},
		error:function(){
//			alert("请求失败!");
		}
	});
	return false;
}

//发送验证码
function sendVerificationCode(){
	var name = $("#inputName").val();
	$.ajax({
		url:basePath+"enter/verfication",
		type:"get",
		data:{"name":name},
		dataType:"json",
		success:function(){
			alert("验证码发送成功,请注意接收!");
		},
		error:function(){
//			alert("发送失败!");
		}
	});
}

//添加非空校验
function isEmptyName(){
	var name = $("#inputName").val();
	if(name == null || name == undefined || name == ""){
		alert("请输入必填字段!")
		return;
	}else{
		sendVerificationCode();
	}
}