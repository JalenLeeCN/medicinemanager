package com.medicine.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.medicine.model.User;
/**
 * 登录 注册  重置密码
 * @author Administrator
 *
 */
import com.medicine.service.IEnterService;
import com.medicine.vo.UserView;
@Controller
@RequestMapping("enter")
public class EnterController {
	@Resource(name="enterService")
	private IEnterService enterService;
	/**
	 * 登录
	 * @param user
	 * @return
	 */
	@RequestMapping("login")
	public UserView login(User user){
		return this.enterService.login(user);
	}
}
