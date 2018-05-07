package com.medicine.util;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component("pagingUtil")
public class PagingUtil {
	/**每页展示数据条数*/
	@Value("#{commonProps[pageSize]}")
	private int pageSize;
	/**显示超链接的个数*/
	@Value("#{commonProps[hrefNum]}")
	private int hrefNum;
	/**
	 * 计算在页面上显示的超链接中的数字
	 * @param currentpage
	 * @param totalCount
	 * @return 当前显示的超链接中的数字集合
	 */
	public List<Integer> getPagingHref(int currentpage,int totalCount){
		if(totalCount*pageSize*currentpage==0){
			throw new IllegalArgumentException("请检查数据或配置文件中的参数");
		}
		List<Integer> pagingHref = new ArrayList<>();
		Integer totalPage = (totalCount%pageSize)==0 ? (totalCount/pageSize) : (totalCount/pageSize)+1;
		if(totalPage<=hrefNum){//总页面数 <= 需要显示的超链接数
			for(int i=1; i<totalPage;i++)
				pagingHref.add(i);
		}else{
			
		}
		return pagingHref;
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
