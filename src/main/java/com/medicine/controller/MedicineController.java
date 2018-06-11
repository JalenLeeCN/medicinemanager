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
	@RequestMapping("/simpleInfo")
	@ResponseBody
	public PageView querySimpleInfo(Page page){
		PageView pv = this.medicineService.querySimpleInfo(page);
		return pv;
	}
	/**
	 * 查询未入库药品信息
	 * @param page
	 * @return
	 */
	@RequestMapping("/approval")
	@ResponseBody
	public PageView approval(Page page){
		PageView pv = this.medicineService.approval(page);
		return pv;
	}
	/**
	 * 添加药品信息
	 * @param drug
	 * @return
	 */
	@RequestMapping(value="/drugAddtion",method= RequestMethod.POST)
	@ResponseBody
	public boolean addMedicine(DrugInfo drug) {
//		drug.setName("drugName");
//		drug.setUnitPrice(new BigDecimal(111));
//		drug.setManufacturerId(1);
//		drug.setProviderId(1);
		return this.medicineService.addMedicine(drug);
	}
	
	/**
	 * 审批入库
	 * @param id
	 * @return
	 */
	@RequestMapping("/pass")
	@ResponseBody
	public boolean pass(Integer id) {
		return this.medicineService.pass(id);
	}
	
}
