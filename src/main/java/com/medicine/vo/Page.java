package com.medicine.vo;

import java.util.List;
import java.util.Map;

import org.apache.poi.ss.formula.functions.T;

public class Page {
	private int currentPage;//当前页数
	private int totalPage;//总页数
	private int pageSize;//每页记录数
	private int previousPage;//前一页
	private int nextPage;//后一页
	
	private List<Integer> pagingHref;//页面上显示的超链接数
	
	protected List result;//存放分页后的数据
	
	public int getPreviousPage() {
		return previousPage;
	}
	public void setPreviousPage(int previousPage) {
		this.previousPage = previousPage;
	}
	public int getNextPage() {
		return nextPage;
	}
	public void setNextPage(int nextPage) {
		this.nextPage = nextPage;
	}
	public int getCurrentPage() {
		return currentPage;
	}
	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}
	public int getTotalPage() {
		return totalPage;
	}
	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
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
