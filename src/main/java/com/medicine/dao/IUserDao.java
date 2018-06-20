package com.medicine.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.medicine.model.Page;
import com.medicine.vo.UserView;
@Repository("userDao")
public interface IUserDao {

	List<UserView> qryUserInfo(Page page);

	Integer qryUserCount(Page page);
}
