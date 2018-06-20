//@ sourceURL=user.js
$(function(){
	console.log("load user");
	//第一次访问时,第一页
	qryUser(1);

});
//查询所有角色的信息并放在loc的位置上
function qryUser(currentPage) {
	var keyWord = $("#userKeyWord").val();
	$.ajax({
		url :"user/qryUser",
		type : "post",
		data:{"currentPage":currentPage,"keyWord":keyWord},
		dataType : "json",
		success : function(pv) {
			var result = pv.result;
			$("#userTable tbody").html("");
			$(result).each(function(index,e){
				var userInfo = '<tr>'+
								'<td><span hidden="true">'+e.id+'</span>'+e.id+'</td>'+
								'<td>'+e.name+'</td>'+
								'<td>'+e.email+'</td>'+
								'<td>2018/05-15</td>'+
								'<td>否</td>'+
								'<td>'+e.roleName+'</td>'+
								'<td><a href="" data-toggle="modal" data-target="#editUser">'+
									'<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>编辑</a>'+
									'<a href=""><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除</a>'+
								'</td>'+
							'</tr>';
				$("#userTable tbody").append(userInfo);
			});
		},
		error : function() {
//			alert("请求失败");
		}
	});
}