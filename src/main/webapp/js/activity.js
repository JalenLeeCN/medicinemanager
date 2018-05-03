//@ sourceURL=activity.js
var actId;

$(function(){
	//给删除modal框的确认按钮添加click事件
	$("#delAct_button").click(function(){
		var dom = getActNode(actId,"delAct");
		return deleteAct(actId, dom);
	});
	//给新增的确认button添加submit事件
	$("#addActPanel form").submit(function(){
		console.log("---activity add button submit");
		return addAct();
	});
    //给模糊查询添加click事件
	$("#act_search_button").click(function(){
		return findAct(1);
	});
/*	//给详情的页签添加click事件 不通过详情超链接跳转就刷空页面
	$("#actDetailPanel").click(function(){
		return emptyDetailPanel();
	});*/
	//显示活动列表
	findAct(1);
});
//刷空详情页
function emptyDetailPanel(){
	var h_ele = '<h2>请点击列表页面详情查看具体信息</h2>'
	$("#actDetailPanel div div div").html("");
	$("#actDetailPanel div div div").append(h_ele);
}
//显示活动
function findAct(currentPage){
	var actKeyWord = $("#act_search").val();
	$("#actPanel table tbody").html("");
	$("#act_page").html("");
	if(actKeyWord==""){
		actKeyWord = "undefined";
	}
	$.ajax({
		url:basePath+"FindActByPageServlet",
		type:"post",
		data:{"currentPage":currentPage,"actKeyWord":actKeyWord},
		dataType:"json",
		success:function(result){
			if(result.status==0){
				$("#actPanel table tbody").html("");
				$("#act_page").html("");
				var page = result.data;
				var act = page.data;
				$(act).each(function(n,value){
					var tr_ele = '<tr>'+
					'<td>'+(n+1)+'</td>'+
					'<td><a href="#">'+value.title+'</a></td>'+
					'<td>'+value.picture+'</td>'+
					'<td>'+timeToDate(value.actDate)+'</td>'+
					'<td>'+value.location+'</td>'+
					'<td>'+value.persons+'</td>'+
					'<td>'+value.cost+'</td>'+
					'<td>'+
					'<a href="#actDetailPanel" aria-controls="addActPanel" data-toggle="tab" onclick=detailActClick(\''+value.id+'\') id="detailAct'+value.id+'" "><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>详情</a>'+
					'<a href="" onclick=updateActClick(\''+value.id+'\') id="editAct'+value.id+'" data-toggle="modal" data-target="#editUser"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>编辑</a>'+
					'<a href="" onclick=deleteActClick(\''+value.id+'\') id="delAct'+value.id+'" data-toggle="modal" data-target=".bs-example-modal-sm"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除</a>'+
					'</td>'+
					'</tr>';
					$("#actPanel table tbody").append(tr_ele);
				});
				
				if(page.aNum.length>0){
					var previousPage =  '<li>'+
		                '<a href="javascript:findAct('+page.previousPage+')" aria-label="Previous">'+
		                '<span aria-hidden="true">&laquo;</span>'+
		                '</a>'+
		              '</li>';
					//将前一页追加到用户页的dom树
					$("#act_page").append(previousPage);
	
					//处理中间页
					//aNum为当前显示的页数,循环输出每一个aNum代表的页面
					$(page.aNum).each(function(n,value){
						var middlePage = '<li><a href="javascript:findAct('+value+')">'+value+'</a></li>';
						$("#act_page").append(middlePage);
					});
					//处理下一页
					var nextPage =  '<li>'+
	                '<a href="javascript:findAct('+page.nextPage+')" aria-label="Next">'+
	                '<span aria-hidden="true">&raquo;</span>'+
	                '</a>'+
	              '</li>';
					$("#act_page").append(nextPage);
					$("#act_page li:eq("+page.currentPage+")").attr("class","active");
				}
			}else if(result.status==1){
				alert(result.message);
			}
		},
		error:function(){
//			alert("请求失败");
		}
	});
}
//获取当前超链接的tr行(拼接每行超链接的Id)
function getActNode(actId,type){
	return $("#"+type+actId).parent().parent();
}
//将时间转换为正常日期格式
function timeToDate(time){
	var date = new Date(time);
	var y = date.getFullYear();
	var m = date.getMonth()+1;
	var d = date.getDate();
	//补充成为标准格式
	return y+"-"+add0(m)+"-"+add0(d);
//	return y+"-"+m+"-"+d;
}
function add0(m){
	return m<10?'0'+m:m;
}
//查看超链接点击事件
function detailActClick(id){
	$.ajax({
		url:basePath+"DetailActServlet",
		type:"post",
		data:{"actId":id},
		dataType:"json",
		success:function(result){
			$("#actDetailPanel div div div").html("");
			if(result.status==0){
				var act = result.data;
				var div_ele='<div class="media-left">'+
					'<a href="#">'+
					'<img class="media-object img-circle" src="'+act.picture+'" alt="头像">'+
					'</a>'+
					'</div>'+
					'<div class="media-body">'+
					'<h1 class="media-heading">'+act.title+'</h1>'+
					'<br/>'+
					'<p>标题：<span>'+act.title+'</span></p>'+
					'<p>日期：<span>'+act.actDate+'</span></p>'+
					'<p>地点：<span>'+act.location+'</span></p>'+
					'<p>人数：<span>'+act.persons+'</span></p>'+
					'<p>花费：<span>'+act.cost+'</span></p>'+
					'<p>经度：<span></span>'+act.longitude+'</p>'+
					'<p>纬度：<span></span>'+act.latitude+'</p>'+
					'<p>发起人：<span>'+act.userName+'</span></p>'+
					'<p>细节：<span>'+act.details+'</span></p>'+
					'<div class="rows">'+
					'<button type="button" class="btn btn-success">通过</button>'+
					'<button type="button" class="btn btn-danger">拒绝</button>'+
					'<a href="#actPanel" aria-controls="actPanel" data-toggle="tab" >返回列表</a>'+
					'</div>'+
					'</div>';
				$("#actDetailPanel div div div").append(div_ele);
			}
		},
		error:function(){
//			alert("请求失败");
		}
	});
}

//编辑超链接click事件
function updateActClick(id){
	return false;
}
//点击新增刷新出课程下拉列表
function showCourseSelect(){
	$.ajax({
		url:basePath+"ShowCourseSelectServlet",
		type:"post",
		dataType:"json",
		success:function(result){
			$("#add_courseId").html("");
			if(result.status==0){
				var courseNames = result.data;
				$(courseNames).each(function(n,value){
					var option_ele = '<option value="'+value.id+'">'+value.name+'</option>';
					$("#add_courseId").append(option_ele);
				});
			}else{
				alert(result.message);
			}
		},
		error:function(){
//			alert("请求失败");
		}
	});
}
//新增活动
function addAct(){
	alert("addAct()");
	var actTitle = $("#add_activityName").val();
	var actDate = $("#add_activityDate").val();
	var actPeoNum = $("#add_activityPeoNum").val();
	var actPlace = $("#add_activityPlace").val();
	var actLongitude = $("#add_longitude").val();
	var actLatitude = $("#add_latitude").val();
	var actCost = $("#add_activityCost").val();
//	var InitiatorName = $("#add_initiator").text();
//	var actInitiator = $("#add_initiator").val();
	var actInitiator = userId;
	
//	var CourseName = $("#add_courseId").text();
	var actCourse = $("#add_courseId").val();
	var actPictPath = $("#add_picture").val();//得到路径
	var actPicture = actPictPath.substring(actPictPath.lastIndexOf("\\")+1);//拆出图片名称
	var actDesc = $("#add_activityDesc").val();
	$.ajax({
		url:basePath+"AddActServlet",
		type:"post",
		data:{"actTitle":actTitle,"actDate":actDate,"actPeoNum":actPeoNum,"actPlace":actPlace,
			"actLongitude":actLongitude,"actLatitude":actLatitude,"actCost":actCost,
			"actInitiator":actInitiator,"actCourseId":actCourse,
			"actPicture":actPicture,"actDesc":actDesc},
		dataType:"json",
		success:function(result){
			if(result.status==0){
				alert(result.message);
				//如果存储成功就调用上传图片的方法
				var fileId = "add_picture";
				uploadPicutre(fileId);
			}else{
				alert(result.message);
			}
		},
		error:function(){
//			alert("请求失败");
		}
	});
	$("#active_tab a[href='#actPanel']").tab("show");
	return false;
}
//检查用户名是否存在 且带回id值设置为其value
function checkUserName(){
	var InitiatorName = $("#add_initiator").val();
	$.ajax({
		url:basePath+"CheckUserLoginNameServlet",
		type:"post",
		data:{"userLoginName":InitiatorName},//此处功能与检查登录名是否相同代码一致
		dataType:"json",
		async:false,
		success:function(result){
			if(result.status==1){//等于1说明用户名存在
				var user = result.data;
				userId = user.id;
				$("#add_init_span").html("用户名正确").css("color","green");
			}else{
				$("#add_init_span").html("用户名有误,请确认后输入").css("color","red");
			}
		},
		error:function(){
//			alert("请求失败");
		}
	});
	return userId;
}
/*//新增活动 选择发起人 通过名字找id
function selectUser(){
	var name = $("#add_initiator").val();
	var userId = "";
	$.ajax({
		url:basePath+"SelectActUserServlet",
		type:"post",
		data:{"userName":name},
		dataType:"json",
		success:function(result){
			var id= result.data;
			if(result.status==0){
				userId = id;
			}else{
				alert(result.message);
			}
		},
		error:function(){
			alert("请求失败");
		}
	});
	return userId;
}*/
/*//新增活动 选择课程 通过名字找id
function selectCourse(){
	var name = $("#add_courseId").val();
	var courseId = "";
	$.ajax({
		url:basePath+"SelectActCourseServlet",
		type:"post",
		data:{"courseName":name},
		dataType:"json",
		success:function(result){
			if(result.status==0){
				alert("courseId="+result.data);
				courseId = result.data;
			}else{
				alert(result.message);
			}
		},
		error:function(){
			alert("请求失败");
		}
	});
	return courseId;
}*/
//图片上传
function uploadPicutre(fileId){
	$.ajaxFileUpload({
		url:basePath+"UploadServlet",
		secureuri:false,
		fileElementId:fileId,
		type:"post",
		dataType:"json",
		success:function(result){
			if(result.status==0){
				alert(result.message);
			}else{
				alert(result.message);
			}
		},
		error:function(){
//			alert("请求失败");
		}
	});
}
//删除超链接点击事件(由超链接调用,设置所点的超链接的id)
function deleteActClick(id){
	actId = id;
}
//删除活动(此方法由删除modal框的确认submit事件调用)
function deleteAct(actId,dom){
	$.ajax({
		url:basePath+"DeleteActServlet",
		type:"post",
		data:{"actId":actId},
		dataType:"json",
		success:function(result){
			if(result.status==0){
				alert(result.message);
				dom.remove();
			}else{
				alert(result.message);
			}
		},
		error:function(){
//			alert("请求失败");
		}
	});
	$("#deleteAct_modal").modal("toggle");
}