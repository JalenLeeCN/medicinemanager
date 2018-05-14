package com.medicine.service;

import com.medicine.model.Page;
import com.medicine.vo.PageView;

public interface IRoleService {
	/**
	 * 查询角色信息
	 * @param page
	 * @return
	 */
	public PageView queryRole(Page page);
	/**
	 * 查询角色总数
	 * @param page
	 * @return
	 */
	public Integer queryRoleCount(Page page);
	/**
	 * 添加角色
	 * @param roleName
	 * @return
	 */
	public boolean addRole(String roleName);
}
