package com.medicine.test;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import com.medicine.dao.IEnterDao;
import com.medicine.model.User;
import com.medicine.util.RandomPwdUtil;
import com.medicine.vo.UserView;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("resources/config/spring.xml")
@Transactional
public class TestEnter {
	@Autowired
	private IEnterDao enterDao;

	@Before
	public void testInitial() {
	}

	@Test
	public void testRandomPwd() {
		String newPwd = RandomPwdUtil.rdmPwdProducer();
		System.out.println(newPwd);
	}
	
	@Test
	public void testLogin(){
		User user = new User();
		user.setName("aa");
		user.setPassword("aa");
		user.setName("a");
//		UserView uv = enterDao.login(user);
//		System.out.println(uv.getName());
	}

}
