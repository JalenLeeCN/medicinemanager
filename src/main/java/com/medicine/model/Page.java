package com.medicine.model;

/**
 * 前台传入的页面信息
 * @author Administrator
 *
 */
public class Page {
	private int currentPage;//当前页数
	private int totalPage;//总页数
	private int pageSize;//每页记录数
	private int previousPage;//前一页
	private int nextPage;//后一页
	
	private int offset;//分页查询偏移量
	
	private String keyWord;//关键字
	
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
	public String getKeyWord() {
		return keyWord;
	}
	public void setKeyWord(String keyWord) {
		this.keyWord = keyWord;
	}
	/**
	 * 处理数据库中查询的分页条件 
	 * @return
	 */
	public int getOffset() {
		offset = (currentPage - 1)*pageSize;
		return offset;
	}
	public void setOffset(int offset) {
		this.offset = offset;
	}
	
}
