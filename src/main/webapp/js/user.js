//@ sourceURL=user.js
var userId;
var userHead;
var roleType = "all";
$(function(){
	console.log("load user");
	//第一次访问时,第一页
	findUsers(1);
	//给搜索按钮添加click事件
	$("#user_search_btn").click(function(){
		findUsers(1);
	});
	//给删除model框的确定按钮添加click事件
	$("#delete_user_btn").click(function(){
		deleteUser();
	});
	//给详情标签添加点击事件
	$('#user_tab li:eq(1) a').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
		$('#detailPanel').html('请在"列表"中选择一个用户显示详情');
	});
	//给新增标签添加点击事件
	$('#user_tab li:eq(2) a').click(function (e) {
		  e.preventDefault();
		  $(this).tab('show');
		  findAllRoleName("#addUserPanel #roleCategory");
	});
	//给添加用户的表单添加submit事件
	$("#addUserPanel form").submit(function(){
		return addUser();
	});
	//给修改的model框的确定按钮添加submit事件
	$("#editUser input[type=submit]").click(function(){
//		console.log("editUser register");
		return updateUser();
	});
	//给全局变量roleType赋值
	$("#role_type button").click(function(){
		roleType = $(this).html();//取角色按钮的值
//		alert(roleType);
		if("全部"==roleType){
			roleType = "all";
		}
		$(this).siblings("button").removeClass("active");
		$(this).addClass("active");
		findUsers(1);
	});
	//给导出按钮添加click事件
	$("#export_btn").click(function(){
		window.location.href = basePath+"user/exportuser";
	});
});
function updateUser(){
	console.log("updateUser()");
	var loginName = $("#editUser #inputEmail").val();
	var password1 = $("#editUser #inputPassword").val();
	var password2 = $("#editUser #inputPassword2").val();
	var nickName = $("#editUser #nickName").val();
	var age = $("#editUser #age").val();
	var sex = $("#editUser input[name=user-type]:checked").val();
	var roleCheckboxs = $("#editUser input[type=checkbox]:checked");
	
	var roleIds = [];
	var roleString = '';
	alert("roleIds before-->"+roleIds);
	$(roleCheckboxs).each(function(n,value){
		var roleId = $(value).val();//原生转jquery对象
		roleString += $(value).next().text()+",";
//		alert("roleName-:>"+$(value).next().text());
		roleIds.push(roleId);
	});
	console.log("roleIds="+roleIds);
	if(password1!=password2){
		alert("两次密码不相同");
		return false;
	}
	
	//异步请求更新数据
	$.ajaxFileUpload({
		url : basePath + "user/update",
		securefri:false,
		fileElementId:'updateHeadPicture',
		type:"post",
		data:{"id":userId,"loginName":loginName,"password":password1,
				"nickName":nickName,"age":age,"sex":sex,"roleIds":roleIds,"head":userHead},
		traditional:true,//传数组需要添加此项
		dataType : "text",
		success : function(data,status) {
			data = data.replace(/<PRE.*?>/g, '');
			data = data.replace("<PRE>", '');
			data = data.replace("</PRE>", '');
			data = data.replace(/<pre.*?>/g, '');
			data = data.replace("<pre>", '');
			data = data.replace("</pre>", '');
			alert(data);
			$("#update"+userId).parent().parent().find("td:eq(1)").find("a").text(loginName);
			$("#update"+userId).parent().parent().find("td:eq(2)").text(loginName);
			$("#update"+userId).parent().parent().find("td:eq(7)").text(roleString.substr(0,roleString.length-1));
			$("#editUser").modal("hide");
		},
		error : function() {
//			alert("请求失败");
		}
	});
	return false;
}
function updateUserClick(id,loginName,password,nickName,age,sex,roleString,head){
	userId = id;
	userHead = head;
	// 给页面的框赋值
	$("#editUser #inputEmail").val(loginName);
	$("#editUser #inputPassword").val(password);
	$("#editUser #inputPassword2").val(password);
	$("#editUser #nickName").val(nickName);
	$("#editUser #age").val(age);
	if("男"==sex){
		$("#editUser input[name=user-type]:eq(0)").attr("checked","checked");
	}else if("女"==sex){
		$("#editUser input[name=user-type]:eq(1)").attr("checked","checked");
	}
	//处理角色
	var roleNames = roleString.split(",");
	console.log(roleNames);
	//查询所有角色
	$.ajax({
		url : basePath + "role/allroles",
		type : "get",
		dataType : "json",
		success : function(result) {
			if (result.status == 0) {
				$("#allRoleName").html("");
				var roles = result.data;
				$(roles).each(function(n, value) {
//					console.log("roles-->"+value);
					var checkBox1 = '<input type="checkbox" name="roleName" checked="checked" value="'+value.id+'" /><span>'+value.name+'<span>&nbsp;&nbsp;';
					var checkBox2 = '<input type="checkbox" name="roleName" value="'+value.id+'" /><span>'+value.name+'</span>&nbsp;&nbsp;';
					var flag = false;
					$(roleNames).each(function(n1,value1){
//						console.log("roleNames-->"+value1);
						if(value1==value.name){
							$("#allRoleName").append(checkBox1);
							flag = true;
						}
					});
					if(!flag){
						$("#allRoleName").append(checkBox2);
					}
					if((n+1)%3==0){
						$("#allRoleName").append("<br>");
					}
				});
			}
		},
		error : function() {
//			alert("请求失败");
		}
	});
}
//查询所有角色的信息并放在loc的位置上
function findAllRoleName(loc) {
	$.ajax({
		url : basePath + "role/allroles",
		type : "get",
		dataType : "json",
		success : function(result) {
			if (result.status == 0) {
				$(loc).html("");
				var roles = result.data;

				$(roles).each(
						function(n, value) {
							var op = '<option value="' + value.id + '">'
									+ value.name + '</option>';
							$(loc).append(op);
						});
			} else if (result.status == 1) {
				var op = '<option value="">无角色信息</option>';
				$(loc).append(op);
			}
		},
		error : function() {
//			alert("请求失败");
		}
	});
}
function addUser(){
	//获取页面的数据
	var loginName = $("#addUserPanel #inputEmail").val();
	var password1 = $("#addUserPanel #inputPassword").val();
	var password2 = $("#addUserPanel #inputPassword2").val();
	var nickName = $("#addUserPanel #nickName").val();
	var age = $("#addUserPanel #age").val();
	var roleId = $("#addUserPanel #roleCategory").val();
	console.log("roleId="+roleId);
	var sex = $("#addUserPanel input[name=user-type]").val();
	if (password1 != password2) {
		alert("两次密码不同")
		return false;
	}
	if (age <= 0) {
		$("#addUserPanel #age").focus();
		return false;
	}
	// 异步提交
	$.ajaxFileUpload({
		url:basePath+"user/new/",
		securefri:false,
		fileElementId:'addHeadPicture',
		type:"post",
		data:{"loginName":loginName,"password":password1,"nickName":nickName,
			  "age":age,"sex":sex,"roleId":roleId},
		dataType:"text",
		success:function(data,status){
//			alert("处理前"+data);
			data = data.replace(/<PRE.*?>/g,'');
			data = data.replace("<PRE>",'');
			data = data.replace("</PRE>",'');
			data = data.replace(/<pre.*?>/g,'');
			data = data.replace("<pre>",'');
			data = data.replace("</pre>",'');
			alert(data);
		},
		error:function(){
//			alert("请求失败");
		}
	});
	return false;
}
function deleteUserClick(id){
	userId = id;
}
function deleteUser() {
	$.ajax({
		url : basePath + "user/delete/" + userId,
		type : "delete",
		dataType : "json",
		success : function(result) {
			if (result.status == 0) {
				$("#deluser" + userId).parent().parent().remove();
				alert(result.message);
				$("#deletemodal").modal("hide");
			} else if (result.status == 1) {
				alert("删除失败");
			}
		},
		error : function() {
//			alert("请求失败");
		}
	});

}
function findUserById(id){
	$("#user_tab li:eq(1) a").tab("show");
	$.ajax({
		url:basePath+"/user/detail/"+id,
		type:"get",
		dataType:"json",
		success : function(result) {
			if (result.status == 0) {
				$("#detailPanel .media").html("");
				var user = result.data;
				
				var roleString = '';
				$(user.roles).each(function(n,role){
					roleString += role.name+",";
				});
				if(roleString.length==0){
					roleString = "无角色信息";
				}else{
					roleString = roleString.substring(0, roleString.length-1);
				}
				
				var userDetail = '<div class="media-left">'+
						              '<a href="#">'+
						                '<img class="media-object img-circle" src="head/'+user.head+'" alt="头像">'+
						              '</a>'+
						            '</div>'+
						            '<div class="media-body">'+
						              '<h1 class="media-heading">'+user.loginName+'</h1>'+
						              '<br/>'+
						              '<p>账号类型：<span>'+user.loginType+'</span></p>'+
						              '<p>昵称：<span>'+user.nickName+'</span></p>'+
						              '<p>性别：<span>'+user.sex+'</span></p>'+
						              '<p>年龄：<span>'+user.age+'</span></p>'+
						              '<p>积分：<span>'+user.score+'</span></p>'+
						              '<p>注册日期：<span>'+new Date(user.regDate).toLocaleDateString().replace("/", "-").replace("/", "-")+'</span></p>'+
						              '<p>锁定：<span>'+user.isLock+'</span></p>'+
						              '<p>角色：<span>'+roleString+'</span></p>'+
						            '</div>';
				$("#detailPanel .media").append(userDetail+roleString);
			}
		},
		error : function() {
//			alert("请求失败");
		}
	});
}
function findUsers(currentPage){
//	alert("findUsers");
	var userKeyword = $("#user_search").val();
	if(userKeyword==""){
		userKeyword = "undefined";
	}
	$.ajax({
		url:basePath+"user/page/"+currentPage+"/"+userKeyword+"/"+roleType,
		type:"get",
		dataType:"json",
		success:function(result){
			if(result.status==0){
//				alert("findUser() success");
				//清空表格内容
				$("#user_table tbody").html("");
				//清空分页内容
				$("#user_page").html("");
				var users = result.data.data;
				if(users.length>0){
					$(users).each(function(n,value){
						 var begin = '<tr>'+
				                '<td>'+(n+1)+'</td>'+
				                '<td><a href=javascript:findUserById("'+value.id+'")>'+value.loginName+'</a></td>'+
				                '<td>'+value.nickName+'</td>'+
				                '<td>'+value.loginType+'</td>'+
				                '<td>'+value.score+'</td>'+
				                '<td>'+new Date(value.regDate).toLocaleDateString().replace("/","-").replace("/","-")+'</td>'+
				                '<td>'+value.isLock+'</td>'+
				                '<td>';
						 var roleString = '';
						 $(value.roles).each(function(n,role){
							 roleString += role.name+",";
						 });
						 if(roleString.length==0){
							 roleString = "无";
						 }else{
							 roleString = roleString.substring(0, roleString.length-1);
	//						 console.log(roleString);
						 }
						 var end = '</td>'+
				                '<td>'+
		                  '<a href="" onclick=updateUserClick("'+value.id+'","'+value.loginName+'","'+value.password+'","'+value.nickName+'","'+value.age+'","'+value.sex+'","'+roleString+'","'+value.head+'") id="update'+value.id+'" data-toggle="modal" data-target="#editUser"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>编辑</a>'+
		                  '<a href="" onclick=deleteUserClick("'+value.id+'") id="deluser'+value.id+'" data-toggle="modal" data-target=".bs-example-modal-sm"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除</a>'+
		                '</td>'+
		              '</tr>';
						 $("#user_table tbody").append(begin+roleString+end);
					});
					//处理分页条
					var page = result.data;
					if(page.aNum.length>0){
						//处理前一页
						var previous = '<li>'+
				            '<a href="javascript:findUsers('+page.previousPage+')" aria-label="Previous">'+
			              '<span aria-hidden="true">&laquo;</span>'+
			            '</a>'+
			          '</li>';
						$("#user_page").append(previous);
						//处理中间页
						$(page.aNum).each(function(n,value){
							var middle = '<li><a href="javascript:findUsers('+value+')">'+value+'</a></li>';
							$("#user_page").append(middle);
						});
						//处理下一页
						var next = '<li>'+
				            '<a href="javascript:findUsers('+page.nextPage+')" aria-label="Next">'+
			              '<span aria-hidden="true">&raquo;</span>'+
			            '</a>'+
			          '</li>';
						$("#user_page").append(next);
						$("#user_page li:contains("+currentPage+")").attr("class","active");
					}
				}else{
					$("#user_table tbody").append("无"+roleType+"信息");
				}
			}
		},
		error:function(){
//			alert("请求失败");
		}
	});
}