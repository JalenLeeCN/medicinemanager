package com.medicine.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.medicine.dao.IMedicineDao;
import com.medicine.service.IMedicineService;
@Service("medicineService")
public class MedicineServiceImpl implements IMedicineService {
	@Resource(name="medicineDao")
	private IMedicineDao medicineDao;
}
