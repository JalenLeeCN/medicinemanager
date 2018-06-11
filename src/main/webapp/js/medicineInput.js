//@ sourceURL=course.js
var courseId;
$(function(){
	//给删除课程modal框添加click事件
	$("#deleteCourse_button").click(function(){
		var dom = getCourseNode_tr(courseId,"delCourse");
		return deleteCourse(courseId,dom);
	});
	//给新增的form添加submit事件
	$("#medicineInput form").submit(function(){
		return addDrug();
	});
	//给新增的form添加submit事件
	$("#packageInsertInput form").submit(function(){
		return addPackageInsert();
	});
//	alert("course.js");
});
//新增药品
function addDrug(){
	var medicineName = $("#medicineName").val();
	var medicinePrice =  $("#medicinePrice").val();
	var providerId = $("#providerId").val();
	var productId = $("#productId").val();
	console.log(productId);
//	debugger;
	var picture = 'images/Java-evn.png';
	$.ajax({
		url:basePath+"medicine/drugAddtion",
		type:"post",
		data:{"name":medicineName,"unitPrice":medicinePrice,"providersId":providerId,
			"manufacturerId":productId,"picture":picture},
		dataType:"json",
		success:function(result){
			alert("添加成功");
		},
		error:function(){
			alert("请求失败");
		}
	});
//	$("#course_tab a [#href='#course']").tab("show");
	return false;
}

//录入药品说明书
function addPackageInsert(){
	return false;
}
//上传图片
function uploadPicture(){
	return 'images/Java-evn.png';
}
//获取当前删除超链接的tr
function getCourseNode_tr(courseId,type){
	return $("#"+type+courseId);
}
//删除课程
function deleteCourse(courseId,dom){
	$.ajax({
		url:basePath+"DeleteCourseServlet",
		type:"post",
		data:{"courseId":courseId},
		dataType:"json",
		success:function(result){
			if(result.status==0){
//				alert(result.message);
				//移除当前tr
				dom.remove();
			}else if(result.status==1){
//				alert(result.message);
			}
		},
		error:function(){
//			alert("请求失败");
		}
	});
	//关闭当前删除的确认modal框
	$("#deletecourse_modal").modal('toggle');
	//要想删除就必须知道要删除的id
	findCourses(1);
}