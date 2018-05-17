package com.medicine.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.medicine.model.Page;
import com.medicine.service.IMedicineService;
import com.medicine.vo.PageView;

@Controller
@RequestMapping("medicineController")
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
}
