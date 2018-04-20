package com.medicine.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.medicine.dao.IEnterDao;
import com.medicine.model.User;
import com.medicine.service.IEnterService;
import com.medicine.vo.UserView;
@Service("enterService")
public class EnterServiceImpl implements IEnterService {
	@Resource(name="enterDao")
	private IEnterDao enterDao;
	
	public UserView login(User user) {
		return enterDao.login(user);
	}

}
