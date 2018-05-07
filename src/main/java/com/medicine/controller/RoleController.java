package com.medicine.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.medicine.service.IRoleService;

@Controller
@RequestMapping("role")
public class RoleController {
	@Resource(name="roleService")
	private IRoleService roleService;
	/**
	 * 查询角色信息
	 * @return
	 */
	@RequestMapping("/queryRole")
	@ResponseBody
	public Map queryRole(){
		Map map = new HashMap();
		this.roleService.queryRole();
		return map;
				
	}
}
