package com.medicine.service;

import com.medicine.model.DrugInfo;
import com.medicine.model.Page;
import com.medicine.vo.PageView;

public interface IMedicineService {
	/**
	 * 查询简略药品信息
	 * @param page
	 * @return
	 */
	public PageView querySimpleInfo(Page page);
	/**
	 * 查询药品总数量
	 * @param page
	 * @return
	 */
	Integer queryDrugCount(Page page);
	/**
	 * 药品录入
	 * @param drug
	 * @return
	 */
	public boolean addMedicine(DrugInfo drug);

}
