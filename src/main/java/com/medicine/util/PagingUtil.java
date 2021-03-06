package com.medicine.util;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.medicine.model.Page;
import com.medicine.model.Role;
import com.medicine.vo.PageView;

@Component("pagingUtil")
public class PagingUtil {
	/** 每页展示数据条数 */
	@Value("#{commonProps[pageSize]}")
	private int pageSize;
	/** 显示超链接的个数 */
	@Value("#{commonProps[hrefNum]}")
	private int hrefNum;

	/**
	 * 计算在页面上显示的超链接中的数字
	 * 
	 * @param currentPage
	 * @param totalCount
	 * @return 当前显示的超链接中的数字集合
	 */
	public List<Integer> getPagingHref(int currentPage, int totalCount) {
		if (pageSize * hrefNum == 0) {
			throw new IllegalArgumentException("请检查配置文件中的参数");
		}
		List<Integer> pagingHref = new ArrayList<>();
		Integer totalPage = (totalCount % pageSize) == 0 ? (totalCount / pageSize) : (totalCount / pageSize) + 1;
		if (totalPage <= hrefNum) {// 总页面数 <= 需要显示的超链接数
			for (int i = 1; i <= totalPage; i++)
				pagingHref.add(i);
		} else { // 总页面数>超链接数
			if (currentPage <= hrefNum / 2) {// 当前页<=(链接数/2)  顶到头的情况
				for (int i = 1; i < hrefNum; i++) {
					pagingHref.add(i); //显示:1/currentPage...currentPage...hrefNum
				}
			}else if((totalPage-currentPage)<= hrefNum/2){// 当前页<=(链接数/2) 顶到尾  
				for(int i=hrefNum;i>1;i--){
					//显示:(totalPage-hrefNum)/currentPage...currentPage...currentPage/totalPage
					pagingHref.add(totalPage-i);
				}
			}else{//左右补满
				for(int i=(currentPage-hrefNum/2);i<=hrefNum;i++){
					//显示:(currentPage-hrefNum/2)...currentPage...(currentPage+hrefNum/2)/(currentPage+hrefNum/2)-1
					//hrefNum: 奇数居中,偶数偏右
					pagingHref.add(i);
				}
			}
		}
		return pagingHref;
	}
	
	/**
	 * 
	 * 根据前台发送的Page,在后台查询计算,并组装为PageView
	 * @param page 页面通用信息
	 * @param count 具体页面所查询结果集总数
	 * @param result 具体页面所查询的结果集
	 * @return 前台展示结果集
	 */
	public PageView pageBuilder(Page page,Integer count,List result){
		PageView pv = new PageView();
		//处理前端传的keyword
		if(page.getKeyWord()==null||page.getKeyWord().equals("undefined"))
			page.setKeyWord("");
		
		Integer totalPage = (count % pageSize) == 0 ? (count / pageSize) : (count / pageSize) + 1;
		
		pv.setTotalPage(totalPage);
		pv.setResult(result);
		pv.setPagingHref(getPagingHref(page.getCurrentPage(),count));
		
		return pv;
	}
	
	

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	public Integer getHrefNum() {
		return hrefNum;
	}

	public void setHrefNum(Integer hrefNum) {
		this.hrefNum = hrefNum;
	}

}
