package com.medicine.service.imp;

import java.util.List;

import javax.annotation.Resource;

import com.medicine.dao.TestDaoMapper;
import com.medicine.dto.TestScope;
import com.medicine.service.Service;

@org.springframework.stereotype.Service("serviceImpl")
public class ServiceImpl implements Service {
	@SuppressWarnings("restriction")
	@Resource(name = "testDaoMapper")
	private TestDaoMapper testDaoMapper;

	public List<TestScope> getDataTest() {
		// TODO Auto-generated method stub
		List<TestScope> list = testDaoMapper.getDataTest();
		for(TestScope s : list){
			System.out.println("serviceImpl--"+s.getId()+"-->"+s.toString());
		}
		return list;
	}

}
