package com.medicine.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.medicine.dao.IUserDao;
import com.medicine.model.Page;
import com.medicine.model.User;
import com.medicine.service.IUserService;
import com.medicine.util.PagingUtil;
import com.medicine.vo.DrugInfoView;
import com.medicine.vo.PageView;
import com.medicine.vo.UserView;

@Service("userService")
public class UserServiceImpl implements IUserService {
	@Resource(name = "userDao")
	private IUserDao userDao;
	@Resource(name = "pagingUtil")
	private PagingUtil pagingUtil;

	@Override
	public PageView qryUserInfo(Page page) {
		List<UserView> users = this.userDao.qryUserInfo(page);
		PageView pv = this.pagingUtil.pageBuilder(page, qryUserCount(page), users);
		return pv;
	}

	@Override
	public Integer qryUserCount(Page page) {
		return this.userDao.qryUserCount(page);
	}

}
