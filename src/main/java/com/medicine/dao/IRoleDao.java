package com.medicine.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.medicine.model.Role;

@Repository("roleDao")
public interface IRoleDao {
	/**
	 * 查询角色信息
	 * @return
	 */
	public List<Role> queryRole();
}
