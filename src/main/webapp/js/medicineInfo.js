var type = null;
$(function(){
	console.log("start...");
	querySimpleInfo(1);
})
//设置分类按钮值
function setType(e){
	type = $(e).val();
	console.log(type);
}
//显示数据
function querySimpleInfo(currentPage){
//	debugger;
	console.log("querySimpleInfo()");
	var drugKeyWord = $("#drugKeyWord").val();
	console.log(drugKeyWord);
	$.ajax({
		url:"medicine/simpleInfo",
		type:"post",
		data:{"currentPage":currentPage,"keyWord":drugKeyWord,"type":type},
		dataType:"json",
		success:function(pv){
			console.log("success...");
			var result = pv.result;
			console.log(result);
			$("#drugSimpleInfo").html("");
			$(result).each(function(index,e){
				var drugInfo = '<div class="col-md-3">'+
									'<div class="thumbnail">'+
										'<a href="#drugDesc"> <img src="'+e.picture+'"'+
											'alt='+e.name+'>'+
										'</a><span hidden="true">'+e.id+'</span>'+
									'<div class="caption">'+
										'<a href="" data-toggle="modal"  data-target="#drugDetail"'+
											'onclick=showDrugDetail("'+e.name+'","'+e.unitPrice+'","'
											+e.manufacturerName+'","'+e.providersName+'","'+e.quantity+'","'
											+e.scale+'")><h3>'+e.name+'</h3></a>'+
											'<p><span>制造商  :</span>'+e.providersName+'</p>'+
											'<p><span>供应商 :</span>'+e.manufacturerName+'</p>'+
									'</div>'+
								'</div>'+
							'</div>';
				$("#drugSimpleInfo").append(drugInfo);
			});
		},
		error:function(){
			alert("请求失败");
		}
	});
}

//显示药品详情
function showDrugDetail(name,unitPrice,manufacturerName,providersName,quantity,scale){
//	console.log(e);
	$("#drugName").html(name);
	$("#drugPrice").html(unitPrice);
	$("#drugProd").html(manufacturerName);
	$("#drugProv").html(providersName);
	$("#drugQuantity").html(quantity);
	$("#drugScale").html(scale);
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