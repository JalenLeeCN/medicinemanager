package com.medicine.service;

import com.medicine.model.Page;
import com.medicine.vo.PageView;

public interface IUserService {
	/**
	 * 查询用户信息
	 * @param page
	 * @return
	 */
	public PageView qryUserInfo(Page page);
	public Integer qryUserCount(Page page);
}
