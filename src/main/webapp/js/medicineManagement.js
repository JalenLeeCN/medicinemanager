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
									'<td><span hidden="true">'+e.id+'</span>'+e.id+'</td>'+
									'<td>'+e.name+'</td>'+
									'<td>'+e.unitPrice+'</td>'+
									'<td>'+e.manufacturerName+'</td>'+
									'<td>'+e.providersName+'</td>'+
									'<td><a href="" data-toggle="modal"'+
										'data-target="#editInsert" aria-hidden="true">编辑说明书</a></td>'+
									'<td><a href="" data-toggle="modal" data-target="#editDrug">'+
										'<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>编辑</a>'+
										'<a href="" onclick="delDrug(this)">'+
										'<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除</a>'+
									'</td>'+
								'</tr>';
				//data-toggle="modal" data-target="#deleteDrug"
				$("#drugInfoTable tbody").append(drugInfo);
			});
		},
		error:function(){
//			alert("请求失败");
		}
	});
}

//根据id删除药品
function delDrug(e){
	debugger;
	var id = $(e).parent().parent().first().find("span").html();
	console.log(id);
	$.ajax({
		url:"medicine/delDrug",
		async: false,
		type:"post",
		data:{"id":id},
		dataType:"json",
		success:function(flag){
			if(flag){
				alert("删除成功");
				qryDrugInfo(1);
			}else{
				alert("删除失败");
			}
		},
		error:function(){
			alert("请求失败");
		}
	});
	return false;
}















