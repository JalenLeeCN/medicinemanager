package com.medicine.dao;

import java.util.Map;

import org.springframework.stereotype.Repository;

import com.medicine.model.User;
import com.medicine.vo.UserView;

@Repository("enterDao")
public interface IEnterDao {
	/**
	 * 登录
	 * @param user
	 * @return
	 */
	public UserView login(User user);
	/**
	 * 检查用户名是否存在
	 * @param lgName
	 * @return
	 */
	public String checkLoginName(String lgName);
	public Integer register(User user);
}
