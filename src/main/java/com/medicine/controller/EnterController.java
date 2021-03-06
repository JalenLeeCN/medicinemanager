package com.medicine.controller;

import javax.annotation.Resource;
import javax.mail.MessagingException;

import org.apache.commons.io.filefilter.TrueFileFilter;
import org.springframework.stereotype.Controller;
import org.springframework.test.context.transaction.TransactionConfiguration;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.medicine.model.User;
/**
 * 登录 注册  重置密码
 * @author Administrator
 *
 */
import com.medicine.service.IEnterService;
import com.medicine.util.RandomPwdUtil;
import com.medicine.vo.UserView;

@Controller
@RequestMapping("enter")
@SessionAttributes({ "", "" })
public class EnterController {
	@Resource(name = "enterService")
	private IEnterService enterService;
	@Resource(name = "randomPwdUtil")
	RandomPwdUtil randomPwdUtil;

	/**
	 * 登录 根据所传参数分为两种登录类型: 0.账密登录 1.验证码登录
	 * 
	 * @param name
	 * @param pwd
	 * @param flag
	 * @return
	 */
	@RequestMapping(value = "login/{name}/{pwd}/{flag}", method = RequestMethod.GET)
	@ResponseBody
	public UserView login(@PathVariable("name") String name, @PathVariable("pwd") String pwd,
			@PathVariable("flag") Integer flag) {
		UserView uv = new UserView();
		User user = new User();
		user.setName(name);
		if (flag == 0)
			user.setPassword(pwd);
		else if (flag == 1)
			user.setVerification(pwd);
		uv = this.enterService.login(user);
		return uv;
	}

	/**
	 * 检查用户名是否存在
	 * 
	 * @param lgName
	 * @return
	 */
	@RequestMapping("check")
	@ResponseBody
	public boolean checkLoginName(String lgName) {
		lgName = "aa";
		boolean flag = false;
		if (this.enterService.checkLoginName(lgName) == true)
			flag = true;
		return flag;
	}

	/**
	 * 注册
	 * 
	 * @param name
	 * @param pwd
	 * @param email
	 * @return
	 */
	@RequestMapping("register")
	@ResponseBody
	public boolean register(@PathVariable("name") String name, @PathVariable("pwd") String pwd,
			@PathVariable("email") String email) {
		boolean flag = false;
		User user = new User();
		user.setName(name);
		user.setPassword(pwd);
		user.setEmail(email);
		flag = this.enterService.register(user);
		return flag;
	}

	/**
	 * 发送验证码
	 * 
	 * @param user
	 */
	@RequestMapping("verfication")
	@Transactional(rollbackFor = RuntimeException.class, readOnly = true)
	public void sendVerificationCode(User user) {
		try {
			// 获取验证码
			String vcode = this.randomPwdUtil.rdmPwdProducer();
			user.setVerification(vcode);
			//修改验证码
			this.enterService.alterVerificationCode(user);
			// 发送邮件
			this.enterService.sendEmial(vcode);
		} catch (NumberFormatException e) {
			e.printStackTrace();
		} catch (MessagingException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
