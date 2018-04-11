package com.medicine.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.medicine.dto.TestScope;
@Repository("testDaoMapper")
public interface TestDaoMapper {
	/**
	 * 测试返回结果
	 * @return
	 */
	public List<TestScope> getDataTest();
}
