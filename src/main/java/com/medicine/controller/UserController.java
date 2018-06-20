package com.medicine.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.medicine.model.Page;
import com.medicine.service.IUserService;
import com.medicine.vo.PageView;

@Controller
@RequestMapping("user")
public class UserController {
	@Resource(name="userService")
	private IUserService userService;
	/**
	 * 查询用户信息
	 * @param page
	 * @return
	 */
	@RequestMapping("/qryUser")
	@ResponseBody
	public PageView qryUserInfo(Page page) {
		PageView pv = this.userService.qryUserInfo(page);
		return pv;
	}
}
