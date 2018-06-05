package com.medicine.service.impl;

import java.util.Properties;

import javax.annotation.Resource;
import javax.mail.Address;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.stereotype.Service;

import com.medicine.dao.IEnterDao;
import com.medicine.model.User;
import com.medicine.service.IEnterService;
import com.medicine.util.JMailPropUtil;
import com.medicine.vo.UserView;

@Service("enterService")
public class EnterServiceImpl implements IEnterService {
	@Resource(name = "enterDao")
	private IEnterDao enterDao;

	public UserView login(User user) {
		UserView uv = enterDao.login(user);
		return uv;
	}

	public boolean checkLoginName(String lgName) {
		boolean flag = false;
		String daoflag = this.enterDao.checkLoginName(lgName);
		if (daoflag != null && !daoflag.equals(""))
			flag = true;
		return flag;
	}

	public boolean register(User user) {
		boolean flag = false;
		try{
			this.enterDao.register(user);
			flag = true;
		}catch(Exception e){
			flag = false;
			e.printStackTrace();
		}
		return flag;
	}

	public boolean resetPwd(User user) {
		return false;
	}

	@Override
	public void alterVerificationCode(User user) {
		this.enterDao.alterVerificationCode(user);
	}
	
	@Override
	public void sendEmial(String vcode) throws NumberFormatException, MessagingException {
		// 1.创建Properties对象,设置服务器有关属性
				Properties props = new Properties();
				// 设置访问smtp服务器需要认证
				props.setProperty("mail.stmp.auth", "true");
				// 设置访问服务器的协议
				props.setProperty("mail.transport.protocol", "smtp");

				// 2.创建Session 根据Properties对象
				Session session = Session.getDefaultInstance(props);
				// 打开debug模式
				session.setDebug(true);

				// 3.设置Message对象 根据Session对象
				Message msg = new MimeMessage(session);
				// 设置发件人(163:登录人==发件人 此处可以不写@.163.com 但是发送QQ->邮件会显示 550 Invalid User 邮件被退回 )
				msg.setFrom(new InternetAddress(JMailPropUtil.getValue("sender")));
				// 设置主题
				msg.setSubject("MMS 验证码");
				// 设置邮件内容
				msg.setText("您的验证码是:"+vcode);

				// 4.设置Transport对象 发送邮件
				Transport trans = session.getTransport();
				// 设置连接 (host:网易邮件服务器, port:默认25, user, password)
				// Scanner input = new Scanner(System.in);
				// String pwd = input.next();
				trans.connect(JMailPropUtil.getValue("host"),
						Integer.valueOf(JMailPropUtil.getValue("port")), 
						JMailPropUtil.getValue("sender"),
						JMailPropUtil.getValue("licenseKey"));
				// 发送邮件
				trans.sendMessage(msg, new Address[] { new InternetAddress("1377308649@qq.com") });
				trans.close();
	}

}
