package com.medicine.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.medicine.model.Role;

@Repository("roleDao")
public interface IRoleDao {
	/**
	 * 查询角色信息
	 * @param currentPage
	 * @param keyWord
	 * @return
	 */
	public List<Role> queryRole(Integer currentPage,String keyWord);
	/**
	 * 查询角色数量
	 * @param currentPage
	 * @param keyWord
	 * @return
	 */
	public Integer queryRoleCount(Integer currentPage,String keyWord);
}
