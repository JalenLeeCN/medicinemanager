//@ sourceURL=SDManagement.js
$(function(){
	//进入页面初始化查询
	qryProvider(1);
});
/**
 * 查询供应商
 * @param currentPage
 * @returns
 */
function qryProvider(currentPage){
	var provKeyword = $("#provKeyword").val();
	// 异步提交
	$.ajax({
		url : basePath + "supply/providerInfo",
		type : "post",
		data:{"currentPage":currentPage,"keyWord":provKeyword},
		dataType : "json",
		success : function(pv) {
			var result = pv.result;
			console.log(result);
			$("#provTable tbody").html("");
			$(result).each(function(index,e){
				var provInfo = '<tr>'+
									'<td>'+e.id+'</td>'+
									'<td>'+e.name+'</td>'+
									'<td>'+e.phoneNum+'</td>'+
									'<td>'+e.email+'</td>'+
									'<td>'+e.address+'</td>'+
									'<td><a href="" data-toggle="modal" data-target="#editSupply">'+
										'<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>编辑</a>'+
										'<a href="" data-toggle="modal" data-target=".bs-example-modal-sm">'+
										'<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除</a>'+
									'</td>'+
								'</tr>';
				$("#provTable tbody").append(provInfo);
			});
		},
		error : function() {
			alert("请求失败");
		}
	});
	return false;
}
/**
 * 查询制造商
 * @param currentPage
 * @returns
 */
function qryManufacturer(currentPage){
	var prodKeyword = $("#prodKeyword").val();
	// 异步提交
	$.ajax({
		url : basePath + "supply/manufacturerInfo",
		type : "post",
		data:{"currentPage":currentPage,"keyWord":prodKeyword},
		dataType : "json",
		success : function(pv) {
			var result = pv.result;
			$("#prodTable tbody").html("");
			$(result).each(function(index,e){
				var prodInfo = '<tr>'+
									'<td>'+e.id+'</td>'+
									'<td>'+e.name+'</td>'+
									'<td>'+e.productAddress+'</td>'+
									'<td>'+e.postalCode+'</td>'+
									'<td>'+e.phoneNum+'</td>'+
									'<td>'+e.faxNo+'</td>'+
									'<td>'+e.website+'</td>'+
									'<td>'+e.registerAddress+'</td>'+
									'<td><a href="" data-toggle="modal" data-target="#editDemand">'+
											'<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>编辑</a>'+
											'<a href="" data-toggle="modal"'+
											'data-target=".bs-example-modal-sm">'+
											'<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除</a>'+
									'</td>'+
								'</tr>';
				$("#prodTable tbody").append(prodInfo);
			});
		},
		error : function() {
			alert("请求失败");
		}
	});
	return false;
}
