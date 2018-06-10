package com.medicine.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.medicine.model.Manufacturer;
import com.medicine.model.Page;
import com.medicine.model.Provider;
import com.medicine.service.ISupplyDemandService;
import com.medicine.vo.PageView;

@Controller
@RequestMapping("supply")
public class SupplyDemandController {
	@Resource(name="supplydemandService")
	private ISupplyDemandService supplydemandService;
	
	@RequestMapping("/addprovider")
	@ResponseBody
	public boolean addProvider(Provider provider) {
		return this.supplydemandService.addProvider(provider);
	}
	
	@RequestMapping("/addmanufacturer")
	@ResponseBody
	public boolean addManufacturer(Manufacturer manufacturer) {
		return this.supplydemandService.addManufacturer(manufacturer);
	}
	
	@RequestMapping("/providerInfo")
	@ResponseBody
	public PageView providerInfo(Page page) {
		PageView pv = this.supplydemandService.providerInfo(page);
		return pv;
	}
	
	@RequestMapping("/manufacturerInfo")
	@ResponseBody
	public PageView manufacturerInfo(Page page) {
		PageView pv = this.supplydemandService.manufacturerInfo(page);
		return pv;
	}
}
