package com.medicine.service;

import com.medicine.vo.Page;

public interface IRoleService {
	
	public Page queryRole(int currentPage,String keyWord);
	/**
	 * 查询角色总数
	 * @param currentPage
	 * @param keyWord
	 * @return
	 */
	public Integer queryRoleCount(int currentPage,String keyWord);
}
