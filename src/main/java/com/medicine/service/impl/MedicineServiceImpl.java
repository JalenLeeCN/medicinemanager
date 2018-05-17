package com.medicine.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.medicine.dao.IMedicineDao;
import com.medicine.model.Page;
import com.medicine.service.IMedicineService;
import com.medicine.util.PagingUtil;
import com.medicine.vo.DrugInfoView;
import com.medicine.vo.PageView;
@Service("medicineService")
public class MedicineServiceImpl implements IMedicineService {
	@Resource(name="medicineDao")
	private IMedicineDao medicineDao;
	@Resource(name="pagingUtil")
	private PagingUtil pagingUtil;
	
	@Override
	public PageView querySimpleInfo(Page page) {
		List<DrugInfoView> duInfoViews = this.medicineDao.querySimpleInfo(page);
		PageView pv = this.pagingUtil.pageBuilder(page, queryDrugCount(page), duInfoViews);
		return pv;
	}

	public Integer queryDrugCount(Page page) {
		return this.medicineDao.queryDrugCount(page);
	}
}
