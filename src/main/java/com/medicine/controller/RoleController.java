package com.medicine.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.medicine.model.Role;
import com.medicine.service.IRoleService;
import com.medicine.util.PagingUtil;
import com.medicine.vo.Page;

@Controller
@RequestMapping("role")
public class RoleController {
	@Resource(name="roleService")
	private IRoleService roleService;
	@Resource(name="pagingUtil")
	private PagingUtil pagingUtil;
	/**
	 * 查询角色信息
	 * @return
	 */
	@RequestMapping("/queryRole/{currentPage}/{keyWord}")
	@ResponseBody
	public Page queryRole(@PathVariable("currentPage") int currentPage,
						  @PathVariable("keyWord") String keyWord){
		Page page = new Page();
		List<Role> roles = this.roleService.queryRole(currentPage,keyWord);
		int totalCount = this.roleService.queryRoleCount(currentPage,keyWord);
		page.setResult(roles);
		page.setPagingHref(this.pagingUtil.getPagingHref(currentPage, totalCount));
		return page;
	}
}
