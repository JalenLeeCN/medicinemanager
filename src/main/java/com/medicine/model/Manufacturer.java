package com.medicine.model;

import java.io.Serializable;
import java.util.List;

public class Manufacturer implements Serializable {
	private static final long serialVersionUID = 1L;
	private int id;
	private String faxNo;
	private String name;
	private String phoneNum;
	private String postalCode;
	private String productAddress;
	private String registerAddress;
	private String website;
	private List<DrugInfo> drugInfos;

	public Manufacturer() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFaxNo() {
		return this.faxNo;
	}

	public void setFaxNo(String faxNo) {
		this.faxNo = faxNo;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhoneNum() {
		return this.phoneNum;
	}

	public void setPhoneNum(String phoneNum) {
		this.phoneNum = phoneNum;
	}

	public String getPostalCode() {
		return this.postalCode;
	}

	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}

	public String getProductAddress() {
		return this.productAddress;
	}

	public void setProductAddress(String productAddress) {
		this.productAddress = productAddress;
	}

	public String getRegisterAddress() {
		return this.registerAddress;
	}

	public void setRegisterAddress(String registerAddress) {
		this.registerAddress = registerAddress;
	}

	public String getWebsite() {
		return this.website;
	}

	public void setWebsite(String website) {
		this.website = website;
	}

	public List<DrugInfo> getDrugInfos() {
		return this.drugInfos;
	}

	public void setDrugInfos(List<DrugInfo> drugInfos) {
		this.drugInfos = drugInfos;
	}

	public DrugInfo addDrugInfo(DrugInfo drugInfo) {
		getDrugInfos().add(drugInfo);
		drugInfo.setManufacturer(this);

		return drugInfo;
	}

	public DrugInfo removeDrugInfo(DrugInfo drugInfo) {
		getDrugInfos().remove(drugInfo);
		drugInfo.setManufacturer(null);

		return drugInfo;
	}

}