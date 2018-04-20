package com.medicine.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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
	@ResponseBody
	public UserView login(User user){
		user = new User("aa","aa");
		UserView uv = this.enterService.login(user);
		return uv;
	}
	/**
	 * 检查用户名是否存在
	 * @param lgName
	 * @return
	 */
	@RequestMapping("check")
	@ResponseBody
	public boolean checkLoginName(String lgName){
		lgName = "aa";
		boolean flag = false;
		if(this.enterService.checkLoginName(lgName)==true)
			flag = true;
		return flag;
	}
	/**
	 * 注册用户
	 * @param user
	 * @return
	 */
	@RequestMapping("register")
	@ResponseBody
	public boolean register(User user){
		boolean flag = false;
//		user = new User("dd","dd");
		flag = this.enterService.register(user);
		return flag;
	}
	/**
	 * 重置密码
	 * @param user
	 */
	public void resetPwd(User user){
		
	}
}