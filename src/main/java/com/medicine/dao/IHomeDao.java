package com.medicine.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

@Repository("homeDao")
public interface IHomeDao {
	/**
	 * 用户统计图
	 * @return
	 */
	public List<Map> userStatistics();
}
