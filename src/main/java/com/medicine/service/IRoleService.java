package com.medicine.service;

import java.util.List;

import com.medicine.model.Role;

public interface IRoleService {
	/**
	 * 查询角色信息
	 * @return
	 */
	public List<Role> queryRole();
}
