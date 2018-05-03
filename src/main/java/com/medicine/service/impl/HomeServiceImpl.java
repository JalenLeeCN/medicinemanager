package com.medicine.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.medicine.dao.IHomeDao;
import com.medicine.service.IHomeService;
@Service("homeService")
public class HomeServiceImpl implements IHomeService {
	@Resource(name="homeDao")
	private IHomeDao homeDao;
	public List<Map> userStatistics(){
		return this.homeDao.userStatistics();
	}
}
