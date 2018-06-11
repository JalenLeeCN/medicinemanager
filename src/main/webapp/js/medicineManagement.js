var courseId;
$(function(){
	//给删除课程modal框添加click事件
	$("#deleteCourse_button").click(function(){
		var dom = getCourseNode_tr(courseId,"delCourse");
		return deleteCourse(courseId,dom);
	});
	//查询当前页的数据
	qryDrugInfo(1);
});

//获取当前删除超链接的tr
function getCourseNode_tr(courseId,type){
	return $("#"+type+courseId);
}

//显示药品数据
function qryDrugInfo(currentPage){
	console.log("------------------");
	//获取用户的模糊查询的关键字
	var keyWord = $("#keyWord").val();
	//ajax请求当前页数据
	$.ajax({
		url:basePath+"medicine/simpleInfo",
		type:"post",
		data:{"currentPage":currentPage,"keyWord":keyWord},
		dataType:"json",
		success:function(pv){
			var result = pv.result;
			$("#drugInfoTable tbody").html("");
			$(result).each(function(index,e){
				var drugInfo = '<tr>'+
									'<td>'+e.id+'</td>'+
									'<td>'+e.name+'</td>'+
									'<td>'+e.unitPrice+'</td>'+
									'<td>'+e.manufacturerName+'</td>'+
									'<td>'+e.providersName+'</td>'+
									'<td><a href="" data-toggle="modal"'+
										'data-target="#editInsert" aria-hidden="true">编辑说明书</a></td>'+
									'<td><a href="" data-toggle="modal" data-target="#editDrug">'+
										'<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>编辑</a>'+
										'<a href="" data-toggle="modal" data-target="#deleteDrug">'+
										'<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除</a>'+
									'</td>'+
								'</tr>';
				$("#drugInfoTable tbody").append(drugInfo);
			});
		},
		error:function(){
//			alert("请求失败");
		}
	});
}
//删除超链接
function deleteCourseClick(id){
	courseId = id;
}















