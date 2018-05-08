package com.medicine.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.medicine.dao.IRoleDao;
import com.medicine.model.Role;
import com.medicine.service.IRoleService;
@Service("roleService")
public class RoleServiceImpl implements IRoleService {
	@Resource(name="roleDao")
	private IRoleDao roleDao;

	@Override
	public List<Role> queryRole(int currentPage, String keyWord) {
		return this.roleDao.queryRole(currentPage,keyWord);
	}

	@Override
	public Integer queryRoleCount(int currentPage, String keyWord) {
		return this.roleDao.queryRoleCount(currentPage,keyWord);
	}
}
