package com.medicine.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.medicine.model.Page;
import com.medicine.service.IRoleService;
import com.medicine.util.PagingUtil;
import com.medicine.vo.PageView;

@Controller
@RequestMapping("role")
public class RoleController {
	@Resource(name="roleService")
	private IRoleService roleService;
	@Resource(name="pagingUtil")
	private PagingUtil pagingUtil;
	/**
	 * 查询角色信息
	 * @param page
	 * @return
	 */
	@RequestMapping("/queryRole")
	@ResponseBody
	public PageView queryRole(Page page){
		PageView pv = this.roleService.queryRole(page);
		return pv;
	}
	/**
	 * 增加角色
	 * @param roleName
	 * @return
	 */
	@RequestMapping(value="/addtion",method=RequestMethod.POST)
	@ResponseBody
	public boolean addRole(String roleName){
		return this.roleService.addRole(roleName);
	}
	
}
