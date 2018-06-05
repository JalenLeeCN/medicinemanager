package com.medicine.service;

import javax.mail.MessagingException;

import com.medicine.model.User;
import com.medicine.vo.UserView;

public interface IEnterService {
	/**
	 * 登录
	 * @return
	 */
	public UserView login(User user);
	/**
	 * 检查用户名是否存在
	 * @param lgName
	 * @return
	 */
	public boolean checkLoginName(String lgName);
	/**
	 * 注册用户
	 * @param user
	 * @return
	 */
	public boolean register(User user);
	/**
	 * 重置密码
	 * @param user
	 * @return
	 */
	public boolean resetPwd(User user);
	/**
	 * 修改数据库验证码
	 * @param user
	 */
	public void alterVerificationCode(User user);
	/**
	 * 发送邮件验证码
	 * @param vcode
	 * @throws MessagingException 
	 * @throws NumberFormatException 
	 */
	public void sendEmial(String vcode) throws NumberFormatException, MessagingException;
	
}
