package com.medicine.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.medicine.dao.IEnterDao;
import com.medicine.model.User;
import com.medicine.service.IEnterService;
import com.medicine.vo.UserView;

@Service("enterService")
public class EnterServiceImpl implements IEnterService {
	@Resource(name = "enterDao")
	private IEnterDao enterDao;

	public UserView login(User user) {
		return enterDao.login(user);
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

}
