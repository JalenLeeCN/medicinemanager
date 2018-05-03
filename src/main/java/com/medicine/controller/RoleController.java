package com.medicine.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.medicine.model.Role;
import com.medicine.service.IRoleService;

@Controller
@RequestMapping("role")
public class RoleController {
	@Resource(name="roleService")
	private IRoleService roleService;
	
	@RequestMapping("/queryRole")
	@ResponseBody
	public List<Role> queryRole(){
		return this.roleService.queryRole();
	}
}
