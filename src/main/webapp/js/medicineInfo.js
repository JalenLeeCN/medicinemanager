//@ sourceURL=video.js
var videoId;
$(function(){
	
	//显示视频分类button
	showAllClass();
	
	//给删除modal框的submit按钮添加事件
	$("#video_del_button").click(function(){
		var dom = getVideoNode(videoId,"delV")
		return deleteVideo(dom,videoId);
	});
	//显示第一页数据
	querySimpleInfo(1);
});
//刷空详情页
function emptyVideoDesc(){
//	alert("emptyVideoDesc");
	var h_ele = '<h2>请点击课程名查看具体信息</h2>';
	$("#video_detail div div").html("");
	$("#video_detail div div").append(h_ele);
}
//显示详情
function showVideoDetail(value_json){
//	alert("videoDetail");
//	var video = JSON.parse(value_json);//json串转为json对象
//	var video = eval("("+value_json+")")
	$("#video_detail div div").html("");
	alert("showVideoDetail-->"+video);
//	alert("video.id-->"+video.id);
	var div_ele = '<div class="embed-responsive embed-responsive-16by9 col-md-9">'+
   '<iframe class="embed-responsive-item" src="'+video.picture+'"></iframe>'+
   '</div>'+
    '<div class="caption col-md-3">'+
       '<h3>'+video.title+'</h3>'+
       '<p><span>视频路径 : </span>'+video.urlCC+'</p>'+
       '<p><span>课程名称 : </span>'+video.courseName+'</p>'+
       '<p><span>讲师名称 : </span>'+video.userName+'</p>'+
       '<p><span>推荐等级 : </span>'+video.special+'</p>'+
       '<p><span>难度等级 : </span>'+video.difficulty+'</p>'+
       '<p><span>点击次数 : </span>'+video.clickCount+'</p>'+
       '<p><span>上架日期 : </span>'+video.ontime+'</p>'+
       '<p><span>是否购买 : </span>'+video.forsale+'</p>'+
       '<p><span>审核状态 : </span>'+video.state+'</p>'+
       '<p><span>视频介绍 : </span>'+video.introduction+'</p>'+
     '<div class="rows">'+
        '<button type="button" class="btn btn-success">通过</button>'+
       	'<button type="button" id="editV'+video.id+'" onclick="setIdClick(\''+video.id+'\')" class="btn btn-primary">编辑</button>'+
        '<button type="button" id="delV'+video.id+'" onclick="setIdClick(\''+video.id+'\')" class="btn btn-danger">删除</button>'+
     '</div>'+
'</div>';
	$("#video_detail div div").append(div_ele);
}
//编辑 删除 超链接  设置全局变量videoId为当前id,由编辑删除方法调用执行操作
function setIdClick(id){
	videoId = id;
}
//拼接id
function getVideoNode(videoId,type){
	return $("#"+type+videoId);
}
//显示视频分类button
function showAllClass(){
	$.ajax({
		url:basePath+"ShowAllClassServlet",
		type:"post",
		dataType:"json",
		success:function(result){
			if(result.status==0){
				$("#course_button").html("");
				var page = result.data;
				var course = page.data;
				$(course).each(function(n,value){
					var button_ele = '<button type="button" class="btn btn-default" value="'+value.id+'">'+value.name+'</button>';
					$("#course_button").append(button_ele);
				})
			}
		},
		error:function(){
//			alert("视频类型请求失败");
		}
	});
}
//显示数据
function querySimpleInfo(currentPage){
//	alert($("#video_search").val());
	var drugKeyWord = $("#video_search").val();
	if(videoKeyWord==""){
		videoKeyWord = "undefined";
	}
	$.ajax({
		url:basePath+"FindVideoByPageServlet",
		type:"post",
		data:{"currentPage":currentPage,"videoKeyWord":videoKeyWord},
		dataType:"json",
		success:function(result){
			if(result.status==0){
				$("#video_show_row1").html("");
				$("#video_show_row2").html("");
				$("#video_page").html("");
				var page = result.data;
				var vedio = page.data;
				$(vedio).each(function(n,value){
					var value_json = JSON.stringify(value);//json对象转化为json串
//					alert("vedio--->"+value_json);
					//class="col-md-3" 栅格系统  将屏幕分为12格  可以动态变化 布局不乱
					var div_ele = '<div class="col-md-3">'+
					'<div class="thumbnail">'+
					'<img src="'+value.picture+'" alt="此处有视频图片">'+
					'<div class="caption">'+
					'<h3><a href="#videoDesc" aria-controls="videoDesc" role="tab" data-toggle="tab"'+
//				              ' onclick="showVideoDetail(\''+value+'\')" >'+
					' onclick=showVideoDetail('+value_json+') >'+
					value.title+'</a></h3>'+
					'<p><span>上传日期 : </span>'+timeToDate(value.ontime)+'</p>'+
					'<p><span>视频介绍 : </span>'+value.introduction+'</p>'+
					'</div>'+
					'</div>'+
					'</div>';
//					var test_ele = '<span>'+n+'</span><br>';
					//每次查询8条 0-3挂到上面的row div的dom树上
					if(n<4){
						$("#video_show_row1").append(div_ele);
					}else{
						$("#video_show_row2").append(div_ele);
					}
				});
				if(page.aNum.length>0){
					var previousPage = '<li>'+
					'<a href="javascript:findVideo('+page.previousPage+')" aria-label="Previous">'+
					'<span aria-hidden="true">&laquo;</span>'+
					'</a>'+
					'</li>';
					$("#video_page").append(previousPage);
					$(page.aNum).each(function(n,value){
						var middlePage = '<li><a href="javascript:findVideo('+value+')">'+value+'</a></li>';
						$("#video_page").append(middlePage);
					});
					var nextPage = '<li>'+
					'<a href="javascript:findVideo('+page.nextPage+')" aria-label="Next">'+
					'<span aria-hidden="true">&raquo;</span>'+
					'</a>'+
					'</li>';
					$("#video_page").append(nextPage);
					$("#video_page li:eq("+page.currentPage+")").attr("class","active");
				}
			}else{
//				alert(result.message);
			}
		},
		error:function(){
//			alert("请求失败");
		}
	});
}
//删除数据
function deleteVideo(dom,videoId){
	$.ajax({
		url:basePath+"DeleteVideoServlet",
		type:"post",
		data:{"videoId":videoId},
		dataType:"json",
		success:function(result){
			if(result.status==0){
				
			}else{
//				alert(result.message);
			}
		},
		error:function(){
//			alert("请求失败");
		}
	});
}
//将时间转换为正常日期格式
function timeToDate(time){
	var date = new Date(time);
	var y = date.getFullYear();
	var m = date.getMonth()+1;
	var d = date.getDate();
//	alert("-->"+y+"-"+m+"-"+d)
	//补充成为标准格式
	return y+"-"+add0(m)+"-"+add0(d);
//	return y+"-"+m+"-"+d;
}
function add0(m){
	return m<10?'0'+m:m;
}