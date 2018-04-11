//@ sourceURL=role.js
var roleId;
var roleName;
$(function(){
//	alert("role.js顺利加载成功");
	findRoles(1);
	//给模糊查询按钮添加click事件
	$("#role_search_button").click(function(){
		return findRoles(1);
	});
	//给新增角色的表单添加submit事件
	$("#addPanel form").submit(function(){
		return addRole();
	});
	//给删除的model框的确认按钮添加click事件
	$("#deleterole_button").click(function(){
		console.log("================================");
		var dom = getRoleNode_tr(roleId,"delRole");
		return deleteRole(roleId,dom);
	});
//	$("#nav_table li:eq(1) a").tab('show');
	//给修改的modal框的表单添加submit事件
	$("#editRole form").submit(function(){
		var dom = getRoleNode_tr(roleId,"urole");
		return updateRole(roleId,dom);
	});
});

//更新角色
function updateRole(roleId,dom){
	//1.获取要更新的数据
	var newRoleName = $("#editRole form input[type=text]").val();
	$.ajax({
		url:basePath+"role/update",
		type:"post",
		data:{"id":roleId,"name":newRoleName},
		dataType:"json",
		success:function(result){
			if(result.status==0){
				//数据库已经更新成功了
				//页面那行数据更新
				dom.find("td:eq(2)").html(newRoleName);
				alert(result.message);
			}else if(result.status==1){
				//数据库没有更新失败
				alert(result.message);
			}
		},
		error:function(){
			alert("请求失败");
		}
	});
	findRoles(1);
	
	//关闭修改的modal框
	$("#editRole").modal("toggle");
	return false;
}
//给编辑的超链接添加click事件
function updateRoleClick(id,name){
	roleId = id;
	roleName = name;
	$("#updateRoleName").val(name);
}
//获取当前编辑或删除超链接所在的tr行对象
function getRoleNode_tr(roleId,type){
	return $("#"+type+roleId).parent().parent();
}
//删除超链接添加的click事件
function deleteRoleClick(id){
	roleId = id;
//	alert(id);
}
//删除角色的方法
function deleteRole(roleId,dom){
	//1.根据roleId走ajax删除数据库的id对应的角色信息
	//2.如果后台服务端删除成功,还要把页面的tr行删除
	$.ajax({
		url:basePath+"role/delete/"+roleId,
		type:"delete",
//		data:{"roleId":roleId},
		dataType:"json",
		success:function(result){
//			alert(roleId);
			if(result.status==0){
				//数据库删除完毕
				alert(result.message);
				//删除页面上的那个行tr
				dom.remove();
				findRoles(1);
			}else if(result.status==1){
				alert(result.message);
			}
		},
		error:function(){
			alert("请求失败");
		}
	});
	//关闭当前删除的确认modal框
	$("#deleterole_modal").modal('toggle');
	//要想删除就必须知道要删除的id
	return false;
}
//添加角色方法
function addRole(){
	//1.获取页面的数据,获取新填的角色名字
	var roleName = $("#roleName").val();
//	alert("roleName="+roleName);
	//2.异步请求服务器
	$.ajax({
		url:basePath+"role/new",
		type:"post",
		data:{"name":roleName},
		dataType:"json",
		success:function(result){
			if(result.status==0){
				alert(result.message);
				findRoles(1);
				$("#roleName").html("");
				$('#nav_table a[href="#rolePanel"]').tab('show');
			}else if(result.status==1){
				alert(result.message);
			}
		},
		error:function(){
			alert("请求失败");
		}
	});
//	console.log("show tab");
	return false;
}
//查询当前页的数据
function findRoles(currentPage){
//	alert("findRoles()被调用,当前页为第"+currentPage+"页");
	//获取角色的模糊查询的关键字
	var roleKeyWord = $("#role_search").val();
	if(roleKeyWord==""){
		//认为设置关键字进行是否为空的判断
		roleKeyWord = "undefined";
	}
	//ajax请求当前页数据
	$.ajax({
		url:basePath+"role/page",
		type:"get",
		data:{"currentPage":currentPage,"roleKeyword":roleKeyWord},
		dataType:"json",
		success:function(result){
			if(result.status==0){
				//查询成功,dom编程刷表格数据
				//1.清空页面数据
				$("#role_table tbody").html("");
				$("#role_page").html("");
				//2.给表格的tbody刷上数据
				var page = result.data;
				var roles = page.data;
				$(roles).each(function(n,value){
					//n:循环的是第几个元素的下标 从0开始
					//value:循环的当前元素,实际上就是role对象
					if(value.name!='讲师' && value.name!='学员' && value.name!='超级管理员'){
						//需要添加上删除和修改
						var tr = '<tr>'+
							'<td>'+(n+1)+'</td>'+
							'<td>'+value.id+'</td>'+
							'<td>'+value.name+'</td>'+
							'<td><a href="" onclick=updateRoleClick(\''+value.id+'\',\''+value.name+'\') id="urole'+value.id+'" data-toggle="modal" data-target="#editRole"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>编辑</a>'+
								'<a href="" onclick="deleteRoleClick(\''+value.id+'\')" id="delRole'+value.id+'" data-toggle="modal" data-target=".bs-example-modal-sm">'+'<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除</a>'+
							'</td>'+
						'</tr>';
						$("#role_table tbody").append(tr);
					}else{
						//不需要添加删除和修改
						var tr = '<tr>'+
							'<td>'+(n+1)+'</td>'+
							'<td>'+value.id+'</td>'+
							'<td>'+value.name+'</td>'+
							'<td></td>'+
						'</tr>';
						$("#role_table tbody").append(tr);
					}
				});
				//3.刷表格下面的分页条组件
				if(page.aNum.length>0){
//					alert("分页条组件");
					//处理前一页
					var previousPage = '<li>'+'<a href="javascript:findRoles('+
					page.previousPage+
					')" aria-label="Previous">'+
					'<span aria-hidden="true">&laquo;</span>'+
						'</a>'+'</li>';
					$("#role_page").append(previousPage);
					//处理中间页数
					$(page.aNum).each(function(n,value){
						var middlePage = '<li><a href="javascript:findRoles('+value+')">'+value+'</a></li>';
						$("#role_page").append(middlePage);
					});
					//处理下一页
					var nextPage = '<li>'+
						'<a href="javascript:findRoles('+page.nextPage+')" aria-label="Next">'+ 
					    '<span aria-hidden="true">&raquo;</span>'+
						'</a>'+'</li>';
					$("#role_page").append(nextPage);
					$("#role_page li:eq("+page.currentPage+")").attr("class","active");
				}
			}else if(result.status==1){
				//如果查询失败获取错误信息
				alert(result.message);
			}
		},
		error:function(){
			alert("请求失败");
		}
	});
}///func