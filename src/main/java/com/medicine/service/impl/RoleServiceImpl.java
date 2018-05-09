package com.medicine.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.medicine.dao.IRoleDao;
import com.medicine.model.Role;
import com.medicine.service.IRoleService;
import com.medicine.util.PagingUtil;
import com.medicine.vo.Page;
@Service("roleService")
public class RoleServiceImpl implements IRoleService {
	@Resource(name="roleDao")
	private IRoleDao roleDao;
	@Resource(name="pagingUtil")
	private PagingUtil pagingUtil;

	@Override
	public Page queryRole(int currentPage, String keyWord) {
		Page page = new Page();
		page.setTotalPage(queryRoleCount(currentPage, keyWord));
		List<Role> roles = this.roleDao.queryRole(currentPage,keyWord); 
		page.setResult(roles);
		page.setPagingHref(pagingUtil.getPagingHref(currentPage,page.getTotalPage()));
		return page;
	}

	@Override
	public Integer queryRoleCount(int currentPage, String keyWord) {
		return this.roleDao.queryRoleCount(currentPage,keyWord);
	}
}
