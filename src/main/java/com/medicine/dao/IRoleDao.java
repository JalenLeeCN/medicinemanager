package com.medicine.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.medicine.model.Page;
import com.medicine.model.Role;

@Repository("roleDao")
public interface IRoleDao {
	/**
	 * 查询角色信息
	 * @param page
	 * @return
	 */
	public List<Role> queryRole(Page page);
	/**
	 * 查询角色数量
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
