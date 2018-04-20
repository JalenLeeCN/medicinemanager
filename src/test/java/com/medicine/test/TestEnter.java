package com.medicine.test;

import org.junit.Before;
import org.junit.Test;

import com.medicine.util.RandomPwdUtil;

public class TestEnter {
	@Before
	public void testInitial(){
		
	}
	@Test
	public void testRandomPwd(){
		String newPwd = RandomPwdUtil.rdmPwdProducer();
		System.out.println(newPwd);
	}

}
