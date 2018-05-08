package com.medicine.service;

import java.util.List;

import com.medicine.model.Role;

public interface IRoleService {
	/**
	 * 查询角色信息
	 * @param currentPage
	 * @param keyWord
	 * @return
	 */
	public List<Role> queryRole(int currentPage,String keyWord);
	/**
	 * 查询角色总数
	 * @param currentPage
	 * @param keyWord
	 * @return
	 */
	public Integer queryRoleCount(int currentPage,String keyWord);
}
