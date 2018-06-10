package com.medicine.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.medicine.model.DrugInfo;
import com.medicine.model.Page;
import com.medicine.service.IMedicineService;
import com.medicine.vo.PageView;

@Controller
@RequestMapping("medicine")
public class MedicineController{
	@Resource(name="medicineService")
	private IMedicineService medicineService;
	
	/**
	 * 查询药品简略信息
	 * @param page
	 * @return
	 */
	@RequestMapping(value="/simpleInfo/{currentPage}/{keyWord}",method=RequestMethod.GET)
	@ResponseBody
	public PageView querySimpleInfo(Page page){
		PageView pv = this.medicineService.querySimpleInfo(page);
		return pv;
	}
	
	@RequestMapping("/drugAddtion")
	@ResponseBody
	@Transactional(rollbackFor = RuntimeException.class, readOnly = true)
	public boolean addMedicine(DrugInfo drug) {
		//1.添加药品说明书信息
		//2.添加药品信息
//		drug.setName("drugName");
//		drug.setUnitPrice(new BigDecimal(111));
//		drug.setManufacturerId(1);
//		drug.setProviderId(1);
		return this.medicineService.addMedicine(drug);
	}
	
}
