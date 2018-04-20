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
		User u = new User("aa","aa");
		UserView uv = this.enterService.login(u);
		System.out.println(uv.toString());
//		if(uv.getName()==null)
			
		return uv;
	}
	
	public boolean checkLoginName(String lgName){
		boolean flag = false;
		
		return flag;
	}
}
