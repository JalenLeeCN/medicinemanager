//@ sourceURL=course.js
var courseId;
$(function(){
	
	//给删除课程modal框添加click事件
	$("#deleteCourse_button").click(function(){
		var dom = getCourseNode_tr(courseId,"delCourse");
		return deleteCourse(courseId,dom);
	});
	//给新增的form添加submit事件
	$("#addCoursePanel form").submit(function(){
		return addCourse();
	});
//	alert("course.js");
	//查询当前页的数据
	findCourses(1);
});
//新增课程
function addCourse(){
	var name = $("#add_courseName").val();
	var levels =  $("#add_recommended").val();
	var description = $("#courseDesc").val();
	var picture = uploadPicture();
	$.ajax({
		url:basePath+"AddCourseServlet",
//		secureuri:false,//是否启用安全提交,默认为false
//		fileElementId:'picture',//需要上传的文件域的id
		type:"post",
		data:{"name":name,"levels":levels,"description":description,"picture:":picture},
		dataType:"json",
		success:function(result){
			if(result.status==0){
//				alert(result.message);
				findCourses(1);
			}else if(result.status==1){
//				alert(result.message);
			}
		},
		error:function(){
//			alert("请求失败");
		}
	});
	$("#course_tab a [#href='#course']").tab("show");
	return false;
}
//上传图片
function uploadPicture(){
	
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
//显示课程数据
function findCourses(currentPage){
//	alert("findCourses function()");
	console.log("------------------");
	//获取用户的模糊查询的关键字
	var courseKeyWord = $("#course_search").val();
	//关键字为空设置关键字为undefined(该关键字可自定义)
	if(courseKeyWord==""){
		courseKeyWord = "undefined";
	}
	//ajax请求当前页数据
	$.ajax({
		url:basePath+"FindCourseByPageServlet",
		type:"post",
		data:{"currentPage":currentPage,"courseKeyWord":courseKeyWord},
		dataType:"json",
		success:function(result){
			if(result.status==0){
//				alert("success-->"+result.message);
				//查询成功,dom编程刷新表格数据
				//1.清空页面数据
				$("#course table tbody").html("");
				$("#course_page").html("");
				var page = result.data;//拿到所有的页
				var courses = page.data;//拿到页中的用户
//				alert(courses);
				$(courses).each(function(n, value) {
					// n:循环的是第几个元素的下标,从0开始
					// value:循环的当前元素(course对象)
						var tr = '<tr>'+
		                '<td>'+(n+1)+'</td>'+
		                '<td><img src="'+value.picture+'"></td>'+
		                '<td>'+value.name+'</td>'+
		                '<td>'+value.levels+'</td>'+
		                '<td>'+value.description+'</td>'+
		                '<td>'+
		                  '<a href="" data-toggle="modal" data-target="#editCourse"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>编辑</a>'+
		                  '<a href="" onclick=deleteCourseClick(\''+value.id+'\') id="delUser'+value.id+'" data-toggle="modal" data-target=".bs-example-modal-sm"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除</a>'+
		                '</td>'+
		              '</tr>';
						$("#course table tbody").append(tr);
				});
				//3.刷表格下面的分页条组件
				if(page.aNum.length>0){
					//处理前一页
					var previousPage =  '<li><a href="javascript:findCourses('+page.previousPage+')" aria-label="Previous">'+
			          '<span aria-hidden="true">&laquo;</span></a></li>';
					
					//将前一页追加到课程表节点之后
					$("#course_page").append(previousPage);

					//处理中间页
					//aNum为当前显示的页数,循环输出每一个aNum代表的页面
					$(page.aNum).each(function(n,value){
						var middlePage = '<li><a href="javascript:findCourses('+value+')">'+value+'</a></li>';
						$("#course_page").append(middlePage);
					});
					//处理下一页
					var nextPage =  '<li>'+
	                '<a href="javascript:findCourses('+page.nextPage+')" aria-label="Next">'+
	                '<span aria-hidden="true">&raquo;</span>'+
	                '</a>'+
	              '</li>';
					$("#course_page").append(nextPage);
					$("#course_page li:eq("+page.currentPage+")").attr("class","active");
				}
			}else if(result.status==1){
//				alert(result.message);
			}
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















