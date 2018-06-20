package com.medicine.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.medicine.dao.IMedicineDao;
import com.medicine.model.DrugInfo;
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

	@Override
	public boolean addMedicine(DrugInfo drug) {
		boolean flag = false;
		try {
			this.medicineDao.addMedicine(drug);
			flag = true;
		}catch (Exception e) {
			flag = false;
			e.printStackTrace();
		}
		return flag;
	}

	@Override
	public PageView approval(Page page) {
		List<DrugInfoView> duInfoViews = this.medicineDao.approval(page);
		PageView pv = this.pagingUtil.pageBuilder(page, approvalCount(page), duInfoViews);
		return pv;
	}
	
	@Override
	public Integer approvalCount(Page page) {
		return this.medicineDao.approvalCount(page);
	}

	@Override
	public boolean pass(Integer id) {
		boolean flag = false;
		try {
			this.medicineDao.pass(id);
			flag = true;
		}catch (Exception e) {
			flag = false;
			e.printStackTrace();
		}
		return flag;
	}

	@Override
	public boolean deleteDrug(Integer id) {
		boolean flag = false;
		try {
			this.medicineDao.deleteDrug(id);
			flag = true;
		}catch (Exception e) {
			flag = false;
			e.printStackTrace();
		}
		return flag;
	}
	
}
