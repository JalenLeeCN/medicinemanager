package com.medicine.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.medicine.dao.IRoleDao;
import com.medicine.model.Page;
import com.medicine.model.Role;
import com.medicine.service.IRoleService;
import com.medicine.util.PagingUtil;
import com.medicine.vo.PageView;
@Service("roleService")
public class RoleServiceImpl implements IRoleService {
	@Resource(name="roleDao")
	private IRoleDao roleDao;
	@Resource(name="pagingUtil")
	private PagingUtil pagingUtil;

	@Override
	public PageView queryRole(Page page) {
		page.setPageSize(pagingUtil.getPageSize());
		List<Role> roles = this.roleDao.queryRole(page);
		PageView pv = this.pagingUtil.pageBuilder(page, queryRoleCount(page), roles);
		return pv;
	}

	@Override
	public Integer queryRoleCount(Page page) {
		return this.roleDao.queryRoleCount(page);
	}
	
	@Override
	public boolean addRole(String roleName) {
		boolean flag = false;
		try {
			flag = this.roleDao.addRole(roleName);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return flag;
	}
}
