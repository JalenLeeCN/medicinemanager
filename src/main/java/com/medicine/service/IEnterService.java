package com.medicine.service;

import com.medicine.model.User;
import com.medicine.vo.UserView;

public interface IEnterService {
	/**
	 * 登录
	 * @return
	 */
	public UserView login(User user);
}
