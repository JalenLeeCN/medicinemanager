package com.medicine.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.medicine.model.DrugInfo;
import com.medicine.model.Page;
import com.medicine.vo.DrugInfoView;

@Repository("medicineDao")
public interface IMedicineDao {

	public List<DrugInfoView> querySimpleInfo(Page page);

	public Integer queryDrugCount(Page page);

	public void addMedicine(DrugInfo drug);
	
}
