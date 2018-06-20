//@ sourceURL=role.js
$(function(){
//	alert("role.js顺利加载成功");
	queryRole(1);
	$("#addPanel form").submit(function(){
		return addRole();
	})
	
});

//添加角色方法
function addRole(){
	//1.获取页面的数据,获取新填的角色名字
	var roleName = $("#addCourseName").val();
	console.log("roleName="+roleName);
	//2.异步请求服务器
	$.ajax({
		url:basePath+"role/addtion",
		type:"post",
		data:{"roleName":roleName},
		dataType:"json",
		success : function(result) {
			if(result==true)
				alert("添加成功");
			else
				alert("添加失败");
			queryRole(1);
			$("#roleName").html("");
			$('#nav_table a[href="#rolePanel"]').tab('show');
		},
		error:function(){
			alert("获取服务器数据失败");
		}
	});
//	console.log("show tab");
	return false;
}
//查询当前页的数据
function queryRole(currentPage){
	console.log("queryRole()被调用,当前页为第"+currentPage+"页");
	//获取角色的模糊查询的关键字
	var keyWord = $("#roleKeyWord").val();
	//ajax请求当前页数据
	$.ajax({
		url:basePath+"role/queryRole",
		type:"post",
		data:{"currentPage":currentPage,"roleKeyword":keyWord},
		dataType:"json",
		success:function(pv){
			//1.清空页面数据
			$("#role_table tbody").html("");
			$("#role_paging").html("");
			//2.给表格的tbody刷上数据
			var result = pv.result;
			$(result).each(function(index,element){
				//index:循环的是第几个元素的下标 从0开始
				//element:循环的当前元素,实际上就是role对象
				if(element.name=='超级管理员'){
					//不需要添加删除和修改
					var tr = 
					'<tr>'+
						'<td>'+(index+1)+'</td>'+
						'<td>'+element.id+'</td>'+
						'<td>'+element.name+'</td>'+
						'<td></td>'+
					'</tr>';
					$("#role_table tbody").append(tr);
				}else{
					//需要添加上删除和修改
					var tr = 
					'<tr>'+
						'<td>'+(index+1)+'</td>'+
						'<td>'+element.id+'</td>'+
						'<td>'+element.name+'</td>'+
						'<td><a href="" onclick=updateRoleClick(\''+element.id+'\',\''+element.name+'\') id="urole'+element.id+'" data-toggle="modal" data-target="#editRole"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>编辑</a>'+
							'<a href="" onclick="deleteRoleClick(\''+element.id+'\')" id="delRole'+element.id+'" data-toggle="modal" data-target=".bs-example-modal-sm">'+'<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除</a>'+
						'</td>'+
					'</tr>';
					$("#role_table tbody").append(tr);
				}
			});
//			//3.刷表格下面的分页条组件
//			if(page.pagingHref.length>0){
////					alert("分页条组件");
//				//处理首页
//				var pagingHref = page.pagingHref;
//				var firstPage = 
//					'<li>'+'<a href="javascript:queryRole(1)" aria-label="Previous">'+
//						'<span aria-hidden="true">首页</span></a>'+
//					'</li>';
//				$("#role_paging").append(firstPage);
//				//处理中间页数
//				/*$(pagingHref).each(function(i,e){
//					var middlePage = '<li><a href="javascript:queryRole('+e+')">'+e+'</a></li>';
//					$("#role_page").append(middlePage);
//				});*/
//				//见鬼了 jQuery不进each
//				for(i=1;i<=pagingHref.length;i++){
//					var middlePage = '<li><a href="javascript:queryRole('+i+')">'+i+'</a></li>';
//					$("#role_paging").append(middlePage);
//				}
//				//处理尾页
//				var endPage = 
//					'<li><a href="javascript:queryRole('+page.totalPage+')" aria-label="Next">'+ 
//				    	'<span aria-hidden="true">尾页</span></a>'+
//				    '</li>';
//				$("#role_paging").append(endPage);
//				$("#role_paging li:contains("+page.currentPage+")").attr("class","active");
//			}
		},
		error:function(){
			alert("获取服务器数据失败");
		}
	});
}///func