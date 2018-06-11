$(function(){
	//给删除课程modal框添加click事件
	$("#deleteCourse_button").click(function(){
		var dom = getCourseNode_tr(courseId,"delCourse");
		return deleteCourse(courseId,dom);
	});
	//查询当前页的数据
	qryApprovalDrug(1);
});


//通过方法
function pass(e){
	
}
//获取当前删除超链接的tr
function getCourseNode_tr(courseId,type){
	return $("#"+type+courseId);
}

//显示药品数据
function qryApprovalDrug(currentPage){
	console.log("qryApprovalDrg()");
//	debugger;
	//ajax请求当前页数据
	$.ajax({
		url:basePath+"medicine/approval",
		type:"post",
		data:{"currentPage":currentPage},
		dataType:"json",
		success:function(pv){
			var result = pv.result;
			console.log(result);
			$("#approval").html("");
			$(result).each(function(index,e){
				var drugInfo = '<div class="row"><div class="col-sm-12 col-md-12">'+
									'<div class="panel-body">'+
									'<table class="table table-striped">'+
										'<tbody>'+
											'<tr>'+
												'<td id="id" value="'+e.id+'" class="col-md-1">编号: '+e.id+'</td>'+
												'<span hidden="true">'+e.id+'</span>'+
												'<td class="col-md-1">名称: '+e.name+'</td>'+
												'<td class="col-md-1">单价: '+e.unitPrice+'</td>'+
												'<td class="col-md-1">供应商: '+e.providersName+'</td>'+
												'<td class="col-md-1">制造商: '+e.manufacturerName+'</td>'+
											'</tr>'+
										'</tbody>'+
									'</table>'+
									'<div class="text-right">'+
										'<button type="button" class="btn btn-success" onclick="pass(this)">通过</button>'+
										'<button type="button" class="btn btn-danger" onclick="refuse(this)">拒绝</button>'+
									'</div>'+
								'</div>'+
							'</div></div>';
				$("#approval").append(drugInfo);
			});
		},
		error:function(){
			alert("请求失败");
		}
	});
}
//删除超链接
function deleteCourseClick(id){
	courseId = id;
}

//药品审批入库
function pass(e){
	alert("pass()");
	var id = $(e).parent().parent().find("span").html();
	console.log(id);
	$.ajax({
		url:basePath+"medicine/pass",
		type:"post",
		data:{"id":id},
		dataType:"json",
		success:function(){
			alert("审批完成")
			qryApprovalDrug(1);
		},
		error:function(){
			alert("请求失败");
		}
	});
}















