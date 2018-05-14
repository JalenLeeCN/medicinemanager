package com.medicine.vo;

import java.util.List;

import com.medicine.model.Page;
/**
 * 发往前台的页面信息
 * @author Administrator
 *
 */
public class PageView extends Page{
	
	private List<Integer> pagingHref;//页面上显示的超链接数
	
	protected List result;//存放分页后的数据
	
	public List<Integer> getPagingHref() {
		return pagingHref;
	}
	public void setPagingHref(List<Integer> pagingHref) {
		this.pagingHref = pagingHref;
	}
	public List getResult() {
		return result;
	}
	public void setResult(List result) {
		this.result = result;
	}
}
