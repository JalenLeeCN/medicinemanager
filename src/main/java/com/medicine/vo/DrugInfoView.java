package com.medicine.vo;

import com.medicine.model.DrugInfo;

public class DrugInfoView extends DrugInfo {
	private String providersName;
	private String manufacturerName;
	
	
	public String getProvidersName() {
		return providersName;
	}
	public void setProvidersName(String providersName) {
		this.providersName = providersName;
	}
	public String getManufacturerName() {
		return manufacturerName;
	}
	public void setManufacturerName(String manufacturerName) {
		this.manufacturerName = manufacturerName;
	}
	
	
}
