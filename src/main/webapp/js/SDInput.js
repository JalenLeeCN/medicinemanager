//@ sourceURL=SDInput.js
$(function(){
	//添加供应商表单添加submit事件
	$("#supplyInput form").submit(function(){
		return addProvider();
	});
	//添加制造商表单添加submit事件
	$("#demandInput form").submit(function(){
		return addManufacturer();
	});
});
/**
 * 添加供应商
 * @returns
 */
function addProvider(){
	//获取页面的数据
	var supplyName = $("#supplyName").val();
	var supplyPhone = $("#supplyPhone").val();
	var supplyEmail = $("#supplyEmail").val();
	var supplyAddress = $("#supplyAddress").val();
	// 异步提交
	$.ajax({
		url : basePath + "supply/addprovider",
		type : "post",
		data:{"name":supplyName,"phoneNum":supplyPhone,"email":supplyEmail,"address":supplyAddress},
		dataType : "json",
		success : function() {
			alert("添加成功")
		},
		error : function() {
			alert("请求失败");
		}
	});
	return false;
}
/**
 * 添加制造商
 * @returns
 */
function addManufacturer(){
	//获取页面的数据
	var demandName = $("#demandName").val();
	var demandProdAddress = $("#demandProdAddress").val();
	var demandPostCode = $("#demandPostCode").val();
	var demandPhone = $("#demandPhone").val();
	var demandEmail = $("#demandEmail").val();
	var demandRegAddress = $("#demandRegAddress").val();
	var demandWebsit = $("#demandWebsit").val();
	// 异步提交
	$.ajax({
		url : basePath + "supply/addmanufacturer",
		type : "post",
		data:{"name":demandName,"productAddress":demandProdAddress,"postalCode":demandPostCode,
			"phoneNum":demandPhone,"registerAddress":demandRegAddress,"website":demandWebsit,},
		dataType : "json",
		success : function() {
			alert("添加成功")
		},
		error : function() {
			alert("请求失败");
		}
	});
	return false;
}
