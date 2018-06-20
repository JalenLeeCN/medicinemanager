//@ sourceURL=main.js

$(function(){
	// 注册面板关闭事件
	$(".panel .close").click(function(){
		close_panel(this);
	});
	// 注册面板重置事件
	$(".glyphicon-refresh").click(function(){
		reset_panel();
	});
	// 画用户统计饼状图
	draw_user();
	// 画视频统计环行图
	draw_video();
});

// 关闭面板
function close_panel(btn) {
	$(btn).parent().parent().parent().fadeOut(200);
}

// 重置面板
function reset_panel() {
	$(".panel").parent().fadeIn(200);
}
//人员统计饼状图
function draw_user() {
	var data;
	$.ajax({
		url:"home/roleStatistics",
		type:"post",
		dataType:"json",
		success:function(result){
//			data = JSON.stringify(result);
//			console.log("draw_user  str-->"+data);
			var ctx = document.getElementById("chart-user").getContext("2d");
			//此处传json对象  
			console.log("result 传入-->"+result);
			window.myDoughnut = new Chart(ctx).Doughnut(result, {responsive : true});
		},
		error:function(){
//			alert("获取人员信息失败")
		}
	});
}

function draw_video() {
    var randomScalingFactor = function(){ return Math.round(Math.random()*5)};
    var randomScalingFactor_255 = function(){ return Math.round(Math.random()*5)};
    var radom_color = function(){
        return '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).slice(-6);
    }
    var barChartData = {
        labels : ["人员管理员","超级管理员","药品录入员","药品管理员","角色管理员","游客"],
        datasets : [
            {
//                fillColor : "rgba(" + randomScalingFactor_255() + "," + randomScalingFactor_255() + "," + randomScalingFactor_255() + ",0.5)",
//                strokeColor : "rgba(" + randomScalingFactor_255()+","+ randomScalingFactor_255()+"," + randomScalingFactor_255() + ",0.8)",
//                highlightFill: "rgba(" + randomScalingFactor_255() + "," + randomScalingFactor_255() + "," + randomScalingFactor_255() + ",0.75)",
//                highlightStroke: "rgba(" + randomScalingFactor_255() + "," + randomScalingFactor_255() + "," + randomScalingFactor_255() + ",1)",
                data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
            },
        ]
    }
    var ctx = document.getElementById("chart-video").getContext("2d");
    window.myBar = new Chart(ctx).Bar(barChartData, {
        responsive : true
    });
}